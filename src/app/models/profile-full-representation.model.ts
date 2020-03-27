import { ProfileRepresentation } from './profile-representation.model';
import { ProfilePrivacyRepresentation } from './profile-privacy-representation.model';
import { ProfileRatingsRepresentation } from './profile-ratings-representation.model';

/* TODO use this enum for gender
export enum Gender {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
  OTHER = 'OTHER'
} */

export class ProfileFullRepresentation extends ProfileRepresentation {
  userId: number;
  email: string;
  gender: string;
  birthdate: number;
  bggName: string;
  phoneNumber: string;
  website: string;
  privacy: ProfilePrivacyRepresentation;
  ratings: ProfileRatingsRepresentation;

  constructor() {
    super();
    this.userId = null;
    this.email = '';
    this.gender = null;
    this.birthdate = null;
    this.bggName = '';
    this.phoneNumber = '';
    this.website = '';
    this.privacy = new ProfilePrivacyRepresentation();
    this.ratings = new ProfileRatingsRepresentation();
  }
}
