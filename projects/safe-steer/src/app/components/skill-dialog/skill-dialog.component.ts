import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Skill } from '../../models/skill.model';

@Component({
  selector: 'app-skill-dialog',
  templateUrl: './skill-dialog.component.html',
  styleUrls: ['./skill-dialog.component.scss']
})
export class SkillDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public skill: Skill) {}

  getImagePath(imageName: string) {
    return 'assets/images/' + imageName + '.png';
  }
}
