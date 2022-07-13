import React, { useEffect } from 'react'
import styles from './ListMatch.module.scss'
import classNames from 'classnames/bind'
import CardMatch from './CardMatch/CardMatch'
import { useSelector, useDispatch } from 'react-redux'
import { getAllConversationAction } from '../../../redux/slices/conversationSlice'

const cx = classNames.bind(styles)

const ListMatch = ({ user }) => {
    const { conversation } = useSelector((state) => state.conversation)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getAllConversationAction(user))
    }, [])

    return (
        <div className={cx('listMatch')}>
            {conversation.map((card) => {
                console.log('MAP RUN')
                const userId = card.members.find((it) => it !== user._id)
                return (
                    <div className={cx('listMatch-item')} key={card._id}>
                        <CardMatch userId={userId} />
                    </div>
                )
            })}
        </div>
    )
}

export default ListMatch
