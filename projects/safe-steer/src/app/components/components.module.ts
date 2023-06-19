import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from '../material.module';

import { SkillDialogComponent } from './skill-dialog/skill-dialog.component';
import { ErrorDialogComponent } from './error-dialog/error-dialog.component';
import { NewItemCardComponent } from './new-item-card/new-item-card.component';
import { NewSkillDialogComponent } from './new-skill-dialog/new-skill-dialog.component';
import { SkillCardComponent } from './skill-card/skill-card.component';
import { LearningPathsComponent } from './learning-paths/learning-paths.component';

@NgModule({
  declarations: [
    ErrorDialogComponent,
    NewItemCardComponent,
    NewSkillDialogComponent,
    SkillCardComponent,
    SkillDialogComponent,
    LearningPathsComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    SharedModule
  ],
  exports: [
    ErrorDialogComponent,
    NewItemCardComponent,
    NewSkillDialogComponent,
    SkillCardComponent,
    SkillDialogComponent,
    LearningPathsComponent
  ]
})
export class ComponentsModule { }
