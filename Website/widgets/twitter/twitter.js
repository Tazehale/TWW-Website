/* Twitter.js - Custom built twitter feed. @aurthor - charles ndubuisi */

function twitter_widg( _username, _tweetCount, _elementID ){
	
	/* - Main function has a jQuery dependency, so ensure the API is included before proceeding.
	 * - The Arguments -> 1[2] ...
	 * - 1] Twitter account username (required). 
	 * - 2] DOM element ID to attach the feed (optional). If omitted, feed is attachment to document body.
	 */
	
	// validation
	if( !window.jQuery ){ return false;	} //jquery
	if( "undefined" == typeof _username || !_username ){ return false; } //argument ( username )
	if( "undefined" == typeof _tweetCount || !_tweetCount ){ var _tweetCount = 1; } //argument ( username )
	if( "undefined" == typeof _elementID || !_elementID ){ var _elementID = false; } //argument ( element id )
	
	var __twtr = new Object();
	
	// set a few properties
	__twtr.user = _username;
	
	__twtr.tweetcount = _tweetCount;
	
	__twtr.parent = _elementID ? $( "#" + _elementID ) : $( "body", document );
	
	__twtr.feedsource = "http://api.twitter.com/1/statuses/user_timeline.xml";
	
	__twtr.dataSource = "widgets/twitter/get_twitterfeed.php";
	
	
	// ajax request - get feed content
	$.ajax({
		type: "get",
		dataType: "json",
		data: {"count":__twtr.tweetcount, "source":__twtr.feedsource, "screen_name":__twtr.user, "include_rts":true, "include_entries":true},
		url: __twtr.dataSource,
		success: function( data ){
			
			//remove preloader on success
			__twtr.parent.css("background", "none");
			
			var feed_inner = '';
			var url_pattern = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
			
			for( var status in data.status ){
				
				var s_text = data.status[status].text;
				s_text = s_text.replace(url_pattern,"<a href='$1' target='_blank'>$1</a>"); 
				
				//the status
				feed_inner += "<div class='status clear' id='status-"+status+"'>";
				feed_inner += s_text;
				
				
				//status timestamp
				feed_inner += "<span class='status-date'> ";
				
				/* ************************************************************************* */
				//status created
				var created = data.status[status].created_at.split(" ");
				
				//status time variables
				var statustime = created[1] + " " + created[2] + " " + created[5] + " " + created[3];
				statustime = new Date( statustime ).getTime();
				
				//current time variables
				var dt_now = new Date();
				var dt_now_time = dt_now.getTime(); 
				
				//the differnce
				var change = parseInt((dt_now_time - statustime)/1000);
				change = change + (dt_now.getTimezoneOffset() * 60); 
				change = parseInt( change );
				
				var display = "";
				
				if( change < 60 ){
					display = "less than 1 minute ago";
				}
				else if( change < 120 ){
					display = "1 minute ago";
				}
				else if( change < 3600 ){// 60 * 60
					display = parseInt( (change/60) ).toString() + " minutes ago";
				}
				else if( change < 7200 ){// 120 * 60
					display = "1 hour ago";
				}
				else if( change < 86400 ){// 24 * 60 * 60
					display = parseInt( (change/3600).toString() ) + " hours ago";
				}
				else if( change < 172800 ){// 48 * 60 * 60
					display = "1 day ago";
				}
				else {
					display = parseInt( (change/86400).toString() ) + " days ago";
				}
				
				/* ************************************************************************* */
				
				feed_inner += display;
				feed_inner += "</span>";
				feed_inner += "</div>";
			}
			
			__twtr.parent.append( feed_inner );
		},
		error: function( xhr, err_status, thrown ){
			alert( "Error Loading Twitter Feed. Please try again or contact site admin." );
		}
	});
	
	return true;

}//end fn twitter_widg