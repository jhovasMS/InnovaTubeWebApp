import { ItemVideo } from "./itemvideo.model";
import { PageInfo } from "./pageinfo.model";

export class Video{

    constructor(
        public kind: string,
        public etag: string,
        public items: ItemVideo[],
        public nextPageToken: string,
        public prevPageToken: string,
        public pageInfo: PageInfo
    ) {}
}