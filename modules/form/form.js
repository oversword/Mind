function Form (name,div,properties) {
	this.name = name
	this.parr = $('#'+div)
	this.elements = {}
	this.props = defaults(properties,
		{
		'image':'modules/form/components/google.png',
		'size':[50,150],
		'position':'left',
		'margin':[[5,5],
				  [5,5]],
		'fontsize':'dynamic',
		'duration':500,
		'direction':'u',
		'rounding':5,
		'form':'modules/form/components/google.html'
		});
	if (this.props.fontsize=='auto'){
		//this.props.fontsize == 
	}
	this.Build = function () {
		
		//make wrapper
		this.elements['wrapper'] = jQuery('<div/>',
				   {'id':div+name+'form',
				   'class':'my_form'
				   })
		//dimensions
		this.elements['wrapper'].width(this.props['size'][1])
		this.elements['wrapper'].height(this.props['size'][0])
		if (this.props.position == 'center') {
			this.elements['cent'] = jQuery('<center/>')
			this.elements['cent'].append(this.elements['wrapper'])
		}else
		if (this.props.position != 'block') {
			this.elements['wrapper'].css('float',this.props.position)
		}
		//rounding
		this.elements['wrapper'].css('border-radius',this.props['rounding'])
		//margin
		this.elements['wrapper'].css('margin',this.props['margin'][0][0]+'px '+this.props['margin'][1][0]+'px '+this.props['margin'][0][1]+'px '+this.props['margin'][1][1]+'px ')
		//make contents
		this.elements['stuff'] = jQuery('<div/>',
				   {'id':div+name+'formstuff',
				   'class':'my_formstuff'
				   })
		//dimensions
		this.elements['stuff'].width(this.props['size'][1])
		this.elements['stuff'].height(this.props['size'][0]*2)
		//Add title image
		this.elements['stuff'].append("<img src="+this.props['image']+" width="+this.props['size'][1]+" height="+this.props['size'][0]+">")
		//add form element
		////exchange for variable: file name
		//pWidth = this.props.size[1]
		if (this.props['fontsize'] == 'dynamic'){
			this.props['fontsize'] = 13+((7/10)*(this.props.size[0]-40))//this.props.size[1]
		}
		InsertContent(this.elements['stuff'],this.props.form,'append',
			function(element,size,fontsize){
				element.find('.input').css('fontSize',fontsize)
				element.find('.input').css('padding',5)
				element.find('.input').css('margin-top',2)
				element.find('.input').attr('size',((8/(fontsize*5))*size[1])-7)
		},this.props.size,this.props['fontsize'])
		//temp = ''
		//style=font-size:'+this.props['fontsize']+'px;padding:5px;margin:2px;
		//compile
		this.elements['wrapper'].append(this.elements['stuff'])
		//insert
		if (this.props.position == 'center') {
			this.parr.append(this.elements['cent'])
		}else {
			this.parr.append(this.elements['wrapper'])
		}
		//hover actions
		hover_intent(
			this.elements['wrapper'],
			[[this.elements['stuff'],
			{marginTop:-this.props['size'][0]},
			{marginTop:0}]],
			this.props['duration']
		)
	}
	this.Build()
}