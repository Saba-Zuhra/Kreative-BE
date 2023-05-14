import { cash } from "../model/cash.js";
import { sendMail } from "../utils/email.js";

const handleCash = async (req, res) => {
  const { amount } = req.body;
  const { user_id, email } = req.user;

  if (!amount) {
    return res.status(400).json("incorrect form submission");
  }

  const result = await cash.create({
    userId: user_id,
    amount,
    date: new Date(),
  });

  if (result) {
    await sendMail(
      email,
      "Payment Successful",
      `<h3>You have paid ${amount} from your account</h3>`
    );
    return res.status(201).json(result);
  } else {
    return res.status(401).json("cash not created");
  }
};

const handleGetCash = async (req, res) => {
  const { user_id } = req.user;

  if (!user_id) {
    return res.status(400).json("incorrect form submission");
  }

  const result = await cash.find({ userId: user_id });

  if (result) {
    return res.status(201).json(result);
  } else {
    return res.status(401).json("cash not found");
  }
};

export { handleCash, handleGetCash };
