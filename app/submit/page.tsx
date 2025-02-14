"use client"

import { useState } from "react";
import Link from "next/link";
import { SendQuestion } from "../lib";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const firmOptions = [
    "Akuna Capital",
    "Belvedere Trading",
    "Citadel",
    "DRW",
    "Five Rings",
    "Goldman Sachs",
    "Hudson River Trading",
    "IMC",
    "Jane Street",
    "Old Mission",
    "Optiver",
    "SIG",
    "Squarepoint Capital",
    "TransMarket Group",
    "Two Sigma",
    "WorldQuant",
    "Other"
  ]

export default function Page() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [question, setQuestion] = useState("");
  const [selectedFirm, setSelectedFirm] = useState("");

  async function handleSubmit(e: any) {
    e.preventDefault();
    if (!selectedFirm) {
      alert("Please select a firm before submitting.");
      return;
    }
    try {
      const sentSuccessfully = await SendQuestion(question, selectedFirm);
      if (sentSuccessfully) {
        setIsSubmitted(true)
      } else {
        alert("Failed to send the question. Please try again.");
      }
    } catch (error) {
      console.error("Error sending question:", error);
    }
  }

  if (isSubmitted) {
    return (
      <div className="flex flex-col items-center justify-center my-36 lg:my-52  px-10 lg:px-4">
        <div className="w-full max-w-md space-y-8 text-center">
          <h1 className="text-2xl lg:text-3xl font-bold">Thank You!</h1>
          <p className="text-gray-600">
            Your question has been received. We&apos;ll review it and add it to our collection soon! </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 items-center">
            <Button asChild className="bg-slate-700 text-neutral-300 hover:bg-gray-600 lg:w-52 w-40">
              <Link href="/">Back To Questions</Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center my-36 lg:my-52 px-10 lg:px-4 ">
      <form onSubmit={handleSubmit} className="w-full max-w-md space-y-6">
        <h1 className="text-2xl lg:text-3xl font-bold text-center">Submit Question</h1>
        <Textarea
          placeholder="Enter your question here"
          className="resize-none"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          required
        />
        <Select onValueChange={setSelectedFirm}>
          <SelectTrigger>
            <SelectValue placeholder="Select a firm" />
          </SelectTrigger>
          <SelectContent>
            {firmOptions.map((firm) => (
              <SelectItem key={firm} value={firm}>
                {firm}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button type="submit" className="w-full bg-slate-700 text-neutral-300 hover:bg-gray-600">
          Submit Question
        </Button>
      </form>
    </div>
  );
}