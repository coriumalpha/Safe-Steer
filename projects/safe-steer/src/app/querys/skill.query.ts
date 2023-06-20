
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

  selectCategory = this.select(state => state.ui.selectedCategory);

  selectFilteredSkills$ = combineLatest([
    this.selectAll(),
    this.selectCategory
  ]).pipe(
    map(([skills, selectedCategory]) => {
      if (selectedCategory) {
        return skills.filter(skill => skill.category === selectedCategory.title);
      } else {
        return skills;
      }
    })
  );
  
}
