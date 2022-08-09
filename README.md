<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

### 🎯Purpose:
Build an application which returns any data from database. 
Use custom interceptor to save controller's method response in database. 
When user hitting the endpoint return cached data in fallowing conditions: 

1) cached data already exist in database (_it was already hit_), 
2) cached data in database is 'fresh' (_declared amount of time has not passed since the last update of data into database_).

Use custom decorator do declare timeout for a.n. logic.

### 🛠️Tools I learned:
    -interceptors
    -custom decorators