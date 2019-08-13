import { expect } from 'chai';
import { Spot } from './spot';
import { Directions } from '../enums/directions.enum';
import * as messages from '../resources/messages.json';
import { IBot } from './interfaces/bot.interface';
import { RotationSide } from '../enums/rotation-side.enum';
import container from '../../ioc/inversify.config';
import TYPES from '../../ioc/types';

describe('Bot', () => {
  let bot: IBot;
  beforeEach(() => {
    bot = container.get(TYPES.IBot);
  });

  it('should create', () => {
    expect(bot).not.to.be.undefined;
  });

  it('should reject all commands before executing place command' , () => {
    expect(() => bot.canMove(1)).throw(messages.bot.botIsNotPlaced);
    expect(() => bot.calculateFinalSpot(1)).throw(messages.bot.botIsNotPlaced);
    expect(() => bot.move(1)).throw(messages.bot.botIsNotPlaced);
    expect(() => bot.report()).throw(messages.bot.botIsNotPlaced);
    expect(() => bot.rotate(1)).throw(messages.bot.botIsNotPlaced);
  });

  it('should be placed at the position that will be given', () => {
    expect(bot).not.to.be.undefined;
    // defining the spot.
    const spot = new Spot(2, 3, Directions.east);
    // place the bot at the defined spot.
    bot.place(spot);
    // expect reported spot be the same as placed spot.
    expect(bot.report()).to.be.equal(spot);
  });

  it('should throw error if the place spot is out side of the board', () => {
    expect(() => bot.place(new Spot(6, 1, Directions.east))).throw(
      messages.bot.placeIsOutOfBoard
    );
    expect(() => bot.place(new Spot(6, 6, Directions.east))).throw(
      messages.bot.placeIsOutOfBoard
    );
    expect(() => bot.place(new Spot(2, 6, Directions.east))).throw(
      messages.bot.placeIsOutOfBoard
    );
    expect(() => bot.place(new Spot(-1, -3, Directions.east))).throw(
      messages.bot.placeIsOutOfBoard
    );
    expect(() => bot.place(new Spot(-1, 3, Directions.east))).throw(
      messages.bot.placeIsOutOfBoard
    );
    expect(() => bot.place(new Spot(1, -3, Directions.east))).throw(
      messages.bot.placeIsOutOfBoard
    );
  });

  it('should return true when the requested move is valid', () => {
    bot.place(new Spot(2, 2, Directions.east));
    expect(bot.canMove(2)).to.be.true;
    expect(bot.canMove(3)).to.be.true;
    expect(bot.canMove(1)).to.be.true;
    // place on an other place.
    bot.place(new Spot(3, 1, Directions.north));
    expect(bot.canMove(2)).to.be.true;
    expect(bot.canMove(3)).to.be.true;
    expect(bot.canMove(1)).to.be.true;
    expect(bot.canMove(4)).to.be.true;
  });

  it('should return false for invalid move distances.' , () => {
    bot.place(new Spot(2, 2, Directions.east));
    expect(bot.canMove(4)).to.be.false;
    expect(bot.canMove(5)).to.be.false;
    expect(bot.canMove(6)).to.be.false;
    // place on an other place.
    bot.place(new Spot(3, 1, Directions.south));
    expect(bot.canMove(2)).to.be.false;
    expect(bot.canMove(3)).to.be.false;
    expect(bot.canMove(4)).to.be.false;
  });

  it('should rotate in expected direction' , () => {
      bot.place(new Spot(1, 1, Directions.east));
    bot.rotate(RotationSide.left);
    let report = bot.report();
    expect(report.face).to.be.equal(Directions.north);

    bot.rotate(RotationSide.left);
    report = bot.report();

    expect(report.face).to.be.equal(Directions.west);
    bot.rotate(RotationSide.left);
     report = bot.report();
    expect(report.face).to.be.equal(Directions.south);

    bot.rotate(RotationSide.left);
    report = bot.report();
    expect(report.face).to.be.equal(Directions.east);

    bot.rotate(RotationSide.right);
    report = bot.report();
    expect(report.face).to.be.equal(Directions.south);

    bot.rotate(RotationSide.right);
    report = bot.report();
    expect(report.face).to.be.equal(Directions.west);

    bot.rotate(RotationSide.right);
    report = bot.report();
    expect(report.face).to.be.equal(Directions.north);

    bot.rotate(RotationSide.right);
    report = bot.report();
    expect(report.face).to.be.equal(Directions.east);
  });

  it('should move to passed distance', () => { 
      bot.place(new Spot(2, 1, Directions.north));

      bot.move(2);
      expect(bot.report().y).to.be.equal(3);

      bot.move(1);
      expect(bot.report().y).to.be.equal(4);
    
      bot.rotate(RotationSide.left);
      bot.move(1);
      expect(bot.report().x).to.be.equal(1);

      bot.rotate(RotationSide.left);
      bot.rotate(RotationSide.left);
      bot.move(1);
      expect(bot.report().x).to.be.equal(2);
  });

  it('should throw error when the movement is no possible', () => {
    bot.place(new Spot(5, 1, Directions.east));
    expect(() => bot.move(1)).throw(messages.bot.cantDoThisMove);
    expect(() => bot.rotate(RotationSide.left).move(5)).throw(messages.bot.cantDoThisMove);
  });

  it('should calculate correct final spot', () => {
   let finalSpot = bot.place(new Spot(2 , 3, Directions.east)).calculateFinalSpot(3);
   expect(finalSpot).to.be.eql(new Spot(5 , 3 , Directions.east));
   
   finalSpot = bot.calculateFinalSpot(2);
   expect(finalSpot).to.be.eql(new Spot(4, 3 , Directions.east));

   finalSpot = bot.rotate(RotationSide.left).calculateFinalSpot(2);
   expect(finalSpot).to.be.eql(new Spot(2, 5, Directions.north));


   finalSpot = bot.calculateFinalSpot(5);
   expect(finalSpot).to.eql(new Spot(2, 8 , Directions.north));

  });
});
