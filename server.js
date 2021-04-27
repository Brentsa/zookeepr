const {animals} = require('./data/animals.json');
const express = require('express');

const app = express();
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

app.listen(PORT, () =>{
    console.log(`API server now on port ${PORT}!`);
});