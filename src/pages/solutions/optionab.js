import encrypted from '@/utils/ec';
import axios from 'axios';
import { useState } from 'react';

const OptionAb = () => {
  const [data, setData] = useState('');
  const [encryptedData, setEncryptedData] = useState('');
  const [decryptedData, setDecryptedData] = useState('');
  const [error, setError] = useState(null);

  const handleEncrypt = async () => {
    // Load the server's public key (replace 'YOUR_SERVER_PUBLIC_KEY' with the actual public key)

    const privateKeyJson = process.env.NEXT_PUBLIC_FIREBASE_PRIVATE_KEY;
    const privateKeyObj = JSON.parse(privateKeyJson.replace(/\n/g, ''));
    const privateKey = privateKeyObj.privateKey;
    // Create a new JSEncrypt instance

    const ec = await encrypted(data, privateKey);
    console.log(ec, 'ex');

    const datas = 'my secret data';

    const encryptedData = crypto.publicEncrypt(
      {
        key: privateKey,
        padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
        oaepHash: 'sha256',
      },
      // We convert the data string to a buffer using `Buffer.from`
      Buffer.from(datas)
    );

    // The encrypted data is in the form of bytes, so we print it in base64 format
    // so that it's displayed in a more readable form
    console.log('encypted data: ', encryptedData.toString('base64'));

    // Encrypt the data using the server's public key

    // Send the encrypted data to the Flask server

    try {
      const response = await axios.post(
        'http://127.0.0.1:5000/api/RSA/decrypt',
        {
          encrypted_data: ec,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      setEncryptedData(response.data.encrypted_data);
      setDecryptedData(response.data.decrypted_data);
      setError(null);
    } catch (error) {
      setError(error.message); // or extract more specific error information if available
    }
  };

  return (
    <div>
      <h1>Next.js RSA Encryption Example</h1>
      <input type="text" value={data} onChange={e => setData(e.target.value)} />
      <button onClick={handleEncrypt}>Encrypt & Send</button>
      <p>Encrypted Data: {encryptedData}</p>
      <p>Decrypted Data from Server: {decryptedData}</p>
    </div>
  );
};

export default OptionAb;
