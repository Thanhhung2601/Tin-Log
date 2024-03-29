import React, { useEffect, useState } from 'react'
import styles from './ListLike.module.scss'
import classNames from 'classnames/bind'
import { getUserById } from '../../../api'
import { useDispatch } from 'react-redux'
import { getUserByIdAction } from '../../../redux/slices/userSlice'
import CardMatch from '../ListMatch/CardMatch/CardMatch'
import ViewDetailProfile from '../../ViewDetailProfile/ViewDetailProfile'

const cx = classNames.bind(styles)

const ListLike = ({ user }) => {
    const [profileDetail, setprofileDetail] = useState(null)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getUserByIdAction(user._id))
    }, [])

    return (
        <div className={cx('listLike')}>
            <div className={cx('like-number')}>
                <div className={cx('border')}>
                    <div className={cx('like-number-inner')}>
                        <div className={cx('text')}>
                            {user.likes.length >= 99
                                ? '99+'
                                : user.likes.length}{' '}
                            lượt thích
                        </div>
                        <div className={cx('number-center')}>
                            {user.likes.length >= 99
                                ? '99+'
                                : user.likes.length}
                            +
                        </div>
                        <div className={cx('icon')}>
                            <svg
                                focusable="false"
                                aria-hidden="false"
                                role="img"
                                viewBox="0 0 24 24"
                                width="30px"
                                height="30px"
                                className="Expand"
                                stroke="#fff"
                                strokeLinecap="round"
                                aria-labelledby="5bf404bb6e7a6c73"
                            >
                                <path
                                    d="M2.16 7.354h6.37a5.947 5.947 0 00-.894 2.084H2.16c-.406.04-.8-.15-1.015-.49a1.04 1.04 0 010-1.114c.215-.341.61-.532 1.015-.491v.01zm1.68 6.263c-.406.04-.8-.15-1.015-.49a1.04 1.04 0 010-1.114c.215-.34.61-.531 1.015-.49h3.796c.077.375.186.751.35 1.106l.021.043.022.043.546.902H3.84zm2.476 4.18c-.59 0-1.069-.472-1.069-1.053 0-.582.479-1.053 1.07-1.053h3.49l1.266 2.106H6.316zm13.746-1.837l-6.36 2.89a.495.495 0 01-.611-.183l-3.971-6.5a4.132 4.132 0 01-.185-3.02C9.556 7.183 11.127 6 12.949 6c.404 0 .818.064 1.233.183 1.222.365 1.745.999 2.476 2.299a5.271 5.271 0 012.346-.73c.327 0 .665.064 1.047.171 2.29.677 3.382 2.901 2.618 5.297a4.287 4.287 0 01-1.909 2.396l-.153.086-.152.075-.393.183z"
                                    fill="#f0c650"
                                ></path>
                                <title id="5bf404bb6e7a6c73">
                                    Người Thích Bạn
                                </title>
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
            {user.likes.map((item, index) => {
                return (
                    <div className={cx('listLike-item')} key={index}>
                        <CardMatch
                            userId={item}
                            ViewDetailProfile={setprofileDetail}
                        />
                    </div>
                )
            })}
            {profileDetail && (
                <ViewDetailProfile
                    user={profileDetail}
                    setprofileDetail={setprofileDetail}
                />
            )}
        </div>
    )
}

export default ListLike
