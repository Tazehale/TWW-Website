<?php
include_once( "includes/autoload.php" );
?>
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml" lang="en-US">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta name="Keywords" content="Elegant, Minimal, Ajax, SEO, jQuery, Premium, HTML5, Clean, Creative, Flexible, Attractive, Portfolio, Contemporary" />
<meta name="Description" content="" />

<title>TheWickedWrench - Fixing bikes for over 20 years!</title>

<link href='http://fonts.googleapis.com/css?family=Dosis:400,500,600,700|Rancho|Quantico:400,700' rel='stylesheet' type='text/css'>
<link type="text/css" href="css/style.css" rel="stylesheet" media="all"/>
<link type="text/css" href="css/grid.css" rel="stylesheet" media="all"/>
<link type="text/css" href="css/prettyPhoto.css" rel="stylesheet" media="all"/>

<link rel="shortcut icon" href="images/logo.favicon.ico?n=1" type="image/x-icon">
  
<!--[if lt IE 9]>
<style type="text/css">
	form input.text
	{
		height:28px;padding-top:12px;
	}
	#footer_inner
	{ 
		border:solid 1px #DDD; 
	}
	.panel
	{ 
		border:solid 1px #DDD; 
	}
	#page-title
	{ 
		border:solid 2px #EEE; 
	}
	.center-tile
	{
		background-image:url(images/tile_gradient_bg_ie.png);
		background-position:center center;
	}
	
</style>
<![endif]-->

<!-- ********** Download JQuery and JQuery UI ************* -->
<script type="text/javascript" src="scripts/jquery/1.7.1.js"></script>
<script type="text/javascript" src="scripts/jquery/ui-1.8.20.effects.min.js?n=1"></script>


<script type="text/javascript">

// *** DEFAULT PROPERTIES ********* //
var page = new Object();
page.current = "";
page.animateOnLeave = "";

// *** MODULAR SCRIPT LOAD HANDLER - LOADS DEPENDENT SCRIPTS WITH A BIT MODULARITY :) *** //
page.loadScripts = function(){

	//LOAD - MAIN JS
	var mFile = document.createElement( "script" );
		mFile.setAttribute( "type", "text/javascript" );
		mFile.setAttribute( "src", "scripts/main.js" );
			
	//LOAD - TWITTER WIDGET
	var tFile = document.createElement( "script" );
		tFile.setAttribute( "type", "text/javascript" );
		tFile.setAttribute( "src", "widgets/twitter/twitter.js" );
	
	//LOAD - TEMPLATE CUSTOMIZATION FILE	
	var cFile = document.createElement( "script" );
		cFile.setAttribute( "type", "text/javascript" );
		cFile.setAttribute( "src", "scripts/customize.js" );
	
	//LOAD - PRETTYPHOTO
	var pFile = document.createElement( "script" );
		pFile.setAttribute( "type", "text/javascript" );
		pFile.setAttribute( "src", "scripts/prettyPhoto/jquery.prettyPhoto.js" );	
		
	var t = $( "head" ).append( mFile, tFile, cFile, pFile );

}//END :: PAGE.LOADSCRIPTS()
// *********************************************************************************** //

page.loadScripts();//MODULAR JS LOADER, ACCOMMODATES FUNCTIONAL DEPENDENCIES

</script>
</head>

<body>

<div id="wrapper">

<div id="header">
	
	<div id="nav">
		<div id="_menu">
            <a href="#!page_6" rel="conanical">Blog</a>
			<a href="#!page_5" rel="canonical">Contact</a>
			<a href="#!page_4" rel="canonical">Pages</a>
			<a href="#!page_3" rel="canonical">Portfolio</a>
			<a href="#!page_2" rel="canonical">Services</a>
			<a href="#!page_1" rel="canonical">About Us</a>
			<a href="#!home" rel="canonical">Home</a>
		</div>
	</div>


	
	<div id="logo_wrapper">

		

		
		<div id="header-verb"> 
			<!-- Connect With Us! -->
		</div>
		
		<div class="social-icons small-social">
			<a href="http://twitter.com" target="_blank" class="small" style="background-image: url(images/icons/social/small/twitter.png);"></a>
			<a href="http://youtube.com" target="_blank" class="small" style="background-image: url(images/icons/social/small/youtube.png);"></a>
		</div>	
		
	</div><!-- CLOSE :: #LOGO_WRAPPER -->

</div><!-- CLOSE :: #HEADER -->

<div id="split"></div>

<div id="content">

