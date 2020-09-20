enum NotificationType {
  userEventSubscription = 'UserEventSubscription'
}

enum NotifiableType {
  profile = 'Profile'
}

export class NotificationBg {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  readAt: Date;
  type: NotificationType;
  notifiableId: number;
  notifiableType: NotifiableType;
  data: any;
  link?: string;
}
