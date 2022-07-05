import jsonwebtoken from 'jsonwebtoken';

import _ from 'lodash';
import { Application } from 'express';
import * as auth from '../controllers/auth';
import * as profile from '../controllers/profile';

import tokens from '../controllers/tokens';

import { isLogin } from '../middlewares/isLogin';

import uploader from '../middlewares/uploader';

const EXPIRES_IN = 60 * 60; // 1 hour

export default (app: Application): void => {
  app.get('/', (req, res) => {
    res.send('meedu.app 🥶');
  });

  app.post('/api/v1/register', async (req, res) => {
    try {
      const response = await auth.register(req.body);
      const payload = { id: response._id };
      const token = await jsonwebtoken.sign(payload, process.env.SECRET!, {
        expiresIn: EXPIRES_IN
      });
      // console.log('data', payload);
      await tokens.newRefreshToken(token, payload);
      res.status(200).send({
        token,
        expiresIn: EXPIRES_IN
      });
    } catch (e: any) {
      // console.log(e);
      if (e.errors) {
        let duplicatedValues = [] as string[];
        if (e.errors.email) {
          duplicatedValues.push('email');
        }
        if (e.errors.username) {
          duplicatedValues.push('username');
        }

        res
          .status(409)
          .send({ message: e.message, duplicatedFields: duplicatedValues });
        return;
      }

      res.status(500).send({ message: e.message });
    }
  });

  app.post('/api/v1/login', async (req, res) => {
    try {
      const response = await auth.login(req.body);
      const payload = { id: response._id };
      const token = await jsonwebtoken.sign(payload, process.env.SECRET!, {
        expiresIn: EXPIRES_IN
      });

      await tokens.newRefreshToken(token, payload);
      res.status(200).send({
        token,
        expiresIn: EXPIRES_IN
      });
    } catch (error: any) {
      // console.log(error);
      res.status(error.code || 403).send({ message: error.message });
    }
  });

  app.get('/api/v1/user-info', isLogin, async (req, res) => {
    try {
      console.log('userId', req.userId!);
      const response = await profile.info(req.userId!);
      res.status(200).send(response);
    } catch (error: any) {
      res.status(500).send({ message: error.message });
    }
  });

  app.post(
    '/api/v1/update-avatar',
    isLogin,
    uploader.single('attachment'),
    async (req, res) => {
      try {
        const { file } = req;
        if (!file) {
          throw new Error('Please upload a file');
        }
        await profile.avatar(req.userId!, req.filePath!);
        res.status(200).send(req.filePath);
      } catch (error: any) {
        // console.log(error);
        res.status(500).send({ message: error.message });
      }
    }
  );

  // create a new jwt token for an especific user by Id
  app.post('/api/v1/refresh-token', async (req, res) => {
    try {
      const { token } = req.headers;
      const data = await tokens.refresh(token as string);
      if (!data) throw new Error('invalid refreshToken');
      console.log('token refrescado');
      res.status(200).send(data);
    } catch (error: any) {
      // console.log('error refresh-token', error);
      if (error.message === '403') {
        res.status(403).send({ message: 'invalid token' });
      } else {
        res.status(403).send({ message: error.message });
      }
    }
  });
};
