function Slider (name,parent,settings,buildYet) {
	this.name = name
	if (typeof parent == typeof '') {
		this.parent = $('#'+parent)
	} else {
		this.parent = parent
	}
	this.tabs = []
	this.elements = {}
	this.settings = defaults(settings,
		{
		'size':[50,50],
		'position':'left',
		'dur':250,
		'side':'t',
		'rounding':10,
		'UpdateSizes':{},
		'method':'hover',
		'contents':[{'content':'modules/tabs/components/icon.png','display':'bg','delay':0}]
		});
	this.scrolling = false
	for (cont in this.settings.contents) {
		this.settings.contents[cont] = defaults(
			this.settings.contents[cont],
			{'content':'modules/tabs/components/icon.png',
			'display':'bg',
			'delay':1000,
			'actions':[]
			}
		)
	}
	this.Build = function () {
		this.BuildFrames()
		this.BuildContent()
		this.BuildInteraction()
		//return this
	}
	this.BuildFrames = function () {
		if (this.settings.position == 'left' || this.settings.position == 'right'){
			MakeElement(
				this.settings,this.elements,
				'Slider-Container',this.parent,[this.name],
				{'width':this.settings.size[0],
				'height':this.settings.size[1],
				'overflow':'hidden',
				'border-radius':this.settings.rounding,
				'float':this.settings.position},buildYet
			)
		} else {
			MakeElement(
				this.settings,this.elements,
				'Slider-Container',this.parent,[this.name],
				{'width':this.settings.size[0],
				'height':this.settings.size[1],
				'overflow':'hidden',
				'border-radius':this.settings.rounding},buildYet
			)
		}
		if (this.settings.method == 'hover') {
			MakeElement(
				this.settings,this.elements,
				'Slider-Wrapper',this.elements['Slider-Container'],[this.name],
				{'width':this.settings.size[0],
				'height':this.settings.size[1]*this.settings.contents.length}
			)
		} else if (this.settings.method == 'scroll') {
			MakeElement(
				this.settings,this.elements,
				'Slider-Scroll',this.elements['Slider-Container'],[this.name],
				{'width':this.settings.size[0]+30,
				'height':this.settings.size[1],
				'overflow':'auto'}
			)
			this.elements['Slider-Scroll'].animate({scrollTop:0})
			MakeElement(
				this.settings,this.elements,
				'Slider-Wrapper',this.elements['Slider-Scroll'],[this.name],
				{'width':this.settings.size[0],
				'height':this.settings.size[1]*this.settings.contents.length}
			)
		}
	}
	this.BuildContent = function () {
		this.elements['contents'] = {}
		for (cont in this.settings.contents) {
			MakeElement(
				this.settings,this.elements.contents,
				'Content'+cont,this.elements['Slider-Wrapper'],[this.name],
				{'width':this.settings.size[0],
				'height':this.settings.size[1]}
			)
			if (this.settings.contents[cont].display == 'bg') {
				this.elements.contents['Content'+cont].css('background-image','url('+this.settings.contents[cont].content+')')
				this.elements.contents['Content'+cont].css('background-size',this.settings.size[0]+'px '+this.settings.size[1]+'px')
			}
		}
	}
	this.BuildInteraction = function () {
		//Hover
		if (this.settings.method == 'hover'){// ||
			//this.settings.method == 'both') {
			this.hoverSet = []
			for (cont in this.settings.contents) {
				if (cont > 0) {
					this.hoverSet.push({marginTop:-this.settings.size[1]*(cont)})
				}
				if (this.settings.contents[cont].delay > 0) {
					this.hoverSet.push(this.settings.contents[cont].delay)
				}
			}
			hover_intent(
				this.elements['Slider-Container'],
				[
					[this.elements['Slider-Wrapper'],
					this.hoverSet,
					['clear',{marginTop:0}]
					]
				],
				this.settings.dur
			)
		}
		//Scroll
		if (this.settings.method == 'scroll'){// ||
			//this.settings.method == 'both') {
			Scroll(this.elements['Slider-Scroll'],
				   [[this.ScrollSnap,this]])
		}
		//Both
		//Actions
		for (cont in this.settings.contents) {
			for (act in this.settings.contents[cont].actions) {
				if (this.settings.contents[cont].actions[act][0] == 'click') {
					Click(this.elements.contents['Content'+cont],
						  [this.settings.contents[cont].actions[act].slice(1)])
				this.elements.contents['Content'+cont]
				} else if (this.settings.contents[cont].actions[act][0] == 'dbl') {
					Click(this.elements.contents['Content'+cont],
						  [this.settings.contents[cont].actions[act].slice(1)],true)
				}
			}
		}
	}
	this.ScrollSnap = function (This) {
		relScroll = This.elements['Slider-Scroll'].scrollTop()/This.settings.size[1]
		if (This.scrolling == false) {
			if (relScroll%1>0 && relScroll%1<0.5) {
				This.elements['Slider-Scroll'].stop().clearQueue()
				This.scrolling = true
				This.elements['Slider-Scroll'].animate({scrollTop:(parseInt(relScroll)+1)*This.settings.size[1]},This.settings.dur,function () {This.scrolling = false})
			} else if (relScroll%1>0.5 && relScroll%1<1) {
				This.elements['Slider-Scroll'].stop().clearQueue()
				This.scrolling = true
				This.elements['Slider-Scroll'].animate({scrollTop:(parseInt(relScroll))*This.settings.size[1]},This.settings.dur,function () {This.scrolling = false})
			}
		}
	}
	this.Append = function () {
		this.parent.append(this.elements['Slider-Container'])
	}
	this.Build()
}