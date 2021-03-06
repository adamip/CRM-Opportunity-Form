var DebugMode = false;  

/***************************************************************************************/

function myGetValue( label )
{
	try
	{
		var i = Xrm.Page.getAttribute( label );
		var ret;
		if ( i == null )
		{
			ret = 0;
		}
		else
		{
			ret = i.getValue();
			if( ret == null )
				ret = 0;
		}
		return ret;
	}
	catch( err )
	{
		if( DebugMode ) window.alert( "function myGetValue error code " + err );
	}
}

/***************************************************************************************/
function getTotal()
{
	if( DebugMode ) window.alert( "function getTotal" );

	try
	{
		var val1 = myGetValue( "new_currency1" );
		var val2 = myGetValue( "new_currency2" );	
		var out1 = Xrm.Page.getAttribute( "new_total1" );
		
		if( out1 != null ) out1.setValue( val1 + val2 );			
	}
	catch (err)
	{
		if( DebugMode ) window.alert( "function getTotal error code " + err );
	}
}
