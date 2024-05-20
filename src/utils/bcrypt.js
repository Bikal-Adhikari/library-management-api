import bcrypt from "bcryptjs";

export const hashPassword = (plainPass) => {
  return bcrypt.hashSync(plainPass);
};

export const comparePassword = (plainPass, hashPassword) => {
  return bcrypt.compareSync(plainPass, hashPassword);
};
