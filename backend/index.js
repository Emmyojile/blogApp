require('dotenv').config();
const express = require('express')
const app = express();
const cors = require('cors');
const connectDB = require('./config/db');
const userRoutes = require('./routes/user');
const cookieParser = require('cookie-parser');

connectDB();

const corsOptions = {
  origin: process.env.Client_Url, // Update this with the allowed origins or set it to a specific origin
  methods: "GET, POST, PUT, DELETE", // Update with the allowed HTTP methods
  allowedHeaders: "Content-Type, Authorization", // Update with the allowed headers
  credentials: true, // Enable credentials if you're using cookies or other authentication methods
};
app.use(cors(corsOptions));

// app.use(
//   cors({
//     origin:"https://emmyojile-blogapp-client.onrender.com",
//     credentials: true,
//   })
// );
// app.options("*", cors());

// app.use(cors(
//     {
//       origin: ["https://emmyojile-blogapp-client.onrender.com"],
//       methods: ["GET", "POST", "PUT", "DELETE"],
//       credentials: true,
//     }
//   ))
// app.use(cors({credentials: true, origin:'*'})); 
// app.use(cors({credentials: true, origin:'https://emmyojile-blogapp-client.onrender.com'})); 
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false}));

app.use('/uploads', express.static(__dirname + '/uploads'))

app.use('/api/v1', userRoutes);
app.use('/', (req, res) =>{
    res.json("Blog Application Server")
});


app.listen(4000, () => {console.log(`Listening on port 4000`)});
