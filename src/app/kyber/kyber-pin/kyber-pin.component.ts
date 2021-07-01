import { Component, OnInit } from '@angular/core';

import { Observable, of } from 'rxjs';
import { key } from 'openpgp';

import { CryptoService } from '../../crypto/crypto.service';
import { KyberService } from '../kyber.service';
import { PinReminderService } from '../pin-reminder.service';
import { NegotiateResponse } from '../../model/negotiate-response';
import { CommonModel } from 'src/app/model/common-model';
import { ZPKa } from '../../model/zpka';
import { PinDeliveryService } from '../pin-delivery.service';
import { PinDeliveryResponse } from 'src/app/model/pin-delivery-response';
// import { KeyPair } from '../../model/keyPair';

@Component({
    selector: 'app-kyber-pin',
    templateUrl: './kyber-pin.component.html',
    styleUrls: ['./kyber-pin.component.css']
})
export class KyberPinComponent implements OnInit {

    constructor(
        private cryptoService: CryptoService,
        private kyberService: KyberService,
        private pinReminderService: PinReminderService,
        private pinDeliveryService: PinDeliveryService ) { }

    key: key.Key;
    privateArmored: string;
    publicArmored: string;

    scimToken: NegotiateResponse;

    greeting$: Observable<string>;
    // keyPair$: Observable<KeyPair>;
    pubSendedResponse$: Observable<string>;

    commonModel: CommonModel;

    cryptoKeyPair: CryptoKeyPair;
    publicKeyArmored: string;
    privateKeyArmored: string;

    publicKeyArmored$: Observable<string>;
    privateKeyArmored$: Observable<string>;

    zpka: ZPKa;
    zpka$: Observable<ZPKa>;
    pin: string;
    pin$: Observable<string>;

    //
    ngOnInit() {
        // this.cryptoService.test('Felix Merino');
        this.negotiate();
        this.generateKeyPair();
    }

    hello() {
        this.greeting$ = this.pinReminderService.pinSayHelloService();
    }

    generateKeyPair() {
        this.cryptoService.generateKey().then(kP => {
            const keyPair: CryptoKeyPair = kP as CryptoKeyPair;
            this.cryptoKeyPair = kP as CryptoKeyPair;
            window.crypto.subtle.exportKey('spki', keyPair.publicKey).then(keydata => {
                this.publicKeyArmored = btoa(this.cryptoService.arrayBufferToString(keydata));
                this.publicKeyArmored$ = of(this.publicKeyArmored);
                this.sendPubKey();
            });
            window.crypto.subtle.exportKey('pkcs8', keyPair.privateKey).then(keydata => {
                this.privateKeyArmored = btoa(this.cryptoService.arrayBufferToString(keydata));
                this.privateKeyArmored$ = of(this.publicKeyArmored);
            });
        });
    }
    // OpenPGP
    // generateKeyPair() {
    //     this.cryptoService.generateKayPair().then((theKey) => {
    //         console.log(theKey);
    //         this.privateArmored = theKey.privateKeyArmored;
    //         this.publicArmored = theKey.publicKeyArmored;
    //         this.key = theKey.key;

    //         let keyPair: KeyPair;
    //         keyPair = {
    //             key: theKey.key,
    //             privateKeyArmored: theKey.privateKeyArmored,
    //             publicKeyArmored: theKey.publicKeyArmored,
    //             revocationCertificate: theKey.revocationCertificate
    //         };

    //         this.keyPair$ = of(keyPair);
    //         this.cryptoService.test(this.privateArmored, 'Felix');
    //         this.sendPubKey();
    //     });

    // }
    negotiate() {
        this.kyberService.negotiate()
            .subscribe({
                next: retorno => {
                    let commonModel: CommonModel;
                    console.log(retorno);
                    this.scimToken = retorno;
                    commonModel = JSON.parse(localStorage.getItem('commonModel'));
                    commonModel.negotiateResponse = this.scimToken;
                    localStorage.setItem('commonModel', JSON.stringify(commonModel));
                    this.commonModel = commonModel;
                    this.hello();
                },
                error: error => {
                    console.error(error);
                }
            });
    }
    sendPubKey() {
        this.kyberService.sendPublicKey(this.publicKeyArmored)
            .subscribe({
                next: _ => {
                    this.pubSendedResponse$ = of('PUB Key sended successfully');
                    this.zpkaRequest();
                },
                error: error => {
                    console.error(error);
                }
            });
    }
    zpkaRequest() {
        this.pinReminderService.pinRequestZPKa()
            .subscribe({
                next: response => {
                    const zpka: ZPKa = new ZPKa();
                    zpka.nonce = response.nonce;
                    zpka.encryptedZpka = response.zpka;

                    let commonModel: CommonModel;
                    commonModel = JSON.parse(localStorage.getItem('commonModel'));
                    commonModel.zpka = zpka;
                    localStorage.setItem('commonModel', JSON.stringify(commonModel));
                    this.zpka = zpka;
                    this.zpka$ = of(zpka);
                    this.decryptZPKa();
                },
                error: error => {
                    console.error(error);
                }
            });
    }
    decryptZPKa() {
        this.cryptoService.asymmetricDecryptData(this.cryptoKeyPair.privateKey, this.zpka.encryptedZpka)
        .then( zpka => {
            this.zpka.clearZpka = btoa(this.cryptoService.arrayBufferToString(zpka));
            this.pinDeliveryService.pinRequestPINBlock(this.zpka.nonce)
                .subscribe({
                    next: response => {
                        this.cryptoService.importSymmetric(this.zpka.clearZpka)
                        .then( zpkaKey => {
                            return this.cryptoService.symmetricDecryptDataBase64(zpkaKey, response.pinBlock, response.ivBase64);
                        })
                        .then( arrayBuffer => {
                            this.pin = this.cryptoService.arrayBufferToString(arrayBuffer);
                            this.pin$ = of(this.pin);
                        })
                    }
                })
        },
        err => {
            console.log('err: ', err)
        });
    }

}
