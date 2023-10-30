// Update the import path

import { encryptData } from './encryption';

// Function to add the encrypted key to the headers before each API call
export const addEncryptedKeyToHeader = apiClient => {
  // Get the sensitive data to encrypt (e.g., user's access token)
  const sensitiveData = 'sensitive-access-token'; // Replace this with the actual sensitive data

  // Encrypt the sensitive data using the encryptData function from rsaEncryption.js
  const encryptedData = encryptData('hi', 'key');

  // Add the encrypted data to the request header
  apiClient.setApiKey('X-Encrypted-Key', encryptedData);

  return apiClient;
};
