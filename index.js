// minimal package for creating web server
const express = require("express")
const api = express()
const port = 4000;

// url for entry point
// 1. req
// 2. res 
// 3. next
api.get("/message", (req, res, next) => {
    console.log("start req...")
    //query params
    const { product, amount } = req.query;
    if (!product || !amount) return res.send("You are wrong! , please try again!!")
    console.log(product + " " + amount)
    return res.send(`User Details: ${product} , ${amount}`);
})

api.listen(port, (err) => {
    if (err) console.log(err.message)
    console.log(`Api listening to port: ${port} `)
})

