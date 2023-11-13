import mongoose from "mongoose";

const URI = "mongodb+srv://lllanosc1:yx8JIfL7zakMi2Xk@cluster0.zzetdhr.mongodb.net/ecommerce?retryWrites=true&w=majority";
const URI2 = "mongodb+srv://kevcourses:ZtzL3XjVLOnoIXLD@clusterkev2023.ktj0hec.mongodb.net/ecommerce?retryWrites=true&w=majority"
mongoose
    .connect(URI2)
    .then(() => console.log('Connected to DB'))
    .catch((error) => console.log(error))