import { isNil } from 'lodash';
import { read as cookieRead } from './cookie';

export function getEnvironment() {
  if (typeof window !== 'undefined') {
    const cookieEnvVal = cookieRead('ENV');
    if (!isNil(cookieEnvVal)) {
      return cookieEnvVal;
    } else if (!isNil(window.ENV)) {
      return window.ENV;
    }
  }

  return process.env.NODE_ENV;
}
