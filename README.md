# User Management API (PDR.cloud Technical Challenge)

## I used Node.js, TypeScript, Express, RoutingControllers, ClassValidators 

### Setup
* clone the repo
```sh
$ npm i
```
```sh
$ npm start
```
 npm start will start the server on port 3000 which is .env file. You can change portnumber according to your wish.

 * For generating api doc
 ```sh
  npm install -g apidoc
```
```sh
apidoc -i src/ -o apidoc/
```

 ### Folder Structure

 ```ts
user-management-api/
|-- build/
|-- src/
|   |-- controllers/
|   |   |-- userController.ts // for creating, deleting updating, reading users (endpoints)

|   |-- database/ // I am using json file as db for storing details about user(array of users) and vechiles
|   |   |-- users.json
|   |   |-- vehicle.json

|   |-- dto/ //types
|   |   |-- user.dto.ts // type of user

|   |-- interfaces/ 
|   |   |-- responseInterfaces.ts // interface of responses

|   |-- middelware/
|   |   |-- authMiddleware.ts // authentication middleware for accessing resources
|   |   |-- validationErrors.ts //if we make error request then structured understandable error response is sent

|   |-- services/ //for accessing database
|   |   |-- userService.ts  // for CRUD on users database (users.json)

|   |-- index.ts/ // main file

|-- .env/ // basic project settings

|-- package.json
|-- README.md
|-- tsconfig.json
```

### User (create, error)
* creating user
  ![befor creating user (users.json)](relative/path/to/your/image.jpg)


