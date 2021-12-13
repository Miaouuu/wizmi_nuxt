// TODO : CLEAN
export enum NotificationTypes{
  Error = 'error'
}
export interface Notification{
  type: NotificationTypes,
  message: string
}

export interface Movements{
  id: number,
  direction: string,
  quantity: string
}

export interface Levels{
  id: number,
  name: string,
  reward: string,
  worldId: number,
  data: {
    start: Array<number>,
    end: Array<number>,
    shape: {
      width: number,
      height: number
    },
    grid: Array<Array<number>>,
    infinity: boolean,
    actions: {
      movements: Array<Movements>,
      conditions: [],
      loops: []
    },
    triggers: {
      doors: [],
      ennemies: []
    },
    items: {
      keys: [],
      swords: []
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
