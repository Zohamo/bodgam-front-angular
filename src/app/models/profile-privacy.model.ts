export class ProfilePrivacy {
  email: boolean;
  phoneNumber: boolean;
  birthdate: boolean;
  website: boolean;
  bggName: boolean;

  constructor() {
    this.email = false;
    this.phoneNumber = false;
    this.birthdate = false;
    this.website = false;
    this.bggName = false;
  }
}
