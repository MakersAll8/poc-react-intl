import React from 'react';
import {TranslateProvider} from '../reducer/translateReducer';

export const withTranslate = WrappedComponent => {
  return props => (
    <TranslateProvider>
      <WrappedComponent {...props} />
    </TranslateProvider>
  );
};
