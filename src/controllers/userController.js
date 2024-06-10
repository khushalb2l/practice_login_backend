import User from "../models/userSchema.js";

// register a new user

export const userRegister = async (req, res) => {
  try {
    //getting info from request body
    const { email, password } = req.body;

    //check database for existance of user
    let user = await User.findOne({ email });
    if (user) {
      res.status(400).json({
        message: "User already exists!",
      });
    }
    //new user creation
    user = new User({ email, password });

    //saving to database
    await user.save();

    const token = user.generateToken();

    res.status(201).json({
      token,
      user: { _id: user._id, email: user.email },
      message: "User registered succesfully!",
    });
  } catch (err) {
    console.log("error====>", err);
    res.status(500).json({
      message: "User registeration problem",
    });
  }
};

export const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: "User not found, please register!",
      });
    }

    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      return res.status(401).json({
        message: "Incorrect password!",
      });
    }

    const token = user.generateToken();
    res.status(200).json({
      token,
      user: { _id: user._id, email: user.email },
      message: "Login successfull!",
    });
  } catch (err) {
    res.status(500).json({
      message: "Problem while login!",
    });
  }
};
