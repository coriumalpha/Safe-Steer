import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { LearningPathState, LearningPathStore } from '../stores/learning-path.store';
import { LearningPath } from '../models/learning-path.model';

@Injectable({ providedIn: 'root' })
export class LearningPathQuery extends QueryEntity<LearningPathState, LearningPath> {
  constructor(store: LearningPathStore) {
    super(store);
  }
}