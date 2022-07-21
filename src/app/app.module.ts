import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddministratorComponent } from './addministrator/addministrator.component';
import { environment } from "../environments/environment";
import { initializeApp } from "firebase/app";
import {HttpClientModule} from '@angular/common/http';
import {ReactiveFormsModule, FormsModule } from '@angular/forms';
import { UserService } from './notification-services/user.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {ButtonModule} from 'primeng/button';
import {TableModule} from 'primeng/table';
import { UserComponent } from './user/user.component';
import { ShowNotificationsComponent } from './show-notifications/show-notifications.component';
import {CheckboxModule} from 'primeng/checkbox';
import {ProgressBarModule} from 'primeng/progressbar';
import {ToastModule} from 'primeng/toast';
import { MyNotificationsComponent } from './my-notifications/my-notifications.component';
import { TimeConvertComponent } from './time-convert/time-convert.component';
import {OverlayPanelModule} from 'primeng/overlaypanel';

initializeApp(environment.firebase);

@NgModule({
  declarations: [
    AppComponent,
    AddministratorComponent,
    UserComponent,
    ShowNotificationsComponent,
    MyNotificationsComponent,
    TimeConvertComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    ButtonModule,
    TableModule,
    ReactiveFormsModule,
    CheckboxModule,
    ProgressBarModule,
    ToastModule,
    OverlayPanelModule,
    
  ],
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
