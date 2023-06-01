import React from "react";
import { Link } from "react-router-dom";
import ROUTES from "../../app/routes";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const QuizTile = ({ quiz }) => {
  const history = useHistory;

  return (
    <li className="quiz">
      <Link class="quiz-link link" to={ROUTES.quizRoute(quiz.id)}>
        {quiz.name}
      </Link>
    </li>
  );
};

export default QuizTile;
