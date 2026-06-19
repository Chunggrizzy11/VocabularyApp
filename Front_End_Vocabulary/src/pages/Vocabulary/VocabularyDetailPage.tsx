import MainLayout from "../../layouts/MainLayout";
import VocabularyImage from "../../components/vocabulary/VocabularyImage";
import PronunciationCard from "../../components/vocabulary/PronunciationCard";
import VocabularyAudio from "../../components/vocabulary/VocabularyAudio";

export default function VocabularyDetailPage() {
  return (
    <MainLayout>
      <h1 className="text-3xl font-bold mb-8">Word Details</h1>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow">
          <h2 className="text-2xl font-bold">abandon</h2>
          <VocabularyImage word="abandon" />
          <PronunciationCard word="abandon" pronunciation="/əˈbændən/" />
          <VocabularyAudio word="abandon" />
          <p className="mt-4">Meaning: từ bỏ</p>
          <p className="mt-2 italic">"He abandoned the project."</p>
        </div>
      </div>
    </MainLayout>
  );
}
