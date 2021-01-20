import NodeRSA from 'node-rsa';

export async function generateApiPrivateKey() {
  const encrypter = new NodeRSA({ b: 1024 });

  const publicKey = encrypter.exportKey('public');
  const privateKey = encrypter.exportKey('private');

  return {
    publicKey: String(publicKey),
    privateKey: String(privateKey),
  };
}

export async function some() {
  return 'hahah';
}
