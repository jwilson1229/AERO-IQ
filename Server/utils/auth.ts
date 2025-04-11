import jwt from 'jsonwebtoken';


const secret = process.env.JWT_SECRET_KEY || 'supersecret';
const expiration = '2h'

export function signToken({_id, username, email }) {
    const payload = { _id, username, email };
    return jwt.sign({ data: payload }, secret, {expiresIn: expiration});
}

export function authMiddleware({ req }) {
    let token = req.headers.authorization || '';
    if(token.startsWith('Bearer')) token = token.slice(7);


    try {
        const { data } = jwt.verifiy(token, secret);
        req.user = data;
    } catch (error) {
        return req;
    }
}
