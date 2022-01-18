// TODO : CLEAN
import { Movement } from 'wizmi'

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
    start: Array<number>,
    end: Array<number>,
    shape: {
      width: number,
      height: number
    },
    grid: Array<Array<number>>,
    infinity: boolean,
    actions: {
      movements: Array<Movement>,
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
