import { createSlice } from "@reduxjs/toolkit";

const options = {
  name: "cards",
  initialState: {
    cards: {}
  },
  reducers: {
    addCard: (state, action) => {
      let newCard = action.payload;
      state.cards[newCard.id] = newCard;
    }
  }
  //extra reducers
};

export const cardsSlice = createSlice(options);
export const { addCard } = cardsSlice.actions;
export const selectCards = (state) => state.cards.cards;
