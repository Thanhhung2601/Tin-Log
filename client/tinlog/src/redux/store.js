import { configureStore, combineReducers } from '@reduxjs/toolkit'
import userReducer from './slices/userSlice'
import communityReducer from './slices/communitySilce'
import conversationReducer from './slices/conversationSlice'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const persistConfig = {
    key: 'UserPersit',
    storage,
    whitelist: ['userInfo'],
}

const rootReducer = combineReducers({
    userInfo: userReducer,
    community: communityReducer,
    conversation: conversationReducer,
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
