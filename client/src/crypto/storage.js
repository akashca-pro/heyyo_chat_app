// store the session key that is used to encrypted the private key
export function storePrivateKey(decryptedPrivateKey) {
  sessionStorage.setItem(`private_key`, decryptedPrivateKey);
}

export function getPrivateKey() {
  return sessionStorage.getItem(`private_key`);
}

export function clearSessionKey() {
  sessionStorage.removeItem(`private_key`);
}
