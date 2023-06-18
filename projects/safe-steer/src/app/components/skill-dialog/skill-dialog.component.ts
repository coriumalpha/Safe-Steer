import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Skill } from '../../models/skill.model';

@Component({
  selector: 'app-skill-dialog',
  templateUrl: './skill-dialog.component.html',
  styleUrls: ['./skill-dialog.component.scss']
})
export class SkillDialogComponent {
  @Output() delete = new EventEmitter<void>();

  constructor(@Inject(MAT_DIALOG_DATA) public skill: Skill,
              public dialogRef: MatDialogRef<SkillDialogComponent>) {}

  getImagePath(imageName: string) {
    return 'assets/images/' + imageName + '.png';
  }

  onDelete(): void {
    this.delete.emit();
    this.dialogRef.close();
  }
}