export class ProfileItem {
  id: number;
  name: string;
  avatar: string;
  district: string;
  city: string;
  country: string;

  constructor() {
    this.id = null;
    this.name = '';
    this.avatar = null;
    this.district = '';
    this.city = '';
    this.country = 'FR';
  }
}
