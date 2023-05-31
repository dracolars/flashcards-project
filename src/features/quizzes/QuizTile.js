import React from "react";
import { Link } from "react-router-dom";
import ROUTES from "../../app/routes";

const QuizTile = ({ quiz }) => {
  return (
    <Link to={ROUTES.quizRoute(quiz.id)}>
      <li className="quiz">{quiz.name}</li>
    </Link>
  );
};

export default QuizTile;
