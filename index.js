const express = require("express");
const app = express();
const importData = require("./data.json");
const website = require("./website/index.html");
let port = process.env.PORT || 3000;
app.get("/data", (req,res) => {
    res.send(importData);
})
app.get("/",(req,res) => {
    res.send(website);
})
app.listen(port, () => {
    console.log("test");
})