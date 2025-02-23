import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { CardComponent } from '../card/card.component';
import { PostComponent } from '../post/post.component';
import { CommentsComponent } from '../comments/comments.component';
import { UserDataComponent } from "../user-data/user-data.component";

@Component({
  selector: 'app-home',
  imports: [NavbarComponent, CardComponent, PostComponent, CommentsComponent, UserDataComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
