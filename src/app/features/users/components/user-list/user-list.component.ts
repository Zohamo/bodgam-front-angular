import { Component, OnInit, Input, ViewChild } from '@angular/core';

// Models

import { Country } from 'src/app/shared/models/country.model';
import { UserFullRepresentation } from '../../models/user-full-representation.model';
import { UserRepresentation } from '../../models/user-representation.model';

// UI

import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  public displayedColumns: string[] = ['name', 'district', 'city', 'country'];
  public dataSource: MatTableDataSource<UserRepresentation>;
  public isSetCountryNames = false;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  // Inputs

  public users: UserRepresentation[];
  @Input() set usersList(usersList: UserRepresentation[]) {
    if (usersList) {
      this.users = usersList;
      this.dataSource = new MatTableDataSource(this.users);
    }
  }

  public countries: Country[];
  @Input() set countryList(countryList: Country[]) {
    if (countryList) {
      this.countries = countryList;
      this.setCountryNames(countryList);
    }
  }

  /**
   * A lifecycle hook that is called after Angular has initialized all data-bound properties
   *
   * @memberof UserListComponent
   */
  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  /**
   * Apply the search filter on key up
   *
   * @param {string} filterValue
   * @memberof UserListComponent
   */
  applyFilter(filterValue: string): void {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  /**
   * Transform country ISO codes into their proper names
   *
   * @param {Country[]} countries
   * @memberof UserListComponent
   */
  setCountryNames(countries: Country[]): void {
    if (this.users && !this.isSetCountryNames) {
      this.users.forEach((user: UserFullRepresentation) => {
        const countryFound = countries.find((country) => {
          return country.isoCode === user.country;
        });
        if (countryFound && countryFound.name) {
          user.country = countryFound.name;
        }
      });
      this.isSetCountryNames = true;
      console.log('users', this.users);
    }
  }
}
