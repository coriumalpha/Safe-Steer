
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
      const learningPaths = skills.map(skill => skill.category);
      return [...new Set(learningPaths)];
    })
  );

  selectSelectedCategory$ = this.select(state => state.ui.selectedCategory);

  selectFilteredSkills$ = combineLatest([
    this.selectAll(),
    this.selectSelectedCategory$
  ]).pipe(
    map(([skills, selectedLearningPath]) => {
      if (selectedLearningPath) {
        return skills.filter(skill => skill.category === selectedLearningPath);
      } else {
        return skills;
      }
    })
  );
  
}
