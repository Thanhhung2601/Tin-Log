import React, { useEffect } from 'react'
import styles from './ListMatch.module.scss'
import classNames from 'classnames/bind'
import CardMatch from './CardMatch/CardMatch'

const cx = classNames.bind(styles)

const ListMatch = ({ user, conversation }) => {
    return (
        <div className={cx('listMatch')}>
            {conversation.map((card) => {
                const userId = card.members.find((it) => it !== user._id)
                return (
                    <div className={cx('listMatch-item')} key={card._id}>
                        <CardMatch conversation={card} userId={userId} />
                    </div>
                )
            })}
        </div>
    )
}

export default ListMatch
