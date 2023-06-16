
import { Injectable } from '@angular/core';
import { Skill } from '../models/skill.model';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';

export interface SkillState extends EntityState<Skill> {}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'skills' })
export class SkillStore extends EntityStore<SkillState> {
  constructor() {
    super();
  }
}
