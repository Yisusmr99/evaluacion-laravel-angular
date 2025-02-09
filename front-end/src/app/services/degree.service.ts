import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DegreeService {
  private endpoint = 'degrees';
  constructor(private apiService: ApiService) { }

  getDegrees(): Observable<any> {
    return this.apiService.get<any>(this.endpoint, true);
  }
}
