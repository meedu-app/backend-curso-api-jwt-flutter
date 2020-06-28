import _ from 'lodash';
import Users from '../mongo/models/user';

// get the unser info from db
const info = async (id: string): Promise<any> => {
  const user = await Users.findById(id);
  if (!user) throw new Error('user not found');
  return _.omit(user.toObject(), 'password', '__v');
};

const avatar = async (userId: string, avatarPath: string): Promise<void> => {
  await Users.findByIdAndUpdate(userId, {
    $set: {
      avatar: avatarPath
    }
  });
};

export { info, avatar };
