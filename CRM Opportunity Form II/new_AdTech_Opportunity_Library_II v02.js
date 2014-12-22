/*
	Adam Ip																	2012-02-29
	Text boxes propagate value from one text box to another, through some simple
	arithematic calculation.  Propagation might be in chain, hard-coded though.
	Initially used in Opportunities Form
	
	Adam Ip																	2012-03-06
	function LengthOfTermMonthsHardwareSupport_Change()
	function LengthOfTermMonthsSoftwareSupport_Change()

	Adam Ip																	2012-03-07
	function CustomerID_Change()
	function CalcGPCost()
	function CalcCostOffList()
	function CalcSupportCostOfList()
	function HardwareGPpct_Change()
	function HardwareSupportGPpct_Change()
	function SoftwareGPpct_Change()
	function SoftwareSupportGPpct_Change()

*/
var DebugModeOppII = false;   
   
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
		var val2 = myGetValue( "cust_hardwarerevofflist" );
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
		var val2 = myGetValue( "cust_hardwarecostofflist" );
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
function HardwareSupportRevenue_List()
{
	if( DebugModeOppII ) window.alert( "function HardwareSupportRevenue_List" );

	try
	{
		var val1 = myGetValue( "cust_hardwarelistprice" );
		var val2 = myGetValue( "cust_hardwaresupportoflist" );
		var out1 = Xrm.Page.getAttribute( "cust_hardwaresupportrevenue" );
		if( DebugModeOppII ) window.alert( "function HardwareSupportRevenue_List\nval1 " + val1 + "\nval2 " + val2 );
		
		PercentageOf( "Hardware Support Revenue", val1, val2, out1 );
		HardwareSupportGP();
	}
	catch( err )
	{
		if( DebugModeOppII ) window.alert( "function HardwareSupportRevenue_List error code " + err );
	}
}

/***************************************************************************************/
function HardwareSupportRevenue_Revenue()
{
	if( DebugModeOppII ) window.alert( "function HardwareSupportRevenue_Revenue" );

	try
	{
		var val1 = myGetValue( "cust_hardwarerevenue" );
		var val2 = myGetValue( "cust_hardwaresupportofrev" );
		var out1 = Xrm.Page.getAttribute( "cust_hardwaresupportrevenue" );
		if( DebugModeOppII ) window.alert( "function HardwareSupportRevenue_Revenue\nval1 " + val1 + "\nval2 " + val2 );
		
		PercentageOf( "Hardware Support Revenue", val1, val2, out1 );
		HardwareSupportGP();
	}
	catch( err )
	{
		if( DebugModeOppII ) window.alert( "function HardwareSupportRevenue_Revenue error code " + err );
	}
}

/***************************************************************************************/
function HardwareSupportCost_List()
{
	if( DebugModeOppII ) window.alert( "function HardwareSupportCost_List" );

	try
	{
		var val1 = myGetValue( "cust_hardwarelistprice" );
		var val2 = myGetValue( "cust_hardwaresupportcostoflist" );
		var out1 = Xrm.Page.getAttribute( "cust_hardwaresupportcost" );
		if( DebugModeOppII ) window.alert( "function HardwareSupportCost_List\nval1 " + val1 + "\nval2 " + val2 );
		
		PercentageOf( "Hardware Support Cost", val1, val2, out1 );
		HardwareSupportGP();
	}
	catch( err )
	{
		if( DebugModeOppII ) window.alert( "function HardwareSupportCost_List error code " + err );
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
		TotalRevenue();
		TotalCost();
	}
	catch( err )
	{
		if( DebugModeOppII ) window.alert( "function HardwareGP error code " + err );
	}
}

/***************************************************************************************/
function HardwareSupportGP()
{
	if( DebugModeOppII ) window.alert( "function HardwareSupportGP" );

	try
	{
		var val1 = myGetValue( "cust_hardwaresupportrevenue" );
		var val2 = myGetValue( "cust_hardwaresupportcost" );
		var out1 = Xrm.Page.getAttribute( "cust_hardwaresupportgp" );
		var out2 = Xrm.Page.getAttribute( "cust_hardwaresupportgppct" );
		if( DebugModeOppII ) window.alert( "function HardwareSupportGP\nval1 " + val1 + "\nval2 " + val2 );
		
		GP( "Hardware Support GP", val1, val2, out1, out2 );
		TotalRevenue();
		TotalCost();
	}
	catch( err )
	{
		if( DebugModeOppII ) window.alert( "function HardwareSupportGP error code " + err );
	}
}

/***************************************************************************************/
function SoftwareRevenue()
{
	if( DebugModeOppII ) window.alert( "function SoftwareRevenue" );

	try
	{
		var val1 = myGetValue( "cust_softwarelistprice" );
		var val2 = myGetValue( "cust_softwarerevofflist" );
		var out1 = Xrm.Page.getAttribute( "cust_softwarerevenue" );
		if( DebugModeOppII ) window.alert( "function SoftwareRevenue\nval1 " + val1 + "\nval2 " + val2 );
		
		PercentageOf( "Software Revenue", val1, val2, out1 );
		TotalRevenue();
		TotalCost();
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
		var val2 = myGetValue( "cust_softwarecostofflist" );
		var out1 = Xrm.Page.getAttribute( "cust_softwarecost" );
		if( DebugModeOppII ) window.alert( "function SoftwareCost\nval1 " + val1 + "\nval2 " + val2 );
		
		PercentageOff( "Software Cost", val1, val2, out1 );
		TotalCost();
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
		TotalRevenue();
    	TotalCost();
	}
	catch( err )
	{
		if( DebugModeOppII ) window.alert( "function SoftwareGP error code " + err );
	}
}

/***************************************************************************************/
function SoftwareSupportRevenue_List()
{
	if( DebugModeOppII ) window.alert( "function SoftwareSupportRevenue_List" );

	try
	{
		var val1 = myGetValue( "cust_softwarelistprice" );
		var val2 = myGetValue( "cust_softwaresupportoflist" );
		var out1 = Xrm.Page.getAttribute( "cust_softwaresupportrevenue" );
		if( DebugModeOppII ) window.alert( "function SoftwareSupportRevenue_List\nval1 " + val1 + "\nval2 " + val2 );
		
		PercentageOf( "Software Support Revenue", val1, val2, out1 );
		SoftwareSupportGP();
	}
	catch( err )
	{
		if( DebugModeOppII ) window.alert( "function SoftwareSupportRevenue_List error code " + err );
	}
}

/***************************************************************************************/
function SoftwareSupportRevenue_Revenue()
{
	if( DebugModeOppII ) window.alert( "function SoftwareSupportRevenue_Revenue" );

	try
	{
		var val1 = myGetValue( "cust_softwarerevenue" );
		var val2 = myGetValue( "cust_softwaresupportofrev" );
		var out1 = Xrm.Page.getAttribute( "cust_softwaresupportrevenue" );
		if( DebugModeOppII ) window.alert( "function SoftwareSupportRevenue_Revenue\nval1 " + val1 + "\nval2 " + val2 );
		
		PercentageOf( "Software Support Revenue", val1, val2, out1 );
		SoftwareSupportGP();
	}
	catch( err )
	{
		if( DebugModeOppII ) window.alert( "function SoftwareSupportRevenue_Revenue error code " + err );
	}
}

/***************************************************************************************/
function SoftwareSupportCost_List()
{
	if( DebugModeOppII ) window.alert( "function SoftwareSupportCost_List" );

	try
	{
		var val1 = myGetValue( "cust_softwarelistprice" );
		var val2 = myGetValue( "cust_softwaresupportcostoflist" );
		var out1 = Xrm.Page.getAttribute( "cust_softwaresupportcost" );
		if( DebugModeOppII ) window.alert( "function SoftwareSupportCost_List\nval1 " + val1 + "\nval2 " + val2 );
		
		PercentageOf( "Software Support Cost", val1, val2, out1 );
		SoftwareSupportGP();
	}
	catch( err )
	{
		if( DebugModeOppII ) window.alert( "function SoftwareSupportCost_List error code " + err );
	}
}

/***************************************************************************************/
function SoftwareSupportGP()
{
	if( DebugModeOppII ) window.alert( "function SoftwareSupportGP" );

	try
	{
		var val1 = myGetValue( "cust_softwaresupportrevenue" );
		var val2 = myGetValue( "cust_softwaresupportcost" );
		var out1 = Xrm.Page.getAttribute( "cust_softwaresupportgp" );
		var out2 = Xrm.Page.getAttribute( "cust_softwaresupportgppct" );
		if( DebugModeOppII ) window.alert( "function SoftwareSupportGP\nval1 " + val1 + "\nval2 " + val2 );
		
		GP( "Software Support GP", val1, val2, out1, out2 );
		TotalRevenue();
    	TotalCost();
	}
	catch( err )
	{
		if( DebugModeOppII ) window.alert( "function SoftwareSupportGP error code " + err );
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
		TotalRevenue();
    	TotalCost();
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
		var out1 = Xrm.Page.getAttribute( "cust_servicesrevenue" );
		if( DebugModeOppII ) window.alert( "function ServicesRevenue\nval1 " + val1 + "\nval2 " + val2 + "\nval3 " + val3 + "\nval4 " + val4 + "\nval5 " + val5 + "\nval6 " + val6 );
		
		Sum6( "service Revenue", val1, val2, val3, val4, val5, val6, out1 );
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
		var out1 = Xrm.Page.getAttribute( "cust_servicescost" );
		if( DebugModeOppII ) window.alert( "function ServicesCost\nval1 " + val1 + "\nval2 " + val2 + "\nval3 " + val3 + "\nval4 " + val4 + "\nval5 " + val5 + "\nval6 " + val6 );
		
		Sum6( "service Cost", val1, val2, val3, val4, val5, val6, out1 );
		ServicesGP();
	}
	catch( err )
	{
		if( DebugModeOppII ) window.alert( "function ServicesCost error code " + err );
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
		var val2 = myGetValue( "cust_hardwaresupportrevenue" );
		var val3 = myGetValue( "cust_softwarerevenue" );
		var val4 = myGetValue( "cust_softwaresupportrevenue" );
		var val5 = myGetValue( "cust_servicesrevenue" );
		var val6 = myGetValue( "cust_globalmonitor" );
		var out1 = Xrm.Page.getAttribute( "cust_totalrevenue" );
		if( DebugModeOppII ) window.alert( "function TotalRevenue\nval1 " + val1 + "\nval2 " + val2 + "\nval3 " + val3 + "\nval4 " + val4 + "\nval5 " + val5 + "\nval6 " + val6 );
		
		Sum6( "Total Revenue", val1, val2, val3, val4, val5, val6, out1 );
		TotalGP(); 
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
		var val2 = myGetValue( "cust_hardwaresupportcost" );
		var val3 = myGetValue( "cust_softwarecost" );
		var val4 = myGetValue( "cust_softwaresupportcost" );
		var val5 = myGetValue( "cust_servicescost" );
		var out1 = Xrm.Page.getAttribute( "cust_totalcost" );
		if( DebugModeOppII ) window.alert( "function TotalCost\nval1 " + val1 + "\nval2 " + val2 + "\nval3 " + val3 + "\nval4 " + val4 + "\nval5 " + val5 );
		
		Sum5( "Total Cost", val1, val2, val3, val4, val5, out1 );
		TotalGP(); 
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
		HardwareRevenueUpdate();
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

/***************************************************************************************/
function HardwareSupportCostUpdate()
{
	if( DebugModeOppII ) window.alert( "function HardwareSupportCostUpdate" );

	try
	{
		var val1 = myGetValue( "cust_hardwarelistprice" );
		var val2 = myGetValue( "cust_hardwaresupportcost" );
		var out1 = Xrm.Page.getAttribute( "cust_hardwaresupportoflist" );
		if( DebugModeOppII ) window.alert( "function HardwareSupportCostUpdate\nval1 " + val1 + "\nval2 " + val2 );
				
		CalcPercentageOf( "HardwareSupportCostUpdate", val1, val2, out1 );
		
		HardwareSupportGP();
		TotalCost();
	}
	catch( err )
	{
		if( DebugModeOppII ) window.alert( "function HardwareSupportCostUpdate error code " + err );
	}
}

/***************************************************************************************/
function SoftwareRevenue_Change()
{
	if( DebugModeOppII ) window.alert( "function SoftwareRevenue_Change" );

	try
	{
		SoftwareRevenueUpdate();
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
function SoftwareSupportRevenueUpdate()
{
	if( DebugModeOppII ) window.alert( "function SoftwareSupportRevenueUpdate" );

	try
	{
		var val1 = myGetValue( "cust_softwarelistprice" );
		var val2 = myGetValue( "cust_softwaresupportrevenue" );
		var out1 = Xrm.Page.getAttribute( "cust_softwaresupportoflist" );
		var val3 = myGetValue( "cust_softwarerevenue" );
		var val4 = myGetValue( "cust_softwaresupportrevenue" );
		var out2 = Xrm.Page.getAttribute( "cust_softwaresupportofrev" );
		if( DebugModeOppII ) window.alert( "function SoftwareSupportRevenueUpdate\nval1 " + val1 + "\nval2 " + val2 + "\nval3 " + val3 + "\nval4 " + val4 );

		CalcPercentageOf( "SoftwareSupportRevenueUpdate #1", val1, val2, out1 );
		CalcPercentageOf( "SoftwareSupportRevenueUpdate #2", val3, val4, out2 );

		SoftwareSupportGP();	
	}
	catch( err )
	{
		if( DebugModeOppII ) window.alert( "function SoftwareSupportRevenueUpdate error code " + err );
	}
}

/***************************************************************************************/
function SoftwareSupportCostUpdate()
{
	if( DebugModeOppII ) window.alert( "function SoftwareSupportCostUpdate" );

	try
	{
		var val1 = myGetValue( "cust_softwarelistprice" );
		var val2 = myGetValue( "cust_softwaresupportcost" );
		var out1 = Xrm.Page.getAttribute( "cust_softwaresupportcostoflist" );
		if( DebugModeOppII ) window.alert( "function SoftwareSupportCostUpdate\nval1 " + val1 + "\nval2 " + val2 );

		CalcPercentageOf( "SoftwareSupportCostUpdate", val1, val2, out1 );

		SoftwareSupportGP();
	}
	catch( err )
	{
		if( DebugModeOppII ) window.alert( "function SoftwareSupportCostUpdate error code " + err );
	}
}

/***************************************************************************************/
/* Manually input ServicesRevenue													   */
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
	
		ServicesGP();
	}
	catch( err )
	{
		if( DebugModeOppII ) window.alert( "function ServicesRevenueUpdate error code " + err );
	}
}

/***************************************************************************************/
function ServicesRevenueUpdate2()
{
	if( DebugModeOppII ) window.alert( "function ServicesRevenueUpdate2" );

	try
	{
		ServicesRevenue();
	}
	catch( err )
	{
		if( DebugModeOppII ) window.alert( "function ServicesRevenueUpdate2 error code " + err );
	}
}

/***************************************************************************************/
/* Manually input ServicesCost														   */
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

		ServicesGP();
	}
	catch( err )
	{
		if( DebugModeOppII ) window.alert( "function ServicesCostUpdate error code " + err );
	}
}

/***************************************************************************************/
function ServicesCostUpdate2()
{
	if( DebugModeOppII ) window.alert( "function ServicesCostUpdate2" );

	try
	{
		ServicesCost();
		ServicesGP();

	}
	catch( err )
	{
		if( DebugModeOppII ) window.alert( "function ServicesCostUpdate2 error code " + err );
	}
}

/***************************************************************************************/
function GlobalMonitorUpdate()
{
	if( DebugModeOppII ) window.alert( "function GlobalMonitorUpdate" );

	try
	{
		TotalRevenue();
	}
	catch( err )
	{
		if( DebugModeOppII ) window.alert( "function GlobalMonitorUpdate error code " + err );
	}
}

/***************************************************************************************/
function HardwareRevenueUpdate()
{
	if( DebugModeOppII ) window.alert( "function HardwareRevenueUpdate" );

	try
	{
		var val1 = myGetValue( "cust_hardwarelistprice" );
		var val2 = myGetValue( "cust_hardwarerevenue" );
		var out1 = Xrm.Page.getAttribute( "cust_hardwarerevofflist" );
		if( DebugModeOppII ) window.alert( "function HardwareRevenueUpdate\nval1 " + val1 + "\nval2 " + val2 );

		CalcPercentageOf( "HardwareRevenueUpdate", val1, val2, out1 );
		HardwareGP();		
	}
	catch( err )
	{
		if( DebugModeOppII ) window.alert( "function HardwareRevenueUpdate error code " + err );
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
		var out1 = Xrm.Page.getAttribute( "cust_hardwarecostofflist" );
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
function HardwareSupportRevenueUpdate()
{
	if( DebugModeOppII ) window.alert( "function HardwareSupportRevenueUpdate" );

	try
	{
		var val1 = myGetValue( "cust_hardwarelistprice" );
		var val2 = myGetValue( "cust_hardwaresupportrevenue" );
		var out1 = Xrm.Page.getAttribute( "cust_hardwaresupportoflist" );
		var val3 = myGetValue( "cust_hardwarerevenue" );
		var val4 = myGetValue( "cust_hardwaresupportrevenue" );
		var out2 = Xrm.Page.getAttribute( "cust_hardwaresupportofrev" );
		if( DebugModeOppII ) window.alert( "function HardwareSupportRevenueUpdate\nval1 " + val1 + "\nval2 " + val2 + "\nval3 " + val3 + "\nval4 " + val4 );

		CalcPercentageOf( "HardwareSupportRevenueUpdate #1", val1, val2, out1 );
		CalcPercentageOf( "HardwareSupportRevenueUpdate #2", val3, val4, out2 );

		HardwareSupportGP();
	}
	catch( err )
	{
		if( DebugModeOppII ) window.alert( "function HardwareSupportRevenueUpdate error code " + err );
	}
}

/***************************************************************************************/
function HardwareListPrice_Change()
{
	if( DebugModeOppII ) window.alert( "function HardwareListPrice_Change" );

	try
	{
		HardwareRevenue();
		HardwareCost();
		HardwareSupportRevenue_List();
		HardwareSupportRevenue_Revenue();
		HardwareSupportCost_List();
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
		HardwareGP();
		HardwareSupportRevenue_List();
		HardwareSupportRevenue_Revenue();
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
		SoftwareSupportRevenue_List();
		SoftwareSupportRevenue_Revenue();
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
		HardwareSupportCost_List();
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
function HardwareSupportRevenue_Change()
{
	if( DebugModeOppII ) window.alert( "function HardwareSupportRevenue_Change" );

	try
	{
		HardwareSupportRevenueUpdate();
		LengthOfTermMonthsHardwareSupport_Change();
	}
	catch( err )
	{
		if( DebugModeOppII ) window.alert( "function HardwareSupportRevenue_Change error code " + err );
	}
}

/***************************************************************************************/
function HardwareSupportCost_Change()
{
	if( DebugModeOppII ) window.alert( "function HardwareSupportCost_Change" );

	try
	{
		HardwareSupportCostUpdate();
	}
	catch( err )
	{
		if( DebugModeOppII ) window.alert( "function HardwareSupportCost_Change error code " + err );
	}
}

/***************************************************************************************/
function HardwareSupportPctOfList_Change()
{
	if( DebugModeOppII ) window.alert( "function HardwareSupportPctOfList_Change" );

	try
	{
		HardwareSupportRevenue_List();
	}
	catch( err )
	{
		if( DebugModeOppII ) window.alert( "function HardwareSupportPctOfList_Change error code " + err );
	}
}

/***************************************************************************************/
function HardwareSupportPctOfRev_Change()
{
	if( DebugModeOppII ) window.alert( "function HardwareSupportPctOfRev_Change" );

	try
	{
		HardwareSupportRevenue_Revenue();	
	}
	catch( err )
	{
		if( DebugModeOppII ) window.alert( "function HardwareSupportPctOfRev_Change error code " + err );
	}
}

/***************************************************************************************/
function HardwareSupportCostPctOfList_Change()
{
	if( DebugModeOppII ) window.alert( "function HardwareSupportCostPctOfList_Change" );

	try
	{
		HardwareSupportCost_List();
	}
	catch( err )
	{
		if( DebugModeOppII ) window.alert( "function HardwareSupportCostPctOfList_Change error code " + err );
	}
}

/***************************************************************************************/
function SoftwareRevenueUpdate()
{
	if( DebugModeOppII ) window.alert( "function SoftwareRevenueUpdate" );

	try
	{
		var val1 = myGetValue( "cust_softwarelistprice" );
		var val2 = myGetValue( "cust_softwarerevenue" );
		var out1 = Xrm.Page.getAttribute( "cust_softwarerevofflist" );
		if( DebugModeOppII ) window.alert( "function SoftwareRevenueUpdate\nval1 " + val1 + "\nval2 " + val2 );

		CalcPercentageOf( "SoftwareRevenueUpdate", val1, val2, out1 );
		SoftwareGP();		
	}
	catch( err )
	{
		if( DebugModeOppII ) window.alert( "function SoftwareRevenueUpdate error code " + err );
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
		var out1 = Xrm.Page.getAttribute( "cust_softwarecostofflist" );
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
		SoftwareCost();
		SoftwareSupportRevenue_List();
		SoftwareSupportRevenue_Revenue();
		SoftwareSupportCost_List();
	}
	catch( err )
	{
		if( DebugModeOppII ) window.alert( "function SoftwareListPrice_Change error code " + err );
	}
}

/***************************************************************************************/
function SoftwareSupportRevenue_Change()
{
	if( DebugModeOppII ) window.alert( "function SoftwareSupportRevenue_Change" );

	try
	{
		SoftwareSupportRevenueUpdate();
		LengthOfTermMonthsSoftwareSupport_Change();
	}
	catch( err )
	{
		if( DebugModeOppII ) window.alert( "function SoftwareSupportRevenue_Change error code " + err );
	}
}

/***************************************************************************************/
function SoftwareSupportCost_Change()
{
	if( DebugModeOppII ) window.alert( "function SoftwareSupportCost_Change" );

	try
	{
		SoftwareSupportCostUpdate();
	}
	catch( err )
	{
		if( DebugModeOppII ) window.alert( "function SoftwareSupportCost_Change error code " + err );
	}
}

/***************************************************************************************/
function SoftwareSupportPctOfList_Change()
{
	if( DebugModeOppII ) window.alert( "function SoftwareSupportPctOfList_Change" );

	try
	{
		SoftwareSupportRevenue_List();
	}
	catch( err )
	{
		if( DebugModeOppII ) window.alert( "function SoftwareSupportPctOfList_Change error code " + err );
	}
}

/***************************************************************************************/
function SoftwareSupportPctOfRev_Change()
{
	if( DebugModeOppII ) window.alert( "function SoftwareSupportPctOfRev_Change" );

	try
	{
		SoftwareSupportRevenue_Revenue();	
	}
	catch( err )
	{
		if( DebugModeOppII ) window.alert( "function SoftwareSupportPctOfRev_Change error code " + err );
	}
}

/***************************************************************************************/
function SoftwareSupportCostPctOfList_Change()
{
	if( DebugModeOppII ) window.alert( "function SoftwareSupportCostPctOfList_Change" );

	try
	{
		SoftwareSupportCost_List();
	}
	catch( err )
	{
		if( DebugModeOppII ) window.alert( "function SoftwareSupportCostPctOfList_Change error code " + err );
	}
}

/***************************************************************************************/
function LengthOfTermMonthsHardwareSupport_Change()
{
	if( DebugModeOppII ) window.alert( "function LengthOfTermMonthsHardwareSupport_Change" );

	try
	{
		setValueNumPair( "cust_hardwaresupportrevenue", "cust_lengthoftermmonthshardwaresupport", "You have entered a value for Support Revenue.\nYou must now enter the length of the support term in months.", false, false );
	}
	catch( err )
	{
		if( DebugModeOppII ) window.alert( "function LengthOfTermMonthsHardwareSupport_Change error code " + err );
	}
	return;
}

/***************************************************************************************/
function LengthOfTermMonthsSoftwareSupport_Change()
{
	if( DebugModeOppII ) window.alert( "function LengthOfTermMonthsSoftwareSupport_Change" );

	try
	{
		setValueNumPair( "cust_softwaresupportrevenue", "cust_lengthoftermmonthssoftwaresupport", "You have entered a value for Support Revenue.\nYou must now enter the length of the support term in months.", false, false );
	}
	catch( err )
	{
		if( DebugModeOppII ) window.alert( "function LengthOfTermMonthsSoftwareSupport_Change error code " + err );
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
function CalcCostOffList( sLabel1, sLabel2, sLabel3 )
{
	if( DebugModeOppII ) window.alert( "function CalcCostOffList\nsLabel 1 " + sLabel1 + "\nsLabel 2 " + sLabel2 + "\nsLabel 3 " + sLabel3 );

	try
	{
		var val1 = myGetValue( sLabel1 );
		var val2 = myGetValue( sLabel2 );
		var out3 = Xrm.Page.getAttribute( sLabel3 );
		if( DebugModeOppII ) window.alert( "function CalcCostOffList\nval1 " + val1 + "\nval2 " + val2 );

		if( out3 != null && val1 != null  && val1 != 0.0 )
		{
			out3.setSubmitMode( "always" );
			out3.setValue(( 1.0 - val2 / val1 ) * 100.0 );
		}	
	}
	catch( err )
	{
		if( DebugModeOppII ) window.alert( "function CalcCostOffList error code " + err );
	}
	return;
}

/***************************************************************************************/
function CalcSupportCostOfList( sLabel1, sLabel2, sLabel3 )
{
	if( DebugModeOppII ) window.alert( "function CalcSupportCostOfList\nsLabel 1 " + sLabel1 + "\nsLabel 2 " + sLabel2 + "\nsLabel 3 " + sLabel3 );

	try
	{
		var val1 = myGetValue( sLabel1 );
		var val2 = myGetValue( sLabel2 );
		var out3 = Xrm.Page.getAttribute( sLabel3 );
		if( DebugModeOppII ) window.alert( "function CalcSupportCostOfList\nval1 " + val1 + "\nval2 " + val2 );
		
		if( out3 != null )
		{
			out3.setSubmitMode( "always" );
			out3.setValue( val1 * val2 / 100.0 );
		}	
	}
	catch( err )
	{
		if( DebugModeOppII ) window.alert( "function CalcSupportCostOfList error code " + err );
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
		CalcCostOffList( "cust_hardwarelistprice", "cust_hardwarecost", "cust_hardwarecostofflist" ); 
		TotalCost();
	}
	catch( err )
	{
		if( DebugModeOppII ) window.alert( "function HardwareGPpct_Change error code " + err );
	}
	return;
}

/***************************************************************************************/
function HardwareSupportGPpct_Change()
{
	if( DebugModeOppII ) window.alert( "function HardwareSupportGPpct_Change" );

	try
	{
		CalcGPCost( "cust_hardwaresupportrevenue", "cust_hardwaresupportcost", "cust_hardwaresupportgp", "cust_hardwaresupportgppct" );
		CalcSupportCostOfList( "cust_hardwaresupportcost", "cust_hardwarelistprice" );
		TotalCost();
	}
	catch( err )
	{
		if( DebugModeOppII ) window.alert( "function HardwareSupportGPpct_Change error code " + err );
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
		CalcCostOffList( "cust_softwarelistprice", "cust_softwarecost", "cust_softwarecostofflist" ); 
		TotalCost();
	}
	catch( err )
	{
		if( DebugModeOppII ) window.alert( "function SoftwareGPpct_Change error code " + err );
	}
	return;
}

/***************************************************************************************/
function SoftwareSupportGPpct_Change()
{
	if( DebugModeOppII ) window.alert( "function SoftwareSupportGPpct_Change" );

	try
	{
		CalcGPCost( "cust_softwaresupportrevenue", "cust_softwaresupportcost", "cust_softwaresupportgp", "cust_softwaresupportgppct" );
		CalcSupportCostOfList( "cust_softwaresupportcost", "cust_softwarelistprice" );
		TotalCost();
	}
	catch( err )
	{
		if( DebugModeOppII ) window.alert( "function SoftwareSupportGPpct_Change error code " + err );
	}
	return;
}

/* End Of Lines ************************************************************************/
