
//Web service listen to port 3030

/* ('express') used for building web applications and APIs. */
const express = require('express');

/* ("dotenv") module loads environment variables from a .env file into process.env. */
const dotenv = require("dotenv");

/* ('path') module provides utilities for working with file and directory paths. */
const path = require('path');

/* To set up and configure a web server. */
const app = express();

/* Config dotenv and router */
const router = express.Router();
app.use(router)
dotenv.config();

/* This function in an Express.js application that serves static files from the 'public' directory. */
app.use(express.static(path.join(__dirname, 'public')));

/* This is needed for POST method */
router.use(express.json());
router.use(express.urlencoded({ extended: true }));

/* Connection to MySQL */
const mysql = require('mysql2');
const { rmSync } = require('fs');
var connection = mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
});

/* Connect to Database */
connection.connect(function (err) {
    if (err) throw err;
    console.log(`Connected DB: ${process.env.MYSQL_DATABASE}`);
});

/* a route handler for HTTP GET requests to the root path '/' of the server, using the get method of the router instance. */
router.get('/', (req, res) => {
    console.log('Request at /');
    return res.send({ message: 'Welcome to Home Page' })
})


/*-------------------------WEB SERVICE: SIGN IN & SIGN UP-------------------------*/

/* TASK 2.1: FOR SIGN IN 
To check if the email and password match the list of user. */
router.post('/authentication', (req, res) => {
    console.log('Request at /login-submit');
    console.log("Login by " + req.body.email);

    let email = req.body.email;
    let pass = req.body.password;

    // The command to check if the email and password match the list of users.
    let sql = `SELECT * FROM user WHERE (email = "${email}" AND password = "${pass}");`;

    connection.query(sql, function (error, results) {
        if (error) throw error;

        if (results.length === 0) {
            console.log("Not Found");
            return res.json({ "exist": "false" });
        } else {
            console.log("Found");
            return res.json({ "exist": "true" });
        }
    });
});



router.post('/newuser', (req, res) => {
    console.log('Request at /newuser');
    console.log("Form submitted by " + req.body.code);

    let fname = req.body.fname;
    let lname = req.body.lname;
    let email = req.body.email;  // Add email field
    let address = req.body.address;  // Add address field
    let phone_number = req.body.phone_number;  // Add phone_number field
    let code = req.body.code;
    let pass = req.body.password;

    const currentDate = new Date();
    const date = currentDate.getFullYear() + "-" + (currentDate.getMonth() + 1) + "-" + currentDate.getDate();
    const time = currentDate.getHours() + ":" + currentDate.getMinutes() + ":" + currentDate.getSeconds();

    console.log(`INSERT INTO user (user_code, fname, lname, email, address, phone_number, password) 
                 VALUES ('${code}', '${fname}', '${lname}', '${email}', '${address}', '${phone_number}', '${pass}');`);

    console.log("Sign up successfully!");

    let sql = `INSERT INTO user (user_code, fname, lname, email, address, phone_number, password) 
               VALUES ('${code}', '${fname}', '${lname}', '${email}', '${address}', '${phone_number}', '${pass}');`;

    connection.query(sql, function (error, results) {
        if (error) throw error;
        return res.send({ message: '::New user Sign up successfully!::' });
    });
});

router.post('/newbooking', (req, res) => {
    console.log('Request at /newbooking');
    console.log("Form submitted by " + req.body.classCode);

    let room = req.body.title;
    let img = req.body.img;
    let desc = req.body.desc;
    let date = req.body.date;
    let time = req.body.time;
    let needEquipment = req.body.needEquipment;
    let price = req.body.price;
    let classCode = req.body.classCode;

    // Assuming equipment_price and equipment are arrays in the request body
    const equipmentNames = req.body.equipment || [];

    console.log("Values from request body: ", equipmentNames);
    console.log("Number of equipment items: ", equipmentNames.length);

    // Insert into the 'booking' table
    let bookingSql = `INSERT INTO booking (class_code, b_room, b_img, b_desc, b_date, b_time, b_need_equipment, b_price) 
                      VALUES ('${classCode}','${room}', '${img}', '${desc}', '${date}', '${time}', '${needEquipment}', ${price})`;

    connection.query(bookingSql, function (bookingError, bookingResults) {
        if (bookingError) {
            throw bookingError;
        }

        // Log a message indicating the successful completion of the queries
        console.log("Booking insertion completed successfully!");

        // Insert into the 'booking_equipment' table if there are equipment names
        if (needEquipment === 'yes' && equipmentNames.length > 4) {
            const equipmentStrings = req.body.equipment || [];
            const [currentEquipmentName, currentEquipmentPrice] = equipmentStrings.split(',');
            const equipmentSql = `INSERT INTO booking_equipment (class_code, b_equipment_name, b_equipment_price) 
            VALUES ('${classCode}', '${currentEquipmentName}', ${currentEquipmentPrice})`;

            connection.query(equipmentSql, function (equipmentError, equipmentResults) {
                if (equipmentError) {
                    console.error(`Error inserting equipment: ${equipmentError}`);
                } else {
                    console.log(`Equipment inserted successfully: ${currentEquipmentName}`);
                }
            });
        }
        else if (needEquipment === 'yes' && equipmentNames.length > 0) {

            // Assuming req.body.equipment is an array in the request body
            const equipmentStrings = req.body.equipment || [];
            console.log(equipmentStrings.length)
            // Use a loop to insert each piece of equipment
            for (let i = 0; i < equipmentStrings.length; i++) {
                // Split the combined string into name and price using ','
                const [currentEquipmentName, currentEquipmentPrice] = equipmentStrings[i].split(',');
                console.log(`INSERT INTO booking_equipment (class_code, b_equipment_name, b_equipment_price) 
                            VALUES ('${classCode}', '${currentEquipmentName}', ${currentEquipmentPrice})`);
                // Insert into the 'booking_equipment' table
                const equipmentSql = `INSERT INTO booking_equipment (class_code, b_equipment_name, b_equipment_price) 
                                      VALUES ('${classCode}', '${currentEquipmentName}', ${currentEquipmentPrice})`;

                connection.query(equipmentSql, function (equipmentError, equipmentResults) {
                    if (equipmentError) {
                        console.error(`Error inserting equipment: ${equipmentError}`);
                    } else {
                        console.log(`Equipment inserted successfully: ${currentEquipmentName}`);
                    }
                });
            }
        }

        // Count the number of bookings for the specific date
        let countSql = `SELECT COUNT(*) AS bookingCount FROM booking WHERE b_date = '${date}'`;
        connection.query(countSql, function (countError, countResults) {
            if (countError) {
                console.error(`Error counting bookings: ${countError}`);
            } else {
                const bookingCount = countResults[0].bookingCount;
                console.log(`Number of bookings for ${date}: ${bookingCount}`);

                // Update availability status if the count exceeds 5
                if (bookingCount > 5) {
                    let updateStatusSql = `
                        UPDATE coworking_info
                        SET status = 'unavailable'
                        WHERE class_code = '${classCode}' AND class_code IN (
                            SELECT class_code
                            FROM booking
                            WHERE date = '${date}'
                            GROUP BY class_code
                            HAVING COUNT(*) > 5
                        )`;

                    connection.query(updateStatusSql, function (updateError, updateResults) {
                        if (updateError) {
                            console.error(`Error updating availability status: ${updateError}`);
                        } else {
                            console.log(`Availability status updated successfully for rooms with class_code: ${classCode} on date: ${date}`);
                        }
                    });
                }

            }
        });

        // Additional logic can be added here if needed

        // Send a success response to the client
        res.json({ success: true });
    });
});


router.get('/bookings', function (req, res) {
    /* The command for SQL query to select all data from the coworking_info table. */
    const sql = "SELECT * FROM booking";
    connection.query(sql, (err, results) => {
        if (err) return res.json(err);
        return res.send(results);
    });
});


router.get('/materials', function (req, res) {
    /* The command for SQL query to select all data from the materials table. */
    const sql = "SELECT * FROM materials";
    connection.query(sql, (err, results) => {
        if (err) return res.json(err);
        return res.send(results);
    });
});


/*-------------------------WEB SERVICE: PRODUCT-------------------------*/

/* THIS PATH FOR SELECT ALL TICKET */
router.get('/coworking-info', function (req, res) {
    /* The command for SQL query to select all data from the coworking_info and booking tables. */
    const sql = `SELECT * FROM coworking_info`;

    connection.query(sql, (err, results) => {
        if (err) return res.json(err);
        return res.send(results);
    });
});

//TEST CASE:
//method: GET
//URL: http://localhost:3030/coworking-info


/* THIS PATH FOR SELECT A TICKET BASED ON class_code*/
router.get('/coworking-info/:class_code', function (req, res) {
    let class_code = req.params.class_code;
    if (!class_code) {
        return res.status(404).send({ error: true, message: 'Please provide Coworking Class information.' });
    }

    /* The SQL query to select data by class_code from the coworking_info table. */
    connection.query('SELECT * FROM coworking_info WHERE class_code=?', class_code, function (err, results) {
        if (err) throw err;
        // return res.send({ error: false, data: results[0], message: 'Coworking info retrieved' });
        res.json(results[0]);
        console.log(`Sending coworking info result of class_code = ${class_code}`);
    });
});


router.get('/coworking-in/:date', function (req, res) {
    let date = req.params.date;
    if (!date) {
        return res.status(404).send({ error: true, message: 'Please provide a date.' });
    }
    console.log("yes")
    /* The SQL query to select data by date from the coworking_info table. */
    connection.query(`SELECT
    grouping_category,
    grouping_column,
    MAX(class_code) AS class_code,
    MAX(class_title) AS class_title,
    MAX(class_img) AS class_img,
    MAX(class_desc) AS class_desc,
    MAX(class_price) AS class_price,
    MAX(num_people) AS num_people,
    MAX(facilities) AS facilities,
    MAX(floor) AS floor,
    MAX(b_room) AS b_room,
    MAX(b_img) AS b_img,
    MAX(b_desc) AS b_desc,
    MAX(b_date) AS b_date,
    MAX(b_time) AS b_time,
    MAX(b_need_equipment) AS b_need_equipment,
    MAX(b_price) AS b_price,
    MAX(status) AS status
FROM (
    -- Group by date from the booking table
    SELECT
        'Date' AS grouping_category,
        b.b_date AS grouping_column,
        ci.class_code,
        ci.class_title,
        ci.class_img,
        ci.class_desc,
        ci.class_price,
        ci.num_people,
        ci.facilities,
        ci.floor,
        b.b_room,
        b.b_img,
        b.b_desc,
        b.b_date,
        b.b_time,
        b.b_need_equipment,
        b.b_price,
        b.status
    FROM
        booking b
    JOIN
        coworking_info ci ON b.class_code = ci.class_code
    WHERE
        b.b_date IS NOT NULL

    UNION

    -- Select records from coworking_info where date is NULL
    SELECT
        'NoDate' AS grouping_category,
        NULL AS grouping_column,
        ci.class_code,
        ci.class_title,
        ci.class_img,
        ci.class_desc,
        ci.class_price,
        ci.num_people,
        ci.facilities,
        ci.floor,
        NULL AS b_room,
        NULL AS b_img,
        NULL AS b_desc,
        NULL AS b_date,
        NULL AS b_time,
        NULL AS b_need_equipment,
        NULL AS b_price,
        NULL AS status
    FROM
        coworking_info ci
    WHERE
        ci.class_code NOT IN (SELECT class_code FROM booking WHERE b_date IS NOT NULL)
) AS combined_result
WHERE grouping_column = '${date}'
GROUP BY grouping_category, grouping_column;
`, function (err, results) {
        if (err) {
            console.error('Error:', err);
            res.status(500).send({ error: true, message: 'Internal Server Error' });
            return;
        }

        if (!results[0]) {
            console.log(`No data found for date = ${date}`);
            res.status(404).send({ error: true, message: 'No data found for the specified date' });
        } else {
            console.log('Coworking info result:', JSON.stringify(results[0]));
            res.json(results[0]);
            console.log(`${results[0].grouping_column} Sending coworking info result for date = ${date}`);
        }
    });

});

router.post('/searchcoworking', (req, res) => {
    console.log("::Welcome to path search coworking::");
    console.log("---------------------------------");

    let class_title = req.body.name;
    let class_loca = req.body.location;
    let class_date = req.body.date;

    console.log("Search by title: " + class_title + "| Search by location: " + class_loca + "| Search by date: " + class_date);

    let queryString = `SELECT * FROM coworking_info WHERE class_title LIKE '%${class_title}%' AND 
                                                       class_loca LIKE '%${class_loca}%' AND
                                                       class_date LIKE '%${class_date}%';`;

    connection.query(queryString, (error, results) => {
        if (error) throw error;
        console.log(`${results.length} result(s) found`);
        console.log("---------------------------------");
        return res.send(results);
    });
});

// GET user information
router.get('/user_infos', function (req, res) {
    /* The command we want to select all data from the database. */
    connection.query('SELECT * FROM user', (err, results) => {
        if (err) throw err;
        return res.send({ error: false, data: results, message: 'User list.' });
    });
});

// TEST CASE:
// method: GET
// URL: http://localhost:3030/user_infos

// SELECT a USER
router.get('/user_infos/:user_code', function (req, res) {
    let user_code = req.params.user_code;
    if (!user_code) {
        return res.status(404).send({ error: true, message: 'Please provide user code id.' });
    }
    /* The command we want to select data from the database by using user_code. */
    connection.query('SELECT * FROM user where user_code=?', user_code, (err, results) => {
        if (err) throw err;
        res.send({ error: false, data: results[0], message: 'User retrieved' });
        console.log(`Sending user result of user_code = ${user_code}`);
    });
});


app.listen(process.env.PORT, function () {
    console.log("Server listening at Port " + process.env.PORT);
});

