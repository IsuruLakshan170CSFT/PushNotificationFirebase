import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddministratorComponent } from './addministrator/addministrator.component';
import { environment } from "../environments/environment";
import { initializeApp } from "firebase/app";
import {HttpClientModule} from '@angular/common/http';
import {ReactiveFormsModule, FormsModule } from '@angular/forms';
import { UserService } from './shared/user.service';
import {ListboxModule} from 'primeng/listbox';
import {TabViewModule} from 'primeng/tabview';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {ButtonModule} from 'primeng/button';
import {MultiSelectModule} from 'primeng/multiselect';
import {TableModule} from 'primeng/table';
import { UserComponent } from './user/user.component';

import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { ShowNotificationsComponent } from './show-notifications/show-notifications.component';
import {CheckboxModule} from 'primeng/checkbox';
import { HomeComponent } from './home/home.component';
import {ProgressBarModule} from 'primeng/progressbar';

import {ToastModule} from 'primeng/toast';
import {RippleModule} from 'primeng/ripple';

initializeApp(environment.firebase);

@NgModule({
  declarations: [
    AppComponent,
    AddministratorComponent,
    UserComponent,
    ShowNotificationsComponent,
    HomeComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ListboxModule,
    FormsModule,
    BrowserAnimationsModule,
    ButtonModule,
    MultiSelectModule,
    TableModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    CheckboxModule,
    ProgressBarModule,
    ToastModule,
    RippleModule
    
  ],
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
