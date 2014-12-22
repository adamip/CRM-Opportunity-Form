/***************************************************************************************
    same as AdtechHardwareSoftwareSupportEarnedGP_Update()
	because cost is zero, revenue minus cost will equal to revenue
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
	because cost is zero, revenue minus cost will equal to revenue
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

