

export class AuthentificationEndPoint {
    public title: string;
    public login :string;
    public user :string;
    public registration :string;
    public account_confirm_email: string;
}

export const AUTHENTIFICATION_ENDPOINT: AuthentificationEndPoint = {
  title: 'django authent REST API',
  login: '/api/rest_auth/login/',
  user: '/api/rest_auth/user/',
  // login_google: '/api/v1/auth/login/google/',
  // login_google: '/api/v1/auth/accounts/google/login/',
  registration: '/api/rest_auth/registration/',
  account_confirm_email: '/api/rest_auth/registration/account-confirm-email/',
}
