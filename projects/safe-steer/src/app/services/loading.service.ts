import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  private _loading$ = new BehaviorSubject<boolean>(false);

  get loading$() {
    return this._loading$.asObservable();
  }

  onStarted() {
    this._loading$.next(true);
  }

  onStopped() {
    this._loading$.next(false);
  }
}