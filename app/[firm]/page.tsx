import { QuestionBankCard } from "@/components/question-bank-card";
import questionBank from "@/data/firm-questions.json";
import type { Metadata, ResolvingMetadata } from 'next';

function DecodeName(encodedSentence: string) {
  return encodedSentence.split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}


export async function generateMetadata(
  { params }: any,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { firm } = await params;
  return {
    metadataBase: new URL('https://www.coachquant.com/'),
    title: `${DecodeName(firm)} Quant Interview Questions 2025`,
    description: `Practice probability, statistics, and brainteaser questions from Quant interview questions for the ${DecodeName(firm)} 2025 intern season.`,
    alternates: {
      canonical: `/${firm}`,
    }
  };
}

export default async function Page({ params }: any) {
  const { firm } = await params;
  // Filter question banks based on the firm slug
  const filteredBanks = questionBank.filter((bank) => bank.firm_name === firm);

  // Check if the firm is found
  if (filteredBanks.length === 0) {
    return (
      <main className="min-h-screen w-full py-12 px-4 sm:px-6 lg:px-8 bg-gray-100">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Firm not found
          </h1>
        </div>
      </main>
    );
  }

  const questions = filteredBanks[0].firm_questions;

  return (
    <main className="min-h-screen w-full py-12 lg:px-8 bg-gray-100">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col items-center justify-center ">
          <QuestionBankCard firm={firm} questions={questions} />
        </div>
      </div>
    </main>
  );
}