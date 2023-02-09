const express = require('express');
const cors =  require('cors');
const serverRouter = require('./Routes');


const app =  express();
app.use(cors({credentials: true, origin: true}));
app.options("*",cors());
app.use(express.json());

app.use(serverRouter);

app.listen(8080, () => { console.log("listening to 8080") });
module.exports = app;
