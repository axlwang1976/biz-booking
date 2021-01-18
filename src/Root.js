import React, { useState, useRef } from 'react';
import { IntlProvider } from 'react-intl';
import { DndProvider, createDndContext } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import App from './App';
import en from './i18n/en';
import tw from './i18n/tw';

const Root = () => {
  const [locale, setLocale] = useState(navigator.language);
  const RNDContext = createDndContext(HTML5Backend);
  const manager = useRef(RNDContext);
  let messages;

  if (locale.includes('zh')) {
    messages = tw;
  } else if (locale.includes('en')) {
    messages = en;
  }

  return (
    <IntlProvider
      locale={locale}
      key={locale}
      defaultLocale="en"
      messages={messages}
    >
      <DndProvider manager={manager.current.dragDropManager}>
        <App setLocale={setLocale} locale={locale} messages={messages} />
      </DndProvider>
    </IntlProvider>
  );
};

export default Root;
