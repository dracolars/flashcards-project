import { Link } from "react-router-dom";
import ROUTES from "../../app/routes";
import { useSelector } from "react-redux";
import { selectQuizzes } from "./QuizzesSlice";
import QuizTile from "./QuizTile";

export default function Quizzes() {
  const quizzes = useSelector(selectQuizzes); // replace this with a call to your selector to get all the quizzes in state

  return (
    <section className="center">
      <h1>Quizzes</h1>
      <ul className="quizzes-list">
        {Object.values(quizzes).map((quiz) => (
          <QuizTile key={quiz.id} quiz={quiz} />
        ))}
      </ul>
      <Link to={ROUTES.newQuizRoute()} className="button">
        Create New Quiz
      </Link>
    </section>
  );
}
