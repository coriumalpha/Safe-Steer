import { Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, Validators } from '@angular/forms';
import { Skill } from '../../models/skill.model';
import { Category } from '../../models/category.model';


@Component({
  selector: 'app-new-skill-dialog',
  templateUrl: './new-skill-dialog.component.html',
  styleUrls: ['./new-skill-dialog.component.scss']
})
export class NewSkillDialogComponent {
  titleControl = new FormControl('', Validators.required);
  categoryControl = new FormControl('', Validators.required);
  imageNameControl = new FormControl('', Validators.required);
  descriptionControl = new FormControl('', Validators.required);

  categories: Category[];
  imageNames: string[];

  @Output() confirm = new EventEmitter<Skill>();

  constructor(
    public dialogRef: MatDialogRef<NewSkillDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {skill: Skill, categories: Category[], imageNames: string[]}
  ) {
    this.categories = data.categories;
    this.imageNames = data.imageNames;
  }

  onCancel(): void {
    this.dialogRef.close();
  }
  
  onConfirm(): void {
    if (this.titleControl.valid && this.categoryControl.valid && this.imageNameControl.valid && this.descriptionControl.valid) {
      this.confirm.emit({
        id: 0,
        title: this.titleControl.value as string,
        category: this.categoryControl.value as string,
        imageName: this.imageNameControl.value as string,
        description: this.descriptionControl.value as string
      });
    } else {
      this.confirm.error("Invalid data");
    }
  }

}
