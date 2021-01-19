import { NgModule } from '@angular/core';
import { Routes , RouterModule } from '@angular/router';
import { LibraryComponent } from './library/library.component';
import { NotFoundComponent } from './not-found/not-found.component';

const routes: Routes = [
    {path: 'library', component: LibraryComponent},
    {path: '**', component: NotFoundComponent}];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})


export class AppRoutingModule{ 

}

export const routingComponents = [LibraryComponent, NotFoundComponent]