import jwt from 'jsonwebtoken';

import config from '../common/config';

type Payload = Exclude<Parameters<typeof jwt.sign>[0], string | Buffer>;
type Token = string;

const JWT = {
  to<P extends Payload>(payload: P): Promise<Token> {
    const promise = new Promise<string>((resolve, reject) => {
      jwt.sign(
        payload,
        config.SECRET,
        {
          expiresIn: '1 day',
        },
        (error, encoded) => {
          if (encoded === undefined) {
            reject(error);
            return;
          }

          resolve(encoded);
        }
      );
    });

    return promise;
  },

  from<P extends Payload>(token: Token): Promise<P> {
    const promise = new Promise<P>((resolve, reject) => {
      jwt.verify(token, config.SECRET, (error, decoded) => {
        if (decoded === undefined) {
          reject(error);
          return;
        }

        resolve(decoded as P);
      });
    });

    return promise;
  },
} as const;

const { to: toJWT, from: fromJWT } = JWT;

export { Payload, Token, toJWT, fromJWT };
export default JWT;
