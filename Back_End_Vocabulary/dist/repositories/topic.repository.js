"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.topicRepository = void 0;
const Topic_1 = require("../models/Topic");
exports.topicRepository = {
    findAll: async () => Topic_1.Topic.find().sort({ createdAt: -1 }),
    findById: async (id) => Topic_1.Topic.findById(id),
    create: async (data) => Topic_1.Topic.create(data),
    update: async (id, data) => Topic_1.Topic.findByIdAndUpdate(id, data, { new: true }),
    delete: async (id) => Topic_1.Topic.findByIdAndDelete(id),
    updateWordCount: async (id, delta) => {
        await Topic_1.Topic.findByIdAndUpdate(id, { $inc: { totalWords: delta } });
    },
};
//# sourceMappingURL=topic.repository.js.map