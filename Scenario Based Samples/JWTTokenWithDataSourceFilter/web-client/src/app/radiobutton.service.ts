import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RadioButtonService {
  private radioValue = new BehaviorSubject<string>('guid'); // Keeps the current value
  radioValue$ = this.radioValue.asObservable(); // Allows components to listen for changes

  setRadioValue(value: string) {
    this.radioValue.next(value);
  }
}
