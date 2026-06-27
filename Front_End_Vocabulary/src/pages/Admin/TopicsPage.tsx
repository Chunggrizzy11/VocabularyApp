import { useState, useEffect } from "react";
import { useAuthStore } from "../../store/auth.store";
import { authService } from "../../services/auth.service";
import { topicService } from "../../services/topic.service";
import { vocabularyService } from "../../services/vocabulary.service";
import { useAdminAnimation } from "../../hooks/useAdminAnimation";
import Button from "../../components/common/Button";
import Icon from "../../components/common/Icon";
import AdminIcon from "../../components/common/AdminIcon";

interface Topic {
  _id: string;
  title: string;
  description: string;
  totalWords: number;
  imageUrl?: string;
}

interface VocabularyCount {
  [topicId: string]: number;
}

export default function AdminTopicsPage() {
  const { user } = useAuthStore();
  const [topics, setTopics] = useState<Topic[]>([]);
  const [vocabCounts, setVocabCounts] = useState<VocabularyCount>({});
  const [isLoading, setIsLoading] = useState(true);
  const [isCreating, setIsCreating] = useState(false);
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [formData, setFormData] = useState({ title: "", description: "", imageUrl: "" });
  const [error, setError] = useState<string | null>(null);

  // Animation cho phần header và form tạo topic
  const headerRef = useAdminAnimation([], { sections: true, staggerItems: "[data-topic-form-item]" });
  // Animation cho danh sách topics grid
  const topicsGridRef = useAdminAnimation([topics], { gridCards: "[data-topic-card]" });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setIsLoading(true);
    try {
      const topicsResponse = await topicService.getAll();
      const vocabCountsMap: VocabularyCount = {};
      await Promise.all(
        topicsResponse.map(async (topic) => {
          const vocabCount = await vocabularyService.getAll(topic._id);
          vocabCountsMap[topic._id] = vocabCount.length;
        })
      );
      setTopics(topicsResponse);
      setVocabCounts(vocabCountsMap);
    } catch (err) {
      setError("Failed to load topics");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreate = async () => {
    if (!formData.title.trim()) {
      setError("Title is required");
      return;
    }

    setIsCreating(true);
    setError(null);

    try {
      await topicService.create(formData);
      setFormData({ title: "", description: "", imageUrl: "" });
      await loadData();
    } catch (err) {
      setError("Failed to create topic");
      console.error(err);
    } finally {
      setIsCreating(false);
    }
  };

  const handleUpdate = async (topic: Topic) => {
    setIsEditing(null);

    try {
      await topicService.update(topic._id, { title: topic.title, description: topic.description, imageUrl: topic.imageUrl });
      await loadData();
    } catch (err) {
      setError("Failed to update topic");
      console.error(err);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this topic?")) return;

    try {
      await topicService.delete(id);
      await loadData();
    } catch (err) {
      setError("Failed to delete topic");
      console.error(err);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div
            className="w-12 h-12 rounded-full animate-spin mx-auto mb-4"
            style={{
              border: "4px solid var(--border-default)",
              borderTopColor: "var(--brand)",
            }}
          />
          <p style={{ color: "var(--text-body)" }}>Loading topics...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header với animation */}
      <div ref={headerRef} className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold" style={{ color: "var(--text-heading)" }}>
            Manage Topics
          </h1>
          <p className="text-sm mt-1" style={{ color: "var(--text-body)" }}>
            Create and manage vocabulary topics
          </p>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div
          className="p-3 rounded-[8px] text-sm font-medium"
          style={{
            backgroundColor: "rgba(255, 75, 75, 0.1)",
            color: "#FF4B4B",
            border: "1px solid rgba(255, 75, 75, 0.2)",
          }}
        >
          {error}
        </div>
      )}

      {/* Create Form với animation */}
      <div
        className="rounded-[12px] p-6"
        style={{ backgroundColor: "var(--neutral-primary-soft)", border: "2px solid var(--border-default)" }}
      >
        <h2 className="text-lg font-bold mb-4" style={{ color: "var(--text-heading)" }}>
          Create New Topic
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div data-topic-form-item>
            <label className="block text-sm font-bold mb-2" style={{ color: "var(--text-heading)" }}>
              Title *
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
              placeholder="e.g., Emotions, Travel, Technology"
              className="w-full px-4 py-3 rounded-[8px] text-sm outline-none"
              style={{ backgroundColor: "var(--neutral-bg)", border: "2px solid var(--border-default)" }}
              required
            />
          </div>
          <div data-topic-form-item>
            <label className="block text-sm font-bold mb-2" style={{ color: "var(--text-heading)" }}>
              Image URL (optional)
            </label>
            <input
              type="url"
              value={formData.imageUrl}
              onChange={(e) => setFormData((prev) => ({ ...prev, imageUrl: e.target.value }))}
              placeholder="https://example.com/image.jpg"
              className="w-full px-4 py-3 rounded-[8px] text-sm outline-none"
              style={{ backgroundColor: "var(--neutral-bg)", border: "2px solid var(--border-default)" }}
            />
          </div>
          <div data-topic-form-item className="md:col-span-2">
            <label className="block text-sm font-bold mb-2" style={{ color: "var(--text-heading)" }}>
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
              placeholder="Brief description of this topic..."
              rows={3}
              className="w-full px-4 py-3 rounded-[8px] text-sm outline-none resize-none"
              style={{ backgroundColor: "var(--neutral-bg)", border: "2px solid var(--border-default)" }}
            />
          </div>
        </div>
        <div data-topic-form-item className="mt-4 flex gap-3">
          <Button
            variant="brand"
            onClick={handleCreate}
            disabled={isCreating || !formData.title.trim()}
          >
            {isCreating ? "Creating..." : "Create Topic"}
          </Button>
          <Button
            variant="secondary"
            onClick={() => setFormData({ title: "", description: "", imageUrl: "" })}
          >
            Clear
          </Button>
        </div>
      </div>

      {/* Topics List với animation */}
      <div ref={topicsGridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {topics.map((topic) => (
          <div
            key={topic._id}
            data-topic-card
            className="rounded-[12px] p-5 transition-all duration-200 hover:transform hover:translate-y-[-2px]"
            style={{ backgroundColor: "var(--neutral-primary-soft)", border: "2px solid var(--border-default)" }}
          >
            {isEditing === topic._id ? (
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-bold mb-1" style={{ color: "var(--text-heading)" }}>
                    Title
                  </label>
                  <input
                    type="text"
                    value={topic.title}
                    onChange={(e) =>
                      setTopics((prev) =>
                        prev.map((t) => (t._id === topic._id ? { ...t, title: e.target.value } : t))
                      )
                    }
                    className="w-full px-3 py-2 rounded-[8px] text-sm"
                    style={{ backgroundColor: "var(--neutral-bg)", border: "2px solid var(--brand)" }}
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold mb-1" style={{ color: "var(--text-heading)" }}>
                    Description
                  </label>
                  <textarea
                    value={topic.description}
                    onChange={(e) =>
                      setTopics((prev) =>
                        prev.map((t) => (t._id === topic._id ? { ...t, description: e.target.value } : t))
                      )
                    }
                    rows={2}
                    className="w-full px-3 py-2 rounded-[8px] text-sm resize-none"
                    style={{ backgroundColor: "var(--neutral-bg)", border: "2px solid var(--brand)" }}
                  />
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="brand"
                    size="xs"
                    onClick={() => handleUpdate(topic)}
                    className="flex-1"
                  >
                    Save
                  </Button>
                  <Button
                    variant="secondary"
                    size="xs"
                    onClick={() => setIsEditing(null)}
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-[8px] flex items-center justify-center"
                      style={{ backgroundColor: "var(--brand)", color: "white" }}
                    >
                      <AdminIcon name="topics" size={20} style={{ filter: "brightness(10)" }} />
                    </div>
                    <h3 className="text-lg font-bold" style={{ color: "var(--text-heading)" }}>
                      {topic.title}
                    </h3>
                  </div>
                  <Icon
                    name="dots"
                    size={16}
                    color="var(--text-body-subtle)"
                    className="cursor-pointer"
                  />
                </div>

                <p className="text-sm mb-4 line-clamp-2" style={{ color: "var(--text-body)" }}>
                  {topic.description || "No description provided"}
                </p>

                <div className="flex items-center justify-between mb-4 text-xs" style={{ color: "var(--text-body-subtle)" }}>
                  <span>{topic.totalWords || vocabCounts[topic._id] || 0} words</span>
                  {topic.imageUrl && <span>🖼️ Image</span>}
                </div>

                <div className="flex gap-2">
                  <Button
                    variant="secondary"
                    size="xs"
                    onClick={() => setIsEditing(topic._id)}
                    className="flex-1"
                  >
                    Edit
                  </Button>
                  <Button
                    variant="danger"
                    size="xs"
                    onClick={() => handleDelete(topic._id)}
                    className="flex-1"
                  >
                    Delete
                  </Button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>

      {topics.length === 0 && !isLoading && (
        <div className="text-center py-16">
          <AdminIcon name="topics" size={56} className="mx-auto mb-4" />
          <h3 className="text-xl font-bold mb-2" style={{ color: "var(--text-heading)" }}>
            No topics yet
          </h3>
          <p style={{ color: "var(--text-body)" }}>Create your first topic to get started!</p>
        </div>
      )}
    </div>
  );
}