const puzzleInput = require('./puzzleInput').puzzleInput;

const bagsRegulations = {}

function formatRegulation(regulations){    
    let regulationObject = {};
    let list = regulations[0].split(', ');
    list.forEach(regulation => {        
        let r = regulation.split(' ');        
        let key = r.slice(1,r.length -1).join(' ');        
        let count= r[0] === 'no' ? 1 : Number(r[0]);
        regulationObject[key] = count;       
    });
    return regulationObject;
}

function hasShinyGoldBag(obj){
    if(typeof obj !== 'object'){
        return false;
    }
    for (let key in obj) {
        if(key === 'shiny gold'){
            return true;
        }else{
            found = hasShinyGoldBag(bagsRegulations[key]);
            if (found) return found;
        }
    }
    return false;
}

function countBagsInside(obj){    
    let sum = 1;    
    for (const key in obj) {
        let target = key === 'other' ? 0 :countBagsInside(bagsRegulations[key]);
        sum += obj[key]*(target);   
    }    
    return sum
}

// Start part one
puzzleInput.split(/\n/g).forEach(line=>{
    let l = (line.split(' bags contain '))
    let key = l[0];
    let regulations = l.slice(1);
    bagsRegulations[key] = formatRegulation(regulations);      
})

let shinyGoldBagCount = 0;
for (const key in bagsRegulations) {
    if (hasShinyGoldBag(bagsRegulations[key])) {
        shinyGoldBagCount += 1;      
    }
}
 // Answer part one
console.log(`${shinyGoldBagCount} color bags can have at least one shiny gold bag`);

//Start part two
let bagsNeeded = countBagsInside(bagsRegulations['shiny gold']) - 1;
// Answer part two:
console.log(`one shiny gold bag needs to have ${bagsNeeded} bags inside`);

