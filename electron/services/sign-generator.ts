import { PrivateKey } from "@fidm/x509";
import jwt from "jsonwebtoken";

export default (args: any) => {
  const { privateKey, string } = args;

  try {
    const private_k = PrivateKey.fromPEM(privateKey);

    const signature = private_k.sign(Buffer.from(string), "sha256");

    const jwtToken = jwt.sign(
      { signature: signature.toString("base64") },
      privateKey,
      { expiresIn: "10000ms" }
    );

    return {
      signature: jwtToken,
    };
  } catch (error) {
    return error;
  }
};
