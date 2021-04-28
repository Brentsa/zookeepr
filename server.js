const {animals} = require('./data/animals.json');
const express = require('express');
const fs = require('fs');
const path = require('path')

const app = express();
//parse incoming string or array data
app.use(express.urlencoded({extended:true}));
//parse incoming JSON data
app.use(express.json());

const PORT = process.env.PORT || 3001;

function filterByQuery(query, animalsArray){
    let filteredResults = animalsArray;
    let personalityTraitsArray = [];

    if(query.personalityTraits){
        if(typeof query.personalityTraits === 'string'){
            personalityTraitsArray = [query.personalityTraits];
        }
        else{
            personalityTraitsArray = query.personalityTraits;
        }

        personalityTraitsArray.forEach(trait =>{
            filteredResults = filteredResults.filter(animal => animal.personalityTraits.indexOf(trait) !== -1);
        })
    }

    if(query.diet){
        filteredResults = filteredResults.filter(animal => animal.diet === query.diet);
    }

    if(query.species){
        filteredResults = filteredResults.filter(animal => animal.species === query.species);
    }

    if(query.name){
        filteredResults = filteredResults.filter(animal => animal.name === query.name);
    }

    return filteredResults;
}

function findByID(id, animalsArray){
    for(var i = 0; i < animalsArray.length; i++){
        if(animalsArray[i].id == id){
            return animalsArray[i];
        }
    }
}

function createNewAnimal(body, animalsArray){
    const animal = body;
    animalsArray.push(animal);

    fs.writeFileSync(path.join(__dirname, './data/animals.json'), JSON.stringify({animals: animalsArray}, null, 2));

    return animal;
}

function validateAnimal(animal){

    if(!animal.name || typeof animal.name !== 'string'){return false}
    if(!animal.species || typeof animal.species !== 'string'){return false}
    if(!animal.diet || typeof animal.diet !== 'string'){return false}
    if(!animal.personalityTraits || !Array.isArray(animal.personalityTraits)){return false}

    return true;
}

app.get('/api/animals', (req, res)=>{
    let results = animals;
    
    if(req.query){
        results = filterByQuery(req.query, results);
    }
    
    res.json(results);
})

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

app.listen(PORT, () =>{
    console.log(`API server now on port ${PORT}!`);
});

