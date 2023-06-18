
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { ID } from '@datorama/akita';
import { LearningPathStore } from '../stores/learning-path.store';
import { LearningPath } from '../models/learning-path.model';

@Injectable({ providedIn: 'root' })
export class LearningPathService {
  constructor(private learningPathStore: LearningPathStore, private http: HttpClient) {}

  get() {
    return this.http.get<LearningPath[]>('http://localhost:3000/learningPaths')
      .pipe(tap(entities => {
        this.learningPathStore.set(entities);
      }));
  }

  getLearningPath(id: ID) {
    return this.http.get<LearningPath>(`http://localhost:3000/learningPaths/${id}`)
      .pipe(tap(entity => {
        this.learningPathStore.add(entity);
      }));
  }
}
