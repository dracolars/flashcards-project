import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import ROUTES from "../app/routes";
import { useDispatch, useSelector } from "react-redux";
import { selectTopics } from "../features/topics/TopicsSlice";
import { createQuizThunk } from "../features/quizzes/QuizzesSlice";
import { addCard } from "../features/cards/CardsSlice";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function NewQuizForm() {
  const [name, setName] = useState("");
  const [cards, setCards] = useState([]);
  const [topicId, setTopicId] = useState("");
  const [descr, setDescr] = useState("");
  const history = useHistory();
  const topics = useSelector(selectTopics);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.length === 0 || topicId === "") {
      return;
    }

    const cardIds = [];

    // create the new cards here and add each card's id to cardIds
    cards.map((card) => {
      let cardId = uuidv4();
      cardIds.push(cardId);
      dispatch(addCard({ id: cardId, front: card.front, back: card.back }));
    });

    // create the new quiz here
    dispatch(
      createQuizThunk({
        id: uuidv4(),
        name: name,
        topicId: topicId,
        cardIds: cardIds,
      })
    );
    history.push(ROUTES.quizzesRoute());
  };

  const addCardInputs = (e) => {
    e.preventDefault();
    setCards(cards.concat({ front: "", back: "" }));
  };

  const removeCard = (e, index) => {
    e.preventDefault();
    setCards(cards.filter((card, i) => index !== i));
  };

  const updateCardState = (index, side, value) => {
    const newCards = cards.slice();
    newCards[index][side] = value;
    setCards(newCards);
  };

  return (
    <section>
      <h1>Create a new quiz</h1>
      <form onSubmit={handleSubmit}>
        <div className="quiz-meta-container">
          <div className="quiz-title-container">
            <span className="input-label">Title</span>
            <input
              id="quiz-name"
              value={name}
              onChange={(e) => setName(e.currentTarget.value)}
              placeholder="Quiz Title"
            />
          </div>
          <div className="quiz-desc-container">
            <input
              id="quiz-description"
              value={descr}
              onChange={(e) => setDescr(e.currentTarget.value)}
              placeholder="Description"
            />
            <select
              id="quiz-topic"
              onChange={(e) => setTopicId(e.currentTarget.value)}
              placeholder="Select Topic"
            >
              <option value="">Select Topic</option>
              {Object.values(topics).map((topic) => (
                <option key={topic.id} value={topic.id}>
                  {topic.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        {cards.map((card, index) => (
          <div key={index} className="card-front-back">
            <div className="card-actions">
              <div className="card-index">
                <p>{index + 1}</p>
              </div>
              <div className="card-remove">
                <FontAwesomeIcon
                  onClick={(e) => removeCard(e, index)}
                  icon={("fas", faTrash)}
                />
              </div>
            </div>
            <div className="card-contents">
              <input
                id={`card-front-${index}`}
                value={cards[index].front}
                onChange={(e) =>
                  updateCardState(index, "front", e.currentTarget.value)
                }
                placeholder="Front"
              />

              <input
                id={`card-back-${index}`}
                value={cards[index].back}
                onChange={(e) =>
                  updateCardState(index, "back", e.currentTarget.value)
                }
                placeholder="Back"
              />
            </div>
          </div>
        ))}
        <div className="add-card" onClick={addCardInputs}>
          <p>Add a Card</p>
        </div>
        <div className="actions-container lower-save">
          {cards.length > 0 && <button className="save-quiz">Save Quiz</button>}
        </div>
      </form>
    </section>
  );
}
