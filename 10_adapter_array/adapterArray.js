
let { data }= require('./puzzleInput');

// Getting data inputs ready

let highest = -Infinity;

let joltages = {};
let distributions = {
    1:0,
    2:0,
    3:1, // Problem definition, device joltage = highest + 3
    combinations:0
}

const adapters = data.split(/\n/g).map(adapter =>{
    joltage = parseInt(adapter);
    joltages[adapter] = 1
    highest = Math.max(highest,joltage)    
    return joltage
});

// Part One

function getIncrementValue(joltage){
    // Outputs the next joltage value to evaluate if it's on the adapters array.

    let delta = 1 ;
    if(!joltages.hasOwnProperty(joltage + 1)){
        delta = joltages.hasOwnProperty(joltage + 2)? 2 : 3;
    }
    let increment = joltage + delta;
    distributions[delta]++;
    return increment
}

function PartOne(arr,joltage = 0, index=0){    
    for(let i = index; i < arr.length ; i++){
        joltage = getIncrementValue(joltage);
    }
    return joltage;
}

PartOne(adapters); // Execute part one
let answerPart1 = distributions[1] * distributions[3];

console.log(`What is the number of 1-jolt differences multiplied by the number of 3-jolt differences?
Answer:${answerPart1}
`)

// Part Two
let frequencies = {};
let seen = {};

function getDecrementValue(joltage){
    // Outputs the next joltage value to evaluate.    

    if(joltage === 1) return 0
    let delta = -1;
    if(!joltages.hasOwnProperty(joltage - 1)){
        delta = joltages.hasOwnProperty(joltage - 2)? -2 : -3;
    }
    let increment = joltage + delta;   
    return increment
}

function validChoices(joltage){
    // Outputs an array of nodes starting from given input.
    let valid = []
    for(let i = 1; i < 4;i++){
        let choice = joltage + i;        
        if(joltages.hasOwnProperty(choice)){
            valid.push(choice)
        }
    }    
    return valid
}

frequencies[0] = validChoices(0)
adapters.forEach(joltage => {
    frequencies[joltage] = validChoices(joltage);
});      

function partTwo(){    
    let current = highest;
    let count = 1; // Highest joltage node count is always one per problem definition.
    while(current >= 0){
        // Loop down to 0        
        let valid = frequencies[current]; // Get nodes starting from current      
        valid.forEach(option =>{
            count += seen[option] // Get node count of all nodes from current; Empty array for the highest joltage.
        })        
        seen[current] = count; // Save node count of current joltage
        if(current === 0) return count;
        current = getDecrementValue(current);
        count = 0
    }    
}

let answerPart2 = partTwo(highest)

console.log(`What is the total number of distinct ways you can arrange the adapters to connect the charging outlet to your device?
Answer: There are ${answerPart2} possible ways of arranging the adapters
`);


