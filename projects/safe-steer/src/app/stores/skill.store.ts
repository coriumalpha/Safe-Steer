
import { Injectable } from '@angular/core';
import { Skill } from '../models/skill.model';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { Category } from '../models/category.model';

export interface SkillState extends EntityState<Skill> {
  ui: {
    selectedCategory: Category | null
  }
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'skills' })
export class SkillStore extends EntityStore<SkillState> {
  constructor() {
    super({
      ui: {
        selectedCategory: null
      }
    });
  }
}
