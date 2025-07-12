import { BannerCarousel } from './BannerCarousel'
import { AppleCardsCarouselDemo } from './CardCarousel'
import { AjioHeroCarousel } from './FullCarousel'
import ProductCarousel from './ProductCarousel'
import CarouselPreview from './CategoryPreview'
import ProductList from './ProductList'
import { fetchProducts } from '@/store/productsSlice'
import { useDispatch } from 'react-redux'
import type { AppDispatch } from '@/store'
import { useEffect } from 'react'



const Home = () => {

  const dispatch = useDispatch<AppDispatch>()
  useEffect(() => {
    dispatch(fetchProducts())
  }, [dispatch])



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