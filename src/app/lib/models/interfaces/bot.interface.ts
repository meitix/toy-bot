import { RotationSide } from '../../enums/rotation-side.enum';
import { ISpot } from './spot.interface';
import { IBoard } from './board.interface';

export interface IBot {
  setBoard(board: IBoard): IBot;
  place(spot: ISpot): IBot;
  canMove(distance: number): boolean;
  move(distance: number): IBot;
  rotate(side: RotationSide): IBot;
  report(): ISpot;
  calculateFinalSpot(distance: number): ISpot;
}
