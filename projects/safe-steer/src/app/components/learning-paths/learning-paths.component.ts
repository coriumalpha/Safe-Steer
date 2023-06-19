import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { Skill } from '../../models/skill.model';

@Component({
  selector: 'app-learning-paths',
  templateUrl: './learning-paths.component.html',
  styleUrls: ['./learning-paths.component.scss']
})
export class LearningPathsComponent {
  @Input() learningPathSkills$!: Observable<(Skill | undefined)[]>;
}
