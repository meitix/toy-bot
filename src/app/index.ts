import container from "./ioc/inversify.config";
import { ICli } from "./cli/interfaces/bot-cli.interface";
import TYPES from "./ioc/types";

const cli = container.get<ICli>(TYPES.ICli);
// const cli = new Cli(new BotRouter(new BotController(new Bot(new Board(5, 5)), console.log)));
cli.start();