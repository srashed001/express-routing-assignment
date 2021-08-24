function mean(nums){
    let sum = nums.reduce((acc, curr) => acc+curr);
    return sum / nums.length;
};


function median(nums){
    let sortedNums = nums.sort((a,b)=> a - b);
    const length = sortedNums.length;
    if (length % 2 === 0){
        return (sortedNums[length/2] + sortedNums[length/2 - 1])/2;
    } else {
        return sortedNums[Math.floor(length/2)];
    }
};

function mode(nums){
    let map = new Map();
    let mostFreq = 0;
    let mode = []
    let noDups = Array.from(new Set(nums));
    noDups.forEach(num => {
        let freq = nums.filter(el => el === num);
        if (freq.length >= mostFreq){
            mostFreq = freq.length; 
        }
        map.set(num, freq.length)
    })
    for (let [k,v] of map.entries()){
        if(v === mostFreq){
            mode.push(k)
        }
    }
    return mode.length === 1 ? mode[0] : mode
};


module.exports = {
    mean, 
    median,
    mode,
}