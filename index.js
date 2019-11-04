// minimal package for creating web server
const express = require("express")
const data = require("./data.json")
const logger = require("jbapp-logger");
const { isValidDates } = require("./utils")
const api = express()

// const currentDate = moment(1572886068504);
// console.log(currentDate.format("DD-MM-YY hh:mm:ss"))
// console.log(currentDate.isValid())
const port = 4000;

// url for entry point
// 1. req
// 2. res 
// 3. next



api.get("/message", (req, res, next) => {
    console.log("start req...", req.ip)
    //query params
    const { userName, password } = req.query;
    if (!userName || !password) return res.send("You are wrong! , please try again!!")
    console.log(userName + " " + password)
    return res.send(`User Details: ${userName} , ${password}`);
})

api.get("/booking", (req, res, next) => {
    const { from, to, dest } = req.query;
    if (!isValidDates([from, to])) return res.send("error")
    if (!from || !dest || !to) return res.send("You are wrong! , please try again!!")
    return res.send(`You booked: ${dest} ,  from: ${from} to: ${to}`);
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

