import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// search module
import { Ng2SearchPipeModule } from 'ng2-search-filter';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { DragDropModule } from '@angular/cdk/drag-drop';
// import { AppRoutingModule, routingComponents } from './app-routing.module';
import { RouterModule } from '@angular/router';

import { HttpClientModule } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { ChoiceComponent } from './choice/choice.component';
import { HeaderComponent } from './header/header.component';
import { LibraryComponent } from './library/library.component';
import { LibraryItemComponent } from './library/library-item/library-item.component';
import { ListComponent } from './choice/list/list.component';
import { ItemComponent } from './choice/list/item/item.component';
import { SearchLibComponent } from './search-lib/search-lib.component';
import { TransformDirective } from './transform.directive';
import { NotFoundComponent } from './not-found/not-found.component';
import { LibraryItemDetailComponent } from './library/library-item-detail/library-item-detail.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { LoginComponent } from './login/login.component';
import { UserCheckGuard } from './user-check.guard';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    ChoiceComponent,
    HeaderComponent,
    LibraryComponent,
    ListComponent,
    ItemComponent,
    LibraryItemComponent,
    SearchLibComponent,
    TransformDirective,
    NotFoundComponent,
    LibraryItemDetailComponent,
    SignUpComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    Ng2SearchPipeModule,
    FormsModule,
    ReactiveFormsModule,
    DragDropModule,
    NgbModule,
    HttpClientModule,

    RouterModule.forRoot([
      { path: '', redirectTo: '/choice', pathMatch: 'full' },
      { path: 'library', component: LibraryComponent },
      { path: 'admin', component: ChoiceComponent, canActivate: [UserCheckGuard]},
      { path: 'choice', component: ChoiceComponent},
      { path: 'search-lib' , component: SearchLibComponent},
      { path : 'sign-up' , component: SignUpComponent},
      { path : 'login' , component: LoginComponent},
      { path: 'library/:name', component: LibraryItemDetailComponent},
      { path: '**', redirectTo: '/choice' },
    ]),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}