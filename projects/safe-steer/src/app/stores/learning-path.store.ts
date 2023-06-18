import { Injectable } from '@angular/core';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { LearningPath } from '../models/learning-path.model';

export interface LearningPathState extends EntityState<LearningPath> {}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'learning-path' })
export class LearningPathStore extends EntityStore<LearningPathState> {
  constructor() {
    super();
  }
}
