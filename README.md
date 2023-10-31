# Hackhaton MTN back documentation

Cet article présente la documentation de l'API utilisé sur l'application Paykids et les différents cas d'utilisation.

## Installation

    npm install

##  démarrer l'application

    node index.js

# REST API

The REST API to the example app is described below.

## Get list of Users

### Request

`GET /users/`

    lien http://localhost:3000/users/

### Response

    HTTP/1.1 200 OK
    Date: Thu, 24 Oct 2023 12:36:30 GMT
    Status: 200 OK
    Connection: close
    Content-Type: application/json
    Content-Length: 2

    []

## Create a new User

### Request

`POST /users/`

    Lien http://localhost:3000/users

### Response

    HTTP/1.1 201 Created
    Date: Thu, 24 Oct 2023 12:36:30 GMT
    Status: 201 Created
    Connection: close
    Content-Type: application/json
    Location: /thing/1
    Content-Length: 36

    {"_id":{"$oid":"653497024801ad8ea644974d"},"userFirstName":"Abou Mounir","userLastName":"An-nawiwi","codeSecurite":"1234","userNumber":"+2250140729371","__v":{"$numberInt":"0"}}

## Get a specific Thing

### Request

`GET /user/userNumber`

    curl -i -H 'Accept: application/json' http://localhost:3000/users/+2250140729371

### Response

    HTTP/1.1 200 OK
    Date: Thu, 24 Oct 2023 12:40:30 GMT
    Status: 200 OK
    Connection: close
    Content-Type: application/json
    Content-Length: 36

    {"_id":{"$oid":"653497024801ad8ea644974d"},"userFirstName":"Abou Mounir","userLastName":"An-nawiwi","codeSecurite":"1234","userNumber":"+2250140729371","__v":{"$numberInt":"0"}}

## Get a non-existent Users

### Request

`GET /users/userNumber`

    lien http://localhost:3000/users/+2250141729273

### Response

    HTTP/1.1 404 Not Found
    Date: Thu, 24 Oct 2023 12:46:30 GMT
    Status: 404 Not Found
    Connection: close
    Content-Type: application/json
    Content-Length: 35

    {"status":404,"reason":"Not found"}


## Get list of users

### Request

`GET /users/`

    lien http://localhost:3000/users/

### Response

    HTTP/1.1 200 OK
    Date: Thu, 24 Oct 2023 12:50:34 GMT
    Status: 200 OK
    Connection: close
    Content-Type: application/json
    Content-Length: 74

    [{"_id":{"$oid":"653497024801ad8ea644974d"},"userFirstName":"Abou Mounir","userLastName":"An-nawiwi","codeSecurite":"1234","userNumber":"+2250140729371","__v":{"$numberInt":"0"}},{"_id":{"$oid":"653660371a785937f810d88a"},"userFirstName":"Abou Mounir","userLastName":"An-nawiwi","userNumber":"+2250140729371","codeSecurite":"2347","__v":{"$numberInt":"0"}},{"_id":{"$oid":"6536ec9ffc801dbc69f7ba5c"},"userFirstName":"Abou Mounir","userLastName":"An-nawiwi","userNumber":"+2250140729371","codeSecurite":"3578","__v":{"$numberInt":"0"}},{"_id":{"$oid":"653b7f65b5eb476b0ebf254b"},"userFirstName":"Odediran","userLastName":"Fatimah","userNumber":"+2250777045033","codeParental":"123456","__v":{"$numberInt":"0"},"codeSecurite":"7523"}]

## Change a User

### Request

`PUT /users/:userNumber/`

    lien http://localhost:3000/users/+2250777045033/

### Response

    HTTP/1.1 200 OK
    Date: Thu, 24 Oct 2023 12:56:00 GMT
    Status: 200 OK
    Connection: close
    Content-Type: application/json
    Content-Length: 40

    {"_id":{"$oid":"653b7f65b5eb476b0ebf254b"},"userFirstName":"Odediran","userLastName":"Fatimah","userNumber":"+2250777045033","__v":{"$numberInt":"0"},"codeSecurite":"7523"}

## Delete a User

### Request

`DELETE /users/userNumber`

    lien http://localhost:3000/users/+2250777045033

### Response

    HTTP/1.1 204 No Content
    Date: Thu, 24 Oct 2023 12:58:32 GMT
    Status: 204 No Content
    Connection: close


## Try to delete same Thing again

### Request

`DELETE /users/:userNumber`

    lien http://localhost:3000/users/+2250777045033/

### Response

    HTTP/1.1 404 Not Found
    Date: Thu, 24 Oct 2023 13:00:00 GMT
    Status: 404 Not Found
    Connection: close
    Content-Type: application/json
    Content-Length: 35

    {"status":404,"reason":"Not found"}


## Create new Marchand

### Request

`POST /marchands/`

    lien http://localhost:3000/marchands

### Response

    X-Powered-By: Express
    Content-Security-Policy: default-src 'none'
    X-Content-Type-Options: nosniff
    Content-Type: text/html; charset=utf-8
    Content-Length: 149
    Date: Tue, 31 Oct 2023 12:13:17 GMT
    Connection: keep-alive
    Keep-Alive: timeout=5

    {"marchandFirstName":"Krouma","marchandLastName":"Mamadou","storeName":"Paykids","marchandContact":"22545878963","_id":"6540efe47edb7f990540528b","__v":0}


## Create another new Marchand

### Request

`POST /marchands/`

    lien http://localhost:3000/marchands

### Response

    X-Powered-By: Express
    Content-Type: application/json; charset=utf-8
    Content-Length: 156
    ETag: W/"9c-N9lnjDHsnehAE8V3Uz2iFSCccDU"
    Date: Tue, 31 Oct 2023 12:46:17 GMT
    Connection: keep-alive
    Keep-Alive: timeout=5

    {"marchandFirstName":"Sissoko","marchandLastName":"Youssouf","storeName":"propays","marchandContact":"22545678963","_id":"6540f7187edb7f990540528d","__v":0}

## Get all Marchand

### Request

`GET /marchands/`

    lien http://localhost:3000/marchands

### Response

    X-Powered-By: Express
    Content-Type: application/json; charset=utf-8
    Content-Length: 517
    ETag: W/"205-1f9UwVjahx9LJSph1wn95V6fP3c"
    Date: Tue, 31 Oct 2023 12:48:04 GMT
    Connection: keep-alive
    Keep-Alive: timeout=5

    [
        {"_id":"6540ebb513bead0731e270ac","storeId":"60fa7796-851a-438b-a0c3-9e46b16aab7d","marchandFirstName":"Krouma","marchandLastName":"Mamadou","storeName":"Paykids","marchandContact":"22545878963","__v":0},
    {"_id":"6540efe47edb7f990540528b","marchandFirstName":"Krouma","marchandLastName":"Mamadou","storeName":"Paykids","marchandContact":"22545858963","__v":0},
    {"_id":"6540f7187edb7f990540528d","marchandFirstName":"Sissoko","marchandLastName":"Youssouf","storeName":"propays","marchandContact":"22545678763","__v":0}
    ]

## Get Marchand

### Request

`GET /marchands/userNumber`

    lien http://localhost:3000/marchands/22545858963

### Response

    X-Powered-By: Express
    Content-Type: application/json; charset=utf-8
    Content-Length: 154
    ETag: W/"9a-izINC7XNVFu5MaBZJAllO6+tqmI"
    Date: Tue, 31 Oct 2023 13:46:50 GMT
    Connection: keep-alive
    Keep-Alive: timeout=5

    {"_id":"6540efe47edb7f990540528b","marchandFirstName":"Krouma","marchandLastName":"Mamadou","storeName":"Paykids","marchandContact":"22545878963","__v":0}

## Get  Marchand

### Request

`DELETE /marchands/userNumber`

    lien http://localhost:3000/marchands/22545858963

### Response

    X-Powered-By: Express
    Content-Type: application/json; charset=utf-8
    Content-Length: 203
    ETag: W/"cb-VM3uoUSKef1uyx09LKi6BoQOUUk"
    Date: Tue, 31 Oct 2023 14:16:27 GMT
    Connection: keep-alive
    Keep-Alive: timeout=5

    {"_id":"6540ebb513bead0731e270ac","storeId":"60fa7796-851a-438b-a0c3-9e46b16aab7d","marchandFirstName":"Krouma","marchandLastName":"Mamadou","storeName":"Paykids","marchandContact":"22545878963","__v":0}

## Put Marchand

### Request

`PUT /marchands/userNumber`

    lien http://localhost:3000/marchands/22545858963

### Response

    X-Powered-By: Express
    Content-Type: application/json; charset=utf-8
    Content-Length: 156
    ETag: W/"9c-Ztc9AxH4vL7++HNvLYccA7bbm8Y"
    Date: Tue, 31 Oct 2023 14:52:41 GMT
    Connection: keep-alive
    Keep-Alive: timeout=5
    
    {"_id":"6540f7187edb7f990540528d","marchandFirstName":"Sissoko","marchandLastName":"Youssouf","storeName":"doctech","marchandContact":"22555678963","__v":0}
