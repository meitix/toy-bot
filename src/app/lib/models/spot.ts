import { ISpot } from './interfaces/spot.interface';
import { Directions } from '../enums/directions.enum';
import * as messages from '../resources/messages.json';

export class Spot implements ISpot {
  constructor(public x: number, public y: number, public face: Directions) {
    if(!Directions[face]) throw new Error(messages.bot.cantDoThisMove);
  }
}
