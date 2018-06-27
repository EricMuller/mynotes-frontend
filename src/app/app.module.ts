import {BrowserModule} from '@angular/platform-browser';

import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {HttpModule} from '@angular/http';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';






import {AppComponent} from './app.component';

// note



import {TinyEditorComponent} from './shared/components/tiny-editor/tiny-editor.component';
import {RatingComponent} from './shared/components/rating/rating.component';
import {SimpleDndComponent} from './shared/components/simple-dnd/simple-dnd.component';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {InputValidationComponent} from './shared/components/input-validation/input-validation.component';
import {FilterPipe} from './features/shared/pipes/filter.pipe';
import {KeysPipe} from './features/shared/pipes/keys.pipe';
import {CallbackPipe} from './features/shared/pipes/callback.pipe';

import {WsClientService} from './core/ws/ws-client.service';
import {WebsocketService} from './core/ws/websocket.service';


import {MaterialModule} from './shared/material/material.module';
import {AppRoutingModule} from './app.routes.config';
import {NavHeaderComponent} from './shared/components/nav-header/nav-header.component';

import {EscapeHtmlPipe} from './features/shared/pipes/escape-html.pipe';
import {ToArrayPipe} from './features/shared/pipes/to-array.pipe';
import {NotificationsComponent} from './core/notifications/notifications.component';
import {SafePipe} from './features/shared/pipes/safe.pipe';
import {HttpService} from './api/http.service';

import {ResponseService} from './api/response.service';
import {ObservableService} from './core/observable/observable.service';

import {HTTP_PROVIDER} from './core/http/custom.http.provider';
import {NotifierService} from './core/notifications/notifier.service';
import {AUTHENTIFICATION_ENDPOINT} from './api/auth/api-auth.config';
import {LoginComponent} from './features/authentification/login/login.component';
import {HomeComponent} from './home/home.component';
import {TagCountComponent} from './features/tags/tag-count/tag-count.component';
import {TagSelectComponent} from './features/tags/tag-select/tag-select.component';
import {TagListComponent} from './features/tags/tag-list/tag-list.component';
import {FavoriteUploadComponent} from './features/favorite/favorite-upload/favorite-upload.component';
import {FavoriteListComponent} from './features/favorite/favorite-list/favorite-list.component';
import {FavoriteDetailComponent} from './features/favorite/favorite-detail/favorite-detail.component';
import {DashboardComponent} from './features/dashboard/dashboard.component';
import {TagCreateDialogComponent} from './features/tags/tag-create-dialog/tag-create-dialog.component';
import {BackupListComponent} from './features/backup/backup-list/backup-list.component';
import {RegistrationComponent} from './features/authentification/registration/registration.component';
import {FolderCreateDialogComponent} from './features/folder/folder-create-dialog/folder-create-dialog.component';
import {FolderListComponent} from './features/folder/folder-list/folder-list.component';
import {ConfirmComponent} from './features/authentification/confirm/confirm.component';
import {PolicyComponent} from './features/policy/policy.component';
import {LoginGoogleComponent} from './features/authentification/login/login-google/login-google.component';
import {LoginLinkedInComponent} from './features/authentification/login/login-linked-in/login-linked-in.component';
import {FolderSelectDialogComponent} from './features/folder/folder-select-dialog/folder-select-dialog.component';
import {BackupBookmarkComponent} from './features/backup/backup-bookmark/backup-bookmark.component';
import {NoteComponents} from './features/bookmark/components';
import {BookmarkService} from './features/bookmark/services/bookmark.service';
import {FilterService} from './features/bookmark/services/search.service';
import {AuthentificationService} from './features/authentification/authentification.service';
import {MYWEBMARK_ENPOINT} from './api/webmarks/api-webmarks.config';
import {AuthgardService} from './features/authentification/authgard.service';
import {FolderService} from './features/folder/services/folder.service';
import {TagService} from './features/tags/services/tag.service';
import {MatTabStore} from './features/shared/tab-store/tab-store.service';
import { BookmarkAppComponent } from './features/bookmark/bookmark-app/bookmark-app.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule, MatListModule, MatGridListModule, MatCardModule, MatMenuModule } from '@angular/material';
import { BookmarkDashComponent } from './features/bookmark/bookmark-dash/bookmark-dash.component';
/** api */

// import { FileSelectDirective, FileDropDirective } from 'ng2-file-upload';


// import * as Drive from "gapi.drive.realtime";

/*export const ROUTE_CONFIG = [{
  path: '',
  loadChildren: '/app/app.module'
}];*/

@NgModule({
  declarations: [
    AppComponent,
    NavHeaderComponent,
    ...NoteComponents,
    EscapeHtmlPipe,
    ToArrayPipe,
    NotificationsComponent,
    LoginComponent,
    HomeComponent,
    TagCountComponent,
    TagSelectComponent,
    TagListComponent,
    FavoriteUploadComponent,
    FavoriteListComponent,
    FavoriteDetailComponent,
    DashboardComponent,
    // FileSelectDirective,
    TinyEditorComponent,
    RatingComponent,
    SimpleDndComponent,
    TagCreateDialogComponent,
    BackupListComponent,
    RegistrationComponent,
    InputValidationComponent,
    FilterPipe,
    KeysPipe,
    CallbackPipe,
    FolderCreateDialogComponent,
    FolderListComponent,
    ConfirmComponent,
    PolicyComponent,
    LoginGoogleComponent,
    LoginLinkedInComponent,
    FolderSelectDialogComponent,
    BackupBookmarkComponent,
    SafePipe,
    BookmarkAppComponent,
    BookmarkDashComponent

  ],
  imports: [
    MaterialModule,
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    NgbModule.forRoot(),
    BrowserAnimationsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
  ],
  entryComponents: [
    FolderCreateDialogComponent, FolderSelectDialogComponent
  ],
  providers: [BookmarkService, FilterService, HttpService, AuthentificationService,
    {provide: 'mywebmark.endpoint', useValue: MYWEBMARK_ENPOINT},
    {provide: 'authentification.endpoint', useValue: AUTHENTIFICATION_ENDPOINT},
    NotifierService, HTTP_PROVIDER, AuthgardService, ResponseService, TagService, ObservableService,
    WsClientService, WebsocketService, FolderService, MatTabStore
  ],

  bootstrap: [AppComponent]
})
export class AppModule {
}
