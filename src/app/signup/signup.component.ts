import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/interface/user';
import { AuthenticationService } from 'src/app/services/authentication.service';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  model = {} as User;
  confirmPassword = '';
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar,
    private authenticationService: AuthenticationService) { }

  ngOnInit() {
  }

  signup( ) {
    if ( this.confirmPassword === this.model.password ) {
        this.authenticationService.register( this.model ).then( ( data ) => {
          if ( data.status ) {
            this.snackBar.open(data.message, 'OK', {
              duration: 8000,
            } );
            this.gotoLogin( );
          } else {
            this.snackBar.open( 'Email already register', 'OK', {
              duration: 8000,
            } );
          }
        });
    } else {
      this.snackBar.open( 'Password does not match', 'OK', {
        duration: 8000,
      } );
    }
  }

  gotoLogin( ) {
    this.router.navigate( [ '/login' ] );
  }

}
