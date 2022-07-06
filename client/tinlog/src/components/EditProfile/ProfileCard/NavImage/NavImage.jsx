import React from 'react'
import styles from './NavImage.module.scss'
import classNames from 'classnames/bind'
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io'

const cx = classNames.bind(styles)

const NavImage = ({ highlightImage, currentImage, setCurrentImage }) => {
    console.log(currentImage)
    return (
        <>
            <div
                className={cx('btn-left', {
                    hidden: currentImage === 0,
                })}
                onClick={() => setCurrentImage(currentImage - 1)}
            >
                <IoIosArrowBack />
            </div>
            <div
                className={cx('btn-right', {
                    hidden: currentImage === highlightImage.length - 1,
                })}
                onClick={() => setCurrentImage(currentImage + 1)}
            >
                <IoIosArrowForward />
            </div>
        </>
    )
}

export default NavImage
