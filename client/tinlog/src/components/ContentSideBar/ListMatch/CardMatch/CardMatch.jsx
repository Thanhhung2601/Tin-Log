import React, { useEffect, useState } from 'react'
import styles from './CardMatch.module.scss'
import classNames from 'classnames/bind'
import { getUserById } from '../../../../api/index'
import noHighlightImg from '../../../../images/fleava.jpg'
import { useNavigate } from 'react-router-dom'

const cx = classNames.bind(styles)

const CardMatch = ({ conversation, userId }) => {
    const [user, setUser] = useState('')
    const navigate = useNavigate()

    useEffect(() => {
        const getUser = async () => {
            const { data } = await getUserById({ userId })
            setUser(data)
        }
        getUser()
    }, [])

    const handleClick = () => {
        navigate(`/app/conversation/${conversation._id}`)
    }

    return (
        <div className={cx('card')} onClick={handleClick}>
            <img
                src={user.profileImage || noHighlightImg}
                alt={user.userName}
            />
            <h4 className={cx('card-username')}>{user.userName}</h4>
        </div>
    )
}

export default CardMatch
