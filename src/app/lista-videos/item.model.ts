import { Player } from "./player.model";

export class Item{

    constructor(
        public kind: string,
        public etag: string,
        public id: string,
        public player: Player
    ) {}
}