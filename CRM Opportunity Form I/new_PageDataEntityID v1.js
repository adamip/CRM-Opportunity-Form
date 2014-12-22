var DebugPageDataEntityID = false;   
   
/***************************************************************************************/
function PageDataEntityIDField()
{
	if( DebugPageDataEntityID )
		alert( "function PageDataEntityIDField");

	try
	{
		var viewId = Xrm.Page.data.entity.getId();  
		if( viewId != null )
			Xrm.Page.getAttribute( "new_guid" ).setValue(viewId);
	}
	catch( err )
	{
		if( DebugPageDataEntityID ) 
			window.alert( "function PageDataEntityIDField error code " + err );
	}
}