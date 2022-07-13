import React, { useState } from 'react'
import styles from './CardItem.module.scss'
import classNames from 'classnames/bind'
import { Chip } from '@mui/material'
import TinderCard from 'react-tinder-card'
import NavImage from '../../EditProfile/ProfileCard/NavImage/NavImage'
import ProgressImage from '../../EditProfile/ProfileCard/ProgressImage/ProgressImage'
import NoHighLightImage from '../../../images/fleava.jpg'

const cx = classNames.bind(styles)

const CardItem = ({
    character,
    index,
    swiped,
    outOfFrame,
    childRefs,
    user,
}) => {
    const [currentImage, setCurrentImage] = useState(0)

    return (
        <div className={cx('card-swipe-wrapper')} key={index}>
            <TinderCard
                ref={childRefs[index]}
                className={cx('swipe')}
                onSwipe={(dir) => swiped(dir, character.name, index)}
                onCardLeftScreen={() => outOfFrame(character.name, index)}
            >
                <div className={cx('card')}>
                    <img
                        src={
                            character.highlightImage[0]
                                ? character.highlightImage[currentImage]
                                : NoHighLightImage
                        }
                        alt={character.userName}
                    />
                </div>
                <div className={cx('infomation-user')}>
                    <h1 className={cx('name-age', 'pd')}>
                        {character.userName} <span>{character.age}</span>
                    </h1>
                    <div className={cx('hobby', 'pd')}>
                        {character.hobby.map((item) => {
                            const check = user.hobby.some(
                                (it) => it.id === item.id
                            )
                            return (
                                <Chip
                                    key={item.id}
                                    label={item.text}
                                    sx={{
                                        fontSize: '1.2rem',
                                        margin: '4px 6px',
                                        background: check
                                            ? 'linear-gradient(90deg, rgb(250, 111, 104), rgb(253, 38, 122))'
                                            : '#0000004d',
                                        color: 'white',
                                        backdropFilter: 'blur(4px)',
                                    }}
                                />
                            )
                        })}
                    </div>
                    <div className={cx('bio', 'pd')}>
                        <p>{character.bio}</p>
                    </div>
                    <div className={cx('space')}></div>
                    <div className={cx('overlay')}></div>
                </div>
                {character.highlightImage.length > 1 && (
                    <>
                        <NavImage
                            highlightImage={character.highlightImage}
                            currentImage={currentImage}
                            setCurrentImage={setCurrentImage}
                        />
                        <ProgressImage
                            hightlightImages={character.highlightImage}
                            currentImage={currentImage}
                        />
                    </>
                )}
            </TinderCard>
        </div>
    )
}

export default CardItem
