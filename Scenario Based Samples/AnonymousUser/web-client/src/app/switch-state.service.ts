// import { Injectable } from '@angular/core';
// import { BehaviorSubject } from 'rxjs';

// @Injectable({
//   providedIn: 'root'
// })
// export class SwitchStateService {
//   private switchState = new BehaviorSubject<boolean>(true); // Default to ON
//   switchState$ = this.switchState.asObservable();

//   setSwitchState(state: boolean) {
//     this.switchState.next(state);
//   }
// }

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SwitchStateService {
  private readonly storageKey = 'switchState';

  // Use BehaviorSubject to store the state
  private switchStateSubject = new BehaviorSubject<boolean>(this.getStoredState());
  switchState$ = this.switchStateSubject.asObservable();

  private getStoredState(): boolean {
    return localStorage.getItem(this.storageKey) === 'false' ? false : true;
  }

  setSwitchState(state: boolean) {
    localStorage.setItem(this.storageKey, String(state)); // Save to localStorage
    this.switchStateSubject.next(state);
  }

  // ✅ Expose getValue() from BehaviorSubject
  getSwitchState(): boolean {
    return this.switchStateSubject.getValue();
  }
}
