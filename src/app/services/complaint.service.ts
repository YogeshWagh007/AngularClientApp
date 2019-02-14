import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ComplaintService {

  localServerUrl = 'http://localhost:3000/api';

    constructor(
      private httpclient: HttpClient) { }

    register( complaint ): Promise< any > {
      const params = new HttpParams()
      .set('email', complaint.email)
      .set('title', complaint.title)
      .set('description', complaint.description)
      .set('status', complaint.status)
      .set('actionLog', complaint.actionLog);
      return this.httpclient.post(this.localServerUrl + '/complaints', params)
                      .toPromise()
                      .then((data) => data);
    }

    getAllComplaints( ): Promise< any > {
      return this.httpclient.get(this.localServerUrl + '/complaints')
                      .toPromise()
                      .then((data) => data);
    }

    updateComplaint( complaint ): Promise< any > {
      const params = new HttpParams()
      .set('email', complaint.email)
      .set('title', complaint.title)
      .set('description', complaint.description)
      .set('status', complaint.status)
      .set('actionLog', complaint.actionLog);
      return this.httpclient.put(this.localServerUrl + '/complaints/' + complaint._id, params)
                      .toPromise()
                      .then((data) => data);
    }

    deleteComplaint( complaintId ) {
      const params = new HttpParams();
      return this.httpclient.delete(this.localServerUrl + '/complaints/' + complaintId);
    }
}
