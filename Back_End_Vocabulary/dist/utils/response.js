"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.success = success;
exports.created = created;
exports.noContent = noContent;
exports.error = error;
function success(res, data, statusCode = 200) {
    res.status(statusCode).json({ success: true, data });
}
function created(res, data) {
    success(res, data, 201);
}
function noContent(res) {
    res.status(204).send();
}
function error(res, message, statusCode = 500) {
    res.status(statusCode).json({ success: false, message });
}
//# sourceMappingURL=response.js.map