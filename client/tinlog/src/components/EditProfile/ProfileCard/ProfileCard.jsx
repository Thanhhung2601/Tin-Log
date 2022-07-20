import React, { useState } from 'react'
import styles from './ProfileCard.module.scss'
import classNames from 'classnames/bind'
import NavImage from './NavImage/NavImage'
import ProgressImage from './ProgressImage/ProgressImage'
import { Chip } from '@mui/material'
import img from '../../../images/No-highLightImg.png'

const cx = classNames.bind(styles)

const ProfileCard = ({ user, uiConversation }) => {
    const [currentImage, setCurrentImage] = useState(0)

    return (
        <div className={cx('profile-card-wrapper')}>
            <div
                className={cx('profile-card-inner', {
                    uiConversation: uiConversation,
                })}
            >
                <div className={cx('profile-inner-img')}>
                    {user?.highlightImage.length > 0 ? (
                        <>
                            <img
                                src={user?.highlightImage[currentImage]}
                                alt={user?.userName}
                            />
                            <NavImage
                                highlightImage={user?.highlightImage}
                                currentImage={currentImage}
                                setCurrentImage={setCurrentImage}
                            />
                            <ProgressImage
                                hightlightImages={user?.highlightImage}
                                currentImage={currentImage}
                                setCurrentImage={setCurrentImage}
                            />
                        </>
                    ) : (
                        <img src={img} alt="no-hightLightImage" />
                    )}
                </div>
                <div
                    className={cx('profile-inner-desc', {
                        descConversation: uiConversation,
                    })}
                >
                    <div className={cx('profile-name-age')}>
                        <h2>
                            {user?.userName} <span>{user?.age}</span>
                        </h2>
                    </div>
                    <div className={cx('profile-bio')}>
                        <p>{user?.bio}</p>
                    </div>
                    <div className={cx('profile-hobby')}>
                        <h4>Sở thích</h4>
                        <div className={cx('list-hobby')}>
                            {user?.hobby.map((hb) => {
                                return (
                                    <Chip
                                        key={hb.id}
                                        label={hb.text}
                                        variant="outlined"
                                        sx={{
                                            fontSize: '1.2rem',
                                            margin: '4px 6px',
                                        }}
                                    />
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProfileCard
