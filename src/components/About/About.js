import React from 'react'
import messages from './about.locale.json'
import {FormattedMessage} from 'react-intl'
import {useTranslate} from '../../hooks/useTranslate'

// this component demonstrates another way of using FormattedMessage
export const About = () => {
  // shared stateful logic to request translated document
  useTranslate();

  return (
    <div>
      <h1><FormattedMessage {...messages.welcome}/></h1>
    </div>
  );
}