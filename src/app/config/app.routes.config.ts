
import { WebmarkListComponent } from 'app/modules/bookmark/bookmark-list/bookmark-list.component';
import { WebmarkDetailComponent } from 'app/modules/bookmark/bookmark-detail/bookmark-detail.component';
import { BookmarkCreateComponent } from 'app/modules/bookmark/bookmark-create/bookmark-create.component';
import { BookmarkFilterComponent } from 'app/modules/bookmark/bookmark-search/bookmark-search.component';
import { BookmarkComponent } from 'app/modules/bookmark/bookmark/bookmark.component';

import { LoginComponent } from 'app/shared/modules/authentification/login/login.component';
import { AuthgardService } from 'app/shared/modules/authentification/authgard.service';

import { HomeComponent } from 'app/modules/home/home/home.component';
import { TagListComponent } from 'app/modules/tags/tag-list/tag-list.component';


import { DashboardComponent } from 'app/modules/dashboard/dashboard.component'

import { FavoriteListComponent } from 'app/modules/favorite/favorite-list/favorite-list.component'
import { FavoriteUploadComponent } from 'app/modules/favorite/favorite-upload/favorite-upload.component'

import { TagCreateDialogComponent } from 'app/modules/tags/tag-create-dialog/tag-create-dialog.component';

import { BackupListComponent } from 'app/modules/backup/backup-list/backup-list.component'

import { RegistrationComponent } from 'app/shared/modules/authentification/registration/registration.component'
import { ConfirmComponent } from 'app/shared/modules/authentification/confirm/confirm.component'
import { FolderListComponent } from 'app/modules/folder/folder-list/folder-list.component'
import { PolicyComponent } from 'app/modules/policy/policy.component'

export const ROUTES_CONFIG = [
  {
    path: '', redirectTo: 'bookmark/search', pathMatch: 'full'
  },
  { path: 'policy', component: PolicyComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'upload', component: FavoriteUploadComponent },
  { path: 'tag/create', component: TagCreateDialogComponent },
  {
    path: 'bookmark', component: BookmarkComponent, canActivate: [AuthgardService],
    children: [
      { path: 'search', component: BookmarkFilterComponent, canActivate: [AuthgardService] },
      { path: 'list', component: WebmarkListComponent, canActivate: [AuthgardService] },
      { path: 'detail/:id', component: WebmarkDetailComponent, canActivate: [AuthgardService] },
      { path: 'new', component: WebmarkDetailComponent, canActivate: [AuthgardService] },
      { path: 'folder', component: WebmarkListComponent },
      { path: 'backup', component: BackupListComponent },
      { path: 'folders', component: FolderListComponent },
      { path: '**', redirectTo: 'list' },
    ]
  },

  { path: 'favorites/detail/:id', component: WebmarkDetailComponent, canActivate: [AuthgardService] },
  {
    path: 'favorites/list2', component: WebmarkListComponent, canActivate: [AuthgardService],
    children: [
      { path: 'upload', component: FavoriteUploadComponent },
      { path: 'drop', component: BookmarkCreateComponent },
    ]
  },
  { path: 'tags', component: TagListComponent },
  { path: 'register', component: RegistrationComponent },
  { path: 'confirm/:id', component: ConfirmComponent },
  { path: 'login', component: LoginComponent },
  // otherwise redirect to home
  { path: '**', redirectTo: 'bookmark/search' }
];