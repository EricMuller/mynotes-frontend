


export class MyNotesEndPoint {
    public title: string;
    public pageSize:number;
    public notes: string;
    public tags: string;
    public tagsCloud: string;
    public upload: string;
    public archive: string;
}

export const MYNOTES_ENPOINT: MyNotesEndPoint = {
  title: 'django api',
  pageSize: 20,
  notes: '/mynotes/api/v1/notes/',
  tags: '/mynotes/api/v1/tags/',
  tagsCloud: '/mynotes/api/v1/tags-cloud/',
  upload: '/mynotes/api/v1/upload/',
  archive:  '/mynotes/api/v1/archive/',
 
};


export class AuthentificationEndPoint {
    public title: string;
    public registration :string;
    public account_confirm_email: string;

    
}

export const AUTHENTIFICATION_ENDPOINT: AuthentificationEndPoint = {
  title: 'django rest authent',
  registration: '/rest-auth/registration/',
  account_confirm_email: '/rest-auth/registration/account-confirm-email/',
    
};
