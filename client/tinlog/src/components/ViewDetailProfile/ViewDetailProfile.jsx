import React from 'react'
import styles from './ViewDetailProfile.module.scss'
import classNames from 'classnames/bind'
import ProfileCard from '../EditProfile/ProfileCard/ProfileCard'

const cx = classNames.bind(styles)

const ViewDetailProfile = ({ user, setprofileDetail }) => {
    return (
        <div className={cx('viewDetailProfile')}>
            <div className={cx('content-inner')}>
                <div data-aos="zoom-in">
                    <ProfileCard user={user} />
                </div>
            </div>
            <div
                className={cx('overlay')}
                onClick={() => setprofileDetail(null)}
            ></div>
        </div>
    )
}

export default ViewDetailProfile
