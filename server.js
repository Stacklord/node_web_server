const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;
var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');


app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`

    console.log(log);
    fs.appendFile('server.log', log + '\n', (err) => {
        if (err) {
            console.log('Unable to append file');
        }
    });
    next();
}); 

// app.use((req, res, next) => {
//     res.render('maintenance.hbs')
// });

app.use(express.static(__dirname + '/public'));


// app.get('/', (req, res) => {
//     res.send('Hello Xpress!');
// });
hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});



app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'The About Page',
        pageDetails: 'Some Text Here',

    });
});

app.get('/', (req, res) => {
    res.render('home.hbs', {
        pageTitle: 'The Home Page',
        welcome_comment: 'Welcome to my website',
        pageDetails: 'Some Text Here'
    });
});


// res.send({
//     Name: 'Bamidele',
//     talents: [
//         'reading',
//         'football'
//     ]
// });


// app.get('/about', (req, res) => {
//     res.send('About Page')
// });


app.get('/bad', (req, res) => {
    res.send({
    errorMessage: 'Unable to finish this request'
});
});
        


app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});

// console.log(__dirname + '/views/partials');


// app.use((req, res, next) => {
//     var now = new Date().toString();
//     var log = `${now}: ${req.method} ${req.url}`
//     console.log(log);
//     // fs.appendFile('server.log', log);
//     next();
// });
