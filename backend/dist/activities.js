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
exports.savetoMongoDb = savetoMongoDb;
exports.sendToCrudCrud = sendToCrudCrud;
const { Profile } = require("../model/profile.js");
const { connection } = require("../db.js");
function saveToDatabase(data) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("Saving to DB (simulated):", data);
    });
}
function savetoMongoDb(data) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield connection();
            const existingUser = yield Profile.findOne({
                firstName: data.firstName,
                lastName: data.lastName,
                phone: data.phone
            });
            if (existingUser) {
                yield Profile.updateOne({ _id: existingUser._id }, data);
                console.log(existingUser._id);
            }
            else {
                const newProfile = new Profile(data);
                yield newProfile.save();
                console.log(newProfile._id);
            }
        }
        catch (err) {
            console.log("Error in data save in mongoDB", err);
        }
    });
}
function sendToCrudCrud(data) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const apiBase = "https://crudcrud.com/api/f07cb3b251284854b33b000edb8b1a65/profile";
            // const arr=[];
            const getResponse = yield fetch(apiBase);
            if (!getResponse.ok) {
                const text = yield getResponse.text();
                console.log(text);
            }
            const users = yield getResponse.json();
            const existingUser = users.find((user) => user.firstName === data.firstName &&
                user.lastName === data.lastName &&
                user.phone === data.phone);
            if (existingUser && existingUser._id) {
                const updateUrl = `${apiBase}/${existingUser._id}`;
                console.log(updateUrl);
                const updateResponse = yield fetch(updateUrl, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data),
                });
                if (!updateResponse.ok) {
                    const errText = yield updateResponse.text();
                    console.log(errText);
                }
                console.log("User updated:", existingUser._id);
            }
            else {
                const createResponse = yield fetch(apiBase, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(data),
                });
                if (!createResponse.ok) {
                    const errorText = yield createResponse.text();
                    console.log("Create failed:", errorText);
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
