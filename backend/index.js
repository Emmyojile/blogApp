require('dotenv').config();
const express = require('express')
const app = express();
const cors = require('cors');
const connectDB = require('./config/db');
const userRoutes = require('./routes/user');
const cookieParser = require('cookie-parser');

connectDB();

app.use(cors({credentials: true, origin:'http://localhost:5173'})); 
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false}));

app.use('/uploads', express.static(__dirname + '/uploads'))

app.use('/api/v1', userRoutes);
app.use('/', (req, res) =>{
    res.json("Blog Application Server")
});


app.listen(4000, () => {console.log(`Listening on port 4000`)});