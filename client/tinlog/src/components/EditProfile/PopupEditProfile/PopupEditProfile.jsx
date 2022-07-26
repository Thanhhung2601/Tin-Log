import React, { useState } from 'react'
import styles from './PopupEditProfile.module.scss'
import classNames from 'classnames/bind'
import { AiOutlineClose, AiTwotoneEdit } from 'react-icons/ai'
import { Chip, Avatar } from '@mui/material'
import HightLightImg from './HighLightImg/HightLightImg'
import EditHobby from './EditHobby/EditHobby'
import {
    FormControl,
    Radio,
    RadioGroup,
    FormLabel,
    FormControlLabel,
} from '@mui/material'
import { styled } from '@mui/material/styles'
import { Button } from '@mui/material'
import { useRef } from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateProfileUser } from '../../../redux/slices/userSlice'
import Loading from '../../Loading/Loading'
import AOS from 'aos'
import 'aos/dist/aos.css'
AOS.init()

const CustomFormControllLabel = styled(FormControlLabel)(({ theme }) => ({
    '& .MuiTypography-body1': {
        fontSize: '1.6rem',
    },
}))
const CustomRadioGrop = styled(RadioGroup)(({ theme }) => ({
    flexDirection: 'row',
}))

const cx = classNames.bind(styles)

const PopupEditProfile = ({ user, setPopupEditProfile }) => {
    const [userInfo, setUserInfo] = useState(user)
    const [popupHobby, setPopupHobby] = useState(false)
    const ipRef = useRef()
    const { loading } = useSelector((state) => state.userInfo)
    const dispatch = useDispatch()

    console.log(userInfo)

    const handleChangeInput = (event) => {
        console.log(event.target.id)
        switch (event.target.id) {
            case 'age': {
                setUserInfo({ ...userInfo, age: event.target.value })
                break
            }
            case 'userName': {
                setUserInfo({ ...userInfo, userName: event.target.value })
                break
            }
            case 'bio': {
                setUserInfo({ ...userInfo, bio: event.target.value })
                break
            }
            default: {
                setUserInfo({ ...userInfo, sex: event.target.value })
            }
        }
    }

    const getBase = (file) => {
        return new Promise((resolve) => {
            let baseURL = ''
            let reader = new FileReader()
            reader.readAsDataURL(file)
            reader.onload = () => {
                baseURL = reader.result
                resolve(baseURL)
            }
        })
    }
    const handleFileIp = (e) => {
        const file = e.target.files[0]
        getBase(file)
            .then((result) => {
                setUserInfo({ ...userInfo, profileImage: result })
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const handleAdd = () => {
        ipRef.current.click()
    }

    const handleSave = () => {
        const filterdImg = userInfo.highlightImage.filter((img) => img)
        console.log({ ...userInfo, highlightImage: filterdImg })
        dispatch(
            updateProfileUser([{ ...userInfo, highlightImage: filterdImg }])
        )
    }

    return (
        <div className={cx('popup-edit-wrapper')}>
            <div data-aos="fade-left">
                <div className={cx('popup-edit-inner')}>
                    <div className={cx('edit-inner-head')}>
                        <div className={cx('text')}>
                            <h2>Sửa hồ sơ</h2>
                        </div>
                        <div
                            className={cx('icon')}
                            onClick={() => setPopupEditProfile(false)}
                        >
                            <AiOutlineClose />
                        </div>
                    </div>
                    <div className={cx('edit-body')}>
                        <div className={cx('edit-ProfileInfomation')}>
                            <div className={cx('edit-avatar', 'mg-pd')}>
                                <div className={cx('text')}>
                                    <span>Ảnh hồ sơ</span>
                                </div>
                                <div
                                    className={cx('avatar')}
                                    onClick={handleAdd}
                                >
                                    {userInfo.profileImage && (
                                        <img
                                            src={userInfo.profileImage}
                                            alt={userInfo.userName}
                                        />
                                    )}
                                    <div className={cx('icon')}>
                                        <AiTwotoneEdit />
                                    </div>
                                </div>
                                <div className={cx('input-file')}>
                                    <input
                                        ref={ipRef}
                                        type="file"
                                        onChange={handleFileIp}
                                    />
                                </div>
                            </div>
                            <div className={cx('fl-ip', 'mg-pd', 'edit-age')}>
                                <div className={cx('text')}>
                                    <span>Tuổi</span>
                                </div>
                                <div className={cx('input')}>
                                    <input
                                        type="text"
                                        id="age"
                                        value={userInfo.age}
                                        onChange={handleChangeInput}
                                    />
                                </div>
                            </div>
                            <div className={cx('fl-ip', 'mg-pd', 'edit-sex')}>
                                <div className={cx('text')}>
                                    <span>Giới tính</span>
                                </div>
                                <FormControl>
                                    <CustomRadioGrop
                                        aria-labelledby="demo-controlled-radio-buttons-group"
                                        name="controlled-radio-buttons-group"
                                        onChange={handleChangeInput}
                                        value={userInfo.sex}
                                        id="sex"
                                    >
                                        <CustomFormControllLabel
                                            value="male"
                                            control={
                                                <Radio
                                                    color="default"
                                                    sx={{
                                                        '& .MuiSvgIcon-root': {
                                                            fontSize: 24,
                                                        },
                                                    }}
                                                />
                                            }
                                            label="Nam"
                                            id="sex"
                                        />
                                        <CustomFormControllLabel
                                            value="female"
                                            control={
                                                <Radio
                                                    sx={{
                                                        '& .MuiSvgIcon-root': {
                                                            fontSize: 24,
                                                        },
                                                        color: '#fd267a',
                                                        '&.Mui-checked': {
                                                            color: '#fd267a',
                                                        },
                                                    }}
                                                />
                                            }
                                            label="Nữ"
                                            id="sex"
                                        />
                                        <CustomFormControllLabel
                                            value="other"
                                            control={
                                                <Radio
                                                    sx={{
                                                        '& .MuiSvgIcon-root': {
                                                            fontSize: 24,
                                                        },
                                                    }}
                                                />
                                            }
                                            label="Khác"
                                            id="sex"
                                        />
                                    </CustomRadioGrop>
                                </FormControl>
                            </div>
                            <div
                                className={cx(
                                    'fl-ip',
                                    'mg-pd',
                                    'edit-userName'
                                )}
                            >
                                <div className={cx('text')}>
                                    <span>Tên hiển thị</span>
                                </div>
                                <div className={cx('input')}>
                                    <input
                                        type="text"
                                        id="userName"
                                        onChange={handleChangeInput}
                                        value={userInfo.userName}
                                    />
                                </div>
                            </div>
                            <div className={cx('fl-ip', 'mg-pd', 'edit-hobby')}>
                                <div className={cx('text')}>
                                    <span>Sở thích</span>
                                </div>
                                <div
                                    className={cx('hobby')}
                                    onClick={() => setPopupHobby(true)}
                                >
                                    {userInfo.hobby.length > 0 ? (
                                        userInfo.hobby.map((hb) => {
                                            return (
                                                <Chip
                                                    key={hb.id}
                                                    label={hb.text}
                                                    variant="outlined"
                                                    sx={{
                                                        fontSize: '1.2rem',
                                                        margin: '4px 6px',
                                                        cursor: 'pointer',
                                                    }}
                                                />
                                            )
                                        })
                                    ) : (
                                        <Button
                                            variant="contained"
                                            size="medium"
                                            sx={{
                                                fontSize: 14,
                                                backgroundColor: '#FF4458',
                                                borderRadius: '16px !important',
                                                textTransform: 'capitalize',
                                                ':hover': {
                                                    bgcolor: '#FE4A4F',
                                                    color: 'white',
                                                },
                                            }}
                                        >
                                            Thêm sở thích
                                        </Button>
                                    )}
                                </div>
                            </div>
                            <div className={cx('fl-ip', 'mg-pd', 'edit-bio')}>
                                <div className={cx('text')}>
                                    <span>Bio</span>
                                </div>
                                <div className={cx('input')}>
                                    <textarea
                                        value={userInfo.bio}
                                        id="bio"
                                        onChange={handleChangeInput}
                                    ></textarea>
                                </div>
                            </div>
                        </div>
                        <div className={cx('edit-hightlightImage')}>
                            <HightLightImg
                                user={userInfo}
                                setUserInfo={setUserInfo}
                            />
                            <div className={cx('btn-save')}>
                                <Button
                                    onClick={handleSave}
                                    variant="contained"
                                    size="large"
                                    sx={{
                                        fontSize: 14,
                                        width: 120,
                                        backgroundColor: '#FF4458',
                                        ':hover': {
                                            bgcolor: '#FE4A4F',
                                            color: 'white',
                                        },
                                    }}
                                >
                                    Lưu
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {popupHobby && (
                <EditHobby
                    user={userInfo}
                    setUserInfo={setUserInfo}
                    setPopupHobby={setPopupHobby}
                />
            )}
            {loading && <Loading />}
        </div>
    )
}

export default PopupEditProfile
