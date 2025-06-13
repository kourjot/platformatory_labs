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
exports.saveToDatabase = saveToDatabase;
exports.sendToCrudCrud = sendToCrudCrud;
function saveToDatabase(data) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("Saving to DB (simulated):", data);
    });
}
function sendToCrudCrud(data) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch("https://crudcrud.com/api/9e40e8f2835a4eb3b78053f3faf7ccdb/profile", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        });
        const result = yield response.json();
        console.log("Data sent to crudcrud:", result);
    });
}
