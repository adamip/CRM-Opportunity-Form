function Run()
{
	var viewId = Xrm.Page.data.entity.getId();  
	Xrm.Page.getAttribute( "new_guid" ).setValue( viewId );
}