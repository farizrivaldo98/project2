import { NodeIdLike } from "node-opcua-nodeid";
import { NodeCrawlerBase, NodeCrawlerClientSession, ObjectMap, Pojo } from "./node_crawler_base";
export declare class NodeCrawler extends NodeCrawlerBase {
    protected readonly _objMap: ObjectMap;
    constructor(session: NodeCrawlerClientSession);
    dispose(): void;
    /**
     *
     */
    read(nodeId: NodeIdLike): Promise<Pojo>;
    read(nodeId: NodeIdLike, callback: (err: Error | null, obj?: Pojo) => void): void;
    private simplify_object;
    private _add_for_reconstruction;
    private _reconstruct_manageable_object;
}
