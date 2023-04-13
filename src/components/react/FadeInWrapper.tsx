import type { FC, ReactNode } from 'react'
import { useInView } from 'react-intersection-observer'
import styles from './FadeInWrapper.module.css'

type FadeInWrapper = {
  children: ReactNode
}

export const FadeInWrapper: FC<FadeInWrapper> = (props) => {
  const { ref, inView } = useInView({ triggerOnce: true })
  return (
    <div ref={ref} className={inView ? styles.visible : styles.fadeInContent}>
      {props.children}
    </div>
  )
}
