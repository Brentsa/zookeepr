const fs = require('fs');
const {filterByQuery, findByID, createNewAnimal, validateAnimal} = require('../lib/animals');
const {animals} = require('../data/animals.json');

//Mocks the fs module and stops tests from writing to animals.json file
jest.mock('fs');

test("creates an animal object", ()=>{
    const animal = createNewAnimal({name:"Darlene", id: "jdkfjsldfj"}, animals);

    expect(animal.name).toBe("Darlene");
    expect(animal.id).toBe("jdkfjsldfj");
});

test("filter by query", ()=>{
    const startingAnimals = [
        {
            id: "2",
            name: "Erica",
            species: "gorilla",
            diet: "omnivore",
            personalityTraits: [
              "quirky",
              "rash"
            ]
        },
        {
            id: "3",
            name: "Noel",
            species: "bear",
            diet: "carnivore",
            personalityTraits: [
                "impish",
                "sassy",
                "brave"
            ]
        },
        {
            id: "4",
            name: "Coco",
            species: "penguin",
            diet: "herbivore",
            personalityTraits: [
                "loving",
                "goofy"
            ]
        }
    ];

    expect(filterByQuery({species: "gorilla"}, startingAnimals).length).toEqual(1);
});

test("validate personality traits", ()=>{
    const animal = {
        id: "2",
        name: "Erica",
        species: "gorilla",
        diet: "omnivore",
        personalityTraits: [
          "quirky",
          "rash"
        ]
    };

    const invalidAnimal = {
        id: "2",
        name: "Erica",
        species: "gorilla",
        diet: "omnivore"
    };

    expect(validateAnimal(animal)).toBeTruthy();
    expect(validateAnimal(invalidAnimal)).toBeFalsy();
});

test("find an animal by id", ()=>{
    const startingAnimals = [
        {
            id: "2",
            name: "Erica",
            species: "gorilla",
            diet: "omnivore",
            personalityTraits: [
              "quirky",
              "rash"
            ]
        },
        {
            id: "3",
            name: "Noel",
            species: "bear",
            diet: "carnivore",
            personalityTraits: [
                "impish",
                "sassy",
                "brave"
            ]
        },
        {
            id: "4",
            name: "Coco",
            species: "penguin",
            diet: "herbivore",
            personalityTraits: [
                "loving",
                "goofy"
            ]
        }
    ];

    expect(findByID(3, startingAnimals)).toEqual(startingAnimals[1]);
});