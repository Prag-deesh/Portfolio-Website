import { useSyncExternalStore } from 'react'

// One shared media query; listeners fire only when crossing the 768px breakpoint
const mql = window.matchMedia('(max-width: 767px)')

const subscribe = (onChange: () => void) => {
  mql.addEventListener('change', onChange)
  return () => mql.removeEventListener('change', onChange)
}

export const useIsMobile = () => useSyncExternalStore(subscribe, () => mql.matches)
