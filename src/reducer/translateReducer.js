/**
 * Wrap App from index.js with <TranslateContext> so that react-intl renders formatText in the selected language-locale
 * across the app.
 * */
import React, {createContext, useReducer} from "react";

export const translateReducer = (state, action) =>{
  console.log('reducer received: ', action)
  switch (action.type){
      case 'UPDATE_LOCALE':
          return {
              ...state,
              locale: action.payload.locale,
              
          }
      case 'SET_MESSAGES':
        return {
          ...state,
          messages: action.payload.messages
        }
      default:
          return state
  }
}

const DEFAULT_LOCALE = 'en-AU';

const initialState = {
    locale: DEFAULT_LOCALE,
    messages: false
}

export const TranslateProvider = ({children}) => {
    const [state, dispatch] = useReducer(translateReducer, initialState)
    return (
        <TranslateContext.Provider
            value={[state, dispatch]}>
            {children}
        </TranslateContext.Provider>
    )
}

export const TranslateContext = createContext(initialState)


