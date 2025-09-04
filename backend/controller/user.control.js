const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const usermodel = require("../models/user.model");

// exports.register = async (req, res) => {
//   try {
//     const { email, password,username } = req.body;

//     // const hashPassword = bcrypt.hashSync(password)
//     const hashPassword = bcrypt.hashSync(password, 10);


//     const user = await usermodel.create({ email, password :hashPassword,username});

//     res.status(201).json({ success: true, user: email });
//   } catch (error) {
//     console.log(error);
    
//   }
// };


// exports.login = async (req, res) => {
//   try {
//     const { email, password,username } = req.body;

//     const user = await usermodel.findOne({ email });

//     // if (!user) return res.status(401).json({message:"invalid email",success: true}) 
//     if (!user) return res.status(401).json({ success: false, message:"invalid email" });
// if (!isPasswordMatch) return res.status(401).json({ success: false, message:"invalid password" });


//     const isPasswordMatch = bcrypt.compareSync(password, user.password);

//     // if (!isPasswordMatch)
//     //   return res.status(401).json({message:"invalid passsword",success: true})

//     const { password: pass, ...rest } = user._doc;

//     const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY);

//     // const option = {
//     //   expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
//     //   httpOnly: true,
//     //   sameSite: "none",
//     //   secure: "false",
//     // };
//     const option = {
//   expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
//   httpOnly: true,
//   sameSite: "none",
//   secure: false, // boolean
// };


//     res.cookie("token", token, option);

//     res.status(200).json({ success: true, user: rest });
//   } catch (error) {
//     console.log("error in login",error);
    
//   }
// };

exports.register = async (req, res) => {
  try {
    const { email, password, username } = req.body;

    const existingUser = await usermodel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, message: "Email already exists" });
    }

    const hashPassword = bcrypt.hashSync(password, 10);

    const user = await usermodel.create({ email, password: hashPassword, username });

    res.status(201).json({ success: true, message: "User registered successfully", user: email });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await usermodel.findOne({ email });

    if (!user) return res.status(401).json({ success: false, message: "Invalid email" });

    const isPasswordMatch = bcrypt.compareSync(password, user.password);

    if (!isPasswordMatch)
      return res.status(401).json({ success: false, message: "Invalid password" });

    const { password: pass, ...rest } = user._doc;

    const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });

    const option = {
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
      httpOnly: true,
      sameSite: "none",
      secure: false, // change to true in production with HTTPS
    };

    res.cookie("token", token, option);

    res.status(200).json({ success: true, message: "Login successful", user: rest });
  } catch (error) {
    console.log("error in login", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};


exports.single = async (req, res) => {
  try {
    const id = req.body.id;
    const user = await usermodel.findById(id);
    if (!user) {
      const error = {
        status: 404,
        message: "User not found",
      };
      return res.json(error);
    } else {
      const success = {
        message: "User found",
        status: 200,
        data: user,
      };
      return res.json(success);
    }
  } catch (err) {
    const error = {
      status: err.status,
      message: err.message,
    };
    return res.json(error);
  }
};

exports.all = async (req, res) => {
  try {
    const users = await usermodel.find();
    const success = {
      message: "Users found",
      status: 200,
      data: users,
    };
    return res.json(success);
  } catch (err) {
    const error = {
      status: err.status,
      message: err.message,
    };
    return res.json(error);
  }
};

exports.update = async (req, res) => {
  try {
    const id = req.body._id;
    const user = await usermodel.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!user) {
      const error = {
        status: 404,
        message: "User not found",
      };
      return res.json(error);
    } else {
      const success = {
        message: "User updated",
        status: 200,
        data: user,
      };
      return res.json(success);
    }
  } catch (err) {
    const error = {
      status: err.status,
      message: err.message,
    };
    return res.json(error);
  }
};

exports.delete = async (req, res) => {
  try {
    const id = req.query.id;
    console.log("id: ", id);
    const user = await usermodel.findByIdAndDelete(id);
    if (!user) {
      const error = {
        status: 404,
        message: "user not found",
      };
      return res.json(error);
    } else {
      const success = {
        message: "User deleted",
        status: 200,
      };
      return res.json(success);
    }
  } catch (err) {
    const error = {
      status: err.status,
      message: err.message,
    };
    return res.json(error);
  }
};
