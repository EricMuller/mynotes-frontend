import {Injectable} from '@angular/core';
import {Router} from '@angular/router';


declare module String {
  export const format: any;
}


export class MatTab {
  code: string;
  index: number;
  icon: string;
  label: string;
  link: string;
  template: string;
  close: boolean;
  active: boolean;
}


@Injectable()
export class MatTabStore {

  public activeTabIndex = 0;

  private data_tabs: MatTab[] = [
    {
      code: 'folder',
      index: 0,
      label: '',
      icon: 'folder',
      link: '/bookmark/folders',
      template: '/bookmark/folders',
      close: false,
      active: false
    },
    {code: 'list', index: 1, label: '', icon: 'view_list', link: '/bookmark/list', template: '/bookmark/list', close: false, active: false},
    {
      code: 'detail',
      index: 2,
      label: '',
      icon: 'create',
      link: '/bookmark/detail/0',
      template: '/bookmark/detail',
      close: false,
      active: false
    },
    // { code: 'new',index:2,label:'', icon: 'create', link: '/bookmark/new',template: '/bookmark/new' ,close: false, active: false }
  ];

  constructor(private router: Router) {
  }

  get tabs(): MatTab[] {
    return this.data_tabs;
  }

  public navigate(code: string, template: string, id: number) {
    const index = this.data_tabs.findIndex((tab) => tab.code === code);
    this.activeTabIndex = index;
    if (template != null) {
      this.data_tabs[index].link = template;
      if (id != null) {
        this.data_tabs[index].link = template + '/' + id;
      }
    }
    console.log(this.data_tabs[index].link);
    this.router.navigateByUrl(this.data_tabs[index].link);
  }

  /* public add(tab: MdTab): MdTab {
     if (tab.active == true) {
       this.data_tabs.forEach(
         (x1, index, theArray) => {
           this.data_tabs[index].active = false;
         });
     }
     tab.index = this.data_tabs.length;
     this.data_tabs.push(tab);
     return tab;
   }
 */


}
