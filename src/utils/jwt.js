import JWT from "jsonwebtoken";

// create access jwt

export const signAccessJWT = (payload) => {
  return JWT.sign(payload, process.env.ACCESS_JWT_SECRET);
};

// verify access jwt

// create refresh jwt

// verify refresh jwt
