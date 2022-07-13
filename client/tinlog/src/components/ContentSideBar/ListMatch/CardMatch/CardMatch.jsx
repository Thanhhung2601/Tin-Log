import React, { useEffect, useState } from 'react'
import styles from './CardMatch.module.scss'
import classNames from 'classnames/bind'
import { getUserById } from '../../../../api/index'
import noHighlightImg from '../../../../images/fleava.jpg'

const cx = classNames.bind(styles)

const CardMatch = ({ userId }) => {
    const [user, setUser] = useState('')

    useEffect(() => {
        const getUser = async () => {
            const { data } = await getUserById({ userId })
            setUser(data)
        }
        getUser()
    }, [])

    return (
        <div className={cx('card')}>
            <img
                src={user.profileImage || noHighlightImg}
                alt={user.userName}
            />
            <h4 className={cx('card-username')}>{user.userName}</h4>
        </div>
    )
}

export default CardMatch
