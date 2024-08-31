const express=require("express");
const app=express();
const zod =require("zod");
const schema=zod.array(zod.number());
// const schema=zod.object({
//     email:zod.string(),
//     country:zod.literal("IN").or(zod.literal("US")),
//     kidneys:zod.array(zod.number())
// })     




app.listen(3000,()=>{
    console.log("listening on port 3000");
})
app.use(express.json());
function userMiddleware(req,res,next){
    const username=req.headers.username
    const password=req.headers.password
    if(!(username==="aman"&&password==="pass")){
        res.status(400).json({
            "msg":"wrong inputs"
        })
    }else{
        next();
    }
}
app.get("/",userMiddleware,(req,res)=>{
    const kidneys=req.body.kidneys;
    //using zod for input validation
    // const kidneyLength=kidneys.length;
    // res.send("your have "+kidneyLength+" kidneys")
    const response=schema.safeParse(kidneys);
    if(!response.success){
        res.status(411).json({
            "msg":"wrong inputs"
        })
    }else{
        res.send({
            response
        })
    }
    
})
//global catches
// app.use((err,req,res,next)=>{
//     res.json({
//         msg:"error in the input"
//     })
// })