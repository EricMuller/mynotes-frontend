import { Tag } from 'app/modules/tags/model/tag';

export const TYPE_LINK:string = 'LINK';
export const TYPE_NOTE:string = 'NOTE';
export const TYPE_TODO:string = 'TODO';

export class Note {
  id: number;
  title: string;
  rate: number;
  url: string;
  type: string;
  description: string;
  tags :Tag[] = [];
  status: string;
  created_dt: Date;
  schedule_dt:Date;
};


