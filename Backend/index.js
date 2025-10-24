const express = require('express');
const app = express();
const adminRoute = require('./routes/adminRoutes.js');
const genericRoute = require('./routes/genericRoutes.js');
const dbConnect = require('./config/database.js');
const cors = require('cors');

app.use(cors());
app.use('/admin',adminRoute);
app.use('/',genericRoute);

app.get('/',function(req,res){
    res.status(200).json({
        data:"starttt",
    })
})

app.listen(3000);

