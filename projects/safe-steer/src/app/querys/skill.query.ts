
import { Skill } from '../models/skill.model';
import { QueryEntity } from '@datorama/akita';
import { Injectable } from '@angular/core';
import { SkillState, SkillStore } from '../stores/skill.store';

@Injectable({ providedIn: 'root' })
export class SkillQuery extends QueryEntity<SkillState, Skill> {
  constructor(store: SkillStore) {
    super(store);
  }
}
