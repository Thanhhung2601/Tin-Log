import React, { useState } from 'react'
import styles from './InfoMessage.module.scss'
import classNames from 'classnames/bind'
import { useEffect } from 'react'
import { getAllMessage, getUserById } from '../../../../api'
import noAva from '../../../../images/fleava.jpg'
import moment from 'moment'
import { useNavigate } from 'react-router-dom'

const cx = classNames.bind(styles)

const InfoMessage = ({
    conversationId,
    userId,
    showNoMessage,
    setshowNoMessage,
}) => {
    const [infoUser, setInfoUser] = useState(null)
    const [lastMessage, setLastMessage] = useState(null)
    const navigate = useNavigate()
    console.log(infoUser, lastMessage)

    useEffect(() => {
        const getData = async () => {
            const { data: allMessage } = await getAllMessage(conversationId)
            const { data: user } = await getUserById({ userId })
            setInfoUser(user)
            setLastMessage(allMessage[allMessage.length - 1])
            if (allMessage.length > 0) {
                setshowNoMessage(showNoMessage + 1)
            }
        }
        getData()
    }, [])

    return (
        <>
            {lastMessage && (
                <div
                    className={cx('infoMessage')}
                    onClick={() =>
                        navigate(`/app/conversation/${conversationId}`)
                    }
                >
                    <div className={cx('info-left')}>
                        <img
                            src={infoUser?.profileImage || noAva}
                            alt={infoUser?.userName}
                        />
                    </div>
                    <div className={cx('infor-right')}>
                        <h3 className={cx('name')}>{infoUser?.userName}</h3>
                        <p className={cx('message')}>{lastMessage?.text}</p>
                        <p className={cx('time')}>
                            {moment(lastMessage?.createdAt).fromNow()}
                        </p>
                    </div>
                </div>
            )}
        </>
    )
}

export default InfoMessage
