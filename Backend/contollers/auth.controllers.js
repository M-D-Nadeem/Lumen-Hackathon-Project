
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


exports.register = async (req, res, next) => {
  try {
    const { firstName, lastName, email, password, confirmPassword } = req.body;

   
    if (!firstName || !lastName || !email || !password || !confirmPassword) {
      return res.status(400).json({ message: "All fields are required" });
    }
    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }
    if (password.length < 8) {
      return res.status(400).json({ message: "Password must be at least 8 characters" });
    }

    
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "Email already registered" });

    
    const hashedPassword = await bcrypt.hash(password, 10);

    
    const newUser = new User({ firstName, lastName, email, password: hashedPassword });
    await newUser.save();

   
    res.status(201).json({ message: "Account created successfully" });
  } catch (err) {
    next(err);
  }
};


exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    
    if (!email || !password) return res.status(400).json({ message: "All fields required" });

    
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: "Invalid credentials" });

    
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

    
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" } // 1-day expiry
    );

   
    res.json({
      message: "Login successful",
      token,
      user: { id: user._id, email: user.email, role: user.role }
    });
  } catch (err) {
    next(err);
  }
};
