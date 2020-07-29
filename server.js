const fs = require ('fs')
const express = require ('express')
const path = require ('path')
const bodyParser = require ('body-parser');
//const { stringify } = require('querystring');
const port = 3000
const app = express()

let data = JSON.parse(fs.readFileSync('isi.json', 'utf8'));

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())

app.get('/', (req, res) => res.render('list', {data}))
app.get('/add', (req, res) => res.render('add'))
app.get('/edit', (req, res) => res.render('edit'))

app.post('/add', (req,res) => {
    let dat =req.body;
    data.push(dat)
    fs.writeFileSync('isi.json', JSON.stringify(data))
    res.redirect('/')
})

app.get('/delete/:id', (req, res) => {
    let id = req.params.id;
    data.splice(id, 1);
    fs.writeFileSync('isi.json', JSON.stringify(data))
    res.redirect('/');
})

app.get('/edit/:id', (req, res) => {
    let id = req.params.id;
    res.render('edit', {item : {...data[id]}, id}) //memecah data pada id
    console.log('edit',{item : {...data[id]}, id});   
})

app.post('/edit/:id', (req, res) => {
    // console.log(req.params.id, req.body)
    let id = req.params.id
    let edit = {
        string: req.body.string,
        integer: req.body.integer,
        float: req.body.float,
        date: req.body.date,
        boolean: req.body.boolean
    }
    data.splice(id, 1, edit)
    fs.writeFileSync('isi.json', JSON.stringify(data))
    res.redirect('/')
})

app.listen(port, () => console.log(`aplikasi berjalan di atas port ${port}`))