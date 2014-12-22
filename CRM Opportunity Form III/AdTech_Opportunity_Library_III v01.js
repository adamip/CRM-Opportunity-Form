/*
	Adam Ip																	2014-02-03
	function EnableServiceType()
	function ProductInterest_Change()

	Adam Ip																	2014-02-04
	function ValidateServiceType_Save()	
*/
var DebugModeOppIII = false;   
   
/***************************************************************************************/
function EnableServiceType()
{
	if( DebugModeOppIII ) window.alert( "EnableServiceType" );

	try
	{
		/* Product Interest Option Set has options 
			"Consulting Services" whose value is 279640012 
			"Managed Services" whose value is 832090001  */
		var iflag = myGetValue( "new_productinterest" );
		
		switch( iflag )
		{
		case 279640012:
			ShowHideOneTabSection( "general_section_8", true );
			mySetVisible( "cust_consultingservicetype", true );	
			mySetDisabled( "cust_consultingservicetype", false );	
			ShowHideOneTabSection( "general_section_9", false );
			mySetVisible( "cust_managedservicetype", false );	
			mySetDisabled( "cust_managedservicetype", true );	
			break;
		case 832090001:
			ShowHideOneTabSection( "general_section_8", false );
			mySetVisible( "cust_consultingservicetype", false );	
			mySetDisabled( "cust_consultingservicetype", true );	
			ShowHideOneTabSection( "general_section_9", true );
			mySetVisible( "cust_managedservicetype", true );	
			mySetDisabled( "cust_managedservicetype", false );	
			break;
		default:
			ShowHideOneTabSection( "general_section_8", false );
			mySetVisible( "cust_consultingservicetype", false );	
			mySetDisabled( "cust_consultingservicetype", true );	
			ShowHideOneTabSection( "general_section_9", false );
			mySetVisible( "cust_managedservicetype", false );	
			mySetDisabled( "cust_managedservicetype", true );	
			break;	
		}		
	}
	catch( err )
	{
		if( DebugModeOppIII ) window.alert( "function EnableServiceType error code " + err );
	}
}

/***************************************************************************************/
function ProductInterest_Change()
{
	if( DebugModeOppIII ) window.alert( "ProductInterest_Change" );

	try
	{
		EnableServiceType();		
	}
	catch( err )
	{
		if( DebugModeOppIII ) window.alert( "function ProductInterest_Change error code " + err );
	}
}

/***************************************************************************************/
function ValidateServiceType_Save()
{
	if( DebugModeOppIII ) window.alert( "ValidateServiceType_Save" );

	try
	{
		/* Product Interest Option Set has options 
			"Consulting Services" whose value is 279640012 
			"Managed Services" whose value is 832090001  */
		var iflag = myGetValue( "new_productinterest" );
		var nValue;
		
		if( DebugModeOppIII ) window.alert( "ValidateServiceType_Save\niflag = " + iflag );
		switch( iflag )
		{
		case 279640012:
			nValue = myGetValue( "cust_consultingservicetype" );
			if( DebugModeOppIII ) window.alert( "ValidateServiceType_Save\niflag = " + iflag + "\nnValue = " + nValue );
			if( nValue == null || nValue == 0 ) 
			{
				mySetFocus( "cust_consultingservicetype" );
				window.alert( "You must provide a value for Consulting Service Type." );
				/* Cancel the save operation. */
				event.returnValue = false;
				return false;
			}
			break;
		case 832090001:
			nValue = myGetValue( "cust_managedservicetype" );
			if( DebugModeOppIII ) window.alert( "ValidateServiceType_Save\niflag = " + iflag + "\nnValue = " + nValue );
			if( nValue == null || nValue == 0 ) 
			{
				mySetFocus( "cust_managedservicetype" );
				window.alert( "You must provide a value for Managed Service Type." );
				/* Cancel the save operation. */
				event.returnValue = false;
				return false;
			}
			break;
		default:
			break;			
		}		
	}
	catch( err )
	{
		if( DebugModeOppIII ) window.alert( "function ValidateServiceType_Save error code " + err );
	}
}

/* End Of Lines ************************************************************************/
