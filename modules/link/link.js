function Link(name,div,properties){
	this.name = name
	this.parr = $('#'+div)
	this.props = defaults(properties,
		{
		'icon':'modules/link/components/link.png',
		'size':[20,20,100],
		'position':'inline',
		'margin':[[5,5],
				  [5,5]],
		'reff':'',
		'fontsize':14,
		'duration':1000,
		'direction':'r',
		'rounding':5
		});
	this.test = function () {
		alert('done')
	}
	this.Build = function () {
		//command/url
		if (this.props['reff'].slice(0,1) == '/' || this.props['reff'].slice(0,7) == 'http://'){
			link = this.props['reff']
			command = ''
		} else {
			link = 'javascript:void(0);'
			command = this.props['reff']
		}
		//make
		wrapper = jQuery('<a/>',
				   {'id':div+name+'link',
				   'class':'my_link',
				   'href':link,
				   'onclick':command
				   })
		wrapper.css('display','block')
		wrapper.css('border-radius',this.props['rounding'])
		icon = jQuery('<div/>',
				   {'id':div+name+'linkicon',
				   'class':'my_link_icon',
					})
		icon.append("<img src="+this.props['icon']+" class=my_link_icon_img>")
		name_wrapper = jQuery('<div/>',
				   {'id':div+name+'linknamewrap',
				   'class':'my_link_name_wrap',
					})
		this.name_text = jQuery('<div/>',
				   {'id':div+name+'linkname',
				   'class':'my_link_name',
					})
		//
		this.name_text.append('<p style=font-size:'+this.props['fontsize']+'px;margin:0; >'+this.name+'</p>')
		name_wrapper.append(this.name_text)
		//margin
		wrapper.css('margin',this.props['margin'][0][0]+'px '+this.props['margin'][1][0]+'px '+this.props['margin'][0][1]+'px '+this.props['margin'][1][1]+'px ')
		//direction
		dir = this.props['direction'].toLowerCase().charAt(0)
		dur = this.props['duration']
		Left = 0
		Top = 0
		if (dir == 'r' || dir=='l'){
			//icon
			//then name
			wrapper.width(this.props['size'][2])
			wrapper.height(this.props['size'][0])
			icon.width(this.props['size'][1])
			icon.height(this.props['size'][0])
			name_wrapper.width(this.props['size'][2]-this.props['size'][1])
			name_wrapper.height(this.props['size'][0])
			if(dir == 'r'){
				wrapper.append(icon)
				wrapper.append(name_wrapper)
				this.name_text.css(
					'border-radius',
					0+"px "+
					this.props['rounding']+"px "+
					this.props['rounding']+"px "+
					0+"px"
					)
				if (dur != 0){
					Left = -(this.props['size'][2]-this.props['size'][1])
					this.name_text.css('margin-left',Left)
				}
			} else if (dir == 'l'){
				wrapper.append(name_wrapper)
				wrapper.append(icon)
				this.name_text.css(
					'border-radius',
					this.props['rounding']+"px "+
					0+"px "+
					0+"px "+
					this.props['rounding']+"px"
					)
				if (dur != 0){
					Left = (this.props['size'][2]-this.props['size'][1])
					this.name_text.css('margin-left',Left)
				}
			}
		} else if (dir == 'u' || dir=='d'){
			//icon
			//then name
			wrapper.height(this.props['size'][2])
			wrapper.width(this.props['size'][0])
			icon.width(this.props['size'][0])
			icon.height(this.props['size'][1])
			name_wrapper.width(this.props['size'][0])
			name_wrapper.height(this.props['size'][2]-this.props['size'][1])
			if(dir == 'd'){
				wrapper.append(icon)
				wrapper.append(name_wrapper)
				this.name_text.css(
					'border-radius',
					0+"px "+
					0+"px "+
					this.props['rounding']+"px "+
					this.props['rounding']+"px"
					)
				if (dur != 0){
					Top = -(this.props['size'][2]-this.props['size'][1])
					this.name_text.css('margin-top',Top)
				}
			} else if (dir == 'u'){
				wrapper.append(name_wrapper)
				wrapper.append(icon)
				this.name_text.css(
					'border-radius',
					this.props['rounding']+"px "+
					this.props['rounding']+"px "+
					0+"px "+
					0+"px"
					)
				if (dur != 0){
					Top = (this.props['size'][2]-this.props['size'][1])
					this.name_text.css('margin-top',Top)
				}
			}
			
		}

		hover_intent(wrapper,
			[[this.name_text,
			  {marginLeft:0,marginTop:0},
			  {marginLeft:Left,marginTop:Top}]],
			this.props['duration']
					 )
		this.parr.append(wrapper)
	}
	this.Build()
}