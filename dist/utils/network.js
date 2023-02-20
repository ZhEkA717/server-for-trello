"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendJSONResponse = exports.sendResponse = exports.preflightRequest = exports.commonJSONResponseHeaders = void 0;
const CORSHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
};
exports.commonJSONResponseHeaders = Object.assign({ 'Content-Type': 'application/json' }, CORSHeaders);
const preflightRequest = (req, res) => {
    res.writeHead(204, {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, PUT, GET, OPTIONS, DELETE",
        "Access-Control-Max-Age": 86400,
        "Access-Control-Allow-Headers": "*"
    });
    res.end();
};
exports.preflightRequest = preflightRequest;
const sendResponse = (responseParams) => {
    const { response, statusCode, statusMessage } = responseParams;
    response.writeHead(statusCode, statusMessage, exports.commonJSONResponseHeaders);
    response.end(JSON.stringify(statusMessage));
};
exports.sendResponse = sendResponse;
const sendJSONResponse = (responseParams) => {
    const { response, statusCode, payload, statusMessage } = responseParams;
    response.writeHead(statusCode, statusMessage, exports.commonJSONResponseHeaders);
    response.end(JSON.stringify(payload));
};
exports.sendJSONResponse = sendJSONResponse;
