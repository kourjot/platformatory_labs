"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProfileWorkflow = updateProfileWorkflow;
const workflow_1 = require("@temporalio/workflow");
const workflow_2 = require("@temporalio/workflow");
const { saveToDatabase, sendToCrudCrud, savetoMongoDb } = (0, workflow_1.proxyActivities)({
    startToCloseTimeout: '10s',
});
function updateProfileWorkflow(data) {
    return __awaiter(this, void 0, void 0, function* () {
        yield saveToDatabase(data);
        yield (0, workflow_2.sleep)(10000);
        yield sendToCrudCrud(data);
        yield savetoMongoDb(data);
        console.log("Workflow completed successfully");
    });
}
