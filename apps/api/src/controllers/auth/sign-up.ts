import { Handler } from "express";
import bcrypt from "bcryptjs";
import { validationResult } from "express-validator";
import { User } from "../../entities/User";
import jwt from 'jsonwebtoken';
import { JWT_MAX_AGE, JWT_SECRET } from "../../constants";


const SignUp: Handler = async (req, res) => {
  const result = validationResult(req)

  if (!result.isEmpty()) {
    return res.status(400).send({ error: result.array()[0].msg });
  }

  const { username, password } = req.body;

  let user = await User.findOne({
    where: {
      username
    }
  });

  if (user) {
    return res.status(400).send({ error: "User exists" });
  }

  const hashedPassword = bcrypt.hashSync(password, 10);

  user = await User.save({
    username,
    password: hashedPassword,
  })

  delete user.password;

  const token = jwt.sign(
    { id: user.id, username },
    JWT_SECRET,
    {
      expiresIn: JWT_MAX_AGE,
    }
  );

  res.cookie("jwt", token, {
    httpOnly: true,
    maxAge: JWT_MAX_AGE * 1000,
  });

  res.send({ result: user })
}

export { SignUp }
