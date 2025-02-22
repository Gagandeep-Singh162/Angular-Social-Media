// theme.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly themeKey = 'user-theme';
  private isDarkMode = new BehaviorSubject<boolean>(false);
  public isDarkMode$: Observable<boolean> = this.isDarkMode.asObservable();

  constructor() { this.initializeTheme(); }

  private initializeTheme(): void {
    const savedTheme = localStorage.getItem(this.themeKey);
    const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    const initialTheme = savedTheme ? savedTheme === 'dark' : systemDark;
    this.isDarkMode.next(initialTheme);
    this.applyTheme(initialTheme ? 'dark' : 'light');
  }

  public toggleTheme(): void {
    const newTheme = !this.isDarkMode.value;
    this.isDarkMode.next(newTheme);
    this.applyTheme(newTheme ? 'dark' : 'light');
    localStorage.setItem(this.themeKey, newTheme ? 'dark' : 'light');
  }

  private applyTheme(theme: string): void {
    document.documentElement.setAttribute('data-theme', theme);
  }
}