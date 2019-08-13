import { IBotRouter } from './interfaces/bot.router.interface';
import { IBotController } from './interfaces/bot.controller.interface';
import * as messages from './resources/messages.json';
import { injectable , inject } from 'inversify';
import 'reflect-metadata';
import TYPES from '../ioc/types';

@injectable()
export class BotRouter implements IBotRouter {
  private mapper = {
    place: (input: string) => () => this.controller.place(input),
    move: () => this.controller.move(),
    left: () => this.controller.left(),
    right: () => this.controller.right(),
    report: () => this.controller.report()
  };
  constructor(@inject(TYPES.IBotController) public controller: IBotController) {}

  resolve(command: string): () => void {
    command = command.toLowerCase().trim();
    const commandArr = command.split(' ');
    const action = (this.mapper as any)[commandArr[0]];

    if(!action) return this.reject();

    // call action with parameters if they are exists.
    if (commandArr[1]) {
      return action(commandArr[1]);
    }

    return action;
  }

  reject() {
      return () => messages.routeIsNotDefined;
  }
}
