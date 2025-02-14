
'use client';

import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { fetchCompletionQuestions } from "@/app/lib";

function EncodeName(sentence: string) {
  return sentence.toLowerCase().replace(/ /g, '-');
}

function DecodeName(encodedSentence: string) {
  return encodedSentence.split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

export  function QuestionBankCard({ firm, questions }: { firm: string; questions: any[] }) {
  const { data: session } : { data: any } = useSession();
  const [completedQuestions, setCompletedQuestions] = useState<any[]>([]);

  useEffect(() => {
    const fetchCompletedQuestions = async () => {
      if (!session) return;
      try {
        const userId = session.user.email; // Assuming email is your unique user ID
        const completed = await fetchCompletionQuestions(userId);
        setCompletedQuestions(completed);
      } catch (error) {
        console.error('Error fetching completed questions:', error);
      }
    };
  
    fetchCompletedQuestions();
  }, [session]);

  return (
    <Card className="w-[80vw] ">
      <CardContent>
        <div className="flex flex-row mb-2 my-10 lg:my-12 lg:px-20 justify-between items-center">
          <Link 
            href={`/`}
            className="flex flex-row items-center">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="h-8 stroke-2">
              <path fillRule="evenodd" d="M7.28 7.72a.75.75 0 010 1.06l-2.47 2.47H21a.75.75 0 010 1.5H4.81l2.47 2.47a.75.75 0 11-1.06 1.06l-3.75-3.75a.75.75 0 010-1.06l3.75-3.75a.75.75 0 011.06 0z" clipRule="evenodd"></path>
            </svg>
            <p className="ml-2 text-lg">All Firms</p>
          </Link>

        </div>

        <h1 className="text-3xl font-bold text-gray-900 text-center flex-grow mt-8 mb-10 lg:mb-16">
          {DecodeName(firm)} Interview Questions
        </h1>

        <div className="flex flex-row flex-wrap gap-6 lg:px-20 mb-10">
          {questions.map((question, index) => (
            <Link
              href={`/${firm}/${EncodeName(question)}`}
              key={index}
              className={`hover:underline ${
                completedQuestions.includes(question) ? 'text-blue-600' : ''
              }`}
            >
              {question}
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}