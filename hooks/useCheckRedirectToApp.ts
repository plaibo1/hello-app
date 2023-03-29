import { useEffect } from 'react';
import { isDesktop } from 'react-device-detect';

export const useCheckRedirectToApp = ({ prevPath } : { prevPath: string }) => {
  useEffect(() => {
    if (prevPath.includes("business") ||  prevPath.includes("personal")) {
      if (!isDesktop) {
        window.location.href = `hello://hellomobile.app${prevPath}`;
      }
    }
  }, [])

  return null;
}
