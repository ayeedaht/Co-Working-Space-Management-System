
const express = require('express');
const path = require('path');
const port = 3000
const app = express();
const router = express.Router();

app.use(router)
app.use(express.static(path.join(__dirname, 'public')));
router.use(express.json());
router.use(express.urlencoded({ extended: true }));

/*path to HomePage.html*/
router.get('/', (req, res) => {
    console.log('Request at /');
    res.sendFile(path.join(__dirname, '/public/html/Userlogin.html'))
})

router.get('/home', (req, res) => {
    console.log('Request at /');
    res.sendFile(path.join(__dirname, '/public/html/HomePage.html'))
})

/*path to Userlogin.html*/
router.get('/login', (req, res) => {
    console.log('Request at /login');
    res.sendFile(path.join(__dirname, '/public/html/Userlogin.html'))
})

/*path to User-account-management.html*/
router.get('/useracct', (req, res) => {
    console.log('Request at /userAcctManage');
    res.sendFile(path.join(__dirname, '/public/html/User-account-management.html'))
})

/*path to user.html*/
router.get('/user', (req, res) => {
    console.log('Request at /user');
    res.sendFile(path.join(__dirname, '/public/html/user.html'))
})

/*path to Product-management.html*/
router.get('/manage', (req, res) => {
    console.log('Request at /manage');
    res.sendFile(path.join(__dirname, '/public/html/Product-management.html'))
})

/*path to product.html*/
router.get('/product', (req, res) => {
    console.log('Request at /product');
    res.sendFile(path.join(__dirname, '/public/html/product.html'))
})

router.get('/booking', (req, res) => {
    console.log('Request at /booking');
    res.sendFile(path.join(__dirname, '/public/html/Booking.html'))
})

router.get('/view', (req, res) => {
    console.log('Request at /booking');
    res.sendFile(path.join(__dirname, '/public/html/View.html'))
})

app.get('/Booking.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'html', 'Booking.html'));
});

/*Form in Userlogin.html page will link to this
  If user submit the form in login page it will direct to this code.
  The value will send and in login in form will pass the code and password.*/
router.post('/login-submit', (req, res) => {
    console.log('Request at /login-submit');
    console.log("Login by " + req.body.code);//
    let email = req.body.email;
    let pass = req.body.password;

    /*we use fetch function with a method of POST to direct to 
      server at port 3030 with path /authentication. And we will 
      put the req.body of code and password in the JSON format*/
    fetch("http://localhost:3030/authentication", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: email,
            password: pass
        })
    })
        .then(response => response.json()) //after send the result, we wait for the response
        .then(data => {
            console.log(data)
            /* data that send back has 'exist' to indicate whether
               this account is exist or not. If it true it will go the
               manage page. It's mean if user can login, that mean that user 
               can access to manage the product as they are admin. If it not 
               it will go to path /login again to let user put the account again*/
            if (data.exist === "true") {
                res.redirect('/home');
            } else {
                res.redirect('/login');
            }
        })
        .catch(error => console.error(error));
})


router.post('/signup-submit', (req, res) => {
    console.log('Request at /signup-submit');
    console.log("Form submitted by " + req.body.code);

    /* Fetch to the server with port of 3030 and path newuser using the 'POST' method. 
       Keep the data that the user inputs in the form and send it to this port. */
    fetch("http://localhost:3030/newuser", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            fname: req.body.fname,
            lname: req.body.lname,
            email: req.body.email,  
            address: req.body.address,  
            phone_number: req.body.phone_number,  
            code: req.body.code,
            password: req.body.password,
            role: req.body.role
        })
    })
        .then(response => response.json())
        .then(data => {
            /* After signup, it will go to the login page */
            res.redirect('/login');
        })
        .catch(error => console.error(error));
});


router.post('/submit_booking', (req, res) => {
    console.log('Request at /submit_booking');
    console.log("Form submitted by " + req.body.classCode);
    console.log("Form submitted by " + JSON.stringify(req.body));

    fetch("http://localhost:3030/newbooking", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            title: req.body.coworking_title,
            img: req.body.coworking_img,
            desc: req.body.coworking_desc,
            price: req.body.coworking_price,
            people: req.body.coworking_people,
            floor: req.body.coworking_floor,
            facilities: req.body.coworking_facilities,
            classCode: req.body.classCode,
            date: req.body.date,
            time: req.body.time,
            needEquipment: req.body.needEquipment,
            equipment: req.body.equipment,
        })
    })
    .then(response => response.json())
    .then(data => {
        // Check if the response indicates success (you may need to customize this based on your server response)
        if (data.success == true) {
            // Redirect on the client side
            res.redirect('/home');
        } else {
            // Handle failure if needed
            console.error("Booking failed");
        }
    })
    .catch(error => console.error(error));
});

 
router.get('/getbooking', (req, res) => {
    console.log('Request at /getbooking');

    /* Fetch the material information from this port using the GET method.
       Update the URL to reflect the new path for material information. */
    fetch('http://localhost:3030/bookings', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            res.send(data);
        })
        .catch(error => console.error(error));
});


router.get('/getmaterials', (req, res) => {
    console.log('Request at /getmaterials');

    /* Fetch the material information from this port using the GET method.
       Update the URL to reflect the new path for material information. */
    fetch('http://localhost:3030/materials', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            res.send(data);
        })
        .catch(error => console.error(error));
});


router.get('/getcoworkinginfo', (req, res) => {
    console.log('Request at /getcoworkinginfo');

    /* We fetch the coworking information from this port using the GET method.
       Update the URL to reflect the new path for coworking information. */
    fetch('http://localhost:3030/coworking-info', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            res.send(data);
        })
        .catch(error => console.error(error));
});


/* This will happen when the user clicks the card to get only that information.
   This receives the classCode from the HomePage.html file */
   router.get('/getcoworkinginfo/:classCode', (req, res) => {
    const { classCode } = req.params;
    console.log(`Request at /getcoworkinginfo/${classCode}`);

    /* Fetch the data with GET method by this classCode */
    fetch(`http://localhost:3030/coworking-info/${classCode}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            res.send(data);
        })
        .catch(error => console.error(error));
});

router.get('/getcoworkingin/:date', (req, res) => {
    const { date } = req.params; // Change from classCode to date
    console.log(`Request at /getcoworkingin/${date}`);

    /* Fetch the data with GET method by this date */
    fetch(`http://localhost:3030/coworking-in/${date}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    })
        .then(response => response.json())
        .then(data => {
            console.log('Coworking info result:', JSON.stringify(data));

            console.log(data);
            res.send(data);
        })
        .catch(error => console.error(error));
});


/* This is used to get all users. It is used in AboutUs.html to display all the users we have. */
router.get('/getusers', (req, res) => {
    console.log('Request at /getusers');

    /* We fetch the data from this port that will send all users by using the GET method.
       And we don't send any query to this. */
    fetch('http://localhost:3030/user_infos', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            res.send(data.data); /** send the data to the AboutUs.html that fetches port 3000 with
                                  path of /user_infos */
        })
        .catch(error => console.error(error));
});

/** Same as ticket, when the user clicks the card, this will get the
 * information from the port of 3030 and passing the userCode to
 * find the information and send the response back to the user.
 */
router.get('/user_infos/:userCode', (req, res) => {
    const { userCode } = req.params;
    console.log(`Request at /user_infos/${userCode}`);
    fetch(`http://localhost:3030/user_infos/${userCode}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            res.send(data);
        })
        .catch(error => console.error(error));
});


/**/
app.listen(port, function () {
    console.log("Server listening at Port " + port);
});

