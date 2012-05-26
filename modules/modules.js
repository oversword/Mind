function AddScript(url){
	var head = document.getElementsByTagName('head')[0];
	var script = document.createElement('script');
	script.type = 'text/javascript';
	script.src = url;
	head.appendChild(script);
}
//Youtube
AddScript('http://ajax.googleapis.com/ajax/libs/swfobject/2/swfobject.js')
//Hover
AddScript('http://cherne.net/brian/resources/jquery.hoverIntent.minified.js')
//Draggable
AddScript('modules/jquery-ui-1.8.20.custom.min.js')
//Modules
AddScript('modules/slider/slider.js')
AddScript('modules/ytpl/ytpl.js')
AddScript('modules/grid/grid.js')
AddScript('modules/content/content.js')
AddScript('modules/link/link.js')
AddScript('modules/form/form.js')
AddScript('modules/tabs/tabs.js')

hover_log = {}
function _Run (funct,peram) {
	if (peram == '' || peram == 0 || peram == undefined){
		funct()
	} else {
		funct(peram)
	}
}
function hover_intent(hoverElement,delta,duration) {
	if (delta != 're' && delta != null){
		hover_log[hoverElement] = [delta,duration]
		hoverElement.hoverIntent(
			function(){
				for (d in delta) {
					delta[d][0].stop();
					if (delta[d][1].length != undefined) {
						for (D in delta[d][1]) {
							if (delta[d][1][D] == 'clear') {
								delta[d][0].clearQueue()
							} else if (typeof delta[d][1][D] == typeof{}){
								delta[d][0].animate(delta[d][1][D],duration);
							} else if (typeof delta[d][1][D] == typeof 1) {
								delta[d][0].delay(delta[d][1][D]);
							}
						}
					} else {
						delta[d][0].animate(delta[d][1],duration);
					}
				}				
			},function(){
				for (d in delta) {
					delta[d][0].stop()
					if (delta[d][2].length != undefined) {
						for (D in delta[d][2]) {
							if (delta[d][2][D] == 'clear') {
								delta[d][0].clearQueue()
							} else if (typeof delta[d][2][D] == typeof{}){
								delta[d][0].animate(delta[d][2][D],duration);
							} else if (typeof delta[d][2][D] == typeof 1) {
								delta[d][0].delay(delta[d][2][D]);
							}
						}
					} else {
						delta[d][0].animate(delta[d][2],duration);
					}
				}
			}
		)
	} else if (delta == null) {
		hoverElement.hoverIntent(function(){},function(){})
	} else if (delta == 're'){
		//alert(hover_log[hoverElement][0])
		hover_intent(hoverElement,hover_log[hoverElement][0],hover_log[hoverElement][1])
	}
}

function defaults(properties,default_props){
	if (properties == null){
		properties = default_props
	} else {
		for (prop in default_props) {
			if (! (prop in properties)){
				properties[prop] = default_props[prop]
			}
		}
	}
	return properties;
}

function Click(element,funct,dblClck){
	dblClck = typeof dblClck !== 'undefined' ? dblClck : false;
	if (dblClck) {
		element.dblclick(
			function(){
				for (f in funct) {
					if (funct[f][1] == '' || funct[f][1] == 0 || funct[f].length == 1){
						funct[f][0]()
					} else {
						funct[f][0](funct[f][1])
					}
				}
			}
		)
	} else {
		element.click(
			function(){
				for (f in funct) {
					if (funct[f][1] == '' || funct[f][1] == 0 || funct[f].length == 1){
						funct[f][0]()
					} else {
						funct[f][0](funct[f][1])
					}
				}
			}
		)
	}
}
function Scroll(element,funct){
	element.scroll(
		function(){
			for (f in funct) {
				if (funct[f][1] == '' || funct[f][1] == 0 || funct[f].length == 1){
					funct[f][0]()
				} else {
					funct[f][0](funct[f][1])
				}
			}
		}
	)
}
function Resize(element,funct){
	element.resize(
		function(){
			for (f in funct) {
				if (funct[f][1] == '' || funct[f][1] == 0 || funct[f].length == 1){
					funct[f][0]()
				} else {
					funct[f][0](funct[f][1])
				}
			}
		}
	)
}
function Submit (element,funct) {
	element.submit(
		function(){
			for (f in funct) {
				if (funct[f][1] == '' || funct[f][1] == 0 || funct[f].length == 1){
					eval(funct[f][0])
				} else {
					funct[f][0](funct[f][1])
				}
			}
		}
	)
}
function Load (element,funct) {
	element.load(
		function(){
			for (f in funct) {
				if (funct[f][1] == '' || funct[f][1] == 0 || funct[f].length == 1){
					eval(funct[f][0])
				} else {
					funct[f][0](funct[f][1])
				}
			}
		}
	)
}
function DragDrop (element,funct) {
	if ('start' in funct) {
		if ('drag' in funct) {
			element.draggable({
					containment: "parent",
					start:function (event,ui) {
						for (f in funct.start) {
							_Run(funct.start[f][0],[event,funct.start[f][1]])
						}
					},
					drag: function (event,ui) {
						for (f in funct.drag) {
							_Run(funct.drag[f][0],[event,funct.drag[f][1]])
						}
					}
				})
		} else {
			element.draggable({
					containment: "parent",
					start:function (event,ui) {
						for (f in funct.start) {
							_Run(funct.start[f][0],[event,funct.start[f][1]])
						}
					}
				})
		}
	} else if ('drag' in funct){
		element.draggable({
				containment: "parent",
				drag: function (event,ui) {
					for (f in funct.drag) {
						_Run(funct.drag[f][0],[event,funct.drag[f][1]])
					}
				}
			})
		
	}
	if ('drop' in funct) {
		element.parent().droppable({
			drop: function (event, ui) {
				for (f in funct.drop) {
					_Run(funct.drop[f][0],[event,funct.drop[f][1]])
				}
			}
		})
	}
}
function Sortable (element,props,funct) {
	element.sortable()
	for (p in props) {
		element.sortable('option',p,props[p])
	}
	for (F in funct) {
	//if ('update' in funct) {
		element.bind( "sort"+F,
		//element.sortable({
			//'update':
			function(event, ui) {
				for (f in funct[F]) {
					_Run(funct[F][f][0],[event,ui,funct[F][f][1]])
				}
			//}
		});
	}
}
//cookies methods from http://www.w3schools.com/js/js_cookies.asp
function setCookie(c_name,value,exdays) {
	var exdate=new Date();
	exdate.setDate(exdate.getDate() + exdays);
	var c_value=escape(value) + ((exdays==null) ? "" : "; expires="+exdate.toUTCString());
	document.cookie=c_name + "=" + c_value;
}
function getCookie(c_name) {
	var i,x,y,ARRcookies=document.cookie.split(";");
	for (i=0;i<ARRcookies.length;i++) {
		x=ARRcookies[i].substr(0,ARRcookies[i].indexOf("="));
		y=ARRcookies[i].substr(ARRcookies[i].indexOf("=")+1);
		x=x.replace(/^\s+|\s+$/g,"");
		if (x==c_name) {
			return unescape(y);
		}
	}
	return false;
}
//Yt methods from http://stackoverflow.com/questions/5194619/getting-youtube-video-information-using-javascript-jquery
function getYouTubeInfo(code,vari,element) {
	$.ajax({
			url: "http://gdata.youtube.com/feeds/api/videos/"+code+"?v=2&alt=json",
			dataType: "jsonp",
			success: function (data) {parseresults(data,vari,element); }
	});
}
function parseresults(data,vari,element) {
	var title = data.entry.title.$t;
	var description = data.entry.media$group.media$description.$t;
	var viewcount = data.entry.yt$statistics.viewCount;
	var author = data.entry.author[0].name.$t;
	if (vari != undefined){
		vari = title
	}
	if (element != undefined) {
		element.html(title)
	}
}
function MakeElement(
					settingsObj,
					parObject,//this.elements
					name,//'Tabs-Actions-Wrapper'
					parentObj,//'Tabs-Actions'
					idVars,//[name]
					settings,//{'width':this.settings.size[3],
							//'height':this.settings.size[3]+'*'+4}
					buildNow,
					type//<a/>
				) {
	//alert(name)
	id = ''
	for (i in idVars) {
		id+=idVars[i]
	}
	if (type == undefined && type == null) {
		parObject[name] =
			jQuery('<div/>',
			{
				'id':id+name,
				'class':name
			}
			)
	} else {
		parObject[name] =
			jQuery(type,
			{
				'id':id+name,
				'class':name
			}
			)
	}
	
	
	Uid = id
	while (Uid in settingsObj['UpdateSizes']){
		Uid+='-'
	}
	settingsObj['UpdateSizes'][Uid] = {'parObject':parObject,
								'name':name}
	for (setting in settings) {
		if (typeof settings[setting] == typeof [] ||
			(typeof settings[setting] == typeof '' &&
				(settings[setting].indexOf('-')==0 ||
				 settings[setting].indexOf('+')==0 ||
				 settings[setting].indexOf('<')==0))
			){
				//do update logic
				//alert(name+'>'+setting+':'+settings[setting])
				settingsObj['UpdateSizes'][Uid][setting] = settings[setting]
			} else {
				if (setting == 'width') {
					parObject[name].width(settings[setting])
				} else if (setting == 'height') {
					parObject[name].height(settings[setting])
				} else {
					parObject[name].css(setting,settings[setting])
				}
			}
		
	}
	if (buildNow != false) {
		parentObj.append(parObject[name])
	}
}
function SetSizes (data) {
	//data.settings.UpdateSizes[name].parObject[name]
	//name is actually object
	for (Uid in data.settings.UpdateSizes) {
		if (DictLength (data.settings.UpdateSizes[Uid])>2){
			name = data.settings.UpdateSizes[Uid]['name']
			for (setting in data.settings.UpdateSizes[Uid]) {
				if (setting != 'name' && setting != 'parObject'){
					//alert(name+'>'+setting+':'+data.settings.UpdateSizes[name][setting])
					if (typeof data.settings.UpdateSizes[Uid][setting] == typeof {}) {
						//alert(data.settings.UpdateSizes[Uid][setting])
						tempSet = 1
						for (m in data.settings.UpdateSizes[Uid][setting]){
							if (m == 'width'){
								tempSet*=data.settings.UpdateSizes[Uid][setting][m].width()
							} else if (m == 'height') {
								tempSet*=data.settings.UpdateSizes[Uid][setting][m].height()
							} else if (m == 'length') {
								tempSet*=data.settings.UpdateSizes[Uid][setting][m].length
							} else {
								tempSet*=data.settings.UpdateSizes[Uid][setting][m]
							}
						}
					} else if (data.settings.UpdateSizes[Uid][setting].indexOf('-')==0){
						if (setting == 'width') {
							tempSet =
								data.settings.UpdateSizes[Uid].parObject[name].parent().width()-
								parseInt(data.settings.UpdateSizes[Uid][setting].slice(1))
						
						} else
						if (setting == 'height') {
							tempSet =
								data.settings.UpdateSizes[Uid].parObject[name].parent().height()-
								parseInt(data.settings.UpdateSizes[Uid][setting].slice(1))
						}
					} else if (data.settings.UpdateSizes[Uid][setting].indexOf('<')==0) {
						count = data.settings.UpdateSizes[Uid][setting].lastIndexOf('<')+1
						multi = parseInt(data.settings.UpdateSizes[Uid][setting].slice(count,-1))/100
						par = data.settings.UpdateSizes[Uid].parObject[name]
						for (var c=0;c<count;c++){
							par = par.parent()
						}
						if (setting == 'width') {
							tempSet =
								par.width()*multi
						
						} else
						if (setting == 'height') {
							tempSet =
								par.height()*multi
						}
					}
					data.settings.UpdateSizes[Uid].parObject[name].css(setting,tempSet)
				}
			}
		}
	}
}
function indexOfDict (key,value,list) {
	for (l in list) {
		if (list[l][key] == value) {
			return l
		}
	}
	return -1
}
function DictLength (Dict) {
	s = 0
	for (d in Dict) {
		s++
	}
	return s
}