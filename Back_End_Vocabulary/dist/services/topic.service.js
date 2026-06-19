"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.topicService = void 0;
const topic_repository_1 = require("../repositories/topic.repository");
exports.topicService = {
    getAll: () => topic_repository_1.topicRepository.findAll(),
    getById: (id) => topic_repository_1.topicRepository.findById(id),
    create: (data) => topic_repository_1.topicRepository.create(data),
    update: (id, data) => topic_repository_1.topicRepository.update(id, data),
    delete: (id) => topic_repository_1.topicRepository.delete(id),
};
//# sourceMappingURL=topic.service.js.map