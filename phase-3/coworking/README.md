# Co-Working Space System
This project is a team project belongs to the ITCS371 Introduction to Software Engineering course, we develop a web application for the Booking Co-Working Space Room.

## Table of contents
* [General info](#general-info)
* [Mandatory functions](#mandatory-functions)
* [How to run](#how-to-run)
* [Members](#members)

## General info
Our website was developed using VSCode as the primary integrated development environment and Node.js as the server-side framework. The project also includes various web technologies such as HTML, CSS, JavaScript, .env, and database management with SQL. Our website's features include a responsive and intuitive user interface that allows users to browse available room, view detailed information of Co-Working Space, and make bookings seamlessly. In addition, our website also incorporates various security measures, such as user authentication and data encryption, to protect sensitive user information.

## Mandatory functions
1. Authentication for User can log in/log out to the system using a email and password.
2. Users can see for the room available information. The web application will display a list of available rooms at the bottom of the web page.
3. After user selected each room, the web application will show the details of the selected room and the form for booking.

## How to run
To run our project:

1. First, you Download "coworking.zip"

2. Second, extract the "coworking.zip" file to "coworking" folder

3. Third, you have to open "coworking" folder in Visual Studio Code

4. Fourth, you open "coworking" folder, you have to click the "Terminal" button ad select "New Terminal"
    and click the "Terminal" button again ad select "Split Terminal" 
    ** (To open two terminal because we have to run two PORT at the same time) **

5. Fifth, the first Terminal, you should press command 
```
$ cd client
```
the second Terminal, you should press command 
```
$ cd server
```
6. Sixth, first Terminal ['client' folder] you should press command
```
$ npm init
```
```
$ npm install express
```
```
$ npm install nodemon
```
( change scripts in package.json from test to start:
```
"scripts": {
	"start": "nodemon frontend.js"
},
```
)
                            
second Terminal ['server' folder] you should press command
```
$ npm init
```
```
$ npm install express
```
```
$ npm install nodemon
```
```
$ npm install mysql2
```
```
$ npm install dotenv
```
( change scripts in package.json from test to start:
```
"scripts": {
	"start": "nodemon backend.js"
},
```
)

7. Seventh, Before you start you should open 'MYSQLWorkbench' and run the ```coworking.sql```
    After that, you click 'Administration' and then click 'Users and Privileges'.
    In addition, you should click 'Add Account' and fill the form of ```MYSQL_HOST```, ```MYSQL_USERNAME```, and ```MYSQL_PASSWORD``` [for the ```MYSQL_DATABASE = ticketboo```]
    Then, press 'Schema Privileges' and click 'Add Entry' then choose 'Selected schema of ticketboo'.
    For the Object Rights, you should select 'SELECT, INSERT, UPDATE, DELETE' and Click "Apply"

    and change name of ```MYSQL_HOST```, ```MYSQL_USERNAME```, and ```MYSQL_PASSWORD``` that you create your account in the 'MYSQLWorkbench' 
    and fill it in ```.env``` file to connect the database with web services.
For example,
```
PORT = 3030
MYSQL_HOST = localhost
MYSQL_USERNAME = coworkingstaff
MYSQL_PASSWORD = 1234
MYSQL_DATABASE = coworking
```

8. Eighth, after you init, install all of frameworks, and connect the database in '.env' file.
    You press command
```
$ npm start"
```
in both of two Terminal to run all source code and all web service source code file.

9. Ninth, when the first terminal [client] in console log returned:
```
                                        > frontend@1.0.0 start
                                        > nodemon frontend.js

                                        [nodemon] 2.0.22
                                        [nodemon] to restart at any time, enter `rs`
                                        [nodemon] watching path(s): *.*
                                        [nodemon] watching extensions: js,mjs,json
                                        [nodemon] starting `node frontend.js`
                                        Server listening at Port 3000
```
and second terminal [server] in console log returned:
```
                                        > backend@1.0.0 start
                                        > nodemon backend.js

                                        [nodemon] 2.0.22
                                        [nodemon] to restart at any time, enter `rs`
                                        [nodemon] watching path(s): *.*
                                        [nodemon] watching extensions: js,mjs,json
                                        [nodemon] starting `node backend.js`
                                        Server listening at Port 3030
                                        Connected DB: coworking
```

10. Tenth, you open the 'Google Chrome' and press 'http://localhost:3000/' then you will see the Login page.

## Members
1. Suphavadee Cheng [6488120]
2. Jidapa Moolkaew [6488176]
3. Ponnapassorn Iamborisut [6488179]
4. Thadeeya Duangkaew [6488181]
5. Pimmada Chompurat [6488204]
6. Ravikarn Jarungjitvittawas [6488210]
