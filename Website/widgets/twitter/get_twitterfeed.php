<?php

header("Content-type: application/json");
//header("Content-type: text/xml");

$feedcount = isset( $_REQUEST['count'] ) ? $_REQUEST['count'] : 1; //number of tweets
$source = isset( $_REQUEST['source'] ) ? htmlspecialchars( $_REQUEST['source'] ) : ''; //the xml source

$screen_name = isset( $_REQUEST['screen_name'] ) ? $_REQUEST['screen_name'] : 'twitterapi'; //the user screen name

$include_entries = isset( $_REQUEST['include_entries'] ) ? $_REQUEST['include_entries'] : true; //include entries in feed
$include_rts = isset( $_REQUEST['include_rts'] ) ? $_REQUEST['include_rts'] : true; //include retweets in feed

// Debug
// echo "Count:" . $feedcount . " Source:" . $source;

if( $source ){
	
	$source = $source . "?screen_name=" . $screen_name . "&include_entries=" . $include_entries . "&include_rts=" . $include_rts . "&count=" . $feedcount;
	
	$xml_data = simplexml_load_file($source) or die("System Error - Could Not Connect To Feed Location. Contact Site Admin.");
	$xml_data = json_encode( $xml_data );
	
	print( $xml_data );
}
else{
	print( "Twitter Feed Not Available" );
}
?>