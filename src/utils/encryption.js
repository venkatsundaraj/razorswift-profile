import forge from 'node-forge'; // Import the necessary library for server-side encryption

export const encryptData = (publicKey, data) => {
  const publicKeys = forge.pki.publicKeyFromPem(
    process.env.NEXT_PUBLIC_ENCRYPT_KEY_SINGLE
  );
  // console.log(process.env.NEXT_PUBLIC_SECRET_MESSAGE);
  const encrypted = publicKeys.encrypt(
    process.env.NEXT_PUBLIC_SECRET_MESSAGE,
    'RSA-OAEP',
    {
      md: forge.md.sha512.create(),
      mgf1: forge.mgf1.create(),
    }
  );
  const encryptedBase64 = forge.util.encode64(encrypted);
  // console.log('data', encryptedBase64);

  return encryptedBase64;
};
export const setCustomHeaders = headerParams => {
  const encryptedBase64 = encryptData();
  const headers = {
    ...headerParams,
    'x-rs-key': encryptedBase64,
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6IjI3IiwibmJmIjoxNjkyODgyNzU3LCJleHAiOjE2OTI5MjU5NTUsImlhdCI6MTY5Mjg4Mjc1N30.m_sHzQiVNI7eZV36n70vrHABG7wNDyuqVj9J7JVyXQY',
  };
  return headers;
};
