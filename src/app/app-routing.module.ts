import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddministratorComponent } from './addministrator/addministrator.component';
import { AppComponent } from './app.component';
import { UserComponent } from './user/user.component';

const routes: Routes = [

  {path: 'addmin', component: AddministratorComponent } ,
  {path: 'user', component: UserComponent } 
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
