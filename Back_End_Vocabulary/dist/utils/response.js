"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.success = success;
exports.created = created;
exports.noContent = noContent;
exports.error = error;
function success(res, data, statusCode = 200) {
    return res.status(statusCode).json({ success: true, data });
}
function created(res, data) {
    return success(res, data, 201);
}
function noContent(res) {
    return res.status(204).send();
}
function error(res, message, statusCode = 500) {
    return res.status(statusCode).json({ success: false, message });
}
//# sourceMappingURL=response.js.map