import * as signal from 'libsignal-protocol-typescript';
import { signalStore } from './signalStore';

// Convert ArrayBuffer to base64 string
function arrayBufferToBase64(arrayBuffer) {
  const uint8Array = new Uint8Array(arrayBuffer);
  const binaryString = String.fromCharCode(...uint8Array);
  return btoa(binaryString);
}


// @address => The address is created with SignalProtocolAddress adding sender id for the recipient to authenticate the session
// @cipher => creating an encryption and decryption handler (cipher) for messages sent to or received from address
// @message => The plaintext message is encrypted using Double Ratchet encryption ,this ensures
//             forward secrecy - meaning past messages cannot be decrypted, if the encryption key is compromised

export async function encryptMessage(userId, deviceId, plaintext) {
  try {
    const address = new signal.SignalProtocolAddress(userId, deviceId);
    const cipher = new signal.SessionCipher(signalStore, address);
    const encryptedMessage = await cipher.encrypt(plaintext);
    
    return {
      type: encryptedMessage.type,
      body: arrayBufferToBase64(encryptedMessage.body),
      registrationId: encryptedMessage.registrationId,
    };
  } catch (error) {
    console.error('Encryption failed:', error);
    throw new Error('Failed to encrypt message');
  }
}

// The SignalProtocolAddress ensures the recipient correctly decrypts the message.(here the message only decrypt if it is intended to this user)
// Type 3 (PreKey Message) → Used for the first message in a new session.
// Type 1 (Regular Whisper Message) → Used for ongoing encrypted messages.
// The message is decrypted using the stored session keys from the Double Ratchet Algorithm.

export async function decryptMessage(userId, deviceId, message) {
  try {
    const address = new signal.SignalProtocolAddress(userId, deviceId);
    const cipher = new signal.SessionCipher(signalStore, address);

    const binaryBody = base64ToArrayBuffer(message.body);

    let decrypted;
    if (message.type === 3) {
      decrypted = await cipher.decryptPreKeyWhisperMessage(binaryBody, 'binary');
    } else {
      decrypted = await cipher.decryptWhisperMessage(binaryBody, 'binary');
    }

    return new TextDecoder().decode(decrypted);
  } catch (error) {
    console.error('Decryption failed:', error);
    throw new Error('Failed to decrypt message');
  }
}