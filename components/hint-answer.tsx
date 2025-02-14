"use client"

import { useState, useEffect } from "react"
import { MDXRemote, type MDXRemoteSerializeResult } from "next-mdx-remote"
import { serialize } from "next-mdx-remote/serialize"
import remarkMath from "remark-math"
import rehypeKatex from "rehype-katex"
import remarkGfm from "remark-gfm"
import type { CompileOptions } from "@mdx-js/mdx"


function DecodeName(encodedSentence: string) {
  return encodedSentence.split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

interface Props {
  urlQuestion: string
}

export default function HintAnswer({ urlQuestion }: Props) {
  const [questionMdx, setQuestionMdx] = useState<MDXRemoteSerializeResult | null>(null)
  const [hintMdx, setHintMdx] = useState<MDXRemoteSerializeResult | null>(null)
  const [answerMdx, setAnswerMdx] = useState<MDXRemoteSerializeResult | null>(null)
  const [showHint, setShowHint] = useState(false)
  const [showAnswer, setShowAnswer] = useState(false)

  const question = DecodeName(urlQuestion)

  useEffect(() => {
    async function fetchAndSerializeMdx() {
      try {
        const res = await fetch(`/questions/${question}.json`)
        if (!res.ok) {
          throw new Error("Failed to fetch problem data.")
        }

        const jsonData = await res.json()
        const { "problem text": questionText, "problem hint": hintText, "problem solution": answerText } = jsonData

        const mdxOptions: Omit<CompileOptions, "outputFormat" | "providerImportSource"> = {
          remarkPlugins: [remarkMath, remarkGfm],
          rehypePlugins: [rehypeKatex],
          format: "mdx" as const,
        }

        const serializedQuestion = await serialize(questionText, { mdxOptions })
        const serializedHint = hintText ? await serialize(hintText, { mdxOptions }) : null
        const serializedAnswer = answerText ? await serialize(answerText, { mdxOptions }) : null

        setQuestionMdx(serializedQuestion)
        setHintMdx(serializedHint)
        setAnswerMdx(serializedAnswer)
      } catch (error) {
        console.error(error)
      }
    }

    fetchAndSerializeMdx()
  }, [question])

  const handleClickHint = () => setShowHint(!showHint)
  const handleClickAnswer = () => setShowAnswer(!showAnswer)

  if (!questionMdx) {
    return <div>Loading...</div>
  }

  return (
    <div className="max-w-4xl mx-auto px-4">
      <div className="mt-8 prose prose-sm sm:prose lg:prose-lg xl:prose-xl max-w-none">
        <MDXRemote {...questionMdx} />
      </div>

      {hintMdx && (
        <div className="mt-6">
          <button
            onClick={handleClickHint}
            className="flex items-center justify-center space-x-2 text-blue-600 hover:text-blue-800"
          >
            <span>Hint</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className={`w-4 h-4 transition-transform ${showHint ? "rotate-90" : ""}`}
            >
              <path
                fillRule="evenodd"
                d="M16.28 11.47a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 01-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 011.06-1.06l7.5 7.5z"
                clipRule="evenodd"
              />
            </svg>
          </button>

          {showHint && (
            <div className="mt-4 p-4 border-2 border-gray-300 rounded-xl prose prose-sm sm:prose lg:prose-lg xl:prose-xl max-w-none">
              <MDXRemote {...hintMdx} />
            </div>
          )}
        </div>
      )}

      {answerMdx && (
        <div className="mt-6">
          <button
            onClick={handleClickAnswer}
            className="flex items-center justify-center space-x-2 text-blue-600 hover:text-blue-800"
          >
            <span>Answer</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className={`w-4 h-4 transition-transform ${showAnswer ? "rotate-90" : ""}`}
            >
              <path
                fillRule="evenodd"
                d="M16.28 11.47a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 01-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 011.06-1.06l7.5 7.5z"
                clipRule="evenodd"
              />
            </svg>
          </button>

          {showAnswer && (
            <div className="mt-4 p-4 border-2 border-gray-300 rounded-xl prose prose-sm sm:prose lg:prose-lg xl:prose-xl max-w-none">
              <MDXRemote {...answerMdx} />
            </div>
          )}
        </div>
      )}
    </div>
  )
}

