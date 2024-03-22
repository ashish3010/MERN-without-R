const User = require('../models/user')
const jwt = require('jsonwebtoken')

exports.signUp = async (req, res) => {
  const { email, contactNumber, userName, password } = req.body
  const checkEmail = await User.findOne({ email })
  const checkContactNumber = await User.findOne({ contact_number: contactNumber })
  if (checkContactNumber || checkEmail) {
    if (checkContactNumber) {
      return res.status(400).json({ success: false, message: 'User already exists with the same mobile number' })
    }
    if (checkEmail) {
      return res.status(400).json({ success: false, message: 'User already exists with the same email address' })
    }
  }

  if (typeof contactNumber !== 'string' || contactNumber.length !== 10) {
    return res.status(400).json({ success: false, message: 'Invalid mobile number' })
  }

  const user = new User({
    name: userName,
    email,
    contact_number: contactNumber,
    password,
  })

  await user.save()

  const data = {
    user: {
      id: user.id
    }
  }

  const token = jwt.sign(data, 'secret_ecom')
  res.send({
    success: true,
    message: "Successfully Registered",
    contactNumber,
    token
  })
}

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email })
  if (user) {
    const checkPassword = password === user.password
    if (checkPassword) {
      const data = {
        user: {
          id: user.id
        }
      }

      const token = jwt.sign(data, 'secret_ecom')
      res.send({
        success: true,
        user,
        token
      })
    } else {
      res.status(400).json({ success: false, message: 'Invalid Username or Password' })
    }
  } else {
    res.status(400).json({ success: false, message: "User not found with the email" })
  }
}