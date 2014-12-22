/*
	Adam Ip																	2012-03-04
*/
/* name of target data field 
  Reminder: name(s) is/are case sensitive */
var sDataField_H = "cust_ExpectedGPHardware";
var sDataField_S = "cust_ExpectedGPSoftware";

var DebugModeExpectedGP = false;

/****************************************************************************************/
function ProcessExpectedGPpctSoftware( Entities )
{       
	try
	{
		if( DebugModeExpectedGP ) window.alert( "function ProcessExpectedGPpctSoftware()\n\nEntities :\n" + Entities );

		if( Entities != null )
		{
			var targetSoft = RetrieveAttribute( Entities, sDataField_S );
			if( DebugModeExpectedGP ) window.alert( "function ProcessExpectedGPpctSoftware\ntargetSoft " + targetSoft );
			// on SetValue, sLabel is case sensitive
			// This control takes number or null as second parameter, and therefore must use parseFloat()
			if( targetSoft != null ) mySetValue( sDataField_S.toLowerCase(), parseFloat( targetSoft, 10 ));
		}	
	}
	catch( err )
	{
		window.alert( "function ProcessExpectedGPpctSoftware()\nerror code\t" + err + "\nerror name\t" + err.name + "\nerror message\t" + err.message );
	}
}

/****************************************************************************************/
function ProcessExpectedGPpctHardware( Entities )
{
	try
	{
		if( DebugModeExpectedGP ) window.alert( "function ProcessExpectedGPpctHardware()\n\nEntities :\n" + Entities );

		if( Entities != null )
		{
			var targetHard = RetrieveAttribute( Entities, sDataField_H );
			if( DebugModeExpectedGP ) window.alert( "function ProcessExpectedGPpctHardware\ntargetHard " + targetHard );
			// on SetValue, sLabel is case sensitive
			// This control takes number or null as second parameter, and therefore must use parseFloat()
			if( targetHard != null ) mySetValue( sDataField_H.toLowerCase(), parseFloat( targetHard, 10 ));
		}
	}
	catch( err )
	{
		window.alert( "function ProcessExpectedGPpctHardware()\nerror code\t" + err + "\nerror name\t" + err.name + "\nerror message\t" + err.message );
	}
}

/***************************************************************************************
	Entry Point
*/
function DisplayExpectedGPHardwareSoftware()
{
	try
	{
		DebugModeExpectedGP = DebugModeExpectedGP && AmISoftwareDeveloper();
		if( DebugModeExpectedGP ) 
			window.alert( "function DisplayExpectedGPHardwareSoftware()" );
		
		var oLookup, targetGUID_1, targetGUID;
		/* var targetGUID = Xrm.Page.data.entity.getId(); */
		oLookup = myGetValue( "customerid" ); 	
		if( oLookup != null )
		{
			if( DebugModeExpectedGP )
				window.alert( "function DisplayExpectedGPHardwareSoftware()\nlookup = " + oLookup );
			if( oLookup[0] != null )
			{
				if( DebugModeExpectedGP )
					window.alert( "function DisplayExpectedGPHardwareSoftware()\noLookup[0] = " + oLookup[0] );
				targetGUID_1 = oLookup[0].id;	
				if( DebugModeExpectedGP )
					window.alert( "function DisplayExpectedGPHardwareSoftware()\ntargetGUID_1 = " + targetGUID_1 );
					
				if( targetGUID_1 != null && typeof targetGUID_1 === 'string' )
				{
					targetGUID = removeCurlyBrackets( targetGUID_1 );	
					if( DebugModeExpectedGP ) 
						window.alert( "target " + target + "\n\rtargetGUID " + targetGUID );
					if( targetGUID != null && targetGUID.length > 0 )
					{
						// alert( "targetGUID " + targetGUID );
							   // https://crm.adtech.net/Development/xrmservices/2011/OrganizationData.svc/OpportunitySet?$select=opportunity_customer_accounts/cust_ExpectedGPHardware&$expand=opportunity_customer_accounts&$filter=CustomerId/Id eq guid'E063DC47-5E60-4B5F-90E5-C9A57F41E4C8'	
						var s1 = "https://crm.adtech.net/Production/xrmservices/2011/OrganizationData.svc/OpportunitySet?$select=opportunity_customer_accounts/";
						var s2 = "&$expand=opportunity_customer_accounts&$filter=CustomerId/Id eq guid'";
						var s3 = s1 + sDataField_H + s2 + targetGUID + "'";

						// $.ajax is a macro
						//  parameter url cannot be an array
						//	parameter ProcessExpectedGPpctHardware( ) can only take 1 parameter within the bracket	
						$.ajax(	{
						type: "GET",
						contentType: "application/json; charset=utf-8",
						datatype: "json",
						url: s3,
						beforeSend: function (XMLHttpRequest) { XMLHttpRequest.setRequestHeader( "Accept", "application/json" ); },
						success: function (data, textStatus, XmlHttpRequest)
							{
								// Navigate objects
								// NavigateObjects( data.d.results );

								/* Use only one of these two methods */

								// Use for a selection that may return multiple entities
								ProcessExpectedGPpctHardware( data.d.results );

								// Use for a single selected entity
								//ProcessReturnedEntity( data.d );
											
							},
						error: function (XmlHttpRequest, textStatus, errorThrown) { alert( 'OData Select Failed: ' + s3 ); }
						} );
						   
						// $.ajax is a macro
						// parameter url cannot be an array
						// parameter ProcessExpectedGPpctHardware( ) can only take 1 parameter within the bracket	
						var s4 = s1 + sDataField_S + s2 + targetGUID + "'"; 
						$.ajax(	{
						type: "GET",
						contentType: "application/json; charset=utf-8",
						datatype: "json",
						url: s4,
						beforeSend: function (XMLHttpRequest) { XMLHttpRequest.setRequestHeader( "Accept", "application/json" ); },
						success: function (data, textStatus, XmlHttpRequest)
							{
								// Navigate objects
								// NavigateObjects( data.d.results );

								/* Use only one of these two methods */

								// Use for a selection that may return multiple entities
								ProcessExpectedGPpctSoftware( data.d.results );

								// Use for a single selected entity
								//ProcessReturnedEntity( data.d );								
							},
						error: function (XmlHttpRequest, textStatus, errorThrown) { alert( 'OData Select Failed: ' + s4 ); }
						} );

					}	
				}
			}	
		}
	}	
	catch( err )
	{
		window.alert( "function DisplayExpectedGPHardwareSoftware()\nerror code\t" + err + "\nerror name\t" + err.name + "\nerror message\t" + err.message );
	}

}

/*** End of lines ***********************************************************************/
