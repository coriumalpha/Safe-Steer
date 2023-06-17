
import { Skill } from '../models/skill.model';
import { QueryEntity } from '@datorama/akita';
import { Injectable } from '@angular/core';
import { SkillState, SkillStore } from '../stores/skill.store';
import { combineLatest, map } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SkillQuery extends QueryEntity<SkillState, Skill> {
  constructor(store: SkillStore) {
    super(store);
  }

  selectLearningPaths$ = this.selectAll().pipe(
    map(skills => {
      const learningPaths = skills.map(skill => skill.learningPath);
      return [...new Set(learningPaths)];
    })
  );

  selectSelectedLearningPath$ = this.select(state => state.ui.selectedLearningPath);

  selectFilteredSkills$ = combineLatest([
    this.selectAll(),
    this.selectSelectedLearningPath$
  ]).pipe(
    map(([skills, selectedLearningPath]) => {
      if (selectedLearningPath) {
        return skills.filter(skill => skill.learningPath === selectedLearningPath);
      } else {
        return skills;
      }
    })
  );
  
}
