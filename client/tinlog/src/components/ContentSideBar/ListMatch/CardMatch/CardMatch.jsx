import React from 'react'
import styles from './CardMatch.module.scss'
import classNames from 'classnames/bind'

const cx = classNames.bind(styles)

const CardMatch = ({ card }) => {
    return (
        <div className={cx('card')}>
            <img src={card.profileImage} alt={card.userName} />
            <h4 className={cx('card-username')}>{card.userName}</h4>
        </div>
    )
}

export default CardMatch
