const express =  require('express');
const credentials = require('./firebaseCredentials');

const app =  express();

app.get('/',(req,res) => {
    res.send("Hello world!");
});
app.listen(3000, () => { console.log("listening to 3000") });
