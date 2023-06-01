import { IBasicSession } from "node-opcua-pseudo-session";
import { ExtraDataTypeManager } from "./extra_data_type_manager";
export declare function invalidateExtraDataTypeManager(session: IBasicSession): Promise<void>;
export declare function getExtraDataTypeManager(session: IBasicSession): Promise<ExtraDataTypeManager>;
