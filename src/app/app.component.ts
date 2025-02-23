import { Component, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { UserListComponent } from './components/user-list/user-list.component';
import { LoginComponent } from './components/login/login.component';
import { SessionService } from './services/session.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { ThemeService } from './services/theme.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    UserListComponent,
    HttpClientModule,
    LoginComponent,
    TranslateModule,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  private themeSubscription?: Subscription;
  title = 'project_restapi';

  currentUser: any;

  constructor(
    private sessionService: SessionService,
    private router: Router,
    private translate: TranslateService,
    private themeService: ThemeService,
    private renderer: Renderer2
  ) {
    this.currentUser = this.sessionService.getUser();
    this.translate.addLangs(['de', 'en']);
    this.translate.setDefaultLang('en');
    this.translate.use('en');
  }

  logout(): void {
    this.sessionService.clearUser();
    this.router.navigate(['/']);
  }

  ngOnInit() {
    this.themeSubscription = this.themeService.isDarkMode$.subscribe(
      (isDark) => {
        if (isDark) {
          this.renderer.addClass(document.body, 'dark-mode');
        } else {
          this.renderer.removeClass(document.body, 'dark-mode');
        }
      }
    );
  }

  ngOnDestroy() {
    if (this.themeSubscription) {
      this.themeSubscription.unsubscribe();
    }
  }
}
