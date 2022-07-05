import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddministratorComponent } from './addministrator/addministrator.component';
import { MyNotificationsComponent } from './my-notifications/my-notifications.component';
import { ShowNotificationsComponent } from './show-notifications/show-notifications.component';
import { TimeConvertComponent } from './time-convert/time-convert.component';
import { UserComponent } from './user/user.component';

const routes: Routes = [

  {path: 'addmin', component: AddministratorComponent } ,
  {path: 'user', component: UserComponent } ,
  {path: 'notifications', component: ShowNotificationsComponent },
  {path: 'msg', component: MyNotificationsComponent } ,
  {path: 'time', component: TimeConvertComponent } 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
