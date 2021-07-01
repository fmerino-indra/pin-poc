export class Usertoken {
    token: string;
    body: object;
    header: object;
    vigencia: number;

    givenName: string;
    familyName: string;
    id: string;


    assignToken(token: string) {
        this.token = token;
        this.decodeToken();
    }

    private claim_interpreter(claim: string): string {
        if (this.body) {
            return this.body[claim];
        }
    }

    private decodeToken() {
        const partes = this.token.split('.');
        const cabecera = atob(partes[0]);
        const cuerpo = atob(partes[1]);
        this.header = JSON.parse(cabecera);
        this.body = JSON.parse(cuerpo);

        this.givenName = this.claim_interpreter('given_name');
        this.familyName = this.claim_interpreter('family_name');
        this.id = this.claim_interpreter('sub');
    }

}
