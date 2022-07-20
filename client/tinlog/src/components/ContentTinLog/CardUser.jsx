import React, { useState, useEffect, useMemo, useRef } from 'react'
import styles from './CardUser.module.scss'
import classNames from 'classnames/bind'
import Rada from '../Rada/Rada'

import CardItem from './CardItem/CardItem'
import { useDispatch } from 'react-redux'
import { updateProfileUser } from '../../redux/slices/userSlice'
import { actions } from '../../redux/slices/communitySilce'
import { addConversationAction } from '../../redux/slices/conversationSlice'

const cx = classNames.bind(styles)

const CardUser = ({ user, community }) => {
    const [currentIndex, setCurrentIndex] = useState(community.length - 1)
    const [favoritePerson, setFavoritePerson] = useState(null)
    const [lastDirection, setLastDirection] = useState(null)
    const [indexCard, setIndexCard] = useState(null)
    const dispatch = useDispatch()
    const currentIndexRef = useRef(currentIndex)

    const childRefs = useMemo(
        () =>
            Array(community.length)
                .fill(0)
                .map((i) => React.createRef()),
        []
    )

    useEffect(() => {
        const asyncHandle = async () => {
            if (lastDirection === 'left') {
                console.log('Unlike', community[indexCard])
            }
            if (lastDirection === 'right') {
                console.log('Like', community[indexCard])
                const newFollowing = [...user.following]
                const newLikes = [...community[indexCard].likes]
                newFollowing.push(community[indexCard]._id)
                newLikes.push(user._id)
                const newCurrentProfile = {
                    ...user,
                    following: newFollowing,
                }
                const newOtherProfile = {
                    ...community[indexCard],
                    likes: newLikes,
                }
                await dispatch(
                    actions.updateUser({
                        id: community[indexCard]._id,
                        newLikes,
                    })
                )
                await dispatch(
                    updateProfileUser([newCurrentProfile, newOtherProfile])
                )
                await dispatch(
                    addConversationAction({
                        senderId: user._id,
                        receiverId: community[indexCard]._id,
                    })
                )
            }
        }
        asyncHandle()
    }, [indexCard])

    const updateCurrentIndex = (val) => {
        setCurrentIndex(val)
        currentIndexRef.current = val
    }

    const canGoBack = currentIndex < community.length - 1

    const canSwipe = currentIndex >= 0

    const swiped = (direction, nameToDelete, index) => {
        setLastDirection(direction)
        updateCurrentIndex(index - 1)
    }

    const outOfFrame = (name, idx) => {
        setIndexCard(idx)
        currentIndexRef.current >= idx && childRefs[idx].current.restoreCard()
    }

    const swipe = async (dir) => {
        if (canSwipe && currentIndex < community.length) {
            await childRefs[currentIndex].current.swipe(dir) // Swipe the card!
        }
    }

    return (
        <>
            <div className={cx('cardContainer-wrapper')}>
                <div className={cx('cardContainer-inner')}>
                    {currentIndex === -1 ? (
                        <Rada user={user} />
                    ) : (
                        community.map((character, index) => {
                            return (
                                <CardItem
                                    character={character}
                                    index={index}
                                    swiped={swiped}
                                    outOfFrame={outOfFrame}
                                    childRefs={childRefs}
                                    key={index}
                                    user={user}
                                />
                            )
                        })
                    )}
                </div>
                {currentIndex > -1 && (
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
                )}
            </div>
            <div className={cx('title-bottom')}>
                <h1>Tinlog</h1>
            </div>
        </>
    )
}

export default CardUser
