import { configureStore } from "@reduxjs/toolkit";
import getAllURLS from './reducers/getAllURLS'
import newShortenURL from './reducers/newShortenURL'
import deleteShortened from './reducers/deleteShortened'

export const store = configureStore({
    reducer:{
        getAllURLS,
        newShortenURL,
        deleteShortened

    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;