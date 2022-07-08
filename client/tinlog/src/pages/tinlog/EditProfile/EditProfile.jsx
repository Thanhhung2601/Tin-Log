import React from 'react'
import styles from './EditProfile.module.scss'
import classNames from 'classnames/bind'
import AppLayout from '../../../layout/AppLayout/AppLayout'
import stylesAppLayout from '../../../layout/AppLayout/AppLayout.module.scss'
import { useSelector } from 'react-redux'
import { Avatar } from '@mui/material'
import { FaRegEdit } from 'react-icons/fa'
import SelectGender from '../../../components/EditProfile/SelectGender/SelectGender'
import SelectRangeSlider from '../../../components/EditProfile/SelectRangeSlider/SelectRangeSlider'
import ProfileCard from '../../../components/EditProfile/ProfileCard/ProfileCard'
import { useState } from 'react'
import PopupEditProfile from '../../../components/EditProfile/PopupEditProfile/PopupEditProfile'
import Zoom from 'react-reveal/Zoom'

const cxAppLayout = classNames.bind(stylesAppLayout)
const cx = classNames.bind(styles)

const EditProfile = () => {
    const [popupEditProfile, setPopupEditProfile] = useState(false)

    const { user } = useSelector((state) => state.userInfo)

    return (
        <AppLayout>
            <div className={cxAppLayout('app-sidebar')}>
                <div className={cx('profile')}>
                    <div className="profile-avatar">
                        {user?.profileImage ? (
                            <Avatar
                                alt={user.userName}
                                src={user.profileImage}
                                sx={{
                                    width: 115,
                                    height: 115,
                                }}
                            />
                        ) : (
                            <Avatar
                                sx={{
                                    fontSize: '2.2rem',
                                    width: 115,
                                    height: 115,
                                }}
                            >
                                {user.userName[0]}
                            </Avatar>
                        )}
                    </div>
                    <div className={cx('user-desc')}>
                        <h3>{user.email}</h3>
                        <span>{user.userName}</span>
                        <div
                            className={cx('edit-profile')}
                            onClick={() => setPopupEditProfile(true)}
                        >
                            <span className={cx('edit-profile-btn')}>
                                <FaRegEdit /> Sửa hồ sơ
                            </span>
                        </div>
                    </div>
                </div>
                <SelectGender />
                <SelectRangeSlider />
            </div>
            <div className={cxAppLayout('app-content')}>
                <ProfileCard user={user} />
                {popupEditProfile && (
                    <PopupEditProfile
                        user={user}
                        setPopupEditProfile={setPopupEditProfile}
                    />
                )}
            </div>
        </AppLayout>
    )
}

export default EditProfile
