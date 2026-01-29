import jwt from "jsonwebtoken";
//jwt payload
const JWT_SECRET = process.env.JWT_SECRET!;

export function signJwt(payload: object) {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: "24h", // or 7d
  });
}

// jwt verfication
export function verifyJwt(token: string) {
  try {
    return jwt.verify(token, JWT_SECRET) as {
      sub: string;
      email: string;
      role: string;
      iat: number;
      exp: number;
    };
  } catch (err) {
    console.log(err)
    throw new Error("Invalid token");
  }
}