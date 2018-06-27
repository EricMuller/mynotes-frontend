

export class Folder {
  id: number;
  name: string;
  parent_id: number;
  kind: string;

  public static create(aname: string, parentId: number): Folder {
    let folder = new Folder();
    folder.name = aname;
    folder.kind ='FLDR';
    if (parentId > 0) {
      folder.parent_id = parentId;
    }

    return folder;
  }
}

