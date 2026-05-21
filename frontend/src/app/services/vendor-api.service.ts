import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { AuthService } from './auth.service';

interface ApiResponse<T> {
  success: boolean;
  data: T;
}

@Injectable({ providedIn: 'root' })
export class VendorApiService {
  private readonly baseUrl = 'http://localhost:3000/api/vendor';
  private authService = inject(AuthService);

  constructor(private http: HttpClient) {}

  private getVendorId(): string {
    const vendorId = this.authService.getVendorId();
    if (!vendorId) {
      throw new Error('Vendor ID is missing. Please login again.');
    }
    return vendorId;
  }

  private request<T>(url: string) {
    console.log(`[VendorApiService] Sending request to backend API: ${url}`);
    return firstValueFrom(this.http.get<ApiResponse<T>>(url)).then((response) => {
      console.log(`[VendorApiService] Received response from backend API: ${url}`, response);
      return response;
    });
  }

  getProfile() {
    const vendorId = this.getVendorId();
    return this.request<any>(`${this.baseUrl}/profile/${vendorId}`);
  }

  getPurchaseOrders() {
    const vendorId = this.getVendorId();
    return this.request<any[]>(`${this.baseUrl}/po/${vendorId}`);
  }

  getRfqs() {
    const vendorId = this.getVendorId();
    return this.request<any[]>(`${this.baseUrl}/rfq/${vendorId}`);
  }

  getGoodsReceipts() {
    const vendorId = this.getVendorId();
    return this.request<any[]>(`${this.baseUrl}/gr/${vendorId}`);
  }

  getInvoices() {
    const vendorId = this.getVendorId();
    return this.request<any[]>(`${this.baseUrl}/invoice/${vendorId}`);
  }

  getPaymentAging() {
    const vendorId = this.getVendorId();
    return this.request<any[]>(`${this.baseUrl}/payment-aging/${vendorId}`);
  }

  getMemos() {
    const vendorId = this.getVendorId();
    return this.request<any[]>(`${this.baseUrl}/memo/${vendorId}`);
  }

  downloadInvoicePdf(docId: string) {
    return firstValueFrom(
      this.http.get(`${this.baseUrl}/invoice/pdf/${docId}`, {
        responseType: 'blob',
      })
    );
  }
}
