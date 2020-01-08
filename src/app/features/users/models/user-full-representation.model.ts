import { UserRepresentation } from './user-representation.model';
import { UserPrivacyRepresentation } from './user-privacy-representation.model';
import { UserRatingsRepresentation } from './user-ratings-representation.model';

/* TODO use this enum for gender
export enum Gender {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
  OTHER = 'OTHER'
} */

export class UserFullRepresentation extends UserRepresentation {
  email: string;
  gender: string;
  birthdate: number;
  bggName: string;
  phoneNumber: string;
  website: string;
  privacy: UserPrivacyRepresentation;
  ratings: UserRatingsRepresentation;

  constructor() {
    super();
    this.email = '';
    this.gender = null;
    this.birthdate = null;
    this.bggName = '';
    this.phoneNumber = '';
    this.website = '';
    this.privacy = new UserPrivacyRepresentation();
    this.ratings = new UserRatingsRepresentation();
  }
}
