// minimal package for creating web server
require("dotenv").config()
const express = require("express")
const data = require("./data.json")
const logger = require("jbapp-logger");
const { isValidDates } = require("./utils")
const bodyParser = require("body-parser");
const api = express()
console.log(process.env.API_KEY)
const port = process.env.PORT || 5000
const users = []




api.use(bodyParser.json())
api.use((req, res, next) => {
    const { key } = req.query
    const { API_KEY } = process.env;
    if (key === process.env.API_KEY) return next();
    res.send("User is not Authorized")
})


api.use("/", (req, res, next) => {
    // 1. res is accessible
    // 2. req is accessible
    // 3. next function execution
    // console.log("this is the first middleware...")
    req.middleware = "apiKey1234";
    // console.log(`inside middleware 1:  ${req.path}`)
    next();
})
api.use("/", (req, res, next) => {
    // console.log(`inside middleware 2:  ${req.path}`)
    next();
})
api.get("/message", (req, res, next) => {
    // console.log(req.middleware)
    // console.log("start req...", req.ip)
    //query params
    const { userName, password } = req.query;
    if (!userName || !password) return res.send("You are wrong! , please try again!!")
    // console.log(userName + " " + password)
    return res.send(`User Details: ${userName} , ${password}`);
})
api.use("/booking", (req, res, next) => {
    const { from, to } = req.query;
    if (!isValidDates([from, to])) return res.send("error")
    next();
})
api.get("/booking/flight", (req, res, next) => {
    // console.log(req.middleware)
    const { from, to, dest } = req.query;
    // if (!isValidDates([from, to])) return res.send("error")
    if (!from || !dest || !to) return res.send("You are wrong! , please try again!!")
    return res.send(`You booked: ${dest} ,  from: ${from} to: ${to}`);
})
api.get("/booking/vacation", (req, res, next) => {
    // console.log(req.middleware)
    const { from, to, dest } = req.query;
    // if (!isValidDates([from, to])) return res.send("error")
    if (!from || !dest || !to) return res.send("You are wrong! , please try again!!")
    return res.send(`You booked: ${dest} ,  from: ${from} to: ${to}`);
})


api.post("/users", (req, res, next) => {
    const { userName, age, password } = req.body
    users.push({ userName, age, password })
    res.send(`Registration succeeded ${userName} ${age} ${password}`)
})

api.get("/users", (req, res, next) => {
    res.json(users)
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

