const express = require("express");
const app = express();
const importData = require("./data.json");
let port = process.env.PORT || 3000;
app.get("/data", (req,res) => {
    res.send(importData);
})
app.listen(port, () => {
    console.log("test");
})