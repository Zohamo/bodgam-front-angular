import { Email } from './email.model';

export class User {
  id?: number;
  name?: string;
  email: string;
  emailVerified?: boolean;
  password?: string;
  token?: string;
  role?: string;
  verificationEmail?: Email; // TODO : change to "notification"
}
