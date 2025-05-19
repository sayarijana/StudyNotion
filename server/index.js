
const express = require("express");
const app = express();

const userRoutes = require("./routes/User");
const profileRoutes = require("./routes/Profile");
const paymentRoutes = require("./routes/Payment");
const courseRoutes = require("./routes/Course");
const contactUsRoute = require("./routes/Contact");

const database = require("./config/database");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const {cloudinaryConnect} = require("./config/cloudinary");
const fileUpload = require("express-fileupload");
// const dotenv = require("dotenv");

require("dotenv").config();
// dotenv.config();
const port = process.env.PORT || 4000;

//db connection
database.dbConnect();
//middleware
app.use(express.json());
app.use(cookieParser());

//frontend url
app.use(
    cors({
    origin: [
          "https://studynotion-frontend-kappa-peach.vercel.app",
          "https://studynotion-frontend-hqhi9ekyl-sayari-janas-projects.vercel.app",
          "https://studynotion-frontend-git-main-sayari-janas-projects.vercel.app"
        ],
       credentials:true
    })
);

app.use(
    fileUpload(
        {
            useTempFiles:true,
            tempFileDir:"/tmp"
        }
    )
);

//cloudinary connection
cloudinaryConnect();

//routes
app.use("/api/v1/auth",userRoutes);
app.use("/api/v1/profile",profileRoutes);
app.use("/api/v1/course",courseRoutes);
app.use("/api/v1/payment",paymentRoutes);
app.use("/api/v1/reach",contactUsRoute);

app.get("/", (req,res)=>{
    return res.json({
        success:true,
        message:"youre server is up and running"
    })
});

//activate

app.listen(port, ()=>{
    console.log(`App is running at ${port}`);
});