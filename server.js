const {animals} = require('./data/animals.json');
const express = require('express');
const path = require('path');
const {filterByQuery, findByID, createNewAnimal, validateAnimal} = require('./lib/animals');

const app = express();
//parse incoming string or array data
app.use(express.urlencoded({extended:true}));
//parse incoming JSON data
app.use(express.json());
//serves static assets from the public directory
app.use(express.static('public'));

const PORT = process.env.PORT || 3001;

app.get('/api/animals', (req, res)=>{
    let results = animals;
    
    if(req.query){
        results = filterByQuery(req.query, results);
    }
    
    res.json(results);
});

app.get('/api/animals/:id', (req, res) =>{
    let result = findByID(req.params.id, animals);

    if(result){
        res.json(result);
    }
    else{
        res.send(404);
    }
    
});

app.post('/api/animals', (req, res) =>{
    req.body.id = animals.length.toString();

    if(!validateAnimal(req.body)){
        res.status(400).send("Animal submission was not properly formatted.");
    }
    else{
        const animal = createNewAnimal(req.body, animals);
        res.json(req.body);
    }
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.get('/animals', (req, res) =>{
    res.sendFile(path.join(__dirname, "./public/animals.html"));
});

app.get('/zookeepers', (req, res) =>{
    res.sendFile(path.join(__dirname, "./public/zookeepers.html"));
});

app.get('*', (req, res) =>{
    res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.listen(PORT, () =>{
    console.log(`API server now on port ${PORT}!`);
});

