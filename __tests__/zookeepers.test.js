const fs = require('fs')
const {filterByQuery, findByID, createNewZookeeper, validateZookeeper} = require('../lib/zookeepers');
const {zookeepers} = require('../data/zookeepers.json');

jest.mock('fs');

test('Create a zookeeper object.', ()=>{
    const zookeeper = createNewZookeeper(
        {
            id: "10",
            name: "Sean",
            age: 28,
            favoriteAnimal: "dolphin"
        }, 
        zookeepers
    );

    expect(Number(zookeeper.id)).toEqual(10);
    expect(zookeeper.name).toEqual("Sean");
    expect(zookeeper.age).toEqual(28);
    expect(zookeeper.favoriteAnimal).toEqual("dolphin");
});

test('Filter an array of zookeepers by query', ()=>{
    const zookeeperArray = [
        {
            id: "1",
            name: "Raksha",
            age: 31,
            favoriteAnimal: "penguin"
        },
        {
            id: "2",
            name: "Isabella",
            age: 67,
            favoriteAnimal: "bear"
        },
        {
            id: "3",
            name: "Brad",
            age: 22,
            favoriteAnimal: "coyote"
        }

    ];

    const filteredResults = filterByQuery({favoriteAnimal: "bear"}, zookeeperArray);

    expect(filteredResults[0]).toEqual(zookeeperArray[1]);
    expect(filteredResults.length).toEqual(1);
});

test('Find a zookeeper by their ID', ()=>{
    const zookeeperArray = [
        {
            id: "1",
            name: "Raksha",
            age: 31,
            favoriteAnimal: "penguin"
        },
        {
            id: "2",
            name: "Isabella",
            age: 67,
            favoriteAnimal: "bear"
        },
        {
            id: "3",
            name: "Brad",
            age: 22,
            favoriteAnimal: "coyote"
        }
    ];

    const filteredResult = findByID('3', zookeeperArray);

    expect(filteredResult).toEqual(zookeeperArray[2]);
});

test('Validate the data entry of a zookeeper', ()=>{
    const invalidZookeeper = { id: "10", name: "Sean", age: 28};
    const validZookeeper = { id: "10", name: "Sean", age: 28, favoriteAnimal: "donkey"};

    expect(validateZookeeper(invalidZookeeper)).toBeFalsy();
    expect(validateZookeeper(validZookeeper)).toBeTruthy();
});