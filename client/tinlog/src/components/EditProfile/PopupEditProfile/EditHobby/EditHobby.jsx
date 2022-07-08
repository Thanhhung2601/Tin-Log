import React from 'react'
import styles from './EditHobby.module.scss'
import classNames from 'classnames/bind'
import { hobby } from '../../../../data/hobby'
import { Chip } from '@mui/material'
import { useState } from 'react'
import { useEffect } from 'react'
const cx = classNames.bind(styles)

const EditHobby = ({ user, setUserInfo, setPopupHobby }) => {
    const [listHobby, setListHobby] = useState(hobby)

    useEffect(() => {
        const newListHobby = listHobby.map((hobby) => {
            return { ...hobby, isChoice: false }
        })
        setListHobby(
            newListHobby.map((hb) => {
                let check = user.hobby.some((item) => item.id === hb.id)
                return check ? { ...hb, isChoice: true } : hb
            })
        )
    }, [])

    const handleUpdateHobby = (id) => {
        setListHobby(
            listHobby.map((item) => {
                if (item.id === id) {
                    if (item.isChoice) {
                        return { ...item, isChoice: false }
                    } else {
                        return { ...item, isChoice: true }
                    }
                } else {
                    return item
                }
            })
        )
    }

    const handleConfirm = () => {
        const resultHobby = listHobby.filter((it) => it.isChoice)
        setUserInfo({ ...user, hobby: resultHobby })
        setPopupHobby(false)
    }

    return (
        <div className={cx('EditHobby')}>
            <div className={cx('title')}>
                <div className={cx('text')}>
                    <h2>Sửa sở thích</h2>
                </div>
                <div className={cx('done')} onClick={handleConfirm}>
                    <span>Xong</span>
                </div>
            </div>
            <div className={cx('hobby')}>
                {listHobby.map((item) => {
                    return (
                        <Chip
                            key={item.id}
                            label={item.text}
                            onClick={() => handleUpdateHobby(item.id)}
                            variant="outlined"
                            sx={{
                                fontSize: '1.2rem',
                                margin: '4px 6px',
                                cursor: 'pointer',

                                border: item.isChoice
                                    ? '1px solid #FD267A'
                                    : '1px solid #bdbdbd',
                                color: item.isChoice
                                    ? '#FD267A'
                                    : 'rgba(0, 0, 0, 0.87)',
                            }}
                        />
                    )
                })}
            </div>
        </div>
    )
}

export default EditHobby
