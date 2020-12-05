const boardingPasses = require('./data').formattedInput;

function decodeBinarySeat(seat, direction='row',size=127){
    let lower = 0;
    let upper = size; 
    let candidateSeat = Math.floor((upper - lower)/2);     
    [...seat.toLowerCase()].forEach(location =>{        
        if((direction==='row' && location === 'f') || (direction==='column' && location === 'l')){
            // Take the lower half
            upper = candidateSeat;
            candidateSeat = Math.floor((upper - lower)/2 + lower);

        }else if((direction==='row' && location === 'b') || (direction==='column' && location === 'r')){
            // Take the upper half
            lower = candidateSeat + 1;
            candidateSeat = Math.floor((upper - lower)/2 + lower);            
        }
    })
    return candidateSeat   
}

function getSeatId(seatCode){
    let rows = decodeBinarySeat(seatCode.slice(0,7));
    let columns = decodeBinarySeat(seatCode.slice(7),'column','7');
    let seatId = (rows*8) + columns;
    return seatId
}

function getLowestHighestMap(data){
    let highest = -Infinity;
    let lowest = Infinity;
    let seatIds = {};
    data.forEach(boardingPass=>{
        let currentId = getSeatId(boardingPass);
        highest = Math.max(highest,currentId);
        lowest = Math.min(lowest,currentId);
        seatIds[currentId] = boardingPass;
    })
    return [highest,lowest,seatIds];
}

function getHighestSeatId(data){
    let highest = -Infinity;
        data.forEach(boardingPass=>{
        let seatId = getSeatId(boardingPass);
        highest = Math.max(highest,seatId);        
    })
    return highest;
}

function findMissingSeat(highest,lowest,allIds){
    let candidates = [];
    for(let row = 0; row < 128; row++){
        // Rows
        for(let column = 0; column < 8; column++){
            //Columns
            let candidateSeatId = (row*8) + column;
            if(candidateSeatId === highest){
                row = 128;
                column = 8;
            }
            if (lowest < candidateSeatId < highest){
                if(!allIds[candidateSeatId] && (allIds[candidateSeatId + 1] && allIds[candidateSeatId - 1])){
                    candidates.push(candidateSeatId);
                }
            }
        }
    }
    return candidates;
}

// Answer Part 1
getHighestSeatId(boardingPasses);

// Answer Part 2
let [highestId,lowestId,allIds] = getLowestHighestMap(boardingPasses);

let candidates = findMissingSeat(highestId,lowestId,allIds);

console.log(candidates);