from django.shortcuts import render
from django.http import HttpResponse
from rest_framework.decorators import api_view
from django.views.decorators.csrf import csrf_exempt, csrf_protect
from . import models

import requests
import json
import hashlib
import hmac
import base64

def indexbi(request):
    root_url=models.EmbedProperties.RootUrl+'/'+models.EmbedProperties.SiteIdentifier
    context = {'dashboard_id': models.EmbedProperties.DashboardId,
    'server_url': root_url}
    return render(request,'index.html',context)


@api_view(['POST'])
def get_embed_details(request):
    embedQuerString = request.data.get("embedQuerString")
    embedQuerString = embedQuerString +"&embed_user_email=" + models.EmbedProperties.UserEmail
    embedDetailsUrl = "/embed/authorize?" + embedQuerString + "&embed_signature=" + get_signature_url(embedQuerString)
    result_content=requests.get(models.EmbedProperties.RootUrl+'/api/'+models.EmbedProperties.SiteIdentifier+embedDetailsUrl)
    return HttpResponse(result_content)

def get_signature_url(message):
    EmbedSecret = models.EmbedProperties.EmbedSecret
    keyBytes = bytes(EmbedSecret.encode('utf-8'))
    messageBytes = bytes(message.encode('utf-8'))
    hashMessage = base64.b64encode(hmac.new(keyBytes,messageBytes,digestmod=hashlib.sha256).digest())
    return str(hashMessage, "utf-8")



            