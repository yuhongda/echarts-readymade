import { setter } from 'mobx-value'

export const theme = setter<'light' | 'dark'>({
  value: 'light',
  autoRestoreOnBecomeUnobserved: true,
})
