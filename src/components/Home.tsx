import { BannerCarousel } from './BannerCarousel'
import { AppleCardsCarouselDemo } from './CardCarousel'
import { AjioHeroCarousel } from './FullCarousel'
import ProductCarousel from './ProductCarousel'
import CarouselPreview from './CategoryPreview'
import ProductList from './ProductList'


const Home = () => {
  return (
    <div>
        <AjioHeroCarousel />
        <BannerCarousel />
        <AjioHeroCarousel />
        <BannerCarousel />
        <AppleCardsCarouselDemo />
        <CarouselPreview /> 
        <ProductCarousel />
        <AjioHeroCarousel />
        <AjioHeroCarousel />
        <BannerCarousel />
        <ProductList category="electronics" />
    </div>
  )
}

export default Home