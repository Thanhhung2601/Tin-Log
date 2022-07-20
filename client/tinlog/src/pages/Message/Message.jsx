import React, { useEffect, useRef, useState } from 'react'
import styles from './Message.module.scss'
import classNames from 'classnames/bind'
import { useNavigate, useParams } from 'react-router-dom'
import { AiOutlineCloseCircle } from 'react-icons/ai'
import ProfileCard from '../../components/EditProfile/ProfileCard/ProfileCard'
import { useSelector } from 'react-redux'
import {
    getAllMessage,
    getConversationById,
    getUserById,
    sendmessage,
} from '../../api'
import { io } from 'socket.io-client'
import noAvatar from '../../images/fleava.jpg'
import moment from 'moment'
import Messenger from '../../components/Messenger/Messenger'

const cx = classNames.bind(styles)

const Message = () => {
    const [conversation, setConversation] = useState(null)
    const [userMatch, setUserMatch] = useState(null)
    const [messages, setMessages] = useState([])
    const [newMessage, setNewMessage] = useState('')
    const [arraivalMessage, setArraivalMessage] = useState(null)
    const navigate = useNavigate()
    const { user } = useSelector((state) => state.userInfo)
    const { id } = useParams()
    const scrollRef = useRef()
    const socket = useRef()

    useEffect(() => {
        socket.current = io('ws://localhost:8900')
        socket.current.on('getMessage', (data) => {
            console.log('getMessage run')
            setArraivalMessage({
                sender: data.senderId,
                text: data.text,
                createdAt: Date.now(),
            })
        })

        const getData = async () => {
            const { data: conversation } = await getConversationById(id)
            const userId = conversation.members.find((it) => it !== user._id)
            const { data: userMatch } = await getUserById({ userId })
            const { data: messages } = await getAllMessage(conversation._id)
            setConversation(conversation)
            setUserMatch(userMatch)
            setMessages(messages)
        }
        getData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    console.log('messages', messages)

    useEffect(() => {
        console.log('setMessages in effect run')
        arraivalMessage && setMessages((prev) => [...prev, arraivalMessage])
    }, [arraivalMessage])

    useEffect(() => {
        console.log('runn')
        socket.current.emit('addUser', user._id)
        socket.current.on('getUser', (users) => {
            console.log(users)
        })
    }, [user])

    useEffect(() => {
        scrollRef.current?.scrollIntoView({
            behavior: 'smooth',
        })
    }, [messages])

    const handleSendMessage = async () => {
        if (!newMessage) return
        const message = {
            sender: user._id,
            text: newMessage,
            conversationId: conversation._id,
        }
        const receiverId = conversation.members.find(
            (member) => member !== user._id
        )

        socket.current.emit('sendMessage', {
            senderId: user._id,
            receiverId,
            text: newMessage,
        })
        try {
            const res = await sendmessage(message)
            console.log('setMessages in func run')
            setMessages([...messages, res.data])
            setNewMessage('')
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className={cx('message-wrapper')}>
            <div className={cx('message-content-left')}>
                <div className={cx('message-content-header')}>
                    <div className={cx('header-img')}>
                        <img src={userMatch?.profileImage || noAvatar} alt="" />
                    </div>
                    <div className={cx('header-infoDate')}>
                        <p>
                            Bạn đã tương hợp với {userMatch?.userName} vào ngày
                            <span>
                                {moment(userMatch?.createdAt).format(
                                    'DD/MM/YYYY'
                                )}
                            </span>
                        </p>
                    </div>
                    <div
                        className={cx('header-icon')}
                        onClick={() => navigate('/app')}
                    >
                        <AiOutlineCloseCircle />
                    </div>
                </div>
                <div
                    className={cx('message-body', {
                        centerInfo: messages.length === 0,
                    })}
                >
                    {messages.length > 0 ? (
                        <div className="message">
                            {messages.map((message, index) => {
                                let checkUser = user._id === message.sender
                                return (
                                    <div
                                        ref={scrollRef}
                                        key={index + Math.random()}
                                    >
                                        <Messenger
                                            own={checkUser}
                                            message={message}
                                            user={checkUser ? user : userMatch}
                                        />
                                    </div>
                                )
                            })}
                        </div>
                    ) : (
                        <div className={cx('no-message')}>
                            <div className={cx('no-message-inner')}>
                                <div className={cx('title')}>
                                    <p>
                                        Bạn đã tương hợp với{' '}
                                        <span>{userMatch?.userName}</span>
                                    </p>
                                </div>
                                <div className={cx('img-color-wrapper')}>
                                    <div className={cx('image')}>
                                        <img
                                            src={
                                                userMatch?.profileImage ||
                                                noAvatar
                                            }
                                            alt=""
                                        />
                                    </div>
                                    <div className={cx('icon')}>
                                        <svg
                                            focusable="false"
                                            aria-hidden="false"
                                            role="img"
                                            viewBox="0 0 24 24"
                                            width="50px"
                                            height="50px"
                                            className="Expand"
                                            stroke="#fff"
                                            strokeLinecap="round"
                                            aria-labelledby="f3e224fa55787af0"
                                        >
                                            <path
                                                d="M2.16 7.354h6.37a5.947 5.947 0 00-.894 2.084H2.16c-.406.04-.8-.15-1.015-.49a1.04 1.04 0 010-1.114c.215-.341.61-.532 1.015-.491v.01zm1.68 6.263c-.406.04-.8-.15-1.015-.49a1.04 1.04 0 010-1.114c.215-.34.61-.531 1.015-.49h3.796c.077.375.186.751.35 1.106l.021.043.022.043.546.902H3.84zm2.476 4.18c-.59 0-1.069-.472-1.069-1.053 0-.582.479-1.053 1.07-1.053h3.49l1.266 2.106H6.316zm13.746-1.837l-6.36 2.89a.495.495 0 01-.611-.183l-3.971-6.5a4.132 4.132 0 01-.185-3.02C9.556 7.183 11.127 6 12.949 6c.404 0 .818.064 1.233.183 1.222.365 1.745.999 2.476 2.299a5.271 5.271 0 012.346-.73c.327 0 .665.064 1.047.171 2.29.677 3.382 2.901 2.618 5.297a4.287 4.287 0 01-1.909 2.396l-.153.086-.152.075-.393.183z"
                                                fill="#f0c650"
                                            ></path>
                                            <title id="f3e224fa55787af0">
                                                Người Thích Bạn
                                            </title>
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
                <div className={cx('send-message')}>
                    <div className={cx('cur')}>
                        <span>
                            <svg
                                focusable="false"
                                aria-hidden="true"
                                role="presentation"
                                viewBox="0 0 24 24"
                                width="40px"
                                height="40px"
                                className="Sq(40px) My(8px)"
                            >
                                <g fillRule="nonzero" fill="none">
                                    <g fill="#f0f2f4">
                                        <path d="M2 12c0 5.524 4.477 10 10 10s10-4.476 10-10c0-5.523-4.477-10-10-10C6.477 2 2 6.477 2 12z"></path>
                                        <g transform="translate(7.162 9.006)">
                                            <circle
                                                cx="1.977"
                                                cy="1.412"
                                                r="1.412"
                                            ></circle>
                                            <path d="M3.953 5.96c0-1.715-.885-3.106-1.976-3.106C.885 2.854 0 4.245 0 5.961"></path>
                                        </g>
                                    </g>
                                    <path
                                        d="M17.218 9.175a3.616 3.616 0 0 0-.487-.032H9.303a3.46 3.46 0 0 0-2.345.896 2.946 2.946 0 0 0-.971 2.164v.156c0 .242.03.479.088.705C5.393 12.536 5 11.756 5 10.934v-.152C5 9.245 6.35 8 8.014 8h6.743c1.016 0 1.915.465 2.461 1.175zm-7.338.551h6.105c1.665 0 3.014 1.245 3.015 2.781v.711C19 14.755 17.65 16 15.986 16H9.881c-1.665 0-3.014-1.246-3.014-2.782v-.71c0-1.537 1.35-2.782 3.014-2.782H9.88zm.22 3.214c.422 0 .764-.322.764-.72 0-.397-.342-.72-.763-.72-.422 0-.763.323-.763.72 0 .398.341.72.763.72zm.025.278c-.719 0-1.17.359-1.354 1.076a.133.133 0 0 0 .028.12c.03.035.074.054.121.054h2.33a.159.159 0 0 0 .117-.05.134.134 0 0 0 .034-.114c-.128-.724-.553-1.086-1.276-1.086zm2.946-1.717c-.294 0-.533.22-.533.492v.015c0 .272.239.492.533.492h3.241c.295 0 .533-.22.533-.492v-.015c0-.272-.238-.492-.533-.492h-3.24zm0 1.5a.557.557 0 0 0-.377.144.474.474 0 0 0-.156.348v.015c0 .13.056.256.156.348.1.093.236.145.377.145h1.087c.295 0 .533-.22.533-.493v-.015c0-.272-.238-.492-.533-.492h-1.087z"
                                        fill="#47a1ff"
                                    ></path>
                                </g>
                            </svg>
                        </span>
                        <span>
                            <svg
                                focusable="false"
                                aria-hidden="true"
                                role="presentation"
                                viewBox="0 0 24 24"
                                width="40px"
                                height="40px"
                                className="Sq(40px) My(8px)"
                            >
                                <g
                                    transform="translate(2 2)"
                                    fillRule="nonzero"
                                    fill="none"
                                >
                                    <circle
                                        fill="#f0f2f4"
                                        cx="10"
                                        cy="10"
                                        r="10"
                                    ></circle>
                                    <path
                                        d="M6.844 13c.97 0 1.73-.434 2.275-1.094V9.683H6.57v1.077h1.41v.694c-.216.217-.665.443-1.137.443-.97 0-1.674-.807-1.674-1.901 0-1.094.704-1.902 1.674-1.902.569 0 1.025.347 1.265.755l.946-.555C8.655 7.608 7.957 7 6.844 7 5.282 7 4 8.164 4 9.996 4 11.819 5.282 13 6.844 13zm4.318-.113V7.096h-1.138v5.791h1.138zm2.194 0v-2.396h2.588V9.405h-2.588V8.181H16V7.096h-3.781v5.791h1.137z"
                                        fill="#47a1ff"
                                    ></path>
                                </g>
                            </svg>
                        </span>
                        <span>
                            <svg
                                focusable="false"
                                aria-hidden="true"
                                role="presentation"
                                viewBox="0 0 24 24"
                                width="40px"
                                height="40px"
                                className="Sq(40px) My(8px)"
                            >
                                <g fill="none" fillRule="evenodd">
                                    <g fill="#f0f2f4" fillRule="nonzero">
                                        <path d="M2 12c0 5.524 4.477 10 10 10s10-4.476 10-10c0-5.523-4.477-10-10-10S2 6.477 2 12z"></path>
                                        <g transform="translate(7.162 9.006)">
                                            <circle
                                                cx="1.977"
                                                cy="1.412"
                                                r="1.412"
                                            ></circle>
                                            <path d="M3.953 5.96c0-1.715-.885-3.106-1.976-3.106C.885 2.854 0 4.245 0 5.961"></path>
                                        </g>
                                    </g>
                                    <path
                                        d="M5.804 9.129a.222.222 0 010-.408l.02-.009A3.101 3.101 0 007.535 6.9l.017-.047a.222.222 0 01.418 0l.016.047a3.101 3.101 0 001.71 1.813l.021.01c.18.075.18.33 0 .407l-.02.009a3.101 3.101 0 00-1.71 1.813l-.017.047a.222.222 0 01-.418 0l-.016-.047a3.101 3.101 0 00-1.71-1.813l-.021-.01zm10.774 4.521c.273-.273.09-.73-.296-.702-1.21.089-2.135.448-2.76 1.073-.627.626-.986 1.552-1.074 2.761-.028.385.429.57.702.296l3.428-3.428zM6.209 12.48c0-.604.093-1.186.265-1.733.192.246.347.522.457.818.285.77 1.373.77 1.658 0a3.122 3.122 0 011.745-1.793c.752-.307.752-1.387 0-1.693a3.135 3.135 0 01-1.049-.703 5.745 5.745 0 012.694-.666c2.847 0 5.212 2.088 5.684 4.803.046.268-.18.495-.452.486-1.934-.06-3.403.375-4.37 1.343-.915.915-1.377 2.278-1.377 4.06 0 .102.002.205.005.31.008.272-.219.498-.487.451A5.771 5.771 0 016.21 12.48z"
                                        fill="#9908e8"
                                    ></path>
                                </g>
                            </svg>
                        </span>
                        <span>
                            <svg
                                focusable="false"
                                aria-hidden="true"
                                role="presentation"
                                viewBox="0 0 24 24"
                                width="40px"
                                height="40px"
                                className="Sq(40px) My(8px)"
                            >
                                <g fillRule="nonzero" fill="none">
                                    <path
                                        d="M12 2C6.477 2 2 6.477 2 12c0 5.524 4.477 10 10 10s10-4.477 10-10S17.523 2 12 2z"
                                        fill="#f0f2f4"
                                    ></path>
                                    <path
                                        d="M15.183 7.006l-5.835.786a.72.72 0 0 0-.62.716v5.466a2.325 2.325 0 0 0-.944-.104c-1.066.104-1.866.897-1.777 1.75.078.862 1.011 1.472 2.077 1.369 1.067-.104 1.866-.897 1.777-1.76 0-.013 0-.024-.01-.047l.01-4.982c0-.18.13-.331.304-.358l4.286-.65a.354.354 0 0 1 .285.084.364.364 0 0 1 .124.273v3.815a2.325 2.325 0 0 0-.944-.103c-1.067.103-1.866.897-1.777 1.76.077.863 1.01 1.473 2.077 1.37 1.066-.104 1.866-.898 1.777-1.761-.007.007-.007-2.295-.001-6.906a.727.727 0 0 0-.244-.545.708.708 0 0 0-.565-.173z"
                                        fill="#1bd760"
                                    ></path>
                                </g>
                            </svg>
                        </span>
                    </div>
                    <div className={cx('input-value')}>
                        <input
                            type="text"
                            placeholder="Nhập tin nhắn"
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                        />
                    </div>
                    <div className={cx('space-send')}>
                        <span className={cx('icon')}>
                            <svg
                                focusable="false"
                                aria-hidden="true"
                                role="presentation"
                                viewBox="0 0 24 24"
                                width="40px"
                                height="40px"
                                className="Sq(40px) My(8px)"
                            >
                                <g fill="none" fillRule="nonzero">
                                    <circle
                                        cx="10"
                                        cy="10"
                                        r="10"
                                        transform="translate(2 2)"
                                        fill="#f0f2f4"
                                    ></circle>
                                    <path
                                        d="M12 15.3c1.398 0 2.58-.876 3.066-2.1H8.934A3.298 3.298 0 0012 15.3m-2.1-3.9a.9.9 0 100-1.8.9.9 0 000 1.8m4.2 0a.9.9 0 100-1.8.9.9 0 000 1.8M12 16.8a4.8 4.8 0 110-9.6 4.8 4.8 0 010 9.6M12 6a6 6 0 100 12 6 6 0 000-12z"
                                        fill="#f8a81f"
                                    ></path>
                                </g>
                            </svg>
                        </span>
                        <span
                            className={cx('btn-send', {
                                active: newMessage,
                            })}
                            onClick={handleSendMessage}
                        >
                            Gửi
                        </span>
                    </div>
                </div>
            </div>
            <div className={cx('message-cardUserInfo')}>
                <ProfileCard user={userMatch} uiConversation={true} />
                <div className={cx('cancel-match')}>
                    <p>hủy tương hợp</p>
                </div>
            </div>
        </div>
    )
}

export default Message
