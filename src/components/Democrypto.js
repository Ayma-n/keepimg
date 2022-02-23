import React, { useEffect, useState } from 'react'
import { createCipheriv, createDecipheriv, randomBytes } from 'crypto-browserify';
import { Buffer } from 'buffer';

export default function Democrypto() {

    const algorithm = 'aes-256-ctr';
    let key;

    const [keyBase64, setKeyBase64] = useState("");

    const generateKeyfile = () => {
        key = randomBytes(32);
        const keyBuffer = Buffer.from(key);
        setKeyBase64(keyBuffer.toString('base64'));
    }

    const handleFileToEncrypt = (e) => {
        e.preventDefault();
        const filesObject = document.getElementById("file-id");
        const uploadedFile = filesObject.files[0];
    }

    const encrypt = (bfr) => {
        const cipher = createCipheriv(algorithm, key, null);
        const encrypted = Buffer.concat([cipher.update(bfr), cipher.final()]);
    }

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
            </div>
            <div id="decrypt-div">
                <div id="decrypt-desc">Decrypt a pic!</div>
            </div>
        </div>
    )
}
