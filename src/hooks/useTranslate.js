import {useContext, useEffect} from 'react'
import {TranslateContext} from '../reducer/translateReducer'
import {loadLocaleData} from '../api/mockApi'

export const useTranslate = () => {
  const [state, dispatch] = useContext(TranslateContext)

  useEffect(()=>{
    // this is the mock up api to get translated messages
    // theoretically, we can load only messages needed by passing in locale and message ids
    const getMessages = async ()=>{
      const res = await loadLocaleData(state.locale);
      if (res && res.default) dispatch({type:'SET_MESSAGES', payload:{messages: res.default}})
    };
    getMessages()
  }, [dispatch, state.locale])


}