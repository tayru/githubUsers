export interface UserData {
  login: string;
  avatar_url: string;
  followers: number;
  following: number;
  blog?: string;
  name: string;
}

export interface SearchResultItem {
  login: string;
  id: number;
  avatar_url: string;
  html_url: string;
}

export interface SearchResult {
  total_count: number;
  incomplete_results: boolean;
  items: SearchResultItem[];
}

export interface User {
  public_repos?: any;
  avatarUrl: string;
  repositories: any;
  organization: any;
  htmlUrl: string;
  id: number;
  login: string;
}
