USE Productions_MSCRM;

UPDATE OpportunityExtensionBase
SET cust_ThirdPartyHardwareSupportEarnedGP = cust_ThirdPartyHardwareSupportGP / cust_LengthOfTermThirdPartyHardwareSupport
	, cust_ThirdPartyHardwareSupportEarnedGP_Base = cust_ThirdPartyHardwareSupportGP_Base / cust_LengthOfTermThirdPartyHardwareSupport
WHERE cust_LengthOfTermThirdPartyHardwareSupport IS NOT NULL AND cust_LengthOfTermThirdPartyHardwareSupport <> 0;

UPDATE OpportunityExtensionBase
SET cust_ThirdPartyHardwareSupportEarnedGPpct = cust_ThirdPartyHardwareSupportGPpct / cust_LengthOfTermThirdPartyHardwareSupport
WHERE cust_LengthOfTermThirdPartyHardwareSupport IS NOT NULL AND cust_LengthOfTermThirdPartyHardwareSupport <> 0;

UPDATE OpportunityExtensionBase
SET cust_ThirdPartySoftwareSupportEarnedGP = cust_ThirdPartySoftwareSupportGP / cust_LengthOfTermThirdPartySoftwareSupport
	, cust_ThirdPartySoftwareSupportEarnedGP_Base = cust_ThirdPartySoftwareSupportGP_Base / cust_LengthOfTermThirdPartySoftwareSupport
WHERE cust_LengthOfTermThirdPartySoftwareSupport IS NOT NULL AND cust_LengthOfTermThirdPartySoftwareSupport <> 0;

UPDATE OpportunityExtensionBase
SET cust_ThirdPartySoftwareSupportEarnedGPpct = cust_ThirdPartySoftwareSupportGPpct / cust_LengthOfTermThirdPartySoftwareSupport
WHERE cust_LengthOfTermThirdPartySoftwareSupport IS NOT NULL AND cust_LengthOfTermThirdPartySoftwareSupport <> 0;

UPDATE OpportunityExtensionBase
SET cust_TotalRevenueEarned = ISNULL( cust_TotalRevenue, 0 ) 
	- ISNULL( cust_ThirdPartyHardwareSupportRevenue, 0 ) 
	- ISNULL( cust_ThirdPartySoftwareSupportRevenue, 0 ) 
	- ISNULL( cust_adtechhardwaresoftwaresupport, 0 )
	- ISNULL( cust_AdtechManagedServices, 0 )
	+ ISNULL( cust_ThirdPartyHardwareSupportEarned, 0 ) 
	+ ISNULL( cust_ThirdPartySoftwareSupportEarned, 0 ) 
	+ ISNULL( cust_AdtechHardwareSoftwareSupportEarned, 0 ) 
	+ ISNULL( cust_AdtechManagedServicesEarned, 0 )
	, cust_TotalRevenueEarned_Base = ISNULL( cust_TotalRevenue_Base, 0 ) 
	- ISNULL( cust_ThirdPartyHardwareSupportRevenue_Base, 0 ) 
	- ISNULL( cust_ThirdPartySoftwareSupportRevenue_Base, 0 ) 
	- ISNULL( cust_adtechhardwaresoftwaresupport_Base, 0 )
	- ISNULL( cust_AdtechManagedServices_Base, 0 )
	+ ISNULL( cust_ThirdPartyHardwareSupportEarned_Base, 0 ) 
	+ ISNULL( cust_ThirdPartySoftwareSupportEarned_Base, 0 ) 
	+ ISNULL( cust_AdtechHardwareSoftwareSupportEarned_Base, 0 ) 
	+ ISNULL( cust_AdtechManagedServicesEarned_Base, 0 );

	
UPDATE OpportunityExtensionBase	
SET cust_TotalRevenueEarnedGP = ISNULL( cust_TotalGP, 0 ) 
	- ISNULL( cust_ThirdPartyHardwareSupportGP, 0 ) 
	- ISNULL( cust_ThirdPartySoftwareSupportGP, 0 )
    + ISNULL( cust_ThirdPartyHardwareSupportEarnedGP, 0 ) 
	+ ISNULL( cust_ThirdPartySoftwareSupportEarnedGP, 0 ) 
    + ISNULL( cust_AdtechHardwareSoftwareSupportEarned, 0 ) 
	+ ISNULL( cust_AdtechManagedServicesEarned, 0 )
	, cust_TotalRevenueEarnedGP_Base = ISNULL( cust_TotalGP_Base, 0 ) 
	- ISNULL( cust_ThirdPartyHardwareSupportGP_Base, 0 ) 
	- ISNULL( cust_ThirdPartySoftwareSupportGP_Base, 0 )
    + ISNULL( cust_ThirdPartyHardwareSupportEarnedGP_Base, 0 ) 
	+ ISNULL( cust_ThirdPartySoftwareSupportEarnedGP_Base, 0 ) 
    + ISNULL( cust_AdtechHardwareSoftwareSupportEarned_Base, 0 ) 
	+ ISNULL( cust_AdtechManagedServicesEarned_Base, 0 );
	
UPDATE OpportunityExtensionBase	
SET cust_TotalRevenueEarnedGPPct = cust_TotalRevenueEarnedGP * 100 / cust_TotalRevenueEarned
WHERE cust_TotalRevenueEarned IS NOT NULL AND cust_TotalRevenueEarned <> 0;	
	