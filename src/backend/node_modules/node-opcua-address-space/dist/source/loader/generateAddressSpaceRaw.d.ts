import { CallbackT } from "node-opcua-status-code";
import { IAddressSpace } from "node-opcua-address-space-base";
import { NodeSetLoaderOptions } from "../interfaces/nodeset_loader_options";
/**
 * @param addressSpace the addressSpace to populate
 * @xmlFiles: a lis of xml files
 * @param xmlLoader - a helper function to return the content of the xml file
 */
export declare function generateAddressSpaceRaw(addressSpace: IAddressSpace, xmlFiles: string | string[], xmlLoader: (nodeset2xmlUri: string) => Promise<string>, options: NodeSetLoaderOptions): Promise<void>;
export type XmlLoaderFunc = (nodeset2xmlUri: string, callback: CallbackT<string>) => void;
export type XmlLoaderAsyncFunc = (nodeset2xmlUri: string) => Promise<string>;
