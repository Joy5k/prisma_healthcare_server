import jwt, { JwtPayload, Secret } from "jsonwebtoken";
const generateToken = (payload: any, secrete: Secret, expiresIn: string) => {
  const token = jwt.sign(payload, secrete, {
    algorithm: "HS512",
    expiresIn,
  });
  return token;
};
const verifyToken = (token: string, secret: Secret) => {
 return    jwt.verify(token, secret) as JwtPayload


};
export const jwtHelpers = {
  generateToken,
  verifyToken,
};
