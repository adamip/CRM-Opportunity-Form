/*
	Adam Ip																	2011-06-21
	Text boxes propagate value from one text box to another, through some simple
	arithematic calculation.  Propagation might be in chain, hard-coded though.
	Initially used in Opportunities Form
	
	Adam Ip																	2011-06-27
	Add Existing Account Transaction Revenue Tab, & Quick Entry Revenue Tab	
	
	Adam Ip																	2011-09-01
	1. Add Function CloseProbability_c
	2. Update Est Revenue only if isrevenuesystemcalculated == false
	
	Adam Ip																	2011-09-23
	Removing the redundant calling of Total_Revenue__c() 
		in function showhideInformationTab()	

	Adam Ip																	2011-10-04		
	Add Function InitialPriceListOnCreate()
	
	Adam Ip                                                                 2011-10-14
	Rewrite showhideInformationTab() and ShowOneTab()
	Redefine the tab value association, i.e. 1, 2, 3, 4

	Adam Ip																	2011-10-17
	Create setCloseProbability_OnSave() to prevent a system variable, 
	i.e. Probability, to start with null, on creating new Opportunity
	record
	
	Adam Ip																	2011-11-29
	Always show Tab 0
	Always hide Tab 5
	'Revenue' radio button is always set to 'User Provided' as default, 
	    and set to invisible and read-only, regardless of conditions
	Total Dollars Partner formula re-defined	
	Delete several data fields, such as First Year Revenue, Support Type,
	    2nd 50% Service Revenue, Software Discount Level Support, ...	
		
	Adam Ip																	2011-12-05
	Disable functions setCloseProbability_OnChange() and setCloseProbability_OnSave()
		
	Adam Ip																	2011-12-06
	Enhance functions showLeadNotes()
	
	Adam Ip																	2011-12-08
	Number of tabs increased from 4 to 8
	Remove functions Revenue_50_Services__c(), Future_AGS_Revenue_Total__c(),
		HDW_SW_Revenue__c(), and Initial_Verint_Revenue__c()
		
	Adam Ip																	2011-12-14
	Software List Price is a total list price, and not per software pack.  
	Software List Price is no longer related to Number Of Seats in any formula 
	calculation.
	
*/
var DebugModeOpp = false;   
   
/***************************************************************************************/
function myFireEvent( elmt, strEvt )
{
	if( DebugModeOpp ) window.alert( "function myFireEvent " + elmt + " & " + strEvt );
	try
	{
		if( document.createEventObject )
		{
			if( DebugModeOpp ) window.alert( "function myFireEvent IE" );

			var evt	= document.createEventObject();
			return elmt.fireEvent( 'on' + strEvt, evt );	
		}
		else {
			var evt = document.createEvent( "HTMLEvents" );		
			if( evt && evt.initEvent )
			{
			if( DebugModeOpp ) window.alert( "function myFireEvent non-IE" );
				/* parameters: event type, event can bubble or not, cancelable or not */
				evt.initEvent( StrEvt, true, true ); 
				if( elmt.dispatchEvent ) 
					return elmt.dispatchEvent( evt )?false:true;
			}
		}
	}
	catch( err )
	{
		if( DebugModeOpp ) window.alert( "function myFireOnChangeEvent error code " + err );
	}
}

/***************************************************************************************/
function myFireOnChangeEvent( label, myFunc )
{
	if( DebugModeOpp ) window.alert( "function myFireOnChangeEvent " + label + " & " + myFunc );
	try
	{
		var myObj = document.getElementById( label );		
		if( DebugModeOpp ) window.alert( "function myFireOnChangeEvent myObj = " + myObj );
		// Event.observe( myObj, 'onChange', myFunc );	
		myObj.fireEvent( "onChange" );	
		// myFireEvent( myObj, 'change' );
	}
	catch( err )
	{
		if( DebugModeOpp ) window.alert( "function myFireOnChangeEvent error code " + err );
	}
	return;
}

/***************************************************************************************/
/* ( Software_List_Price__c * (1-82/100)) * (1-(6/10)) */
function Maintenance_Dollars_Verint__c()
{
	if( DebugModeOpp ) window.alert( "function Maintenance_Dollars_Verint__c" );
	
	try
	{
		var val1 = myGetValue( "new_softwarelistprice" );
		var val2 = ( 1 - ( 82 / 100 )) * ( 1 - ( 6 / 10 ));
		var out1 = Xrm.Page.getAttribute( "new_maintenancedollarsverint" );
		if( out1 != null ) out1.setValue( val1 * val2 );			
		if( DebugModeOpp ) window.alert( "function Maintenance_Dollars_Verint__c\n\tval1 " + val1 + "\n*\t " + val2 );

		// trigger 1 event afterward		
		// myFireOnChangeEvent( "new_maintenancedollarsverint", Total_Dollars_Partner__c );
		Total_Dollars_Partner__c();		
	}
	catch( err )
	{
		if( DebugModeOpp ) window.alert( "function Maintenance_Dollars_Verint__c error code " + err );
	}
}

/***************************************************************************************/
/* Software_List_Price__c * (1-(6/10)) */
function Software_Dollars_Verint__c()
{
	if( DebugModeOpp ) window.alert( "function Software_Dollars_Verint__c" );

	try
	{
		var val1 = myGetValue( "new_softwarelistprice" );
		var val2 =  1 - ( 6 / 10 );
		var out1 = Xrm.Page.getAttribute( "new_softwaredollarsverint" );
		if( out1 != null ) out1.setValue( val1 * val2 );			
		if( DebugModeOpp ) window.alert( "function Software_Dollars_Verint__c\n\tval1 " + val1 + "\n*\t " + val2 );

		// trigger 1 event afterward		
		// myFireOnChangeEvent( "new_softwaredollarsverint", Total_Dollars_Partner__c );
		Total_Dollars_Partner__c();		
	}
	catch( err )
	{
		if( DebugModeOpp ) window.alert( "function Software_Dollars_Verint__c error code " + err );
	}
}

/***************************************************************************************/
// Software_List_Price__c * (1-Software_Discount_Percentage__c)
function Software_Revenue__c()
{
	if( DebugModeOpp ) window.alert( "function Software_Revenue__c" );
	
	try
	{
		var val1 = myGetValue( "new_softwarelistprice" );
		var val2 = myGetValue( "new_softwarediscountpercentage" ) / 100.0;	
		var out1 = Xrm.Page.getAttribute( "new_softwarerevenue" );
		/* if( val2 >= 1.0 && val2 <=100.0 ) val2 /= 100.0;		 */
		if( out1 != null ) out1.setValue( val1 * ( 1.0 - val2 ));			
		if( DebugModeOpp ) window.alert( "function Software_Revenue__c\n\tval1 " + val1 + "\n*\tval2 " + val2 );

		// myFireOnChangeEvent( "new_softwarerevenue", Total_Revenue__c );
		Total_Revenue__c();
	}
	catch( err )
	{
		if( DebugModeOpp ) window.alert( "function Software_Revenue__c error code " + err );
	}
}

/***************************************************************************************/
/* Software_Dollars_Verint__c + Maintenance_Dollars_Verint__c + 
		Partner_Services_Dollars__c + Partner_Training_Dollars__c */
function Total_Dollars_Partner__c()
{
	if( DebugModeOpp ) window.alert( "function Total_Dollars_Partner__c" );
	
	try
	{
		var val1 = myGetValue( "new_softwaredollarsverint" );
		var val2 = myGetValue( "new_maintenancedollarsverint" );	
		var val3 = myGetValue( "new_servicesdollarstopartner" );	
		var val4 = myGetValue( "new_trainingdollarstopartner" );	
		var out1 = Xrm.Page.getAttribute( "new_totaldollarspartner" );
		if( out1 != null ) out1.setValue( val1 + val2 + val3 + val4 );	
		if( DebugModeOpp ) window.alert( "function Total_Dollars_Partner__c\n\tval1 " + val1 + "\n+\tval2 " + val2 + "\n+\tval3 " + val3 + "\n+\tval4 " + val4 );		
	}
	catch( err )
	{
		if( DebugModeOpp ) window.alert( "function Total_Dollars_Partner__c error code " + err );
	}
}

/***************************************************************************************/
/* Hardware_Revenue__c + Software_Revenue__c + Software_Maintenance_Revenue__c + 
	Training_Revenue__c + hardwaresupportrevenue + Services_Revenue__c + 
	Preferred_Customer_Discount__c + servicesdollarstopartner */
function Total_Revenue__c()
{
	if( DebugModeOpp ) window.alert( "function Total_Revenue__c" );

	try
	{
		var val1 = myGetValue( "new_hardwarerevenue" );
		var val2 = myGetValue( "new_softwarerevenue" );	
		var val3 = myGetValue( "new_softwaremaintenancerevenue" );	
		var val4 = myGetValue( "new_trainingrevenue" );
		var val5 = myGetValue( "new_hardwaresupportrevenue" );	
		var val6 = myGetValue( "new_servicesrevenue" );	
		var val7 = myGetValue( "new_preferredcustomerdiscount" );
		var val8 = myGetValue( "new_servicesdollarstopartner" );	
		
		var out1 = Xrm.Page.getAttribute( "new_totalrevenue" );
		
		if( out1 != null ) 
			out1.setValue( val1 + val2 + val3 + val4  + val5 + val6 - val7 + val8 );	
		if( DebugModeOpp ) window.alert( "function Total_Revenue__c\n\tval1 " + val1 + "\n+\tval2 " + val2 + "\n+\tval3 " + val3 + "\n+\tval4 " + val4 + "\n+\tval5 " + val5 + "\n+\tval6 " + val6  + "\n+\tval7 " + val7 + "\n+\tval8 " + val8 );

		// trigger 1 event afterward		
		EstimateRevenue__c();
	}
	catch( err )
	{
		if( DebugModeOpp ) window.alert( "function Total_Revenue__c error code " + err );
	}
}

/***************************************************************************************/
// displays Est. Revenue on the top section of the Form
function EstimateRevenue__c()
{
	if( DebugModeOpp ) window.alert( "function EstimateRevenue__c" );
	try
	{
		if( myGetValue( "isrevenuesystemcalculated" ) == false )
		{
			var val1 = myGetValue( "new_totalrevenue" );
			var out1 = Xrm.Page.getAttribute( "estimatedvalue" );
			if( out1 != null )
				out1.setValue( val1 );
			if( DebugModeOpp ) window.alert( "function EstimateRevenue__c\nout1 " + out1 + "\nval1 " + val1 );	
		}
	}
	catch( err )
	{
		if( DebugModeOpp ) window.alert( "function EstimateRevenue__c error code " + err );
	}
}

/***************************************************************************************/
// Copying the value of new_CloseProbability to system data field CloseProbability
function setCloseProbability_OnChange()
{
	if( DebugModeOpp ) window.alert( "function setCloseProbability_OnChange" );
	
	try
	{	/*
		var val1 = myGetValue( "new_closeprobability" );
		var out1 = Xrm.Page.getAttribute( "closeprobability" );
		if( out1 != null ) out1.setValue( val1 );		*/
	}
	catch( err )
	{
		if( DebugModeOpp ) window.alert( "function setCloseProbability_OnChange error code " + err );
	}
}


/***************************************************************************************/
// Copying the value of new_CloseProbability to system data field CloseProbability
function setCloseProbability_OnSave()
{
	if( DebugModeOpp ) window.alert( "function setCloseProbability_OnSave" );

	try
	{	/*
		var val1 = myGetValue( "closeprobability" );
		if( val1 == null ) 
		{	
			var val2 = myGetValue( "new_closeprobability" );
			var out1 = Xrm.Page.getAttribute( "closeprobability" );
			if( out1 != null ) 
				out1.setValue( val2 );		
		}		*/
	}
	catch( err )
	{
		if( DebugModeOpp ) window.alert( "function setCloseProbability_OnSave error code " + err );
	}
}


/***************************************************************************************/
function showhideInformationTab()
{
	if( DebugModeOpp ) window.alert( "function showhideInformationTab" );

	try
	{
		/* Regardless of conditions, always show tab 0, i.e. General */
		ShowOneTab( 0 );
		/* if( DebugModeOpp ) window.alert( "showhideInformationTab #1 ShowOneTab( 0 )" ); */

		/* Regardless of conditions, always hid tab 9, i.e. Line Items */
		HideOneTab( 9 );
		/* if( DebugModeOpp ) window.alert( "showhideInformationTab #2 HideOneTab( 9 )" ); */
		
		/* 	'System Calculated' is always defined as false
			'User Provided' is defined as true						*/
		if( myGetValue( "isrevenuesystemcalculated" ) == true )
		{
			/* Hide all tabs if isrevenuesystemcalculated is true */
			Show14Tab( 0 );
			/* if( DebugModeOpp ) window.alert( "showhideInformationTab #3 Show14Tab( 0 )" ); */
		}
		else
		{
			var val1 = myGetValue( "new_opportunityrecordtype" );
			/* 	new_opportunityrecordtype indicates which tab is visible
				Renewal		 		= 1
				Verint Channel 		= 2	
				Verint Enterprise 	= 3
				Shoretel            = 4  		
				Channel OEM			= 5
				OEM Hardware 		= 6
				Steelbox			= 7
				Services			= 8	*/
			if( val1 != null )
				Show14Tab( val1 ) ;
			/* if( DebugModeOpp ) window.alert( "showhideInformationTab #4 Show14Tab( " + val1 + " )" ); */
		}	
	}
	catch( err )
	{
		if( DebugModeOpp ) window.alert( "function showhideInformationTab error code = " + err );
	}
}

/***************************************************************************************/
/* If show_me is zero or is not 1, 2, 3, 4, 5, 6, 7, 8 then all eight tabs 1..8 will be 
		invisible, i.e. false 
   Otherwise, only the show_me tab will set to visible; all others set to invisible */
function Show14Tab( show_me )
{
	if( DebugModeOpp ) window.alert( "function Show14Tab" );

	try
	{
		var i, max_num_tabs = 8;	
		for( i = 1; i <= max_num_tabs; i++ )
			if( i == show_me )
				ShowOneTab( i );
			else
				HideOneTab( i );
	}
	catch( err )
	{
		if( DebugModeOpp ) window.alert( "function Show14Tab error code = " + err );
	}
}

/***************************************************************************************/
/* Show a tab																		   */
function ShowOneTab( show_me )
{
	/* if( DebugModeOpp ) window.alert( "function ShowOneTab" ); */
	try
	{
		if( show_me != null )
		{
			Xrm.Page.ui.tabs.get( show_me ).setVisible( true );
			Xrm.Page.ui.tabs.get( show_me ).setDisplayState( "expanded" );
		}
	}
	catch( err )
	{
		if( DebugModeOpp ) window.alert( "function ShowOneTab error code = " + err );
	}
}

/***************************************************************************************/
/* Hide a tab																		   */
function HideOneTab( hide_me )
{
	/* if( DebugModeOpp ) window.alert( "function HideOneTab" ); */
	try
	{
		if( hide_me != null )
		{
			Xrm.Page.ui.tabs.get( hide_me ).setVisible( false );
			Xrm.Page.ui.tabs.get( hide_me ).setDisplayState( "collapsed" );
		}
	}
	catch( err )
	{
		if( DebugModeOpp ) window.alert( "function HideOneTab error code = " + err );
	}
}

/***************************************************************************************/
function InitialPriceListOnCreate()
{
	if( DebugModeOpp ) window.alert( "InitialPriceListOnCreate" );

	try
	{
		var CREATE_TYPE = 1;
		var out1 = myGetValue( "pricelevelid" );
		if( out1 != null && Xrm.Page.ui.getFormType() == CREATE_TYPE )
		{		
			//Create an array to set as the DataValue for the lookup control.
			var lookupData = new Array();
			//Create an Object add to the array.	
			var lookupItem = new Object();
			//Set the GUID, typename, and name properties to the object.
			//  Price Level ID             62F14459-00CA-E011-9C0B-00155D031C01
			//  Transaction Cuurency ID    EC636969-18C9-E011-B9FF-00155D031C01
			lookupItem.id = "{62F14459-00CA-E011-9C0B-00155D031C01}";
			lookupItem.typename = "pricelevel";
			lookupItem.name = "USD";

			// Add the object to the array.
			lookupData[0] = lookupItem;
			// Set the value of the lookup field to the value of the array.
			out1.setValue( lookupData );
		}
	}
	catch( err )
	{
		if( DebugModeOpp ) window.alert( "function InitialPriceListOnCreate error code " + err );
	}
}

/***************************************************************************************/
function showLeadNotes()
{
	var Primary = Xrm.Page.data.entity.attributes.get( "originatingleadid" );
	var IFrame = Xrm.Page.ui.controls.get( "IFRAME_LeadNotes" );
	var ret;
	try
	{
		if( IFrame != null )
		{
			if( Primary != null && Primary.getValue() != null ) 
			{
				var GUIDvalue = Primary.getValue()[ 0 ].id;
				if( GUIDvalue != null )
				{
					IFrame.setSrc( "/_controls/notes/notesdata.aspx?id=" + GUIDvalue + "&ParentEntity=3&EnableInlineEdit=false&EnableInsert=false" );
					ret = true;
				}
				else	
					ret = false;	
			}
			else 
				ret = false;	

			if( ret == false )
				IFrame.setSrc( "about:blank" );
		}	
	}
	catch( err )
	{
		if( DebugModeOpp ) window.alert( "function showLeadNotes error code " + err );
	}
}

/* End Of Lines ************************************************************************/
