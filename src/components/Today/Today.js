import React from 'react'
import { useIntl } from "react-intl"
import messages from './today.locale.json'
import {useTranslate} from '../../hooks/useTranslate'


export const Today = () => {
  const intl = useIntl()
  // shared stateful logic to request translated document
  useTranslate()

  // demonstrates dynamic message
  return (
    <div>
      <p>{intl.formatMessage(messages.today, {ts: Date.now()})}</p>
    </div>
  )
}