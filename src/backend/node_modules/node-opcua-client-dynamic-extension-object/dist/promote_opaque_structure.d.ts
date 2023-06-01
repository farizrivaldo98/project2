import { IBasicSession } from "node-opcua-pseudo-session";
import { Variant } from "node-opcua-variant";
export interface PseudoDataValue {
    value: Variant;
}
export declare function extractDataValueToPromote(dataValues: PseudoDataValue[]): PseudoDataValue[];
export declare function promoteOpaqueStructure(session: IBasicSession, dataValues: PseudoDataValue[]): Promise<void>;
