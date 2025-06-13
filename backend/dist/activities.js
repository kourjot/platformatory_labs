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
        try {
            const apiBase = "https://crudcrud.com/api/2a7e4a1b19684888a78c1390d32fea0b/profile";
            const getResponse = yield fetch(apiBase);
            const users = yield getResponse.json();
            const existingUser = users.find((user) => user.firstName === data.firstName &&
                user.lastName === data.lastName &&
                user.phone === data.phone);
            if (existingUser && existingUser._id) {
                const updateUrl = `${apiBase}/${existingUser._id}`;
                const updateResponse = yield fetch(updateUrl, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data),
                });
                if (updateResponse.ok) {
                    console.log(`User updated: ${existingUser._id}`);
                }
                else {
                    console.error(" Update failed:", yield updateResponse.text());
                }
            }
            else {
                const createResponse = yield fetch(apiBase, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(data),
                });
                if (createResponse.ok) {
                    const res = yield createResponse.json();
                    console.log("New connection", res);
                }
                else {
                    const errorText = yield createResponse.text();
                    console.log("Create fail", errorText);
                }
                const result = yield createResponse.json();
                console.log("New user created:", result);
            }
        }
        catch (error) {
            console.error(" Error in sendToCrudCrud:", error);
        }
    });
}
