import Link from "next/link";
import React from "react";

import QusetionCard from "@/components/cards/QusetionCard";
import HomeFilter from "@/components/filter/HomeFilter";
import LocalSearch from "@/components/search/LocalSearch";
import { Button } from "@/components/ui/button";

const questions: Question[] = [];

interface SearchParams {
  searchParams: Promise<{ [key: string]: string }>;
}

const page = async ({ searchParams }: SearchParams) => {
  const { query = "", filter = "" } = await searchParams;

  const filteredQuestions = questions.filter((question) => {
    const matchesQuery = question.title
      .toLowerCase()
      .includes(query.toLowerCase());
    const matchesFilter = filter
      ? question.tags[0].name.toLowerCase() === filter.toLowerCase()
      : true;
    return matchesQuery && matchesFilter;
  });
  return (
    <>
      <section className="flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="h1-bold text-dark100_light900">All Questions</h1>
        <Button
          className="primary-gradient min-h-[46px] px-4 py-3 !text-light-900"
          asChild
        >
          <Link href={"/ask-question"}>Ask a question</Link>
        </Button>
      </section>

      <LocalSearch
        placeholder="Search..."
        imgSrc="/icons/search.svg"
        route="any"
        otherClass=""
      />
      <HomeFilter />
      <div className="mt-10 flex w-full flex-col gap-6">
        {filteredQuestions.map((question) => (
          <QusetionCard key={question._id} question={question} />
        ))}
      </div>
    </>
  );
};

export default page;
