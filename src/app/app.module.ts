import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { HttpModule } from '@angular/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { OpaqueToken } from '@angular/core';
/* router */
import { RouterModule } from '@angular/router';
import { ROUTES_CONFIG } from 'app/config/app.routes.config';

/* http error */
import { HTTP_PROVIDER } from 'app/shared/modules/http/custom.http.provider';
//import { HttpAuthInterceptor } from 'app/shared/modules/http/http-auth-Interceptor';
import { NotifierService } from 'app/shared/modules/notifications/notifier.service'

/** api */

import { ApiService } from 'app/shared/modules/api/api.service';
import { MYNOTES_ENPOINT } from 'app/config/app.api.config';
import { AUTHENTIFICATION_ENDPOINT } from 'app/config/app.api.config'
/* utils */
import { EscapeHtmlPipe } from 'app/shared/pipes/escape-html.pipe';
import { ToArrayPipe } from 'app/shared/pipes/to-array.pipe';
/* components */
import { AppComponent } from './app.component';
import { NavHeaderComponent } from 'app/shared/components/nav-header/nav-header.component';
// note
import { NoteComponents } from 'app/modules/note/components';
import { NoteService } from 'app/modules/note/services/note.service';
import { FilterService } from 'app/modules/note/services/search.service';
import { ResponseService } from 'app/shared/services/response.service';

import { NotificationsComponent } from 'app/shared/modules/notifications/notifications.component';
import { LoginComponent } from './shared/modules/authentification/login/login.component';
import { AuthentificationService } from './shared/modules/authentification/authentification.service';
import { AuthgardService } from './shared/modules/authentification/authgard.service';
import { HomeComponent } from './modules/home/home/home.component';
import { TagCloudComponent } from './modules/tags/tag-cloud/tag-cloud.component';
import { TagService } from './modules/tags/services/tag.service';
import { TagSelectComponent } from './modules/tags/tag-select/tag-select.component';
import { TagAbstractComponent } from './modules/tags/tag-abstract/tag-abstract.component';

import { TagCreateDialogComponent } from 'app/modules/tags/tag-create-dialog/tag-create-dialog.component';

import { TagListComponent } from './modules/tags/tag-list/tag-list.component';
import { ObservableService } from 'app/shared/modules/observable/observable.service';
import { TagUploadComponent } from './modules/tags/tag-upload/tag-upload.component';
import { FavoriteUploadComponent } from './modules/favorite/favorite-upload/favorite-upload.component';
import { FavoriteListComponent } from './modules/favorite/favorite-list/favorite-list.component';
import { FavoriteDetailComponent } from './modules/favorite/favorite-detail/favorite-detail.component';
import { DashboardComponent } from './modules/dashboard/dashboard.component'

//import { FileSelectDirective, FileDropDirective } from 'ng2-file-upload';

import { MaterialModule } from '@angular/material';
import { TinyEditorComponent } from './shared/components/tiny-editor/tiny-editor.component'
import { RatingComponent } from './shared/components/rating/rating.component'
import { SimpleDndComponent } from './shared/components/simple-dnd/simple-dnd.component'
import { DatepickerModule } from 'angular2-material-datepicker';
import { BackupListComponent } from './modules/backup/backup-list/backup-list.component'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RegistrationComponent } from './shared/modules/authentification/registration/registration.component';
import { InputValidationComponent } from './shared/components/input-validation/input-validation.component';
import { FilterPipe } from './shared/pipes/filter.pipe';
import { KeysPipe } from './shared/pipes/keys.pipe';
//import * as Drive from "gapi.drive.realtime";

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
    TagCloudComponent,
    TagSelectComponent,
    TagAbstractComponent,
    TagListComponent,
    TagUploadComponent,
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
    KeysPipe
  ],
  imports: [
    MaterialModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    NgbModule.forRoot(),
    RouterModule.forRoot(ROUTES_CONFIG),
    DatepickerModule,
    BrowserAnimationsModule
  ],
  providers: [NoteService, FilterService, ApiService, AuthentificationService,
    { provide: 'mynotes.endpoint', useValue: MYNOTES_ENPOINT },
    { provide: 'authentification.endpoint', useValue: AUTHENTIFICATION_ENDPOINT },
    NotifierService, HTTP_PROVIDER, AuthgardService, ResponseService, TagService, ObservableService],
  bootstrap: [AppComponent]
})
export class AppModule { }