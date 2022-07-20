import React from 'react'
import styles from './Rada.module.scss'
import classNames from 'classnames/bind'
import { Avatar } from '@mui/material'

const cx = classNames.bind(styles)

const Rada = ({ user }) => {
    return (
        <div className={cx('pulse-container')}>
            <div className={cx('pulse-box')}>
                <div className={cx('pulse-css')}>
                    <Avatar
                        alt={user?.userName}
                        src={user?.profileImage}
                        sx={{
                            width: '50px',
                            height: '50px',
                        }}
                    />
                </div>
            </div>
        </div>
    )
}

export default Rada
