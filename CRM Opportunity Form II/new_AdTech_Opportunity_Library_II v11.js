/*
	Adam Ip																	2012-02-29
	Text boxes propagate value from one text box to another, through some simple
	arithematic calculation.  Propagation might be in chain, hard-coded though.
	Initially used in Opportunities Form
	
	Adam Ip																	2012-03-06
	function LengthOfTermThirdPartyHardwareSupport_Change()
	function LengthOfTermThirdPartySoftwareSupport_Change()

	Adam Ip																	2012-03-07
	function CustomerID_Change()
	function CalcGPCost()
	function CalcCostPctOffList()
	function CalcSupportCostPctOfList()
	function HardwareGPpct_Change()
	function ThirdPartyHardwareSupportGPpct_Change()
	function SoftwareGPpct_Change()
	function ThirdPartySoftwareSupportGPpct_Change()
	function TotalRevenueCostGP()
	
	Adam Ip																	2012-03-19
	function TotalRevenue() to include Estimated Revenue Value

	Adam Ip																	2012-04-11
	function ThirdPartyHardwareSupportEarned_Update()
	function ThirdPartySoftwareSupportEarned_Update()
	function AdtechHardwareSoftwareSupportEarned_Update()
	function AdtechManagedServicesEarned_Update()
	function SupportEarned_Update()
	*/
var DebugModeOppII = false;   
/* var DebugModeFocus = true;    */
   
/***************************************************************************************/
function GPPercentage( sLabel, val1, val2, out2 )
{
	if( DebugModeOppII ) window.alert( "function GPPercentage: " + sLabel + "\nval1 " + val1 + "\nval2 " + val2 );

	try
	{
		if( out2 != null && val1 != null && val1 != 0 )
		{ 
			out2.setSubmitMode( "always" );
			out2.setValue(( val1 - val2 ) * 100.0 / val1 );	
		}
		if( DebugModeOppII ) window.alert( "function GPPercentage: " + sLabel + "\n\tval1 " + val1 + "\n+\tval2 " + val2 );		
	}
	catch( err )
	{
		if( DebugModeOppII ) window.alert( "function GPPercentage " + sLabel + " error code " + err );
	}
}

/***************************************************************************************/
function GP( sLabel, val1, val2, out1, out2 )
{
	if( DebugModeOppII ) window.alert( "function GP: " + sLabel + "\nval1 " + val1 + "\nval2 " + val2 );

	try
	{
		if( out1 != null )
		{ 
			out1.setSubmitMode( "always" );
			out1.setValue( val1 - val2 );
		}	
		if( out2 != null )
		{ 
			GPPercentage( sLabel, val1, val2, out2 );
		}	
		if( DebugModeOppII ) window.alert( "function GP: " + sLabel + "\n\tval1 " + val1 + "\n+\tval2 " + val2 );
		
		/* all calculation on a section header will trigger re-calculation on total revenue, total cost, total gp 
			this IF statement avoids an infinite recursive call 														*/
		if( sLabel != "Total GP" )
			TotalRevenueCostGP();
	}
	catch( err )
	{
		if( DebugModeOppII ) window.alert( "function GP " + sLabel + " error code " + err );
	}
}

/***************************************************************************************/
function HardwareRevenue()
{
	if( DebugModeOppII ) window.alert( "function HardwareRevenue" );

	try
	{
		var val1 = myGetValue( "cust_hardwarelistprice" );
		var val2 = myGetValue( "cust_hardwarerevenuepctofflist" );
		var out1 = Xrm.Page.getAttribute( "cust_hardwarerevenue" );
		if( DebugModeOppII ) window.alert( "function HardwareRevenue\nval1 " + val1 + "\nval2 " + val2 );
		
		PercentageOff( "Hardware Revenue", val1, val2, out1 );
		HardwareGP();
	}
	catch( err )
	{
		if( DebugModeOppII ) window.alert( "function HardwareRevenue error code " + err );
	}
}

/***************************************************************************************/
function HardwareCost()
{
	if( DebugModeOppII ) window.alert( "function HardwareCost" );

	try
	{
		var val1 = myGetValue( "cust_hardwarelistprice" );
		var val2 = myGetValue( "cust_hardwarecostpctofflist" );
		var out1 = Xrm.Page.getAttribute( "cust_hardwarecost" );
		if( DebugModeOppII ) window.alert( "function HardwareCost\nval1 " + val1 + "\nval2 " + val2 );
		
		PercentageOff( "Hardware Cost", val1, val2, out1 );
		HardwareGP();
	}
	catch( err )
	{
		if( DebugModeOppII ) window.alert( "function HardwareCost error code " + err );
	}
}

/***************************************************************************************/
function HardwareRevenuePctOffListUpdate()
{
	if( DebugModeOppII ) window.alert( "function HardwareRevenuePctOffListUpdate" );

	try
	{
		var val1 = myGetValue( "cust_hardwarelistprice" );
		var val2 = myGetValue( "cust_hardwarerevenue" );
		var out1 = Xrm.Page.getAttribute( "cust_hardwarerevenuepctofflist" );
		if( DebugModeOppII ) window.alert( "function HardwareRevenuePctOffListUpdate\nval1 " + val1 + "\nval2 " + val2 );
		
		CalcPercentageOff( "Hardware Revenue % Off List", val1, val2, out1 );
	}
	catch( err )
	{
		if( DebugModeOppII ) window.alert( "function HardwareRevenuePctOffListUpdate error code " + err );
	}
}

/***************************************************************************************/
function HardwareCostPctOffListUpdate()
{
	if( DebugModeOppII ) window.alert( "function HardwareCostPctOffListUpdate" );

	try
	{
		var val1 = myGetValue( "cust_hardwarelistprice" );
		var val2 = myGetValue( "cust_hardwarecost" );
		var out1 = Xrm.Page.getAttribute( "cust_hardwarecostpctofflist" );
		if( DebugModeOppII ) window.alert( "function HardwareCostPctOffListUpdate\nval1 " + val1 + "\nval2 " + val2 );
		
		CalcPercentageOff( "Hardware Cost % Off List", val1, val2, out1 );
	}
	catch( err )
	{
		if( DebugModeOppII ) window.alert( "function HardwareCostPctOffListUpdate error code " + err );
	}
}

/***************************************************************************************/
function SoftwareRevenuePctOffListUpdate()
{
	if( DebugModeOppII ) window.alert( "function softwareRevenuePctOffListUpdate" );

	try
	{
		var val1 = myGetValue( "cust_softwarelistprice" );
		var val2 = myGetValue( "cust_softwarerevenue" );
		var out1 = Xrm.Page.getAttribute( "cust_softwarerevenuepctofflist" );
		if( DebugModeOppII ) window.alert( "function SoftwareRevenuePctOffListUpdate\nval1 " + val1 + "\nval2 " + val2 );
		
		CalcPercentageOff( "Software Revenue % Off List", val1, val2, out1 );
	}
	catch( err )
	{
		if( DebugModeOppII ) window.alert( "function SoftwareRevenuePctOffListUpdate error code " + err );
	}
}

/***************************************************************************************/
function SoftwareCostPctOffListUpdate()
{
	if( DebugModeOppII ) window.alert( "function SoftwareCostPctOffListUpdate" );

	try
	{
		var val1 = myGetValue( "cust_softwarelistprice" );
		var val2 = myGetValue( "cust_softwarecost" );
		var out1 = Xrm.Page.getAttribute( "cust_softwarecostpctofflist" );
		if( DebugModeOppII ) window.alert( "function SoftwareCostPctOffListUpdate\nval1 " + val1 + "\nval2 " + val2 );
		
		CalcPercentageOff( "Software Cost % Off List", val1, val2, out1 );
	}
	catch( err )
	{
		if( DebugModeOppII ) window.alert( "function SoftwareCostPctOffListUpdate error code " + err );
	}
}

/***************************************************************************************/
function ThirdPartyHardwareSupportRevenue_List()
{
	if( DebugModeOppII ) window.alert( "function ThirdPartyHardwareSupportRevenue_List" );

	try
	{
		var val1 = myGetValue( "cust_hardwarelistprice" );
		var val2 = myGetValue( "cust_thirdpartyhardwaresupportpctoflist" );
		var out1 = Xrm.Page.getAttribute( "cust_thirdpartyhardwaresupportrevenue" );
		if( DebugModeOppII ) window.alert( "function ThirdPartyHardwareSupportRevenue_List\nval1 " + val1 + "\nval2 " + val2 );
		
		PercentageOf( "Third Party Hardware Support Revenue", val1, val2, out1 );
		LengthOfTermThirdPartyHardwareSupport_Change();
		ThirdPartyHardwareSupportGP();
	}
	catch( err )
	{
		if( DebugModeOppII ) window.alert( "function ThirdPartyHardwareSupportRevenue_List error code " + err );
	}
}

/***************************************************************************************/
function ThirdPartyHardwareSupportRevenue_Revenue()
{
	if( DebugModeOppII ) window.alert( "function ThirdPartyHardwareSupportRevenue_Revenue" );

	try
	{
		var val1 = myGetValue( "cust_hardwarerevenue" );
		var val2 = myGetValue( "cust_thirdpartyhardwaresupportpctofrevenue" );
		var out1 = Xrm.Page.getAttribute( "cust_thirdpartyhardwaresupportrevenue" );
		if( DebugModeOppII ) window.alert( "function ThirdPartyHardwareSupportRevenue_Revenue\nval1 " + val1 + "\nval2 " + val2 );
		
		PercentageOf( "Third Party Hardware Support Revenue", val1, val2, out1 );
		LengthOfTermThirdPartyHardwareSupport_Change();
		ThirdPartyHardwareSupportGP();
	}
	catch( err )
	{
		if( DebugModeOppII ) window.alert( "function ThirdPartyHardwareSupportRevenue_Revenue error code " + err );
	}
}

/***************************************************************************************/
function ThirdPartyHardwareSupportCost_List()
{
	if( DebugModeOppII ) window.alert( "function ThirdPartyHardwareSupportCost_List" );

	try
	{
		var val1 = myGetValue( "cust_hardwarelistprice" );
		var val2 = myGetValue( "cust_thirdpartyhardwaresupportcostpctoflist" );
		var out1 = Xrm.Page.getAttribute( "cust_thirdpartyhardwaresupportcost" );
		if( DebugModeOppII ) window.alert( "function ThirdPartyHardwareSupportCost_List\nval1 " + val1 + "\nval2 " + val2 );
		
		PercentageOf( "Third Party Hardware Support Cost", val1, val2, out1 );
		ThirdPartyHardwareSupportGP();
	}
	catch( err )
	{
		if( DebugModeOppII ) window.alert( "function ThirdPartyHardwareSupportCost_List error code " + err );
	}
}

/***************************************************************************************/
function ThirdPartyHardwareSupportPctOfListUpdating()
{
	if( DebugModeOppII ) window.alert( "function ThirdPartyHardwareSupportPctOfListUpdating" );

	try
	{
		var val1 = myGetValue( "cust_hardwarelistprice" );
		var val2 = myGetValue( "cust_thirdpartyhardwaresupportrevenue" );
		var out1 = Xrm.Page.getAttribute( "cust_thirdpartyhardwaresupportpctoflist" );
		if( DebugModeOppII ) window.alert( "function ThirdPartyHardwareSupportPctOfListUpdating\nval1 " + val1 + "\nval2 " + val2 );
		
		CalcPercentageOf( "Third Party Hardware Support % Of List", val1, val2, out1 );
	}
	catch( err )
	{
		if( DebugModeOppII ) window.alert( "function ThirdPartyHardwareSupportPctOfListUpdating error code " + err );
	}
}

/***************************************************************************************/
function ThirdPartyHardwareSupportPctOfRevenueUpdating()
{
	if( DebugModeOppII ) window.alert( "function ThirdPartyHardwareSupportPctOfRevenueUpdating" );

	try
	{
		var val1 = myGetValue( "cust_hardwarerevenue" );
		var val2 = myGetValue( "cust_thirdpartyhardwaresupportrevenue" );
		var out1 = Xrm.Page.getAttribute( "cust_thirdpartyhardwaresupportpctofrevenue" );
		if( DebugModeOppII ) window.alert( "function ThirdPartyHardwareSupportPctOfRevenueUpdating\nval1 " + val1 + "\nval2 " + val2 );
		
		CalcPercentageOf( "Third Party Hardware Support % Of Revenue", val1, val2, out1 );
	}
	catch( err )
	{
		if( DebugModeOppII ) window.alert( "function ThirdPartyHardwareSupportPctOfRevenueUpdating error code " + err );
	}
}

/***************************************************************************************/
function HardwareGP()
{
	if( DebugModeOppII ) window.alert( "function HardwareGP" );

	try
	{
		var val1 = myGetValue( "cust_hardwarerevenue" );
		var val2 = myGetValue( "cust_hardwarecost" );
		var out1 = Xrm.Page.getAttribute( "cust_hardwaregp" );
		var out2 = Xrm.Page.getAttribute( "cust_hardwaregppct" );
		if( DebugModeOppII ) window.alert( "function HardwareGP\nval1 " + val1 + "\nval2 " + val2 );
		
		GP( "Hardware GP", val1, val2, out1, out2 );		
	}
	catch( err )
	{
		if( DebugModeOppII ) window.alert( "function HardwareGP error code " + err );
	}
}

/***************************************************************************************/
function ThirdPartyHardwareSupportGP()
{
	if( DebugModeOppII ) window.alert( "function ThirdPartyHardwareSupportGP" );

	try
	{
		var val1 = myGetValue( "cust_thirdpartyhardwaresupportrevenue" );
		var val2 = myGetValue( "cust_thirdpartyhardwaresupportcost" );
		var out1 = Xrm.Page.getAttribute( "cust_thirdpartyhardwaresupportgp" );
		var out2 = Xrm.Page.getAttribute( "cust_thirdpartyhardwaresupportgppct" );
		if( DebugModeOppII ) window.alert( "function ThirdPartyHardwareSupportGP\nval1 " + val1 + "\nval2 " + val2 );
		
		GP( "Third Party Hardware Support GP", val1, val2, out1, out2 );
	}
	catch( err )
	{
		if( DebugModeOppII ) window.alert( "function ThirdPartyHardwareSupportGP error code " + err );
	}
}

/***************************************************************************************/
function SoftwareRevenue()
{
	if( DebugModeOppII ) window.alert( "function SoftwareRevenue" );

	try
	{
		var val1 = myGetValue( "cust_softwarelistprice" );
		var val2 = myGetValue( "cust_softwarerevenuepctofflist" );
		var out1 = Xrm.Page.getAttribute( "cust_softwarerevenue" );
		if( DebugModeOppII ) window.alert( "function SoftwareRevenue\nval1 " + val1 + "\nval2 " + val2 );
		
		PercentageOff( "Software Revenue", val1, val2, out1 );
		SoftwareGP();
	}
	catch( err )
	{
		if( DebugModeOppII ) window.alert( "function SoftwareRevenue error code " + err );
	}
}

/***************************************************************************************/
function SoftwareCost()
{
	if( DebugModeOppII ) window.alert( "function SoftwareCost" );

	try
	{
		var val1 = myGetValue( "cust_softwarelistprice" );
		var val2 = myGetValue( "cust_softwarecostpctofflist" );
		var out1 = Xrm.Page.getAttribute( "cust_softwarecost" );
		if( DebugModeOppII ) window.alert( "function SoftwareCost\nval1 " + val1 + "\nval2 " + val2 );
		
		PercentageOff( "Software Cost", val1, val2, out1 );
		SoftwareGP();
	}
	catch( err )
	{
		if( DebugModeOppII ) window.alert( "function SoftwareCost error code " + err );
	}
}

/***************************************************************************************/
function SoftwareGP()
{
	if( DebugModeOppII ) window.alert( "function SoftwareGP" );

	try
	{
		var val1 = myGetValue( "cust_softwarerevenue" );
		var val2 = myGetValue( "cust_softwarecost" );
		var out1 = Xrm.Page.getAttribute( "cust_softwaregp" );
		var out2 = Xrm.Page.getAttribute( "cust_softwaregppct" );
		if( DebugModeOppII ) window.alert( "function SoftwareGP\nval1 " + val1 + "\nval2 " + val2 );
		
		GP( "Software GP", val1, val2, out1, out2 );
	}
	catch( err )
	{
		if( DebugModeOppII ) window.alert( "function SoftwareGP error code " + err );
	}
}

/***************************************************************************************/
function ThirdPartySoftwareSupportRevenue_List()
{
	if( DebugModeOppII ) window.alert( "function ThirdPartySoftwareSupportRevenue_List" );

	try
	{
		var val1 = myGetValue( "cust_softwarelistprice" );
		var val2 = myGetValue( "cust_thirdpartysoftwaresupportpctoflist" );
		var out1 = Xrm.Page.getAttribute( "cust_thirdpartysoftwaresupportrevenue" );
		if( DebugModeOppII ) window.alert( "function ThirdPartySoftwareSupportRevenue_List\nval1 " + val1 + "\nval2 " + val2 );
		
		PercentageOf( "Third Party Software Support Revenue", val1, val2, out1 );
		LengthOfTermThirdPartySoftwareSupport_Change();
		ThirdPartySoftwareSupportGP();
	}
	catch( err )
	{
		if( DebugModeOppII ) window.alert( "function ThirdPartySoftwareSupportRevenue_List error code " + err );
	}
}

/***************************************************************************************/
function ThirdPartySoftwareSupportPctOfRevenueUpdating()
{
	if( DebugModeOppII ) window.alert( "function ThirdPartySoftwareSupportPctOfRevenueUpdating" );

	try
	{
		var val1 = myGetValue( "cust_softwarerevenue" );
		var val2 = myGetValue( "cust_thirdpartysoftwaresupportrevenue" );
		var out1 = Xrm.Page.getAttribute( "cust_thirdpartysoftwaresupportpctofrevenue" );
		if( DebugModeOppII ) window.alert( "function ThirdPartySoftwareSupportPctOfRevenueUpdating\nval1 " + val1 + "\nval2 " + val2 );
		
		CalcPercentageOf( "Third Party Software Support % Of Revenue", val1, val2, out1 );
	}
	catch( err )
	{
		if( DebugModeOppII ) window.alert( "function ThirdPartySoftwareSupportPctOfRevenueUpdating error code " + err );
	}
}

/***************************************************************************************/
function ThirdPartySoftwareSupportPctOfListUpdating()
{
	if( DebugModeOppII ) window.alert( "function ThirdPartySoftwareSupportPctOfListUpdating" );

	try
	{
		var val1 = myGetValue( "cust_softwarelistprice" );
		var val2 = myGetValue( "cust_thirdpartysoftwaresupportrevenue" );
		var out1 = Xrm.Page.getAttribute( "cust_thirdpartysoftwaresupportpctoflist" );
		if( DebugModeOppII ) window.alert( "function ThirdPartySoftwareSupportPctOfListUpdating\nval1 " + val1 + "\nval2 " + val2 );
		
		CalcPercentageOf( "Third Party Software Support % Of List", val1, val2, out1 );
	}
	catch( err )
	{
		if( DebugModeOppII ) window.alert( "function ThirdPartySoftwareSupportPctOfListUpdating error code " + err );
	}
}

/***************************************************************************************/
function ThirdPartySoftwareSupportRevenue_Revenue()
{
	if( DebugModeOppII ) window.alert( "function ThirdPartySoftwareSupportRevenue_Revenue" );

	try
	{
		var val1 = myGetValue( "cust_softwarerevenue" );
		var val2 = myGetValue( "cust_thirdpartysoftwaresupportpctofrevenue" );
		var out1 = Xrm.Page.getAttribute( "cust_thirdpartysoftwaresupportrevenue" );
		if( DebugModeOppII ) window.alert( "function ThirdPartySoftwareSupportRevenue_Revenue\nval1 " + val1 + "\nval2 " + val2 );
		
		PercentageOf( "Third Party Software Support Revenue", val1, val2, out1 );
		LengthOfTermThirdPartySoftwareSupport_Change();
		ThirdPartySoftwareSupportGP();
	}
	catch( err )
	{
		if( DebugModeOppII ) window.alert( "function ThirdPartySoftwareSupportRevenue_Revenue error code " + err );
	}
}

/***************************************************************************************/
function ThirdPartySoftwareSupportCost_List()
{
	if( DebugModeOppII ) window.alert( "function ThirdPartySoftwareSupportCost_List" );

	try
	{
		var val1 = myGetValue( "cust_softwarelistprice" );
		var val2 = myGetValue( "cust_thirdpartysoftwaresupportcostpctoflist" );
		var out1 = Xrm.Page.getAttribute( "cust_thirdpartysoftwaresupportcost" );
		if( DebugModeOppII ) window.alert( "function ThirdPartySoftwareSupportCost_List\nval1 " + val1 + "\nval2 " + val2 );
		
		PercentageOf( "Third Party Software Support Cost", val1, val2, out1 );
		ThirdPartySoftwareSupportGP();
	}
	catch( err )
	{
		if( DebugModeOppII ) window.alert( "function ThirdPartySoftwareSupportCost_List error code " + err );
	}
}

/***************************************************************************************/
function ThirdPartySoftwareSupportGP()
{
	if( DebugModeOppII ) window.alert( "function ThirdPartySoftwareSupportGP" );

	try
	{
		var val1 = myGetValue( "cust_thirdpartysoftwaresupportrevenue" );
		var val2 = myGetValue( "cust_thirdpartysoftwaresupportcost" );
		var out1 = Xrm.Page.getAttribute( "cust_thirdpartysoftwaresupportgp" );
		var out2 = Xrm.Page.getAttribute( "cust_thirdpartysoftwaresupportgppct" );
		if( DebugModeOppII ) window.alert( "function ThirdPartySoftwareSupportGP\nval1 " + val1 + "\nval2 " + val2 );
		
		GP( "Third Party Software Support GP", val1, val2, out1, out2 );
	}
	catch( err )
	{
		if( DebugModeOppII ) window.alert( "function ThirdPartySoftwareSupportGP error code " + err );
	}
}

/***************************************************************************************/
function ServicesGP()
{
	if( DebugModeOppII ) window.alert( "function ServicesGP" );

	try
	{
		var val1 = myGetValue( "cust_servicesrevenue" );
		var val2 = myGetValue( "cust_servicescost" );
		var out1 = Xrm.Page.getAttribute( "cust_servicesgp" );
		var out2 = Xrm.Page.getAttribute( "cust_servicesgppct" );
		if( DebugModeOppII ) window.alert( "function ServicesGP\nval1 " + val1 + "\nval2 " + val2 );
		
		GP( "Services GP", val1, val2, out1, out2 );
	}
	catch( err )
	{
		if( DebugModeOppII ) window.alert( "function ServicesGP error code " + err );
	}
}

/***************************************************************************************/
function ServicesRevenue()
{
	if( DebugModeOppII ) window.alert( "function ServicesRevenue" );

	try
	{
		var val1 = myGetValue( "cust_serviceinstallrevenue" );
		var val2 = myGetValue( "cust_servicetrainingrevenue" );
		var val3 = myGetValue( "cust_serviceconsultingrevenue" );
		var val4 = myGetValue( "cust_servicepmrevenue" );
		var val5 = myGetValue( "cust_serviceengrrevenue" );
		var val6 = myGetValue( "cust_servicecustomerdevelopmentrevenue" );
		var val7 = myGetValue( "cust_serviceotherrevenue" );
		var out1 = Xrm.Page.getAttribute( "cust_servicesrevenue" );
		if( DebugModeOppII ) window.alert( "function ServicesRevenue\nval1 " + val1 + "\nval2 " + val2 + "\nval3 " + val3 + "\nval4 " + val4 + "\nval5 " + val5 + "\nval6 " + val6 + "\nval7 " + val7 );
		
		Sum7( "service Revenue", val1, val2, val3, val4, val5, val6, val7, out1 );
		ServicesGP();
	}
	catch( err )
	{
		if( DebugModeOppII ) window.alert( "function ServicesRevenue error code " + err );
	}
}

/***************************************************************************************/
function ServicesCost()
{
	if( DebugModeOppII ) window.alert( "function ServicesCost" );

	try
	{
		var val1 = myGetValue( "cust_serviceinstallcost" );
		var val2 = myGetValue( "cust_servicetrainingcost" );
		var val3 = myGetValue( "cust_serviceconsultingcost" );
		var val4 = myGetValue( "cust_servicepmcost" );
		var val5 = myGetValue( "cust_serviceengrcost" );
		var val6 = myGetValue( "cust_servicecustomerdevelopmentcost" );
		var val7 = myGetValue( "cust_serviceothercost" );
		var out1 = Xrm.Page.getAttribute( "cust_servicescost" );
		if( DebugModeOppII ) window.alert( "function ServicesCost\nval1 " + val1 + "\nval2 " + val2 + "\nval3 " + val3 + "\nval4 " + val4 + "\nval5 " + val5 + "\nval6 " + val6 + "\nval7 " + val7 );
		
		Sum7( "service Cost", val1, val2, val3, val4, val5, val6, val7, out1 );
		ServicesGP();
	}
	catch( err )
	{
		if( DebugModeOppII ) window.alert( "function ServicesCost error code " + err );
	}
}

/**************************************************************************************
	Calculation on Total Revenue, Total Cost, Total GP
*/
function TotalRevenueCostGP()
{
	if( DebugModeOppII ) window.alert( "function TotalRevenueCostGP" );

	try
	{
		TotalRevenue();
		TotalCost();
		TotalGP();
	}
	catch( err )
	{
		if( DebugModeOppII ) window.alert( "function TotalRevenueCostGP error code " + err );
	}
}
/***************************************************************************************/
function TotalGP()
{
	if( DebugModeOppII ) window.alert( "function TotalGP" );

	try
	{
		var val1 = myGetValue( "cust_totalrevenue" );
		var val2 = myGetValue( "cust_totalcost" );
		var out1 = Xrm.Page.getAttribute( "cust_totalgp" );
		var out2 = Xrm.Page.getAttribute( "cust_totalgppct" );
		if( DebugModeOppII ) window.alert( "function TotalGP\nval1 " + val1 + "\nval2 " + val2 );
		
		GP( "Total GP", val1, val2, out1, out2 );
	}
	catch( err )
	{
		if( DebugModeOppII ) window.alert( "function TotalGP error code " + err );
	}
}

/***************************************************************************************/
function TotalRevenue()
{
	if( DebugModeOppII ) window.alert( "function TotalRevenue" );

	try
	{
		var val1 = myGetValue( "cust_hardwarerevenue" );
		var val2 = myGetValue( "cust_thirdpartyhardwaresupportrevenue" );
		var val3 = myGetValue( "cust_softwarerevenue" );
		var val4 = myGetValue( "cust_thirdpartysoftwaresupportrevenue" );
		var val5 = myGetValue( "cust_servicesrevenue" );
		var val6 = myGetValue( "cust_adtechhardwaresoftwaresupport" );
		var val7 = myGetValue( "cust_adtechmanagedservices" );
		if( DebugModeOppII ) window.alert( "function TotalRevenue\nval1 " + val1 + "\nval2 " + val2 + "\nval3 " + val3 + "\nval4 " + val4 + "\nval5 " + val5 + "\nval6 " + val6 + "\nval7 " + val7 );		
		
		var out1 = Xrm.Page.getAttribute( "cust_totalrevenue" );	
		Sum7( "Total Revenue", val1, val2, val3, val4, val5, val6, val7, out1 );
		var out2 = Xrm.Page.getAttribute( "estimatedvalue" );	
		Sum7( "Estimated Revenue Value", val1, val2, val3, val4, val5, val6, val7, out2 );
				
		// var fSum = val1 + val2 + val3 + val4 + val5 + val6 + val7; 
		//if( DebugModeOppII ) window.alert( "function TotalRevenue\nval1 " + val1 + "\nval2 " + val2 + "\nval3 " + val3 + "\nval4 " + val4 + "\nval5 " + val5 + "\nval6 " + val6 + "\nval7 " + val7  + "\nSum " + fSum );
		/* Total Revenue */
		// mySetValue( "cust_totalrevenue", fSum );
		/* Estimated Revenue Value */
		// mySetValue( "estimatedvalue", fSum );		
	}
	catch( err )
	{
		if( DebugModeOppII ) window.alert( "function TotalRevenue error code " + err );
	}
}

/***************************************************************************************/
function TotalCost()
{
	if( DebugModeOppII ) window.alert( "function TotalCost" );

	try
	{
		var val1 = myGetValue( "cust_hardwarecost" );
		var val2 = myGetValue( "cust_thirdpartyhardwaresupportcost" );
		var val3 = myGetValue( "cust_softwarecost" );
		var val4 = myGetValue( "cust_thirdpartysoftwaresupportcost" );
		var val5 = myGetValue( "cust_servicescost" );
		var out1 = Xrm.Page.getAttribute( "cust_totalcost" );
		if( DebugModeOppII ) window.alert( "function TotalCost\nval1 " + val1 + "\nval2 " + val2 + "\nval3 " + val3 + "\nval4 " + val4 + "\nval5 " + val5 );
		
		Sum5( "Total Cost", val1, val2, val3, val4, val5, out1 );
	}
	catch( err )
	{
		if( DebugModeOppII ) window.alert( "function TotalCost error code " + err );
	}
}

/***************************************************************************************/
function HardwareRevenue_Change()
{
	if( DebugModeOppII ) window.alert( "function HardwareRevenue_Change" );

	try
	{
		HardwareRevenueUpdating();
	}
	catch( err )
	{
		if( DebugModeOppII ) window.alert( "function HardwareRevenue_Change error code " + err );
	}
}

/***************************************************************************************/
function HardwareCost_Change()
{
	if( DebugModeOppII ) window.alert( "function HardwareCost_Change" );

	try
	{
		HardwareCostUpdate();
	}
	catch( err )
	{
		if( DebugModeOppII ) window.alert( "function HardwareCost_Change error code " + err );
	}
}

/**************************************************************************************
	While Third Party Hardware Support Cost is being updated
																					*/
function ThirdPartyHardwareSupportCostUpdating()
{
	if( DebugModeOppII ) window.alert( "function ThirdPartyHardwareSupportCostUpdating" );

	try
	{
		var val1 = myGetValue( "cust_hardwarelistprice" );
		var val2 = myGetValue( "cust_thirdpartyhardwaresupportcost" );
		var out1 = Xrm.Page.getAttribute( "cust_thirdpartyhardwaresupportcostpctoflist" );
		if( DebugModeOppII ) window.alert( "function ThirdPartyHardwareSupportCostUpdating\nval1 " + val1 + "\nval2 " + val2 );
				
		CalcPercentageOf( "ThirdPartyHardwareSupportCostUpdating", val1, val2, out1 );
		
		ThirdPartyHardwareSupportGP();
	}
	catch( err )
	{
		if( DebugModeOppII ) window.alert( "function ThirdPartyHardwareSupportCostUpdating error code " + err );
	}
}

/***************************************************************************************/
function SoftwareRevenue_Change()
{
	if( DebugModeOppII ) window.alert( "function SoftwareRevenue_Change" );

	try
	{
		SoftwareRevenueUpdating();
	}
	catch( err )
	{
		if( DebugModeOppII ) window.alert( "function SoftwareRevenue_Change error code " + err );
	}
}

/***************************************************************************************/
function SoftwareCost_Change()
{
	if( DebugModeOppII ) window.alert( "function SoftwareCost_Change" );

	try
	{
		SoftwareCostUpdate();
	}
	catch( err )
	{
		if( DebugModeOppII ) window.alert( "function SoftwareCost_Change error code " + err );
	}
}

/***************************************************************************************/
function ThirdPartySoftwareSupportRevenueUpdating()
{
	if( DebugModeOppII ) window.alert( "function ThirdPartySoftwareSupportRevenueUpdating" );

	try
	{
		var val1 = myGetValue( "cust_softwarelistprice" );
		var val2 = myGetValue( "cust_thirdpartysoftwaresupportrevenue" );
		var val3 = myGetValue( "cust_softwarerevenue" );
		var out1 = Xrm.Page.getAttribute( "cust_thirdpartysoftwaresupportpctoflist" );
		var out2 = Xrm.Page.getAttribute( "cust_thirdpartysoftwaresupportpctofrevenue" );
		if( DebugModeOppII ) window.alert( "function ThirdPartySoftwareSupportRevenueUpdating\nval1 " + val1 + "\nval2 " + val2 + "\nval3 " + val3 );

		CalcPercentageOf( "ThirdPartySoftwareSupportRevenueUpdating #1 Of List", val1, val2, out1 );
		CalcPercentageOf( "ThirdPartySoftwareSupportRevenueUpdating #2 Of Revenue", val3, val2, out2 );

		LengthOfTermThirdPartySoftwareSupport_Change();
		ThirdPartySoftwareSupportGP();
	}
	catch( err )
	{
		if( DebugModeOppII ) window.alert( "function ThirdPartySoftwareSupportRevenueUpdating error code " + err );
	}
}

/***************************************************************************************/
function ThirdPartySoftwareSupportCostUpdating()
{
	if( DebugModeOppII ) window.alert( "function ThirdPartySoftwareSupportCostUpdating" );

	try
	{
		var val1 = myGetValue( "cust_softwarelistprice" );
		var val2 = myGetValue( "cust_thirdpartysoftwaresupportcost" );
		var out1 = Xrm.Page.getAttribute( "cust_thirdpartysoftwaresupportcostpctoflist" );
		if( DebugModeOppII ) window.alert( "function ThirdPartySoftwareSupportCostUpdating\nval1 " + val1 + "\nval2 " + val2 );

		CalcPercentageOf( "ThirdPartySoftwareSupportCostUpdating", val1, val2, out1 );

		ThirdPartySoftwareSupportGP();
	}
	catch( err )
	{
		if( DebugModeOppII ) window.alert( "function ThirdPartySoftwareSupportCostUpdating error code " + err );
	}
}

/***************************************************************************************/
/* When manually input ServicesRevenue												   */
function ServicesRevenueUpdate()
{
	if( DebugModeOppII ) window.alert( "function ServicesRevenueUpdate" );

	try
	{
		mySetValue( "cust_serviceinstallrevenue", null );
		mySetValue( "cust_servicetrainingrevenue", null );
		mySetValue( "cust_serviceconsultingrevenue" , null);
		mySetValue( "cust_servicepmrevenue", null );
		mySetValue( "cust_serviceengrrevenue", null );
		mySetValue( "cust_servicecustomerdevelopmentrevenue", null );	
		mySetValue( "cust_serviceotherrevenue", null );	
	
		ServicesGP();
	}
	catch( err )
	{
		if( DebugModeOppII ) window.alert( "function ServicesRevenueUpdate error code " + err );
	}
}

/***************************************************************************************/
function ServicesRevenueSumUpdate()
{
	if( DebugModeOppII ) window.alert( "function ServicesRevenueSumUpdate" );

	try
	{
		ServicesRevenue();
	}
	catch( err )
	{
		if( DebugModeOppII ) window.alert( "function ServicesRevenueSumUpdate error code " + err );
	}
}

/***************************************************************************************/
/* When manually input ServicesCost		    										   */
function ServicesCostUpdate()
{
	if( DebugModeOppII ) window.alert( "function ServicesCostUpdate" );

	try
	{
		mySetValue( "cust_serviceinstallcost", null );	
		mySetValue( "cust_servicetrainingcost", null );	
		mySetValue( "cust_serviceconsultingcost", null );	
		mySetValue( "cust_servicepmcost", null );	
		mySetValue( "cust_serviceengrcost", null );	
		mySetValue( "cust_servicecustomerdevelopmentcost", null );	
		mySetValue( "cust_serviceothercost", null );	

		ServicesGP();
	}
	catch( err )
	{
		if( DebugModeOppII ) window.alert( "function ServicesCostUpdate error code " + err );
	}
}

/***************************************************************************************/
function ServicesCostSumUpdate()
{
	if( DebugModeOppII ) window.alert( "function ServicesCostSumUpdate" );

	try
	{
		ServicesCost();
		ServicesGP();

	}
	catch( err )
	{
		if( DebugModeOppII ) window.alert( "function ServicesCostSumUpdate error code " + err );
	}
}

/***************************************************************************************/
function HardwareRevenueUpdating()
{
	if( DebugModeOppII ) window.alert( "function HardwareRevenueUpdating" );

	try
	{
		var val1 = myGetValue( "cust_hardwarelistprice" );
		var val2 = myGetValue( "cust_thirdpartyhardwaresupportrevenue" );
		var val3 = myGetValue( "cust_hardwarerevenue" );
		var out1 = Xrm.Page.getAttribute( "cust_thirdpartyhardwaresupportpctofrevenue" );
		var out2 = Xrm.Page.getAttribute( "cust_hardwarerevenuepctofflist" );
		if( DebugModeOppII ) window.alert( "function HardwareRevenueUpdating\nval1 " + val1 + "\nval2 " + val2 );

		CalcPercentageOf( "HardwareRevenueUpdating #1 Of Revenue", val1, val2, out1 );
		CalcPercentageOff( "HardwareRevenueUpdating #2 Off List", val1, val3, out2 );
		HardwareGP();		
	}
	catch( err )
	{
		if( DebugModeOppII ) window.alert( "function HardwareRevenueUpdating error code " + err );
	}
}

/***************************************************************************************/
function HardwareCostUpdate()
{
	if( DebugModeOppII ) window.alert( "function HardwareCostUpdate" );

	try
	{
		var val1 = myGetValue( "cust_hardwarelistprice" );
		var val2 = myGetValue( "cust_hardwarecost" );
		var out1 = Xrm.Page.getAttribute( "cust_hardwarecostpctofflist" );
		if( DebugModeOppII ) window.alert( "function HardwareCostUpdate\nval1 " + val1 + "\nval2 " + val2 );

		CalcPercentageOff( "HardwareCostUpdate", val1, val2, out1 );
		HardwareGP();		
	}
	catch( err )
	{
		if( DebugModeOppII ) window.alert( "function HardwareCostUpdate error code " + err );
	}
}

/***************************************************************************************/
function ThirdPartyHardwareSupportRevenueUpdating()
{
	if( DebugModeOppII ) window.alert( "function ThirdPartyHardwareSupportRevenueUpdating" );

	try
	{
		var val1 = myGetValue( "cust_hardwarelistprice" );
		var val2 = myGetValue( "cust_thirdpartyhardwaresupportrevenue" );
		var val3 = myGetValue( "cust_hardwarerevenue" );
		var out1 = Xrm.Page.getAttribute( "cust_thirdpartyhardwaresupportpctoflist" );
		var out2 = Xrm.Page.getAttribute( "cust_thirdpartyhardwaresupportpctofrevenue" );
		if( DebugModeOppII ) window.alert( "function ThirdPartyHardwareSupportRevenueUpdating\nval1 " + val1 + "\nval2 " + val2 + "\nval3 " + val3 );

		CalcPercentageOf( "ThirdPartyHardwareSupportRevenueUpdating #1 Of List", val1, val2, out1 );
		CalcPercentageOf( "ThirdPartyHardwareSupportRevenueUpdating #2 Of Revenue", val3, val2, out2 );
		LengthOfTermThirdPartyHardwareSupport_Change();
		ThirdPartyHardwareSupportGP();
	}
	catch( err )
	{
		if( DebugModeOppII ) window.alert( "function ThirdPartyHardwareSupportRevenueUpdating error code " + err );
	}
}

/***************************************************************************************/
function HardwareListPrice_Change()
{
	if( DebugModeOppII ) window.alert( "function HardwareListPrice_Change" );

	try
	{
		HardwareRevenue();
		HardwareRevenuePctOffListUpdate(); 	/* to update cust_hardwarerevenuepctofflist */
		HardwareCostPctOffListUpdate();		/* to update cust_hardwarecostpctofflist */
		ThirdPartyHardwareSupportRevenue_List();
		ThirdPartyHardwareSupportRevenue_Revenue();
		ThirdPartyHardwareSupportCost_List();
	}
	catch( err )
	{
		if( DebugModeOppII ) window.alert( "function HardwareListPrice_Change error code " + err );
	}
}

/***************************************************************************************/
function HardwareRevenuePctOffList_Change()
{
	if( DebugModeOppII ) window.alert( "function HardwareRevenuePctOffList_Change" );

	try
	{
		HardwareRevenue();	
		ThirdPartyHardwareSupportRevenue_List();
		ThirdPartyHardwareSupportPctOfRevenueUpdating();
	}
	catch( err )
	{
		if( DebugModeOppII ) window.alert( "function HardwareRevenuePctOffList_Change error code " + err );
	}
}

/***************************************************************************************/
function SoftwareRevenuePctOffList_Change()
{
	if( DebugModeOppII ) window.alert( "function SoftwareRevenuePctOffList_Change" );

	try
	{
		SoftwareRevenue();	
		ThirdPartySoftwareSupportRevenue_List();
		ThirdPartySoftwareSupportPctOfRevenueUpdating();
	}
	catch( err )
	{
		if( DebugModeOppII ) window.alert( "function SoftwareRevenuePctOffList_Change error code " + err );
	}
}

/***************************************************************************************/
function HardwareCostPctOffList_Change()
{
	if( DebugModeOppII ) window.alert( "function HardwareCostPctOffList_Change" );

	try
	{
		HardwareCost();	
	}
	catch( err )
	{
		if( DebugModeOppII ) window.alert( "function HardwareCostPctOffList_Change error code " + err );
	}
}

/***************************************************************************************/
function SoftwareCostPctOffList_Change()
{
	if( DebugModeOppII ) window.alert( "function SoftwareCostPctOffList_Change" );

	try
	{
		SoftwareCost();	
	}
	catch( err )
	{
		if( DebugModeOppII ) window.alert( "function SoftwareCostPctOffList_Change error code " + err );
	}
}

/***************************************************************************************/
function ThirdPartyHardwareSupportRevenue_Change()
{
	if( DebugModeOppII ) window.alert( "function ThirdPartyHardwareSupportRevenue_Change" );

	try
	{
		ThirdPartyHardwareSupportRevenueUpdating();
	}
	catch( err )
	{
		if( DebugModeOppII ) window.alert( "function ThirdPartyHardwareSupportRevenue_Change error code " + err );
	}
}

/***************************************************************************************/
function ThirdPartyHardwareSupportCost_Change()
{
	if( DebugModeOppII ) window.alert( "function ThirdPartyHardwareSupportCost_Change" );

	try
	{
		ThirdPartyHardwareSupportCostUpdating();
	}
	catch( err )
	{
		if( DebugModeOppII ) window.alert( "function ThirdPartyHardwareSupportCost_Change error code " + err );
	}
}

/***************************************************************************************/
function ThirdPartyHardwareSupportPctOfList_Change()
{
	if( DebugModeOppII ) window.alert( "function ThirdPartyHardwareSupportPctOfList_Change" );

	try
	{
		ThirdPartyHardwareSupportRevenue_List();
		ThirdPartyHardwareSupportPctOfRevenueUpdating();
	}
	catch( err )
	{
		if( DebugModeOppII ) window.alert( "function ThirdPartyHardwareSupportPctOfList_Change error code " + err );
	}
}

/***************************************************************************************/
function ThirdPartyHardwareSupportPctOfRevenue_Change()
{
	if( DebugModeOppII ) window.alert( "function ThirdPartyHardwareSupportPctOfRevenue_Change" );

	try
	{
		ThirdPartyHardwareSupportRevenue_Revenue();
		ThirdPartyHardwareSupportPctOfListUpdating();		
	}
	catch( err )
	{
		if( DebugModeOppII ) window.alert( "function ThirdPartyHardwareSupportPctOfRevenue_Change error code " + err );
	}
}

/***************************************************************************************/
function ThirdPartyHardwareSupportCostPctOfList_Change()
{
	if( DebugModeOppII ) window.alert( "function ThirdPartyHardwareSupportCostPctOfList_Change" );

	try
	{
		ThirdPartyHardwareSupportCost_List();
	}
	catch( err )
	{
		if( DebugModeOppII ) window.alert( "function ThirdPartyHardwareSupportCostPctOfList_Change error code " + err );
	}
}

/***************************************************************************************/
function SoftwareRevenueUpdating()
{
	if( DebugModeOppII ) window.alert( "function SoftwareRevenueUpdating" );

	try
	{
		var val1 = myGetValue( "cust_softwarelistprice" );
		var val2 = myGetValue( "cust_thirdpartysoftwaresupportrevenue" );
		var val3 = myGetValue( "cust_softwarerevenue" );
		var out1 = Xrm.Page.getAttribute( "cust_thirdpartysoftwaresupportpctofrevenue" );
		var out2 = Xrm.Page.getAttribute( "cust_softwarerevenuepctofflist" );
		if( DebugModeOppII ) window.alert( "function SoftwareRevenueUpdating\nval1 " + val1 + "\nval2 " + val2 + "\nval3 " + val3 );

		CalcPercentageOf( "SoftwareRevenueUpdating #1 Of Revenue", val1, val2, out1 );
		CalcPercentageOff( "SoftwareRevenueUpdating #2 Off List", val1, val3, out2 );
		SoftwareGP();		
	}
	catch( err )
	{
		if( DebugModeOppII ) window.alert( "function SoftwareRevenueUpdating error code " + err );
	}
}

/***************************************************************************************/
function SoftwareCostUpdate()
{
	if( DebugModeOppII ) window.alert( "function SoftwareCostUpdate" );

	try
	{
		var val1 = myGetValue( "cust_softwarelistprice" );
		var val2 = myGetValue( "cust_softwarecost" );
		var out1 = Xrm.Page.getAttribute( "cust_softwarecostpctofflist" );
		if( DebugModeOppII ) window.alert( "function SoftwareCostUpdate\nval1 " + val1 + "\nval2 " + val2 );
		
		CalcPercentageOff( "SoftwareCostUpdate", val1, val2, out1 );
		SoftwareGP();		
	}
	catch( err )
	{
		if( DebugModeOppII ) window.alert( "function SoftwareCostUpdate error code " + err );
	}
}

/***************************************************************************************/
function SoftwareListPrice_Change()
{
	if( DebugModeOppII ) window.alert( "function SoftwareListPrice_Change" );

	try
	{
		SoftwareRevenue();
		SoftwareRevenuePctOffListUpdate(); 	/* to update cust_softwarerevenuepctofflist */
		SoftwareCostPctOffListUpdate();		/* to update cust_softwarecostpctofflist */
		ThirdPartySoftwareSupportRevenue_List();
		ThirdPartySoftwareSupportRevenue_Revenue();
		ThirdPartySoftwareSupportCost_List();
	}
	catch( err )
	{
		if( DebugModeOppII ) window.alert( "function SoftwareListPrice_Change error code " + err );
	}
}

/***************************************************************************************/
function ThirdPartySoftwareSupportRevenue_Change()
{
	if( DebugModeOppII ) window.alert( "function ThirdPartySoftwareSupportRevenue_Change" );

	try
	{
		ThirdPartySoftwareSupportRevenueUpdating();
	}
	catch( err )
	{
		if( DebugModeOppII ) window.alert( "function ThirdPartySoftwareSupportRevenue_Change error code " + err );
	}
}

/***************************************************************************************/
function ThirdPartySoftwareSupportCost_Change()
{
	if( DebugModeOppII ) window.alert( "function ThirdPartySoftwareSupportCost_Change" );

	try
	{
		ThirdPartySoftwareSupportCostUpdating();
	}
	catch( err )
	{
		if( DebugModeOppII ) window.alert( "function ThirdPartySoftwareSupportCost_Change error code " + err );
	}
}

/***************************************************************************************/
function ThirdPartySoftwareSupportPctOfList_Change()
{
	if( DebugModeOppII ) window.alert( "function ThirdPartySoftwareSupportPctOfList_Change" );

	try
	{
		ThirdPartySoftwareSupportRevenue_List();
		ThirdPartySoftwareSupportPctOfRevenueUpdating();
	}
	catch( err )
	{
		if( DebugModeOppII ) window.alert( "function ThirdPartySoftwareSupportPctOfList_Change error code " + err );
	}
}

/***************************************************************************************/
function ThirdPartySoftwareSupportPctOfRevenue_Change()
{
	if( DebugModeOppII ) window.alert( "function ThirdPartySoftwareSupportPctOfRevenue_Change" );

	try
	{
		ThirdPartySoftwareSupportRevenue_Revenue();	
		ThirdPartySoftwareSupportPctOfListUpdating();
	}
	catch( err )
	{
		if( DebugModeOppII ) window.alert( "function ThirdPartySoftwareSupportPctOfRevenue_Change error code " + err );
	}
}

/***************************************************************************************/
function ThirdPartySoftwareSupportCostPctOfList_Change()
{
	if( DebugModeOppII ) window.alert( "function ThirdPartySoftwareSupportCostPctOfList_Change" );

	try
	{
		ThirdPartySoftwareSupportCost_List();
	}
	catch( err )
	{
		if( DebugModeOppII ) window.alert( "function ThirdPartySoftwareSupportCostPctOfList_Change error code " + err );
	}
}

/***************************************************************************************/
function LengthOfTermThirdPartyHardwareSupport_Change()
{
	if( DebugModeOppII ) window.alert( "function LengthOfTermThirdPartyHardwareSupport_Change" );

	try
	{
		setValueNumPair( "cust_thirdpartyhardwaresupportrevenue", "cust_lengthoftermthirdpartyhardwaresupport", "You have entered a value for Support Revenue.\nYou must now enter the length of the support term in months.", false, false );
		ThirdPartyHardwareSupportEarned_Update();
	}
	catch( err )
	{
		if( DebugModeOppII ) window.alert( "function LengthOfTermThirdPartyHardwareSupport_Change error code " + err );
	}
	return;
}

/***************************************************************************************/
function LengthOfTermThirdPartySoftwareSupport_Change()
{
	if( DebugModeOppII ) window.alert( "function LengthOfTermThirdPartySoftwareSupport_Change" );

	try
	{
		setValueNumPair( "cust_thirdpartysoftwaresupportrevenue", "cust_lengthoftermthirdpartysoftwaresupport", "You have entered a value for Support Revenue.\nYou must now enter the length of the support term in months.", false, false );
		ThirdPartySoftwareSupportEarned_Update();
	}
	catch( err )
	{
		if( DebugModeOppII ) window.alert( "function LengthOfTermThirdPartySoftwareSupport_Change error code " + err );
	}
	return;
}

/***************************************************************************************/
function CustomerID_Change()
{
	if( DebugModeOppII ) window.alert( "function CustomerID_Change" );

	try
	{
		DisplayExpectedGPHardwareSoftware();
	}
	catch( err )
	{
		if( DebugModeOppII ) window.alert( "function CustomerID_Change error code " + err );
	}
	return;
}

/***************************************************************************************/
function CalcGPCost( sLabel1, sLabel2, sLabel3, sLabel4 )
{
	if( DebugModeOppII ) window.alert( "function CalcGPCost\nsLabel 1 " + sLabel1 + "\nsLabel 2 " + sLabel2 + "\nsLabel 3 " + sLabel3 + "\nsLabel 4 " + sLabel4 );

	try
	{
		var val1 = myGetValue( sLabel1 );
		var val4 = myGetValue( sLabel4 );
		var val2 = val1 * ( 1.0 - val4 / 100.0 );
		var out2 = Xrm.Page.getAttribute( sLabel2 );
		var out3 = Xrm.Page.getAttribute( sLabel3 );
		if( DebugModeOppII ) window.alert( "function CalcGPCost\nval1 " + val1 + "\nval2 " + val2 + "\nval4 " + val4 );

		if( out2 != null )
		{
			out2.setSubmitMode( "always" );
			out2.setValue( val2 );
		}	
		if( out3 != null )
		{
			out3.setSubmitMode( "always" );
			out3.setValue( val1 - val2 );
		}	
	}
	catch( err )
	{
		if( DebugModeOppII ) window.alert( "function CalcGPCost error code " + err );
	}
	return;
}

/***************************************************************************************/
function CalcCostPctOffList( sLabel1, sLabel2, sLabel3 )
{
	if( DebugModeOppII ) window.alert( "function CalcCostPctOffList\nsLabel 1 " + sLabel1 + "\nsLabel 2 " + sLabel2 + "\nsLabel 3 " + sLabel3 );

	try
	{
		var val1 = myGetValue( sLabel1 );
		var val2 = myGetValue( sLabel2 );
		var out3 = Xrm.Page.getAttribute( sLabel3 );
		if( DebugModeOppII ) window.alert( "function CalcCostPctOffList\nval1 " + val1 + "\nval2 " + val2 );

		if( out3 != null && val1 != null  && val1 != 0.0 )
		{
			out3.setSubmitMode( "always" );
			out3.setValue(( 1.0 - val2 / val1 ) * 100.0 );
		}	
	}
	catch( err )
	{
		if( DebugModeOppII ) window.alert( "function CalcCostPctOffList error code " + err );
	}
	return;
}

/***************************************************************************************/
function CalcSupportCostPctOfList( sLabel1, sLabel2, sLabel3 )
{
	if( DebugModeOppII ) window.alert( "function CalcSupportCostPctOfList\nsLabel 1 " + sLabel1 + "\nsLabel 2 " + sLabel2 + "\nsLabel 3 " + sLabel3 );

	try
	{
		var val1 = myGetValue( sLabel1 );
		var val2 = myGetValue( sLabel2 );
		var out3 = Xrm.Page.getAttribute( sLabel3 );
		if( DebugModeOppII ) window.alert( "function CalcSupportCostPctOfList\nval1 " + val1 + "\nval2 " + val2 );
		
		if( out3 != null )
		{
			out3.setSubmitMode( "always" );
			out3.setValue( val1 * val2 / 100.0 );
		}	
	}
	catch( err )
	{
		if( DebugModeOppII ) window.alert( "function CalcSupportCostPctOfList error code " + err );
	}
	return;
}

/***************************************************************************************/
function HardwareGPpct_Change()
{
	if( DebugModeOppII ) window.alert( "function HardwareGPpct_Change" );

	try
	{
		CalcGPCost( "cust_hardwarerevenue", "cust_hardwarecost", "cust_hardwaregp", "cust_hardwaregppct" );
		CalcCostPctOffList( "cust_hardwarelistprice", "cust_hardwarecost", "cust_hardwarecostpctofflist" ); 
		TotalRevenueCostGP();
	}
	catch( err )
	{
		if( DebugModeOppII ) window.alert( "function HardwareGPpct_Change error code " + err );
	}
	return;
}

/***************************************************************************************/
function ThirdPartyHardwareSupportGPpct_Change()
{
	if( DebugModeOppII ) window.alert( "function ThirdPartyHardwareSupportGPpct_Change" );

	try
	{
		CalcGPCost( "cust_thirdpartyhardwaresupportrevenue", "cust_thirdpartyhardwaresupportcost", "cust_thirdpartyhardwaresupportgp", "cust_thirdpartyhardwaresupportgppct" );
		CalcSupportCostPctOfList( "cust_thirdpartyhardwaresupportcost", "cust_hardwarelistprice" );
		ThirdPartyHardwareSupportGP();
		TotalRevenueCostGP();
	}
	catch( err )
	{
		if( DebugModeOppII ) window.alert( "function ThirdPartyHardwareSupportGPpct_Change error code " + err );
	}
	return;
}

/***************************************************************************************/
function SoftwareGPpct_Change()
{
	if( DebugModeOppII ) window.alert( "function SoftwareGPpct_Change" );

	try
	{
		CalcGPCost( "cust_softwarerevenue", "cust_softwarecost", "cust_softwaregp", "cust_softwaregppct" );
		CalcCostPctOffList( "cust_softwarelistprice", "cust_softwarecost", "cust_softwarecostpctofflist" ); 
		TotalRevenueCostGP();
	}
	catch( err )
	{
		if( DebugModeOppII ) window.alert( "function SoftwareGPpct_Change error code " + err );
	}
	return;
}

/***************************************************************************************/
function ThirdPartySoftwareSupportGPpct_Change()
{
	if( DebugModeOppII ) window.alert( "function ThirdPartySoftwareSupportGPpct_Change" );

	try
	{
		CalcGPCost( "cust_thirdpartysoftwaresupportrevenue", "cust_thirdpartysoftwaresupportcost", "cust_thirdpartysoftwaresupportgp", "cust_thirdpartysoftwaresupportgppct" );
		CalcSupportCostPctOfList( "cust_thirdpartysoftwaresupportcost", "cust_softwarelistprice" );
		TotalRevenueCostGP();
	}
	catch( err )
	{
		if( DebugModeOppII ) window.alert( "function ThirdPartySoftwareSupportGPpct_Change error code " + err );
	}
	return;
}

/***************************************************************************************/
function AdtechHardwareSoftwareSupport_Change()
{
	if( DebugModeOppII ) window.alert( "function AdtechHardwareSoftwareSupport_Change" );

	try
	{
		LengthOfTermAdtechHardwareSoftwareSupport_Change();
		TotalRevenueCostGP();
	}	
	catch( err )
	{
		if( DebugModeOppII ) window.alert( "function AdtechHardwareSoftwareSupport_Change error code " + err );
	}
	return;
}

/***************************************************************************************/
function LengthOfTermAdtechHardwareSoftwareSupport_Change()
{
	if( DebugModeOppII ) window.alert( "function LengthOfTermAdtechHardwareSoftwareSupport_Change" );

	try
	{
		setValueNumPair( "cust_adtechhardwaresoftwaresupport", "cust_lengthoftermadtechhardwaresoftwaresupport", "You have entered a value for Adtech Hardware / Software Support.\nYou must now enter the length of the support term in months.", false, false );	
		AdtechHardwareSoftwareSupportEarned_Update();
	}	
	catch( err )
	{
		if( DebugModeOppII ) window.alert( "function LengthOfTermAdtechHardwareSoftwareSupport_Change error code " + err );
	}
	return;
}

/***************************************************************************************/
function AdtechManagedServices_Change()
{
	if( DebugModeOppII ) window.alert( "function AdtechManagedServices_Change" );

	try
	{
		LengthOfTermAdtechManagedServices_Change();
		TotalRevenueCostGP();
	}	
	catch( err )
	{
		if( DebugModeOppII ) window.alert( "function AdtechManagedServices_Change error code " + err );
	}
	return;
}

/***************************************************************************************/
function LengthOfTermAdtechManagedServices_Change()
{
	if( DebugModeOppII ) window.alert( "function LengthOfTermAdtechManagedServices_Change" );

	try
	{
		setValueNumPair( "cust_adtechmanagedservices", "cust_lengthoftermadtechmanagedservices", "You have entered a value for Adtech Managed Services.\nYou must now enter the length of the support term in months.", false, false );	
		AdtechManagedServicesEarned_Update();
	}	
	catch( err )
	{
		if( DebugModeOppII ) window.alert( "function LengthOfTermAdtechManagedServices_Change error code " + err );
	}
	return;
}

/***************************************************************************************/
function SupportEarned_Update( sLabel1, sLabel2, sLabel3 )
{
	if( DebugModeOppII ) window.alert( "function SupportEarned_Update" );

	try
	{
		var val2 = myGetValue( sLabel2 );
		if( val2 != null && val2 != 0 )
		{
			var out3 = Xrm.Page.getAttribute( sLabel3 );
			if( out3 != null )
			{
				var val1 = myGetValue( sLabel1 );
				if( DebugModeOppII ) 
					window.alert( "function SupportEarned_Update\nval1 " + val1 + "\nval2 " + val2 );
				out3.setSubmitMode( "always" );
				out3.setValue( val1 / val2 );
			}	
		}	
	}	
	catch( err )
	{
		if( DebugModeOppII ) window.alert( "function SupportEarned_Update error code " + err );
	}
	return;
}

/***************************************************************************************/
function ThirdPartyHardwareSupportEarned_Update()
{
	if( DebugModeOppII ) window.alert( "function ThirdPartyHardwareSupportEarned_Update" );

	try
	{
		SupportEarned_Update( "cust_thirdpartyhardwaresupportrevenue", "cust_lengthoftermthirdpartyhardwaresupport", "cust_thirdpartyhardwaresupportearned" );	
	}	
	catch( err )
	{
		if( DebugModeOppII ) window.alert( "function ThirdPartyHardwareSupportEarned_Update error code " + err );
	}
	return;
}

/***************************************************************************************/
function ThirdPartyHardwareSupportEarnedGP_Change()
{
	if( DebugModeOppII ) window.alert( "function ThirdPartyHardwareSupportEarnedGP_Change" );

	try
	{
		SupportEarned_Update( "cust_thirdpartyhardwaresupportgp", "cust_lengthoftermthirdpartyhardwaresupport", "cust_thirdpartyhardwaresupportearnedgp" );	
	}	
	catch( err )
	{
		if( DebugModeOppII ) window.alert( "function ThirdPartyHardwareSupportEarnedGP_Change error code " + err );
	}
	return;
}

/***************************************************************************************/
function ThirdPartyHardwareSupportEarnedGPpct_Change()
{
	if( DebugModeOppII ) window.alert( "function ThirdPartyHardwareSupportEarnedGPpct_Change" );

	try
	{
		SupportEarned_Update( "cust_thirdpartyhardwaresupportgppct", "cust_lengthoftermthirdpartyhardwaresupport", "cust_thirdpartyhardwaresupportearnedgppct" );	
	}	
	catch( err )
	{
		if( DebugModeOppII ) window.alert( "function ThirdPartyHardwareSupportEarnedGPpct_Change error code " + err );
	}
	return;
}

/***************************************************************************************/
function ThirdPartySoftwareSupportEarned_Update()
{
	if( DebugModeOppII ) window.alert( "function ThirdPartySoftwareSupportEarned_Update" );

	try
	{
		SupportEarned_Update( "cust_thirdpartysoftwaresupportrevenue", "cust_lengthoftermthirdpartysoftwaresupport", "cust_thirdpartysoftwaresupportearned" );	
	}	
	catch( err )
	{
		if( DebugModeOppII ) window.alert( "function ThirdPartySoftwareSupportEarned_Update error code " + err );
	}
	return;
}

/***************************************************************************************/
function ThirdPartySoftwareSupportEarnedGP_Update()
{
	if( DebugModeOppII ) window.alert( "function ThirdPartySoftwareSupportEarnedGP_Update" );

	try
	{
		SupportEarned_Update( "cust_thirdpartysoftwaresupportgp", "cust_lengthoftermthirdpartysoftwaresupport", "cust_thirdpartysoftwaresupportearnedgp" );	
	}	
	catch( err )
	{
		if( DebugModeOppII ) window.alert( "function ThirdPartySoftwareSupportEarnedGP_Update error code " + err );
	}
	return;
}

/***************************************************************************************/
function ThirdPartySoftwareSupportEarnedGPpct_Update()
{
	if( DebugModeOppII ) window.alert( "function ThirdPartySoftwareSupportEarnedGPpct_Update" );

	try
	{
		SupportEarned_Update( "cust_thirdpartysoftwaresupportgppct", "cust_lengthoftermthirdpartysoftwaresupport", "cust_thirdpartysoftwaresupportearnedgppct" );	
	}	
	catch( err )
	{
		if( DebugModeOppII ) window.alert( "function ThirdPartySoftwareSupportEarnedGPpct_Update error code " + err );
	}
	return;
}

/***************************************************************************************/
function SupportEarnedPctZeroCost_Update( sLabel1, sLabel2 )
{
	if( DebugModeOppII ) window.alert( "function SupportEarnedZeroCost_Update" );

	try
	{
		var out2 = Xrm.Page.getAttribute( sLabel2 );
		if( out2 != null )
		{
			var val1 = myGetValue( sLabel1 );
			if( DebugModeOppII ) 
				window.alert( "function SupportEarnedZeroCost_Update\nval1 " + val1 );
			out2.setSubmitMode( "always" );
			
			if( val1 != null )
			{	
				if( val1 != 0 )
					out2.setValue( 100.0 );
				else	
					out2.setValue( 0.0 );
			}		
		}	
	}	
	catch( err )
	{
		if( DebugModeOppII ) window.alert( "function SupportEarnedZeroCost_Update error code " + err );
	}
	return;
}

/***************************************************************************************
    same as AdtechHardwareSoftwareSupportEarnedGP_Update()
*/
function AdtechHardwareSoftwareSupportEarned_Update()
{
	if( DebugModeOppII ) window.alert( "function AdtechHardwareSoftwareSupportEarned_Update" );

	try
	{
		SupportEarned_Update( "cust_adtechhardwaresoftwaresupport", "cust_lengthoftermadtechhardwaresoftwaresupport", "cust_adtechhardwaresoftwaresupportearned" );	
	}	
	catch( err )
	{
		if( DebugModeOppII ) window.alert( "function AdtechHardwareSoftwareSupportEarned_Update error code " + err );
	}
	return;
}

/***************************************************************************************
    same as AdtechHardwareSoftwareSupportEarned_Update()
*/
function AdtechHardwareSoftwareSupportEarnedGP_Update()
{
	if( DebugModeOppII ) window.alert( "function AdtechHardwareSoftwareSupportEarnedGP_Update" );

	try
	{
		SupportEarned_Update( "cust_adtechhardwaresoftwaresupport", "cust_lengthoftermadtechhardwaresoftwaresupport", "cust_adtechhardwaresoftwaresupportearnedgp" );	
	}	
	catch( err )
	{
		if( DebugModeOppII ) window.alert( "function AdtechHardwareSoftwareSupportEarnedGP_Update error code " + err );
	}
	return;
}

/***************************************************************************************/
function AdtechHardwareSoftwareSupportEarnedGPpct_Update()
{
	if( DebugModeOppII ) window.alert( "function AdtechHardwareSoftwareSupportEarnedGPpct_Update" );

	try
	{
		SupportEarnedPctZeroCost_Update( "cust_adtechhardwaresoftwaresupport", "cust_adtechhardwaresoftwaresupportearnedgppct" );	
	}	
	catch( err )
	{
		if( DebugModeOppII ) window.alert( "function AdtechHardwareSoftwareSupportEarnedGPpct_Update error code " + err );
	}
	return;
}

/***************************************************************************************
    function AdtechManagedServicesEarned_Update()
	same as AdtechManagedServicesEarnedGP_Update()
*/
function AdtechManagedServicesEarned_Update()
{
	if( DebugModeOppII ) window.alert( "function AdtechManagedServicesEarned_Update" );

	try
	{
		SupportEarned_Update( "cust_adtechmanagedservices", "cust_lengthoftermadtechmanagedservices", "cust_adtechmanagedservicesearned" );	
	}	
	catch( err )
	{
		if( DebugModeOppII ) window.alert( "function AdtechManagedServicesEarned_Update error code " + err );
	}
	return;
}

/***************************************************************************************
    function AdtechManagedServicesEarnedGP_Update()
	same as AdtechManagedServicesEarned_Update()
*/
function AdtechManagedServicesEarnedGP_Update()
{
	if( DebugModeOppII ) window.alert( "function AdtechManagedServicesEarnedGP_Update" );

	try
	{
		SupportEarned_Update( "cust_adtechmanagedservices", "cust_lengthoftermadtechmanagedservices", "cust_adtechmanagedservicesearnedgp" );	
	}	
	catch( err )
	{
		if( DebugModeOppII ) window.alert( "function AdtechManagedServicesEarnedGP_Update error code " + err );
	}
	return;
}

/***************************************************************************************/
function AdtechManagedServicesEarnedGPpct_Update()
{
	if( DebugModeOppII ) window.alert( "function AdtechManagedServicesEarnedGPpct_Update" );

	try
	{
		SupportEarnedPctZeroCost_Update( "cust_adtechmanagedservices", "cust_adtechmanagedservicesearnedgppct" );	
	}	
	catch( err )
	{
		if( DebugModeOppII ) window.alert( "function AdtechManagedServicesEarnedGPpct_Update error code " + err );
	}
	return;
}

/***************************************************************************************/
function TotalRevenueEarned_Update()
{
	if( DebugModeOppII ) window.alert( "function TotalRevenueEarned_Update" );

	try
	{
		var val1 = myGetValue( "cust_totalrevenue" );
		var val2 = myGetValue( "cust_thirdpartyhardwaresupportrevenue" );
		var val3 = myGetValue( "cust_thirdpartysoftwaresupportrevenue" );
		var val4 = myGetValue( "cust_adtechhardwaresoftwaresupport" );
		var val5 = myGetValue( "cust_adtechmanagedservices" );
		var val6 = myGetValue( "cust_thirdpartyhardwaresupportearned" );
		var val7 = myGetValue( "cust_thirdpartysoftwaresupportearned" );
		var val8 = myGetValue( "cust_adtechhardwaresoftwaresupportearned" );
		var val9 = myGetValue( "cust_adtechmanagedservicesearned" );
		
		var out1 = Xrm.Page.getAttribute( "cust_totalrevenueearned" );
		if( DebugModeOppII ) window.alert( "function TotalRevenueEarned_Update\nval1 " + val1 + "\nval2 " + val2 + "\nval3 " + val3 + "\nval4 " + val4 + "\nval5 " + val5 + "\nval6 " + val6 + "\nval7 " + val7 + "\nval8 " + val8 + "\nval9 " + val9 );

		if( out1 != null )
		{
			out1.setSubmitMode( "always" );
			out1.setValue( val1 - val2 - val3 - val4 - val5 + val6 + val7 + val8 + val9 );
		}	
	}	
	catch( err )
	{
		if( DebugModeOppII ) window.alert( "function TotalRevenueEarned_Update error code " + err );
	}
	return;
}

/***************************************************************************************/
function TotalRevenueEarnedGP_Update()
{
	if( DebugModeOppII ) window.alert( "function TotalRevenueEarnedGP_Update" );

	try
	{
		var val1 = myGetValue( "cust_totalgp" );
		var val2 = myGetValue( "cust_thirdpartyhardwaresupportgp" );
		var val3 = myGetValue( "cust_thirdpartysoftwaresupportgp" );
		var val4 = myGetValue( "cust_adtechhardwaresoftwaresupport" );
		var val5 = myGetValue( "cust_adtechmanagedservices" );
		var val6 = myGetValue( "cust_thirdpartyhardwaresupportearnedgp" );
		var val7 = myGetValue( "cust_thirdpartysoftwaresupportearnedgp" );
		var val8 = myGetValue( "cust_adtechhardwaresoftwaresupportearned" );
		var val9 = myGetValue( "cust_adtechmanagedservicesearned" );
		
		var out1 = Xrm.Page.getAttribute( "cust_totalrevenueearnedgp" );
		if( DebugModeOppII ) window.alert( "function TotalRevenueEarnedGP_Update\nval1 " + val1 + "\nval2 " + val2 + "\nval3 " + val3 + "\nval4 " + val4 + "\nval5 " + val5 + "\nval6 " + val6 + "\nval7 " + val7 + "\nval8 " + val8 + "\nval9 " + val9 );

		if( out1 != null )
		{
			out1.setSubmitMode( "always" );
			out1.setValue( val1 - val2 - val3  - val4 - val5 + val6 + val7 + val8 + val9 );
		}	
	}	
	catch( err )
	{
		if( DebugModeOppII ) window.alert( "function TotalRevenueEarnedGP_Update error code " + err );
	}
	return;
}

/***************************************************************************************/
function TotalRevenueEarnedGPpct_Update()
{
	try
	{
		var val1 = myGetValue( "cust_totalrevenueearnedgp" );
		var val2 = myGetValue( "cust_totalrevenueearned" );
		var out3 = Xrm.Page.getAttribute( "cust_totalrevenueearnedgppct" );
		if( DebugModeOppII ) window.alert( "function TotalRevenueEarnedGPpct_Update\nval1 " + val1 + "\nval2 " + val2 );

		if( out3 != null && val2 != null  && val2 != 0.0 )
		{
			out3.setSubmitMode( "always" );
			out3.setValue( val1 * 100.0 / val2 );
		}	
	}
	catch( err )
	{
		if( DebugModeOppII ) window.alert( "function TotalRevenueEarnedGPpct_Update error code " + err );
	}
	return;
}

/* End Of Lines ************************************************************************/
