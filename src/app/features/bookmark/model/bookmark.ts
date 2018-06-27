import {Tag} from '../../tags/model/tag';

export const KIND_LINK = 'LINK';
export const KIND_NOTE = 'NOTE';
export const KIND_TODO = 'TODO';

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
  tags: Tag[] = [];
  status: string;
  created_dt: Date;
  schedule_dt: Date;
  archive_id: number;
  favorite: boolean;
}


