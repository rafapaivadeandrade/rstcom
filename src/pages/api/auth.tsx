import { NextApiRequest, NextApiResponse } from 'next';
import connect from '../../../utils/database';
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authConfig = require('../../config/auth.json');
import nc from 'next-connect';

function generateToken(params = {}) {
  return jwt.sign(params, authConfig.secret, {
    expiresIn: 86400,
  });
}
const handler = nc<NextApiRequest, NextApiResponse>()
  .get((req, res) => {
    res.send('Hello world');
  })
  .post(async (req, res) => {
    const { db } = await connect();
    try {
      const { email, password } = req.body;

      let userFound = await db.collection('users').findOne({ email: email });

      if (!userFound) return res.status(400).send({ error: 'User not found' });

      if (!(await bcrypt.compare(password, userFound.password)))
        return res.status(400).send({ error: 'Invalid password' });

      userFound.password = undefined;
      res.send({
        user: userFound,
        token: generateToken({ id: userFound.id }),
      });
    } catch (err) {
      res.status(400).json({ success: false });
    }
  });

export default handler;
