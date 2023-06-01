import { INamespace } from "node-opcua-address-space-base";
export declare function hasHigherPriorityThan(namespaceIndex1: number, namespaceIndex2: number, priorityTable: number[]): boolean;
/**
 *
 * @param namespace
 * @returns the order
 *
 *      ---
 *  ua, own , di  => 0 , 2,  1
 *
 *      ---
 *  ua, own , di , kitchen , own2,  adi  => 0 , 2,  3, 1
 *
 *                           ---
 *  ua, own , di , kitchen , own2,  adi  => 0 , 2,  3,  5, 1
 */
export declare function constructNamespacePriorityTable(namespace: INamespace): number[];
export declare function constructNamespaceDependency(namespace: INamespace, priorityTable?: number[]): INamespace[];
