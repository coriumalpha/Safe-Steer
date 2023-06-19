import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';

import { DemoComponent } from './demo/demo.component';
import { HomeComponent } from './home/home.component';
import { ComponentsModule } from '../components/components.module';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatChipsModule } from '@angular/material/chips';
import { MatStepperModule } from '@angular/material/stepper';

@NgModule({
  declarations: [
    DemoComponent,
    HomeComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatToolbarModule,
    MatChipsModule,
    MatStepperModule,
    ComponentsModule,
  ],
  exports: [
    DemoComponent,
    HomeComponent
  ]
})
export class PagesModule { }
