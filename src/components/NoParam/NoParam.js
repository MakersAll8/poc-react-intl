import React from 'react'
import { useIntl } from "react-intl"
import messages from './noparam.locale.json'
import {useTranslate} from '../../hooks/useTranslate'

export const NoParam = () => {
  const intl = useIntl()
  // shared stateful logic to request translated document
  useTranslate()

  return (
    <div>
      <p>{intl.formatMessage(messages.noParam, 
          {
            param: intl.formatMessage(messages.debtorAccount),
            bold: str => <b>{str}</b>
          })}</p>

      <p>{intl.formatMessage(messages.noParam, 
          {
            param: intl.formatMessage(messages.glAccount),
            bold: str => <b>{str}</b>
          })}</p>
    </div>
  )
}