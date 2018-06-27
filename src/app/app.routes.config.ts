import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {PolicyComponent} from './features/policy/policy.component';
import {DashboardComponent} from './features/dashboard/dashboard.component';
import {FavoriteUploadComponent} from './features/favorite/favorite-upload/favorite-upload.component';
import {TagCreateDialogComponent} from './features/tags/tag-create-dialog/tag-create-dialog.component';
import {BookmarkComponent} from './features/bookmark/bookmark/bookmark.component';
import {AuthgardService} from './features/authentification/authgard.service';

import {WebmarkListComponent} from './features/bookmark/bookmark-list/bookmark-list.component';
import {WebmarkDetailComponent} from './features/bookmark/bookmark-detail/bookmark-detail.component';
import {BackupListComponent} from './features/backup/backup-list/backup-list.component';
import {FolderListComponent} from './features/folder/folder-list/folder-list.component';
import {BookmarkCreateComponent} from './features/bookmark/bookmark-create/bookmark-create.component';
import {TagListComponent} from './features/tags/tag-list/tag-list.component';
import {RegistrationComponent} from './features/authentification/registration/registration.component';
import {ConfirmComponent} from './features/authentification/confirm/confirm.component';
import {LoginComponent} from './features/authentification/login/login.component';
import {BookmarkAppComponent} from './features/bookmark/bookmark-app/bookmark-app.component';
import {BookmarkFilterComponent} from './features/bookmark/bookmark-filter/bookmark-filter.component';


const routes: Routes   = [
  {
    path: '', redirectTo: 'bookmark/search', pathMatch: 'full'
  },
  {path: 'policy', component: PolicyComponent},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'upload', component: FavoriteUploadComponent},
  {path: 'tag/create', component: TagCreateDialogComponent},
  {
    path: 'bookmark', component: BookmarkAppComponent, canActivate: [AuthgardService],
    children: [
      {path: 'filter', component: BookmarkFilterComponent, canActivate: [AuthgardService]},
      {path: 'list', component: WebmarkListComponent, canActivate: [AuthgardService]},
      {path: 'detail/:id', component: WebmarkDetailComponent, canActivate: [AuthgardService]},
      {path: 'new', component: WebmarkDetailComponent, canActivate: [AuthgardService]},
      {path: 'folder', component: WebmarkListComponent},
      {path: 'backup', component: BackupListComponent},
      {path: 'folders', component: FolderListComponent},
      {path: '**', redirectTo: 'list'},
    ]
  },

  {path: 'favorites/detail/:id', component: WebmarkDetailComponent, canActivate: [AuthgardService]},
  {
    path: 'favorites/list2', component: WebmarkListComponent, canActivate: [AuthgardService],
    children: [
      {path: 'upload', component: FavoriteUploadComponent},
      {path: 'drop', component: BookmarkCreateComponent},
    ]
  },
  {path: 'tags', component: TagListComponent},
  {path: 'register', component: RegistrationComponent},
  {path: 'confirm/:id', component: ConfirmComponent},
  {path: 'login', component: LoginComponent},
  // otherwise redirect to home
  {path: '**', redirectTo: 'bookmark/search'}
];


@NgModule({
  imports: [
    RouterModule.forRoot(routes, {useHash: true, enableTracing: false})],
  exports: [
    RouterModule
  ],
  providers: []
})
export class AppRoutingModule {
}
