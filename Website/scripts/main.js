$(function(){//DOM READY
	
	// *** MAIN LOGO MOUSE EVENTS *********************************** //
	var logoLink = $( "a", "#logo" );
	if( logoLink.length ){
		logoLink.delegate( this, "click focus", function( event ){
			
			if( event.type == "click" ){
				
				page.doHrefRequest( this.href );
				return;
			}
			if( event.type == "focus" ){
				this.blur();
				return;
			}
		});
	}
	// ************************************************************** //
	
	
	// *** NAVIGATION MENU EVENTS ******************************************** //
	var _mnuItems = $( "a", "#_menu" );
	if( _mnuItems.length ){
		
		_mnuItems.delegate(this, "mouseover mouseout focus click", function(event){
			if( "mouseover" == event.type ){
				$( this ).animate({ "color":"#999"}, 450);
				return;
			}
			if( "mouseout" == event.type ){
				$( this ).animate({ "color":"#FFF"}, 250);
				return;
			}
			if( "focus" == event.type ){
				$(this).blur();
				return;
			}
			if( "click" == event.type ){
				$( this ).css({ "backgroundColor":"#000"});
				page.doHrefRequest( this.href );
				return;
			}
		});
	}
	// *********************************************************************** //
	
	//CALL TWITTER FEED PRIOR TO PAGE SETUP
	twitter_widg( twitterUser, tweetCount, twitter_div_id );
	
	//APPLY CUSTOM BACKGROUNDS IF AVAILABLE
	var wrapper = $( "#wrapper" );
	if( wrapper.length ){
		wrapper.css({ backgroundImage: "url("+page.bgImage+")", backgroundColor: page.bgColor });
	}
	var footer = $( "#footer" );
	if( footer.length ){
		footer.css({ backgroundImage: "url("+page.footerBGImg+")", backgroundColor: page.footerBGColor });
	}
	
	// *** RUN PAGE SETUP ******************************* //
	setTimeout( function(){ page.init(); }, 100 );
	// ************************************************** //
});


// --------------------------------------- //
// ********* TEMPLATE FUNCTIONS ********* //
// ------------------------------------- //


// *** BEGIN TILE FADE OUT ... NEXT TILE FADED ONLY WHEN LAST ANIMATION COMPLETE ************************************* //
page.asyncFadeOut = function( contentID ){
	
	var tile_bin = new Array();
	var counter = 0, _binLength = 0, randy = 0, animateTop = false;
	
	var excludeTile = parseInt( page.clickedTile.substr(-1, 1));//clicked tile 'data' attribute (ending integer only)
				
	if( page.tiles.length ){
		page.tiles.each(function(){
			var tile_data = $( this ).attr( "data" );
			if( page.clickedTile != tile_data ){ tile_bin.push( tile_data ); }
			else{
				// use internal pointer (counter) to determine position of selected content
				// if selected is among bottom 3 tiles, set animate top offset
				if( counter > 2){
					animateTop = true;
				}
			}
			counter++;
		});
	}
	
	_binLength = tile_bin.length;
	
	function privateFadeOutTile(){
		
		if( _binLength ){
		
			//CHOOSE A RANDOM NUMBER BETWEEN 1 AND LENGTH OF TILE BIN
			randy = Math.random(); // (0 - 1]
			randy = Math.floor( randy*(_binLength) );
			randy = parseInt( randy );
			
			$( ".center-tile[data='"+(tile_bin[randy]).toString()+"']" ).animate({opacity: 0}, 200, function(){
				
				$( this ).remove();//RID DOM OF THE HIDDEN TILE
				
				tile_bin.splice( randy, 1 );//REDUCE TILE BIN BY 1
				_binLength--;
				
				privateFadeOutTile();
			});
		}
		else{
			//TILE FADE OUT DONE ... BRING IN REQUESTED PAGE CONTENT
			privateGetContent( contentID );
		}
	}
	
	function privateGetContent( contentID ){
			
		var sourceElement = $( "#" + contentID );
		var bgColor = "";
		
		var tile_sub_label 	= sourceElement.children( "p" );
		var tile_sub_label_2 = sourceElement.children( "span" );
		tile_sub_label_2.css("display", "none");
		
		var transferBGStyle = sourceElement.children( "p" );
		transferBGStyle = transferBGStyle.css("backgroundColor") + " " + transferBGStyle.css("backgroundImage") + " " + transferBGStyle.css("backgroundRepeat");
		
		//FADE OUT INNER TILE CONTENTS
		tile_sub_label.fadeOut(150, function(){
			
			if( animateTop ){ var run = {width:"135px", height:"41px", marginLeft:"0px", top:"260px", opacity:0 }; }
			else{ var run = { width:"135px", height:"41px", marginLeft:"0px", opacity:0 }; }
			
			sourceElement.css({ background: transferBGStyle, height: "-=10px" });
			sourceElement.animate( run, 450, function(){
				
				window.location.hash = "#!"+contentID;//SET URL HASH
				$( page.animateOnLeave.toString() ).css("display", "none");//REMOVE CONTENT IN ORDER TO ANIMATE-IN REQUESTED FILE
				page.loadContent( contentID.toString() );//BRING IN CONTENT				
			});
		});
	}
	
	privateFadeOutTile();

}//END :: PAGE.ASYNCFADEOUT()
// ******************************************************************************************************************* //


page.delegateTileEvents = function(){
	
	var tile_text_overlay = "";
	
	page.tiles.delegate(this, "mouseover mouseout click focus mouseenter mouseleave", function( event ){//DELEGATE EVENT HANDLERS
		
		var tile_text_overlay = "";
		
		//THE EVENT HANDLERS
		if( "mouseenter" == event.type ){ //TILE MOUSEENTER EVENT
			
			this.className.indexOf( "not-clickable" ) != -1 ? this.style.cursor = "default" : this.style.cursor = "pointer";//SET CURSOR STYLE FOR LINKED TILES
			
			$( ".label-text", this ).animate( {paddingLeft:"+=10px"}, 200, function(){ $(this).css("color","#000"); });
			$( ".tile-sub-text-2", this ).fadeTo(350, .8);
			return;
		}
		if( "mouseleave" == event.type ){ //TILE MOUSELEAVE EVENT
			
			$( ".label-text", this ).animate( {paddingLeft:"-=10px"}, 200, function(){ $(this).css("color","#444"); });
			$( ".tile-sub-text-2", this ).fadeTo(350, .5);
			return;
		}
		if( "click" == event.type ){ //TILE CLICK EVENT
			
			var page_request = $( this ).attr( "id" );
	
			if( typeof page_request != "undefined" && page_request ){
				
				page.clickedTile = $( this ).attr( "data" );//GET CLICKED TILE DATA ATTRIBUTE, USED IN SUBSEQUENT FNCTN CALL
				page.asyncFadeOut( page_request );//ASYNCHRONOUSLY FADE OUT TILES
			}
		}
		if( "focus" == event.type ){ //TILE FOCUS EVENT
			
			$( this ).blur();
		}
	});	
}


page.doHrefRequest = function( href ){
	
	if( "undefined" != typeof href && href ){
		var theHref = href;
		theHref = page.getHashFromPath( theHref );
	}
	else{
		var theHref = "home";
	}
	
	$( page.animateOnLeave.toString() ).fadeOut( 300, function(){
		page.loadContent( theHref );
	});
	
	return;
}


// *** MEDIUM-ICON HOVER EVENT ***************** //
page.enableMediumIconOverlay = function(){
	
	var meedIcons = $( ".medium-icon" );
	var content_type =  "", bg = "";
	
	if( meedIcons.length ){
		meedIcons.live("mouseenter mouseleave", function( event ){
			
			if( "mouseenter" == event.type ){
				
				$( "#shim_meed" ).remove();//CLEAR THE WAY
				
				content_type = $(this).attr("class");
				if( /image/g.test( content_type )){
					bg = "url(images/_190_overlay_image.png) no-repeat";
				}
				else if( /video/g.test( content_type )){
					bg = "url(images/_190_overlay_video.png) no-repeat";
				}
				else{
					bg = "url(images/_190_overlay.png) no-repeat";
				}
				
				var meedShim = document.createElement( "div" );
				meedShim.id = "shim_meed";
				meedShim.style.height = "190px";
				meedShim.style.width = "190px";
				meedShim.style.position = "absolute";
				meedShim.style.cursor = "pointer";
				meedShim.style.background = bg;
				
				$( this ).prepend( meedShim );
				return;
			}
			if( "mouseleave" == event.type ){

				$( "#shim_meed" ).fadeOut( 250, function(){
					$( this ).remove();
				});
				return;
			}
		});
	}
	else{
		return;
	}
	
}//END :: PAGE.ENABELMEDIUMICONOVERLAY
// ********************************************* //


// *** ENABLE PRETTYPHOTO CONTENT VIEWER ************************************* //
page.enablePrettyPhoto = function(){
	
	$( "a[rel^='prettyPhoto']", ".prettypics" ).prettyPhoto({
		
		hideFlash:true,
		callback:function(){
			//RESET WINDOW HASH
			if( "undefined" != typeof page.current && page.current ){
				window.location.hash = "#!"+page.current;
			}
			else{
				window.location.hash = "";
			}
		},
		social_tools: ''
	});
	
}//END :: PAGE.ENABLEPRETTYPHOTO()
// *************************************************************************** //


// *** ENABLE HELP & DOCUMENTATION VIA FIRST FUNCTION KEY (F1) ************************************* //
page.enableUserDoc = function(){
	
	if( "undefined" !== typeof enableF1_docs && (true == enableF1_docs || 1 == enableF1_docs) ){
		
		window.document.onkeydown = function( event ){
			
			if( window.event.keyCode && window.event.keyCode == 112 ){
				window.open('docs/help.html');
				return false;
			}
		}
	}
}//END :: PAGE.ENABLEUSERDOC()
// ************************************************************************************************* //


// *** ANIMATE FOOTER CONTENT ***************************** //
page.fadeInFooter = function(){
	
	$( "#footer_inner" ).animate({opacity:1}, 600);
}//END :: PAGE.FADEINFOOTER()
// ******************************************************** //


page.getHashFromPath = function( url ){
	if( url ){
		
		var hashIndex = parseInt( url.indexOf("#") );
		if( 0 == hashIndex || hashIndex > 0 ){
			var hashVal = url.substr( hashIndex + 2 );
			return hashVal;
		}
		return hashVal;
	}
	else {
		return "home";
	}
}


// *** PAGE INITIALIZATION HANDLER **************************************************** //
page.init = function(){
	
	//PAGE CONTENT
	page._body = $( "#content" );
	page._body_html = $( "#page-content" );
	
	//CONTENT TITLE
	page._title = $( "#page-title > span", page._body );
	page._titleanchor = $( "a", "#page-tile");
	
	page.enableUserDoc();//ENABLE TEMPLATE HELP DOC VIA F1 KEY
	
	if( window.location.hash && "#!home" != window.location.hash ){
		
		$( "#content" ).fadeOut( 150, function(){
			page.loadContent( window.location.hash.toString().substr(2), "init_footer_cb");
		});
		
		return;
	}
	else{
		
		page.loadContent( "home" );
		return;
	}

}//END :: PAGE.INIT()
// ************************************************************************************ //


// *** AJAX CONTENT LOADER - LOADS APPROPRIATE CONTENT DEPENDING ON SELECTED LINK ************************************************************ //
page.loadContent = function( contentID, callback ){
	
	contentID 	= 	"undefined" == contentID ? "home" : contentID;
	callback 	= 	"undefined" == callback ? 0 : callback;
	
	// ************************************************* //
	// GET COLOR MAPPING FOR THE CURRENT PAGE ********** //
	if( "home" != contentID ){
		var current_title_color = "#006A41"; //SET A DEFAULT TITLE COLOR
		var isNotHome = true;
		
		for( var t in page.tileDefinition ){
			
			if( contentID == page.tileDefinition[t].page ){
				var current_title_color = page.tileDefinition[t].color;
				break;
			}
		}
	}
	// ************************************************* //
	
	// *** THE AJAX ***************** //
	$.ajax({
		data: {},
		dataType: 'html',
		url: contentID,
		success: function(data){
			
			if( page._body.length ){
				page._body.html(data);
			}
			
			if( typeof isNotHome != "undefined" && isNotHome ){
				
				var page_title = $( "#page-title" );
				page_title.css( "backgroundColor", current_title_color );
				page_title.click(function(){
					var hash_home = "#!home";
					window.location.hash = hash_home;
					page.doHrefRequest( hash_home );
				});
			}
			
			$( "#content" ).fadeIn('slow');//FADE-IN BODY ON SUCCESS
			
			if( "home" == contentID ){
				
				page.tiles = $( ".center-tile" );
				
				var tileRow = 1;
				var tileLeft = 0;
				var pointer = 1;
				var trimTop = 0;
				var tileColorNdx = 0;
				
				//ASSIGN TILE POSITIONS
				page.tiles.each(function(){
					
					"undefined" == typeof page.tileDefinition[tileColorNdx].color ? tileColorNdx = 0 : '';//REAPPLY THE FIRST TILE COLOR IF LESS COLORS ARE DEFINED THAN ARE TILES
					
					if( page.tileDefinition[tileColorNdx].image ){
						var tileCSS = {backgroundImage:"url("+page.tileDefinition[tileColorNdx].image+")"};
					}
					else{
						var _color = page.tileDefinition[tileColorNdx].color;
						var tileCSS = _color ? {backgroundColor:_color} : "#006A41";
					}
					
					$("p", this).css(tileCSS);//ASSIGN THE TILE BACKGROUND COLOR
					
					// RESET --------- //
					if( pointer == 4 ) 
					{
						pointer = 1; tileLeft = 0; tileRow++; 
						if( tileRow > 2 ){
							trimTop = 15;
							$( "#content" ).animate({height:"+=180px"}, 150);
						}
					}
					// --------------- //
					
					$(this).css({marginLeft: tileLeft+"px"});
					if( tileRow > 1 ) $(this).css({top: (tileRow*200 + 47 - trimTop)+"px"});
					
					tileLeft = tileLeft + 334;
					pointer++;
					tileColorNdx++;
				});
				//END POSITIONS
				
				var tile_count = page.tiles.length;
				var tile_list = "";
				var randy = "";
				var fadein_ndx = "";
				
				for( var i = 0; i < tile_count; i++ ){
					tile_list += i+" ";
				}
				
				tile_list = tile_list.replace(/^\s+|\s+$/g,"");//TRIM EXCESS WHITESPACE
				
				tile_list = tile_list.split( " " );//DISJOINT THE LIST OF TILE KEYS INTO AN ARRAY
				
				function theFade(){
					
					//CHOOSE RANDOM NUM BETWEEN 1 AND TILE_COUNT - 1 (SUBTRACT 1 AS RANDOM NUM USED AS TILE INDEX)
					randy = Math.ceil(Math.random()*(tile_count - 1));
					
					//SPLICE SELECTED RANDOM NUM FROM LIST OF TILE TO FADE IN AND PROCEED TO FADE IT IN
					fadein_ndx = tile_list.splice(randy, 1);
					fadein_ndx = parseInt( fadein_ndx );
					tile_count--;
					
					//FADE IN THE TILE
					$( page.tiles[fadein_ndx] ).animate({opacity: 1}, 200, function(){
						
						$( this ).attr("data", "tile"+(fadein_ndx+1));//ASSIGN A DATA ATTRIBUTE ON THE FLY TO TRACK EACH TILE
						
						if( tile_count > 0 ) theFade();//CONTINUE
						else page.fadeInFooter();//FADE IN THE FOOTER
					});
				}
				
				theFade();
			}
			
			//SET SOME POST SUCCESS PROPERTIES
			page.current = contentID;
			page.animateOnLeave = page.current == "home" ? "#content" : "#page-content";
			
			page.enablePrettyPhoto();//ENABLE THE USE OF LOADED PRETTYPHOTO FILE
			page.setActiveLink();//SET THE NAV ITEM TO ACTIVE WHEN PAGE IN VIEW
			page.enableMediumIconOverlay();//ENABLE OVERLAY WHEN HOVER EVENT DETECTED ON ELEMENTS WITH CLASS MEDIUM-ICON
		},
		
		complete: function(){
			
			//THE CALLBACK
			if( callback && "init_footer_cb" == callback ){
				
				//FADE IN FOOTER
				page.fadeInFooter();
			}
			
			/* *** ****************************************************** *** */
			
			//IF NO CONTENT WAS LOADED FOR WHATEVER REASON
			if( page._body && page._body.html() == "" ){
				
				page._body.html("Error while loading. Try reloading or clicking the link again. :)");
				page.templateError( 2 );
				return;
			}
			
			/* *** ****************************************************** *** */
			
			//IF WE JUST LOADED HOME PAGE
			if( "undefined" != typeof page.tiles && page.tiles.length ){
				
				page.delegateTileEvents();
			}
			
			/* *** ****************************************************** *** */
			
			//SOCIAL ICONS
			page.socialIcons = $( ".social-icons" );
			if( page.socialIcons.length ){
				
				$( "a", page.socialIcons ).delegate( this, "mouseover mouseout", function( event ){
					if( "mouseover" == event.type ){
						$( this ).animate({opacity:1}, 500);
						return;
					}
					if( "mouseout" == event.type ){
						$( this ).animate({opacity:.5}, 500);
						return;
					}
				});
			}
	
		},//END :: ONCOMPLETE CALLBACK
		
		error: function( a, b, c ){
			
			alert( "Error: " + c );
		
		}//END :: ON ERROR CALLBACK
	
	});//END :: AJAX REQUEST
		
}
//END :: PAGE.LOADCONTENT()
// ******************************************************************************************************************************************* //


// *** DOUBLE CHECK AND IF NECESSARY SET ACTIVE NAVIGATION MENU LINK POST PAGE LOAD ******//
page.setActiveLink = function(){
	
	var navLinks = $( "#_menu > a" );
	var anchorID = "";
	
	//UNSET NAV ITEM BG COLORS
	navLinks.css("backgroundColor", "");
	
	navLinks.each(function(){
		anchorID = $( this ).attr( "href" );
		anchorID = page.getHashFromPath( anchorID );
		
		if( typeof anchorID != "undefined" && anchorID ){
			
			if(page.current == anchorID){
				$( this ).css("backgroundColor", "#000");
				return;
			}
		}
	});
}

// *** TEMPLATE SETUP ERROR HANDLER ************************************************************** //
page.templateError = function( errorID ){
	
	var errorMessage = '';
	
	switch( errorID ){
		
		case 1: errorMessage = "TEMPLATE ERROR: Please double check to "
								+"ensure that all tile elements contain a valid \"data\""
								+" attribute. \n\n Tile markup located within home.php ."; break; 
								
		case 2: errorMessage = "Oops,error loading the requested content. "
								+"Refresh or double check the file name you are trying to load."; break;								
	}
	
	alert( errorMessage );

}//END :: PAGE.TEMPLATEERROR()
// *********************************************************************************************** //


// *** SCROLL PAGE TO TOP ********************************** //
page.top = function(){
	
	var _offset = $( "#wrapper" ).offset().top;
	
	$( "html, body" ).animate({scrollTop:_offset}, 400);
	
}//END :: PAGE.TOP()
// ********************************************************* //
