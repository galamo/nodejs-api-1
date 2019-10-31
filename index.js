// minimal package for creating web server
const express = require("express")
const data = require("./data.json")
const logger = require("jbapp-logger");
const api = express()

const port = 4000;

// url for entry point
// 1. req
// 2. res 
// 3. next
api.get("/message", (req, res, next) => {
    console.log("start req...", req.ip)
    //query params
    const { product, amount } = req.query;
    if (!product || !amount) return res.send("You are wrong! , please try again!!")
    console.log(product + " " + amount)
    return res.send(`User Details: ${product} , ${amount}`);
})

api.get("/register-to-class", (req, res, next) => {

    const { userName } = req.query;
    if (!userName) return res.send("Something went wrong!!")
    logger.writeToFileSync("./log.txt", userName)
    // user send file to recive content
    //download to download the file
    return res.download("C:\\Users\\Jbt\\Desktop\\Gal amouyal\\nodejs\\app\\api\\log.txt")
})

api.listen(port, (err) => {
    if (err) console.log(err.message)
    console.log(`Api listening to port: ${port} `)
})

