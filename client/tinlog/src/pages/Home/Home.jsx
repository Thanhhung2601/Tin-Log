import React from 'react'
import styles from './Home.module.scss'
import classNames from 'classnames/bind'
import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import audio from '../../audio/MSTrim.mp3'
import video1 from '../../video/Video1.mp4'
import video2 from '../../video/video2.mp4'
import video3 from '../../video/Video3.mp4'
import video4 from '../../video/Video4.mp4'
import video5 from '../../video/videoFooter_Trim.mp4'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/effect-fade'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/free-mode'
import SwiperCore, {
    EffectFade,
    Navigation,
    Pagination,
    FreeMode,
} from 'swiper'
import hungAva from '../../images/hung.jpg'
import datAva from '../../images/dat.jpg'
import kietAva from '../../images/kiet.jpg'
import kiet2Ava from '../../images/kiet2.jpg'
import tigerAva from '../../images/tiger.jpg'
import khoaAva from '../../images/khoa.png'
import AOS from 'aos'
import 'aos/dist/aos.css'
AOS.init()
SwiperCore.use([Navigation])
const cx = classNames.bind(styles)

const Home = () => {
    const [y, setY] = useState(0)
    const [hiddenHeader, setHiddenHeader] = useState(false)
    const navigate = useNavigate()
    const { userInfo } = useSelector((state) => state)
    const navigationPrevRef = useRef(null)
    const navigationNextRef = useRef(null)
    const audioRef = useRef()

    console.log(userInfo)

    const handleNavigation = (e) => {
        const window = e.currentTarget
        if (y > window.scrollY) {
            setHiddenHeader(false)
        } else if (y < window.scrollY) {
            setHiddenHeader(true)
        }
        setY(window.scrollY)
    }

    useEffect(() => {
        window.scroll({ top: 0, behavior: 'smooth' })
        if (userInfo.user) {
            navigate('/app')
        }
    }, [])

    useEffect(() => {
        window.addEventListener('scroll', (e) => handleNavigation(e))

        return () => {
            // return a cleanup function to unregister our function since its gonna run multiple times
            window.removeEventListener('scroll', (e) => handleNavigation(e))
        }
    }, [y])

    return (
        <div className={cx('homePage')}>
            <audio loop ref={audioRef}>
                <source
                    src="/static/media/MSTrim.8565822d9d65c6816b6a.mp3"
                    type="audio/mpeg"
                />
            </audio>
            <div
                className={cx('header', 'container', {
                    hiddenHeader,
                })}
            >
                <div
                    className={cx('text')}
                    onClick={() => navigate('/login-register')}
                >
                    <p>Kết nối với chúng tôi</p>
                </div>
                <div
                    className={cx('logo')}
                    onClick={() => {
                        window.scroll({ top: 0, behavior: 'smooth' })
                        audioRef.current.play()
                    }}
                >
                    <p>Tin-log</p>
                </div>
            </div>
            <div className={cx('banner-video')}>
                <Swiper
                    navigation={{
                        // Both prevEl & nextEl are null at render so this does not work
                        prevEl: navigationPrevRef.current,
                        nextEl: navigationNextRef.current,
                    }}
                    onInit={(swiper) => {
                        swiper.params.navigation.prevEl =
                            navigationPrevRef.current
                        swiper.params.navigation.nextEl =
                            navigationNextRef.current
                        swiper.navigation.init()
                        swiper.navigation.update()
                    }}
                    effect={'fade'}
                    modules={[EffectFade]}
                    className={cx('custom')}
                >
                    <SwiperSlide>
                        <div className={cx('item')}>
                            <video src={video1} autoPlay loop muted></video>
                            <div className={cx('item-desc')}>
                                <div className={cx('desc-inner')}>
                                    <div className={cx('left')}>
                                        <p>/ 01</p>
                                    </div>
                                    <div className={cx('right')}>
                                        <p>/ Kết nối với mọi người khắp nơi</p>
                                        <h1>
                                            Vượt ra ngoài thiết đặt khoảng cách
                                            của bạn và chat với mọi người
                                        </h1>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className={cx('item')}>
                            <video src={video2} autoPlay loop muted></video>
                            <div className={cx('item-desc')}>
                                <div className={cx('desc-inner')}>
                                    <div className={cx('left')}>
                                        <p>/ 02</p>
                                    </div>
                                    <div className={cx('right')}>
                                        <p>
                                            / Kết nối tương hợp ngay trong tầm
                                            tay bạn
                                        </p>
                                        <h1>
                                            Gặp gỡ mọi người trên mạng là cả một
                                            hành trình, thứ bạn muốn chính là
                                            "ai đó" đáng tin cậy cùng bạn đồng
                                            hành trong suốt hành trình ấy.
                                        </h1>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>

                    <SwiperSlide>
                        <div className={cx('item')}>
                            <video src={video4} autoPlay loop muted />
                            <div className={cx('item-desc')}>
                                <div className={cx('desc-inner')}>
                                    <div className={cx('left')}>
                                        <p>/ 03</p>
                                    </div>
                                    <div className={cx('right')}>
                                        <p>/ Khám phá các sở thích của bạn</p>
                                        <h1>
                                            Thật dễ dàng trò chuyện với bạn
                                            tương hợp khi biết rằng hai bên có
                                            chung một vài sở thích.
                                        </h1>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>

                    <SwiperSlide>
                        <div className={cx('item')}>
                            <video src={video3} autoPlay loop muted></video>
                            <div className={cx('item-desc')}>
                                <div className={cx('desc-inner')}>
                                    <div className={cx('left')}>
                                        <p>/ 04</p>
                                    </div>
                                    <div className={cx('right')}>
                                        <p>/ Hẹn hò thôi quý zị </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                    <div className={cx('swiperLeft')} ref={navigationPrevRef}>
                        Prev
                    </div>
                    <div className={cx('swiperRight')} ref={navigationNextRef}>
                        Next
                    </div>
                </Swiper>
            </div>
            <div className={cx('community')}>
                <div className={cx('community-inner', 'container')}>
                    <div
                        data-aos="fade-in"
                        data-aos-once="false"
                        data-aos-delay="100"
                        data-aos-duration="2000"
                    >
                        <div className={cx('hashTag')}>
                            <p>/ Cộng Đồng</p>
                        </div>
                        <div className={cx('title')}>
                            <h1>
                                Hãy tạo một hồ sơ thật "xịn" để gây ấn tượng với
                                "người ấy" đi nào .
                            </h1>
                        </div>
                        <div className={cx('desc')}>
                            <p>
                                Sẽ luôn có điều gì đó phù hợp cho mọi người trên
                                Tin-log. Bạn muốn có một mối quan hệ? Sẽ có. Bạn
                                muốn tìm thêm bạn bè? Cũng sẽ có. Bạn mới tới ký
                                túc xá và muốn trải nghiệm học đại học của mình
                                tuyệt nhất? Tinlog sẽ giúp bạn.
                            </p>
                        </div>
                    </div>
                    <div
                        className={cx('toiLuon')}
                        onClick={() => navigate('/login-register')}
                    >
                        <div
                            data-aos="fade-left"
                            data-aos-once="false"
                            data-aos-delay="50"
                            data-aos-duration="1500"
                            className={cx('content')}
                        >
                            <div className={cx('text')}>
                                <p>Tới cái công chiện luôn </p>
                            </div>
                            <div className={cx('icon')}>
                                <svg
                                    stroke="currentColor"
                                    fill="currentColor"
                                    strokeWidth="0"
                                    viewBox="0 0 16 16"
                                    height="1em"
                                    width="1em"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"
                                    ></path>
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={cx('community-profile')}>
                    <Swiper
                        spaceBetween={30}
                        slidesPerView={3}
                        freeMode={true}
                        modules={[FreeMode]}
                        className={cx('customSwiper')}
                    >
                        <SwiperSlide>
                            <div className={cx('profile')}>
                                <div className={cx('image')}>
                                    <img src={hungAva} alt="thanhhung" />
                                </div>
                                <div className={cx('name')}>
                                    <h1>Nguyễn Thanh Hùng</h1>
                                </div>
                                <div className={cx('bio')}>
                                    <p>
                                        I’m selfish, impatient and a little
                                        insecure. I make mistakes, I am out of
                                        control and at times hard to handle. But
                                        if you can’t handle me at my worst, then
                                        you sure as hell don’t deserve me at my
                                        best.
                                    </p>
                                </div>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className={cx('profile')}>
                                <div className={cx('image')}>
                                    <img src={datAva} alt="dacdat" />
                                </div>
                                <div className={cx('name')}>
                                    <h1>Nguyễn Đắc Đạt</h1>
                                </div>
                                <div className={cx('bio')}>
                                    <p>
                                        You’ve gotta dance like there’s nobody
                                        watching, love like you’ll never be
                                        hurt, sing like there’s nobody
                                        listening, and live like it’s heaven on
                                        earth.
                                    </p>
                                </div>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className={cx('profile')}>
                                <div className={cx('image')}>
                                    <img src={tigerAva} alt="" />
                                </div>
                                <div className={cx('name')}>
                                    <h1>Đặng Huy Hoàng</h1>
                                </div>
                                <div className={cx('bio')}>
                                    <p>
                                        Insanity is doing the same thing, over
                                        and over again, but expecting different
                                        results.
                                    </p>
                                </div>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className={cx('profile')}>
                                <div className={cx('image')}>
                                    <img src={kietAva} alt="" />
                                </div>
                                <div className={cx('name')}>
                                    <h1>Nguyễn Tuấn Kiệt</h1>
                                </div>
                                <div className={cx('bio')}>
                                    <p>
                                        Time means a lot to me because, you see,
                                        I, too, am also a learner and am often
                                        lost in the joy of forever developing
                                        and simplifying. If you love life, don’t
                                        waste time, for time is what life is
                                        made up of.
                                    </p>
                                </div>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className={cx('profile')}>
                                <div className={cx('image')}>
                                    <img src={kiet2Ava} alt="" />
                                </div>
                                <div className={cx('name')}>
                                    <h1>Cao Tuấn Kiệt</h1>
                                </div>
                                <div className={cx('bio')}>
                                    <p>
                                        Very little is needed to make a happy
                                        life; it is all within yourself, in your
                                        way of thinking.
                                    </p>
                                </div>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className={cx('profile')}>
                                <div className={cx('image')}>
                                    <img src={khoaAva} alt="" />
                                </div>
                                <div className={cx('name')}>
                                    <h1>Huỳnh Trọng Khoa</h1>
                                </div>
                                <div className={cx('bio')}>
                                    <p>
                                        Your time is limited, so don’t waste it
                                        living someone else’s life. Don’t be
                                        trapped by dogma, which is living with
                                        the results of other people’s thinking.
                                        Don’t let the noise of others’ opinions
                                        drown out your own inner voice. And most
                                        important, have the courage to follow
                                        your heart and intuition.
                                    </p>
                                </div>
                            </div>
                        </SwiperSlide>
                    </Swiper>
                </div>
            </div>
            <div className={cx('footer')}>
                <div className={cx('video')}>
                    <video src={video5} autoPlay loop muted></video>
                </div>
                <div className={cx('text')}>
                    <div data-aos="zoom-in" className="aos-init aos-animate">
                        <h1>Let's Talk.</h1>
                    </div>
                </div>
                <div className={cx('text-bottom')}>
                    <p>
                        <span>© 2022</span>Tinlog.
                    </p>
                    <h3>Everything will be simple if you think simple .</h3>
                </div>
            </div>
        </div>
    )
}

export default Home
