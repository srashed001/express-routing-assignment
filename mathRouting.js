const express = require('express');
const {mean, median, mode} = require('./math');
const NaNError = require('./nanError');

const app = express()

app.use(express.json())

let nums; 

app.use((req, res, next) => {
    if (!req.query.nums){
        const e = new NaNError("Nums query is required", 400)
        next(e) 
    } 
    let query = req.query.nums.split(",");
    query = query.filter(el => el !== "")
    if (query.every(el => !isNaN(el))){
        nums = query.map(el => parseInt(el))
        next()
    } 
    else {
        let nan = query.filter( el => isNaN(el))
        const e = new NaNError(`${nan} is not a number`, 400)
        next(e)
    }
});

app.get('/all', (req, res) => {
    let meanRes = mean(nums);
    let medianRes = median(nums);
    let modeRes = mode(nums);
    return res.json({ response: {
        operation: "all", 
        mean: meanRes, 
        median: medianRes,
        mode: modeRes
    }})    
})

app.get('/mean', (req, res) => {
    let result = mean(nums);
    return res.json({ response: {
        operation: "mean", 
        value: result
    }})    
})

app.get('/median', (req, res) => {
    let result = median(nums);
    return res.json({ response: {
        operation: "median", 
        value: result
    }})    
})

app.get('/mode', (req, res) => {
    let result = mode(nums);
    return res.json({ response: {
        operation: "mode", 
        value: result
    }})    
})


app.use((err, req, res, next) => {
    let status = err.status || 500;
    let msg = err.msg; 
    return res.status(status).json({err: {msg, status}})
})

app.listen(3000, ()=> {
    console.log("Server running on port 3000")
})