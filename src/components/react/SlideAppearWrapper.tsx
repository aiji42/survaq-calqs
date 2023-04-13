import type { FC, ReactNode } from 'react'
import { useInView } from 'react-intersection-observer'
import styles from './SlideAppearWrapper.module.css'

type SlideAppearWrapper = {
  children: ReactNode
}

export const SlideAppearWrapper: FC<SlideAppearWrapper> = (props) => {
  const { ref, inView } = useInView({ triggerOnce: true })
  return (
    <div ref={ref} className={`${styles.appear} ${inView && styles.wrapper}`}>
      <div className={`${styles.appear} ${inView && styles.inner}`}>{props.children}</div>
    </div>
  )
}
