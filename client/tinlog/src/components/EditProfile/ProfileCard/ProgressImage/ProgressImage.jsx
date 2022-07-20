import React from 'react'
import styles from './ProgressImage.module.scss'
import classNames from 'classnames/bind'

const cx = classNames.bind(styles)

const ProgressImage = ({ hightlightImages, currentImage }) => {
    return (
        <div className={cx('progressImage')}>
            {hightlightImages.map((image, index) => {
                return (
                    <div
                        style={{ width: `${100 / hightlightImages.length}%` }}
                        key={index}
                        className={cx('item', {
                            active: currentImage === index,
                            hidden: hightlightImages.length === 1,
                        })}
                    ></div>
                )
            })}
        </div>
    )
}

export default ProgressImage
