export const loadLocaleData = (locale) => {
  switch (locale) {
      case 'zh-CN':
          return import('../compiled-lang/zh-CN.json')
      case 'pl-US':
         return import('../compiled-lang/pl-US.json')
      default:
          // return the compiled fallback json so that react-intl does not need to search key at runtime
          return import('../compiled-lang/en-AU.json')
          // do I really want to follow the doc? seems like a waste to request en-AU.json file when you already have
          // fallback message json loaded in each component
          // return new Promise(resolve => resolve(false))
  }
}
