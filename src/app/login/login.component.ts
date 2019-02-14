import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/interface/user';
import { AuthenticationService } from 'src/app/services/authentication.service';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  model = {} as User;
  loading = false;
  returnUrl: string;

  constructor(
      private route: ActivatedRoute,
      private router: Router,
      private snackBar: MatSnackBar,
      private authenticationService: AuthenticationService) { }

  ngOnInit() {  }

  login() {
    this.authenticationService.login( this.model ).then( data => {
      if ( data.status === true ) {
        localStorage.setItem( 'currentUser', data.data._id );
        this.router.navigate( [ '/home' ] );
      } else {
        this.snackBar.open( data.message, 'OK', {
          duration: 2000,
        } );
      }

    });
  }

  signup( ) {
    this.router.navigate( [ '/signup' ] );
    }

}
