import React from 'react'
import styles from './AppLayout.module.scss'
import classNames from 'classnames/bind'

const cx = classNames.bind(styles)

const AppLayout = ({ children }) => {
    return <div className={cx('app-layout')}>{children}</div>
}

export default AppLayout
