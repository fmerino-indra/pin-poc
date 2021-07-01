import { KeyOptions, key } from 'openpgp';

export interface KeyPair {
    key: key.Key;
    privateKeyArmored: string;
    publicKeyArmored: string;
    revocationCertificate: string;
}
