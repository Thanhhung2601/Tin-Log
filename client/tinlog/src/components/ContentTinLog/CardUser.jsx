import React, { useState, useMemo, useRef } from 'react'
import TinderCard from 'react-tinder-card'
import styles from './CardUser.module.scss'
import classNames from 'classnames/bind'
import { AiOutlineClose } from 'react-icons/ai'

const cx = classNames.bind(styles)

const db = [
    {
        name: 'Richard Hendricks',
        url: 'https://scontent.fsgn2-4.fna.fbcdn.net/v/t1.6435-1/177565248_2906957672917278_1600894721905628046_n.jpg?stp=dst-jpg_p320x320&_nc_cat=109&ccb=1-7&_nc_sid=7206a8&_nc_ohc=jLpWJ1rkPX8AX97gO7E&tn=6gKIGndEmIdQctvi&_nc_ht=scontent.fsgn2-4.fna&oh=00_AT9QzgS_fSsWgXhSmHnlvR5hk63iE4zXkrP3pqwlQz2szA&oe=62E39711',
    },
    {
        name: 'Erlich Bachman',
        url: 'https://scontent.fsgn2-5.fna.fbcdn.net/v/t39.30808-6/272980591_3123466684589063_3043601546710835731_n.jpg?stp=dst-jpg_p843x403&_nc_cat=106&ccb=1-7&_nc_sid=8bfeb9&_nc_ohc=vu8hhpnV1NkAX-B0Wf8&_nc_ht=scontent.fsgn2-5.fna&oh=00_AT8qO3sdbQz3wSIROGN3XQLNlwq-Zb3Os4rhRaG87fGKpA&oe=62C0F453',
    },
    {
        name: 'Monica Hall',
        url: 'https://scontent.fsgn2-4.fna.fbcdn.net/v/t39.30808-6/261301088_106266348563626_3753042623771024983_n.jpg?stp=c0.13.160.160a_dst-jpg_p160x160&_nc_cat=109&ccb=1-7&_nc_sid=574b62&_nc_ohc=9tdAUOLSBBoAX90r7oK&_nc_ht=scontent.fsgn2-4.fna&oh=00_AT_FwgppbpMQaQPMaiB5b0azSwfQ2Aa2OdprFSETHBXEDg&oe=62C01465',
    },
    {
        name: 'Jared Dunn',
        url: 'https://scontent.fsgn2-3.fna.fbcdn.net/v/t51.36329-10/285015896_590899438924316_1960779149720012980_n.jpg?stp=dst-jpg_p296x100&_nc_cat=108&ccb=1-7&_nc_sid=ad6a45&_nc_ohc=RYHgr6MHch4AX9L2aXc&_nc_ht=scontent.fsgn2-3.fna&oh=00_AT8DALp_C2ehYEPq2-BpACmpYvedD8s10Vt9x_YaEldNxA&oe=62C0EDBE',
    },
]

const CardUser = () => {
    const [currentIndex, setCurrentIndex] = useState(db.length - 1)
    const [lastDirection, setLastDirection] = useState()
    const currentIndexRef = useRef(currentIndex)

    const childRefs = useMemo(
        () =>
            Array(db.length)
                .fill(0)
                .map((i) => React.createRef()),
        []
    )

    const updateCurrentIndex = (val) => {
        setCurrentIndex(val)
        currentIndexRef.current = val
    }

    const canGoBack = currentIndex < db.length - 1

    const canSwipe = currentIndex >= 0

    const swiped = (direction, nameToDelete, index) => {
        setLastDirection(direction)
        updateCurrentIndex(index - 1)
    }

    const outOfFrame = (name, idx) => {
        console.log(
            `${name} (${idx}) left the screen!`,
            currentIndexRef.current
        )
        currentIndexRef.current >= idx && childRefs[idx].current.restoreCard()
    }

    const swipe = async (dir) => {
        if (canSwipe && currentIndex < db.length) {
            await childRefs[currentIndex].current.swipe(dir) // Swipe the card!
        }
    }

    const goBack = async () => {
        if (!canGoBack) return
        const newIndex = currentIndex + 1
        updateCurrentIndex(newIndex)
        await childRefs[newIndex].current.restoreCard()
    }

    return (
        <>
            <div className={cx('cardContainer-wrapper')}>
                <div className={cx('cardContainer-inner')}>
                    {db.map((character, index) => (
                        <TinderCard
                            ref={childRefs[index]}
                            className={cx('swipe')}
                            key={character.name}
                            onSwipe={(dir) =>
                                swiped(dir, character.name, index)
                            }
                            onCardLeftScreen={() =>
                                outOfFrame(character.name, index)
                            }
                        >
                            <div className={cx('card')}>
                                <img src={character.url} alt="" />
                            </div>
                        </TinderCard>
                    ))}
                </div>
                <div className={cx('buttons')}>
                    <div
                        onClick={() => swipe('left')}
                        className={cx('btn-item', 'btn-cancel')}
                    >
                        <svg
                            focusable="false"
                            aria-hidden="true"
                            role="presentation"
                            viewBox="0 0 24 24"
                            width="38px"
                            height="38px"
                            className="Scale(.5) Expand"
                        >
                            <path d="m15.44 12 4.768 4.708c1.056.977 1.056 2.441 0 3.499-.813 1.057-2.438 1.057-3.413 0L12 15.52l-4.713 4.605c-.975 1.058-2.438 1.058-3.495 0-1.056-.813-1.056-2.44 0-3.417L8.47 12 3.874 7.271c-1.138-.976-1.138-2.44 0-3.417a1.973 1.973 0 0 1 3.25 0L12 8.421l4.713-4.567c.975-1.139 2.438-1.139 3.413 0 1.057.814 1.057 2.44 0 3.417L15.44 12Z"></path>
                        </svg>
                    </div>
                    <div
                        onClick={() => goBack()}
                        className={cx('btn-item', 'btn-back')}
                    >
                        <svg
                            focusable="false"
                            aria-hidden="true"
                            role="presentation"
                            viewBox="0 0 24 24"
                            width="30px"
                            height="30px"
                            className="Scale(.6) Expand"
                        >
                            <path d="M12.119 4.599V3.307c0-1.216-.76-1.672-1.824-.988l-.608.304L6.04 5.13l-.456.304c-1.064.76-1.064 1.748 0 2.28l.38.38c.987.76 2.66 1.824 3.647 2.432l.532.304c.912.76 1.748.228 1.748-.912V8.246a5.125 5.125 0 0 1 5.167 5.167c0 2.888-2.28 5.092-5.167 5.092-3.04 0-5.32-2.28-5.32-5.168 0-.912-.76-1.671-1.747-1.671-1.064 0-1.824.76-1.824 1.671C3 18.125 6.951 22 11.815 22c4.787 0 8.738-3.8 8.738-8.663.076-4.711-3.875-8.51-8.662-8.51l.228-.228z"></path>
                        </svg>
                    </div>
                    <div
                        onClick={() => swipe('right')}
                        className={cx('btn-item', 'btn-like')}
                    >
                        <svg
                            focusable="false"
                            aria-hidden="true"
                            role="presentation"
                            viewBox="0 0 24 24"
                            width="38px"
                            height="38px"
                            className="Scale(.5) Expand"
                        >
                            <path
                                color="#fe4950"
                                d="M21.994 10.225c0-3.598-2.395-6.212-5.72-6.212-1.78 0-2.737.647-4.27 2.135C10.463 4.66 9.505 4 7.732 4 4.407 4 2 6.62 2 10.231c0 1.52.537 2.95 1.533 4.076l8.024 7.357c.246.22.647.22.886 0l7.247-6.58.44-.401.162-.182.168-.174a6.152 6.152 0 0 0 1.54-4.09"
                            ></path>
                        </svg>
                    </div>
                </div>
            </div>
            <div className={cx('title-bottom')}>
                <h1>Tinlog</h1>
            </div>
        </>
    )
}

export default CardUser
