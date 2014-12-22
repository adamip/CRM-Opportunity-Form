/*
	Adam Ip																	2014-02-03
	function EnableServiceType()
	function ProductInterest_Change()

	Adam Ip																	2014-02-04
	function ValidateServiceType_Save()	
	
	
	Adam Ip																	2014-03-24
	function SegmentRenewal()
	function ProductInterest_Change()
	function Segment_Change()
	function ProductInterest_Onload()
	
*/

var prevProductInterest = -1;
var prevSegment = -1; 
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

/***************************************************************************************/
function SegmentRenewal()
{
	if( DebugModeOppIII ) window.alert( "function SegmentRenewal" );

	try
	{
		/* SUPR-Platinum (Hardware) = 279,640,031
		   SUPR-Gold (Hardware) 	= 279,640,033
		   SUPR-Silver (Hardware) 	= 279,640,032 */
		if( prevProductInterest == 279640032 || prevProductInterest == 279640033 )
		{
			var currProductInterest = myGetValue( "new_productinterest" );	
			var currSegment = myGetValue( "cust_segment" );
			switch( prevProductInterest )
			{
				case 279640032:
					if( currProductInterest ==  279640031 || currProductInterest ==  279640033 )
					{
						if(	currSegment != 5 )
							mySetValue( "cust_segment", 5 ); 	
					}
					else if( currProductInterest != 279640031 && currProductInterest !=  279640033 && currSegment == 5 )
						mySetValue( "cust_segment", prevSegment ); 
					break;
				case 279640033:
					if( currProductInterest ==  279640031 )
					{
						if( currSegment != 5 )
							mySetValue( "cust_segment", 5 ); 				
					}
					else if( currSegment == 5 ) 
						mySetValue( "cust_segment", prevSegment ); 					
					break;
				default:				
					break;				
			}	
		}
	}
	catch( err )
	{
		if( DebugModeOppIII ) window.alert( "function SegmentRenewal error code " + err );
	}
}

/***************************************************************************************/
function ProductInterest_Change()
{
	if( DebugModeOppIII ) window.alert( "function ProductInterest_Change" );

	try
	{
		SegmentRenewal();	
	}
	catch( err )
	{
		if( DebugModeOppIII ) window.alert( "function ProductInterest_Change error code " + err );
	}
}

/***************************************************************************************/
function Segment_Change()
{
	if( DebugModeOppIII ) window.alert( "function Segment_Change" );

	try
	{
		SegmentRenewal();	
	}
	catch( err )
	{
		if( DebugModeOppIII ) window.alert( "function Segment_Change error code " + err );
	}
}

/***************************************************************************************/
function ProductInterest_Onload()
{
	if( DebugModeOppIII ) window.alert( "function ProductInterest_Onload" );

	try
	{
		prevSegment = myGetValue( "cust_segment" ); 
		prevProductInterest = myGetValue( "new_productinterest" );		
	}
	catch( err )
	{
		if( DebugModeOppIII ) window.alert( "function ProductInterest_Onload error code " + err );
	}
}

/* End Of Lines ************************************************************************/
