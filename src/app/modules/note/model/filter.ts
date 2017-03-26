
import { TagCloud } from 'app/modules/tags/model/tag-cloud';
import { TYPE_LINK, TYPE_NOTE, TYPE_TODO } from './note';

export class Filter {
  type: string;
  title: string;
  tags: Array<TagCloud>=[];
  trash: boolean;

  public static create(type: string): Filter {
    let filter = new Filter();
    filter.type = type;
    return filter;
  }


}