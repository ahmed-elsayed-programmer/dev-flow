import Link from "next/link";
import React from "react";

import QusetionCard from "@/components/cards/QusetionCard";
import HomeFilter from "@/components/filter/HomeFilter";
import LocalSearch from "@/components/search/LocalSearch";
import { Button } from "@/components/ui/button";
import { getQuestions } from "@/lib/actions/question.action";

interface SearchParams {
  searchParams: Promise<{ [key: string]: string }>;
}

const page = async ({ searchParams }: SearchParams) => {
  const { query, filter, page, pageSize } = await searchParams;

  const { success, data, error } = await getQuestions({
    page: Number(page) || 1,
    pageSize: Number(pageSize) || 10,
    filter: filter || "",
    query: query || "",
  });

  const { questions } = data || {};

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
      {success ? (
        <div className="mt-10 flex w-full flex-col gap-6">
          {questions && questions.length > 0 ? (
            questions.map((question) => (
              <QusetionCard key={question._id} question={question} />
            ))
          ) : (
            <div className="mt-10 flex w-full items-center justify-center">
              <p className="text-dark400_light700">No questions found</p>
            </div>
          )}
        </div>
      ) : (
        <div className="mt-10 flex w-full items-center justify-center">
          <p className="text-dark400_light700">
            {error?.message || "Failed to fetch questions"}{" "}
          </p>
        </div>
      )}
    </>
  );
};

export default page;
