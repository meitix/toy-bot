import { IBotRouter } from "./interfaces/bot.router.interface";
import { expect } from "chai";
import * as messages from './resources/messages.json';
import container from "../ioc/inversify.config";
import TYPES from "../ioc/types";

describe('Bot Router', () => {
    let router: IBotRouter;
    beforeEach(() => {
        router = container.get(TYPES.IBotRouter)
    });

    it('should create', () => {
        expect(router).not.to.be.undefined;
    });

    describe('Resolve method' , () => {

        it('should resolve the commands correctly.', () => {
            expect(typeof(router.resolve('PLACE 2,2,NORTH'))).to.eq(typeof(() => router.controller.place('2,2,NORTH')));
            expect(typeof(router.resolve('REPORT'))).to.eq(typeof(() => router.controller.report));
            expect(typeof(router.resolve('MOVE'))).to.eq(typeof(() => router.controller.move));
            expect(typeof(router.resolve('LEFT'))).to.eq(typeof(() => router.controller.left));
            expect(typeof(router.resolve('RIGHT'))).to.eq(typeof(() => router.controller.right));
        });
        
        it('should not be case sensitive.', () => {
            expect(typeof(router.resolve('PLAcE 2,2,NORTH'))).to.eql(typeof(() => router.controller.place('2,2,NORTH')));
            expect(typeof(router.resolve('moVE'))).to.eql(typeof(() => router.controller.move()));
            expect(typeof(router.resolve('left'))).to.eql(typeof(() => router.controller.left()));
            expect(typeof(router.resolve('riGHT'))).to.eql(typeof(() => router.controller.right()));
            expect(typeof(router.resolve('rEpOrT'))).to.eql(typeof(() => router.controller.report()));
        })

        it('should reject unknown routes.', () => {
            expect(router.resolve('UNKNOWN')()).to.equal(messages.routeIsNotDefined);
        })
    })
});