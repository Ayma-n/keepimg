import React, { useEffect, useState } from 'react'
import { createCipheriv, createDecipheriv, randomBytes } from 'crypto-browserify';
import { Buffer } from 'buffer';

export default function Democrypto() {

    const algorithm = 'aes-256-ctr';
    let key;
    let iv;

    const [keyState, setKeyState] = useState();
    const [ivState, setIvState] = useState();
    const [keyBase64, setKeyBase64] = useState("");
    const [uploadedBuffer, setUploadedBuffer] = useState();
    const [encryptedBuffer, setEncryptedBuffer] = useState();

    const generateKeyfile = () => {
        key = randomBytes(32);
        setKeyState(key);
        iv = randomBytes(16);
        setIvState(iv);
        const keyBuffer = Buffer.from(key);
        setKeyBase64(keyBuffer.toString('base64'));
    }

    const handleFileToEncrypt = async (e) => {
        e.preventDefault();
        const filesObject = document.getElementById("file-id");
        const uploadedFile = filesObject.files[0];
        const uploadedFileBase64 = await toBase64(uploadedFile);
        const encryptedBase64 = encrypt(uploadedFileBase64);
        setEncryptedBuffer(encryptedBase64);
    }

    const encrypt = (bfr) => {
        const cipher = createCipheriv("aes-256-ctr", keyState, ivState);
        const encrypted = Buffer.concat([cipher.update(bfr), cipher.final()]);
        return encrypted.toString('base64');
    }

    const toBase64 = (file) => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });

    useEffect(generateKeyfile, []);

    return (
        <div id="Democrypto" className="flex flex-col">
            <div id="keyfile-gen">
                <div id="keyfile-desc">Download your keyfile!</div>
                {keyBase64 && <a id="keyfile-dl" href={"data:application/octet-stream;base64," + keyBase64} className="w-100 h-100 rounded-md bg-green-500 text-white p-2 font-bold" download="your.key">Download</a>}
            </div>
            <div id="encrypt-div">
                <div id="encrypt-desc">Encrypt a pic!</div>
                <form id="upload-file" onSubmit={handleFileToEncrypt}>
                    <input type="file" name="filename" id="file-id" />
                    <input type="submit" value="Upload" className="w-100 h-100 rounded-md bg-green-500 text-white p-2 font-bold" />
                </form>
                {encryptedBuffer && <a id="encrypted-dl" href={"data:application/octet-stream;base64," + encryptedBuffer} className="w-100 h-100 rounded-md bg-green-500 text-white p-2 font-bold" download="file.encrypted">Download your encrypted file!</a>}
            </div>
            <div id="decrypt-div">
                <div id="decrypt-desc">Decrypt a pic!</div>
            </div>
        </div>
    )
}
