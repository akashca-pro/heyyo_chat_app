import { openDB } from 'idb'

const dbPromise = openDB('pgp-db',1,{
    upgrade(db) {
        db.createObjectStore('keys')
    }
})

export async function storePrivateKey(privateKey) {
    const db = await dbPromise
    await db.put('keys', privateKey, 'privateKey')
}

export async function getPrivateKey() {
    const db = await dbPromise
    return await db.get('keys', 'privateKey')
}

export async function clearStoredKeys() {
    const db = await dbPromise
    await db.delete('keys', 'privateKey')
}

export async function requestPersistentStorage() {
    if (navigator.storage && navigator.storage.persist) {
      const isPersisted = await navigator.storage.persisted();
      if (!isPersisted) {
        const granted = await navigator.storage.persist();
        console.log(granted ? ' Persistent storage granted' : ' Persistent storage denied');
        return granted;
      } else {
        console.log(' Already using persistent storage');
        return true;
      }
    } else {
      console.log(' Persistent storage not supported by this browser');
      return false;
    }
  }