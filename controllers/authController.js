import { user } from "../model/users.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const handleLogin = async (req, res) => {
  const { email, password } = req.body;
  
  if (!email || !password) {
    return res.status(400).json('incorrect form submission');
  }

  const result = await user.findOne({ email: email })
  // console.log(result);

  if (result && (await bcrypt.compare(password, result.password))) {
    const token = jwt.sign(
      { user_id: result._id, email },
      process.env.TOKEN_KEY,
      { expiresIn: "2h", },
    )
    result.token = token;
    return res.status(200).json(result);
  } else {
    return res.status(400).json('Wrong credentials');
  }

}

const handleRegister = async (req, res) => {
  const { email, password, name } = req.body;

  if (!email || !password || !name) {
    return res.status(400).json('incorrect form submission');
  }

  const result = await user.find({ email: email });

  if (result.length === 0) {
    const encryptedPassword = await bcrypt.hash(password, 10);
    const _user = await user.create({ name, email: email.toLowerCase(), password: encryptedPassword });

    const token = jwt.sign(
      { user_id: _user._id, email: email.toLowerCase(), },
      process.env.TOKEN_KEY,
      { expiresIn: "2h", },
    );
    _user.token = token;
    return res.status(200).json(_user);
  } else {
    return res.status(401).json('user already exists');
  }
}

export { handleLogin, handleRegister }