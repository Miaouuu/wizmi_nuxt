// TODO : CLEAN
export enum NotificationTypes{
  Error = 'error'
}
export interface Notification{
  type: NotificationTypes,
  message: string
}

export interface Levels{
  id: number,
  name: string,
  reward: string,
  worldId: number,
  data: {
    box: {

    }
  },
  type: string
}

export interface Worlds{
  id: number,
  name: string,
  value: number,
  levels: Levels[]
}
