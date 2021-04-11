import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SearchUsersComponent } from './components/search-users/search-users.component';
import { UserComponent } from './components/user/user.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { reducer } from './store/reducer';
import { Effects } from './store/effects';
import { GraphQLModule } from './graphql.module';
import { AuthInterceptorService } from './interceptors/auth-interceptor.service';
import { AlertComponent } from './shared/components/alert/alert.component';

@NgModule({
  declarations: [
    AppComponent,
    SearchUsersComponent,
    UserComponent,
    AlertComponent,
  ],
  entryComponents: [AlertComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    StoreModule.forRoot({users: reducer}),
    EffectsModule.forRoot([Effects]),
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    GraphQLModule
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
