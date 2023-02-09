"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_cluster_1 = __importDefault(require("node:cluster"));
const node_os_1 = require("node:os");
const createServer_1 = require("./Server/createServer");
const numCPUs = (0, node_os_1.cpus)().length;
const clustStarter = () => {
    const worker = node_cluster_1.default.fork();
    worker.on("online", () => {
        console.info(`Worker ${worker.id} started`);
    });
    worker.on("exit", (code, signal) => {
        if (signal) {
            console.log(`worker was killed by signal: ${signal}`);
        }
        else {
            console.info(`worker ${worker.id} died`);
            clustStarter();
        }
    });
};
if (node_cluster_1.default.isPrimary) {
    for (let index = 0; index < numCPUs; index++) {
        clustStarter();
    }
}
else {
    (0, createServer_1.createServer)();
}
