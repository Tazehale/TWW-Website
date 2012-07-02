<?php

include_once( "../includes/autoload.php" );

//Defaults
$contact_name = isset( $_REQUEST['name'] ) ? $_REQUEST['name'] : '';
$contact_mail = isset( $_REQUEST['email'] ) ? $_REQUEST['email'] : '';
$contact_subj = isset( $_REQUEST['subject'] ) ? $_REQUEST['subject'] : '';
$contact_mssg = isset( $_REQUEST['message'] ) ? $_REQUEST['message'] : '';

//If all requires fields present, Send
if( $contact_name && $contact_mail && $contact_subj && $contact_mssg )
{
	//Declare logic to process contact information here, 
	//OR keep things MVC and declare the needed logic in the SendForm method of the contact class ( uncomment line below and delete 'success' echo )
	//Contact::SendForm( $contact_name, $contact_mail, $contact_subj, $contact_mssg );
	echo "success";
}
else 
{
	//Missing fields handler (second phase, as initial form validation handled within javascript)
}

?>