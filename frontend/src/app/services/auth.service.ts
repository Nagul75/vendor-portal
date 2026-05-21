import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';

interface LoginRequest {
  vendorId: string;
  password: string;
}

interface ApiResponse<T = unknown> {
  success: boolean;
  data: T;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly storageKey = 'vendorId';
  private readonly baseUrl = 'http://localhost:3000/api/auth';

  constructor(private http: HttpClient) {}

  login(vendorId: string, password: string) {
    const body: LoginRequest = { vendorId, password };
    return firstValueFrom(
      this.http.post<ApiResponse<{ vendorId: string }>>(`${this.baseUrl}/login`, body)
    );
  }

  logout() {
    localStorage.removeItem(this.storageKey);
  }

  setVendorId(vendorId: string) {
    localStorage.setItem(this.storageKey, vendorId);
  }

  getVendorId(): string | null {
    return localStorage.getItem(this.storageKey);
  }

  isLoggedIn(): boolean {
    return !!this.getVendorId();
  }
}
