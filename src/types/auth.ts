export interface User {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  token: string;
}

export interface AuthState {
  user: User | null | string;
  isAuthenticated: boolean;

}
