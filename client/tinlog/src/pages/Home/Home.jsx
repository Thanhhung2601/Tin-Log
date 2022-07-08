import React from 'react'
import styles from './Home.module.scss'
import classNames from 'classnames/bind'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import audio from '../../audio/MSTrim.mp3'

const cx = classNames.bind(styles)

const Home = () => {
    const navigate = useNavigate()
    const { userInfo } = useSelector((state) => state)

    console.log(userInfo)

    useEffect(() => {
        if (userInfo.user) {
            navigate('/app')
        }
    }, [])

    return (
        <div className={cx('hehe')}>
            <h2>Home</h2>
        </div>
    )
}

export default Home
