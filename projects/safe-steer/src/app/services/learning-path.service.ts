
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { filter, switchMap, tap } from 'rxjs/operators';
import { LearningPathStore } from '../stores/learning-path.store';
import { LearningPath } from '../models/learning-path.model';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class LearningPathService {
  constructor(private learningPathStore: LearningPathStore, private http: HttpClient) {}

  get() {
    return this.http.get<LearningPath[]>('http://localhost:3000/learningPaths')
      .pipe(tap(entities => {
        this.learningPathStore.set(entities);
      }));
  }

  getLearningPath(id: number) {
    return this.http.get<LearningPath>(`http://localhost:3000/learningPaths/${id}`)
      .pipe(tap(entity => {
        this.learningPathStore.add(entity);
      }));
  }

  addSkillToPath(learningPath: LearningPath, skillId: number): Observable<LearningPath> | Observable<never> {
    const updatedLearningPath = { ...learningPath, skills: [...learningPath.skills, skillId] };
    return this.http.put<LearningPath>(`http://localhost:3000/learningPaths/${learningPath.id}`, updatedLearningPath)
      .pipe(tap(() => {
        this.learningPathStore.update(learningPath.id, updatedLearningPath);
      }));
  }

  removeSkillFromPath(learningPath: LearningPath, skillId: number): Observable<LearningPath> | Observable<never> {
    const updatedSkills = learningPath.skills.filter((id) => id !== skillId);
    const updatedLearningPath = { ...learningPath, skills: updatedSkills };
    return this.http
      .put<LearningPath>(`http://localhost:3000/learningPaths/${learningPath.id}`, updatedLearningPath)
      .pipe(
        tap(() => {
          this.learningPathStore.update(learningPath.id, updatedLearningPath);
        })
      );
  }
}
