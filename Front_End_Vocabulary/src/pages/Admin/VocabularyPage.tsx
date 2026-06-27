import { useState, useEffect, useRef } from "react";
import { topicService } from "../../services/topic.service";
import { vocabularyService } from "../../services/vocabulary.service";
import { useAdminAnimation } from "../../hooks/useAdminAnimation";
import Button from "../../components/common/Button";
import Icon from "../../components/common/Icon";
import AdminIcon from "../../components/common/AdminIcon";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import type { VocabularyWord } from "../../types/Vocabulary";

interface Topic {
  _id: string;
  title: string;
}

export default function AdminVocabularyPage() {
  const [topics, setTopics] = useState<Topic[]>([]);
  const [vocabs, setVocabs] = useState<VocabularyWord[]>([]);
  const [selectedTopicId, setSelectedTopicId] = useState<string>("all");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const containerRef = useAdminAnimation([vocabs, selectedTopicId], {
    sections: true,
    tableRows: "[data-vocab-row]",
  });
  const modalRef = useRef<HTMLDivElement>(null);
  const modalOverlayRef = useRef<HTMLDivElement>(null);

  // GSAP animation cho modal
  useGSAP(() => {
    if (showCreateModal && modalRef.current && modalOverlayRef.current) {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // Overlay fade in
        gsap.fromTo(modalOverlayRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.2, ease: "power2.out" }
        );
        // Modal scale + fade in
        gsap.fromTo(modalRef.current,
          { opacity: 0, scale: 0.92, y: 20 },
          { opacity: 1, scale: 1, y: 0, duration: 0.3, ease: "back.out(1.4)" }
        );
      });
      return () => mm.revert();
    }
  }, [showCreateModal]);
  const [formData, setFormData] = useState({
    topicId: "", word: "", phonetic: "", meaning: "", partOfSpeech: "noun", example: ""
  });

  useEffect(() => {
    loadTopics();
  }, []);

  useEffect(() => {
    loadVocab();
  }, [selectedTopicId, topics]);

  const loadTopics = async () => {
    try {
      const data = await topicService.getAll();
      setTopics(data);
      if (data.length > 0) {
        setFormData(prev => ({ ...prev, topicId: data[0]._id }));
      }
    } catch (err) {
      setError("Failed to load topics");
    }
  };

  const loadVocab = async () => {
    setIsLoading(true);
    try {
      const data = selectedTopicId === "all"
        ? await vocabularyService.getAll()
        : await vocabularyService.getAll(selectedTopicId);
      setVocabs(data as unknown as VocabularyWord[]);
    } catch (err) {
      setError("Failed to load vocabulary");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreate = async () => {
    if (!formData.word.trim() || !formData.meaning.trim()) {
      setError("Word and meaning are required");
      return;
    }

    setError(null);
    try {
      await vocabularyService.create(formData);
      setShowCreateModal(false);
      setFormData({ topicId: topics[0]?._id || "", word: "", phonetic: "", meaning: "", partOfSpeech: "noun", example: "" });
      await loadVocab();
    } catch (err) {
      setError("Failed to create vocabulary");
      console.error(err);
    }
  };

  const handleUpdate = async (vocab: Partial<VocabularyWord>) => {
    if (!editingId) return;

    setError(null);
    try {
      await vocabularyService.update(editingId, vocab);
      setEditingId(null);
      await loadVocab();
    } catch (err) {
      setError("Failed to update vocabulary");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this vocabulary word?")) return;
    try {
      await vocabularyService.delete(id);
      await loadVocab();
    } catch (err) {
      setError("Failed to delete vocabulary");
    }
  };

  const updateEditedVocab = (id: string, field: string, value: string) => {
    setVocabs(prev =>
      prev.map(v => v._id === id ? { ...v, [field]: value } : v)
    );
  };

  const partOfSpeechOptions = ["noun", "verb", "adjective", "adverb", "preposition", "conjunction", "pronoun", "interjection"];

  return (
    <div ref={containerRef} className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold" style={{ color: "var(--text-heading)" }}>
            Manage Vocabulary
          </h1>
          <p className="text-sm mt-1" style={{ color: "var(--text-body)" }}>
            Add and edit vocabulary words
          </p>
        </div>
        <Button variant="brand" onClick={() => setShowCreateModal(true)}>
          <Icon name="plus" size={16} color="white" />
          Add Word
        </Button>
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

      {/* Filter By Topic */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3">
        <label className="text-sm font-bold" style={{ color: "var(--text-heading)" }}>
          Filter by topic:
        </label>
        <select
          value={selectedTopicId}
          onChange={(e) => setSelectedTopicId(e.target.value)}
          className="px-4 py-2 rounded-[8px] text-sm outline-none"
          style={{ backgroundColor: "var(--neutral-bg)", border: "2px solid var(--border-default)", color: "var(--text-heading)" }}
        >
          <option value="all">All Topics</option>
          {topics.map((t) => (
            <option key={t._id} value={t._id}>{t.title}</option>
          ))}
        </select>
      </div>

      {/* Vocabulary Table */}
      {isLoading ? (
        <div className="text-center py-16">
          <div
            className="w-12 h-12 rounded-full animate-spin mx-auto mb-4"
            style={{ border: "4px solid var(--border-default)", borderTopColor: "var(--brand)" }}
          />
          <p style={{ color: "var(--text-body)" }}>Loading vocabulary...</p>
        </div>
      ) : vocabs.length === 0 ? (
        <div className="text-center py-16">
          <AdminIcon name="vocabulary" size={56} className="mx-auto mb-4" />
          <h3 className="text-xl font-bold mb-2" style={{ color: "var(--text-heading)" }}>
            No vocabulary words
          </h3>
          <p style={{ color: "var(--text-body)" }}>
            {selectedTopicId === "all" ? "Add your first word!" : "This topic has no words yet."}
          </p>
        </div>
      ) : (
        <>
          {/* ── Desktop Table ── */}
          <div
            className="hidden md:block rounded-[12px] overflow-hidden"
            style={{ border: "2px solid var(--border-default)" }}
          >
            <table className="w-full text-sm">
              <thead
                style={{ backgroundColor: "var(--neutral-bg)", color: "var(--text-body-subtle)" }}
              >
                <tr>
                  <th className="px-4 py-3 text-left font-bold uppercase tracking-wide text-[11px]">Word</th>
                  <th className="px-4 py-3 text-left font-bold uppercase tracking-wide text-[11px]">Phonetic</th>
                  <th className="px-4 py-3 text-left font-bold uppercase tracking-wide text-[11px]">Meaning</th>
                  <th className="px-4 py-3 text-left font-bold uppercase tracking-wide text-[11px]">POS</th>
                  <th className="px-4 py-3 text-left font-bold uppercase tracking-wide text-[11px]">Topic</th>
                  <th className="px-4 py-3 text-right font-bold uppercase tracking-wide text-[11px]">Actions</th>
                </tr>
              </thead>
              <tbody>
                {vocabs.map((vocab) => {
                  const topic = topics.find(t => t._id === vocab.topicId);
                  return (
                    <tr
                      key={vocab._id}
                      data-vocab-row
                      style={{ borderTop: "1px solid var(--border-default)" }}
                    >
                      {editingId === vocab._id ? (
                        <>
                          <td className="px-4 py-2">
                            <input
                              value={vocab.word}
                              onChange={(e) => updateEditedVocab(vocab._id, "word", e.target.value)}
                              className="w-full px-2 py-1 rounded-[4px] text-xs"
                              style={{ backgroundColor: "var(--neutral-bg)", border: "1px solid var(--brand)" }}
                            />
                          </td>
                          <td className="px-4 py-2">
                            <input
                              value={vocab.phonetic}
                              onChange={(e) => updateEditedVocab(vocab._id, "phonetic", e.target.value)}
                              className="w-full px-2 py-1 rounded-[4px] text-xs"
                              style={{ backgroundColor: "var(--neutral-bg)", border: "1px solid var(--brand)" }}
                            />
                          </td>
                          <td className="px-4 py-2">
                            <input
                              value={vocab.meaning}
                              onChange={(e) => updateEditedVocab(vocab._id, "meaning", e.target.value)}
                              className="w-full px-2 py-1 rounded-[4px] text-xs"
                              style={{ backgroundColor: "var(--neutral-bg)", border: "1px solid var(--brand)" }}
                            />
                          </td>
                          <td className="px-4 py-2">
                            <select
                              value={vocab.partOfSpeech}
                              onChange={(e) => updateEditedVocab(vocab._id, "partOfSpeech", e.target.value)}
                              className="w-full px-2 py-1 rounded-[4px] text-xs"
                              style={{ backgroundColor: "var(--neutral-bg)", border: "1px solid var(--brand)" }}
                            >
                              {partOfSpeechOptions.map(p => <option key={p} value={p}>{p}</option>)}
                            </select>
                          </td>
                          <td className="px-4 py-2 text-xs" style={{ color: "var(--text-body-subtle)" }}>
                            {topic?.title || "Unknown"}
                          </td>
                          <td className="px-4 py-2 text-right">
                            <div className="flex gap-2 justify-end">
                              <Button variant="success" size="xs" onClick={() => handleUpdate({ word: vocab.word, phonetic: vocab.phonetic, meaning: vocab.meaning, partOfSpeech: vocab.partOfSpeech })}>
                                Save
                              </Button>
                              <Button variant="secondary" size="xs" onClick={() => setEditingId(null)}>
                                Cancel
                              </Button>
                            </div>
                          </td>
                        </>
                      ) : (
                        <>
                          <td className="px-4 py-3 font-bold" style={{ color: "var(--text-heading)" }}>
                            {vocab.word}
                            <span className="text-[10px] ml-2 px-1.5 py-0.5 rounded-full" style={{ backgroundColor: "var(--brand-softer)", color: "var(--fg-brand-strong)" }}>
                              L{vocab.srsLevel}
                            </span>
                          </td>
                          <td className="px-4 py-3" style={{ color: "var(--text-body)" }}>
                            {vocab.phonetic}
                          </td>
                          <td className="px-4 py-3" style={{ color: "var(--text-body)" }}>
                            {vocab.meaning}
                          </td>
                          <td className="px-4 py-3">
                            <span className="text-[10px] px-2 py-0.5 rounded-full uppercase font-bold" style={{ backgroundColor: "var(--neutral-bg)", color: "var(--text-body-subtle)" }}>
                              {vocab.partOfSpeech}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-xs" style={{ color: "var(--text-body-subtle)" }}>
                            {topic?.title || "N/A"}
                          </td>
                          <td className="px-4 py-3 text-right">
                            <div className="flex gap-2 justify-end">
                              <Button variant="secondary" size="xs" onClick={() => setEditingId(vocab._id)}>
                                Edit
                              </Button>
                              <Button variant="danger" size="xs" onClick={() => handleDelete(vocab._id)}>
                                Del
                              </Button>
                            </div>
                          </td>
                        </>
                      )}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* ── Mobile Cards ── */}
          <div className="md:hidden space-y-3">
            {vocabs.map((vocab) => {
              const topic = topics.find(t => t._id === vocab.topicId);
              return (
                <div
                  key={vocab._id}
                  data-vocab-row
                  className="rounded-[12px] p-4"
                  style={{
                    backgroundColor: "var(--neutral-primary-soft)",
                    border: "2px solid var(--border-default)",
                  }}
                >
                  {editingId === vocab._id ? (
                    <div className="space-y-3">
                      <div>
                        <label className="block text-xs font-bold mb-1" style={{ color: "var(--text-heading)" }}>Word</label>
                        <input value={vocab.word} onChange={(e) => updateEditedVocab(vocab._id, "word", e.target.value)}
                          className="w-full px-3 py-2 rounded-[8px] text-sm" style={{ backgroundColor: "var(--neutral-bg)", border: "1px solid var(--brand)" }} />
                      </div>
                      <div>
                        <label className="block text-xs font-bold mb-1" style={{ color: "var(--text-heading)" }}>Phonetic</label>
                        <input value={vocab.phonetic} onChange={(e) => updateEditedVocab(vocab._id, "phonetic", e.target.value)}
                          className="w-full px-3 py-2 rounded-[8px] text-sm" style={{ backgroundColor: "var(--neutral-bg)", border: "1px solid var(--brand)" }} />
                      </div>
                      <div>
                        <label className="block text-xs font-bold mb-1" style={{ color: "var(--text-heading)" }}>Meaning</label>
                        <input value={vocab.meaning} onChange={(e) => updateEditedVocab(vocab._id, "meaning", e.target.value)}
                          className="w-full px-3 py-2 rounded-[8px] text-sm" style={{ backgroundColor: "var(--neutral-bg)", border: "1px solid var(--brand)" }} />
                      </div>
                      <div>
                        <label className="block text-xs font-bold mb-1" style={{ color: "var(--text-heading)" }}>POS</label>
                        <select value={vocab.partOfSpeech} onChange={(e) => updateEditedVocab(vocab._id, "partOfSpeech", e.target.value)}
                          className="w-full px-3 py-2 rounded-[8px] text-sm" style={{ backgroundColor: "var(--neutral-bg)", border: "1px solid var(--brand)", color: "var(--text-heading)" }}>
                          {partOfSpeechOptions.map(p => <option key={p} value={p}>{p}</option>)}
                        </select>
                      </div>
                      <div className="flex gap-2 pt-2">
                        <Button variant="success" size="sm" onClick={() => handleUpdate({ word: vocab.word, phonetic: vocab.phonetic, meaning: vocab.meaning, partOfSpeech: vocab.partOfSpeech })} fullWidth>Save</Button>
                        <Button variant="secondary" size="sm" onClick={() => setEditingId(null)} fullWidth>Cancel</Button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <h3 className="text-base font-bold truncate" style={{ color: "var(--text-heading)" }}>{vocab.word}</h3>
                            <span className="text-[10px] px-1.5 py-0.5 rounded-full shrink-0" style={{ backgroundColor: "var(--brand-softer)", color: "var(--fg-brand-strong)" }}>
                              L{vocab.srsLevel}
                            </span>
                          </div>
                          {vocab.phonetic && (
                            <p className="text-xs mt-0.5" style={{ color: "var(--text-body-subtle)" }}>{vocab.phonetic}</p>
                          )}
                        </div>
                        <span className="text-[10px] px-2 py-0.5 rounded-full uppercase font-bold shrink-0 ml-2" style={{ backgroundColor: "var(--neutral-bg)", color: "var(--text-body-subtle)" }}>
                          {vocab.partOfSpeech}
                        </span>
                      </div>
                      <p className="text-sm mb-2" style={{ color: "var(--text-body)" }}>{vocab.meaning}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs" style={{ color: "var(--text-body-subtle)" }}>{topic?.title || "N/A"}</span>
                        <div className="flex gap-2">
                          <Button variant="secondary" size="xs" onClick={() => setEditingId(vocab._id)}>Edit</Button>
                          <Button variant="danger" size="xs" onClick={() => handleDelete(vocab._id)}>Del</Button>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </>
      )}

      {/* Create Modal */}
      {showCreateModal && (
        <div ref={modalOverlayRef} className="fixed inset-0 z-50 flex items-center justify-center" style={{ backgroundColor: "rgba(0,0,0,0.4)" }}>
          <div
            ref={modalRef}
            className="w-full max-w-lg mx-4 rounded-[12px] p-6"
            style={{ backgroundColor: "var(--neutral-primary-soft)", border: "2px solid var(--border-default)" }}
          >
            <h2 className="text-lg font-bold mb-4" style={{ color: "var(--text-heading)" }}>
              Add Vocabulary Word
            </h2>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold mb-1" style={{ color: "var(--text-heading)" }}>
                    Word *
                  </label>
                  <input
                    type="text"
                    value={formData.word}
                    onChange={(e) => setFormData(prev => ({ ...prev, word: e.target.value }))}
                    className="w-full px-3 py-2 rounded-[8px] text-sm"
                    style={{ backgroundColor: "var(--neutral-bg)", border: "2px solid var(--border-default)" }}
                    autoFocus
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold mb-1" style={{ color: "var(--text-heading)" }}>
                    Phonetic
                  </label>
                  <input
                    type="text"
                    value={formData.phonetic}
                    onChange={(e) => setFormData(prev => ({ ...prev, phonetic: e.target.value }))}
                    placeholder="/wɜːrd/"
                    className="w-full px-3 py-2 rounded-[8px] text-sm"
                    style={{ backgroundColor: "var(--neutral-bg)", border: "2px solid var(--border-default)" }}
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold mb-1" style={{ color: "var(--text-heading)" }}>
                  Meaning *
                </label>
                <input
                  type="text"
                  value={formData.meaning}
                  onChange={(e) => setFormData(prev => ({ ...prev, meaning: e.target.value }))}
                  className="w-full px-3 py-2 rounded-[8px] text-sm"
                  style={{ backgroundColor: "var(--neutral-bg)", border: "2px solid var(--border-default)" }}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold mb-1" style={{ color: "var(--text-heading)" }}>
                    Part of Speech
                  </label>
                  <select
                    value={formData.partOfSpeech}
                    onChange={(e) => setFormData(prev => ({ ...prev, partOfSpeech: e.target.value }))}
                    className="w-full px-3 py-2 rounded-[8px] text-sm"
                    style={{ backgroundColor: "var(--neutral-bg)", border: "2px solid var(--border-default)", color: "var(--text-heading)" }}
                  >
                    {partOfSpeechOptions.map(p => <option key={p} value={p}>{p}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold mb-1" style={{ color: "var(--text-heading)" }}>
                    Topic
                  </label>
                  <select
                    value={formData.topicId}
                    onChange={(e) => setFormData(prev => ({ ...prev, topicId: e.target.value }))}
                    className="w-full px-3 py-2 rounded-[8px] text-sm"
                    style={{ backgroundColor: "var(--neutral-bg)", border: "2px solid var(--border-default)", color: "var(--text-heading)" }}
                  >
                    {topics.map(t => <option key={t._id} value={t._id}>{t.title}</option>)}
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold mb-1" style={{ color: "var(--text-heading)" }}>
                  Example Sentence
                </label>
                <textarea
                  value={formData.example}
                  onChange={(e) => setFormData(prev => ({ ...prev, example: e.target.value }))}
                  rows={2}
                  className="w-full px-3 py-2 rounded-[8px] text-sm resize-none"
                  style={{ backgroundColor: "var(--neutral-bg)", border: "2px solid var(--border-default)" }}
                />
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <Button
                variant="brand"
                onClick={handleCreate}
                fullWidth
              >
                Add Word
              </Button>
              <Button
                variant="secondary"
                onClick={() => setShowCreateModal(false)}
                fullWidth
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}