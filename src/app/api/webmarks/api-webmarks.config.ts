


export class WebmarksEndPoint {
    public title: string;
    public pageSize:number;
    public bookmarks: string;
    public tags: string;
    public tagsCount: string;
    public upload: string;
    public storages: string;
    public folders: string;
}

export const MYWEBMARK_ENPOINT: WebmarksEndPoint = {
  title: 'webmarks REST API',
  pageSize: 20,
  bookmarks: '/api/v1/bookmarks/',
  tags: '/api/v1/tags/',
  tagsCount: '/api/v1/tags/count/',
  upload: '/api/v1/upload/',
  storages:  '/api/v1/storages/',
  folders:  '/api/v1/folders/',

};
