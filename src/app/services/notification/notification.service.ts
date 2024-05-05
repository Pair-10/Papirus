import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private http: HttpClient) { }
  private baseUrl = 'http://localhost:60805/api';

  getUserNotification(){
    return this.http.get<any>(`${this.baseUrl}/UserNotifications?PageIndex=0&PageSize=20`)
  }

  getNotification(notificationId: any){
    return this.http.get<any>(`${this.baseUrl}/Notifications/${notificationId}`)
  }

}
