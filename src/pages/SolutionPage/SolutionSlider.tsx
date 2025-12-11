import type { MajorImprovement } from '@/types/Solution.types'
import Slider from 'react-slick'
import lightningImg from '../../assets/icons/lightning.svg'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

// Props 선언
interface SolutionSliderProps {
  data: MajorImprovement[] | null
}

// ! 개선방안->  기대효과 슬라이더
const SolutionSlider: React.FC<SolutionSliderProps> = ({ data }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
  }

  return (
    <div className="slider-container mx-[1%] h-[230px] w-full">
      <Slider {...settings}>
        {data?.map((item) => (
          <article
            key={item.description}
            className="box-border flex h-[225px] max-w-[95%] flex-1 flex-col rounded-[15px] bg-white p-10 shadow-md"
          >
            <div className="box-border flex h-[33px] w-[33px] items-center justify-center rounded-full bg-[#3B82F6]">
              <img src={lightningImg} alt="번개" />
            </div>
            <div className="mt-2 pl-3 text-[21px] font-bold text-[#4B4B4B]">
              <span className="text-[#3B82F6]">{item.metric}</span> {item.title}
            </div>
            <div className="mt-2 pl-3 text-[21px] font-bold text-[#707071]">{item.description}</div>
          </article>
        ))}
      </Slider>
    </div>
  )
}

export default SolutionSlider
