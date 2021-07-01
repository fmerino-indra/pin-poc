import { Usertoken } from './user-token';
import { ZPKa } from './zpka';
import { NegotiateResponse } from './negotiate-response';

export class CommonModel {
    userToken: Usertoken;
    negotiateResponse: NegotiateResponse;
    zpka: ZPKa;

    assignToken(token: string) {
        if (!this.userToken) {
            this.userToken = new Usertoken();
        }
        this.userToken.assignToken(token);
    }
}
