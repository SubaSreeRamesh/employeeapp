const express=require('express');
// const path=require('path');
const app=new express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');

app.set('view engine', 'ejs');
app.set('views', './views'); // Assuming your views are in the "views" folder
// app.set('views', path.join(__dirname, 'views')); 

const morgan=require('morgan');
require('dotenv').config();

dotenv.config();
app.use(express.static('public')); 
app.use(morgan('dev'));
require('./db/hosconnection');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
// app.use(express.static(path.join(__dirname, 'public')));

const PORT=process.env.PORT;










const employeeRoutes = require('./routes/employeeRoutes');// Use employee routes
app.use('/employees', employeeRoutes); // Now, all employee routes will be prefixed with /employees


// Home route redirects to employees page
app.get('/', (req, res) => {
    res.redirect('/employees');
});




app.listen(PORT,()=>{
    console.log(`Server is running on PORT ${PORT}`);
})