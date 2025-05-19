import { IdSearch } from "./idsearch.model";
import { Snippet } from "./snippet.model";

export class ItemSearch{

    constructor(
        public kind: string,
        public etag: string,
        public id: IdSearch,
        public snippet: Snippet
    ) {}
}