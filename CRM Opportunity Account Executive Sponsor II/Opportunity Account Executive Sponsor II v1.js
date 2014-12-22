/*
	Adam Ip																	2011-11-15
		get Opportunity Partner as a Lookup Item, i.e. the only object in 
		an array, used in Opportunity Form

	Adam Ip																	2011-11-17
		Both data fields of Opportunity Partner and Potential Customer are
		array of Lookup Item objects.  They can be null, though.
		If there is previously no value in Opportunity Partner, then proceed.
		If there is previously a value in Opportunity Partner and this is 
		equal to Potential Customer, then proceed; otherwise skip.
		
	Adam Ip																	2011-12-20
		setVerintAsOpportunityPartner() to set Opportunity Partner to Verint
		IF Opportunity Record Type equals to 2 AND the current Opportunity
		Partner is null		
*/

var DebugModeOppPartner = false;

/* name of target data field */
var getDataField = "new_opportunitypartner";
var DataField_name = "Verint Systems, Inc.";
var DataField_id = "ABAD1AB5-9748-4557-9F29-DA336C999361";
var DataField_entityType = "account";

/***************************************************************************************/
function validateOpportunityPartner( display )
{
	if( DebugModeOppPartner )
		window.alert( "display[0].name " + display[0].name + "\ndisplay[0].id " + display[0].id + "\ndisplay[0].entityType " + display[0].entityType );	
}

/***************************************************************************************/
function setVerintAsOpportunityPartner()
{
	if( DebugModeOppPartner )
		window.alert( "function setVerintAsOpportunityPartner" );
	try
	{
		var display = myGetValue( getDataField );
		if( display != null )
		{
			validateOpportunityPartner( display );
		}
		else
		{
			var iRecordType = myGetValue( "new_opportunityrecordtype" );
			if( DebugModeOppPartner )
				window.alert( "new_opportunityrecordtype = " + iRecordType );			
			if( iRecordType == 2 )
			{
				var aValue = new Array();
				aValue[0] = new Object();
				aValue[0].name = DataField_name;
				aValue[0].id = DataField_id;
				aValue[0].entityType = DataField_entityType;
				setDefaultLookupItem( getDataField, aValue ); 
			}	
		}
	}
	catch( err )
	{
		window.alert( "function setVerintAsOpportunityPartner error code " + err );
	}
}

/***************************************************************************************/
function DisplayOpportunityPartner( Entities )
{       
	if( DebugModeOppPartner )
		window.alert( "function DisplayOpportunityPartner" );
	try
	{
		if( Entities != null )
		{
			var oLookupItem = new Object();
			oLookupItem.name = RetrieveAttribute( Entities, "Name" );
			oLookupItem.type = 1;
			oLookupItem.typename = RetrieveAttribute( Entities, "LogicalName" );
			oLookupItem.id = RetrieveAttribute( Entities, "Id" );			
			
			if( oLookupItem != null && oLookupItem.name != null && oLookupItem.id != null )
			{
				var aLookupData = new Array();
				aLookupData[0] = oLookupItem;
				setDefaultLookupItem( getDataField, aLookupData );				
			}
		}
	}
	catch( err )
	{
		window.alert( "function DisplayOpportunityPartner error code " + err );
	}
}

/***************************************************************************************/
function ProcessReturnedEntities( Entities )
{       
	if( DebugModeOppPartner )
		window.alert( "function ProcessReturnedEntities" );
	try
	{
		if( Entities != null )
		{
			DisplayOpportunityPartner( Entities );
		}
	}
	catch( err )
	{
		window.alert( "function ProcessReturnedEntities error code " + err );
	}
}

/***************************************************************************************/
function getOpportunityPartner()
{
	if( DebugModeOppPartner )
		window.alert( "function getOpportunityPartner" );
	var display = myGetValue( getDataField );
	if( display == null )	
	{
		if( DebugModeOppPartner )
			window.alert( "display is null" );
		setVerintAsOpportunityPartner();	
	}
	else
	{	
		/* attempt to retrieve Xrm.Page.data.entity.attributes.get("customerid").getValue()[0].id */
		var targetGUID_1 = Xrm.Page.data.entity.attributes.get( "customerid" ); 	
		
		/* if targetGUID_1 is null, then this is new Opportunity Form, with blank Potential Customer, 
			i.e. customerid, and blank Opportunity Partner											*/
		if( targetGUID_1 != null )
		{
			var targetGUID_2 = targetGUID_1.getValue();
			if( targetGUID_2 != null )
			{
				if( DebugModeOppPartner )
					window.alert( "function getOpportunityPartner\ntargetGUID_1 " + targetGUID_1 + "\ntargetGUID_2 " + targetGUID_2 );
				/* if this data field is equal to Potential Customer, i.e. customerid, 
					which means it is undefined, then proceed 
					Otherwise, it means there is previosuly entered data, then skip */
				if( display[0].name == targetGUID_2[0].name )
				{		
					var targetGUID = removeCurlyBrackets( targetGUID_2[0].id );
					if( DebugModeOppPartner )
						window.alert( "function getOpportunityPartner\ntargetGUID " + targetGUID + "\ndisplay[0].name " + display[0].name + "\ntargetGUID_2[0].name " + targetGUID_2[0].name );

					if( targetGUID != null && targetGUID.length > 0 )
					{
						/* if deploy to "Production" platform, replace the phrase "Development" to "Production" */
						/* var ODataSelect = "https://crm.adtech.net/Development/xrmservices/2011/OrganizationData.svc/OpportunitySet?$select=opportunity_customer_accounts/new_CurrentPartner&$expand=opportunity_customer_accounts&$filter=CustomerId/Id eq guid'" + targetGUID + "'"; */
						var ODataSelect = "https://crm.adtech.net/Production/xrmservices/2011/OrganizationData.svc/OpportunitySet?$select=opportunity_customer_accounts/new_CurrentPartner&$expand=opportunity_customer_accounts&$filter=CustomerId/Id eq guid'" + targetGUID + "'";
						if( DebugModeOppPartner )
							window.alert( "function getOpportunityPartner\nODataSelect " + ODataSelect );
						
						$.ajax(	{
						type: "GET",
						contentType: "application/json; charset=utf-8",
						datatype: "json",
						url: ODataSelect,
						beforeSend: function (XMLHttpRequest) { XMLHttpRequest.setRequestHeader( "Accept", "application/json" ); },
						success: function (data, textStatus, XmlHttpRequest)
							{
								// Navigate objects
								// NavigateObjects( data.d.results );

								/* Use only one of these two methods */

								// Use for a selection that may return multiple entities
								ProcessReturnedEntities( data.d.results );

								// Use for a single selected entity
								//ProcessReturnedEntity( data.d );
											
							},
						error: function (XmlHttpRequest, textStatus, errorThrown) { alert( 'OData Select Failed: ' + ODataSelect); }
						}  	);
					}	
				}
			}
		}
	}
}

/* End Of Lines ************************************************************************/
