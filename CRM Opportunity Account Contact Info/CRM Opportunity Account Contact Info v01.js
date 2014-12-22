/***************************************************************************************
	
	Adam Ip																	2014-11-17
	On the Opportunity Form, fetch the "Invoiced customer".  This is an Account.
	
	The Account is an object, then extracts contact information such as Phone, EMail, 
	Street, State, Zip, County, Country/Region, ... , and etc.
		cust_acc_accountname
		cust_acc_mainphone
		cust_acc_email
		cust_acc_addressstreet1
		cust_acc_addressstreet2
		cust_acc_addressstreet3
		cust_acc_addresscity
		cust_acc_addresscounty
		cust_acc_addressstate
		cust_acc_addresszip
		cust_acc_addresscountryregion
	
	The contact information are stored in a General Hidden Tab of the Opportunity
	Form, i.e. Tab_HiddenAccountContactInformation.  When an Opportunity is Closed Won, 
	and the Product Interest fails into	certain categories, then the contact information 
	are carried forward to a newly created record of Site Technology.  This part is 
	performed in a work-flow Process.

	function ProcessReturnedEntity( Entity )
	function OpportunityAccountContactInfo()
	function showhideOpportunityAccountTab()
	function OpportunityAccountContactInfo_OnLoad()

	*/
var DebugModeOpportunityAccountContactInfo = true;

/***************************************************************************************
	https://community.dynamics.com/crm/b/crmbusiness/archive/2012/03/21/crm-2011-setting-a-user-lookup-with-the-logged-in-user-with-javascript.aspx
	http://www.mscrmconsultant.com/2012/08/get-and-set-lookup-value-using.html
	http://crmbusiness.wordpress.com/2011/02/18/crm-2011-how-to-set-up-a-lookup-using-javascript/
	http://snipplr.com/view/70031/
*/
function ProcessReturnedEntitiesOACI( Entity )
{       
	try
	{
		if( DebugModeOpportunityAccountContactInfo ) window.alert( "function ProcessReturnedEntitiesOACI( Entity )\nEntity\t" + Entity );
		if( Entity != null )	/* result generated.  function RetrieveAttribute() is a recursive function call */
		{
			var sAccountId = RetrieveAttribute( Entity, "AccountId" );   
			var sName = RetrieveAttribute( Entity, "Name" );   
			var sTelephone1 = RetrieveAttribute( Entity, "Telephone1" );   
			var sEMailAddress1 = RetrieveAttribute( Entity, "EMailAddress1" );   
			var sAddress1_Line1 = RetrieveAttribute( Entity, "Address1_Line1" );   
			var sAddress1_Line2 = RetrieveAttribute( Entity, "Address1_Line2" );   
			var sAddress1_Line3 = RetrieveAttribute( Entity, "Address1_Line3" );   
			var sAddress1_City = RetrieveAttribute( Entity, "Address1_City" );   
			var sAddress1_County = RetrieveAttribute( Entity, "Address1_County" );   
			var sAddress1_StateOrProvince = RetrieveAttribute( Entity, "Address1_StateOrProvince" );   
			var sAddress1_PostalCode = RetrieveAttribute( Entity, "Address1_PostalCode" );  
						
			/* Be aware that Country/Region is an Option Set, not a Lookup */
			var rCountry = RetrieveAttribute( Entity, "new_CountryRegion" );

			var sOwnerID, sOwnerName, sOwnerLogicalName, oOwnerID = RetrieveAttribute( Entity, "OwnerId" ), ret = "";  						
			if( oOwnerID != null )
			{
				sOwnerID = RecursiveRetrieveAttribute( oOwnerID, "Id", ret );  	
				sOwnerName = RecursiveRetrieveAttribute( oOwnerID, "Name", ret );  	
				sOwnerLogicalName = RecursiveRetrieveAttribute( oOwnerID, "LogicalName", ret );  	
			}	

			if( DebugModeOpportunityAccountContactInfo )
			{
				window.alert( "function ProcessReturnedEntitiesOACI()\nsAccountId\t" + sAccountId + "\nsName\t" + sName 
					+ "\nsTelephone1\t" + sTelephone1 + "\nsEMailAddress1\t" + sEMailAddress1 
					+ "\nsAddress1_Line1\t" + sAddress1_Line1 + "\nsAddress1_Line2\t" + sAddress1_Line2 
					+ "\nsAddress1_Line3\t" + sAddress1_Line3 + "\nsAddress1_City\t" + sAddress1_City 
					+ "\nsAddress1_County\t" + sAddress1_County + "\nsAddress1_StateOrProvince\t" + sAddress1_StateOrProvince 
					+ "\nsAddress1_PostalCode\t" + sAddress1_PostalCode + "\nrCountry.Value\t" + rCountry.Value
					+ "\noOwnerID\t" + oOwnerID
					);  
				if( oOwnerID != null )
					window.alert( "function ProcessReturnedEntitiesOACI()\nsOwnerID\t" + sOwnerID + "\nsOwnerName\t" + sOwnerName + "\nsOwnerLogicalName\t" + sOwnerLogicalName );	
			}	
		

			
			mySetValue( "cust_acc_name", sName ? sName : "" );
			mySetValue( "cust_acc_mainphone", sTelephone1 ? sTelephone1 : "" );
			mySetValue( "cust_acc_email", sEMailAddress1 ? sEMailAddress1 : "" );				
			mySetValue( "cust_acc_addressstreet1", sAddress1_Line1 ? sAddress1_Line1 : "" );				
			mySetValue( "cust_acc_addressstreet2", sAddress1_Line2 ? sAddress1_Line2 : "" );				
			mySetValue( "cust_acc_addressstreet3", sAddress1_Line3 ? sAddress1_Line3 : "" );				
			mySetValue( "cust_acc_addresscity", sAddress1_City ? sAddress1_City : "" );				
			mySetValue( "cust_acc_addresscounty", sAddress1_County ? sAddress1_County : "" );				
			mySetValue( "cust_acc_addressstate", sAddress1_StateOrProvince ? sAddress1_StateOrProvince : "" );				
			mySetValue( "cust_acc_addresszip", sAddress1_PostalCode ? sAddress1_PostalCode : "" );	
			/* Be aware that Country/Region is an Option Set, not a Lookup */			
			mySetValue( "cust_acc_addresscountryregion", rCountry.Value ? rCountry.Value : null );				
		}	
	}
	catch( err )
	{
		if( DebugModeOpportunityAccountContactInfo ) window.alert( "function ProcessReturnedEntitiesOACI()\nerr code\t" + err + "\nerr name\t" + err.name + "\nerr message\t" + err.message + "\nerr number\t" + err.number + "\nerr prototype\t" + err.prototype  + "\nerr toString\t" + err.toString());
	}
}

/***************************************************************************************/
function OpportunityAccountContactInfo()
{
	try
	{	
		var oLookup, targetGUID_1, targetGUID;
		if( DebugModeOpportunityAccountContactInfo ) window.alert( "function OpportunityAccountContactInfo()" );

		/* https://community.dynamics.com/crm/f/117/t/88417.aspx */
		oLookup = myGetValue( "customerid" ); 	
		if( oLookup != null )
		{
			if( DebugModeOpportunityAccountContactInfo )
				window.alert( "function OpportunityAccountContactInfo()\nlookup = " + oLookup );
			if( oLookup[0] != null )
			{
				if( DebugModeOpportunityAccountContactInfo )
					window.alert( "function OpportunityAccountContactInfo()\noLookup[0] = " + oLookup[0] );
				targetGUID_1 = oLookup[0].id;	
				if( DebugModeOpportunityAccountContactInfo )
					window.alert( "function OpportunityAccountContactInfo()\ntargetGUID_1 = " + targetGUID_1 );
				if( targetGUID_1 != null && typeof targetGUID_1 === 'string' )
				{
					targetGUID = removeCurlyBrackets( targetGUID_1 );
					if( targetGUID != null && targetGUID.length > 0 )
					{
						/* https://crm.adtech.net/Production/xrmservices/2011/OrganizationData.svc/AccountSet?$select=AccountId,Name,Address1_Line1,Address1_Line2,Address1_Line3,Address1_City,Address1_StateOrProvince,Address1_PostalCode,Address1_County,new_CountryRegion,CreatedBy,CreatedOn,EMailAddress1,Telephone1&$filter=AccountId eq guid'67159266-7B6A-E411-BD5D-00155D646605' */
						var ODataSelect = "https://crm.adtech.net/Production/xrmservices/2011/OrganizationData.svc/AccountSet?$select=AccountId,Name,Address1_Line1,Address1_Line2,Address1_Line3,Address1_City,Address1_StateOrProvince,Address1_PostalCode,Address1_County,new_CountryRegion,CreatedBy,CreatedOn,EMailAddress1,Telephone1,OwnerId&$filter=AccountId eq guid'" + targetGUID + "'";
						if( DebugModeOpportunityAccountContactInfo )
							window.alert( "function OpportunityAccountContactInfo()\nODataSelect\t" + ODataSelect );
						
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
								ProcessReturnedEntitiesOACI( data.d.results );

								// Use for a single selected entity
								// ProcessReturnedEntity( data.d );
											
							},
						error: function (XmlHttpRequest, textStatus, errorThrown) { alert( 'OData Select Failed: ' + ODataSelect); }
						}  	);
					}
				}
			}
		}
	}	
	catch( err )
	{
		if( DebugModeOpportunityAccountContactInfo ) window.alert( "function OpportunityAccountContactInfo()\nerr code\t" + err + "\nerr name\t" + err.name + "\nerr message\t" + err.message + "\nerr number\t" + err.number + "\nerr prototype\t" + err.prototype  + "\nerr toString\t" + err.toString());
	}
}

/**************************************************************************************/
function showhideOpportunityAccountTab()
{
	try
	{
		if( DebugModeOpportunityAccountContactInfo ) window.alert( "function showhideOpportunityAccountTab()" );
		if( AmIShowGeneralHidden() || AmISoftwareDeveloper() )
			ShowOneTab( "Tab_HiddenAccountContactInformation" );
		else	
			HideOneTab( "Tab_HiddenAccountContactInformation" );
	}
	catch( err )
	{
		if( DebugModeOpportunityAccountContactInfo ) window.alert( "function showhideOpportunityAccountTab()\nerr code\t" + err + "\nerr name\t" + err.name + "\nerr message\t" + err.message + "\nerr number\t" + err.number + "\nerr prototype\t" + err.prototype  + "\nerr toString\t" + err.toString());
	}
}

/**************************************************************************************
	Entry Point
*/
function OpportunityAccountContactInfo_OnLoad()
{
	try
	{
		DebugModeOpportunityAccountContactInfo = DebugModeOpportunityAccountContactInfo && AmISoftwareDeveloper();
		if( DebugModeOpportunityAccountContactInfo ) window.alert( "function OpportunityAccountContactInfo_OnLoad()" );
		showhideOpportunityAccountTab();
		OpportunityAccountContactInfo(); 
	}	
	catch( err )
	{
		if( DebugModeOpportunityAccountContactInfo ) window.alert( "function OpportunityAccountContactInfo_OnLoad()\nerr code\t" + err + "\nerr name\t" + err.name + "\nerr message\t" + err.message + "\nerr number\t" + err.number + "\nerr prototype\t" + err.prototype  + "\nerr toString\t" + err.toString());
	}
}

/* End of lines ***********************************************************************/
