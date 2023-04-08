import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import styles from './styles.module.css'

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: true,
}

export const Carousel = () => {
  return (
    <Slider {...settings}>
      <div>
        <img src="/product/product_1.png" className={styles.carousel_img} />
      </div>
      <div>
        <img src="/product/product_2.png" className={styles.carousel_img} />
      </div>
      <div>
        <img src="/product/product_1.png" className={styles.carousel_img} />
      </div>
      <div>
        <img src="/product/product_2.png" className={styles.carousel_img} />
      </div>
    </Slider>
  )
}
