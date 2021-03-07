import os
import pymongo
import json
import time
import random
import requests

def dummy(request):
    """Responds to any HTTP request.
    Args:
        request (flask.Request): HTTP request object.
    Returns:
        The response text or any set of values that can be turned into a
        Response object using
        `make_response <http://flask.pocoo.org/docs/1.0/api/#flask.Flask.make_response>`.
    """
    if request.method == 'OPTIONS':
        # Allows GET requests from origin https://mydomain.com with
        # Authorization header
        headers = {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST',
            'Access-Control-Allow-Headers': '*',
            'Access-Control-Max-Age': '3600',
            'Access-Control-Allow-Credentials': 'true'
        }
        return ('', 204, headers)

    # Set CORS headers for main requests
    headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': 'true'
    }

    request_json = request.get_json()
   
    sender  = os.environ.get('sender')
    
    if request_json:
        # payload["sender"] = request_json['sender']
        receiver = request_json['receiver']
        # text = request_json['message']
        otp = str(random.randint(1111,9999))   
        text = "hello there your OTP is " + otp     
        retjson = {}
 
        if request_json['token'] == "redacted":



            response = requests.post('https://events-api.notivize.com/applications/ffeefaec-bbf7-446c-8259-f422e893e9c4/event_flows/be0c3194-446a-4532-9ff3-400ef6355b5d/events', json = {'otp': otp, 'phone': receiver})


            # message = client.messages.create( 
            #                     from_=sender,  
            #                     body=text,      
            #                     to=receiver 
            #                 )

            # result=message.sid
            retjson['otp'] = otp
            retjson['result'] = 'sent successfully'
        else:
            retjson['result'] = 'invalid token'


        # retjson['sid'] = result
        # retjson['result'] = "successfully sent"

        return json.dumps(retjson)


    retstr = "action not done"

    if request.args and 'message' in request.args:
        return request.args.get('message')
    elif request_json and 'message' in request_json:
        return request_json['message']
    else:
        return retstr
