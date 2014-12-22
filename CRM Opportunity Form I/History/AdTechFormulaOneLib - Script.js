// Services_Revenue__c / 2 
function Revenue_50_Services__c()
{
	try
	{
		var in1 = Xrm.Page.getAttribute("new_servicesrevenue");
		var out1 = Xrm.Page.getAttribute("new_50servicesrevenue");
		var val1 = in1.getValue(); 
		
		if( val1 == null ) val1 = 0;
		if( out1 != null ) out1.setValue( val1 / 2 );			
	}
	catch (err)
	{
	}
}

// Revenue_50_Services__c + HDW_SW_Revenue__c 
function Future_AGS_Revenue_Total__c()
{
	try
	{
		var in1 = Xrm.Page.getAttribute("new_50servicesrevenue");
		var in2 = Xrm.Page.getAttribute("new_hdwpluswswrevenue");	
		var out1 = Xrm.Page.getAttribute("new_futureagsrevenuetotal");
		var val1 = in1.getValue(); 
		var val2 = in2.getValue(); 
		
		if( val1 == null ) val1 = 0;
		if( val2 == null ) val2 = 0;
		if( out1 != null ) out1.setValue( val1 + val2 );			
	}
	catch (err)
	{
	}
}

// Hardware_Revenue__c + Software_Revenue__c
function HDW_SW_Revenue__c()
{
	try
	{
		var in1 = Xrm.Page.getAttribute("new_hardwarerevenue");
		var in2 = Xrm.Page.getAttribute("new_softwarerevenue");	
		var out1 = Xrm.Page.getAttribute("new_hwpluswswrevenue");
		var val1 = in1.getValue(); 
		var val2 = in2.getValue(); 
		
		if( val1 == null ) val1 = 0;
		if( val2 == null ) val2 = 0;
		if( out1 != null ) out1.setValue( val1 + val2 );			
	}
	catch (err)
	{
	}
}

// Total_Revenue__c - Revenue_50_Services__c - HDW_SW_Revenue__c
function Initial_Verint_Revenue__c()
{
	try
	{
		var in1 = Xrm.Page.getAttribute("new_totalrevenue");
		var in2 = Xrm.Page.getAttribute("new_50servicesrevenue");	
		var in3 = Xrm.Page.getAttribute("new_hdwpluswswrevenue");	
		var out1 = Xrm.Page.getAttribute("new_Initialverintrevenue");
		var val1 = in1.getValue(); 
		var val2 = in2.getValue(); 
		var val3 = in3.getValue(); 
		
		if( val1 == null ) val1 = 0;
		if( val2 == null ) val2 = 0;
		if( val3 == null ) val3 = 0;
		if( out1 != null ) out1.setValue( val1 - val2 - val3 );			
	}
	catch (err)
	{
	}
}

/* (Software_List_Price__c * (1-82/100)) * (1-(6/10)) */
function Maintenance_Dollars_Verint__c()
{
	try
	{
		var in1 = Xrm.Page.getAttribute("new_softwarelistprice");
		var out1 = Xrm.Page.getAttribute("new_maintenancedollarsverint");
		var val1 = in1.getValue(); 
		
		if( val1 == null ) val1 = 0;
		if( out1 != null ) out1.setValue( val1  * ( 1 - ( 82 / 100 )) * ( 1 - ( 6 / 10 )));			
	}
	catch (err)
	{
	}
}

/* Software_List_Price__c * (1-(6/10)) */
function Software_Dollars_Verint__c()
{
	try
	{
		var in1 = Xrm.Page.getAttribute("new_softwarelistprice");
		var out1 = Xrm.Page.getAttribute("new_softwaredollarsverint");
		var val1 = in1.getValue(); 
		
		if( val1 == null ) val1 = 0;
		if( out1 != null ) out1.setValue( val1  * ( 1 - ( 6 / 10 )));			
	}
	catch (err)
	{
	}
}

// Software_List_Price__c * (1-Software_Discount_Percentage__c)
function Software_Revenue__c()
{
	try
	{
		var in1 = Xrm.Page.getAttribute("new_softwarelistprice");
		var in2 = Xrm.Page.getAttribute("new_softwarediscountpercentage");	
		var out1 = Xrm.Page.getAttribute("new_softwarerevenue");
		var val1 = in1.getValue(); 
		var val2 = in2.getValue(); 
		
		if( val1 == null ) val1 = 0;
		if( val2 == null ) val2 = 0;
		if( val2 >= 1 && val2 <=100 ) val2 /= 100;		
		if( out1 != null ) out1.setValue( val1 * ( 1 - val2 ));			
	}
	catch (err)
	{
	}
}

/* Software_Dollars_Verint__c + Maintenance_Dollars_Verint__c + 
		Partner_Services_Dollars__c + Partner_Training_Dollars__c */
function Total_Dollars_Partner__c()
{
	try
	{
		var in1 = Xrm.Page.getAttribute("new_softwaredollarsverint");
		var in2 = Xrm.Page.getAttribute("new_maintenancedollarsverint");	
		var in3 = Xrm.Page.getAttribute("new_servicesdollarstopartner");	
		var in4 = Xrm.Page.getAttribute("new_trainingdollarstopartner");	
		var out1 = Xrm.Page.getAttribute("new_Totaldollarspartner");
		var val1 = in1.getValue(); 
		var val2 = in2.getValue(); 
		var val3 = in3.getValue(); 
		var val4 = in4.getValue(); 
		
		if( val1 == null ) val1 = 0;
		if( val2 == null ) val2 = 0;
		if( val3 == null ) val3 = 0;
		if( val4 == null ) val4 = 0;
		if( out1 != null ) out1.setValue( val1 + val2 + val3 + val4 );			
	}
	catch (err)
	{
	}
}

/* Hardware_Revenue__c + Software_Revenue__c + Software_Maintenance_Revenue__c + 
	Training_Revenue__c + AGS_Support_Revenue__c + Services_Revenue__c + 
	Preferred_Customer_Discount__c + First_Year_Revenue__c + Partner_Services_Revenue__c */
function Total_Revenue__c()
{
	try
	{
		var in1 = Xrm.Page.getAttribute("new_hardwarerevenue");
		var in2 = Xrm.Page.getAttribute("new_softwarerevenue");	
		var in3 = Xrm.Page.getAttribute("new_softwaremaintenancerevenue");	
		var in4 = Xrm.Page.getAttribute("new_trainingrevenue");
		// var in5 = Xrm.Page.getAttribute("");	
		var in6 = Xrm.Page.getAttribute("new_servicesrevennue");	
		var in7 = Xrm.Page.getAttribute("new_preferredcustomerdiscount");
		// var in8 = Xrm.Page.getAttribute("");	
		// var in9 = Xrm.Page.getAttribute("");	
		var out1 = Xrm.Page.getAttribute("new_totalrevenue");
		var val1 = in1.getValue(); 
		var val2 = in2.getValue(); 
		var val3 = in3.getValue(); 
		var val4 = in4.getValue(); 
		// var val5 = in5.getValue(); 
		var val6 = in6.getValue(); 
		var val7 = in7.getValue(); 
		// var val8 = in8.getValue(); 
		// var val9 = in9.getValue(); 
		
		var val1 = in1.getValue(); 
		var val2 = in2.getValue(); 
		var val3 = in3.getValue(); 
		var val4 = in4.getValue(); 
		// var val5 = in5.getValue(); 
		var val6 = in6.getValue(); 
		var val7 = in7.getValue(); 
		// var val8 = in8.getValue(); 
		// var val9 = in9.getValue(); 
		if( out1 != null ) out1.setValue( val1 + val2 + val3 + val4  + val6 + val7 );			
	}
	catch (err)
	{
	}
}


