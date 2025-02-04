// import { Injectable } from '@angular/core';
// import { BehaviorSubject } from 'rxjs';

// @Injectable({
//   providedIn: 'root'
// })
// export class SwitchStateService {
//   private readonly storageKey = 'switchState';

//   // Use BehaviorSubject to store the state
//   private switchStateSubject = new BehaviorSubject<boolean>(this.getStoredState());
//   switchState$ = this.switchStateSubject.asObservable();

//   private getStoredState(): boolean {
//     return localStorage.getItem(this.storageKey) === 'false' ? false : true;
//   }

//   setSwitchState(state: boolean) {
//     localStorage.setItem(this.storageKey, String(state)); // Save to localStorage
//     this.switchStateSubject.next(state);
//   }

//   // ✅ Expose getValue() from BehaviorSubject
//   getSwitchState(): boolean {
//     return this.switchStateSubject.getValue();
//   }
// }


import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SwitchStateService {
  private readonly storageKeys = {
    switch1: 'switchState1',
    switch2: 'switchState2',
    switch3: 'switchState3'
  };

  // Create BehaviorSubjects for each toggle switch
  private switchState1 = new BehaviorSubject<boolean>(this.getStoredState(this.storageKeys.switch1));
  private switchState2 = new BehaviorSubject<boolean>(this.getStoredState(this.storageKeys.switch2));
  private switchState3 = new BehaviorSubject<boolean>(this.getStoredState(this.storageKeys.switch3));
  private jsonUrl = 'assets/anonymoususer.json'; // Adjust path if necessary

  switchState1$ = this.switchState1.asObservable();
  switchState2$ = this.switchState2.asObservable();
  switchState3$ = this.switchState3.asObservable();

  private getStoredState(key: string): boolean {
    return localStorage.getItem(key) === 'false' ? false : true;
  }

  setSwitchState(switchNumber: number, state: boolean) {
    const key = this.storageKeys[`switch${switchNumber}` as keyof typeof this.storageKeys];
    localStorage.setItem(key, String(state)); // Save to localStorage

    if (switchNumber === 1) this.switchState1.next(state);
    if (switchNumber === 2) this.switchState2.next(state);
    if (switchNumber === 3) this.switchState3.next(state);
  }

  getSwitchState(switchNumber: number): boolean {
    const key = this.storageKeys[`switch${switchNumber}` as keyof typeof this.storageKeys];
    return this.getStoredState(key);
  }
  
}

