
import { TagCount } from 'app/modules/tags/model/tag-count';
import { KIND_LINK, KIND_NOTE, KIND_TODO } from './bookmark';

export class Filter {
  type: string;
  kind: string;
  tags: Array<TagCount>=[];
  trash: boolean;

  public static create(kind: string): Filter {
    let filter = new Filter();
    filter.kind = kind;
    return filter;
  }


}