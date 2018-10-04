const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');

const app = express();

//DB
mongoose.connect('mongodb://user:kulitkerang1@ds050077.mlab.com:50077/gelora', { useNewUrlParser: true }, (error) => {
    if (error) {
        console.log('Ada error woy!');
        return
    }
    console.log('Berhasil connect ke db! Horee');
});
const peserta = mongoose.model('peserta', {
        nourut: String,
        nama: String
    })
    //end of DB

//BodyParser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
//end of BodyParser Middleware

//Set Static Path
app.use(express.static(path.join(__dirname, 'public')));
//end of Static Path

//View Engine
app.set('view engine', 'hbs'); //for hbs
app.set('views', path.join(__dirname, 'views'));
//end of View Engine

// Pages
app.get('/peserta', (req, res) => {
        peserta
            .find()
            .then((allPeserta) => {
                res.render('peserta', {
                    peserta: allPeserta
                })

            })
            .catch(error => {
                res.send(error)
            })
    })
    //end of Pages

//function
app.post('/add', (req, res) => {
        console.log(req.body);
        peserta.create({
                nourut: req.body.nourut,
                nama: req.body.nama
            })
            .then((hasil) => {
                console.log(hasil);
                res.redirect('/peserta')
            })
            .catch((error) => {
                console.log(error);
            })
    })
    //end of function

app.get('*', (req, res) => {
    res.send('page ga ada')
})

app.listen(3000, () => {
    console.log('Server Started on Port 3000...');
})