import * as signal from 'libsignal-protocol-typescript';
import { signalStore } from './signal_store';

// Convert ArrayBuffer to base64 string
function arrayBufferToBase64(arrayBuffer) {
  const uint8Array = new Uint8Array(arrayBuffer);
  const binaryString = String.fromCharCode(...uint8Array);
  return btoa(binaryString);
}

export async function generateIdentity() {
  const identityKeyPair = await signal.KeyHelper.generateIdentityKeyPair();
  const registrationId = await signal.KeyHelper.generateRegistrationId();

  await signalStore.put('identityKey', identityKeyPair);
  await signalStore.put('registrationId', registrationId);

  return { identityKeyPair, registrationId };
}

export async function generatePreKeys(start = 1, count = 10) {
  const preKeys = [];
  for (let i = 0; i < count; i++) {
    const keyId = start + i;
    const preKey = await signal.KeyHelper.generatePreKey(keyId);
    preKeys.push(preKey);
    await signalStore.storePreKey(preKey.keyId, preKey.keyPair);
  }
  return preKeys;
}

export async function generateSignedPreKey(identityKey, id = 1) {
  const signedPreKey = await signal.KeyHelper.generateSignedPreKey(identityKey, id);
  await signalStore.storeSignedPreKey(id, signedPreKey.keyPair);
  return signedPreKey;
}

export async function generateKeyBundle() {
  try {
    const { identityKeyPair, registrationId } = await generateIdentity();
    const signedPreKey = await generateSignedPreKey(identityKeyPair, 1);
    const preKeys = await generatePreKeys(1, 10);

    return {
      registrationId,
      identityKey: arrayBufferToBase64(identityKeyPair.pubKey),
      signedPreKey: {
        keyId: signedPreKey.keyId,
        key: arrayBufferToBase64(signedPreKey.keyPair.pubKey),
        signature: arrayBufferToBase64(signedPreKey.signature),
      },
      preKeys: preKeys.map((k) => ({
        keyId: k.keyId,
        key: arrayBufferToBase64(k.keyPair.pubKey),
      })),
    };
  } catch (error) {
    console.error('Failed to generate key bundle:', error);
    throw new Error('Key bundle generation failed');
  }
}