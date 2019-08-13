import { IBotController } from './interfaces/bot.controller.interface';
import { expect } from 'chai';
import * as messages from '../lib/resources/messages.json';
import container from '../ioc/inversify.config';
import TYPES from '../ioc/types';

describe('Bot controller', () => {
  let controller: IBotController;
  beforeEach(() => {
    controller = container.get(TYPES.IBotController);
  });

  it('should create', () => {
    expect(controller).not.to.be.undefined;
  });

  it('should reject all commands before place', () => {
    
    controller.move();
    controller.right();
    controller.left();
    expect(controller.report()).to.eql(messages.bot.botIsNotPlaced);
  });

  it('should not return error when call place method', () => {
   expect(controller.place('3,4,NORTH')).be.undefined;
  });

  it('should report the same spot as it placed', () => {
    controller.place('2,2,NORTH');
    expect(controller.report()).to.eql('2,2,NORTH');
  });

  it('should not be case sensitive for face option', () => {
    controller.place('3,4,NoRth');
    expect(controller.report()).to.eql('3,4,NORTH');
  });

  it('should not break by having space in input string', () => {
    controller.place(' 3 , 4 , NORTH')
    expect(controller.report()).to.eql('3,4,NORTH');
  });

  it('should ignore movement when it will fall from table with a message', () => {
    
    controller.place('2,2,NORTH');
    expect(controller.move()).to.be.undefined;
    expect(controller.move()).to.be.undefined;
    expect(controller.move()).to.be.undefined;
    expect(controller.move()).to.equal(messages.bot.cantDoThisMove)
    expect(controller.move()).to.equal(messages.bot.cantDoThisMove)

    expect(controller.report()).to.eql('2,5,NORTH');
  });

  it('should report correct position after move', () => {
    // #1
    controller.place('0,0,NORTH');
    controller.move();
    expect(controller.report()).to.eql('0,1,NORTH');

    // #2
    controller.place('0,0,NORTH');
    controller.left();
    expect(controller.report()).to.eql('0,0,WEST');
    
    // #3
    controller.place('1,2,EAST');
    controller.move();
    controller.move();
    controller.left();
    controller.move();
    expect(controller.report()).to.eql('3,3,NORTH');
  });
});
