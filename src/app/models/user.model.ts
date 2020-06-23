import { Email } from './email.model';

export class User {
  id?: number;
  name?: string;
  email: string;
  password?: string;
  token?: string;
  verificationEmail?: Email; // TODO : change to "notification"
}
