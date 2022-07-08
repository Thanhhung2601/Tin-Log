import React, { useEffect, useState } from 'react'
import styles from './HightLightImg.module.scss'
import classNames from 'classnames/bind'
import { MdClose, MdAdd } from 'react-icons/md'
import { useRef } from 'react'

const cx = classNames.bind(styles)

const HightLightImg = ({ user, setUserInfo }) => {
    const [hightLightImg, setHightLightImg] = useState(user.highlightImage)
    const [countImg, setCountImg] = useState(null)

    const inputRef = useRef()

    useEffect(() => {
        setCountImg(hightLightImg.length)
    }, [])

    useEffect(() => {
        if (hightLightImg.length === 6) return
        const fill = new Array(6 - hightLightImg.length).fill(0)
        setHightLightImg(hightLightImg.concat(fill))
        // eslint-disable-next-line
    }, [hightLightImg])

    const getBase64 = (file) => {
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
    const handleFileInputChange = (e) => {
        const file = e.target.files[0]
        getBase64(file)
            .then((result) => {
                const index = hightLightImg.findIndex((item) => !item)
                const arrClone = [...hightLightImg]
                arrClone[index] = result
                setHightLightImg(arrClone)
                setUserInfo({ ...user, highlightImage: arrClone })
                setCountImg(countImg + 1)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const handleAdd = () => {
        inputRef.current.click()
    }

    const handleDelete = (pos) => {
        const filterImg = hightLightImg.filter((item, index) => index !== pos)
        setHightLightImg(filterImg)
        setUserInfo({ ...user, highlightImage: filterImg })
        setCountImg(countImg - 1)
    }

    return (
        <>
            <div className={cx('title')}>
                <span>Ảnh nổi bật ({countImg} / 6)</span>
            </div>
            <div className={cx('edit-hightLightImg')}>
                {hightLightImg.map((img, index) => {
                    return (
                        <div key={index} className={cx('img-item')}>
                            {img ? (
                                <>
                                    <img src={img} alt="" />

                                    <div
                                        className={cx('icon-action', 'delete')}
                                        onClick={() => handleDelete(index)}
                                    >
                                        <MdClose />
                                    </div>
                                </>
                            ) : (
                                <div
                                    className={cx('wrapper')}
                                    onClick={handleAdd}
                                >
                                    <div className={cx('icon-action', 'add')}>
                                        <MdAdd />
                                    </div>
                                </div>
                            )}
                        </div>
                    )
                })}
                <input
                    ref={inputRef}
                    type="file"
                    name="file"
                    onChange={handleFileInputChange}
                    className={cx('inputFile')}
                />
            </div>
        </>
    )
}

export default HightLightImg
