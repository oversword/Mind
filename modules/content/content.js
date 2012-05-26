var FiledElement;
function FillPage (name) {
	FiledElement = $('#'+name)
	FiledElement.width(window.innerWidth)
	FiledElement.height(window.innerHeight)
	FiledElement.css('overflow','hidden')
	FiledElement.css('position','absolute')
	FiledElement.offset({top:0,left:0})
	
	$(window).resize(function() {
		if (FiledElement != undefined){
		FiledElement.width(window.innerWidth)
		FiledElement.height(window.innerHeight)
		}
	});
}
function InsertContent (element,file,how,done,width,fontsize) {
	var txtFile = new XMLHttpRequest();
	txtFile.open("GET", file, true);
	txtFile.onreadystatechange = function() {
		if (txtFile.readyState === 4) {  // Makes sure the document is ready to parse.
			allText = txtFile.responseText;
			if (how == 'append'){
				element.append(allText);
			} else {
				element.html(allText);				
			}
			if (done != undefined){
				if (width != undefined) {
					done(element,width,fontsize)
				} else {
					done(element)
				}
			}
		}
	}
	txtFile.send(null);
}

/*The above code was possible thanks to Andy E on this forum http://social.msdn.microsoft.com/Forums/hu-HU/sidebargadfetdevelopment/thread/64ea2d16-7594-400b-8b25-8b3b9a078eab*/
