const express = require('express');

var app = express();

app.get('/', (req, res) => {
    res.send({
        Name: 'Daniel', 
        Hobbies: [
            'Reading',
            'Hiking',
            'video-games'
        ]
    });
});

app.get('/about', (req, res) => {
    res.send('That\'s all about the app');
});

app.get('/bad', (req, res) => {
    res.send({
        errorMessage: 'Couldn\'t connect to the web servers'
    });
});



app.use(express.static(__dirname + '/non-public'));
    

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
