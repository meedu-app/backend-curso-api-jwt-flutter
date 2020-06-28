import bcrypt from 'bcrypt';
import validator from 'validator';
import _ from 'lodash';

import Users from '../mongo/models/user';

// create a new user and save into db
const register = async (data: {
  username: string;
  email: string;
  password: string;
}): Promise<any> => {
  const { username, email } = data;
  let { password } = data;

  if (!validator.isEmail(email)) throw new Error('invalid email');

  password = await bcrypt.hash(password, 10);

  const user = await Users.create({
    username,
    email,
    password
  });
  return _.omit(user.toObject(), 'password', '__v');
};

// login user and creates a jwt token
const login = async (data: {
  email: string;
  password: string;
}): Promise<any> => {
  const { email, password } = data;

  const user = await Users.findOne({ email });
  if (!user)
    throw {
      code: 404,
      message: `The user with the email ${email} was not found`
    };

  const isValidPassword = await bcrypt.compare(password, user.password);
  if (isValidPassword) {
    return _.omit(user.toObject(), 'password', '__v');
  }
  throw { code: 403, message: 'Invalid password' };
};

export { register, login };
