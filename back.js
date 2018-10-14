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
})

const pesertaSchema = mongoose.Schema({
    nourut: { type: String, require: true, max: 100 },
    nama: { type: String, require: true, max: 100 },
    ketepatan: { type: Number, require: true, max: 5 },
    minket: { type: Number, require: true, max: 5 },
    kompleksitas: { type: Number, require: true, max: 5 },
    minkom: { type: Number, require: true, max: 5 },
    durasi: { type: Number, require: true, max: 5 },
    mindur: { type: Number, require: true, max: 5 },
    total: { type: Number, require: true, max: 5 }
})

const adminSchema = mongoose.Schema({
    username: { type: String, require: true, max: 10 },
    password: { type: String, require: true, max: 10 }
})

const peserta = mongoose.model('peserta', pesertaSchema)
const admin = mongoose.model('admin', adminSchema)

//end of DB

//BodyParser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
//end of BodyParser Middleware

//Set Static Path
app.use(express.static(path.join(__dirname, 'public')));
//end of Static Path

//View Engine
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));
//end of View Engine

// Pages
app.get('/', (req, res) => {
    peserta
        .find()
        .then((allPeserta) => {
            res.render('landingPage', {
                peserta: allPeserta
            })

        })
        .catch(error => {
            res.send(error)
        })
})
app.get('/admin', (req, res) => {
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
app.get('/kelolaAdmin', (req, res) => {
    admin
        .find()
        .then((allAdmin) => {
            res.render('kelolaAdmin', {
                admin: allAdmin
            })

        })
        .catch(error => {
            res.send(error)
        })
})
app.get('/nilai1', (req, res) => {
    peserta
        .find()
        .then((allPeserta) => {
            res.render('nilai1', {
                peserta: allPeserta
            })
        })
        .catch(error => {
            res.send(error)
        })
})
app.get('/nilai2', (req, res) => {
    peserta
        .find()
        .then((allPeserta) => {
            res.render('nilai2', {
                peserta: allPeserta
            })

        })
        .catch(error => {
            res.send(error)
        })
})
app.get('/nilai3', (req, res) => {
    peserta
        .find()
        .then((allPeserta) => {
            res.render('nilai3', {
                peserta: allPeserta
            })

        })
        .catch(error => {
            res.send(error)
        })
})

//end of Pages

//function
//create
app.post('/addAdmin', (req, res) => {
    admin.create({
            username: req.body.username,
            password: req.body.password
        })
        .then((hasil) => {
            res.redirect('/kelolaAdmin')
        })
        .catch((error) => {
            console.log(error);
        })

    res.redirect("/kelolaAdmin")
})
app.post('/addPeserta', (req, res) => {
    peserta.create({
            nourut: req.body.nourut,
            nama: req.body.nama
        })
        .then((hasil) => {
            res.redirect('/admin')
        })
        .catch((error) => {
            console.log(error);
        })

    res.redirect("/admin")
})

//update


//delete
app.delete('/deletePeserta/:id', (req, res) => {
    peserta.findByIdAndRemove(req.params.id, function(err) {
        if (err) return next(err);
        res.send('delete berhasil');
    })
})
app.delete('/deleteAdmin/:id', (req, res) => {
    admin.findByIdAndRemove(req.params.id, function(err) {
        if (err) return next(err);
        res.send('delete berhasil');
    })
})

//end of function

app.get('*', (req, res) => {
    res.send('halaman ga ada chuy')
})

app.listen(3000, () => {
    console.log('Server Started on Port 3000...');
})