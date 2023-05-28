import { createSlice } from "@reduxjs/toolkit";

const options = {
  name: "topics",
  initialState: {
    topics: {}
  },
  reducers: {
    addTopic: (state, action) => {
      let newTopic = action.payload;
      newTopic.quizIds = [];
      state.topics[action.payload.id] = newTopic;
    },
    addQuizId: (state, action) => {
      let newQuiz = action.payload;
      state.topics[newQuiz.topicId].quizIds.push(newQuiz.quizId);
    }
  }
};

export const topicsSlice = createSlice(options);
export const { addTopic, addQuizId } = topicsSlice.actions;
export const selectTopics = (state) => state.topics.topics;
