import express from "express";
import mongoose from "mongoose";
import { UserModule } from "./model/UserSchema.js";
import bcrypt from "bcrypt";
import cors from "cors";





const app = express();

const PORT = 5050;

app.use(express.json());

app.use(cors());

const MONGO_URI = 'mongodb+srv://mustafaimran077:mustafaimran077@cluster0.yecvvfl.mongodb.net/';

mongoose.connect(MONGO_URI).then(() => {
    console.log("MONGODB CONNECTED");

}).catch((err) => {
    console.log(err);

});

app.post("/api/signup", async (req, res) => {


  try {
      const { firstName, lastName, email, password } = req.body;

    if (!firstName || !lastName || !email || !password) {

        return res.status(400).json({
            message: "Required Fields are Empty",
            status: false,
        });


    };

    const encryptPassword = await bcrypt.hash(password,10);

    const userObj = {
        firstName, lastName, email, password:encryptPassword
    };

    const savedata = await UserModule.create(userObj);

    res.status(200).json({
        message: "create User"

    });
  } catch (error) {
    res.status(500).json({
        message:"Internal Server Error",
        error : error.message,
        
    });
  };


});


app.post("/api/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({
        message: "Required fields are missing",
        status: false,
      });
      return;
    }

    const getData = await UserModule.findOne({ email });

    console.log(getData);

    if (!getData) {
      res.json({
        message: "invalid credentials",
      });
      return;
    }

    const comparePassword = await bcrypt.compare(password, getData.password);

    console.log(comparePassword);

    if (!comparePassword) {
      res.json({
        message: "invalid credentials",
      });
      return;
    }

    res.json({
      message: "login successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error,
    });
  }
});

app.get("/", (req, res) => {

    res.json({
        Message: "server up",
    });
});

app.listen(PORT, () => {
    console.log("Server is Running");

})