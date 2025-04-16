import jwt from 'jsonwebtoken';


const secret = process.env.JWT_SECRET_KEY || 'supersecret';
const expiration = '2h'

export function signToken({ _id, username, email }:any):any {
  const payload = { _id, username, email };
  return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
}

export const authMiddleware = ({ req }: any) => {
  let token = req.body.token || req.query.token || req.headers.authorization;

  if (req.headers.authorization) {
    token = token.split(' ').pop().trim();
  }

  if (!token) {
    return req;
  }

  try {
    const { data }: any = jwt.verify(token, secret, { maxAge: expiration });

    req.user = data;
  } catch (err) {

    console.log('Invalid token');
  }


  return req;
};