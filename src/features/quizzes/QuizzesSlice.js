import { createSlice } from "@reduxjs/toolkit";
import { addQuizId } from "../topics/TopicsSlice";

const options = {
  name: "quizzes",
  initialState: {
    quizzes: {}
  },
  reducers: {
    addQuiz: (state, action) => {
      let newQuiz = action.payload;
      state.quizzes[newQuiz.id] = newQuiz;
    },
    removeQuiz: (state, action) => {
      let updatedQuizState = state.filter();
    }
  }
};

export const quizzesSlice = createSlice(options);
export const { addQuiz } = quizzesSlice.actions;
export const selectQuizzes = (state) => state.quizzes.quizzes;

export const createQuizThunk = (args) => {
  return (dispatch) => {
    // args are: {id: , name: , topicId: , cards: }
    // addQuiz needs all args
    dispatch(quizzesSlice.actions.addQuiz(args));
    // addQuizId needs only {quizId:, topicId:}
    dispatch(addQuizId({ quizId: args.id, topicId: args.topicId }));
  };
};
