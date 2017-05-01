
import { WebmarkListComponent } from 'app/modules/webmark/webmark-list/webmark-list.component';
import { WebmarkDetailComponent } from 'app/modules/webmark/webmark-detail/webmark-detail.component';
import { WebmarkCreateComponent } from 'app/modules/webmark/webmark-create/webmark-create.component';
import { WebmarkFilterComponent } from 'app/modules/webmark/webmark-search/webmark-search.component';
import { WebmarkComponent } from 'app/modules/webmark/webmark/webmark.component';

import { LoginComponent } from 'app/shared/modules/authentification/login/login.component';
import { AuthgardService } from 'app/shared/modules/authentification/authgard.service';

import { HomeComponent } from 'app/modules/home/home/home.component';
import { TagListComponent } from 'app/modules/tags/tag-list/tag-list.component';

import { TagUploadComponent } from 'app/modules/tags/tag-upload/tag-upload.component';

import { DashboardComponent } from 'app/modules/dashboard/dashboard.component'

import { FavoriteListComponent } from 'app/modules/favorite/favorite-list/favorite-list.component'
import { FavoriteUploadComponent } from 'app/modules/favorite/favorite-upload/favorite-upload.component'

import { TagCreateDialogComponent } from 'app/modules/tags/tag-create-dialog/tag-create-dialog.component';

import { BackupListComponent } from 'app/modules/backup/backup-list/backup-list.component'

import { RegistrationComponent } from 'app/shared/modules/authentification/registration/registration.component'

export const ROUTES_CONFIG = [
  {
    path: '', redirectTo: 'webmarks/search', pathMatch: 'full'    
  },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'upload', component: FavoriteUploadComponent },

  { path: 'tag/create', component: TagCreateDialogComponent },
  {
    path: 'webmarks', component: WebmarkComponent, canActivate: [AuthgardService],
    children: [
      {
        path: 'search',
        component: WebmarkFilterComponent
        , canActivate: [AuthgardService]
      },
      {
        path: 'list',
        component: WebmarkListComponent
        , canActivate: [AuthgardService]
      },
      {
        path: 'folder',
        component: WebmarkListComponent
      },
      {
        path: 'backup',
        component: BackupListComponent
      },
    ]
  },

  { path: 'favorites/detail/:id', component: WebmarkDetailComponent, canActivate: [AuthgardService] },
  {
    path: 'favorites/list2', component: WebmarkListComponent, canActivate: [AuthgardService],
    children: [
      {
        path: 'upload',
        component: FavoriteUploadComponent
      },
      {
        path: 'drop',
        component: WebmarkCreateComponent
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