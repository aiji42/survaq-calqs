import { useRef } from 'react'
import styles from './Hero.module.css'

export const Hero = () => {
  const videoRef = useRef<HTMLVideoElement>(null)
  const handlePlayVideo = () => videoRef.current?.play()
  setTimeout(handlePlayVideo, 3000)
  return (
    <section className={styles.root}>
      <video className={styles.img} poster="/top/calqs_top.png" muted loop playsInline ref={videoRef}>
        <source src="/top/calqs_pc.webm" type="video/webm" />
        <source src="/top/calqs_pc.mp4" type="video/mp4" />
        <source src="/top/calqs_sp.webm" type="video/webm" media="(max-width: 768px)" />
        <source src="/top/calqs_sp.mp4" type="video/mp4" media="(max-width: 768px)" />
      </video>
      <h1 className={styles.logo}>
        <img src="/top/logo_white.svg" alt="CALQS" className={styles.fadeIn} />
      </h1>
      <a className={`${styles.link} ${styles.linkBack}`} href="/products">
        <span>PRODUCTS</span>
      </a>
      <span className={styles.scroll}>
        <span>Scroll</span>
      </span>
    </section>
  )
}
