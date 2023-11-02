import mongoose from "mongoose";

const URI = "mongodb+srv://kevcourses:ZtzL3XjVLOnoIXLD@clusterkev2023.ktj0hec.mongodb.net/coderBackEnd?retryWrites=true&w=majority"

mongoose.connect(URI)
.then(()=>console.log("Connected to mongoose"))
.catch(error => console.log(error))