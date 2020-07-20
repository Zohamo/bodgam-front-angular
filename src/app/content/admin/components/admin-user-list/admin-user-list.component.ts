import { Component, OnInit, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { Country, ProfileItem } from '@/models';

// UI
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { MatPaginator, MatSort, MatTableDataSource, MatDialog } from '@angular/material';
import { DialogConfirmComponent } from '@/components/dialog-confirm/dialog-confirm.component';

@Component({
  selector: 'app-admin-user-list',
  templateUrl: './admin-user-list.component.html',
  styleUrls: ['./admin-user-list.component.scss']
})
export class AdminUserListComponent implements OnInit {
  public displayedColumns: string[] = ['name', 'district', 'city', 'country', 'action'];
  public dataSource: MatTableDataSource<ProfileItem>;
  public isSetCountryNames = false;
  public isSuperAdmin: boolean;

  // UI
  faTrash = faTrash;

  // View Children

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  // Inputs

  public profiles: ProfileItem[];
  @Input() set profilesList(profilesList: ProfileItem[]) {
    if (profilesList) {
      this.profiles = profilesList;
      this.dataSource = new MatTableDataSource<ProfileItem>(this.profiles);
    }
  }

  public countries: Country[];
  @Input() set countryList(countryList: Country[]) {
    if (countryList) {
      this.countries = countryList;
      this.setCountryNames(countryList);
    }
  }

  private deletedUser: number;
  @Input() set deletedUserId(deletedUserId: number) {
    if (deletedUserId) {
      this.removeUserFromTable(deletedUserId);
    }
  }

  /**
   * Outputs
   */

  @Output() deleteUser = new EventEmitter<ProfileItem>();

  /**
   * Creates an instance of AdminUserListComponent.
   *
   * @param {MatDialog} dialog
   * @memberof AdminUserListComponent
   */
  constructor(private dialog: MatDialog) {}

  /**
   * Called after Angular has initialized all data-bound properties
   *
   * @memberof AdminUserListComponent
   */
  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  /**
   * Apply the search filter on key up
   *
   * @param {string} filterValue
   * @memberof AdminUserListComponent
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
   * @memberof AdminUserListComponent
   */
  private setCountryNames(countries: Country[]): void {
    if (this.profiles && !this.isSetCountryNames) {
      this.profiles.forEach((profile: ProfileItem) => {
        const countryFound = countries.find((country) => {
          return country.isoCode === profile.country;
        });
        if (countryFound && countryFound.name) {
          profile.country = countryFound.name;
        }
      });
      this.isSetCountryNames = true;
    }
  }

  /**
   * Event to delete a User.
   *
   * @param {Profile} profile
   * @memberof AdminUserListComponent
   */
  public onDelete(profile: ProfileItem): void {
    const dialogRef = this.dialog.open(DialogConfirmComponent, {
      data: { message: 'delete-user', name: profile.name }
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.deleteUser.emit(profile);
      }
    });
  }

  /**
   * Remove User from the Angular Material Table.
   *
   * @private
   * @param {number} id
   * @memberof AdminUserListComponent
   */
  private removeUserFromTable(id: number): void {
    for (let i = 0, tableLength = this.dataSource.data.length; i < tableLength; i++) {
      if (this.dataSource.data[i].id === id) {
        this.dataSource.data.splice(i, 1);
        this.dataSource._updateChangeSubscription();
        break;
      }
    }
  }
}
