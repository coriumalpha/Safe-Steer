import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card'; 
import { HomeComponent } from './pages/home/home.component';
import { DemoComponent } from './pages/demo/demo.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { AkitaNgDevtools } from '@datorama/akita-ngdevtools';
import { environment } from '../environments/environment';
import { HttpClientModule } from '@angular/common/http';
import { SkillCardComponent } from './components/skill-card/skill-card.component';
import { NewItemCardComponent } from './components/new-item-card/new-item-card.component';
import { TruncatedTextComponent } from './shared/truncated-text/truncated-text.component';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialogModule } from '@angular/material/dialog';
import { SkillDialogComponent } from './components/skill-dialog/skill-dialog.component';
import { ErrorDialogComponent } from './components/error-dialog/error-dialog.component';
import { MatStepperModule } from '@angular/material/stepper';
import { NewSkillDialogComponent } from './components/new-skill-dialog/new-skill-dialog.component'; 
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select'; 
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input'; 

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DemoComponent,
    NavbarComponent,
    SkillCardComponent,
    NewItemCardComponent,
    TruncatedTextComponent,
    SkillDialogComponent,
    ErrorDialogComponent,
    NewSkillDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatChipsModule,
    HttpClientModule,
    MatDialogModule,
    MatStepperModule,
    MatFormFieldModule,
    MatOptionModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatInputModule,
    environment.production ? [] : AkitaNgDevtools.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
