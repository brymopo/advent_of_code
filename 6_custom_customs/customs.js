let puzzleInput = require('./puzzleInput').puzzleInput;

let formattedInput = [];
let group = [];
let counter = 0;
let frequency = {};

// Answer part one
puzzleInput.split(/\n/g).forEach(line=>{
    if(line.length){
        group.push(line);        
         for(let i = 0; i < line.length; i++){                            
            if(!frequency.hasOwnProperty(line[i])){                
                counter++;
                frequency[line[i]] = 1;                
            }
        }        
    }else{ 
        formattedInput.push(group);       
        group = [];
        frequency = {};
    }
});

if(group.length){
    formattedInput.push(group);   
}

console.log(`Answer part one: ${counter}`);

// Answer part two

function findCommonAnswer(arr){
    let frequency = {};
    arr.forEach(line=>{
        line.split('').forEach(ltr=>{
            if(frequency.hasOwnProperty(ltr)){
                frequency[ltr]++;
            }else{
                frequency[ltr] = 1;
            }
        })
    })
    let result = [];
    for (const key in frequency) {
        if (frequency[key] === arr.length) {
            result.push(key)         
        }
    }
    return result.length;
}

counter = 0;

formattedInput.forEach(group=>{
    counter += findCommonAnswer(group);
})

console.log(`Answer part two: ${counter}`);

