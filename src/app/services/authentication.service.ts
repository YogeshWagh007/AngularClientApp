import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { User } from 'src/app/interface/user';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  /* Local Server Url*/
  localServerUrl = 'http://localhost:3000/api/user';

  constructor(
    private httpclient: HttpClient ) { }

  login( user ): Promise< any > {
    const params = new HttpParams()
    .set( 'email', user.email )
    .set( 'password', user.password );
    return this.httpclient.post( this.localServerUrl + '/login', params )
      .toPromise()
      .then(( data) => data );
  }

  register( user ): Promise< any > {
    const params = new HttpParams()
    .set( 'email', user.email )
    .set( 'password', user.password );
    return this.httpclient.post( this.localServerUrl + '/register', params )
      .toPromise()
      .then(( data ) => data );
  }

  getUserById( id ): Promise< any > {
    const params = new HttpParams()
    .set( 'id', id );
    return this.httpclient.post( this.localServerUrl + '/id', params )
      .toPromise()
      .then(( data ) => data );
  }

  logout( ) {
    // remove user from local storage to log user out
    localStorage.removeItem( 'currentUser' );
  }

}
