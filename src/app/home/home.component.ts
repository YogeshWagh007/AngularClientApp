import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from 'src/app/interface/user';
import { Complaint } from 'src/app/interface/complaint';
import { AuthenticationService } from 'src/app/services/authentication.service';
import {MatSnackBar} from '@angular/material';
import { ComplaintService } from 'src/app/services/complaint.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  userId: string;
  user = {} as User;
  complaints: Observable< Complaint[] >;
  selectedItem: Observable< Complaint >;
  isEdit = false;
  currentStatus: string;
  currentDate = new Date();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar,
    private authenticationService: AuthenticationService,
    private complaintService: ComplaintService ) {
              this.userId = localStorage.getItem( 'currentUser' );
    }

  ngOnInit( ) {
    if ( this.userId ) {
      this.userId = localStorage.getItem( 'currentUser' );
      this.authenticationService.getUserById( this.userId ).then( ( data ) => {
        this.user = data.data.email;
      });
      // Get All Complaints
      this.getAllComplaints( );
    } else {
      this.router.navigate( [ '/login' ] );
    }

  }

  getAllComplaints( ) {
    this.complaintService.getAllComplaints( ).then( data => {
      this.snackBar.open( data.message, 'OK', {
        duration: 8000,
      });
      this.complaints = data.data;
   }).catch( ( error ) => {
    this.snackBar.open( error.message, 'OK', {
      duration: 8000,
    });
   });
  }

  editComplaint( currentComplaint ) {
    this.isEdit = true;
    this.currentStatus = currentComplaint.status;
    this.selectedItem = currentComplaint;
  }

  deleteComplaint( complaint ) {
    this.complaintService.deleteComplaint( complaint._id ).subscribe( data => {
      this.snackBar.open('Complaint Deleted Successfully', 'OK', {
        duration: 8000,
      } );
      this.getAllComplaints( );
    } );
  }

  updateComplaint( complaint ) {
        const actionTaken = 'Status Changed from' + ' ' + this.currentStatus  + ' ' + 'to' + ' ' + complaint.status ;

        complaint.actionLog.unshift( actionTaken );

        this.complaintService.updateComplaint(complaint).then(( data ) => {
          this.snackBar.open( data.message, 'OK', {
            duration: 8000,
          } );
          this.getAllComplaints( );
        } ).catch( ( error ) => {
          this.snackBar.open( error.message, 'OK', {
            duration: 8000,
          } );
        } );
  }

  addComplaint( ) {
    this.router.navigate( [ '/addComplaint' ] );
  }

  logout( ) {
    this.authenticationService.logout( );
    this.router.navigate( [ '/login' ] );
  }


}
