
import { TagCloud } from 'app/modules/tags/model/tag-cloud';
import { KIND_LINK, KIND_NOTE, KIND_TODO } from './webmark';

export class Filter {
  type: string;
  kind: string;
  tags: Array<TagCloud>=[];
  trash: boolean;

  public static create(kind: string): Filter {
    let filter = new Filter();
    filter.kind = kind;
    return filter;
  }


}