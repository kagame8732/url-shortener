import { configureStore } from "@reduxjs/toolkit";
import getAllURLS from './reducers/getAllURLS'
import newShortenURL from './reducers/newShortenURL'
import deleteShortened from './reducers/deleteShortened'
import editShortened from './reducers/editShortenUrl'
import addShortenerUrl from './reducers/addShortenerUrl'
import switchSides from './reducers/switchSides'

export const store = configureStore({
    reducer:{
        getAllURLS,
        newShortenURL,
        deleteShortened,
        editShortened,
        addShortenerUrl,
        switchSides

    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;