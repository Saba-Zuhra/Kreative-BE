import { user } from "../model/users.js";

const getProfile = async (req, res) => {
  const { user_id } = req.user;

  if (!user_id) {
    return res.status(400).json('incorrect form submission');
  }

  const result = await user.find({ _id: user_id });

  if (result) {
    return res.status(201).json(result);
  } else {
    return res.status(401).json('user not found');
  }
}

const updateProfile = async (req, res) => {
  const { user_id } = req.user;

  if (!user_id) {
    return res.status(400).json('incorrect form submission');
  }

  let result = undefined;  
  if (req.body.name && req.body.password) {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    result = await user.updateOne({ _id: user_id }, { name: req.body.name, password: hashedPassword });
  }
  else if (req.body.password) {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    result = await user.updateOne({ _id: user_id }, { password: hashedPassword });
  } else if (req.body.name) {
    result = await user.updateOne({ _id: user_id }, { name: req.body.name });
  }

  if (result) {
    return res.status(201).json(result);
  } else {
    return res.status(401).json('user not found');
  }
}

export { getProfile, updateProfile };