export class UserRepresentation {
  id: number;
  isActive: boolean;
  name: string;
  avatar: string;
  district: string;
  city: string;
  country: string;

  constructor() {
    this.id = null;
    this.isActive = false;
    this.name = '';
    this.avatar = null;
    this.district = '';
    this.city = '';
    this.country = '';
  }
}
