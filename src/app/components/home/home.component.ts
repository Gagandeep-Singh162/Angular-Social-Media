import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { CardComponent } from '../card/card.component';
import { PostComponent } from '../post/post.component';
import { UserDataComponent } from '../user-data/user-data.component';

@Component({
  selector: 'app-home',
  imports: [NavbarComponent, CardComponent, PostComponent, UserDataComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {}
