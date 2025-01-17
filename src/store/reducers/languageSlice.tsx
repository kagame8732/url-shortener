import { createSlice } from '@reduxjs/toolkit';
import EngLog from '../../assets/flags/eng.svg';

const languageSlice = createSlice({
  name: 'language',
  initialState: {
    lang: {
      name: 'En',
      code: 'en',
      flag: EngLog,
    },
  },
  reducers: {
    //Helps to keep selected languages even if page refleshed
    setLanguage: (state, action) => {
      state.lang = action.payload;
      localStorage.setItem('currentLng', JSON.stringify(action.payload));
    },
  },
});

export const { setLanguage } = languageSlice.actions;
export default languageSlice.reducer;
