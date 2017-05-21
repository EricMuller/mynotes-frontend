import { Tag } from 'app/modules/tags/model/tag';

export const KIND_LINK:string = 'LINK';
export const KIND_NOTE:string = 'NOTE';
export const KIND_TODO:string = 'TODO';

/**
 * Bookmark 
 */
export class Bookmark {
  id: number;
  kind: string;
  title: string;
  rate: number;
  url: string;
  description: string;
  tags :Tag[] = [];
  status: string;
  created_dt: Date;
  schedule_dt:Date;
  archive_id: number;
  favorite: boolean;
};


