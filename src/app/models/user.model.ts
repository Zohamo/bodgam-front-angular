import { NotificationEmail } from './notification-email.model';

export class User {
  id?: number;
  name?: string;
  email: string;
  password?: string;
  token?: string;
  verificationEmail?: NotificationEmail;
}
