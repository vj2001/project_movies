**Project Website Link:  [Website](https://innogeeks-movies.herokuapp.com/) <br/>
Github Link: [Github](https://github.com/vj2001/project_movies)  <br/>
Dockerhub Link: [Dockerhub](https://hub.docker.com/r/vj100/react-app)**

# Steps to run the app 


1. Add mongodb url (localhost / atlas) in config/dev.js file :
```
mongoURI:"mongodb://localhost:27017/movies"
mongoURI:"mongodb+srv://username:<password>@cluster0.ed73q.mongodb.net/movies?retryWrites=true&w=majority"
```
2.
- Add proxy-middleware package as devDependency in package.json :
 ```
 npm i http-proxy-middleware --save-dev
 ```
- Add setupProxy.js file in client/src folder :
  >setupProxy.js
  ```
  const proxy = require("http-proxy-middleware");

  module.exports = function(app) {

      app.use(proxy("/api", { target: "http://localhost:5000" }));

  };
  ```
4. Run the command to start server on port 5000 
```
npm start
```
4. Run the command to start react app on port 3000
```
cd client
npm start
```
