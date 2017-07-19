


export class WebmarksEndPoint {
    public title: string;
    public pageSize:number;
    public bookmarks: string;
    public tags: string;
    public tagsCount: string;
    public upload: string;
    public archive: string;
    public folders: string;
}

export const MYWEBMARK_ENPOINT: WebmarksEndPoint = {
  title: 'webmarks REST API',
  pageSize: 20,
  bookmarks: '/api/v1/bookmarks/',
  tags: '/api/v1/tags/',
  tagsCount: '/api/v1/tags/count/',
  upload: '/api/v1/upload/',
  archive:  '/api/v1/archives/',
  folders:  '/api/v1/folders/',
 
};


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
  //login_google: '/api/v1/auth/accounts/google/login/',
  registration: '/api/rest_auth/registration/',
  account_confirm_email: '/api/rest_auth/registration/account-confirm-email/',
};