Sales API with users, costumers, products and orders

**project structure**

folder structure:

config - configuration of external libraries e.g. authentication, upload, email, etc

modules - directly related to the bussiness rules of the application.

shared - general use modules shared with more than one module in the application, e.g. server.ts, main route file, database conection, etc

services: will be inside each module of the application and will be responsible for every rules the application need to meet, e.g. - the password must the stored with encription, there can't be more than one product with the same name, there can't be an email been used by more than one user, etc
