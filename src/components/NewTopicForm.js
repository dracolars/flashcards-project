import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import ROUTES from "../app/routes";
import { ALL_ICONS } from "../data/icons";
import { addTopic } from "../features/topics/TopicsSlice";
import { useDispatch } from "react-redux";

export default function NewTopicForm() {
  const [name, setName] = useState("");
  const [icon, setIcon] = useState("");
  const history = useHistory();
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.length === 0) {
      return;
    }

    dispatch(addTopic({ id: uuidv4(), name: name, icon: icon }));
    history.push(ROUTES.topicsRoute());
  };

  return (
    <section>
      <h1>Create a new topic</h1>
      <form onSubmit={handleSubmit}>
        <div className="quiz-meta-container">
          <div className="quiz-title-container">
            <span className="input-label">Topic</span>
            <input
              id="topic-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.currentTarget.value)}
              placeholder="Topic Name"
            />
          </div>
        </div>
        <div className="form-section topic-form-section">
          <select
            onChange={(e) => setIcon(e.currentTarget.value)}
            required
            defaultValue="default"
          >
            <option value="default" disabled hidden>
              Choose an icon
            </option>
            {ALL_ICONS.map(({ name, url }) => (
              <option key={url} value={url}>
                {name}
              </option>
            ))}
          </select>
        </div>
        <button>Add Topic</button>
      </form>
    </section>
  );
}
