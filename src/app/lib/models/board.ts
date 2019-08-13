import { IBoard } from './interfaces/board.interface';
import * as messages from '../resources/messages.json';
import { ISpot } from './interfaces/spot.interface';
import { injectable, inject } from 'inversify';
import 'reflect-metadata';
import TYPES from '../../ioc/types';

@injectable()
export class Board implements IBoard {
  public width: number;
  public length: number;
  constructor(@inject(TYPES.BoardWidth) width: number, @inject(TYPES.BoardLength) length: number) {
      if (width < 1 || length < 1) {
          throw new Error(messages.board.dimensionsCantBeLessThanOne)
      }
      this.length = length;
      this.width = width;
  }

  includes(spot: ISpot): boolean {
    // separated condition for make the codes more readable.
    if (spot.x < 0 || spot.y < 0) return false;
    return this.width >= spot.x && this.length >= spot.y;
  }
}
