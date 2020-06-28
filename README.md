
Node.js backend with express  for the  course `Experto en flutter`

## **Local deploy**

1. Create the `.env` file inside the root folder and define 
```
MONGO = mongodb://darwin:admin123123@ds021989.mlab.com:21989/curso-api-rest-flutter
SECRET = kpj14ANm6V1K7u9NKv0pMxKyGgaQDIVX0M
```
This project use mlab as mongodb host don't use these credentials in production.

2.  Next install the dependencies running `npm install`

3. Run the project with `npm run dev`

By default the server is runnnig on PORT `5000`

Check the api docs http://localhost:5000/api/v1/docs