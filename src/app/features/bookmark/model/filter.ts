import {TagCount} from '../../tags/model/tag-count';

export class Filter {
  type: string;
  kind: string;
  tags: Array<TagCount> = [];
  trash: boolean;

  public static create(kind: string): Filter {
    const filter = new Filter();
    filter.kind = kind;
    return filter;
  }


}
