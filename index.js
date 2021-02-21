const express = require("express");
const app = express();
const importData = require("./data.json");
//website
const path = require('path');
const router = express.Router();


let port = process.env.PORT || 3000;
app.get("/data", (req,res) => {
    res.send(importData);
})
router.get('/',function(req,res){
  res.sendFile(path.join(__dirname+'/index.html'));
  //__dirname : It will resolve to your project folder.
});
app.use("/websiteStatic", express.static('./websiteStatic'));

app.use('/', router);
app.listen(port, () => {
    console.log("test");
})