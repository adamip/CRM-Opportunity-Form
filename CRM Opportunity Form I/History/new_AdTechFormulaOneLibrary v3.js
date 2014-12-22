/*
	Adam Ip																	2011-06-21
	Text boxes propagate value from one text box to another, through some simple
	arithematic calculation.  Propagation might be in chain, hard-coded though.
	Initially used in Opportunities Form
*/
var DebugMode = true;   
   
function myFireEvent( elmt, strEvt )
{
	if( DebugMode ) window.alert("function myFireEvent " + elmt + " & " + strEvt );
	try
	{
		if( document.createEventObject )
		{
			if( DebugMode ) window.alert("function myFireEvent IE" );

			var evt	= document.createEventObject();
			return elmt.fireEvent( 'on' + strEvt, evt );	
		}
		else {
			var evt = document.createEvent( "HTMLEvents" );		
			if( evt && evt.initEvent )
			{
			if( DebugMode ) window.alert("function myFireEvent non-IE" );
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

// Services_Revenue__c / 2 
function Revenue_50_Services__c()
{
	if( DebugMode ) window.alert( "function Revenue_50_Services__c" );

	try
	{
		var in1 = Xrm.Page.getAttribute("new_servicesrevenue");
		var out1 = Xrm.Page.getAttribute("new_50servicesrevenue");
		var val1 = in1.getValue(); 
		
		if( val1 == null ) val1 = 0;
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

// Revenue_50_Services__c + HDW_SW_Revenue__c 
function Future_AGS_Revenue_Total__c()
{
	if( DebugMode ) window.alert( "function Future_AGS_Revenue_Total__c" );

	try
	{
		var in1 = Xrm.Page.getAttribute("new_50servicesrevenue");
		var in2 = Xrm.Page.getAttribute("new_hwpluswswrevenue");	
		var out1 = Xrm.Page.getAttribute("new_futureagsrevenuetotal");
		var val1 = in1.getValue(); 
		var val2 = in2.getValue(); 
		
		if( val1 == null ) val1 = 0;
		if( val2 == null ) val2 = 0;
		if( out1 != null ) out1.setValue( val1 + val2 );			
	}
	catch (err)
	{
		if( DebugMode ) window.alert( "function Future_AGS_Revenue_Total__c error code " + err );
	}
}

// Hardware_Revenue__c + Software_Revenue__c
function HDW_SW_Revenue__c()
{
	if( DebugMode ) window.alert( "function HDW_SW_Revenue__c" );
		
	try
	{
		var in1 = Xrm.Page.getAttribute("new_hardwarerevenue");
		var in2 = Xrm.Page.getAttribute("new_softwarerevenue");	
		var out1 = Xrm.Page.getAttribute("new_hwpluswswrevenue");
		var val1 = in1.getValue(); 
		var val2 = in2.getValue(); 
		
		if( val1 == null ) val1 = 0;
		if( val2 == null ) val2 = 0;
		if( out1 != null ) out1.setValue( val1 + val2 );			

		// trigger 2 events afterward		
		// myFireOnChangeEvent( "new_hwpluswswrevenue", Future_AGS_Revenue_Total__c );
		// myFireOnChangeEvent( "new_hwpluswswrevenue", Initial_Verint_Revenue__c );		
		Future_AGS_Revenue_Total__c();
		Initial_Verint_Revenue__c();		
	}
	catch (err)
	{
		if( DebugMode ) window.alert( "function HDW_SW_Revenue__c error code " + err );
	}
}

// Total_Revenue__c - Revenue_50_Services__c - HDW_SW_Revenue__c
function Initial_Verint_Revenue__c()
{
	if( DebugMode ) window.alert( "function Initial_Verint_Revenue__c" );

	try
	{
		var in1 = Xrm.Page.getAttribute("new_totalrevenue");
		var in2 = Xrm.Page.getAttribute("new_50servicesrevenue");	
		var in3 = Xrm.Page.getAttribute("new_hdwpluswswrevenue");	
		var out1 = Xrm.Page.getAttribute("new_Initialverintrevenue");
		var val1 = in1.getValue(); 
		var val2 = in2.getValue(); 
		var val3 = in3.getValue(); 
		
		if( val1 == null ) val1 = 0;
		if( val2 == null ) val2 = 0;
		if( val3 == null ) val3 = 0;
		if( out1 != null ) out1.setValue( val1 - val2 - val3 );			
	}
	catch (err)
	{
		if( DebugMode ) window.alert( "function Initial_Verint_Revenue__c error code " + err );
	}
}

/* (Software_List_Price__c * (1-82/100)) * (1-(6/10)) */
function Maintenance_Dollars_Verint__c()
{
	if( DebugMode ) window.alert( "function Maintenance_Dollars_Verint__c" );
	
	try
	{
		var in1 = Xrm.Page.getAttribute("new_softwarelistprice");
		var out1 = Xrm.Page.getAttribute("new_maintenancedollarsverint");
		var val1 = in1.getValue(); 
		
		if( val1 == null ) val1 = 0;
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

/* Software_List_Price__c * (1-(6/10)) */
function Software_Dollars_Verint__c()
{
	if( DebugMode ) window.alert( "function Software_Dollars_Verint__c" );

	try
	{
		var in1 = Xrm.Page.getAttribute("new_softwarelistprice");
		var out1 = Xrm.Page.getAttribute("new_softwaredollarsverint");
		var val1 = in1.getValue(); 
		
		if( val1 == null ) val1 = 0;
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

// Software_List_Price__c * (1-Software_Discount_Percentage__c)
function Software_Revenue__c()
{
	if( DebugMode ) window.alert( "function Software_Revenue__c" );
	
	try
	{
		var in1 = Xrm.Page.getAttribute("new_softwarelistprice");
		var in2 = Xrm.Page.getAttribute("new_softwarediscountpercentage");	
		var out1 = Xrm.Page.getAttribute("new_softwarerevenue");
		var val1 = in1.getValue(); 
		var val2 = in2.getValue(); 
		
		if( val1 == null ) val1 = 0;
		if( val2 == null ) val2 = 0;
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

/* Software_Dollars_Verint__c + Maintenance_Dollars_Verint__c + 
		Partner_Services_Dollars__c + Partner_Training_Dollars__c */
function Total_Dollars_Partner__c()
{
	if( DebugMode ) window.alert( "function Total_Dollars_Partner__c" );
	
	try
	{
		var in1 = Xrm.Page.getAttribute("new_softwaredollarsverint");
		var in2 = Xrm.Page.getAttribute("new_maintenancedollarsverint");	
		var in3 = Xrm.Page.getAttribute("new_servicesdollarstopartner");	
		var in4 = Xrm.Page.getAttribute("new_trainingdollarstopartner");	
		var out1 = Xrm.Page.getAttribute("new_Totaldollarspartner");
		var val1 = in1.getValue(); 
		var val2 = in2.getValue(); 
		var val3 = in3.getValue(); 
		var val4 = in4.getValue(); 
		
		if( val1 == null ) val1 = 0;
		if( val2 == null ) val2 = 0;
		if( val3 == null ) val3 = 0;
		if( val4 == null ) val4 = 0;
		if( out1 != null ) out1.setValue( val1 + val2 + val3 + val4 );			
	}
	catch (err)
	{
		if( DebugMode ) window.alert( "function Total_Dollars_Partner__c error code " + err );
	}
}

/* Hardware_Revenue__c + Software_Revenue__c + Software_Maintenance_Revenue__c + 
	Training_Revenue__c + AGS_Support_Revenue__c + Services_Revenue__c + 
	Preferred_Customer_Discount__c + First_Year_Revenue__c + Partner_Services_Revenue__c */
function Total_Revenue__c()
{
	if( DebugMode ) window.alert( "function Total_Revenue__c" );

	try
	{
		var in1 = Xrm.Page.getAttribute("new_hardwarerevenue");
		var in2 = Xrm.Page.getAttribute("new_softwarerevenue");	
		var in3 = Xrm.Page.getAttribute("new_softwaremaintenancerevenue");	
		var in4 = Xrm.Page.getAttribute("new_trainingrevenue");
		// var in5 = Xrm.Page.getAttribute("");	
		var in6 = Xrm.Page.getAttribute("new_servicesrevennue");	
		var in7 = Xrm.Page.getAttribute("new_preferredcustomerdiscount");
		// var in8 = Xrm.Page.getAttribute("");	
		// var in9 = Xrm.Page.getAttribute("");	
		var out1 = Xrm.Page.getAttribute("new_totalrevenue");
		
		if( DebugMode ) window.alert( "function Total_Revenue__c #1 in1 = " + in1 );
		var val1 = ( in1 == null || in1.getValue() == null )?0:in1.getValue();
		if( DebugMode ) window.alert( "function Total_Revenue__c #2 val1 = " + val1 );
		var val2 = ( in2 == null || in2.getValue() == null )?0:in2.getValue();
		var val3 = ( in3 == null || in3.getValue() == null )?0:in3.getValue();
		var val4 = ( in4 == null || in4.getValue() == null )?0:in4.getValue();
		// var val5 = in5.getValue(); 
		var val6 = in6.getValue(); 
		var val7 = in7.getValue(); 
		// var val8 = in8.getValue(); 
		// var val9 = in9.getValue(); 
		
		if( DebugMode ) window.alert( "function Total_Revenue__c #3" );
		if( out1 != null ) out1.setValue( val1 + val2 + val3 + val4  + val6 + val7 );	

		if( DebugMode ) window.alert( "function Total_Revenue__c #4" );
		// trigger 1 event afterward		
		// myFireOnChangeEvent( "new_totalrevenue", Initial_Verint_Revenue__c );
		Initial_Verint_Revenue__c();
		if( DebugMode ) window.alert( "function Total_Revenue__c #5" );
	}
	catch (err)
	{
		if( DebugMode ) window.alert( "function Total_Revenue__c error code = " + err );
	}
}


