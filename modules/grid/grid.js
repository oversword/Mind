function Grid (name,div,properties) {
	this.name = name
	this.parr = $('#'+div)
	this.elements = {}
	this.props = defaults(properties,
		{
		//'image':'modules/form/components/google.png',
		'size':[2,2],
		'position':'left',
		//'margin':[[5,5],
		//		  [5,5]],
		//'fontsize':18,
		'duration':500,
		'sepsize':5,
		'moversize':30,
		'moveicon':'modules/grid/components/move.png'
		//'direction':'u',
		//'rounding':5,
		//'form':'modules/form/components/google.html'
		});
	this.Build = function () {
		//for each widthwards
		this.elements['Columns'] = []
		this.elements['Cells'] = []
		for (var w=0;w<this.props.size[0];w++){
			//add column container
			this.elements['Cells'].push([])
			this.elements['Columns'].push(jQuery('<div/>',
			{
				'id':this.name+'Grid-Column'+w,
				'class':'Grid-Column'
			}
			))
			this.elements['Columns'][w].width(
				(this.parr.width()-
					(this.props.sepsize*
						(this.props.size[0]-1)
					)
				)/this.props.size[0]
			)
			this.elements['Columns'][w].height('100%')
			if (w != this.props.size[0]-1) {
				this.elements['Columns'][w].css('marginRight',this.props.sepsize-1)
			}
			this.parr.append(this.elements['Columns'][w])
			//for each heightwards
			for (var h=0;h<this.props.size[1];h++){
				//add cell to column container
				this.elements['Cells'][w].push(jQuery('<div/>',
					{
						'id':this.name+'Grid-Cell_'+w+'-'+h,
						'class':'Grid-Cell'
					}
				))
				this.elements['Cells'][w][h].width('100%')
				this.elements['Cells'][w][h].height(
					(this.parr.height()-
						(this.props.sepsize*
							(this.props.size[1]-1)
						)
					)/this.props.size[1]
				)
				if (h != this.props.size[1]-1) {
					this.elements['Cells'][w][h].css('marginBottom',this.props.sepsize)
				}
				this.elements['Columns'][w].append(this.elements['Cells'][w][h])
			}
		}
		this.elements['Movers'] = []
		//if size1 > 1 and size2 > 1
		if (this.props.size[0] > 1 && this.props.size[1] > 1){
			//for each widthwards except last
			for (var w=0;w<this.props.size[0]-1;w++){
				this.elements['Movers'].push([])
				//for each heightwards except last
				for (var h=0;h<this.props.size[1]-1;h++){
					//add mover at cross section
					this.elements['Movers'][w].push(jQuery('<div/>',
						{
							'id':this.name+'Grid-Mover'+w+'-'+h,
							'class':'Grid-Mover'
						}
					))
					this.elements['Movers'][w][h].width(this.props.moversize)
					this.elements['Movers'][w][h].height(this.props.moversize)
					this.elements['Movers'][w][h].css('position','absolute')
					this.elements['Movers'][w][h].append(
						'<img src='+this.props.moveicon+' width=100% height=100% />'
					)
					//this.elements['Movers'][w][h].css('background-image','url('+this.props.moveicon+')')
					//this.elements['Movers'][w][h].css('background-size',this.props.moversize+'px '+this.props.moversize+'px ')
					this.elements['Movers'][w][h].offset({
						left:this.elements['Columns'][w+1].offset().left-((this.props.moversize+this.props.sepsize)/2),//this.parr.offset().left,
						top:this.elements['Cells'][w][h+1].offset().top-((this.props.moversize+this.props.sepsize)/2)
					})
					hover_intent(this.elements['Movers'][w][h],
						[[this.elements['Movers'][w][h].find('img'),{opacity:1},{opacity:0.2}]],
						250)
					this.parr.append(this.elements['Movers'][w][h])
					AddMoverDrag(this.elements['Movers'][w][h],
						{
							'w':w,'h':h,
							'size':this.props.size,
							'Cells':this.elements['Cells'],'Columns':this.elements['Columns'],
							'Movers':this.elements['Movers']
						}
					)
				}
			}
		//else if size1 > 1
		} else if (this.props.size[0] > 1) {
			//for each widthwards except last
				//add mover at midpoint
		//else if size2 > 1
		} else if (this.props.size[1] > 1) {
			//for each heightwards except last
				//add mover at cross section
		}
		
	}
	this.Build()
}
mousePoll = []
function AddMoverDrag (element,data) {
	element.draggable({
		containment: "parent",
		start:function (event,ui) {
			mousePoll = [event.pageX,event.pageY]
		},
		drag: function (event,ui) {
			deltaMouse = [event.pageX-mousePoll[0],event.pageY-mousePoll[1]]
			data.Columns[data.w].width('+='+deltaMouse[0])
			data.Columns[data.w+1].width('-='+deltaMouse[0])
			//for each cell in near levels
			for (var w=0;w<data.size[0];w++) {
				data.Cells[w][data.h].height('+='+deltaMouse[1])
				data.Cells[w][data.h+1].height('-='+deltaMouse[1])
				data.Cells[w][data.h].resize()
				data.Cells[w][data.h+1].resize()
			}
			for (h in data.Movers[data.w]){
				data.Movers[data.w][h].offset({
					left:data.Movers[data.w][h].offset().left+deltaMouse[0]
				})
			}
			for (var w=0;w<data.size[0]-1;w++){
				data.Movers[w][data.h].offset({
					top:data.Movers[w][data.h].offset().top+deltaMouse[1]
				})
			}
			mousePoll = [event.pageX,event.pageY]
		}
	})
}