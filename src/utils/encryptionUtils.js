// encryptionUtils.js
import JSEncrypt from 'jsencrypt';

async function encryptData(data, key) {
  const privateKey = `-----BEGIN RSA PRIVATE KEY-----
  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
  -----END RSA PRIVATE KEY-----
  `;

  if (typeof window === 'undefined') {
    global.window = {}; // Faking the window object

    const jsEncryptModule = await import('jsencrypt');
    const encrypt = new jsEncryptModule.JSEncrypt();

    const encryptor = new JSEncrypt();
    encryptor.setPublicKey(key);

    // Encrypt the data using the server's public key
    const encrypted = encryptor.encrypt(data);

    encrypt.setPublicKey(key);
    return encrypted;
  } else {
    const jsEncryptModule = await import('jsencrypt');
    const encrypt = new jsEncryptModule.JSEncrypt();
    encrypt.setPublicKey(key);
    console.log('encry pted data');
    console.log(encrypt.encrypt(data));

    const encryptor = new JSEncrypt();
    encryptor.setPublicKey(key);

    // Encrypt the data using the server's public key
    const encrypted = encryptor.encrypt(data);
    console.log('encrypted', encrypted);

    const decrypt = new jsEncryptModule.JSEncrypt();
    decrypt.setPrivateKey(privateKey);
    console.log('encry pted data');
    const decode = `oBKvFKuDoxWCyn01s18diZFgyn/a9SbnKJF4VePRfpHNwN3mvkgDXW6Fd2U40ewcHYiDcutWIaxioH6+elhwH0xZRyUyvzRdg0QEL59PIaTWHzhezMsc3sbqXIp3L1pEvFGtaP1sW8uFLUGJW1c8qQHTPJzI4UChjrKta3Mowc0X3//KSewKvE1IhVnw+VSkeTLwGgaoTKOk1wHXnd9pMur/g9k2vl7p9nvhgpQ3pLCiLgzD1sYuwLK+N37qPAI5zpvAv+j87aDPVBV+NTfp6xbFjeYhAKp5rBzjpfzrPxV1rXS6gFOkRi/f4UxCkszeQRyKISrE/KkhDn/paGz2OvzKkJeywGfdiZVh7nTGhbD7IG7GVfHKQnVS9xg1jo7bWyPLOg/LwXW8fyFMdzbmU1p4zUaHvrf5W1rbc80k33QqHC3Cs1mFTDZ4v+ZfpZUp9pNk9EXG24BU5ERF6s06H1vFWG34mUlV7tqc2ecNAdFH3aUkRiaYWzbcdz3mW3a5yvgNbC0I2sLkSVylrze4U21g2meQFmxHv28RB+bPYOTp/F7WcsjK0ahKcEDdZMumUao6lYPoJQxAnycARJHWsqei6M6skR6fz7zn8SxdIKSBs+5OqROldrjTm+edDsjOYY435i2OedbQI1RqbJGqY8GyrltPsNOgm4DK0b4kUZM=`;
    // console.log(decrypt.decrypt(decode));
    const encryptors = new JSEncrypt();
    encryptor.setPublicKey(key);

    // Encrypt the data using the server's public key
    const encrypteds = encryptors.encrypt(data);

    encrypt.setPublicKey(key);
    return encrypteds;
  }
}

export default encryptData;
