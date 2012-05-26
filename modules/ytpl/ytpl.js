

//
// YouTube JavaScript API Player With Playlist
// http://911-need-code-help.blogspot.com/2009/10/youtube-javascript-player-with-playlist.html
// Revision 2 [2012-03-24]
//
// Prerequisites
// 1) Create following elements in your HTML:
// -- a) ytplayer: a named anchor
// -- b) ytplayer_div1: placeholder div for YouTube JavaScript Player
// -- c) ytplayer_div2: container div for playlist
// 2) Include SWFObject library from http://code.google.com/p/swfobject/
//
function YtPl (name,div,properties) {
	this.name = name
	this.parr = $('#'+div)
	this.elements = {}
	this.delMode = false
	this.history =false
	this.settings = defaults(properties,
		{
		'image':'modules/form/components/google.png',
		'size':[300,200,50],
		'position':'left',
		'margin':[[5,5],
				  [5,5]],
		'fontsize':18,
		'duration':500,
		'direction':'u',
		'rounding':5,
		'form':'modules/form/components/google.html',
		'UpdateSizes':{},
		'PlayList':[],
		'close':'modules/tabs/components/close.png',
		'add':'modules/tabs/components/add.png',
		'tools':'modules/tabs/components/tools.png',
		'refresh':'modules/tabs/components/refresh.png',
		'history':'modules/tabs/components/history.png'
		});
	if (getCookie(this.name+'vids') == false){
		setCookie(this.name+'vids',this.settings.PlayList.toSource(),365)
	} else {
		this.settings['PlayList'] = eval(getCookie(this.name+'vids'))
	}
	this.Build = function () {
	  this.BuildFrames()
	  this.BuildPlaylist()
	  this.BuildPlayer()
	  this.BuildInteraction()
	}
	this.BuildFrames = function () {
	  MakeElement(this.settings,this.elements,
		'YtPl',this.parr,[name],
		{'width':this.settings.size[0],
		  'height':this.settings.size[1]})
		MakeElement(this.settings,this.elements,
		  'YtPl-Video',this.elements['YtPl'],[name],
		  {'width':'-'+this.settings.size[2],
			'height':this.settings.size[1]})
		MakeElement(this.settings,this.elements,
		  'YtPl-Playlist',this.elements['YtPl'],[name],
		  {'width':this.settings.size[2],
			'height':this.settings.size[1]})
		  ////PlayList Actions
		  MakeElement(this.settings,this.elements,
			'YtPl-Playlist-Actions',this.elements['YtPl-Playlist'],[name],
			{'width':this.settings.size[2],
			  'height':this.settings.size[3]})
			MakeElement(this.settings,this.elements,
			  'YtPl-Playlist-Actions-Wrapper',this.elements['YtPl-Playlist-Actions'],[name],
			  {'width':this.settings.size[2],
				'height':this.settings.size[3]*2})
			MakeElement(this.settings,this.elements,
			  'YtPl-Playlist-Actions-Wrapper-Actions',this.elements['YtPl-Playlist-Actions-Wrapper'],[name],
			  {'width':this.settings.size[2],
				'height':this.settings.size[3]})
			  MakeElement(this.settings,this.elements,
				'YtPl-Add',this.elements['YtPl-Playlist-Actions-Wrapper-Actions'],[name],
				{'width':this.settings.size[3],
				  'height':this.settings.size[3],
				  'float':'left',
				  'background-image':'url('+this.settings.add+')',
				  'background-size':this.settings.size[3]+'px '+this.settings.size[3]+'px'})
			  MakeElement(this.settings,this.elements,
				'YtPl-Undo',this.elements['YtPl-Playlist-Actions-Wrapper-Actions'],[name],
				{'width':this.settings.size[3],
				  'height':this.settings.size[3],
				  'float':'left',
				  'background-image':'url('+this.settings.history+')',
				  'background-size':this.settings.size[3]+'px '+this.settings.size[3]+'px'})
			  MakeElement(this.settings,this.elements,
				'YtPl-Close',this.elements['YtPl-Playlist-Actions-Wrapper-Actions'],[name],
				{'width':this.settings.size[3],
				  'height':this.settings.size[3],
				  'float':'left',
				  'background-image':'url('+this.settings.close+')',
				  'background-size':this.settings.size[3]+'px '+this.settings.size[3]+'px'})
			this.elements['YtPl-Playlist-Actions-Wrapper-Input'] =
			jQuery('<form/>',
				{
					'id':this.name+'YtPl-Playlist-Actions-Wrapper-Input',
					'class':'YtPl-Playlist-Actions-Wrapper-Input',
					'method':'POST',
					'action':'javascript:void(0);'
				}
				)
			this.elements['YtPl-Playlist-Actions-Wrapper-Input'].width(this.settings.size[2])
			this.elements['YtPl-Playlist-Actions-Wrapper-Input'].height(this.settings.size[3])
			this.elements['YtPl-Playlist-Actions-Wrapper-Input'].html(
					'<center><input style=margin-top:'+((this.settings.size[3]-25)/2)+'px; TYPE=text name=p id=YtPl-input size='+(5+((this.settings.size[2]-100)*(11/100)))+' maxlength=255 >'+
					'<input type=submit name=urlIn hidden></center>'
				)
		this.elements['YtPl-Playlist-Actions-Wrapper'].append(this.elements['YtPl-Playlist-Actions-Wrapper-Input'])
		  MakeElement(this.settings,this.elements,
			'YtPl-Playlist-Scroll',this.elements['YtPl-Playlist'],[name],
			{'width':this.settings.size[2]+40,
			  'height':'-'+this.settings.size[3],
			  'overflow':'auto'})
	  SetSizes(this)
	}
	this.BuildInteraction = function () {
	  for (pl in this.elements.thumbs) {
		Click(this.elements.thumbs[pl],
			  [[this.SwitchVideo,{'this':this,'item':pl}]])
	  }
	  //alert(this.elements['YtPl'].closest('.Grid-Cell').attr('id'))
		Resize(this.elements['YtPl'].closest('.Grid-Cell'),
			   [[SetSizes,this]])
		Click (this.elements['YtPl-Add'],
			   [[this.InputVideo,this]])
		Submit(this.elements['YtPl-Playlist-Actions-Wrapper-Input'],
			[
			   [this.Update,
				this]])
		Click (this.elements['YtPl-Close'],
			   [[this.CloseOne,this]])
		Click (this.elements['YtPl-Close'],
			   [[this.CloseHold,this]],true)
		Click (this.elements['YtPl-Undo'],
			   [[this.Undo,this]])
	}
	this.BuildPlayer = function () {
	  MakeElement(
		  this.settings,
		  this.elements,//this.elements
		  'YtPl-Video-Frame',//'Tabs-Actions-Wrapper'
		  this.elements['YtPl-Video'],//'Tabs-Actions'
		  [this.name],//[name]
		  {'width':'100%',
			'height':'100%'},
		  true,
		  '<iframe/>'
		)
	  if (this.settings.PlayList.length != 0) {
		this.elements['YtPl-Video-Frame'].attr('src','http://www.youtube.com/v/'+this.settings.PlayList[0].vid+'&enablejsapi=1&rel=0&fs=1&version=3')
		this.elements['thumbs'][this.settings.PlayList[0].vid].addClass('selected')
	  }
	//  this.elements['YtPl-Video'].append(
	//	"<iframe width=100% height=100% src="+
	//	  'http://www.youtube.com/v/'+this.settings.PlayList[0]+'&enablejsapi=1&rel=0&fs=1&version=3'+
	//	" >"+
	//	"</iframe>"
	//  )
	}
	this.BuildPlaylist = function () {
	  this.elements['thumbs'] = {}
	  for (pl in this.settings.PlayList) {
		//img.src = "http://img.youtube.com/vi/"+this.settings.PlayList[pl]+"/default.jpg";
		this.Uid = this.settings.PlayList[pl]['vid']
		while (this.Uid in this.elements['thumbs']) {
		  this.Uid += '-'
		}
		//alert(Uid == this.settings.PlayList[pl]['vid'])
		MakeElement(
		  this.settings,
		  this.elements['thumbs'],//this.elements
		  this.Uid,//'Tabs-Actions-Wrapper'
		  this.elements['YtPl-Playlist-Scroll'],//'Tabs-Actions'
		  [this.name],//[name]
		  {'width':this.settings.size[2],
			'height':'auto'},
		  true,
		  '<a/>'
		)
		this.elements['thumbs'][this.Uid].append(
			"<img width="+this.settings.size[2]+"px height=auto alt="
			+this.settings.PlayList[pl].vid+
			" src=http://img.youtube.com/vi/"+this.settings.PlayList[pl].vid+"/default.jpg"+
		  " />"
		)
	  }
	}
	this.SwitchVideo = function (data) {
	  if (data['this'].delMode == 'one' || data['this'].delMode == true) {
		
		//slide old out
		data['this'].elements['thumbs'][data.item].animate({height:0},function(){data['this'].elements['thumbs'][data.item].remove()})
		//remove from arrays
		n = indexOfDict('vid',data.item.slice(0,11),data['this'].settings.PlayList)
		data['this'].history = data['this'].settings.PlayList[n]
		data['this'].settings.PlayList.splice(n,1)
		//update cookies
		setCookie(data['this'].name+'vids',data['this'].settings.PlayList.toSource(),365)
		if (data['this'].delMode == 'one') {
		  data['this'].delMode = false
		  data['this'].elements['YtPl-Close'].css('background-color','rgba(0,0,0,0)')
		}
	  } else {
		data['this'].elements['YtPl-Playlist-Scroll'].find('.selected').removeClass('selected')
		data['this'].elements['thumbs'][data.item].addClass('selected')
		data['this'].elements['YtPl-Video-Frame'].attr('src','http://www.youtube.com/v/'+data.item.slice(0,11)+'&enablejsapi=1&rel=0&fs=1&version=3')
	  }
	}
	this.InputVideo = function (This) {
	  This.elements['YtPl-Playlist-Actions-Wrapper-Input'].find('#YtPl-input').select()
	  This.elements['YtPl-Playlist-Actions-Wrapper'].animate({marginTop:-This.settings.size[3]})
	}
	this.Update = function (This) {
	  This.elements['YtPl-Playlist-Actions-Wrapper-Input'].find('#YtPl-input').blur()
	  Vid = This.elements['YtPl-Playlist-Actions-Wrapper-Input'].find('#YtPl-input')[0].value
	  if (Vid != '') {
		This.settings.PlayList.push({'vid':Vid,'play':0})
		setCookie(This.name+'vids',This.settings.PlayList.toSource(),365)
		//This.elements['YtPl-Playlist-Actions-Wrapper-Input'].find('#YtPl-input')[0].attr('value','')
		This.Uid = Vid
		while (This.Uid in This.elements['thumbs']) {
		  This.Uid += '-'
		}
		MakeElement(
		  This.settings,This.elements['thumbs'],
		  This.Uid,This.elements['YtPl-Playlist-Scroll'],[This.name],
		  {'width':This.settings.size[2],
			'height':'auto'},
		  true,
		  '<a/>'
		)
		This.elements['thumbs'][This.Uid].append(
			"<img width="+This.settings.size[2]+"px height=auto alt="
			+Vid+
			" src=http://img.youtube.com/vi/"+Vid+"/default.jpg"+
		  " />"
		)
		Click(This.elements.thumbs[This.Uid],
		  [[This.SwitchVideo,{'this':This,'item':This.Uid}]])
	  }
	  This.elements['YtPl-Playlist-Actions-Wrapper'].animate({marginTop:0}) 
	}
	this.CloseOne = function (This) {
	  if (This.delMode == false) {
		This.delMode = 'one'
		This.elements['YtPl-Close'].css('background-color','rgba(0,0,100,0.5)')
	  } else {
		This.delMode = false
		This.elements['YtPl-Close'].css('background-color','rgba(0,0,0,0)')
	  }
	}
	this.CloseHold = function (This){
	  This.delMode = true
	  This.elements['YtPl-Close'].css('background-color','rgba(100,0,25,0.5)')
	}
	this.Undo = function (This) {
	  if (This.history != false) {
		Vid = This.history.vid
		This.settings.PlayList.push(This.history)
		setCookie(This.name+'vids',This.settings.PlayList.toSource(),365)
		This.Uid = Vid
		while (This.Uid in This.elements['thumbs']) {
		  This.Uid += '-'
		}
		MakeElement(
		  This.settings,This.elements['thumbs'],
		  This.Uid,This.elements['YtPl-Playlist-Scroll'],[This.name],
		  {'width':This.settings.size[2],
			'height':'auto'},
		  true,
		  '<a/>'
		)
		This.elements['thumbs'][This.Uid].append(
			"<img width="+This.settings.size[2]+"px height=auto alt="
			+Vid+
			" src=http://img.youtube.com/vi/"+Vid+"/default.jpg"+
		  " />"
		)
		Click(This.elements.thumbs[This.Uid],
			[[This.SwitchVideo,{'this':This,'item':This.Uid}]])
		This.history = false
	  }
	  
	}
  this.Build()
}
// Variables
// -- ytplayer_playlist: an array containing YouTube Video IDs
// -- ytplayer_playitem: index of the video to be played at any given time
//
//function YtPl (name,div,properties) {
//	this.name = name
//	this.parr = $('#'+div)
//	this.elements = {}
//	this.settings = defaults(properties,
//		{
//		'image':'modules/form/components/google.png',
//		'size':[300,200,50],
//		'position':'left',
//		'margin':[[5,5],
//				  [5,5]],
//		'fontsize':18,
//		'duration':500,
//		'direction':'u',
//		'rounding':5,
//		'form':'modules/form/components/google.html',
//		'UpdateSizes':{},
//		'PlayList':[]
//		});
//  this.ytplayer_playlist = this.settings.PlayList;
//  this.ytplayer_playitem = 0;
//  this.Build = function (){
//	this.BuildFrames()
//	SetSizes(this)
//	alert('p>'+this.parr.width())
//	alert('m>'+this.elements['YtPl'].width())
//	alert('v>'+this.elements['YtPl-Video'].width())
//	alert('pl>'+this.elements['YtPl-Playlist'].width())
//	swfobject.addLoadEvent( this.ytplayer_render_player(this) );
//	swfobject.addLoadEvent( this.ytplayer_render_playlist(this) );
//  }
//  this.BuildFrames = function () {
//	//<a name="ytplayer"></a>
//	MakeElement(
//	  this.settings,
//	  this.elements,//this.elements
//	  'YtPl',//'Tabs-Actions-Wrapper'
//	  this.parr,//'Tabs-Actions'
//	  [name],//[name]
//	  {'width':this.settings.size[0],
//		'height':this.settings.size[1]},
//	  true,'<a />')
//	alert(this.parr.find('.YtPl').toArray().length)
////<div id="ytplayer_div1">You need Flash player 8+ and JavaScript enabled to view this video.</div>
//	MakeElement(
//	  this.settings,
//	  this.elements,//this.elements
//	  'YtPl-Video',//'Tabs-Actions-Wrapper'
//	  this.elements['YtPl'],//'Tabs-Actions'
//	  [name],//[name]
//	  {'width':'-'+this.settings.size[2],
//		'height':this.settings.size[1]})
////<div id="ytplayer_div2"></div>
//	MakeElement(
//	  this.settings,
//	  this.elements,//this.elements
//	  'YtPl-Playlist',//'Tabs-Actions-Wrapper'
//	  this.elements['YtPl'],//'Tabs-Actions'
//	  [name],//[name]
//	  {'width':this.settings.size[2],
//		'height':this.settings.size[1],
//		'overflow':'auto'})
//  }
//  this.ytplayer_render_player = function (This)
//  {
//	swfobject.embedSWF
//	(
//	  'http://www.youtube.com/v/' + This.ytplayer_playlist[ This.ytplayer_playitem ] + '&enablejsapi=1&rel=0&fs=1&version=3',
//	  This.name+'YtPl-Video',
//	  '100%',
//	  '100%',
//	  '8',
//	  null,
//	  null,
//	  {
//		allowScriptAccess: 'always',
//		allowFullScreen: 'true'
//	  },
//	  {
//		id: This.name+'YtPl-Player'
//	  }
//	);
//  }
//  this.ytplayer_render_playlist = function ( )
//  {
//	for ( var i = 0; i < this.ytplayer_playlist.length; i++ )
//	{
//	  var img = document.createElement( "img" );
//	  img.src = "http://img.youtube.com/vi/" + this.ytplayer_playlist[ i ] + "/default.jpg";
//	  var a = document.createElement( "a" );
//	  
//	  a.href = "#"+this.name+"YtPl";
//	  //
//	  // Thanks to some nice people who answered this question:
//	  // http://stackoverflow.com/questions/1552941/variables-in-anonymous-functions-can-someone-explain-the-following
//	  //
//	  a.onclick = (
//		function( j )
//		{
//		  return function( )
//		  {
//			this.ytplayer_playitem = j;
//			this.ytplayer_playlazy( 1000 );
//		  };
//		}
//	  )( i );
//	  a.appendChild( img );
//	  document.getElementById( this.name+"YtPl-Playlist" ).appendChild( a );
//	}
//  }
//  this.ytplayer_playlazy = function ( delay )
//  {
//	//
//	// Thanks to the anonymous person posted this tip:
//	// http://www.tipstrs.com/tip/1084/Static-variables-in-Javascript
//	//
//	if ( typeof this.ytplayer_playlazy.timeoutid != 'undefined' )
//	{
//	  window.clearTimeout( this.ytplayer_playlazy.timeoutid );
//	}
//	this.ytplayer_playlazy.timeoutid = window.setTimeout( this.ytplayer_play, delay );
//  }
//  this.ytplayer_play = function ( )
//  {
//	var o = document.getElementById(this.name+'YtPl-Player' );
//	if ( o )
//	{
//	  o.loadVideoById( this.ytplayer_playlist[ this.ytplayer_playitem ] );
//	}
//  }
//  //
//  // Ready Handler (this function is called automatically by YouTube JavaScript Player when it is ready)
//  // * Sets up handler for other events
//  //
//  this.onYouTubePlayerReady = function (playerid)
//  {
//	var o = document.getElementById(this.name+'YtPl-Player');
//	if ( o )
//	{
//	  o.addEventListener( "onStateChange", this.ytplayerOnStateChange );
//	  o.addEventListener( "onError", this.ytplayerOnError );
//	}
//  }
//  //
//  // State Change Handler
//  // * Sets up the video index variable
//  // * Calls the lazy play function
//  //
//  this.ytplayerOnStateChange = function ( state )
//  {
//	if ( state == 0 )
//	{
//	  this.ytplayer_playitem += 1;
//	  this.ytplayer_playitem %= this.ytplayer_playlist.length;
//	  this.ytplayer_playlazy( 5000 );
//	}
//  }
//  //
//  // Error Handler
//  // * Sets up the video index variable
//  // * Calls the lazy play function
//  //
//  this.ytplayerOnError = function ( error )
//  {
//	if ( error )
//	{
//	  this.ytplayer_playitem += 1;
//	  this.ytplayer_playitem %= this.ytplayer_playlist.length;
//	  this.ytplayer_playlazy( 5000 );
//	}
//  }
//  this.Build()
//}
//
// Add items to the playlist one-by-one
//
//this.ytplayer_playlist.push( 'tGvHNNOLnCk' );
//this.ytplayer_playlist.push( '_-8IufkbuD0' );
//this.ytplayer_playlist.push( 'wvsboPUjrGc' );
//this.ytplayer_playlist.push( '8To-6VIJZRE' );
//this.ytplayer_playlist.push( '8pdkEJ0nFBg' );