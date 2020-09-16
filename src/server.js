const express = require('express');
const path = require('path');

const app = express();

app.use(express.static(__dirname));
app.all('*',function(req,res){
  res.status(200).sendFile(path.join(__dirname+'/index.html'));
});

app.listen(process.env.PORT || 7070);
