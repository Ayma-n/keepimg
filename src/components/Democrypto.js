import React from 'react'
import { createCipheriv, createDecipheriv } from 'crypto';

export default function Democrypto() {

    const handleFileToEncrypt = (e) => {
        e.preventDefault();
        const filesObject = document.getElementById("file-id");
        const uploadedFile = filesObject.files[0];
    }

    const encrypt = (buffer) => {
        const cipher = createCipheriv(algorithm, key, iv);
        const encrypted = Buffer.concat([cipher.update(buffer), cipher.final()]);
    } 

    return (
        <div id="Democrypto" className="flex flex-col">
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
