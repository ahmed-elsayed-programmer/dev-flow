import React from "react";

const QuestionPage = async ({ params }: RouteParams) => {
  const { id } = await params;
  return <div>QuestionPage : {id}</div>;
};

export default QuestionPage;
