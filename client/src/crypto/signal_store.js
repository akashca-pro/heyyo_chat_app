import { openDB } from 'idb';
import * as signal from 'libsignal-protocol-typescript';

const DB_NAME = import.meta.env.VITE_DB_NAME || 'messaging_app';
const STORE_NAME = import.meta.env.VITE_STORE_NAME || 'signal_keys';

const getDB = () => {
  return openDB(DB_NAME, 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME);
      }
    },
  });
};

class IndexedDBSignalStore {
  async getIdentityKeyPair() {
    const db = await getDB();
    return db.get(STORE_NAME, 'identityKey');
  }

  async getLocalRegistrationId() {
    const db = await getDB();
    return db.get(STORE_NAME, 'registrationId');
  }

  async isTrustedIdentity(name, key) {
    const db = await getDB();
    const storedKey = await db.get(STORE_NAME, `identity.${name}`);
    if (!storedKey) {
      await db.put(STORE_NAME, key, `identity.${name}`);
      return true;
    }
    // Compare keys using Uint8Array
    const storedKeyArray = new Uint8Array(storedKey);
    const keyArray = new Uint8Array(key);
    if (storedKeyArray.length !== keyArray.length) return false;
    return storedKeyArray.every((byte, i) => byte === keyArray[i]);
  }

  async saveIdentity(name, key) {
    const db = await getDB();
    await db.put(STORE_NAME, key, `identity.${name}`);
    return true;
  }

  async getPreKey(keyId) {
    const db = await getDB();
    return db.get(STORE_NAME, `preKey${keyId}`);
  }

  async storePreKey(keyId, keyPair) {
    const db = await getDB();
    await db.put(STORE_NAME, keyPair, `preKey${keyId}`);
  }

  async removePreKey(keyId) {
    const db = await getDB();
    await db.delete(STORE_NAME, `preKey${keyId}`);
  }

  async storeSignedPreKey(keyId, keyPair) {
    const db = await getDB();
    await db.put(STORE_NAME, keyPair, `signedPreKey${keyId}`);
  }

  async getSignedPreKey(keyId) {
    const db = await getDB();
    return db.get(STORE_NAME, `signedPreKey${keyId}`);
  }

  async storeSession(address, record) {
    const db = await getDB();
    await db.put(STORE_NAME, record, `session.${address}`);
  }

  async loadSession(address) {
    const db = await getDB();
    return db.get(STORE_NAME, `session.${address}`);
  }

  async removeSession(address) {
    const db = await getDB();
    await db.delete(STORE_NAME, `session.${address}`);
  }

  async get(key) {
    const db = await getDB();
    return db.get(STORE_NAME, key);
  }

  async put(key, value) {
    const db = await getDB();
    await db.put(STORE_NAME, value, key);
  }

  async remove(key) {
    const db = await getDB();
    return db.delete(STORE_NAME, key);
  }
}

export const signalStore = new IndexedDBSignalStore();