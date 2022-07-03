import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddministratorComponent } from './addministrator/addministrator.component';
import { AppComponent } from './app.component';
import { NotificationPopupComponent } from './notification-popup/notification-popup.component';
import { ShowNotificationsComponent } from './show-notifications/show-notifications.component';
import { UserComponent } from './user/user.component';

const routes: Routes = [

  {path: 'addmin', component: AddministratorComponent } ,
  {path: 'user', component: UserComponent } ,
  {path: 'notifications', component: ShowNotificationsComponent } ,
  {path: 'msg', component: NotificationPopupComponent } 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
