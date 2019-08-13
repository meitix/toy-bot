import { expect, should } from 'chai';
import { Board } from './board';
import * as messages from '../resources/messages.json';
import { IBoard } from './interfaces/board.interface';
import { Spot } from './spot';
import { Directions } from '../enums/directions.enum';

describe('Board', () => {
  it('should be created with correct dimensions.', () => {
    const board = new Board(2, 5);
    expect(board).not.be.undefined;
    expect(board.length).to.be.equal(5);
    expect(board.width).to.be.equal(2);
  });

  it('should reject less than 1 width and length.', () => {
    expect(() => {
      new Board(-3, 0);
    }).throw(messages.board.dimensionsCantBeLessThanOne);
  });

  describe('spot validation', () => {
    let board: IBoard;
    beforeEach(() => {
      board = new Board(5, 6);
    });
    it('should return true for spots in the board dimensions range.', () => {
      expect(board.includes(new Spot(1, 2, Directions.east))).to.be.true;
      expect(board.includes(new Spot(5, 6, Directions.east))).to.be.true;
      expect(board.includes(new Spot(4, 5, Directions.east))).to.be.true;
      expect(board.includes(new Spot(3, 2, Directions.east))).to.be.true;
      expect(board.includes(new Spot(5, 1, Directions.east))).to.be.true;
      expect(board.includes(new Spot(3, 0, Directions.east))).to.be.true;
    });

    it('should return false for the spots out of board dimensions range.', () => {
      expect(board.includes(new Spot(-1, 2, Directions.east))).to.be.false;
      expect(board.includes(new Spot(6, 6, Directions.east))).to.be.false;
      expect(board.includes(new Spot(-4, 5, Directions.east))).to.be.false;
      expect(board.includes(new Spot(5, -1, Directions.east))).to.be.false;
    });
  });
});
