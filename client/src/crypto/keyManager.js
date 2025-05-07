import * as openpgp from 'openpgp'

export async function generatePGPkeys(name,email,password){
    const { privateKey, publicKey } = await openpgp.generateKey({
        type : 'rsa',
        rsaBits : 2048,
        userIDs : [{ name, email }],
        passphrase : password, // Used to encrypt the private key,
        format : 'armored'
    })

    return { privateKey, publicKey }
}

export async function decryptPrivateKey(armoredPrivateKey, password) {
    const privateKey = await openpgp.readPrivateKey({ armoredKey: armoredPrivateKey });
    return await openpgp.decryptKey({ privateKey, passphrase: password });
}

export const downloadPrivateKeyFile = (encryptedPrivateKey, filename = 'private-key.asc') => {
    const blob = new Blob([encryptedPrivateKey], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    
    URL.revokeObjectURL(url);
}

export const importAndDecryptPrivateKey = async (file, password) => {
    const text = await file.text();
    const privateKey = await openpgp.readPrivateKey({ armoredKey: text });
    return await openpgp.decryptKey({ privateKey, passphrase: password });
}