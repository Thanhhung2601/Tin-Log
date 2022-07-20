import React from 'react'
import styles from './Messenger.module.scss'
import classNames from 'classnames/bind'
import noAvatar from '../../images/fleava.jpg'
import moment from 'moment'

const cx = classNames.bind(styles)

const Messenger = ({ own, message, user }) => {
    return (
        <div
            className={cx('message', {
                own: own,
            })}
        >
            <div className={cx('messageTop')}>
                <img
                    className={cx('messageImg')}
                    src={user?.profileImage || noAvatar}
                    alt=""
                />
                <p className={cx('messageText')}>{message.text}</p>
            </div>
            <div className={cx('messageBottom')}>
                {moment(message.createdAt).fromNow()}
            </div>
        </div>
    )
}

export default Messenger
