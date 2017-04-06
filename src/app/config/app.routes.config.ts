
import { NoteListComponent } from 'app/modules/note/note-list/note-list.component';
import { NoteDetailComponent } from 'app/modules/note/note-detail/note-detail.component';
import { NoteCreateComponent } from 'app/modules/note/note-create/note-create.component';
import { NoteFilterComponent } from 'app/modules/note/note-search/note-search.component';
import { NoteComponent } from 'app/modules/note/note/note.component';

import { LoginComponent } from 'app/shared/modules/authentification/login/login.component';
import { AuthgardService } from 'app/shared/modules/authentification/authgard.service';

import { HomeComponent } from 'app/modules/home/home/home.component';
import { TagListComponent } from 'app/modules/tags/tag-list/tag-list.component';

import { TagUploadComponent } from 'app/modules/tags/tag-upload/tag-upload.component';

import { DashboardComponent } from 'app/modules/dashboard/dashboard.component'

import { FavoriteListComponent } from 'app/modules/favorite/favorite-list/favorite-list.component'
import { FavoriteUploadComponent } from 'app/modules/favorite/favorite-upload/favorite-upload.component'

import { TagCreateDialogComponent }  from 'app/modules/tags/tag-create-dialog/tag-create-dialog.component';

import { BackupListComponent} from 'app/modules/backup/backup-list/backup-list.component'

import { RegistrationComponent } from 'app/shared/modules/authentification/registration/registration.component'

export const ROUTES_CONFIG = [
  { path: '', redirectTo: 'favorites/search', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'upload', component: FavoriteUploadComponent },
 
  { path: 'tag/create', component: TagCreateDialogComponent },
  { path: 'favorites', component: NoteComponent, canActivate: [AuthgardService] ,  
      children: [
            {
              path: 'search',
              component: NoteFilterComponent
              , canActivate: [AuthgardService] 
            },
            {
              path: 'list',
              component: NoteListComponent
              , canActivate: [AuthgardService] 
            },
            {
              path: 'folder',
              component: NoteListComponent
            },
            { path: 'backup',
              component: BackupListComponent 
            },
          ]
  },

  { path: 'favorites/detail/:id', component: NoteDetailComponent, canActivate: [AuthgardService]  },
  { path: 'favorites/list2', component: NoteListComponent, canActivate: [AuthgardService],
    children: [
      {
        path: 'upload',
        component: FavoriteUploadComponent
      },
      {
        path: 'drop',
        component: NoteCreateComponent
      },
    ]
  },
  {
    path: 'tags', component: TagListComponent
  },
  { path: 'register', component: RegistrationComponent },
  { path: 'login', component: LoginComponent },
  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];