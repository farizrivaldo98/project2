/**
 * @module node-opcua-nodesets
 */
export type NodesetName = "standard" | "di" | "adi" | "autoId" | "commercialKitchenEquipment" | "cnc" | "gds" | "glass" | "ia" | "iolink" | "iolinkIODD" | "irdi" | "machinery" | "machineryProcessValues" | "machineryResult" | "machineTool" | "machineVision" | "packML" | "padim" | "robotics" | "tightening" | "woodWorking";
export type NodesetMeta = {
    name: NodesetName;
    packageName: string;
    uri: string;
    xmlFile: string;
};
export declare function constructNodesetFilename(filename: string): string;
export declare const allNodesetMeta: NodesetMeta[];
export declare const nodesets: Record<NodesetName, string>;
