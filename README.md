# secure-file-upload

## Description
Secure File Upload &amp; Metadata Processing Microservice

## Installation

```bash
$ npm install
```

## Running the app

```bash
# 1. populate User DB - to get the JWT Token
$ npm run start:seed

# 2. check data in DB
$ npm run start:db

# 3. run redis locally (for background job process)
$ brew install redis # install it if not yet installed
$ brew services start redis

# 3. running server locally
$ npm run start

```

## CURL Commands for Different Endpoints
1. Health Endpoint
```bash
curl --location 'http://localhost:3000/v1/health'
```

2. Login Endpoint - To generate JWT Token
```bash
curl --location 'http://localhost:3000/auth/login' \
--header 'Content-Type: application/json' \
--data-raw '{
    "email": "test@example.co",
    "password": "password"
}'
```

3. Upload Endpoint
```bash
curl --location 'http://localhost:3000/upload' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsImVtYWlsIjoidGVzdEBleGFtcGxlLmNvbSIsImlhdCI6MTc0NzY1MzExOSwiZXhwIjoxNzQ3NjU2NzE5fQ.XeLdWUTdjOWsFAAskyvQzq19xOFWPAByGmrJrpxOo4' \
--form 'file=@"/Users/mac/nestjs/secure-file-upload/sample/testFile.txt"' \
--form 'title="My Sample File"' \
--form 'description="Just a test file upload"'
```

4. Get File Endpoint
```bash
curl --location 'http://localhost:3000/files/2' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsImVtYWlsIjoidGVzdEBleGFtcGxlLmNvbSIsImlhdCI6MTc0NzY1MzExOSwiZXhwIjoxNzQ3NjU2NzE5fQ.XeLdWUTdjOWsFAAskyvQzq19xOTWPAByGmrJrpxOo4'
```