export interface Post {
  id: number;
  user_id: number;
  title: string;
  content: string;
  category_id: number;
  num_likes: number;
  num_comments: number;
  time_created: string;
  created_at: string;
  updated_at: string;
  image?: string | null;
  isImageExpanded?: boolean;
  userLiked?: boolean;
}

export interface User {
  id: number;
  name: string;
}

export interface Category {
  id: number;
  name: string;
}

export interface Comment {
  id: number;
  post_id: number;
  user_id: number;
  content: string;
}

export interface Like {
  id: number;
  post_id: number;
  userId: number;
}
