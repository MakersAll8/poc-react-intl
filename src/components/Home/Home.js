import React from 'react'
import messages from './home.locale.json'
import {useIntl} from 'react-intl'
import {useTranslate} from '../../hooks/useTranslate'

export const Home = () => {
  const intl = useIntl();
  // shared stateful logic to request translated document
  useTranslate();
  
  return (
    <div>
      <h1>{intl.formatMessage(messages.welcome)}</h1>
    </div>
  );
}