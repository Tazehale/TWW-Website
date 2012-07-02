/* pureTween HTML Template */
/* This file will allow you to customize your template with distinct colors, images, and minimal functionality */


/* -------------------------------------------------------------------------------------------- */
/* HELP AND DOCUMENTATION (Set true to toogle template docs via F1 Key, DISABLE FOR PRODUCTION)															 			*/
/* -------------------------------------------------------------------------------------------- */
var enableF1_docs = true;



/* ------------------------ */
/* TWITTER WIDGET SETTINGS
/* ------------------------ */
var twitterUser = "TheWickedWrench";
var tweetCount = 3;
var twitter_div_id = "_twitter";




/* ------------------------------------------------------------ */
/* TEMPALTE BACKGROUND SETTINGS - Leave blank when none desired
/* ------------------------------------------------------------ */
// First define possible background images and locations:

var blackStripe  = "images/backgrounds/black-stripe.png";

var blueStripe 	 = "images/backgrounds/blue-stripe.png";

var eSaid 		 = "images/backgrounds/e-said.jpg";

var darkWood 	 = "images/backgrounds/dark-wood.jpg";

var liteWood 	 = "images/backgrounds/lite-wood.jpg";

var yellowStripe = "images/backgrounds/yellow-stripe.png";

var grayStripe 	 = "images/backgrounds/gray-stripe.png";

page.bgImage = darkWood; //darkWood
page.bgColor = "#000";



/* -------------------------------------------- */
/* FOOTER BACKGROUND SETTINGS
/* -------------------------------------------- */
page.footerBGImg = grayStripe;
page.footerBGColor = "";


/* -------------------------- */
/* TILES SETTINGS
/* -------------------------- */
// Set each tile's :
// 1 Background color
// 2 Page to retrieve when clicked
// 3 Background image (Will of course overlay bg color)
// ------------------------------------------------------------- //
page.tileDefinition	= 	[{
	
	color:	"#185497",
	page:	"none",
	image:	"images/fotolia/bicycleRepair.jpg"
},
{
	color:	"#185497",
	page:	"page_1",
	image:	"images/fotolia/bicycleSales.jpg"
},
{
	color:	"#185497",
	page:	"page_5",
	image:	"images/fotolia/contactUs.jpg"
},
{
	color:	"#185497",
	page:	"page_2",
	image:	"images/fotolia/restoBike.jpg"
},
{
	color:	"#185497",
	page:	"page_3",
	image:	"images/fotolia/aboutUs.jpg"
},
{
	color:	"#185497",
	page:	"page_4",
	image:	"images/fotolia/question.jpg"
}
];
