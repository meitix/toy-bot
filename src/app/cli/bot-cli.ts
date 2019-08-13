import { ICli } from './interfaces/bot-cli.interface';
import { IBotRouter } from './interfaces/bot.router.interface';

import { createInterface, Interface } from 'readline';
import { prompt } from './resources/config.json';
import { inject, injectable } from 'inversify';
import TYPES from '../ioc/types';

@injectable()
export class Cli implements ICli {
  private interface!: Interface;
  private readonly router: IBotRouter;
  constructor(@inject(TYPES.IBotRouter) router: IBotRouter) {
    this.router = router;
    this.interface = createInterface({
      input: process.stdin,
      output: process.stdout,
      prompt
    });
  }

  start(): void {
    this.interface.prompt();
    this.interface.on('line', str => {
      const result = this.router.resolve(str)();
      if (result) console.log(result);
      
      this.interface.prompt();
    });
  }
}
