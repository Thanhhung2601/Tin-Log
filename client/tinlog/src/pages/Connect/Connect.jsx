import React, { useEffect } from 'react'
import styles from './Connect.module.scss'
import classNames from 'classnames/bind'
import { Button, TextField } from '@mui/material'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { actions, fetchUser, registerUser } from '../../redux/slices/userSlice'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { LinearProgress } from '@mui/material'
import loginVideo from '../../video/login.mp4'

const cx = classNames.bind(styles)

const Connect = () => {
    const [isLogin, setIsLogin] = useState(true)
    const [valueLogin, setValueLogin] = useState({
        email: '',
        password: '',
    })
    const [valueRegister, setValueRegister] = useState({
        email: '',
        password: '',
        userName: '',
        confirmPassword: '',
    })

    console.log(valueRegister)

    const { userInfo } = useSelector((state) => state)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleLogin = () => {
        dispatch(fetchUser({ valueLogin, navigate }))
    }

    const handleRegister = async () => {
        await dispatch(registerUser(valueRegister))
        setIsLogin(true)
    }
    useEffect(() => {
        if (userInfo.user) {
            navigate('/app')
        }
    }, [])
    return (
        <div className={cx('login-register')}>
            <video src={loginVideo} autoPlay loop muted></video>
            <div className={cx('login-register-insite')}>
                <div className={cx('title')}>
                    <div
                        className={cx('t-login', {
                            active: isLogin,
                        })}
                        onClick={() => setIsLogin(true)}
                    >
                        <h2>Login</h2>
                        {isLogin && (
                            <LinearProgress
                                sx={{
                                    backgroundColor: '#d9d9d9',
                                    color: 'black',
                                    '& .MuiLinearProgress-bar': {
                                        backgroundColor: 'black',
                                    },
                                }}
                            />
                        )}
                    </div>
                    <div
                        className={cx('t-register', {
                            active: !isLogin,
                        })}
                        onClick={() => setIsLogin(false)}
                    >
                        <h2>Register</h2>
                        {!isLogin && (
                            <LinearProgress
                                sx={{
                                    backgroundColor: '#d9d9d9',
                                    color: 'black',
                                    '& .MuiLinearProgress-bar': {
                                        backgroundColor: 'black',
                                    },
                                }}
                            />
                        )}
                    </div>
                </div>
                <div
                    className={cx('login', {
                        active: isLogin,
                    })}
                >
                    <form action="" className={cx('login-form')}>
                        <div className={cx('form-group')}>
                            <input
                                type="email"
                                placeholder="Email"
                                value={valueLogin.email}
                                onChange={(e) =>
                                    setValueLogin({
                                        ...valueLogin,
                                        email: e.target.value,
                                    })
                                }
                            />
                        </div>
                        <div className={cx('form-group')}>
                            <input
                                type="password"
                                placeholder="Password"
                                value={valueLogin.password}
                                onChange={(e) =>
                                    setValueLogin({
                                        ...valueLogin,
                                        password: e.target.value,
                                    })
                                }
                            />
                        </div>
                    </form>
                </div>
                <div
                    className={cx('register', {
                        active: !isLogin,
                    })}
                >
                    <form action="" className={cx('login-form')}>
                        <div className={cx('form-group')}>
                            <input
                                type="text"
                                placeholder="Username"
                                value={valueRegister.userName}
                                onChange={(e) =>
                                    setValueRegister({
                                        ...valueRegister,
                                        userName: e.target.value,
                                    })
                                }
                            />
                        </div>
                        <div className={cx('form-group')}>
                            <input
                                type="email"
                                placeholder="Email"
                                value={valueRegister.email}
                                onChange={(e) =>
                                    setValueRegister({
                                        ...valueRegister,
                                        email: e.target.value,
                                    })
                                }
                            />
                        </div>
                        <div className={cx('form-group')}>
                            <input
                                type="password"
                                placeholder="Password"
                                value={valueRegister.password}
                                onChange={(e) =>
                                    setValueRegister({
                                        ...valueRegister,
                                        password: e.target.value,
                                    })
                                }
                            />
                        </div>
                        <div className={cx('form-group')}>
                            <input
                                type="password"
                                placeholder="ConfirmPassword"
                                value={valueRegister.confirmPassword}
                                onChange={(e) =>
                                    setValueRegister({
                                        ...valueRegister,
                                        confirmPassword: e.target.value,
                                    })
                                }
                            />
                        </div>
                    </form>
                </div>
                <div className={cx('btn-action')}>
                    <Button
                        variant="contained"
                        size="large"
                        sx={{
                            fontSize: 14,
                            width: 120,
                            backgroundColor: 'black',
                            ':hover': {
                                bgcolor: 'black',
                                color: 'white',
                            },
                        }}
                        disabled={
                            isLogin
                                ? !valueLogin.email || !valueLogin.password
                                    ? true
                                    : false
                                : !valueRegister.email ||
                                  !valueRegister.password ||
                                  !valueRegister.userName ||
                                  !valueRegister.confirmPassword
                        }
                        onClick={isLogin ? handleLogin : handleRegister}
                    >
                        {isLogin ? 'SignIn' : 'SignUp'}
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default Connect
