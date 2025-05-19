import { Player } from "./player.model";
import { Snippet } from "./snippet.model";
import { Statistics } from "./statistics.model";

export class ItemVideo{

    constructor(
        public kind: string,
        public etag: string,
        public id: string,
        public player: Player,
        public snippet: Snippet,
        public statistics: Statistics 
    ) {}
}