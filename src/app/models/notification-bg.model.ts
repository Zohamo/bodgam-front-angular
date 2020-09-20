enum NotificationType {
  userEventSubscription = 'UserEventSubscription'
}

enum NotifiableType {
  profile = 'Profile'
}

export class NotificationBg {
  id: number | string;
  createdAt: Date | string;
  updatedAt: Date;
  readAt: Date;
  type: NotificationType;
  notifiableId: number;
  notifiableType: NotifiableType;
  data: any;
  link?: string;
}
