import { ItemSearch } from "./itemsearch.model";
import { PageInfo } from "./pageinfo.model";

export class Search{

    constructor(
        public kind: string,
        public etag: string,
        public items: ItemSearch[],
        public nextPageToken: string,
        public prevPageToken: string,
        public pageInfo: PageInfo
    ) {}
}