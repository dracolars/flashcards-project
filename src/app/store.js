import { configureStore } from "@reduxjs/toolkit";
import { topicsSlice } from "../features/topics/TopicsSlice";
import { quizzesSlice } from "../features/quizzes/QuizzesSlice";
import { cardsSlice } from "../features/cards/CardsSlice";

export default configureStore({
  reducer: {
    topics: topicsSlice.reducer,
    quizzes: quizzesSlice.reducer,
    cards: cardsSlice.reducer,
  },
});
