import { NotificationEmailContentItem } from './notification-email-content-item.model';

export class NotificationEmail {
  level: 'success' | 'error' | string;
  content: NotificationEmailContentItem[];
}
