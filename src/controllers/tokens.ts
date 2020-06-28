import jsonwebtoken from 'jsonwebtoken';
import RefreshToken from '../mongo/models/tokens';

const JWT_EXPIRES_IN = 60 * 60; // 1 hours in seconds

export default {
  refresh: async (jwt: string): Promise<any> => {
    if (!jwt) {
      console.log('refreshToken', 'el jwt ingresado es nulo');
    }
    const refreshToken = await RefreshToken.findOne({ jwt });
    if (!refreshToken) {
      throw new Error('403');
    }

    const { payload } = refreshToken;

    const newJwt = await jsonwebtoken.sign(payload, process.env.SECRET!, {
      expiresIn: JWT_EXPIRES_IN
    });

    // updated the refreshToken
    refreshToken.jwt = newJwt;
    await refreshToken.save();
    //console.log('refreshToken new', refreshToken);
    return {
      token: newJwt,
      expiresIn: JWT_EXPIRES_IN,
      unit: 'seconds'
    };
  },

  newRefreshToken: async (jwt: string, payload: any): Promise<void> => {
    // create a new refreshToken
    await new RefreshToken({
      payload,
      jwt
    }).save();
  }
};
