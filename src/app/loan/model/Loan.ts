import { Client } from "src/app/client/model/Client";
import { Game } from "src/app/game/model/Game";

export class Loan {
    id: number;
    client: Client;
    game: Game;
    dateLoan: String;
    dateReturn: String;

}