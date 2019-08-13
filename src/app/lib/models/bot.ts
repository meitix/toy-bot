import { IBot } from './interfaces/bot.interface';
import { IBoard } from './interfaces/board.interface';
import { ISpot } from './interfaces/spot.interface';
import { RotationSide } from '../enums/rotation-side.enum';
import { Spot } from './spot';
import { sin, cos } from '../helpers/math.helper';
import * as messages from '../resources/messages.json';
import { inject, injectable } from 'inversify';
import TYPES from '../../ioc/types';

@injectable()
export class Bot implements IBot {
  private spot!: ISpot;
  constructor(@inject(TYPES.IBoard) private board: IBoard) {}

  setBoard(board: IBoard): IBot {
    this.board = board;
    return this;
  }

  place(spot: ISpot): IBot {
    if (!this.board.includes(spot)) {
      throw new Error(messages.bot.placeIsOutOfBoard);
    }
    this.spot = spot;
    return this;
  }

  canMove(distance: number): boolean {
    // reject if bot is not placed yet.
    this.rejectIfIsNotPlaced();

    const spot = this.calculateFinalSpot(distance);
    return this.board.includes(spot);
  }

  move(distance: number): IBot {
    // reject if bot is not placed yet.
    this.rejectIfIsNotPlaced();
    
    // I was going to use canMove() method but i realized i have to calculate the final spot twice,
    // so I used this way to calculate the spot once, but the previous way was more human readable.
    // I will leave the other implementation commented at the end of file.
    try {
      const spot = this.calculateFinalSpot(distance);
      this.place(spot);
    } catch (e) {
      throw new Error(messages.bot.cantDoThisMove);
    }

    return this;
  }

  rotate(side: RotationSide): IBot {
    // reject if bot is not placed yet.
    this.rejectIfIsNotPlaced();
    
    // we need to keep the rotation angle between zero and 360 so we use % 360.
    const deg = (this.spot.face + side) % 360;
    this.spot.face = deg < 0 ? 360 + deg : deg;
    return this;
  }

  report(): ISpot {
    // reject if bot is not placed yet.
    this.rejectIfIsNotPlaced();
    
    return this.spot;
  }

  calculateFinalSpot(distance: number): ISpot {
    // reject if bot is not placed yet.
    this.rejectIfIsNotPlaced();
    
    const deltaX = distance * cos(this.spot.face);
    const deltaY = distance * sin(this.spot.face);

    return new Spot(this.spot.x + deltaX, this.spot.y + deltaY, this.spot.face);
  }
  
  rejectIfIsNotPlaced() {
    if (!this.spot) {
      throw new Error(messages.bot.botIsNotPlaced);
    }
  }
  // The second implementation of move method, but it has redundant final spot calculation.
  // move(distance: number): IBot {
  //   if(!this.canMove(distance)) {
  //     throw new Error(messages.bot.cantDoThisMove);
  //   }

  //   this.place(this.calculateFinalSpot(distance));

  //   return this;
  // }
}
