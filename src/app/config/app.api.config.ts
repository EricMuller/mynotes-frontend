


export class MyWebmarksEndPoint {
    public title: string;
    public pageSize:number;
    public bookmarks: string;
    public tags: string;
    public tagsCount: string;
    public upload: string;
    public archive: string;
    public folders: string;
}

export const MYWEBMARK_ENPOINT: MyWebmarksEndPoint = {
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
    public token :string;
    public registration :string;
    public account_confirm_email: string;
}

export const AUTHENTIFICATION_ENDPOINT: AuthentificationEndPoint = {
  title: 'django authent REST API',
  token: '/api/v1/auth/token/',
  registration: '/api/v1/auth/registration/',
  account_confirm_email: '/api/v1/auth/registration/account-confirm-email/',
};