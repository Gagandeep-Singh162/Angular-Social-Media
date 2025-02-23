import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private isDarkMode = new BehaviorSubject<boolean>(this.getInitialTheme());
  isDarkMode$ = this.isDarkMode.asObservable();

  private getInitialTheme(): boolean {
    const storedTheme = localStorage.getItem('theme');
    return storedTheme === 'dark';
  }

  toggleTheme() {
    const newTheme = !this.isDarkMode.value;
    this.isDarkMode.next(newTheme);
    localStorage.setItem('theme', newTheme ? 'dark' : 'light');
  }
}
