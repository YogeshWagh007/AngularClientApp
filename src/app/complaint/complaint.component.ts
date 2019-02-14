import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/interface/user';
import { AuthenticationService } from 'src/app/services/authentication.service';
import {MatSnackBar} from '@angular/material';
import { Complaint } from 'src/app/interface/complaint';
import { ComplaintService } from 'src/app/services/complaint.service';

@Component({
  selector: 'app-complaint',
  templateUrl: './complaint.component.html',
  styleUrls: ['./complaint.component.css']
})
export class ComplaintComponent implements OnInit {

  model = {} as Complaint;
  actionLog: string[];
  currentDate = new Date( );
  userId: string;
  user = {} as User;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar,
    private complaintService: ComplaintService,
    private authenticationService: AuthenticationService ) {
      this.userId = localStorage.getItem( 'currentUser' );
     }

  ngOnInit( ) {
    if ( this.userId ) {
      this.userId = localStorage.getItem( 'currentUser' );
      this.authenticationService.getUserById( this.userId ).then( ( data ) => {
        this.user = data.data.email;
      } );
    } else {
      this.logout( );
    }
  }

  addComplaint( complaint ) {
    complaint.email = this.user;
    complaint.createdAt = this.currentDate;
    complaint.actionLog = 'complaint created by ' + this.user + ' on ' + this.currentDate;
    this.complaintService.register(complaint).then( data => {
      this.snackBar.open(data.message, 'OK', {
        duration: 8000,
      } );
      this.router.navigate(['/']);
    } ).catch( ( error ) => {
      this.snackBar.open( error.message, 'OK', {
        duration: 8000,
      } );
    } );
  }

  logout( ) {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }

}
