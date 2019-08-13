import { IBotController } from "./bot.controller.interface";

export interface IBotRouter {
    controller: IBotController;
    resolve(command: string): () => void | string;
}