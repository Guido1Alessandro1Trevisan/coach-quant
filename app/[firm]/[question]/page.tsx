// imports
import fs from 'fs';
import path from 'path';
import Link from 'next/link';
import HintAnswer from '@/components/hint-answer';
import { Card } from '@/components/ui/card';
import ProgressUI from '@/components/progress-ui';
import WaveForm from '@/components/wave-form';
import questionBank from '@/data/firm-questions.json';
import clsx from 'clsx';
import type { Metadata, ResolvingMetadata } from 'next';

// Helper function to create slugs from question names
function slugify(text: string) {
  return text.toLowerCase().replace(/ /g, '-');
}

// Function to capitalize the first letter of each word
function capitalizeWords(sentence: string) {
  return sentence.replace(/\b\w/g, (char) => char.toUpperCase());
}

export async function generateMetadata(
  { params }: any,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // Read route params
  const { firm, question } = await params;

  // Decode the question from URI
  const questionSlug = question;
  const firmSlug = firm;

  const firmName = capitalizeWords(firmSlug.replace(/-/g, ' ')) || 'Unknown Company';

  // Find the firm data
  const firmData: any = questionBank.find((f) => slugify(f.firm_name) === firmSlug);


  // Find the question title
  const questionTitle =
    firmData.firm_questions.find((q: any) => slugify(q) === questionSlug) ||
    capitalizeWords(questionSlug.replace(/-/g, ' '));

  // Generate title and description based on firm and question
  const title = `${questionTitle} - ${firmName} Interview Question`;
  const description = `Quant interview question "${questionTitle}" from ${firmName}, complete with hints and solutions to help you prepare for your quantitative finance interview.`;

  return {
    metadataBase: new URL('https://www.coachquant.com/'),
    title,
    description,
    alternates: {
      canonical: `/${firmSlug}/${questionSlug}`,
    },
  };
}

export default async function Page({ params }: any) {
  const { firm, question } = await params;

  const questionSlug = question;
  const firmSlug = firm;

  const firmData = questionBank.find((f) => slugify(f.firm_name) === firmSlug);

  if (!firmData) {
    return (
      <main className="min-h-screen w-full py-6 px-4 sm:py-12 sm:px-6 lg:px-8 bg-gray-100">
        <div className="text-center mt-10">
          <h1 className="text-2xl font-bold">Firm not found</h1>
          <p className="mt-4">
            <Link href="/" className="text-blue-500 hover:underline">
              Go back to home
            </Link>
          </p>
        </div>
      </main>
    );
  }

  const firmQuestions = firmData.firm_questions;

  // Find the index of the current question using slug comparison
  const currentIndex = firmQuestions.findIndex(
    (q) => slugify(q) === questionSlug
  );


  // Handle case where question is not found
  if (currentIndex === -1) {
    return (
      <main className="min-h-screen w-full py-6 px-4 sm:py-12 sm:px-6 lg:px-8 bg-gray-100">
        <div className="text-center mt-10">
          <h1 className="text-2xl font-bold">Question not found</h1>
          <p className="mt-4">
            <Link href={`/${firmSlug}`} className="text-blue-500 hover:underline">
              View all questions for {capitalizeWords(firmSlug.replace(/-/g, ' '))}
            </Link>
          </p>
        </div>
      </main>
    );
  }

  // Get the current question title
  const questionTitle = firmQuestions[currentIndex];

  // Get the next question if it exists
  let nextQuestion = null;
  if (currentIndex < firmQuestions.length - 1) {
    nextQuestion = firmQuestions[currentIndex + 1];
  }

  // Read the question data from the JSON file
  let tag = 'Unknown Tag';
  let difficulty = 'Unknown Difficulty';
  try {
    const filePath = path.join(
      process.cwd(),
      'public',
      'questions',
      `${questionTitle}.json`
    );
    const data = fs.readFileSync(filePath, 'utf8');
    const questionData = JSON.parse(data);
    tag = questionData['problem tags']?.[0] || 'Unknown Tag';
    difficulty = questionData['problem difficulty'] || 'Unknown Difficulty';
  } catch (error) {
    console.error('Failed to load question data', error);
    // You can handle the error as needed
  }

  return (
    <main className="min-h-screen w-full py-6 px-4 sm:py-12 sm:px-6 lg:px-8 bg-gray-100">
      <Card className="w-full max-w-[90vw] sm:max-w-[80vw] mx-auto bg-white px-4 sm:px-8 md:px-16 lg:px-24">
        {/* Navigation */}
        <div className="w-full flex items-center justify-between mt-10 lg:mt-16">
          <Link href={`/${firmSlug}`} className="flex flex-row items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
              className="h-6 sm:h-8 stroke-2"
            >
              <path
                fillRule="evenodd"
                d="M7.28 7.72a.75.75 0 010 1.06L4.81 11.25H21a.75.75 0 010 1.5H4.81l2.47 2.47a.75.75 0 11-1.06 1.06l-3.75-3.75a.75.75 0 010-1.06l3.75-3.75a.75.75 0 011.06 0z"
                clipRule="evenodd"
              />
            </svg>
            <p className="ml-2 text-base sm:text-lg">All Questions</p>
          </Link>

          {/* Next Question Navigation */}
          {nextQuestion ? (
            <Link
              href={`/${firmSlug}/${slugify(nextQuestion)}`}
              className="flex flex-row items-center"
            >
              <p className="mr-2 text-base sm:text-lg">Next Question</p>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
                className="h-6 sm:h-8 stroke-2"
              >
                <path
                  fillRule="evenodd"
                  d="M16.72 7.72a.75.75 0 011.06 0l3.75 3.75a.75.75 0 010 1.06l-3.75 3.75a.75.75 0 11-1.06-1.06l2.47-2.47H3a.75.75 0 010-1.5h16.19l-2.47-2.47a.75.75 0 010-1.06z"
                  clipRule="evenodd"
                />
              </svg>
            </Link>
          ) : (
            <span className="flex flex-row items-center text-gray-400 cursor-default">
              <p className="mr-2 text-base sm:text-lg">Next Question</p>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
                className="h-6 sm:h-8 stroke-2"
              >
                <path
                  fillRule="evenodd"
                  d="M16.72 7.72a.75.75 0 011.06 0l3.75 3.75a.75.75 0 010 1.06l-3.75 3.75a.75.75 0 11-1.06-1.06l2.47-2.47H3a.75.75 0 010-1.5h16.19l-2.47-2.47a.75.75 0 010-1.06z"
                  clipRule="evenodd"
                />
              </svg>
            </span>
          )}
        </div>

        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 sm:mb-8 mt-12">
          {questionTitle}
        </h1>

        {/* Question Info with dynamic tag */}
        <div className="flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-2 border-b-2 pb-6 sm:pb-8">
          <div className="flex items-center gap-2 mb-2 sm:mb-0">
            <p
              className={clsx(
                'inline rounded-full px-2.5 py-1 text-sm sm:text-base text-white',
                {
                  'bg-emerald-500': difficulty === 'Easy',
                  'bg-yellow-500': difficulty === 'Medium',
                  'bg-red-500': difficulty === 'Hard',
                }
              )}
            >
              {difficulty}
            </p>
            <div className="h-1 w-1 rounded-full bg-neutral-600" />
            <p className="inline rounded-full bg-[#21485a] px-2.5 py-1 text-sm sm:text-base text-white">
              {tag}
            </p>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <div className="hidden sm:block h-1 w-1 rounded-full bg-neutral-600" />
            <ProgressUI question={questionTitle} />
          </div>
        </div>

        {/* Section with question and voice feature */}
        <div className="flex flex-col sm:flex-row pb-6 sm:pb-10">
          {/* Text content (hints and answers) */}
          <div className="w-full sm:w-[calc(100%-200px)] px-4 sm:px-10 lg:mt-6 sm:mt-0 order-1 sm:order-2">
            <HintAnswer urlQuestion={questionSlug} />
          </div>

          {/* Waveform SVG */}
          <div className="border-t-2 sm:border-t-0 sm:border-r-2 w-full lg:w-[200px] p-4 sm:p-8 sm:py-2 order-2 sm:order-1 mt-6 sm:mt-0 flex justify-center lg:block items-center">
            <WaveForm />
          </div>
        </div>
      </Card>
    </main>
  );
}