import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card'; 
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';

import { SkillDialogComponent } from './skill-dialog/skill-dialog.component';
import { ErrorDialogComponent } from './error-dialog/error-dialog.component';
import { NewItemCardComponent } from './new-item-card/new-item-card.component';
import { NewSkillDialogComponent } from './new-skill-dialog/new-skill-dialog.component';
import { SkillCardComponent } from './skill-card/skill-card.component';
import { TruncatedTextComponent } from '../shared/truncated-text/truncated-text.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    ErrorDialogComponent,
    NewItemCardComponent,
    NewSkillDialogComponent,
    SkillCardComponent,
    SkillDialogComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    MatFormFieldModule,
    MatOptionModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatInputModule,
    SharedModule
  ],
  exports: [
    ErrorDialogComponent,
    NewItemCardComponent,
    NewSkillDialogComponent,
    SkillCardComponent,
    SkillDialogComponent
  ]
})
export class ComponentsModule { }
