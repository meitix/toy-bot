import {expect} from 'chai';
import { Spot } from './spot';
import { Directions } from '../enums/directions.enum';

describe('Spot' , () => {
    it('should create' , () => {
        const spot = new Spot(2 , 5 , Directions.north);
        expect(spot).not.to.be.undefined;
    });
});
