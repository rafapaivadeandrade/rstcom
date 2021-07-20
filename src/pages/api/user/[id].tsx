import { NextApiRequest, NextApiResponse } from 'next';
import connect from '../../../../utils/database';
import nc from 'next-connect';
const bcrypt = require('bcrypt');
import { ObjectId } from 'mongodb';

const handler = nc<NextApiRequest, NextApiResponse>()
  .get(async (_, res) => {
    const { db } = await connect();

    try {
      const users = await db.collection('users').find().toArray();

      res.status(200).json(users);
    } catch (err) {
      res.status(400).json({ success: false });
    }
  })
  .post(async (req, res) => {
    const { name, email, password } = req.body;
    const { db } = await connect();
    const user = await db.collection('users').findOne({ email });
    if (user) {
      return res.status(400).json({ message: 'User  already exists' });
    }
    const hash = await bcrypt.hash(password, 10);

    const response = await db.collection('users').insertOne({
      name,
      email,
      password: hash.toString(),
      todolist: [],
    });

    res.status(200).json(response);
  })
  .put(async (req, res) => {
    const { db } = await connect();
    try {
      const { name, email, password } = req.body;
      const id = req.query.id as string;

      let userFound = await db
        .collection('users')
        .findOne({ _id: new ObjectId(id) });

      if (!userFound) return res.status(400).send({ error: 'User not found' });

      const hash = await bcrypt.hash(password, 10);

      const newUser = await db.collection('users').updateOne(
        { _id: new ObjectId(id) },
        {
          $set: {
            name,
            email,
            password: hash.toString(),
          },
        }
      );

      res.send({ newUser });
    } catch (err) {
      res.status(400).json({ success: false });
    }
  });

export default handler;
