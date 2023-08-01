require("dotenv").config()
const express = require("express");

const mongoose = require('mongoose')
const errorHandler = require("./middleware/errorhandler");

mongoose.connect("mongodb+srv://kuchbhi:kuchbhi@cluster0.qbheb2a.mongodb.net/?retryWrites=true&w=majority",{
    useNewUrlParser:true,
    useUnifiedTopology:true,
})
        .then(()=>{console.log(
            "Database connected"
        )})
        .catch((e)=>{console.log(e)})

const app = express();

const port = process.env.PORT || 5000; 

app.use(express.json());
// app.use(errorHandler);


app.use("/api/contacts" , require('./routes/contactRoutes'));
app.use("/api/users" , require('./routes/userRoutes'));

app.listen(port, () => {
    console.log(`server runnning on port ${port}`);
});
