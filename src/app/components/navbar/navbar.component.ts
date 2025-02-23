import { Component, OnInit } from '@angular/core';
import { SessionService } from '../../services/session.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { TranslateService } from '@ngx-translate/core';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  imports: [CommonModule],
})
export class NavbarComponent implements OnInit {
  themeText: string = 'Switch to Dark Mode';
  isDarkMode: boolean = false;

  constructor(
    private sessionService: SessionService,
    private router: Router,
    private translate: TranslateService,
    private themeService: ThemeService
  ) {}

  ngOnInit(): void {
    this.themeService.isDarkMode$.subscribe((isDark) => {
      this.isDarkMode = isDark;
    });
  }

  switchLanguage(language: string | null) {
    if (language !== null) {
      this.translate.use(language);
    }
  }

  toggleTheme() {
    this.themeService.toggleTheme();
  }

  scrollToUserData() {
    const element = document.getElementById('user-data-section');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
