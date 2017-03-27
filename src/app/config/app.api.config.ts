


export class ApiConfig {
    public title: string;
    public pageSize:number;
    public notes: string;
    public tags: string;
    public tagsCloud: string;
    public upload: string;
    public archive: string;
}

export const API_CONFIG: ApiConfig = {
  title: 'django api',
  pageSize: 20,
  notes: '/mynotes/api/v1/notes/',
  tags: '/mynotes/api/v1/tags/',
  tagsCloud: '/mynotes/api/v1/tags-cloud/',
  upload: '/mynotes/api/v1/upload/',
  archive:  '/mynotes/api/v1/archive/',
  
};


