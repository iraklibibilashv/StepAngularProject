import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Api {
  constructor(private api: HttpClient) {}

  private baseUrl = 'https://shopapi.stepacademy.ge/api/';
  private authKey = '6e0445ab-3680-46e9-b7d3-6a8e339175c4';
  getHeaders() {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'X-API-KEY': this.authKey,
      ...(token && { Authorization: `Bearer ${token}` }),
    });
  }
  postRegister(userData: any) {
    return this.api.post(this.baseUrl + 'auth/register', userData, {
      headers: this.getHeaders(),
    });
  }
  postLogin(userData: any) {
    return this.api.post(this.baseUrl + 'auth/login', userData, {
      headers: this.getHeaders(),
    });
  }
  postForgotPassword(email: any) {
    return this.api.post(
      this.baseUrl + `auth/forget-password/${email}`,
      {},
      {
        headers: this.getHeaders(),
      },
    );
  }
  postResendVerification(email: any) {
    return this.api.post(
      this.baseUrl + 'auth/resend-email-verification/${email}',
      {},
      {
        headers: this.getHeaders(),
      },
    );
  }

  putVerify(email: any, code: any) {
    return this.api.put(
      this.baseUrl + 'auth/verify-email',
      { email, code },
      {
        headers: this.getHeaders(),
      },
    );
  }
  putResetPassword(token: any, password: any) {
    return this.api.put(
      this.baseUrl + 'auth/reset-password',
      { token, password },
      {
        headers: this.getHeaders(),
      },
    );
  }

  getAll(url: string) {
    return this.api.get(this.baseUrl + url, {
      headers: this.getHeaders(),
    });
  }
  getCart() {
    return this.api.get(this.baseUrl + 'cart?Take=40&Page=1', {
      headers: this.getHeaders(),
    });
  }
  addToCart(productId: number, quantity: number) {
    return this.api.post(
      this.baseUrl + 'cart/add-to-cart',
      { productId, quantity },
      {
        headers: this.getHeaders(),
      },
    );
  }
  removeFromCart(productId: number) {
    return this.api.delete(this.baseUrl + `cart/remove-from-cart/${productId}`, {
      headers: this.getHeaders(),
    });
  }
  editQuantity(itemId: number, quantity: number) {
    return this.api.put(
      this.baseUrl + 'cart/edit-quantity',
      { itemId, quantity },
      {
        headers: this.getHeaders(),
      },
    );
  }

  getFilteredProducts(filters: any) {
    let params = new HttpParams();

    if (filters.Search) params = params.set('Search', filters.Search);
    if (filters.Brand) params = params.set('Brand', filters.Brand);
    if (filters.InStock) params = params.set('InStock', filters.InStock);
    if (filters.SortBy) params = params.set('SortBy', filters.SortBy);
    if (filters.CategoryId != null) params = params.set('CategoryId', filters.CategoryId);
    if (filters.MinRating) params = params.set('MinRating', filters.MinRating);
    if (filters.SortDescending) params = params.set('SortDescending', filters.SortDescending);
    if (filters.MinPrice) params = params.set('MinPrice', filters.MinPrice);
    if (filters.MaxPrice) params = params.set('MaxPrice', filters.MaxPrice);
    if (filters.Take) params = params.set('Take', filters.Take);
    if (filters.Page) params = params.set('Page', filters.Page);

    return this.api.get(this.baseUrl + 'products/filter', {
      headers: this.getHeaders(),
      params: params,
    });
  }
  getProductById(id: number) {
  return this.api.get(this.baseUrl + `products/${id}`, {
    headers: this.getHeaders()
  });
}
getMe() {
  return this.api.get(this.baseUrl + 'users/me', {
    headers: this.getHeaders()
  });
}
updateUser(userData: any) {
  return this.api.put(this.baseUrl + 'users', userData, {
    headers: this.getHeaders()
  });
}
changePassword(currentPassword: string, newPassword: string) {
  return this.api.put(this.baseUrl + 'users/change-password', { currentPassword, newPassword }, {
    headers: this.getHeaders()
  });
}
deleteProfile() {
  return this.api.delete(this.baseUrl + 'users/delete-profile', {
    headers: this.getHeaders()
  });
}
checkout() {
  return this.api.post(this.baseUrl + 'users/checkout', {}, {
    headers: this.getHeaders()
  });
}
getFavorites() {
  return this.api.get(this.baseUrl + 'favorites?Take=30&Page=1', {
    headers: this.getHeaders()
  });
}
addToFavorites(productId: number) {
  return this.api.post(this.baseUrl + `favorites/${productId}`, {}, {
    headers: this.getHeaders()
  });
}
removeFromFavorites(productId: number) {
  return this.api.delete(this.baseUrl + `favorites/${productId}`, {
    headers: this.getHeaders()
  });
}
getReviews(productId: number) {
  return this.api.get(this.baseUrl + `reviews/${productId}?Take=10&Page=1`, {
    headers: this.getHeaders()
  });
}

addReview(productId: number, rate: number) {
  return this.api.post(this.baseUrl + 'reviews', { productId, rate }, {
    headers: this.getHeaders()
  });
}

updateReview(reviewId: number, rate: number) {
  return this.api.put(this.baseUrl + 'reviews', { reviewId, rate }, {
    headers: this.getHeaders()
  });
}

deleteReview(reviewId: number) {
  return this.api.delete(this.baseUrl + `reviews/${reviewId}`, {
    headers: this.getHeaders()
  });
}
postAdminRegister(userData: any){
      return this.api.post(this.baseUrl + 'admin/register', userData, {
      headers: this.getHeaders(),
    });
  
}
  postAdminLogin(userData: any) {
    return this.api.post(this.baseUrl + 'admin/login', userData, {
      headers: this.getHeaders(),
    });
  }




}
