import { NextApiRequest, NextApiResponse } from 'next';
import { ObjectId } from 'mongodb';
import connect from '../../../../utils/database';
import nc from 'next-connect';

const handler = nc<NextApiRequest, NextApiResponse>()
  .get(async (req, res) => {
    const { db } = await connect();
    try {
      const id = req.query.id as string;

      let userFound = await db
        .collection('users')
        .findOne({ _id: new ObjectId(id) });

      if (!userFound) return res.status(400).send({ error: 'User not found' });

      const user = await db
        .collection('users')
        .find({
          _id: new ObjectId(id),
        })
        .toArray();

      res.send({ user });
    } catch (err) {
      res.status(400).json({ success: false });
    }
  })
  .post(async (req, res) => {
    const { db } = await connect();
    try {
      const { list, id } = req.body;
      const uID = req.query.id as string;

      let userFound = await db
        .collection('users')
        .findOne({ _id: new ObjectId(uID) });

      if (!userFound) return res.status(400).send({ error: 'User not found' });

      const newUser = await db.collection('users').updateOne(
        { _id: new ObjectId(uID) },
        {
          $push: {
            todolist: { todo: list, id: new ObjectId(id) },
          },
        }
      );
      res.send({ newUser });
    } catch (err) {
      res.status(400).json({ success: false });
    }
  })
  .delete(async (req, res) => {
    const { db } = await connect();
    try {
      const id = req.query.id as string;
      const todoId = req.body;

      await db.collection('users').updateOne(
        { _id: new ObjectId(id) },
        {
          $pull: {
            todolist: {
              id: new ObjectId(todoId.id),
            },
          },
        }
      );

      res.status(200);
    } catch (err) {
      res.status(400).json({ success: false });
    }
  });

export default handler;
