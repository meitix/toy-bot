import { ICli } from './interfaces/bot-cli.interface';
import { expect } from 'chai';
import container from '../ioc/inversify.config';
import TYPES from '../ioc/types';

describe('CLI Main', () => {
  let cli: ICli;

  beforeEach(() => {
    cli = container.get(TYPES.ICli);
  });

  it('should create', () => {
    expect(cli).not.to.be.undefined;
  });

  it('should start', () => {
    expect(() => cli.start()).not.throw();
  });
});
