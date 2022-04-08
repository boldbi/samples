from django.db import models

class EmbedProperties:
    
    #Enter the server bi url
    RootUrl = ""
    
    #Enter your server identifier 
    SiteIdentifier = "site/site1"
    Environment = "onpremise"
    EmbedType = "component"
    
    #Enter the required dashboard id 
    DashboardId = ""

    #Enter your BoldBI credentials here.
    UserEmail = ""
    UserPassword = ""

    #Get the embedSecret key from Bold BI.
    EmbedSecret = ""