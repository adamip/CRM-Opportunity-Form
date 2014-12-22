/*
	Adam Ip																	2012-02-29
	Text boxes propagate value from one text box to another, through some simple
	arithematic calculation.  Propagation might be in chain, hard-coded though.
	Initially used in Opportunities Form
	

*/
var DebugModeOpp = false;   
   
/***************************************************************************************/
function GPPercentage( sLabel, val1, val2, out2 )
{
	if( DebugModeOpp ) window.alert( "function GPPercentage: " + sLabel );

	try
	{
		if( out2 != null && val1 != null && val1 != 0 )
		{ 
			out2.setSubmitMode( "always" );
			out2.setValue(( val1 - val2 ) * 100.0 / val1 );	
		}
		if( DebugModeOpp ) window.alert( "function GPPercentage: " + sLabel + "\n\tval1 " + val1 + "\n+\tval2 " + val2 );		
	}
	catch( err )
	{
		if( DebugModeOpp ) window.alert( "function GPPercentage " + sLabel + " error code " + err );
	}
}

/***************************************************************************************/
function GP( sLabel, val1, val2, out1, out2 )
{
	if( DebugModeOpp ) window.alert( "function GP: " + sLabel );

	try
	{
		if( out1 != null )
		{ 
			out1.setSubmitMode( "always" );
			out1.setValue( val1 - val2  );
		}	
		if( out2 != null )
		{ 
			GPPercentage( sLabel, val1, val2, out2 );
		}	
		if( DebugModeOpp ) window.alert( "function GP: " + sLabel + "\n\tval1 " + val1 + "\n+\tval2 " + val2 );
	}
	catch( err )
	{
		if( DebugModeOpp ) window.alert( "function GP " + sLabel + " error code " + err );
	}
}

/***************************************************************************************/
function HardwareGP()
{
	if( DebugModeOpp ) window.alert( "function HardwareGP" );

	try
	{
		var val1 = myGetValue( "cust_hardwarerevenue" );
		var val2 = myGetValue( "cust_hardwarecost" );
		var out1 = Xrm.Page.getAttribute( "cust_hardwaregp" );
		var out2 = Xrm.Page.getAttribute( "cust_hardwaregppct" );
		
		GP( "Hardware GP", val1, val2, out1, out2 );
	}
	catch( err )
	{
		if( DebugModeOpp ) window.alert( "function HardwareGP error code " + err );
	}
}

/***************************************************************************************/
function HardwareSupportGP()
{
	if( DebugModeOpp ) window.alert( "function HardwareSupportGP" );

	try
	{
		var val1 = myGetValue( "cust_hardwaresupportrevenue" );
		var val2 = myGetValue( "cust_hardwaresupportcost" );
		var out1 = Xrm.Page.getAttribute( "cust_hardwaresupportgp" );
		var out2 = Xrm.Page.getAttribute( "cust_hardwaresupportgppct" );
		
		GP( "Hardware Support GP", val1, val2, out1, out2 );
	}
	catch( err )
	{
		if( DebugModeOpp ) window.alert( "function HardwareSupportGP error code " + err );
	}
}

/***************************************************************************************/
function SoftwareGP()
{
	if( DebugModeOpp ) window.alert( "function SoftwareGP" );

	try
	{
		var val1 = myGetValue( "cust_softwarerevenue" );
		var val2 = myGetValue( "cust_softwarecost" );
		var out1 = Xrm.Page.getAttribute( "cust_softwaregp" );
		var out2 = Xrm.Page.getAttribute( "cust_softwaregppct" );
		
		GP( "Software GP", val1, val2, out1, out2 );
	}
	catch( err )
	{
		if( DebugModeOpp ) window.alert( "function SoftwareGP error code " + err );
	}
}

/***************************************************************************************/
function SoftwareSupportGP()
{
	if( DebugModeOpp ) window.alert( "function SoftwareSupportGP" );

	try
	{
		var val1 = myGetValue( "cust_softwaresupportrevenue" );
		var val2 = myGetValue( "cust_softwaresupportcost" );
		var out1 = Xrm.Page.getAttribute( "cust_softwaresupportgp" );
		var out2 = Xrm.Page.getAttribute( "cust_softwaresupportgppct" );
		
		GP( "Software Support GP", val1, val2, out1, out2 );
	}
	catch( err )
	{
		if( DebugModeOpp ) window.alert( "function SoftwareSupportGP error code " + err );
	}
}

/***************************************************************************************/
function ServicesGP()
{
	if( DebugModeOpp ) window.alert( "function ServicesGP" );

	try
	{
		var val1 = myGetValue( "cust_servicesrevenue" );
		var val2 = myGetValue( "cust_servicescost" );
		var out1 = Xrm.Page.getAttribute( "cust_servicesgp" );
		var out2 = Xrm.Page.getAttribute( "cust_servicesgppct" );
		
		GP( "Services GP", val1, val2, out1, out2 );
	}
	catch( err )
	{
		if( DebugModeOpp ) window.alert( "function ServicesGP error code " + err );
	}
}

/***************************************************************************************/
function ServicesRevenue()
{
	if( DebugModeOpp ) window.alert( "function ServicesRevenue" );

	try
	{
		var val1 = myGetValue( "cust_serviceinstallrevenue" );
		var val2 = myGetValue( "cust_servicetrainingrevenue" );
		var val3 = myGetValue( "cust_serviceconsultingrevenue" );
		var val4 = myGetValue( "cust_servicepmrevenue" );
		var val5 = myGetValue( "cust_serviceengrrevenue" );
		var val6 = myGetValue( "cust_servicecustomerdevelopmentrevenue" );
		var out1 = Xrm.Page.getAttribute( "cust_servicesrevenue" );
		
		Sum6( "service Revenue", val1, val2, val3, val4, val5, val6, out1 );
	}
	catch( err )
	{
		if( DebugModeOpp ) window.alert( "function ServicesRevenue error code " + err );
	}
}

/***************************************************************************************/
function ServicesCost()
{
	if( DebugModeOpp ) window.alert( "function ServicesCost" );

	try
	{
		var val1 = myGetValue( "cust_serviceinstallcost" );
		var val2 = myGetValue( "cust_servicetrainingcost" );
		var val3 = myGetValue( "cust_serviceconsultingcost" );
		var val4 = myGetValue( "cust_servicepmcost" );
		var val5 = myGetValue( "cust_serviceengrcost" );
		var val6 = myGetValue( "cust_servicecustomerdevelopmentcost" );
		var out1 = Xrm.Page.getAttribute( "cust_servicescost" );
		
		Sum6( "service Cost", val1, val2, val3, val4, val5, val6, out1 );
	}
	catch( err )
	{
		if( DebugModeOpp ) window.alert( "function ServicesCost error code " + err );
	}
}

/***************************************************************************************/
function TotalGP()
{
	if( DebugModeOpp ) window.alert( "function TotalGP" );

	try
	{
		var val1 = myGetValue( "cust_totalrevenue" );
		var val2 = myGetValue( "cust_totalcost" );
		var out1 = Xrm.Page.getAttribute( "cust_totalgp" );
		var out2 = Xrm.Page.getAttribute( "cust_totalgppct" );
		
		GP( "Total GP", val1, val2, out1, out2 );
	}
	catch( err )
	{
		if( DebugModeOpp ) window.alert( "function TotalGP error code " + err );
	}
}

/***************************************************************************************/
function TotalRevenue()
{
	if( DebugModeOpp ) window.alert( "function TotalRevenue" );

	try
	{
		var val1 = myGetValue( "cust_hardwarerevenue" );
		var val2 = myGetValue( "cust_hardwaresupportrevenue" );
		var val3 = myGetValue( "cust_softwarerevenue" );
		var val4 = myGetValue( "cust_softwaresupportrevenue" );
		var val5 = myGetValue( "cust_servicesrevenue" );
		var val6 = myGetValue( "cust_globalmonitor" );
		var out1 = Xrm.Page.getAttribute( "cust_totalrevenue" );
		
		Sum6( "Total Revenue", val1, val2, val3, val4, val5, val6, out1 );
		TotalGP(); 
	}
	catch( err )
	{
		if( DebugModeOpp ) window.alert( "function TotalRevenue error code " + err );
	}
}

/***************************************************************************************/
function TotalCost()
{
	if( DebugModeOpp ) window.alert( "function TotalCost" );

	try
	{
		var val1 = myGetValue( "cust_hardwarecost" );
		var val2 = myGetValue( "cust_hardwaresupportcost" );
		var val3 = myGetValue( "cust_softwarecost" );
		var val4 = myGetValue( "cust_softwaresupportcost" );
		var val5 = myGetValue( "cust_servicescost" );
		var out1 = Xrm.Page.getAttribute( "cust_totalcost" );
		
		Sum5( "Total Cost", val1, val2, val3, val4, val5, out1 );
		TotalGP(); 
	}
	catch( err )
	{
		if( DebugModeOpp ) window.alert( "function TotalCost error code " + err );
	}
}

/***************************************************************************************/
function HardwareRevenueUpdate()
{
	if( DebugModeOpp ) window.alert( "function HardwareRevenueUpdate" );

	try
	{
		HardwareGP();
		TotalRevenue();
	}
	catch( err )
	{
		if( DebugModeOpp ) window.alert( "function HardwareRevenueUpdate error code " + err );
	}
}

/***************************************************************************************/
function HardwareCostUpdate()
{
	if( DebugModeOpp ) window.alert( "function HardwareCostUpdate" );

	try
	{
		HardwareGP();
		TotalCost();
	}
	catch( err )
	{
		if( DebugModeOpp ) window.alert( "function HardwareCostUpdate error code " + err );
	}
}

/***************************************************************************************/
function HardwareSupportRevenueUpdate()
{
	if( DebugModeOpp ) window.alert( "function HardwareSupportRevenueUpdate" );

	try
	{
		HardwareSupportGP();
		TotalRevenue();
	}
	catch( err )
	{
		if( DebugModeOpp ) window.alert( "function HardwareSupportRevenueUpdate error code " + err );
	}
}

/***************************************************************************************/
function HardwareSupportCostUpdate()
{
	if( DebugModeOpp ) window.alert( "function HardwareSupportCostUpdate" );

	try
	{
		HardwareSupportGP();
		TotalCost();
	}
	catch( err )
	{
		if( DebugModeOpp ) window.alert( "function HardwareSupportCostUpdate error code " + err );
	}
}

/***************************************************************************************/
function SoftwareRevenueUpdate()
{
	if( DebugModeOpp ) window.alert( "function SoftwareRevenueUpdate" );

	try
	{
		SoftwareGP();
		TotalRevenue();
	}
	catch( err )
	{
		if( DebugModeOpp ) window.alert( "function SoftwareRevenueUpdate error code " + err );
	}
}

/***************************************************************************************/
function SoftwareCostUpdate()
{
	if( DebugModeOpp ) window.alert( "function SoftwareCostUpdate" );

	try
	{
		SoftwareGP();
		TotalCost();
	}
	catch( err )
	{
		if( DebugModeOpp ) window.alert( "function SoftwareCostUpdate error code " + err );
	}
}

/***************************************************************************************/
function SoftwareSupportRevenueUpdate()
{
	if( DebugModeOpp ) window.alert( "function SoftwareSupportRevenueUpdate" );

	try
	{
		SoftwareSupportGP();
		TotalRevenue();
	}
	catch( err )
	{
		if( DebugModeOpp ) window.alert( "function SoftwareSupportRevenueUpdate error code " + err );
	}
}

/***************************************************************************************/
function SoftwareSupportCostUpdate()
{
	if( DebugModeOpp ) window.alert( "function SoftwareSupportCostUpdate" );

	try
	{
		SoftwareSupportGP();
		TotalCost();
	}
	catch( err )
	{
		if( DebugModeOpp ) window.alert( "function SoftwareSupportCostUpdate error code " + err );
	}
}

/***************************************************************************************/
/* Manually input ServicesRevenue													   */
function ServicesRevenueUpdate()
{
	if( DebugModeOpp ) window.alert( "function ServicesRevenueUpdate" );

	try
	{
		mySetValue( "cust_serviceinstallrevenue", null );
		mySetValue( "cust_servicetrainingrevenue", null );
		mySetValue( "cust_serviceconsultingrevenue" , null);
		mySetValue( "cust_servicepmrevenue", null );
		mySetValue( "cust_serviceengrrevenue", null );
		mySetValue( "cust_servicecustomerdevelopmentrevenue", null );	
	
		ServicesGP();
		TotalRevenue();
	}
	catch( err )
	{
		if( DebugModeOpp ) window.alert( "function ServicesRevenueUpdate error code " + err );
	}
}

/***************************************************************************************/
function ServicesRevenueUpdate2()
{
	if( DebugModeOpp ) window.alert( "function ServicesRevenueUpdate2" );

	try
	{
		ServicesRevenue();
		ServicesGP();
		TotalRevenue();

	}
	catch( err )
	{
		if( DebugModeOpp ) window.alert( "function ServicesRevenueUpdate2 error code " + err );
	}
}

/***************************************************************************************/
/* Manually input ServicesCost														   */
function ServicesCostUpdate()
{
	if( DebugModeOpp ) window.alert( "function ServicesCostUpdate" );

	try
	{
		mySetValue( "cust_serviceinstallcost", null );	
		mySetValue( "cust_servicetrainingcost", null );	
		mySetValue( "cust_serviceconsultingcost", null );	
		mySetValue( "cust_servicepmcost", null );	
		mySetValue( "cust_serviceengrcost", null );	
		mySetValue( "cust_servicecustomerdevelopmentcost", null );	

		ServicesGP();
		TotalCost();
	}
	catch( err )
	{
		if( DebugModeOpp ) window.alert( "function ServicesCostUpdate error code " + err );
	}
}

/***************************************************************************************/
function ServicesCostUpdate2()
{
	if( DebugModeOpp ) window.alert( "function ServicesCostUpdate2" );

	try
	{
		ServicesCost();
		ServicesGP();
		TotalCost();

	}
	catch( err )
	{
		if( DebugModeOpp ) window.alert( "function ServicesCostUpdate2 error code " + err );
	}
}

/***************************************************************************************/
function GlobalMonitorUpdate()
{
	if( DebugModeOpp ) window.alert( "function GlobalMonitorUpdate" );

	try
	{
		TotalRevenue();
	}
	catch( err )
	{
		if( DebugModeOpp ) window.alert( "function GlobalMonitorUpdate error code " + err );
	}
}

/* End Of Lines ************************************************************************/
