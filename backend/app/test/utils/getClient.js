"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.client = void 0;
const apollo_boost_1 = __importDefault(require("apollo-boost"));
exports.client = new apollo_boost_1.default({
    uri: 'http://localhost:4000/',
    onError: (e) => { console.log(e); },
});
