export interface NegotiateResponse {
    access_token: string;
    token_type: string;
    expires_in: number;
    scope: string[];
    id_token: string;
}
