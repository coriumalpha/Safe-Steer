import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DemoComponent } from './demo/demo.component';
import { HomeComponent } from './home/home.component';
import { ComponentsModule } from '../components/components.module';
import { MaterialModule } from '../material.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    DemoComponent,
    HomeComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ComponentsModule,
    RouterModule
  ],
  exports: [
    DemoComponent,
    HomeComponent
  ]
})
export class PagesModule { }
