import React from 'react'
import AppLayout from '../../layout/AppLayout/AppLayout'
import stylesAppLayout from '../../layout/AppLayout/AppLayout.module.scss'
import classNames from 'classnames/bind'
import styles from './Tinlog.module.scss'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Avatar } from '@mui/material'
import ContentSideBar from '../../components/ContentSideBar/ContentSideBar'
import CardUser from '../../components/ContentTinLog/CardUser'
import { actions } from '../../redux/slices/userSlice'
import { actions as actionCommunity } from '../../redux/slices/communitySilce'
import { useEffect } from 'react'
import { fetchAllUser } from '../../redux/slices/communitySilce'
import CircularProgress from '@mui/material/CircularProgress'
import { io } from 'socket.io-client'
import { useRef } from 'react'
import Rada from '../../components/Rada/Rada'

const cxAppLayout = classNames.bind(stylesAppLayout)
const cx = classNames.bind(styles)

const Tinlog = () => {
    const { user, selectGender, ageRange } = useSelector(
        (state) => state.userInfo
    )
    const { community, loading } = useSelector((state) => state.community)
    const socket = useRef()
    const navigate = useNavigate()
    const dispatch = useDispatch()

    console.log('tinlog re-render')

    const handleLogout = () => {
        dispatch(actions.logOut({ navigate }))
    }

    useEffect(() => {
        socket.current = io('ws://localhost:8900')
        socket.current.on('hello', (data) => {
            console.log(data)
        })
        dispatch(
            fetchAllUser({
                filterById: user._id,
                filterByGender: selectGender,
                filterByAgeRange: ageRange,
                user,
            })
        )
    }, [])

    useEffect(() => {
        socket.current.emit('addUser', user._id)
        socket.current.on('getUser', (users) => {
            console.log('socket users', users)
        })
    }, [user])

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
                <div className={cx('content-sb')}>
                    <ContentSideBar user={user} />
                    <div className={cx('logout')} onClick={handleLogout}>
                        <p>Đăng Xuất</p>
                    </div>
                </div>
            </div>
            <div className={cxAppLayout('app-content')}>
                {loading && (
                    <div className={cx('loading')}>
                        <CircularProgress
                            sx={{
                                color: '#FE4E4A',
                            }}
                            size="50px"
                        />
                    </div>
                )}
                {community?.length > 0 && !loading ? (
                    <CardUser user={user} community={community} />
                ) : (
                    <div className={cx('rada')}>
                        <Rada user={user} />
                    </div>
                )}
            </div>
        </AppLayout>
    )
}

export default Tinlog
