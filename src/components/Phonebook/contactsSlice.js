import { createSlice, nanoid } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

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

const persistConfig = {
  key: 'root',
  storage,
};

export const contactsPersistedReducer = persistReducer(
  persistConfig,
  contactsSlice.reducer
);

export const { contactAdd, contactDelete } = contactsSlice.actions;

//Selectors
export const getContacts = state => state.contacts;
export const getFilter = state => state.filter;
