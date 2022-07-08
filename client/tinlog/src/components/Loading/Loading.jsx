import React from 'react'
import styles from './Loading.module.scss'
import classNames from 'classnames/bind'

const cx = classNames.bind(styles)

const Loading = () => {
    return (
        <div className={cx('container')}>
            <div className={cx('wrapper')}>
                <div className={cx('spinner')}>
                    <div className={cx('spinner-item')}></div>
                    <div className={cx('spinner-item')}></div>
                    <div className={cx('spinner-item')}></div>
                    <div className={cx('spinner-item')}></div>
                    <div className={cx('spinner-item')}></div>
                </div>
                <div className={cx('text')}>
                    <h2>loading</h2>
                </div>
            </div>
        </div>
    )
}

export default Loading
