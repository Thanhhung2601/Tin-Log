import { configureStore, combineReducers } from '@reduxjs/toolkit'
import userReducer from './slices/userSlice'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const persistConfig = {
    key: 'UserPersit',
    storage,
    whitelist: ['userInfo'],
}

const rootReducer = combineReducers({
    userInfo: userReducer,
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
})

export default store
export const persitor = persistStore(store)
