import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import styles from './Carousel.module.css'
import './Carousel.css'
import type { FC } from 'react'
import type { products } from '../../constants/products'

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: true,
}

type CarouselProps = {
  images: (typeof products)[number]['thumbnail']
  title: string
}

export const Carousel: FC<CarouselProps> = ({ images, title }) => {
  return (
    <div className={styles.carousel}>
      <Slider {...settings}>
        {images.map((image, index) => (
          <div key={image}>
            <img src={image} alt={title} className={styles.carousel_img} loading={index > 0 ? 'lazy' : 'eager'} />
          </div>
        ))}
      </Slider>
    </div>
  )
}
