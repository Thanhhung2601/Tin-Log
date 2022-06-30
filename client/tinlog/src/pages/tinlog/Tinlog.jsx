import React from 'react'
import AppLayout from '../../layout/AppLayout/AppLayout'
import stylesAppLayout from '../../layout/AppLayout/AppLayout.module.scss'
import classNames from 'classnames/bind'
import styles from './Tinlog.module.scss'
import { Link, Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Avatar } from '@mui/material'
import ContentSideBar from '../../components/ContentSideBar/ContentSideBar'
import CardUser from '../../components/ContentTinLog/CardUser'

const cxAppLayout = classNames.bind(stylesAppLayout)
const cx = classNames.bind(styles)

const Tinlog = () => {
    const { user } = useSelector((state) => state.userInfo)
    console.log(user)
    return (
        <AppLayout>
            <div className={cxAppLayout('app-sidebar')}>
                <div className={cx('sidebar-head')}>
                    <Link to="profile">
                        <div className={cx('sidebar-head-profile')}>
                            {user.profileImage ? (
                                <Avatar
                                    alt={user.userName}
                                    src={user.profileImage}
                                    sx={{
                                        width: 36,
                                        height: 36,
                                    }}
                                />
                            ) : (
                                <Avatar
                                    sx={{
                                        fontSize: '2.2rem',
                                        width: 36,
                                        height: 36,
                                    }}
                                >
                                    {user.userName[0]}
                                </Avatar>
                            )}
                            <span className={cx('userName')}>
                                {user.userName}
                            </span>
                        </div>
                    </Link>
                </div>
                <ContentSideBar />
            </div>
            <div className={cxAppLayout('app-content')}>
                <CardUser />
            </div>
        </AppLayout>
    )
}

export default Tinlog
