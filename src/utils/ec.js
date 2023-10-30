import crypto, { publicEncrypt } from 'crypto';
async function encrypted(data, key) {
  if (typeof window === 'undefined') {
    global.window = {}; // Faking the window object

    const jsEncryptModule = await import('jsencrypt');
    const encrypt = new jsEncryptModule.JSEncrypt();

    encrypt.setPublicKey(key);
    return encrypt.encrypt(data);
  } else {
    const publickey =
      '-----BEGIN PUBLIC KEY----- MIICIjANBgkqhkiG9w0BAQEFAAOCAg8AMIICCgKCAgEA3Ep8z8QddRrRTrPNwW5o bNZQ3wKhp9VBzOb5DXvDtAjTWmQqr/tgBY/czyQPBHsR09xSEuBR1IUBF7vrtPz/ Qb/dLKGoPuZQhtu097y5pbkFFORmzlfbDi4wVU6WfiKa79u+85Qd19HCneJ3cLoA 2Z/OPULtUg6CsjUuom1WME2NftXOXs7GIQ8EK5QnwgmiLq6RApsUhknQ29fg6Vav 6tGNUiyVLi9pgU9EL7apAYPu7VvsICg0hLNWDemIZuMd39QqtAgeil6ju0poXjzM DsVObZwic0uR92mXbqAoac70bzgIsuCR+fE24idGWSSaCTm3MnarsCuSWUuSxNES LcjXooNFEXR8dIhviAx828inoCwf5WpeUfERqkn6q5z754o9beYZDfYZZon1XT2l YJjleUaClSwMN7m0FsYm1Ce3YRT0TQs351J8wSnj+jdGKp+8+uPa21mv/kCfMMtd 9gTG+uuXk54Q4xXK541AAorCSLyU+coyy5e68bfwLsQDDHFyQHKK7jzX7N+BzEt4 k8Vpgix9biQaswjfDrNxxd3+otCbtloslJwiogMSVR3Uf0dzFrNW/4qhDozzaCeD 961sX5MntrTof3BRX8buFGiw/jAt7AMJdWuR2jBJjhpxOZsAzfUDiM2hPwsdF1f6 S3dVbtepYQ3zKxVV6GEqNZkCAwEAAQ== -----END PUBLIC KEY-----';
    const byteData = Buffer.from(publickey, 'utf-8');

    // // Generate an OAEP padding instance with SHA-512
    const oaepPadding = publicEncrypt(
      {
        key: byteData,
        padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
        oaepHash: 'sha512',
      },
      Buffer.from(data)
    );
    console.log('Encrypted Data:', oaepPadding.toString('base64'));

    // Convert the encrypted data to base64

    const jsEncryptModule = await import('jsencrypt');

    const encrypt = new jsEncryptModule.JSEncrypt();

    // Generate an RSA key pair with the specified key size
    // encrypt.getKey().generate(keySize);

    encrypt.setPublicKey(key);

    console.log('encry pted data');
    console.log(encrypt.encrypt(data));

    const encrypted = encrypt.encrypt(data);
    console.log('encrypted', encrypted);

    console.log('encry pted data');

    return encrypt.encrypt(data);
  }
}
export default encrypted;
