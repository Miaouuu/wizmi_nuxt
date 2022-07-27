// TODO : CLEAN
export enum NotificationTypes{
  Error = 'error'
}
export interface Notification{
  type: NotificationTypes,
  message: string
}
