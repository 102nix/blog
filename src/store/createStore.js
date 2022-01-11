import { combineReducers, configureStore } from '@reduxjs/toolkit'
import articlesReducer from './articles'
import startInfoReducer from './startInfo'

const rootReducer = combineReducers({
  articles: articlesReducer,
  startInfo: startInfoReducer
})

export function createStore () {
  return configureStore({
    reducer: rootReducer
  })
}