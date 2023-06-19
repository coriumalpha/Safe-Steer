import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { LearningPathStore } from '../stores/learning-path.store';
import { LearningPath } from '../models/learning-path.model';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class LearningPathService {
  private api = environment.api;

  constructor(private learningPathStore: LearningPathStore, private http: HttpClient) {}

  get() {
    return this.http.get<LearningPath[]>(`${this.api}/learningPaths`)
      .pipe(tap(entities => {
        this.learningPathStore.set(entities);
      }));
  }

  getLearningPath(id: number) {
    return this.http.get<LearningPath>(`${this.api}/learningPaths/${id}`)
      .pipe(tap(entity => {
        this.learningPathStore.add(entity);
      }));
  }

  addSkillToPath(learningPath: LearningPath, skillId: number): Observable<LearningPath> | Observable<never> {
    const updatedLearningPath = { ...learningPath, skills: [...learningPath.skills, skillId] };
    return this.http.put<LearningPath>(`${this.api}/learningPaths/${learningPath.id}`, updatedLearningPath)
      .pipe(tap(() => {
        this.learningPathStore.update(learningPath.id, updatedLearningPath);
      }));
  }

  removeSkillFromPath(learningPath: LearningPath, skillId: number): Observable<LearningPath> | Observable<never> {
    const updatedSkills = learningPath.skills.filter((id) => id !== skillId);
    const updatedLearningPath = { ...learningPath, skills: updatedSkills };
    return this.http.put<LearningPath>(`${this.api}/learningPaths/${learningPath.id}`, updatedLearningPath)
      .pipe(
        tap(() => {
          this.learningPathStore.update(learningPath.id, updatedLearningPath);
        })
      );
  }
}