/***************************************************************************************
	
	Adam Ip																	2014-10-07
	On the Opportunity Form, check for "Invoice Customer", i.e. customerid.  
	If the type of this invoice Customer is an Account record, then extract this Account 
	record and fetch its attribute, AGS Executive Sponsor, i.e. a lookup data 
	field new_agsexecutivesponsor
	
	This attribute will fill into Opportunity Form attribute, AGS Executive Sponsor, 
	i.e. a lookup data field cust_agsexecutivesponsor

		function ProcessReturnedEntities( Entities )
		function OpportunityAgsExecutiveSponsor()
		function OpportunityAgsExecutiveSponsor_OnLoad()

	Adam Ip																	2014-12-10
	AGS Executive Sponsor is now changed from a lookup field to a text field, i.e. 
	cust_agsexecutivesponsor changes to new_agsexecutivesponsor
		function ProcessReturnedEntities_AGSExecutiveSponsor( Entities )


	*/
var DebugModeOppAGSExecutiveSponsor = true;

/***************************************************************************************
	http://www.mscrmconsultant.com/2012/08/get-and-set-lookup-value-using.html
	http://crmbusiness.wordpress.com/2011/02/18/crm-2011-how-to-set-up-a-lookup-using-javascript/
	http://snipplr.com/view/70031/
*/
function ProcessReturnedEntities_AGSExecutiveSponsor( Entities )
{       
	try
	{
		if( DebugModeOppAGSExecutiveSponsor )
			window.alert( "function ProcessReturnedEntities_AGSExecutiveSponsor( Entities )\nEntities\t" + Entities );
		
		if( Entities != null )	/* result generated.  function RetrieveAttribute() is a recursive function call */
		{
			/*
			var exesp_id = RetrieveAttribute( Entities, "Id" );
			if( exesp_id != null )
			{
				var exesp_name = RetrieveAttribute( Entities, "Name" );
				if( exesp_name != null )
				{
					/*
					var exesp_type = RetrieveAttribute( Entities, "type" );
					if( exesp_type != null )
					{
						if( DebugModeOppAGSExecutiveSponsor )
							window.alert( "function ProcessReturnedEntities_AGSExecutiveSponsor()\nexesp_id\t" + exesp_id + "\nexesp_name\t" + exesp_name + "\nexesp_type\t" + exesp_type );
						var aLookup = new Array();
						aLookup[0] = new Object(); 
						aLookup[0].id = exesp_id;  
						aLookup[0].name = exesp_name;
						aLookup[0].entityType = exesp_type;
						setDefaultLookupItem( "cust_agsexecutivesponsor", aLookup );
					}
				}	
			}  	
			*/
			var exesp_name = RetrieveAttribute( Entities, "Name" );
			if( DebugModeOppAGSExecutiveSponsor )
				window.alert( "function ProcessReturnedEntities_AGSExecutiveSponsor()\nEntities\t" + Entities + "\nexesp_name\t" + exesp_name );
			if( exesp_name != null )
				mySetValue( "new_agsexecutivesponsor", exesp_name );

		}	
	}
	catch( err )
	{
		window.alert( "function ProcessReturnedEntities_AGSExecutiveSponsor()\nerror code\t" + err + "\nerror name\t" + err.name + "\nerror message\t" + err.message );
	}
}

/***************************************************************************************/
function OpportunityAgsExecutiveSponsor()
{
	try
	{	
		var lookup, targetGUID_1, targetGUID;
		if( DebugModeOppAGSExecutiveSponsor )
		window.alert( "function OpportunityAgsExecutiveSponsor()" );

		/* https://community.dynamics.com/crm/f/117/t/88417.aspx */
		lookup = myGetValue( "customerid" ); 	
		if( lookup != null )
		{
			if( DebugModeOppAGSExecutiveSponsor )
				window.alert( "function OpportunityAgsExecutiveSponsor()\nlookup = " + lookup );
			if( lookup[0] != null )
			{
				if( DebugModeOppAGSExecutiveSponsor )
					window.alert( "function OpportunityAgsExecutiveSponsor()\nlookup[0] = " + lookup[0] );
				targetGUID_1 = lookup[0].id;	
				if( DebugModeOppAGSExecutiveSponsor )
					window.alert( "function OpportunityAgsExecutiveSponsor()\ntargetGUID_1 = " + targetGUID_1 + "\ntypeof targetGUID_1 = " + typeof targetGUID_1 );
				if( targetGUID_1 != null && typeof targetGUID_1 === 'string' )
				{
					targetGUID = removeCurlyBrackets( targetGUID_1 );
					if( targetGUID != null && targetGUID.length > 0 )
					{
						/* var ODataSelect = "https://crm.adtech.net/Production/xrmservices/2011/OrganizationData.svc/AccountSet?$select=new_AGSExecutiveSponsor&$filter=AccountId eq guid'191A29B8-2BB7-E111-B236-00155D031C01'"; */
						var ODataSelect = "https://crm.adtech.net/Production/xrmservices/2011/OrganizationData.svc/AccountSet?$select=new_AGSExecutiveSponsor&$filter=AccountId eq guid'" + targetGUID + "'";
						if( DebugModeOppAGSExecutiveSponsor )
							window.alert( "function OpportunityAgsExecutiveSponsor()\nODataSelect\t" + ODataSelect );						
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
								ProcessReturnedEntities_AGSExecutiveSponsor( data.d.results );

								// Use for a single selected entity
								// ProcessReturnedEntities_AGSExecutiveSponsor( data.d );
											
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
		window.alert( "function OpportunityAgsExecutiveSponsor()\nerror code\t" + err + "\nerror name\t" + err.name + "\nerror message\t" + err.message );
	}
}

/**************************************************************************************
	Entry Point
*/
function OpportunityAgsExecutiveSponsor_OnLoad()
{
	try
	{
		DebugModeOppAGSExecutiveSponsor = DebugModeOppAGSExecutiveSponsor && AmISoftwareDeveloper();
		OpportunityAgsExecutiveSponsor(); 
	}	
	catch( err )
	{
		window.alert( "function OpportunityAgsExecutiveSponsor_OnLoad()\nerror code\t" + err + "\nerror name\t" + err.name + "\nerror message\t" + err.message );
	}
}

/* End of lines ***********************************************************************/
