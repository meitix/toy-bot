import { IBotController } from './interfaces/bot.controller.interface';
import { IBot } from '../lib/models/interfaces/bot.interface';
import { RotationSide } from '../lib/enums/rotation-side.enum';
import { Spot } from '../lib/models/spot';
import { Directions } from '../lib/enums/directions.enum';
import { injectable, inject } from 'inversify';
import 'reflect-metadata';
import TYPES from '../ioc/types';

@injectable()
export class BotController implements IBotController {
  constructor(@inject(TYPES.IBot) private bot: IBot) {}

  move(): void | string {
    try {
      this.bot.move(1);
    } catch (e) {
      return e.message;
    }
  }
  left(): void | string {
    try {
      this.bot.rotate(RotationSide.left);
    } catch (e) {
      return e.message;
    }
  }
  right(): void | string {
    try {
      this.bot.rotate(RotationSide.right);
    } catch (e) {
      return e.message;
    }
  }
  report(): void | string | string{
    try {
      const spot = this.bot.report();
     return `${spot.x},${spot.y},${Directions[spot.face].toString().toUpperCase()}`;
    } catch (e) {
      return e.message;
    }
  }
  place(spot: string): void | string {
    let spotArr = spot.split(',');
    spotArr = spotArr.map(s => s.trim());

    try {
      const face = spotArr[2].toLowerCase();
      const spot = new Spot(
        +spotArr[0],
        +spotArr[1],
        (Directions as any)[face]
      );
      this.bot.place(spot);
    } catch (e) {
      return e.message;
    }
  }
}
