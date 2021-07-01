import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
// import { KeyOptions, key } from 'openpgp';
// import * as openpgpMod from 'openpgp';

// import { KeyPair } from '../model/keyPair';

@Injectable({
    providedIn: 'root'
})
export class CryptoService {
    // Only for testing
    publicKeyArmored: string;
    privateKeyArmored: string;

    publicKey: CryptoKey;
    privateKey: CryptoKey;

    constructor() { }

    test(data: string) {
        this.generateKey().then( keyPair => {
            this.exportPublic(keyPair);
            this.exportPrivate(keyPair);
            const kP: CryptoKeyPair = keyPair as CryptoKeyPair;
            this.asymmetricEncryptData(kP.publicKey, data).then( encrypted => {
                const encryptedString = this.arrayBufferToString(encrypted);
                const b64EncryptedString = btoa(encryptedString);
                console.log('Encrypted Text:' + b64EncryptedString);
                this.asymmetricDecryptData(kP.privateKey, b64EncryptedString).then( decrypted => {
                    const decryptedDataString = this.arrayBufferToString(decrypted);
                    console.log('Decrypted Text:' + decryptedDataString);
                    this.asymmetricEncryptData(kP.publicKey, data).then( encrypted2 => {
                        const encryptedString2 = this.arrayBufferToString(encrypted2);
                        const b64EncryptedString2 = btoa(encryptedString2);
                        console.log('Encrypted Text:' + b64EncryptedString2);
                        this.asymmetricDecryptData(kP.privateKey, b64EncryptedString2).then( decrypted2 => {
                            const decryptedDataString2 = this.arrayBufferToString(decrypted2);
                            console.log('Decrypted Text:' + decryptedDataString2);
                        })
                    });

                })
            });
        });
    }

    test2(data: string) {
// tslint:disable-next-line: max-line-length
        const publicKeyArmored = `-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA8yqmTnKEV99tT6uf/qVL+1PY2yMLWlrf/SIQC8r4VoZGE1oPv0aC2kVr7h309UK+oxGLtntCXzYpc7qO6u/4iusO1YSE3M/DvXI3mVNF9eO7G6NoXin1xKYhOQdKj4UNt2yGBqaNPofCCvYYvR0mdIVUw324cMborVhZaXZ1QYQ8Dm0sHC0VWkt/fKQnsOlDawikqav10exhZMCSCn9KgpImJZBdty7mbz6z5gekbVD5k9S0xCRkmnV0Z72LL1GqhvjXYBdstfuWW64CREiN0GUurYXeZissac4QXZXNj70/vnPaHM2KRVvgz4YlVBADEloYgvWmtVv7oD+yvOzquQIDAQAB
-----END PUBLIC KEY-----`;

// tslint:disable-next-line: max-line-length
        const privateKeyArmored = `-----BEGIN PRIVATE KEY-----
MIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDzKqZOcoRX321Pq5/+pUv7U9jbIwtaWt/9IhALyvhWhkYTWg+/RoLaRWvuHfT1Qr6jEYu2e0JfNilzuo7q7/iK6w7VhITcz8O9cjeZU0X147sbo2heKfXEpiE5B0qPhQ23bIYGpo0+h8IK9hi9HSZ0hVTDfbhwxuitWFlpdnVBhDwObSwcLRVaS398pCew6UNrCKSpq/XR7GFkwJIKf0qCkiYlkF23LuZvPrPmB6RtUPmT1LTEJGSadXRnvYsvUaqG+NdgF2y1+5ZbrgJESI3QZS6thd5mKyxpzhBdlc2PvT++c9oczYpFW+DPhiVUEAMSWhiC9aa1W/ugP7K87Oq5AgMBAAECggEADm9U9YRd9QMbT6wvaylVWBtQsiYuVZleQWjXp9ePQ+r5zHV0yK+ZyMrFCYWHkH/7O0i+m4vNc25OlM3kOi/veBGpl6+48mG2q9o/UNpXusJ0zZh284YNTp89CtAIaKTRnQvzwyp5E9dGbn+llXkI8B2nxpNskuyf4dsZiFrtmCtbg07Vr5/nFvJO5+ZYQjx1uiLjqEy1M0i+Yyil9bjJ7lCYOjvQAXgssOZXM2i6ntJZTbdJT/KM2XxAuS6kDjKLNWGO+f44H9DHUTEfmKegniYVFQXOdTyZ/x0DGnDfNCP5wvgiA1Tb/sfA/0UmFCH99CvWu85uKqpmJKXLkIO87QKBgQD+2xToyph8IFkg4mv6IPNnnRnbtXjzTDUKdpeAvW9EbNDKq7tKTaIlvosWfm8NtbBxu44gwXW6Zd/xKVcEmWWfEbzCit90FpFrQcrP17shr6dWKPMKGoQBz0DbwJRLDvkaX0eeyXeOriNlGmP7Wz3uSOMz1VREojYoJiywzgeDfQKBgQD0QiIMIoJc0YN60AeSfi9Lu+f3ThKc7Get+MechrSzk/f+I/wMVh7j1cCABhYmPDSDQZ1MfrUge8POvuUMeM8MY72zPnqo9fOh6lUdi9fmCstPJdSYSqPdzaQvD8GqiDvlnNCf4qmfu1zjBCiNIQyCIR8vO/CfUHogYA8Ob+/w7QKBgDQG/47ChTyZ0fgvoQFwJqCZZsT+mBF7FjzrluQ2R/e9CybExjhV/usbqgNOjldLJxkgw9QWCnWiBIST/uq2chN2KIXCmfl1/fvac4/Yp6Ap3sxtEaiXXymLaN8zwlJMXTgwCUv2Lw0Wqa0jJRQUPWFeyds0Cr70KoApwufZN5l1AoGBAIcZ4S0nFUXzmK6gS9/qLYzNNUOjikYDuGEQno/kLiS5rkyCaNIF/HX2b9AgDbY+TKlg7Hk4CEUcT7SV/6jDVXo73Nw8ramwyH4BV+zMwbD6vXNcsFc/yZ1QNgTVyT/itIaPExGsVDgGcR0b2rYc1odPfKkqlS/5WmN33jwVC/kNAoGBAJgMXAd4qIWmtUq8FNIv30r3P/H7v3hndc++MMHLJbETLt2J6Bjo37hfDnSUxLH1jLbIRrkG5cXbEWwARfpcVXjDYWnCJuxdhSgRyO7GWw26y9eK+eiyRfujxH5E8VlUu0xVv4IQxMnjmerwv2gspKCbFPO6JauSmUqLMxq35mq/
-----END PRIVATE KEY-----`;

        const encryptedData = '7Sr6SU29lwujhus/sEdlY7kKF3NLl4imwcYlgHU2Nn5yc/b6nRoGwnbaMgZqLezGfK435/Uu1P75NpkIKgsG/ob0zPblE4RCsrad/v4WPBJ7RM+B1HsV/qJa2NLa0AyUS53D98eCEHkLJWFt/NCaumXkdcb6M/8WwmE6K8kcThYiEuifClLp4+2mk/3vAvng7q5kZ7jLWgAvtO40JIdQ+sbD1+d3F+56G644Mh6FaWG+UeDDd647xurzIqMVgd4Me3bbrs4wLR5Bj/CQn5GYhMgqn3sTak/6/QeJE2kr9sWdaFR1Mjbr13T2379OPnFstMX274HBvrcPJ1DjV3g2GQ==';

        this.importPublic(publicKeyArmored).then ( pubKey => {
            this.publicKey = pubKey;
            this.importPrivate(privateKeyArmored).then ( privKey => {
                this.privateKey = privKey;
                this.asymmetricEncryptData(this.publicKey, data).then( encrypted => {
                    const encryptedString = this.arrayBufferToString(encrypted);
                    const b64EncryptedString = btoa(encryptedString);
                    this.asymmetricDecryptData(this.privateKey, b64EncryptedString).then( decrypted => {
                        const decryptedDataString = this.arrayBufferToString(decrypted);
                        console.log('Decrypted Text:' + decryptedDataString);
                    });
                });
            });
        });
    }

    test3(data: string) {
// tslint:disable-next-line: max-line-length
        const publicKeyArmored = `-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA/O0PJw722w2twGQLZtBtpM8Ul+RaD488K/qoF2yU4QCrc2In1SoFPedGvaMT/fV+Bg+MpTaAJTZyH3FhaVcj9noR3nebnH74UyvEqmL0tU3gekweuMSk7jLYpl1yPKTgjxgTOzf9wvR1OofytLWvxC3HJ+sSo7TEwwad0Nnvw7ckPBMVM9u/0Glg7ZBXiEGlkB2nvZjKWI1d0f4jcvlv23gM6QK5pHXGpUtE/fpKdmG/lXHITLtqnvi2UMJuFOz/7yGOUBOA0esYRXo33xO1M7rWvxr77Ch1haAt6j5TdRDxaQ8UzzPC1D4T3++DQU1zeaSspeyXTjFLJzpvQZRtPQIDAQAB
-----END PUBLIC KEY-----`;

// tslint:disable-next-line: max-line-length
        const privateKeyArmored = `-----BEGIN PRIVATE KEY-----
MIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQD87Q8nDvbbDa3AZAtm0G2kzxSX5FoPjzwr+qgXbJThAKtzYifVKgU950a9oxP99X4GD4ylNoAlNnIfcWFpVyP2ehHed5ucfvhTK8SqYvS1TeB6TB64xKTuMtimXXI8pOCPGBM7N/3C9HU6h/K0ta/ELccn6xKjtMTDBp3Q2e/DtyQ8ExUz27/QaWDtkFeIQaWQHae9mMpYjV3R/iNy+W/beAzpArmkdcalS0T9+kp2Yb+VcchMu2qe+LZQwm4U7P/vIY5QE4DR6xhFejffE7Uzuta/GvvsKHWFoC3qPlN1EPFpDxTPM8LUPhPf74NBTXN5pKyl7JdOMUsnOm9BlG09AgMBAAECggEAE/T+m5XeMOr+OUPg9G62IBQo61Kc2ppyOdl64ZzzOGJ4T3qWFbH4R5SpVnWjh7KTDEELgiPFQ7/CjIGX7psYyYODR8Wx9SIS+mO7OQ3lgi16whuh1vFz6XRV96FATicHrbLNcwBC2TBh1EmoLc3M6H1g4rZKj7lH8fLiiU67pk/JIhlItoIHT5AUS4LhRYqOvZPA371Qamv61GzC6hUnIQJsTUG4TgSX55rbuvjcTmnGE6MkTlIhA1ZUDu5jGio/uKQAyirBr7pfF1Vyvf7/A+3NwYxjeqZLS4UH68txxrfzHFdt8QO+zkV0HrCEfKTMxsDHV4lRVt8n4WTXNPMk8QKBgQD/6LWKnepUSPrV45bTr5V0pPkZgXEcBxOcDX/fSrF3HSNMlFpkjKX8pAcxOLJNJej1xJgjrpTSlTzhAiNQAwJ2/plKzrMOYjKtv4JxZc9DjhrRvzOdmVKzcYzPE1oxYTw2tyjg3HXctNmubvQUVOvq5COrs14CGunfLhJ59RPROQKBgQD9BBQcDxp+XphsYemAqD17vTPDrzy4ov3AEHiW3zMk6zzunhKiN/ylChkMflXtjuCkhJwHPgw5XGHjJ96wVsbwIWp3CC1ju+5NpLEzpu6zQvyNXoSHokLL1PkrKh/Zdi/PmLL1js5gZlp3s6JbOHTWFxKvTDYbRqTgD4efROCwJQKBgQDMyY/FnrtvuXspgNgpDICgeIhy1bgLQsp5fgAPUzmS5XljBfEUN8140FaFGCbvP+AeFLXfEA0+O3kdYtWZaN8nFHTdfW2inAiMLA4Z6uwi1mw13zlR6+lXeg3BhG4PyA0kiAwpbaLP/NWaFmYygwbL0MeO1pnrO1heZgMZH3s9WQKBgHwdxROioRd+pfz85wPTBB4wSTVkQEA+zIWsTsuMAFXLA9/2MSPcnRYE5xbG3rYjUbXCy5uN54c391jsVQRh/UMM0WJE46c6KIN0F+1DpXLQmH1s8Uxr36KH/hcbmfYeUQPgX2GwRTLq4tQ3jZx8DGx9cxAFLcGhnP3BAIGz0xj1AoGBAJYFYqja2dUJrh5s7++HqsItIIyxswpxMUeXEWb4nNepSM3DTVviC2LqEmt+kfTV8m0Sjs9zwxnGjqAGzDyzH/Qt74TkMna/o44etJi944JPCBgvEba1TO3oKgxVMT9NhjTN6YPtoTSy/rrLLbwzItBDsg+fLZDcxDls4z6UZU5e
-----END PRIVATE KEY-----`;

        const encryptedString = 'KoBsxRH1LGVIo6g5JJJQUJsQfM7cUy6+qIu9ZKBX9wc0VzwinMdPQh/k8kZY65CvAIYu+Yjw5TEzYri2d0fCnFcRQBzcwDqjQK2g7peJx/9MKAVFrlFF3RqDJxH28TsEx59saLUvaZn6wjqJzUFGV0RP27MdprnmSKHqkj4sWsYMtxK3K2Rn/0zplev6SBRndHQSd7itbfqBZtIcaM6n5/mfYR6fzH9ZOxp5JAYeML37KSloi8Rr3cmO0r1s5ScvK/QzWpkW/hicpBhmv+/8VCfIavpGkEQoCt0MOk+S3Fv2I6iC1e4ydmvZqqUPY9cWcR1kSzIsdjUG7MqkYwSoUw==';
        
        this.importPublic(publicKeyArmored).then ( pubKey => {
            this.publicKey = pubKey;
            this.importPrivate(privateKeyArmored).then ( privKey => {
                this.privateKey = privKey;
                this.asymmetricDecryptData(this.privateKey, encryptedString).then( decrypted => {
                    const decryptedDataString = this.arrayBufferToString(decrypted);
                    console.log('Decrypted Text:' + decryptedDataString);
                },
                err => {
                    console.log(err);
                });
            });
        });
    }

    testSymmetric() {
        // ZPKa (clear)
        const zpkaBase64 = 'NT3w1R84PLpVwrrW0HRauSiBMF21z6KtyjQ5JuoYMVs=';
        // Pin Block encrypted with ZPKa
        const pinBlockBase64 = 'mVOZ7EZNVysJJuJnkgnBYOv4Tvy5GoUms15T7Wmg+Oo=';
        // IV byte array Base64 encoded
        const ivBase64 = 'NWpWCfUoEmf9GFegYGLcSg==';
        this.importSymmetric(zpkaBase64)
        .then( zpkaKey => {
            return this.symmetricDecryptDataBase64(zpkaKey, pinBlockBase64, ivBase64)
        }).then( arrayBuffer => {
            const pin: string = this.arrayBufferToString(arrayBuffer);
            console.log('PIN:' + pin);
        })
    }
    importPublic(publicKeyArmored: string): PromiseLike<CryptoKey> {
        const pemHeader = '-----BEGIN PUBLIC KEY-----';
        const pemFooter = '-----END PUBLIC KEY-----';
        const pemContents = publicKeyArmored.substring(pemHeader.length, publicKeyArmored.length - pemFooter.length);
        // base64 decode the string to get the binary data
        const binaryDerString = window.atob(pemContents);
        // convert from a binary string to an ArrayBuffer
        const binaryDer = this.stringToArrayBuffer(binaryDerString);
        // importKey(
        //          format: string,
        //          keyData: JsonWebKey | Int8Array | Int16Array | Int32Array | Uint8Array | Uint16Array | Uint32Array
        //                   | Uint8ClampedArray | Float32Array | Float64Array | DataView | ArrayBuffer,
        //          algorithm: string | RsaHashedImportParams | EcKeyImportParams | HmacImportParams | DhImportKeyParams | AesKeyAlgorithm,
        //          extractable: boolean,
        //          keyUsages: string[]
        // ): PromiseLike<CryptoKey>;

        return window.crypto.subtle.importKey(
            'spki',
            binaryDer,
            {
                name: 'RSA-OAEP',
                hash: 'SHA-256'
            },
            true,
            ['encrypt']
        );

    }

    importPrivate(privateKeyArmored: string): PromiseLike<CryptoKey> {
        const pemHeader = '-----BEGIN PRIVATE KEY-----';
        const pemFooter = '-----END PRIVATE KEY-----';
        const pemContents = privateKeyArmored.substring(pemHeader.length, privateKeyArmored.length - pemFooter.length);

        // base64 decode the string to get the binary data
        const binaryDerString = window.atob(pemContents);
        // convert from a binary string to an ArrayBuffer
        const binaryDer = this.stringToArrayBuffer(binaryDerString);
        // importKey(
        //          format: string,
        //          keyData: JsonWebKey | Int8Array | Int16Array | Int32Array | Uint8Array | Uint16Array | Uint32Array
        //                   | Uint8ClampedArray | Float32Array | Float64Array | DataView | ArrayBuffer,
        //          algorithm: string | RsaHashedImportParams | EcKeyImportParams | HmacImportParams | DhImportKeyParams | AesKeyAlgorithm,
        //          extractable: boolean,
        //          keyUsages: string[]
        // ): PromiseLike<CryptoKey>;

        return window.crypto.subtle.importKey(
            'pkcs8',
            binaryDer,
            {
                name: 'RSA-OAEP',
                hash: 'SHA-256'
            },
            true,
            ['decrypt']
        );

    }

    exportPublic(keyPair: CryptoKeyPair ) {
        window.crypto.subtle.exportKey('spki', keyPair.publicKey).then(keydata => {
            this.publicKeyArmored = btoa(this.arrayBufferToString(keydata));
            console.log('Public Key:' + this.publicKeyArmored);
        });
    }
    exportPrivate(keyPair: CryptoKeyPair) {
        window.crypto.subtle.exportKey('pkcs8', keyPair.privateKey).then(keydata => {
            this.privateKeyArmored = btoa(this.arrayBufferToString(keydata));
            console.log('Private Key:' + this.privateKeyArmored);
        });

    }

    generateKey(): PromiseLike<CryptoKeyPair> {
        return window.crypto.subtle.generateKey({
            name: 'RSA-OAEP',
            modulusLength: 2048,
            publicExponent: new Uint8Array([0x01, 0x00, 0x01]),
            // hash: {name: 'SHA-1'}
            hash: {name: 'SHA-256'}
        },
        true,
        ['encrypt', 'decrypt']);
    }

    asymmetricEncryptData(publicKey: CryptoKey, data: string): PromiseLike<ArrayBuffer> {
        const dataArray: ArrayBuffer = this.stringToArrayBuffer(data);
        return window.crypto.subtle.encrypt(
            {
                name: 'RSA-OAEP'
            },
            publicKey,
            dataArray
        );
    }

    asymmetricDecryptData(privateKey: CryptoKey, encryptedDataB64: string): PromiseLike<ArrayBuffer> {
        const binaryEncryptedData: string = atob(encryptedDataB64);
        const encryptedDataArray: ArrayBuffer = this.stringToArrayBuffer(binaryEncryptedData);
        return window.crypto.subtle.decrypt(
            {
                name: 'RSA-OAEP'
            },
            privateKey,
            encryptedDataArray
        );
    }
    stringToArrayBuffer(str: string): ArrayBuffer {
        const buf = new ArrayBuffer(str.length);
        const bufView = new Uint8Array(buf);
        for (let i = 0, strLen = str.length; i < strLen; i++) {
            bufView[i] = str.charCodeAt(i);
        }
        return buf;
    }

    arrayBufferToString(str): string {
        const byteArray = new Uint8Array(str);
        let byteString = '';
        for (let i = 0; i < byteArray.byteLength; i++) {
            byteString += String.fromCodePoint(byteArray[i]);
        }
        return byteString;
    }


    importSymmetric(symmetricKeyBase64: string): PromiseLike<CryptoKey> {
        return window.crypto.subtle.importKey(
            'raw',
            this.stringToArrayBuffer(atob(symmetricKeyBase64)),
            'AES-CBC',
            true,
            ['encrypt', 'decrypt']
        )
    }

    symmetricDecryptDataBase64(symmetricKey: CryptoKey, encryptedDataB64: string, initVector: string): PromiseLike<ArrayBuffer> {
        const iVector: ArrayBuffer = this.stringToArrayBuffer(atob(initVector));

        const binaryEncryptedData: string = atob(encryptedDataB64);
        const encryptedDataArray: ArrayBuffer = this.stringToArrayBuffer(binaryEncryptedData);

        return window.crypto.subtle.decrypt(
            {
                name: 'AES-CBC',
                iv: iVector
            },
            symmetricKey,
            encryptedDataArray
        );
    }
    symmetricDecryptData(symmetricKey: CryptoKey, encryptedDataArray: ArrayBuffer, initVector: ArrayBuffer): PromiseLike<ArrayBuffer> {
        return window.crypto.subtle.decrypt(
            {
                name: 'AES-CBC',
                iv: initVector
            },
            symmetricKey,
            encryptedDataArray
        );

    }
    // OpenPGP
    // decryptZPKa(privateKeyArmored: string, encryptedZpka: string) {
    //     debugger;
    //     openpgpMod.key.readArmored(privateKeyArmored)
    //     .then( privateKey => {
    //         var key = privateKey.keys[0];
    //         console.log(privateKey);
    //         console.log(key);
    //         const mensaje = openpgpMod.message.fromText(encryptedZpka);
    //         var options: openpgpMod.DecryptOptions = {
    //             message: mensaje,
    //             privateKey: key
    //         }
    //         openpgpMod.decrypt(options).then((decryptedMessage) => {
    //         console.log(decryptedMessage.data)
    //         })
    //     });
    // }
}
