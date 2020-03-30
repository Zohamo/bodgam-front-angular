import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Country, Profile, ProfileItem } from '@/models';

// UI
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-profile-list',
  templateUrl: './profile-list.component.html',
  styleUrls: ['./profile-list.component.scss']
})
export class ProfileListComponent implements OnInit {
  public displayedColumns: string[] = ['name', 'district', 'city', 'country'];
  public dataSource: MatTableDataSource<ProfileItem>;
  public isSetCountryNames = false;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  // Inputs

  public profiles: ProfileItem[];
  @Input() set profilesList(profilesList: ProfileItem[]) {
    if (profilesList) {
      this.profiles = profilesList;
      this.dataSource = new MatTableDataSource(this.profiles);
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
   * @memberof ProfileListComponent
   */
  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  /**
   * Apply the search filter on key up
   *
   * @param {string} filterValue
   * @memberof ProfileListComponent
   */
  public applyFilter(filterValue: string): void {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  /**
   * Transform country ISO codes into their proper names
   *
   * @param {Country[]} countries
   * @memberof ProfileListComponent
   */
  setCountryNames(countries: Country[]): void {
    if (this.profiles && !this.isSetCountryNames) {
      this.profiles.forEach((profile: Profile) => {
        const countryFound = countries.find((country) => {
          return country.isoCode === profile.country;
        });
        if (countryFound && countryFound.name) {
          profile.country = countryFound.name;
        }
      });
      this.isSetCountryNames = true;
      console.log('profiles', this.profiles);
    }
  }
}
