
<span id="page-title">Contact Us</span>

<div  id="page-content">

<span class="h1-wrapper"><h1>Get In Touch With Us.</h1></span>

<div class="clear">
Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure 
dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non 
proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
</div>

<div class="section_clear_fancy"></div>

<!-- USER MSG DISPLAY -->
<div id="userAlert" class="round"></div>
<!-- USER MSG DISPLAY -->


<!-- BEGIN CONTACT FORM -->
<form name="contact" id="contactform" action="actions/act_sendContact.php" method="post" enctype="multipart/form-data">
	
	<span class="formrow">
	<span class="border round input_wrap"><input type="text" name="name" id="name" class="text" value="Name" onfocus="javascript:if(this.value=='Name'){this.value='';}" onblur="javascript:if(this.value==''){this.value='Name';}" /></span>
	</span>
	
	<span class="formrow">
	<span class="border round input_wrap"><input type="text" name="email" id="email" class="text" value="Email" onfocus="javascript:if(this.value=='Email'){this.value='';}" onblur="javascript:if(this.value==''){this.value='Email';}" /></span>
	</span>
	
	<span class="formrow">
	<span class="border round input_wrap"><input type="text" name="subject" id="subject" class="text" value="Subject" onfocus="javascript:if(this.value=='Subject'){this.value='';}" onblur="javascript:if(this.value==''){this.value='Subject';}" /></span>
	</span>
	
	<span class="formrow _txtarea">
	<span class="border round input_wrap"><textarea name="message" id="message"></textarea></span>
	</span>
	
	<span class="formrow">
	<input type="submit" name="submit" id="submit" value="Send Message" />
	</span>

</form>
<!-- END CONTACT FORM -->

<script type="text/javascript">
	
	var contactName, contactEmail, contactSubj, contactMsg, validForm;
	var userAlert = "";
	var errormsgWrapper = $( "#userAlert" );
	var sendBtn = $( "#submit" );
	sendBtn.click(function(){
		
		contactName = $( "#name" ).val();
		contactEmail = $( "#email" ).val();
		contactSubj = $( "#subject" ).val();
		contactMsg = $( "#message" ).val();
		
		validForm = true; // reset flag
		userAlert = ""; // reset msg
		
		//alert( contactName + " " + contactEmail + " " + contactSubj + " " + contactMsg );//debug
		
		if( contactName.toLowerCase() == "name" || !contactName ){
			validForm = false;
			userAlert += "A valid name is required. <br />";
		}
		if( contactEmail.toLowerCase() == "email" || !contactEmail ){
			validForm = false;
			userAlert += "A valid email address is required. <br />";
		}
		if( contactSubj.toLowerCase() == "subject" || !contactSubj ){
			validForm = false;
			userAlert += "A valid subject line is required. <br />";
		}
		if( !contactMsg ){
			validForm = false;
			userAlert += "A valid message is required. <br />";
		}
		
		if( validForm ){
			
			errormsgWrapper.css("display","none"); // remove error message if displayed
			
			//Send Form
			var sendToUrl = $( "form#contactform" ).attr( "action" );
			$.ajax({
				type: "post",
				data: {"name":contactName, "email":contactEmail, "subject":contactSubj, "message":contactMsg},
				url: sendToUrl,
				success: function( data ){
					if( data == "success" ){
						
						errormsgWrapper.html( "Form Sent. Thanks!" );
						errormsgWrapper.addClass( "success" );
						errormsgWrapper.fadeIn( 500 );
						
						//reset form values
						$( "#name" ).val( 'Name' );
						$( "#email" ).val( 'Email' );
						$( "#subject" ).val( 'Subject' );
						$( "#message" ).val('');
					}
				},
				error: function(){
					errormsgWrapper.html( "An error occurred while sending your form. Please try again or contact site admin." );
					errormsgWrapper.fadeIn( 500 );
				}
			});
		}
		else{
			if( errormsgWrapper.length ){
				errormsgWrapper.removeClass( "success" );
				errormsgWrapper.html( userAlert );
				errormsgWrapper.fadeIn( 500 );
			}
		}
		return false;
	});
</script>

<!-- Begin Right Pnl Contact Image -->
<div class="rightPanel">
	
	<!-- COMPANY HQ STOCK PHOTO -->
	<img src="images/stock_assets/card06.jpg" border="0" id="" title="The HQ" />

	<!-- COMPANY CONTACT INFORMATION -->
	<div class="panel round">
		<div class="pnl-inner">
		<span class="panelRow title first pnlHeader">
			<!-- IMAGE BY: PAUL BICA @ FLICKR -->
			<img src="images/logo.mini.png?n=1" /> puretween Designs Inc.</span>
		
		<span class="panelRow">1234 SOUTH TECHNOLOGY DR <br />
			  GARDENA, CA 90247</span>
		
		<span class="panelRow">PHONE NUMBER: <br />1-800-123-5555</span>
		<span class="panelRow">FAX NUMBER: <br />1-800-456-5555</span>
		
		<span class="panelRow">EMAIL: <br /> CONTACT.US@PURETWEEN.COM</span>
		
		<div class="section_clear"></div>
		
		</div>
	</div>
	<!-- END CONTACT INFO -->

</div><!-- CLOSE .RIGHTPANE -->

</div><!-- CLOSE #PAGE-CONTENT -->