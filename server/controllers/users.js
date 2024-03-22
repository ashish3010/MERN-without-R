const User = require('../models/user')

exports.deleteUser = async (req, res) => {
  const { email } = req.body
  await User.findOneAndDelete({ email })
  res.json({
    success: true,
    message: 'User deleted succesfully'
  })
}

exports.getAllUsers = async (req, res) => {
  let users = await User.find({})
  res.send({
    success: true,
    users
  })
}

exports.updateUser = async (req, res) => {
  const { email, contactNumber } = req.body
  let checkUser = await User.findOne({ email })

  if (checkUser) {
    const checkMobileNumber = contactNumber === checkUser.contact_number;
    if (checkMobileNumber) {
      let user = await User.findOneAndUpdate(
        { email },
        { $set: req.body },
        { new: true }
      )
      return res.send({
        success: true,
        user
      })
    } else {
      return res.status(400).json({ success: false, message: "Can't update mobile number" })
    }
  } else {
    return res.status(400).json({ success: false, message: 'Invalid action' })
  }
}