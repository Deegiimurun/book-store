import { Handler } from "express";
import { validationResult } from "express-validator";
import { User } from "../../entities/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { JWT_MAX_AGE, JWT_SECRET } from "../../constants";


const SignIn: Handler = async (req, res) => {
  const result = validationResult(req)
  if (!result.isEmpty()) {
    return res.status(400).send({ error: result.array()[0].msg });
  }

  const { username, password } = req.body;

  const user = await User.findOne({
    where: {
      username
    }
  });

  if (!user) {
    return res.status(400).send({ error: "User not found" });
  }

  if (!bcrypt.compareSync(password, user.password)) {
    res.status(400).send({ error: "Password does not match" });
  }


  delete user.password;
  const token = jwt.sign(
    { id: user.id, username },
    JWT_SECRET,
    {
      expiresIn: JWT_MAX_AGE,
    }
  );

  res.send({
    result:
      {
        user,
        token : {
          token,
          expiresIn: JWT_MAX_AGE / 60
        }
      }
  });
}

export { SignIn }
