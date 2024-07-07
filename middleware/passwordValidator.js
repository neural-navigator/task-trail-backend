const passwordValidator = (req, res, next) => {
    const { password } = req.body;
  
    // Implement your password validation logic here
    if (password.length < 6) {
      return res.status(400).json({ message: 'Password must be at least 6 characters long' });
    }
  
    next();
  };
  
  module.exports = passwordValidator;
  