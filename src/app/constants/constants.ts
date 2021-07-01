export const KYBER_API_BASE_URL = 'http://localhost:8082';
export const REMINDER_API_BASE_URL = 'http://localhost:8085';
export const DELIVERY_API_BASE_URL = 'http://localhost:8084';

export const ACCESS_TOKEN = 'accessToken';

export const OAUTH2_REDIRECT_URI = 'http://localhost:4200/oauth2/redirect';

export const GOOGLE_AUTH_URL = KYBER_API_BASE_URL + '/oauth2/authorize/google?redirect_uri=' + OAUTH2_REDIRECT_URI;
export const WSO2IS_AUTH_URL = KYBER_API_BASE_URL + '/oauth2/authorize/wso2is?redirect_uri=' + OAUTH2_REDIRECT_URI;
export const FACEBOOK_AUTH_URL = KYBER_API_BASE_URL + '/oauth2/authorize/facebook?redirect_uri=' + OAUTH2_REDIRECT_URI;
export const GITHUB_AUTH_URL = KYBER_API_BASE_URL + '/oauth2/authorize/github?redirect_uri=' + OAUTH2_REDIRECT_URI;

export const HELLO_KYBER = KYBER_API_BASE_URL + '/kyber/hello';
export const NEGOTIATE_KYBER = KYBER_API_BASE_URL + '/kyber/negotiateToken';
export const SEND_PUBKEY_KYBER = KYBER_API_BASE_URL + '/kyber/pubKey';

export const HELLO_REMINDER = REMINDER_API_BASE_URL + '/pin/hello';
export const PIN_REMINDER = REMINDER_API_BASE_URL + '/pin/reminder';

export const PIN_DELIVERY = DELIVERY_API_BASE_URL + '/pin/delivery';
