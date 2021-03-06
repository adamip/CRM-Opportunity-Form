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
	Add Function setInitialPriceList()
*/
var DebugMode = false;   
   
/***************************************************************************************/
function myFireEvent( elmt, strEvt )
{
	if( DebugMode ) window.alert( "function myFireEvent " + elmt + " & " + strEvt );
	try
	{
		if( document.createEventObject )
		{
			if( DebugMode ) window.alert( "function myFireEvent IE" );

			var evt	= document.createEventObject();
			return elmt.fireEvent( 'on' + strEvt, evt );	
		}
		else {
			var evt = document.createEvent( "HTMLEvents" );		
			if( evt && evt.initEvent )
			{
			if( DebugMode ) window.alert( "function myFireEvent non-IE" );
				/* parameters: event type, event can bubble or not, cancelable or not */
				evt.initEvent( StrEvt, true, true ); 
				if( elmt.dispatchEvent ) 
					return elmt.dispatchEvent( evt )?false:true;
			}
		}
	}
	catch( err )
	{
		if( DebugMode ) window.alert( "function myFireOnChangeEvent error code " + err );
	}
}

/***************************************************************************************/
function myFireOnChangeEvent( label, myFunc )
{
	if( DebugMode ) window.alert( "function myFireOnChangeEvent " + label + " & " + myFunc );
	try
	{
		var myObj = document.getElementById( label );		
		if( DebugMode ) window.alert( "function myFireOnChangeEvent myObj = " + myObj );
		// Event.observe( myObj, 'onChange', myFunc );	
		myObj.fireEvent( "onChange" );	
		// myFireEvent( myObj, 'change' );
	}
	catch( err )
	{
		if( DebugMode ) window.alert( "function myFireOnChangeEvent error code " + err );
	}
	return;
}

/***************************************************************************************/
function myGetValue( label )
{
	try
	{
		var i = Xrm.Page.getAttribute( label );
		var ret;
		if ( i == null )
		{
			ret = 0;
		}
		else
		{
			ret = i.getValue();
			if( ret == null )
				ret = 0;
		}
		return ret;
	}
	catch( err )
	{
		if( DebugMode ) window.alert( "function myGetValue error code " + err );
	}
}

/***************************************************************************************/
// Services_Revenue__c / 2 
function Revenue_50_Services__c()
{
	if( DebugMode ) window.alert( "function Revenue_50_Services__c" );

	try
	{
		var val1 = myGetValue( "new_servicesrevenue" );
		var out1 = Xrm.Page.getAttribute( "new_50servicesrevenue" );
		if( out1 != null ) out1.setValue( val1 / 2 );		

		// trigger 2 events afterward	
		// myFireOnChangeEvent( "new_50servicesrevenue", Future_AGS_Revenue_Total__c );
		// myFireOnChangeEvent( "new_50servicesrevenue", Initial_Verint_Revenue__c );		
		Future_AGS_Revenue_Total__c();
		Initial_Verint_Revenue__c();
	}
	catch (err)
	{
		if( DebugMode ) window.alert( "function Revenue_50_Services__c error code " + err );
	}
}

/***************************************************************************************/
// Revenue_50_Services__c + HDW_SW_Revenue__c 
function Future_AGS_Revenue_Total__c()
{
	if( DebugMode ) window.alert( "function Future_AGS_Revenue_Total__c" );

	try
	{
		var val1 = myGetValue( "new_50servicesrevenue" );
		var val2 = myGetValue( "new_hdpluswswrevenue" );	
		var out1 = Xrm.Page.getAttribute( "new_futureagsrevenuetotal" );
		
		if( out1 != null ) out1.setValue( val1 + val2 );			
	}
	catch (err)
	{
		if( DebugMode ) window.alert( "function Future_AGS_Revenue_Total__c error code " + err );
	}
}

/***************************************************************************************/
// Hardware_Revenue__c + Software_Revenue__c
function HDW_SW_Revenue__c()
{
	if( DebugMode ) window.alert( "function HDW_SW_Revenue__c" );
		
	try
	{
		var val1 = myGetValue( "new_hardwarerevenue" );
		var val2 = myGetValue( "new_softwarerevenue" );	
		var out1 = Xrm.Page.getAttribute( "new_hdpluswswrevenue" );
		if( out1 != null ) 
			out1.setValue( val1 + val2 );			

		// trigger 2 events afterward		
		// myFireOnChangeEvent( "new_hdpluswswrevenue", Future_AGS_Revenue_Total__c );
		// myFireOnChangeEvent( "new_hdpluswswrevenue", Initial_Verint_Revenue__c );		
		Future_AGS_Revenue_Total__c();
		Initial_Verint_Revenue__c();		
	}
	catch (err)
	{
		if( DebugMode ) window.alert( "function HDW_SW_Revenue__c error code " + err );
	}
}

/***************************************************************************************/
// Total_Revenue__c - Revenue_50_Services__c - HDW_SW_Revenue__c
function Initial_Verint_Revenue__c()
{
	if( DebugMode ) window.alert( "function Initial_Verint_Revenue__c" );

	try
	{
		var val1 = myGetValue( "new_totalrevenue" );
		var val2 = myGetValue( "new_50servicesrevenue" );	
		var val3 = myGetValue( "new_hdpluswswrevenue" );	
		var out1 = Xrm.Page.getAttribute( "new_initialverintrevenue" );
		if( DebugMode ) window.alert( "function Initial_Verint_Revenue__c " + val1 + " " + val2 + " " + val3 );
		if( out1 != null ) out1.setValue( val1 - val2 - val3 );			
	}
	catch (err)
	{
		if( DebugMode ) window.alert( "function Initial_Verint_Revenue__c error code " + err );
	}
}

/***************************************************************************************/
/* (Software_List_Price__c * (1-82/100)) * (1-(6/10)) */
function Maintenance_Dollars_Verint__c()
{
	if( DebugMode ) window.alert( "function Maintenance_Dollars_Verint__c" );
	
	try
	{
		var val1 = myGetValue( "new_softwarelistprice" );
		var out1 = Xrm.Page.getAttribute( "new_maintenancedollarsverint" );
		if( out1 != null ) out1.setValue( val1  * ( 1 - ( 82 / 100 )) * ( 1 - ( 6 / 10 )));			

		// trigger 1 event afterward		
		// myFireOnChangeEvent( "new_maintenancedollarsverint", Total_Dollars_Partner__c );
		Total_Dollars_Partner__c();		
	}
	catch (err)
	{
		if( DebugMode ) window.alert( "function Maintenance_Dollars_Verint__c error code " + err );
	}
}

/***************************************************************************************/
/* Software_List_Price__c * (1-(6/10)) */
function Software_Dollars_Verint__c()
{
	if( DebugMode ) window.alert( "function Software_Dollars_Verint__c" );

	try
	{
		var val1 = myGetValue( "new_softwarelistprice" );
		var out1 = Xrm.Page.getAttribute( "new_softwaredollarsverint" );
		if( out1 != null ) out1.setValue( val1  * ( 1 - ( 6 / 10 )));			

		// trigger 1 event afterward		
		// myFireOnChangeEvent( "new_softwaredollarsverint", Total_Dollars_Partner__c );
		Total_Dollars_Partner__c();		
	}
	catch (err)
	{
		if( DebugMode ) window.alert( "function Software_Dollars_Verint__c error code " + err );
	}
}

/***************************************************************************************/
// Software_List_Price__c * (1-Software_Discount_Percentage__c)
function Software_Revenue__c()
{
	if( DebugMode ) window.alert( "function Software_Revenue__c" );
	
	try
	{
		var val1 = myGetValue( "new_softwarelistprice" );
		var val2 = myGetValue( "new_softwarediscountpercentage" );	
		var out1 = Xrm.Page.getAttribute( "new_softwarerevenue" );
		if( val2 >= 1 && val2 <=100 ) val2 /= 100;		
		if( out1 != null ) out1.setValue( val1 * ( 1 - val2 ));			

		// trigger 2 events afterward		
		// myFireOnChangeEvent( "new_softwarerevenue", HDW_SW_Revenue__c );
		// myFireOnChangeEvent( "new_softwarerevenue", Total_Revenue__c );
		HDW_SW_Revenue__c();		
		Total_Revenue__c();
	}
	catch (err)
	{
		if( DebugMode ) window.alert( "function Software_Revenue__c error code " + err );
	}
}

/***************************************************************************************/
/* Software_Dollars_Verint__c + Maintenance_Dollars_Verint__c + 
		Partner_Services_Dollars__c + Partner_Training_Dollars__c */
function Total_Dollars_Partner__c()
{
	if( DebugMode ) window.alert( "function Total_Dollars_Partner__c" );
	
	try
	{
		var val1 = myGetValue( "new_softwaredollarsverint" );
		var val2 = myGetValue( "new_maintenancedollarsverint" );	
		var val3 = myGetValue( "new_servicesdollarstopartner" );	
		var val4 = myGetValue( "new_trainingdollarstopartner" );	
		var out1 = Xrm.Page.getAttribute( "new_totaldollarspartner" );
		if( out1 != null ) out1.setValue( val1 + val2 + val3 + val4 );			
	}
	catch (err)
	{
		if( DebugMode ) window.alert( "function Total_Dollars_Partner__c error code " + err );
	}
}

/***************************************************************************************/
/* Hardware_Revenue__c + Software_Revenue__c + Software_Maintenance_Revenue__c + 
	Training_Revenue__c + AGS_Support_Revenue__c + Services_Revenue__c + 
	Preferred_Customer_Discount__c + First_Year_Revenue__c + Partner_Services_Revenue__c */
function Total_Revenue__c()
{
	if( DebugMode ) window.alert( "function Total_Revenue__c" );

	try
	{
		var val1 = myGetValue( "new_hardwarerevenue" );
		var val2 = myGetValue( "new_softwarerevenue" );	
		var val3 = myGetValue( "new_softwaremaintenancerevenue" );	
		var val4 = myGetValue( "new_trainingrevenue" );
		var val5 = myGetValue( "new_hardwaresupportrevenue" );	
		var val6 = myGetValue( "new_servicesrevennue" );	
		var val7 = myGetValue( "new_preferredcustomerdiscount" );
		var val8 = myGetValue( "new_preferredcustomerdiscount" );	
		var val9 = myGetValue( "new_partnerservicesrevenue" );	
		var out1 = Xrm.Page.getAttribute( "new_totalrevenue" );
		
		if( out1 != null ) 
			out1.setValue( val1 + val2 + val3 + val4  + val5 + val6 + val7 + val8 + val9 );	

		// trigger 1 event afterward		
		// myFireOnChangeEvent( "new_totalrevenue", Initial_Verint_Revenue__c );
		Initial_Verint_Revenue__c();
		EstimateRevenue__c();
	}
	catch (err)
	{
		if( DebugMode ) window.alert( "function Total_Revenue__c error code = " + err );
	}
}

/***************************************************************************************/
// displays Est. Revenue on the top section of the Form
function EstimateRevenue__c()
{
	if( DebugMode ) window.alert( "function EstimateRevenue__c" );

	try
	{
		if( myGetValue( "isrevenuesystemcalculated" ) == false )
			{
			var val1 = myGetValue( "new_totalrevenue" );
			if( val1 )
			{
				var out1 = Xrm.Page.getAttribute( "estimatedvalue" );
				if( out1 != null ) 
					out1.setValue( val1 );
			}
		}
	}
	catch (err)
	{
		if( DebugMode ) window.alert( "function EstimateRevenue__c error code = " + err );
	}
}

/***************************************************************************************/
// Copying the value of new_CloseProbability to system data field CloseProbability
function setCloseProbability_c()
{
	if( DebugMode ) window.alert( "function setCloseProbability_c" );

	try
	{
		var val1 = myGetValue( "new_closeprobability" );
		var out1 = Xrm.Page.getAttribute( "closeprobability" );
		if( out1 != null ) out1.setValue( val1 );		
	}
	catch (err)
	{
		if( DebugMode ) window.alert( "function CloseProbability_c error code " + err );
	}
}


/***************************************************************************************/
function showhideInformationTab()
{
	if( DebugMode ) window.alert( "function showhideInformationTab" );

	try
	{
		
		/* Total_Revenue__c calls Initial_Verint_Revenue__c & EstimateRevenue__c as well
		EstimateRevenue__c(); 
		Total_Revenue__c();  */

		/* 	'System Calculated' is defined as true and set as default
			'User Provided' is defined as false						*/
		var val1;
		Xrm.Page.ui.tabs.get(1).setVisible(false);
		Xrm.Page.ui.tabs.get(2).setVisible(false);
		Xrm.Page.ui.tabs.get(3).setVisible(false); 
		if( myGetValue( "isrevenuesystemcalculated" ) == false )
		{
			var val1 = myGetValue( "new_opportunityrecordtype" );
			/* 	new_opportunityrecordtype indicates which tab is visible
				Channel Solution Sales		 =	100 000 000
				Quick Entry 				 =	100 000 001
				Existing Account Transaction =	100 000 002		*/
			switch( val1 ) 
			{
			case 0:
				break;
			case 100000000:
				Xrm.Page.ui.tabs.get(1).setVisible(true);
				break;
			case 100000001:
				Xrm.Page.ui.tabs.get(3).setVisible(true);
				break;
			case 100000002:
				Xrm.Page.ui.tabs.get(2).setVisible(true);
				break;	
			default:
				if( DebugMode ) 
					window.alert( "function showhideInformationTab switch value = " + val1 );
			}
		}
	}
	catch (err)
	{
		if( DebugMode ) window.alert( "function showhideInformationTab error code = " + err );
	}
}

/***************************************************************************************/
function InitialPriceListOnCreate()
{
	if( DebugMode ) window.alert( "setInitialPriceList" );

	try
	{
		var CREATE_TYPE = 1;
		var out1 = Xrm.Page.getAttribute( "pricelevelid" );
		if( out1 != null && Xrm.Page.ui.getFormType() == CREATE_TYPE)
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
			out1.setValue(lookupData);
		}
	}
	catch (err)
	{
		if( DebugMode ) window.alert( "function InitialPriceListOnCreate error code " + err );
	}
}

/***************************************************************************************/
function InitialUnitOnCreate()
{
	if( DebugMode ) window.alert( "InitialUnitOnCreate" );

	try
	{
		window.alert( "InitialUnitOnCreate" );
		
		var CREATE_TYPE = 1;
		// UOM = Unit Of Measurement
		var out1 = Xrm.Page.getAttribute( "uomid" );
		
		windows.alert("InitialUnitOnCreate #1 " + "\r\n" + out1  + "\r\n" )
		
		if( out1 != null && Xrm.Page.ui.getFormType() == CREATE_TYPE)
		{		
			//Create an array to set as the DataValue for the lookup control.
			var lookupData = new Array();
			//Create an Object add to the array.	
			var lookupItem = new Object();
			//Set the GUID, typename, and name properties to the object.
			//  UoM ID             5DCFD233-EAC9-E011-9C0B-00155D031C01
			lookupItem.id = "{5DCFD233-EAC9-E011-9C0B-00155D031C01}";
			lookupItem.typename = "uom";
			lookupItem.name = "EA";

			// Add the object to the array.
			lookupData[0] = lookupItem;

			windows.alert("InitialUnitOnCreate #2 " + "\r\n" + lookupItem  + "\r\n" )


			// Set the value of the lookup field to the value of the array.
			out1.setValue(lookupData);
		}
	}
	catch (err)
	{
		if( DebugMode ) window.alert( "function InitialUnitOnCreate error code " + err );
	}
}

/***************************************************************************************/
function hideTab()
{
	if( DebugMode ) window.alert( "function hideTab" );

	try
	{
		Xrm.Page.ui.tabs.get(1).setVisible(false);
		Xrm.Page.ui.tabs.get(2).setVisible(false);
		Xrm.Page.ui.tabs.get(3).setVisible(false); 
	}
	catch (err)
	{
		if( DebugMode ) window.alert( "function hideTab error code = " + err );
	}
}

/* End Of Lines ************************************************************************/
