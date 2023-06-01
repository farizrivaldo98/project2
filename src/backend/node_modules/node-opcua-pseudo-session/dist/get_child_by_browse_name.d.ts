import { NodeId } from "node-opcua-nodeid";
import { ReferenceDescription } from "node-opcua-types";
import { IBasicSession } from "./basic_session_interface";
export declare function getChildByBrowseName(session: IBasicSession, nodeId: NodeId, name: string): Promise<ReferenceDescription>;
