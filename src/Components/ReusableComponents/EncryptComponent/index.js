import encrypted from '@/utils/ec';
import axios from 'axios';
import { useState } from 'react';

function EncryptComponent() {
  const [data, setData] = useState('');
  const [encryptedData, setEncryptedData] = useState('');
  const [decryptedData, setDecryptedData] = useState('');

  const handleEncrypt = async () => {
    // Load the server's public key (replace 'YOUR_SERVER_PUBLIC_KEY' with the actual public key)

    const privateKeyJson = process.env.NEXT_PUBLIC_FIREBASE_PRIVATE_KEY;
    const privateKeyObj = JSON.parse(privateKeyJson.replace(/\n/g, ''));
    const privateKey = privateKeyObj.privateKey;
    // Create a new JSEncrypt instance

    const ec = encrypted(data, privateKey);

    // Encrypt the data using the server's public key

    // Send the encrypted data to the Flask server
    const response = await axios.post(
      'http://192.168.1.36:5000/api/RSA/decrypt',
      {
        encryptedData: ec,
      }
    );

    // Set the server's response (decrypted data) in the state
    setEncryptedData(encrypted);
    setDecryptedData(response.data.decryptedData);
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
}

export default EncryptComponent;
