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

    [{"id":1,"name":"Foo","status":"new"},{"id":2,"name":"Bar","status":null}]

## Change a User

### Request

`PUT /users/:userNumber/`

    lien http://localhost:3000/users/+2250777045033/

### Response

    HTTP/1.1 200 OK
    Date: Thu, 24 Feb 2011 12:36:31 GMT
    Status: 200 OK
    Connection: close
    Content-Type: application/json
    Content-Length: 40

    {"id":1,"name":"Foo","status":"changed"}

## Delete a User

### Request

`DELETE /users/userNumber`

    curl -i -H 'Accept: application/json' -X DELETE http://localhost:3000/users/+2250777045033

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
