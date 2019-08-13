import { Container } from "inversify";
import TYPES from "./types";
import { IBotController } from "../cli/interfaces/bot.controller.interface";
import { BotController } from "../cli/bot.controller";
import { IBotRouter } from "../cli/interfaces/bot.router.interface";
import { BotRouter } from "../cli/bot.router";
import { ICli } from "../cli/interfaces/bot-cli.interface";
import { Cli } from "../cli/bot-cli";
import { IBot } from "../lib/models/interfaces/bot.interface";
import { Bot } from "../lib/models/bot";
import { IBoard } from "../lib/models/interfaces/board.interface";
import { Board } from "../lib/models/board";
import * as botConfig from '../bot.config.json'

const container = new Container();

container.bind<IBotController>(TYPES.IBotController).to(BotController);
container.bind<IBotRouter>(TYPES.IBotRouter).to(BotRouter);
container.bind<ICli>(TYPES.ICli).to(Cli);
container.bind<IBot>(TYPES.IBot).to(Bot);
container.bind<IBoard>(TYPES.IBoard).to(Board);
container.bind<number>(TYPES.BoardLength).toConstantValue(botConfig.board.length);
container.bind<number>(TYPES.BoardWidth).toConstantValue(botConfig.board.width);

export default container;