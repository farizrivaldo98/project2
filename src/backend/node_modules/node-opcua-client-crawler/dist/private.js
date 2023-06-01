"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeCycle = exports.dedup_reference = exports.pendingBrowseName = void 0;
const node_opcua_assert_1 = require("node-opcua-assert");
const node_opcua_client_1 = require("node-opcua-client");
const node_opcua_debug_1 = require("node-opcua-debug");
const warningLog = (0, node_opcua_debug_1.make_warningLog)("CRAWLER");
exports.pendingBrowseName = new node_opcua_client_1.QualifiedName({ name: "pending" });
function dedup_reference(parentNode, references) {
    const results = [];
    const dedup = {};
    const duplicatedReferences = [];
    for (const reference of references) {
        const key = reference.referenceTypeId.toString() + reference.nodeId.toString();
        /* istanbul ignore next */
        if (dedup[key]) {
            duplicatedReferences.push(reference);
            continue;
        }
        dedup[key] = reference;
        results.push(reference);
    }
    if (duplicatedReferences.length > 0) {
        warningLog(`Warning => Duplicated references found while browsing ${parentNode.browseName.toString()}  nodeId= ${parentNode.nodeId.toString()}`);
        for (const reference of duplicatedReferences) {
            warningLog("   ", reference.toString());
        }
    }
    return results;
}
exports.dedup_reference = dedup_reference;
function removeCycle(object, innerCallback) {
    const visitedNodeIds = {};
    function hasBeenVisited(e) {
        const key1 = e.nodeId.toString();
        return visitedNodeIds[key1];
    }
    function setVisited(e) {
        const key1 = e.nodeId.toString();
        return (visitedNodeIds[key1] = e);
    }
    function mark_array(arr) {
        if (!arr) {
            return;
        }
        (0, node_opcua_assert_1.assert)(Array.isArray(arr));
        for (const e of arr) {
            if (hasBeenVisited(e)) {
                return;
            }
            else {
                setVisited(e);
                explorerObject(e);
            }
        }
    }
    function explorerObject(obj) {
        mark_array(obj.organizes);
        mark_array(obj.hasComponent);
        mark_array(obj.hasNotifier);
        mark_array(obj.hasProperty);
    }
    explorerObject(object);
    innerCallback(null, object);
}
exports.removeCycle = removeCycle;
//# sourceMappingURL=private.js.map