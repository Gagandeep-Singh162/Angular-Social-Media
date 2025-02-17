import { Component, OnInit } from '@angular/core';
import { SessionService } from '../../services/session.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-navbar',
  standalone: true,
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  imports: [CommonModule],
})
export class NavbarComponent implements OnInit {
  user: any;

  constructor(private sessionService: SessionService, private router: Router) {}

  ngOnInit(): void {
    this.user = this.sessionService.getUser();
    console.log('User in navbar:', this.user);
  }

  clearSession(): void {
    this.sessionService.clearUser();
    console.log('Session cleared');
    this.user = null;
    this.router.navigate(['/login']);
  }
}
