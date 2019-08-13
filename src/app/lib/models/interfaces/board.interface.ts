import { ISpot } from "./spot.interface";

export interface IBoard {
  width: number;
  length: number;
  includes(spot: ISpot): boolean;
}
