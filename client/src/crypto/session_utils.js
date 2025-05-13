import * as signal from 'libsignal-protocol-typescript';
import { signalStore } from './signal_store';

// Convert base64 string to ArrayBuffer
function base64ToArrayBuffer(base64) {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes.buffer;
}

export async function createSession(theirBundle, theirUserId) {
  try {
    const deviceId = theirBundle.registrationId;
    const address = new signal.SignalProtocolAddress(theirUserId, deviceId);
    const builder = new signal.SessionBuilder(signalStore, address);
    await builder.processPreKey({
      registrationId: theirBundle.registrationId,
      identityKey: base64ToArrayBuffer(theirBundle.identityKey),
      signedPreKey: {
        keyId: theirBundle.signedPreKey.keyId,
        publicKey: base64ToArrayBuffer(theirBundle.signedPreKey.key),
        signature: base64ToArrayBuffer(theirBundle.signedPreKey.signature),
      },
      preKey: theirBundle.preKeys[0]
        ? {
            keyId: theirBundle.preKeys[0].keyId,
            publicKey: base64ToArrayBuffer(theirBundle.preKeys[0].key),
          }
        : undefined,
    });
  } catch (error) {
    console.error('Failed to create session:', error);
    throw new Error('Session creation failed');
  }
}