var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
const mongoose = require('mongoose');

var app = express();

mongoose.connect('mongodb://user:kulitkerang1@ds050077.mlab.com:50077/gelora', { useNewUrlParser: true }, (error) => {
    if (error) {
        console.log('Ada error woy!');
        return
    }
    console.log('Berhasil connect ke db! Horee');
});

//DB
const Peserta = mongoose.model('Peserta', { nourut: String, nama: String });

Peserta.create({ nourut: '1801', nama: 'SMAN 15 Kota Tangerang' }, (err, result) => {
        if (err) {
            console.log('====================================');
            console.log(err);
            console.log('====================================');
        }

        console.log(result);

    })
    //end of DB

//BodyParser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//Set Static Path
app.use(express.static(path.join(__dirname, 'public')));

//View Engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Pages
app.get('/', function(req, res) {
        res.render('landingPage');
    })
    // End of Pages

app.listen(3000, function() {
    console.log('Server Started on Port 3000...');
});