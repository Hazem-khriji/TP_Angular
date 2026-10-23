import { Injectable, computed, inject, signal } from '@angular/core';
import { CredentialsDto } from '../dto/credentials.dto';
import { LoginResponseDto } from '../dto/login-response.dto';
import { HttpClient } from '@angular/common/http';
import { API } from '../../../config/api.config';
import { Observable, tap } from 'rxjs';
import { ConnectedUser } from '../model/connected-user';

const USER_KEY = 'user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);

  /**
   * L'utilisateur connecté (null si personne n'est connecté),
   * restauré depuis le localStorage au chargement de l'application
   */
  #user = signal<ConnectedUser | null>(this.#restoreUser());
  user = this.#user.asReadonly();
  isAuthenticated = computed(() => this.#user() !== null);

  login(credentials: CredentialsDto): Observable<LoginResponseDto> {
    return this.http.post<LoginResponseDto>(API.login, credentials).pipe(
      tap((response) => {
        // Attention : dans la réponse de l'API, id est le token et userId l'id du user
        const user: ConnectedUser = {
          id: response.userId,
          email: credentials.email,
          token: response.id,
        };
        localStorage.setItem(USER_KEY, JSON.stringify(user));
        this.#user.set(user);
      })
    );
  }

  logout() {
    localStorage.removeItem(USER_KEY);
    this.#user.set(null);
  }

  #restoreUser(): ConnectedUser | null {
    const user = localStorage.getItem(USER_KEY);
    return user ? JSON.parse(user) : null;
  }
}
