import { UAMethod } from "node-opcua-address-space-base";
import { UAFolder, UAFolder_Base } from "./ua_folder";
/**
 * |                |                                                            |
 * |----------------|------------------------------------------------------------|
 * |namespace       |http://opcfoundation.org/UA/                                |
 * |nodeClass       |ObjectType                                                  |
 * |typedDefinition |AliasNameCategoryType i=23456                               |
 * |isAbstract      |false                                                       |
 */
export interface UAAliasNameCategory_Base extends UAFolder_Base {
    findAlias: UAMethod;
}
export interface UAAliasNameCategory extends UAFolder, UAAliasNameCategory_Base {
}
