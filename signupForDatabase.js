const mongoose = require("mongoose")
mongoose.connect("mongodb+srv://admin:TboK15G3Zpx9T0VM@cluster0.wvyjj.mongodb.net/")
.then(() => console.log('Connected to MongoDB'))
   .catch(err => console.error('Error connecting to MongoDB:', err));
const express=require("express")
const app=express()
app.use(express.json())
app.listen(3000)
const User=mongoose.model("User",{
    name:String,
    email:String,
    password:String,
});
app.post("/signup",async function (req,res) {
    const { name, email, password } = req.body;
    const existingUser=await User.findOne({email:email})
    if(existingUser){
        return res.status(400).send("user already exists")
    }
    const newUser=new User({
        name:name,
        email:email,
        password:password
    })
    newUser.save()
    res.json({
        "msg":"user created successfully"
    })
})