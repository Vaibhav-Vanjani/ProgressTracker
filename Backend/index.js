const express = require('express');
const app = express();
const adminRoute = require('./routes/adminRoutes.js');
const genericRoute = require('./routes/genericRoutes.js');
const dbConnect = require('./config/database.js');
const cors = require('cors');
const cookieParser = require('cookie-parser');

app.use(cookieParser());
app.use(cors({
  origin: 'http://localhost:5173', // frontend origin
  credentials: true // allow cookies to be sent
}));
app.use('/admin',adminRoute);
app.use('/',genericRoute);


app.get('/',function(req,res){
    res.status(200).json({
        data:"starttt",
    })
})

app.listen(3000);

