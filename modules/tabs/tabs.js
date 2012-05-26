function Tabs (name,parent,settings) {
	this.name = name
	this.parent = $('#'+parent)
	this.tabs = []
	this.settings = defaults(settings,
		{
		'tabs':[{'name':'Blankity','content':'img:modules/tabs/components/default.png'}],
		'icon':'modules/tabs/components/icon.png',
		'content':'img:modules/tabs/components/default.png',
		'close':'modules/tabs/components/close.png',
		'add':'modules/tabs/components/add.png',
		'tools':'modules/tabs/components/tools.png',
		'refresh':'modules/tabs/components/refresh.png',
		'history':'modules/tabs/components/history.png',
		'youtube':'modules/tabs/components/youtube.png',
		'search':'modules/tabs/components/search.png',
		'pin':'modules/tabs/components/pin.png',
		'web':'modules/tabs/components/web.png',
		'cancel':'modules/tabs/components/cancel.png',
		'size':['100%','100%',110,25],
		'position':'inline',
		'fontsize':14,
		'dur':250,
		'side':'t',
		'rounding':10,
		'UpdateSizes':{},
		'OldTabs':[]
		});
	//Sync Cookie + Tabs info array
	if (getCookie(this.name+'tabsCookie') == false){
		for (t in this.settings.tabs) {
			this.settings.tabs[t] = defaults(
				this.settings.tabs[t],
				{'name':'tab'+t,
				'content':this.settings.content,
				'icon':this.settings.icon,
				'state':'normal',
				'load':true,
				'position':t}
			)
		}
		setCookie(this.name+'tabsCookie',this.settings.tabs.toSource(),365)
	} else {
		this.settings['tabs'] = eval(getCookie(this.name+'tabsCookie'))
		for (t in this.settings.tabs) {
			this.settings.tabs[t] = defaults(
				this.settings.tabs[t],
				{'name':'tab'+t,
				'content':this.settings.content,
				'icon':this.settings.icon,
				'state':'normal',
				'load':true,
				'position':t}
			)
			//if (isNaN(this.settings.tabs[t].position)) {
				this.settings.tabs[t].position = t
			//}
		}
		setCookie(this.name+'tabsCookie',this.settings.tabs.toSource(),365)
	}
	this.elements = {}
	this.Build = function () {
		this.BuildFrames()
		this.BuildInteraction()
		this.BuildTabs()
		SetSizes(this)
		this.Update(this)
	}
	this.BuildInteraction = function () {
		Resize(this.elements['Tabs'].closest('.Grid-Cell'),
			   [[SetSizes,this],
				[this.Update,this]])
	}
	this.Update = function (This) {
		if (This == undefined){
			This = this
		}
		for (t in This.tabs) {
			if (This.tabs[t].elements['Tabs-Tab'].hasClass('selected')) {
				if (This.settings.side.toLowerCase().charAt(1) == 'r') {
					This.elements['Tabs-Contents-Wrapper'].css(
						'margin-left',
						//'+='+(data.data['Contents-Wrap'].parent().offset().left-data.elements['Content'].offset().left)
						-(This.tabs.length-t-1)*This.elements['Tabs-Contents-Wrapper'].parent().width()
					)
				} else {
					This.elements['Tabs-Contents-Wrapper'].css(
						'margin-left',
						//'+='+(data.data['Contents-Wrap'].parent().offset().left-data.elements['Content'].offset().left)
						-t*This.elements['Tabs-Contents-Wrapper'].parent().width()
					)
				}
			}
		}
	}
	this.BuildFrames = function () {
		//Replicate for different orientations
		MakeElement(this.settings,this.elements,
			'Tabs',this.parent,
			[name],
			{'width':this.settings.size[0],
			'height':this.settings.size[1],
			'border-radius':this.settings.rounding}
			)
			MakeElement(this.settings,this.elements,
				'Tabs-Bar',this.elements['Tabs'],
				[name],
				{'width':'100%',
				'height':this.settings.size[3]},
				false
				)
				this.elements['Tabs-Bar-Actions'] = new Slider ('Tabs-Bar-Actions',this.elements['Tabs-Bar'],
					{
					//'method':'scroll',
					'method':'scroll',
					'size':[this.settings.size[3],this.settings.size[3]],
					'contents':[
						{'content':this.settings.tools,
						'delay':0
						},
						{'content':this.settings.add,
						'actions':[['click',this.AddTab,this]],
						'delay':1500
						},
						{'content':this.settings.refresh,
						'actions':[['click',this.RefreshTab,this]],
						'delay':1500
						},
						{'content':this.settings.history,
						'actions':[['click',this.ShowHistory,this]],
						'delay':1500
						}
					]
				},false)
				MakeElement(
					this.settings,this.elements,
					'Tabs-Bar-Tabs',this.elements['Tabs-Bar'],
					[name],
					{'width':'-'+(this.settings.size[3]+1),
					'height':this.settings.size[3]},
					false
					)
					MakeElement(
						this.settings,this.elements,
						'Tabs-Bar-Tabs-Scroll',this.elements['Tabs-Bar-Tabs'],
						[name],
						{'width':'100%',
						'height':this.settings.size[3]*2}
						)
						MakeElement(
							this.settings,this.elements,
							'Tabs-Bar-Tabs-Scroll-Wrapper',this.elements['Tabs-Bar-Tabs-Scroll'],
							[name],
							{'width':0,
							'height':this.settings.size[3]}
							)
			MakeElement(
				this.settings,this.elements,
				'Tabs-Contents',this.elements['Tabs'],
				[name],
				{'width':'100%',
				'height':'-'+this.settings.size[3],
			'border-radius':this.settings.rounding},
				false
				)
				MakeElement(
					this.settings,this.elements,
					'Tabs-Contents-Wrapper',this.elements['Tabs-Contents'],
					[name],
					{'width':{'width':this.elements['Tabs'],'length':this.tabs},
					'height':'100%'}
					)
		
		if (this.settings.side.toLowerCase().charAt(1) == 'r') {
			this.elements['Tabs-Bar'].append(this.elements['Tabs-Bar-Tabs'])
			this.elements['Tabs-Bar-Actions'].Append()
			this.elements['Tabs-Bar-Tabs-Scroll-Wrapper'].css('float','right')
		} else {
			this.elements['Tabs-Bar-Actions'].Append()
			this.elements['Tabs-Bar'].append(this.elements['Tabs-Bar-Tabs'])
		}
		if (this.settings.side.toLowerCase().charAt(0) == 't') {
			this.elements['Tabs'].append(this.elements['Tabs-Bar'])
			this.elements['Tabs'].append(this.elements['Tabs-Contents'])
		} else if (this.settings.side.toLowerCase().charAt(0) == 'b') {
			this.elements['Tabs'].append(this.elements['Tabs-Contents'])
			this.elements['Tabs'].append(this.elements['Tabs-Bar'])			
		}
	}
	this.BuildTabs = function (){
		for (t in this.settings.tabs){
			this.tabs.push(
				new Tab(
					{'index':t,'item':this.settings.tabs[t]},
					{
						'tabs-list':this.tabs,
						'parent-name':this.name,
						'Tabs-Wrap':this.elements['Tabs-Bar-Tabs-Scroll-Wrapper'],
						'Contents-Wrap':this.elements['Tabs-Contents-Wrapper']
					},
					this.settings
				))
			//this.tabs[t].Build()
		}
		if (this.tabs.length > 0) {
			//alert(this.tabs[0].data['parent-name'])
			this.tabs[0].Switch(this.tabs[0])
			//this.tabs[0].Switch(this.tabs[0])
		}
	}
	this.RefreshTab = function (data) {
		for (t in data.tabs) {
			if (data.tabs[t].elements['Tabs-Tab'].hasClass('selected')){
				//data.tabs[t].elements.Content.html('')
				data.tabs[t].Update(data.tabs[t])
			}
		}
	}
	this.ShowHistory = function (This) {
		if (This.settings.side.toLowerCase().charAt(1) == 'r') {
			left = This.elements['Tabs-Contents'].offset().left+
			This.elements['Tabs-Contents'].width()-
			This.settings.size[2]
		} else {
			left = This.elements['Tabs-Contents'].offset().left
		}
		if (This.settings.side.toLowerCase().charAt(0) == 'b') {
			_top = This.elements['Tabs-Contents'].offset().top+
				This.elements['Tabs-Contents'].height()-
				(This.settings.size[3])
		} else if (This.settings.side.toLowerCase().charAt(0) == 't'){
			_top = This.elements['Tabs-Contents'].offset().top
		}
		MakeElement(
				This.settings,This.elements,//this.elements
				'Tabs-History',This.elements['Tabs-Contents'],[This.name],//[name]
				{'width':This.settings.size[2],
				 'height':This.settings.size[3]*This.settings.OldTabs.length,
				 'background':'#33f',
				 'position':'absolute',
				 'top':_top,
				 'left':left
				 }//,
				//buildNow,
				//type//<a/>
			)
		for (old in This.settings.OldTabs) {
			alert(This.settings.OldTabs.toSource())
			This.elements['Tabs-History'].append(
				'<div>'+
					This.settings.OldTabs[old].name+
				'</div>'
			)
		}
		//This.elements['Tabs-Contents'].append(
		//	'<div style=background:#f00;width:100px;height:100px;position:absolute;top:'+This.elements['Tabs-Contents'].offset().top+'px;left:'+This.elements['Tabs-Contents'].offset().left+'px;>'+
		//		
		//	'</div>'
		//)
	}
	this.AddTab = function (data) {
		t = data.settings.tabs.length
		n = 'New_Tab'
		while (indexOfDict('name',n,data.settings.tabs) != -1) {
			n+='-'
		}
		data.settings.tabs.push({'name':n,
			   'content':data.settings.content,
			   'icon':data.settings.icon,
			   'state':'normal',
			   'load':true,
				'position':0})
		data.tabs.push(
			new Tab(
				{'index':t,'item':data.settings.tabs[t]},
				{
					'tabs-list':data.tabs,
					'parent-name':data.name,
					'Tabs-Wrap':data.elements['Tabs-Bar-Tabs-Scroll-Wrapper'],
					'Contents-Wrap':data.elements['Tabs-Contents-Wrapper']
				},
				data.settings
			))
		SetSizes(data)
		data.tabs[data.tabs.length-1].Edit(data.tabs[data.tabs.length-1])
		data.tabs[data.tabs.length-1].Switch(data.tabs[data.tabs.length-1])
		setCookie(data.name+'tabsCookie',data.settings.tabs.toSource(),365)
	}
	this.Build()
}
function Tab (me,data,settings) {
	this.me = me
	this.data = data
	this.settings = settings
	this.elements = {}
	this.mousePoll = [0,0]
	this.deltaMouse = [0,0]
	this.Build = function () {
		//alert(this.me.item.position)
		this.data['Tabs-Wrap'].width(this.data['Tabs-Wrap'].width()+this.settings.size[2])
		this.BuildFrames()
		if (this.me.item.load) {
			this.BuildContent()
		}
		this.BuildTab()
		this.BuildInteraction()
		if (this.me.item.state == 'pinned') {
			this.PinTab(this)
		}
	}
	this.BuildFrames = function () {
		//Content
		if (this.settings.side.toLowerCase().charAt(1) == 'r') {
			MakeElement(this.settings,this.elements,
				'Content',this.data['Contents-Wrap'],
				[this.data['parent-name'],this.me.item.name],
				{'width':'<<100%',
				'height':'100%',
				'float':'right'}
				)
		} else {
			MakeElement(this.settings,this.elements,
				'Content',this.data['Contents-Wrap'],
				[this.data['parent-name'],this.me.item.name],
				{'width':'<<100%',
				'height':'100%',
				'float':'left'}
				)
		}
		//Tab
		//alert(this.me.item.name+'>'+this.me.item.position)
		MakeElement(
			this.settings,this.elements,
			'Tabs-Tab',this.data['Tabs-Wrap'],
			[this.data['parent-name'],this.me.item.name],
			{'width':this.settings.size[2],
				'height':this.settings.size[3],
				'margin-left':this.me.item.position}
		)
		//Directioning
		if (this.settings.side.toLowerCase().charAt(0) == 't') {
			this.elements['Tabs-Tab'].css('border-radius',this.settings.rounding+'px '+this.settings.rounding+'px 0 0')			
		} else if (this.settings.side.toLowerCase().charAt(0) == 'b') {
			this.elements['Tabs-Tab'].addClass('UpsideDown')
			this.elements['Tabs-Tab'].css('border-radius','0 0 '+this.settings.rounding+'px '+this.settings.rounding+'px')			
		}
		if (this.settings.side.toLowerCase().charAt(1) == 'r') {
			this.elements['Tabs-Tab'].css('float','right')	
		} else {
			this.elements['Tabs-Tab'].css('float','left')	
		}
		// Label + Wrapper
		MakeElement(
			this.settings,this.elements,
			'Tabs-Tab-Label',this.elements['Tabs-Tab'],
			[this.data['parent-name'],this.me.item.name],
			{'width':this.settings.size[2]-this.settings.size[3],
				'height':this.settings.size[3],
				'float':'left'},
			false
		)
		MakeElement(
			this.settings,this.elements,
			'Tabs-Tab-Label-Wrapper',this.elements['Tabs-Tab-Label'],
			[this.data['parent-name'],this.me.item.name],
			{'width':this.settings.size[2]*2,
				'height':this.settings.size[3]*2}
		)
	}
	this.BuildContent = function () {
		URL = []
		URL = InterpretURL(this.me.item.content)
	//alert(URL.toSource())
		if (URL.m == 'frame') {
			this.elements['Content-Frame'] =
				jQuery('<iframe />',
				{
					'id':this.data['parent-name']+'Tabs-Content-Frame'+this.me.item.name,
					'class':'Tabs-Content Content-Frame',
					'src':this.me.item.content,
					'width':'100%',
					'height':'100%'
				}
				)		
			this.elements['Content'].append(this.elements['Content-Frame'])
		} else if (URL.m == 'image') {
			this.elements['Content-Image'] =
				jQuery('<img/>',
				{
					'id':this.data['parent-name']+'Tabs-Content-Image'+this.me.item.name,
					'class':'Tabs-Content Content-Image',
					'src':this.me.item.content.slice(4),
					'width':'100%',
					'height':'100%'
				}
				)
			this.elements['Content'].append(this.elements['Content-Image'])
		} else if (URL.m == 'insert') {
			//alert('yes')
			this.elements['Content-Div'] =
				jQuery('<div/>',
				{
					'id':this.data['parent-name']+'Tabs-Content-Div'+this.me.item.name,
					'class':'Tabs-Content Content-Div',
					'width':'100%',
					'height':'100%'
				}
				)
			//alert('yeees')
			this.elements['Content'].append(this.elements['Content-Div'])
			InsertContent(this.elements['Content-Div'],URL.d+URL.p+URL.f)
		} else if (URL.m == 'playlist') {
			this.elements['Content-List'] =
				jQuery('<iframe />',
				{
					'id':this.data['parent-name']+'Tabs-Content-List'+this.me.item.name,
					'class':'Tabs-Content Content-Video',
					'src':'http://www.youtube.com/embed/videoseries?list='+URL.f+'&amp;hl=en_GB',
					'width':'100%',
					'height':'100%'
				}
				)
			this.elements['Content'].append(this.elements['Content-List'])
		} else if (URL.m == 'video') {
			this.elements['Content-Video'] =
				jQuery('<iframe />',
				{
					'id':this.data['parent-name']+'Tabs-Content-Video'+this.me.item.name,
					'class':'Tabs-Content Content-Video',
					'src':'http://youtube.com/embed/'+this.me.item.content.slice(2),
					'width':'100%',
					'height':'100%'
				}
				)		
			this.elements['Content'].append(this.elements['Content-Video'])
		}
	}
	this.BuildTab = function () {
		this.elements['Icon'] = new Slider ('Icon',this.elements['Tabs-Tab'],
			{
			'method':'scroll',
			'size':[this.settings.size[3],this.settings.size[3]],
			'contents':[
				{'content':this.me.item.icon,
				'actions':[['click',this.Switch,this]]
				},
				{'content':this.settings.pin,
				'actions':[['click',this.PinTab,this]]
				},
				{'content':this.settings.cancel,
				'actions':[['click',this.Cancel,this]]
				},
				{'content':this.settings.close,
				'actions':[['dbl',this.Remove,this]]
				}
			]
		})
		//Label
		this.elements['Tabs-Tab'].append(this.elements['Tabs-Tab-Label'])
		this.elements['Label-Label'] =
			jQuery('<div/>',
				{
					'id':this.data['parent-name']+'Tabs-Label'+this.me.item.name,
					'class':'Tabs-Label'
				}
				)
		this.name = this.me.item.name
		if (this.name.indexOf('.html') != -1){
			this.name = this.name.slice(0,this.name.indexOf('.html'))
		}
		this.elements['Label-Label'].width(this.settings.size[2]*2-this.settings.size[3])
		this.elements['Label-Label'].height(this.settings.size[3])
		this.elements['Label-Label'].html(
			'<p style=padding-top:'+((this.settings.size[3]-this.settings.fontsize)/2)+'px >'+
			this.name+
			'</p>'
			)
		this.elements['Tabs-Tab-Label-Wrapper'].append(this.elements['Label-Label'])
		//Input
		this.elements['Label-Input'] =
			jQuery('<form/>',
				{
					'id':this.data['parent-name']+'Tabs-Input'+this.me.item.name,
					'class':'Tabs-Input',
					'method':'POST',
					'action':'javascript:void(0);'
				}
				)
		this.elements['Label-Input'].width(this.settings.size[2]*2-this.settings.size[3])
		this.elements['Label-Input'].height(this.settings.size[3])
		this.elements['Label-Input'].html(
				'<input style=margin-top:'+((this.settings.size[3]-25)/2)+'px; TYPE=text name=p id=Tabs-form-url size='+(((this.settings.size[2]-this.settings.size[3])*(11/50))-3)+' maxlength=255 value='+this.me.item.content+' >'+
				'<input type=submit name=urlIn hidden>'
			)
		this.elements['Tabs-Tab-Label-Wrapper'].append(this.elements['Label-Input'])
	}
	this.BuildInteraction = function () {
		hover_intent(
			this.elements['Tabs-Tab-Label'],
			[
				[this.elements['Icon'].elements['Slider-Container'],
				{marginLeft:-this.settings.size[3]},
				{marginLeft:0}
				]
			],
			this.settings.dur
		)
		Click(this.elements['Tabs-Tab-Label'],
			[
				[this.Switch,
				this]])
		Click(this.elements['Tabs-Tab-Label'],
			[
			   [this.Edit,
				this]],
			  true)
		Submit(this.elements['Label-Input'],
			[
			   [this.Update,
				this]])
		if (this.settings.side.toLowerCase().charAt(1) == 'r') {
			placeHold = 'Tabs-Helper-Right'
		} else {
			placeHold = 'Tabs-Helper'
		}
		Sortable(this.data['Tabs-Wrap'],
				{'containment': "parent",
				'distance':this.settings.size[3]/2,
				'placeholder': placeHold
				},
				{'update':
					[
					   [this.ChangePos,this]
					]
					
				})
	}
	this.Remove = function (data) {
		//get right tab
		//switch to closest
		if (data.elements['Tabs-Tab'].hasClass('selected')){
			//TABS = $('#'+data.data['parent-name']+'Tabs-Bar-Tabs-Scroll-Wrapper').find('.Tabs-Tab').toArray()
			//CONTENTS = $('#'+data.data['parent-name']+'Tabs-Contents-Wrapper').find('.Tabs-Content').toArray()
			if (data.me.index > 0) {
				//switch to index-1
				data.Switch(data.data['tabs-list'][data.me.index-1])
			} else if (data.settings.tabs.length > 1) {
				//switch to 1
				data.Switch(data.data['tabs-list'][1])
			}
		}
		//animate out + remove
		for (e in data.elements){
			if (e == 'Tabs-Tab') {
				data['preW'] = data.elements[e].width()
				data.elements[e].animate(
					{width:0},
					data.settings.dur,
					function (){
						data.data['Tabs-Wrap'].animate({width:'-='+data['preW']},data.settings.dur);
						data.elements['Tabs-Tab'].remove();
						data.elements['Content'].remove();
					})
			}
		}
		//resize content wrap
		data.data['Contents-Wrap'].width('-='+data.data['Contents-Wrap'].parent().width())
		
		//update existence
		UpdateProperty (data,'existence',false,data)
	}
	this.Update = function (data) {
		data.elements['Tabs-Tab-Label-Wrapper'].find('#Tabs-form-url').blur()
		path = data.elements['Label-Input'].find('#Tabs-form-url')[0].value
		if (path != '' ){//&& path != data.me.item.content) {
			//Update Prop: content
			UpdateProperty (data,'content',path,data)
			//Interpret URL: path
			URL = InterpretURL(path)
			//Update Props: icon, name accordingly
			///Icons
			if 		  (URL.m == 'image') {
				UpdateProperty (data,'icon',URL.d+URL.p+URL.f,data)
			} else if (URL.m == 'insert' || path.slice(0,7) == 'file://') {
				UpdateProperty (data,'icon',data.settings.icon,data)				
			} else if (URL.m == 'playlist' ||URL.m == 'video') {
				UpdateProperty (data,'icon',data.settings.youtube,data)
			} else if (URL.m == 'frame') {
				UpdateProperty (data,'icon',URL.h+URL.d+'favicon.ico',data)
			}
			///Names
			n = ''
			if 		  (URL.m == 'image' ||
					   URL.m == 'insert' ||
					   path.slice(0,7) == 'file://') {
				n = URL.f				
			} else if (URL.m == 'playlist') {
				n = 'PlayList@YT'
			} else if (URL.m == 'video') {
				n = 'Video@YT'
			} else if (URL.m == 'frame') {
				n = URL.f+'@'+URL.d
			}
			//Special Files
			if (n == 'search.html') {
				UpdateProperty (data,'icon',data.settings.search,data)
			} else if (n == 'web.html') {
				UpdateProperty (data,'icon',data.settings.web,data)
			}
			//Remove .html
			if (n.indexOf('.html') > -1) {
				n = n.slice(0,n.indexOf('.html'))
			}
			//Check Duplicates
			while (indexOfDict('name',n,data.settings.tabs) != -1) {
				n+='-'
			}
			UpdateProperty (data,'name',n,data)
			//Clear Content Pane
			data.elements['Content'].html('')
			//update content
			data.BuildContent()
			//update tab
			data.elements['Icon'].elements.contents['Content'+0].css('background-image','url('+data.me.item.icon+')')
			data.elements['Label-Label'].find('p').html(data.me.item.name)
		} else if (path == '') {
			data.me.item.name = data.elements['Label-Input'].find('#Tabs-form-url')[0].value = data.me.item.content
		}
		//Fold back
		if (data.elements['Tabs-Tab'].width() != data.settings.size[2] &&
			data.elements['Tabs-Tab'].width() != data.settings.size[3]){
			data.elements['Tabs-Tab'].animate(
				{width:data.settings.size[2]},
				data.settings.dur,
				function (){
				data.data['Tabs-Wrap'].animate({width:(data.data['Tabs-Wrap'].width()-data.settings.size[2])},data.settings.dur)})
			data.elements['Tabs-Tab-Label-Wrapper'].animate(
				{marginTop:0},
				data.settings.dur)
		}
	}
	this.Edit = function (data) {
		if (data.elements['Tabs-Tab'].width() != data.settings.size[2]*2){
			data.elements['Tabs-Tab-Label-Wrapper'].find('#Tabs-form-url').select()
			data.elements['Tabs-Tab'].animate({width:data.settings.size[2]*2},data.settings.dur)
			data.elements['Tabs-Tab-Label-Wrapper'].animate(
				{marginTop:-data.settings.size[3]},
				data.settings.dur)
			data.data['Tabs-Wrap'].width(data.data['Tabs-Wrap'].width()+data.settings.size[2])
		}
	}
	this.Switch = function (data) {
		data.data['Tabs-Wrap'].find('.selected').removeClass('selected')
		data.elements['Tabs-Tab'].addClass('selected')
		data.data['Contents-Wrap'].stop()
		if (data.settings.side.toLowerCase().charAt(1) == 'r') {
			//alert(data.data['Contents-Wrap'].width())
			data.data['Contents-Wrap'].animate(
				{marginLeft:
				//'+='+(data.data['Contents-Wrap'].parent().offset().left-data.elements['Content'].offset().left)
				-(data.data['tabs-list'].length-data.me.index-1)*data.data['Contents-Wrap'].parent().width()
				},
				data.settings.dur
			)
		} else {
			data.data['Contents-Wrap'].animate(
				{marginLeft:
				//'+='+(data.data['Contents-Wrap'].parent().offset().left-data.elements['Content'].offset().left)
				-data.me.index*data.data['Contents-Wrap'].parent().width()
				},
				data.settings.dur
			)
		}
		data.data['Tabs-Wrap'].parent().animate(
			{scrollLeft:(data.elements['Tabs-Tab'].offset().left-data.data['Tabs-Wrap'].offset().left)-((data.data['Tabs-Wrap'].parent().width()-data.elements['Tabs-Tab'].width())/2)},
			data.settings.dur
			)
	}
	this.PinTab = function (data) {
		if (data.elements['Tabs-Tab'].width() == data.settings.size[3]) {
			data.elements['Tabs-Tab'].animate({width:(data.settings.size[2])})
			UpdateProperty (data,'state','normal',data)
		} else {
			data.elements['Tabs-Tab'].animate({width:(data.settings.size[3])})
			UpdateProperty (data,'state','pinned',data)
		}
	}
	this.Cancel = function (data) {
		if (data.me.item.load) {
			data.elements['Content'].html('')
			UpdateProperty (data,'load',false,data)
		} else {
			data.Update(data)
			UpdateProperty (data,'load',true,data)
		}
	}
	this.ChangePos = function (peram) {
		event = peram[0]
		ui = peram[1]
		This = peram[2]
		if (This.elements['Tabs-Tab'].html() == $(ui.item).html()) {
			sourceIndex = $(ui.item).parent().children().index(ui.item);
			UpdateProperty (This,'index',sourceIndex,This)
		}
	}
	this.Build();
	this.data['Contents-Wrap'].closest('.Grid-Cell').resize()
}
function UpdateProperty (This,prop,val,tab) {
	var index = -1
	var data = {}
	var TAB = {}
	var TabList = []
	var DataList = []
	if (This.me != undefined) {
		TabList = This.data['tabs-list']
		DataList = This.settings.tabs
		cookieName = This.data['parent-name']
	} else {
		TabList = This.tabs
		DataList = This.settings.tabs
		cookieName = This.name	
	}
	if (tab.me != undefined) {
		//Tab
		TAB = tab
		index = TAB.me.index
		data = DataList[index]
	} else if (tab.name != undefined) {
		//Tab Data
		data = tab
		index = DataList.indexOf(data)
		TAB = TabList[index]
	} else {
		//Tab index
		index = tab
		TAB = TabList[index]
		data = DataList[index]
	}
	if (prop == 'existence') {
		if (val == false) {
			//remove
			OldTab = DataList.splice(index,1)[0]
			TAB.settings.OldTabs.push(OldTab)
			for (var t=index+1;t<TabList.length;t++) {
				TabList[t].me.index -= 1
			}
			TabList.splice(index,1)
		} else {
			//restore?
		}
	} else if (prop == 'index') {
		if (val < index) {
			for (var t=val;t<index;t++) {
				TabList[t].me.index ++
			}
		} else {
			for (var t=val;t>index;t--) {
				TabList[t].me.index --
			}
		}
		DataItem = DataList.splice(index,1)[0]
		DataList.splice(val,0,DataItem)
		TabItem = TabList.splice(index,1)[0]
		TabItem.me.index = val
		TabList.splice(val,0,TabItem)
	}else {
		if (val.slice(0,2) == '+=') {
			val = data[prop]+parseFloat(val.slice(2))
			//alert(val)
		} else if (val.slice(0,2) == '-=') {
			val = data[prop]-parseFloat(val.slice(2))
		}
		//Update tab data
		data[prop] = val
		//Update tabs list (auto)
		//update data list
		DataList[index] = data
		//update cookie
		//setCookie(cookieName+'tabsCookie',DataList.toSource(),365)
		//update actuall tab/content (or trigger update)
	}
	setCookie(cookieName+'tabsCookie',DataList.toSource(),365)
}
function InterpretURL(url) {
	protocol = ''
	if 		  (url.slice(0,1) == '/') {
		url = url.slice(1)
		method = 'insert'
	} else if (url.slice(0,2) == 'v=') {
		url = url.slice(2)
		method = 'video'
		domain = 'yt'
		path = ''
		file = url
	} else if (url.slice(0,4) == 'img:') {
		url = url.slice(4)
		method = 'image'
	} else if (url.slice(0,5) == 'list=') {
		url = url.slice(5)
		method = 'playlist'
		domain = 'yt'
		path = ''
		file = url
	} else if (url.slice(0,7) == 'file://') {
		url = url.slice(7)
		method = 'frame'
	} else if (url.slice(0,7) == 'http://') {
		url = url.slice(7)
		method = 'frame'
		protocol = 'http://'
	} else if (url.slice(0,8) == 'https://') {
		url = url.slice(8)
		method = 'frame'
		protocol = 'https://'
	}
	if (method != 'playlist' && method != 'video') {
		domain = url.slice(0,url.indexOf('/')+1)
		url = url.slice(url.indexOf('/')+1)
		path = url.slice(0,url.lastIndexOf('/')+1)
		file = url.slice(url.lastIndexOf('/')+1)
	}
	return {'m':method,'d':domain,'p':path,'f':file,'h':protocol}
}