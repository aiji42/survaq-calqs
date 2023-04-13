import { useInView } from 'react-intersection-observer'
import styles from './ConceptText.module.css'

export const ConceptText = () => {
  const { ref, inView } = useInView({ triggerOnce: true, rootMargin: '-100px' })
  return (
    <h2 ref={ref} className={`${styles.concept} ${inView && styles.concept_visible}`}>
      <span className={`${styles.concept_text} ${inView && styles.concept_visible}`}>カ</span>
      <span className={`${styles.concept_text} ${inView && styles.concept_visible} ${styles.delay_02}`}>ラ</span>
      <span className={`${styles.concept_text} ${inView && styles.concept_visible} ${styles.delay_03}`}>ダ</span>
      <span className={`${styles.concept_text} ${inView && styles.concept_visible} ${styles.delay_04}`}>を</span>
      <span className={`${styles.concept_text} ${inView && styles.concept_visible} ${styles.delay_05}`}>軽</span>
      <span className={`${styles.concept_text} ${inView && styles.concept_visible} ${styles.delay_02}`}>く</span>
      <span className={`${styles.concept_text} ${inView && styles.concept_visible} ${styles.delay_03}`}>、</span>
      <br />
      <span className={`${styles.concept_text} ${inView && styles.concept_visible} ${styles.delay_04}`}>コ</span>
      <span className={`${styles.concept_text} ${inView && styles.concept_visible} ${styles.delay_05}`}>コ</span>
      <span className={`${styles.concept_text} ${inView && styles.concept_visible} ${styles.delay_02}`}>ロ</span>
      <span className={`${styles.concept_text} ${inView && styles.concept_visible} ${styles.delay_03}`}>も</span>
      <span className={`${styles.concept_text} ${inView && styles.concept_visible} ${styles.delay_04}`}>軽</span>
      <span className={`${styles.concept_text} ${inView && styles.concept_visible} ${styles.delay_05}`}>く。</span>
    </h2>
  )
}
