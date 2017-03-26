

export class Tag {
  id: number;
  name: string;
  public: boolean;
  size: any;

  public static create(aname: string): Tag {
    let tag = new Tag();
    tag.name = aname;
    tag.public = false;
    return tag;

  }
}