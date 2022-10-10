const User=require('../Models/User')
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.SECRET_KEY;

const signup = async (req, res) =>{

    const {name,email,contactno,role,dateofjoin,department,password} = req.body;
    try {

        const user = await User.findOne({ email : email});
        if(user){
            return res.status(400).json({message: "User already exists"});
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const result = await User.create({
            email: email,
            password: hashedPassword,
            name:name,
            contactno:contactno,
            role:role,
            dateofjoin:dateofjoin,
            department:department

        });

        const token = jwt.sign({email : result.email, id : result._id }, SECRET_KEY);
        res.status(201).json({user: result, token: token});
        
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Something went wrong"});
    }

}

const signin = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      const user = await User.findOne({ email });
      if (!user) {
        return res
          .status(400)
          .json({ msg: "User with this email does not exist!" });
      }
  
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ msg: "Incorrect password." });
      }
  
      const token = jwt.sign({ id: user._id }, SECRET_KEY);
      res.json({ token, ...user._doc });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }

  const getAllUsers = async (req, res) => {
    try {
      const users = await User.find({role:"NORMAL"});
      res.status(200).json(users);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Something went wrong" });
    }
  };

  const getUserDataID=async(req,res)=>{
    try {
      const user = await User.findById(req.params.id);
      const token=jwt.sign({email:user.email,id:user._id},SECRET_KEY);
      res.status(200).json({
        user:user,
        token:token
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Something went wrong" });
    }
  }

module.exports.signup=signup;
module.exports.signin=signin;
module.exports.getAllUsers=getAllUsers
module.exports.getUserDataID=getUserDataID