import { Item } from "./item.model";

export class Video{

    constructor(
        public kind: string,
        public etag: string,
        public items: Item[],
        public nextPageToken: string
    ) {}
}