USE Productions_MSCRM;

UPDATE OpportunityExtensionBase
SET cust_ThirdPartyHardwareSupportEarnedGP = cust_ThirdPartyHardwareSupportGP / cust_LengthOfTermThirdPartyHardwareSupport
	, cust_ThirdPartyHardwareSupportEarnedGP_Base = cust_ThirdPartyHardwareSupportGP_Base / cust_LengthOfTermThirdPartyHardwareSupport
	, cust_ThirdPartyHardwareSupportEarnedGPpct = cust_ThirdPartyHardwareSupportGPpct / cust_LengthOfTermThirdPartyHardwareSupport
WHERE cust_LengthOfTermThirdPartyHardwareSupport IS NOT NULL AND cust_LengthOfTermThirdPartyHardwareSupport <> 0;

UPDATE OpportunityExtensionBase
SET cust_ThirdPartySoftwareSupportEarnedGP = cust_ThirdPartySoftwareSupportGP / cust_LengthOfTermThirdPartySoftwareSupport
	, cust_ThirdPartySoftwareSupportEarnedGP_Base = cust_ThirdPartySoftwareSupportGP_Base / cust_LengthOfTermThirdPartySoftwareSupport
	, cust_ThirdPartySoftwareSupportEarnedGPpct = cust_ThirdPartySoftwareSupportGPpct / cust_LengthOfTermThirdPartySoftwareSupport
WHERE cust_LengthOfTermThirdPartySoftwareSupport IS NOT NULL AND cust_LengthOfTermThirdPartySoftwareSupport <> 0;

UPDATE OpportunityExtensionBase
SET cust_AdTechHardwareSoftwareSupportEarned = cust_AdTechHardwareSoftwareSupport / cust_LengthOfTermAdTechHardwareSoftwareSupport
	, cust_AdTechHardwareSoftwareSupportEarned_Base = cust_AdTechHardwareSoftwareSupport_Base / cust_LengthOfTermAdTechHardwareSoftwareSupport
	, cust_AdTechHardwareSoftwareSupportEarnedGP = cust_AdTechHardwareSoftwareSupport / cust_LengthOfTermAdTechHardwareSoftwareSupport
	, cust_AdTechHardwareSoftwareSupportEarnedGP_Base = cust_AdTechHardwareSoftwareSupport_Base / cust_LengthOfTermAdTechHardwareSoftwareSupport
WHERE cust_LengthOfTermAdTechHardwareSoftwareSupport IS NOT NULL AND cust_LengthOfTermAdTechHardwareSoftwareSupport <> 0;

UPDATE OpportunityExtensionBase	
SET cust_AdtechHardwareSoftwareSupportEarnedGPpct = 
	( CASE 
		WHEN cust_AdtechHardwareSoftwareSupportEarned IS NULL THEN 0
		WHEN cust_AdtechHardwareSoftwareSupportEarned = 0 THEN 0
		ELSE 100
		END
	);
	
UPDATE OpportunityExtensionBase
SET cust_AdTechManagedServicesEarned = cust_AdTechManagedServices / cust_LengthOfTermAdTechManagedServices
	, cust_AdTechManagedServicesEarned_Base = cust_AdTechManagedServices_Base / cust_LengthOfTermAdTechManagedServices
	, cust_AdTechManagedServicesEarnedGP = cust_AdTechManagedServices / cust_LengthOfTermAdTechManagedServices
	, cust_AdTechManagedServicesEarnedGP_Base = cust_AdTechManagedServices_Base / cust_LengthOfTermAdTechManagedServices
WHERE cust_LengthOfTermAdTechManagedServices IS NOT NULL AND cust_LengthOfTermAdTechManagedServices <> 0;

UPDATE OpportunityExtensionBase	
SET cust_AdtechManagedServicesEarnedGPpct = 
	( CASE 
		WHEN cust_AdtechManagedServicesEarned IS NULL THEN 0 
		WHEN cust_AdtechManagedServicesEarned = 0 THEN 0 
		ELSE 100 
		END
	);
	
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
	- ISNULL( cust_AdtechHardwareSoftwareSupport, 0 )
	- ISNULL( cust_AdtechManagedServices, 0 )
    + ISNULL( cust_ThirdPartyHardwareSupportEarnedGP, 0 ) 
	+ ISNULL( cust_ThirdPartySoftwareSupportEarnedGP, 0 ) 
    + ISNULL( cust_AdtechHardwareSoftwareSupportEarned, 0 ) 
	+ ISNULL( cust_AdtechManagedServicesEarned, 0 )	
	, cust_TotalRevenueEarnedGP_Base = ISNULL( cust_TotalGP_Base, 0 ) 
	- ISNULL( cust_ThirdPartyHardwareSupportGP_Base, 0 ) 
	- ISNULL( cust_ThirdPartySoftwareSupportGP_Base, 0 )
	- ISNULL( cust_AdtechHardwareSoftwareSupport_Base, 0 )
	- ISNULL( cust_AdtechManagedServices_Base, 0 )
    + ISNULL( cust_ThirdPartyHardwareSupportEarnedGP_Base, 0 ) 
	+ ISNULL( cust_ThirdPartySoftwareSupportEarnedGP_Base, 0 ) 
    + ISNULL( cust_AdtechHardwareSoftwareSupportEarned_Base, 0 ) 
	+ ISNULL( cust_AdtechManagedServicesEarned_Base, 0 );
	
UPDATE OpportunityExtensionBase	
SET cust_TotalRevenueEarnedGPPct = cust_TotalRevenueEarnedGP * 100 / cust_TotalRevenueEarned
WHERE cust_TotalRevenueEarned IS NOT NULL AND cust_TotalRevenueEarned <> 0;	


	

	
	




	
	