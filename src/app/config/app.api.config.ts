


export class MyWebmarkEndPoint {
    public title: string;
    public pageSize:number;
    public medias: string;
    public tags: string;
    public tagsCloud: string;
    public upload: string;
    public archive: string;
}

export const MYWEBMARK_ENPOINT: MyWebmarkEndPoint = {
  title: 'django rest api',
  pageSize: 20,
  medias: '/mywebmarks/api/v1/medias/',
  tags: '/mywebmarks/api/v1/tags/',
  tagsCloud: '/mywebmarks/api/v1/tags-cloud/',
  upload: '/mywebmarks/api/v1/upload/',
  archive:  '/mywebmarks/api/v1/archive/',
 
};


export class AuthentificationEndPoint {
    public title: string;
    public token :string;
    public registration :string;
    public account_confirm_email: string;
}

export const AUTHENTIFICATION_ENDPOINT: AuthentificationEndPoint = {
  title: 'django rest authent',
  token: '/authentication/rest-auth/token/',
  registration: '/authentication/rest-auth/registration/',
  account_confirm_email: '/authentication/rest-auth/registration/account-confirm-email/',
    
};
