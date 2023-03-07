import { createSlice, nanoid } from '@reduxjs/toolkit';

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: [],
  reducers: {
    contactAdd: {
      reducer(state, action) {
        return [...state, action.payload];
      },
      prepare(text) {
        return {
          payload: {
            name: text.name,
            number: text.number,
            id: nanoid(),
          },
        };
      },
    },
    contactDelete(state, action) {
      return state.filter(task => task.id !== action.payload);
    },
  },
});

export const { contactAdd, contactDelete } = contactsSlice.actions;

export default contactsSlice.reducer;
