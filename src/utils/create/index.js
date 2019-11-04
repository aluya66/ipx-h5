/* eslint-disable no-param-reassign */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
/**
 * Create a component with common options
 */
// import CIcon from 'components/c-icon';
// import CLoading from 'components/c-loading';
import createBasic from './basic'

export default function (cm) {
  cm.components = Object.assign(cm.components || {}, {
    // CIcon,
    // CLoading
  })
  return createBasic(cm)
}
