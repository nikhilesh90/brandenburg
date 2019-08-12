import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';
import { UserService, AuthenticationService } from '../_services';
import { User } from '../_models';
import { MatTableDataSource, MatPaginator } from '@angular/material';

export interface Element {
  name: string;
  street: number;
  address1: number;
  city: string;
  state: string;
  pinCode: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  currentUser: User;
  currentUserSubscription: Subscription;
  users: User[] = [];
  displayedColumns: string[] = ['name', 'street', 'address1', 'city', 'state', 'pinCode'];
  dataSource: any;
  userData: any;

  @ViewChild(MatPaginator, null) paginator: MatPaginator;

  constructor(
    private authenticationService: AuthenticationService,
    private userService: UserService
  ) {
    this.currentUserSubscription = this.authenticationService.currentUser.subscribe(user => {
      this.currentUser = user;
    });
  }

  ngOnInit() {
    this.loadAllUsers();
  }

  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.currentUserSubscription.unsubscribe();
  }

  private loadAllUsers() {
    this.userService.getAll().pipe(first()).subscribe(users => {
      this.dataSource = new MatTableDataSource(users.clientsInfo);
      this.dataSource.paginator = this.paginator;
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
