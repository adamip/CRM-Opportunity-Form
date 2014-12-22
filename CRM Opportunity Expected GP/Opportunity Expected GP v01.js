/*
	Adam Ip																	2012-03-04
*/
/* name of target data field 
  Reminder: name(s) is/are case sensitive */
var sDataField_H = "cust_ExpectedGPHardware";
var sDataField_S = "cust_ExpectedGPSoftware";

var DebugModeExpectedGP = false;

/****************************************************************************************/
function DisplayExpectedGPHardwareSoftware()
{
	if( DebugModeExpectedGP ) 
		window.alert( "function DisplayExpectedGPHardwareSoftware" );
	
	/* var targetGUID = Xrm.Page.data.entity.getId(); */
	var target = Xrm.Page.data.entity.attributes.get("customerid");
	if( DebugModeExpectedGP ) 
		window.alert( "function DisplayExpectedGPHardwareSoftware\ntarget " + target );

	if( target != null )
	{
		// Check target.getValue() != null in case this is a NEW form; customerid is undefined */
		if( target.getValue() != null )
		{
			var targetGUID = target.getValue()[0].id;
			targetGUID = removeCurlyBrackets( targetGUID );
			
			if( DebugModeExpectedGP ) window.alert( "target " + target + "\n\rtargetGUID " + targetGUID );

			if( targetGUID != null && targetGUID.length > 0 )
			{
				// alert( "targetGUID " + targetGUID );
				var s1 = "https://crm.adtech.net/Development/xrmservices/2011/OrganizationData.svc/OpportunitySet?$select=opportunity_customer_accounts/";
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

/****************************************************************************************/
function ProcessExpectedGPpctHardware( Entities )
{       

	try
	{
		if( DebugModeExpectedGP ) window.alert( "function ProcessExpectedGPpctHardware\n\nEntities :\n" + Entities );

		if( Entities != null )
		{
			var target = RetrieveAttribute( Entities, sDataField_H );
			if( DebugModeExpectedGP ) window.alert( "function ProcessExpectedGPpctHardware\ntarget " + target );
			// on SetValue, sLabel is case sensitive
			// This control takes number or null as second paramter, and therefore must use parseFloat()
			if( target != null ) mySetValue( sDataField_H.toLowerCase(), parseFloat( target, 10 ));
		}	
	}
	catch( err )
	{
		window.alert( "function ProcessExpectedGPpctHardware error code " + err );
	}
}

/****************************************************************************************/
function ProcessExpectedGPpctSoftware( Entities )
{       

	try
	{
		if( DebugModeExpectedGP ) window.alert( "function ProcessExpectedGPpctSoftware\n\nEntities :\n" + Entities );

		if( Entities != null )
		{
			var target = RetrieveAttribute( Entities, sDataField_S );
			if( DebugModeExpectedGP ) window.alert( "function ProcessExpectedGPpctSoftware\ntarget " + target );
			// on SetValue, sLabel is case sensitive
			// This control takes number or null as second paramter, and therefore must use parseFloat()
			if( target != null ) mySetValue( sDataField_S.toLowerCase(), parseFloat(target, 10 ));
		}	
	}
	catch( err )
	{
		window.alert( "function ProcessExpectedGPpctSoftware error code " + err );
	}
}

/*** End of lines ***********************************************************************/
