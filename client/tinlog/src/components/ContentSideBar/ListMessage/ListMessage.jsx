import React from 'react'
import styles from './ListMessage.module.scss'
import classNames from 'classnames/bind'
import { useState } from 'react'
import InfoMessage from './InfoMessage/InfoMessage'

const cx = classNames.bind(styles)

const ListMessage = ({ user, conversation }) => {
    const [showNoMessage, setshowNoMessage] = useState(0)

    console.log('listmessage render')

    return (
        <div className={cx('listMessage')}>
            <div
                className={cx('no-message', {
                    showNoMessage,
                })}
            >
                <div className={cx('icon')}>
                    <svg
                        className=" Mend(20px) Animdur($xslow) animn-grow"
                        width="157"
                        height="146"
                    >
                        <path
                            d="M136.502 59.666c7.274 0 14.2 1.284 20.498 3.585C156.08 28.194 121.312 0 78.52 0 35.156 0 0 28.952 0 64.67c0 23.096 14.714 43.355 36.833 54.793v23.427c0 2.71 2.05 3.873 4.557 2.584l31.714-16.304c1.135.062 2.282.079 3.425.106.17.064.17.064 1.992.064.974 0 1.948-.03 2.909-.069 3.71-.116 7.325-.5 10.887-1.017-5.121-6.913-8.128-15.08-8.128-23.85 0-24.669 23.469-44.738 52.313-44.738z"
                            fill="#ECEEF0"
                            fillRule="evenodd"
                        ></path>
                    </svg>
                    <svg
                        focusable="false"
                        aria-hidden="true"
                        role="presentation"
                        viewBox="0 0 79 72"
                        width="79px"
                        height="72px"
                        className={cx('custom-icon')}
                    >
                        <path
                            d="M137.5 72C115.685 72 98 86.459 98 104.292c0 17.835 17.685 32.291 39.5 32.291h.918c.013 0 .028-.024.041-.03.59-.014 1.183-.021 1.765-.056l4.573 2.334h.003l9.098 4.645c2.516 1.284 4.575.126 4.575-2.574v-9.251C169.6 125.94 177 115.825 177 104.29 177 86.46 159.315 72 137.5 72"
                            transform="translate(-98 -72)"
                            fill="#FF4754"
                            fillRule="evenodd"
                        ></path>
                    </svg>
                </div>
                <div className={cx('title')}>
                    <h2>Gửi lời chào</h2>
                </div>
                <div className={cx('text')}>
                    <p>
                        Bạn đang tìm cách bắt chuyện? Khi đã tương hợp, bạn có
                        thể gửi tin nhắn cho họ tại mục "Các Tương Hợp"
                    </p>
                </div>
            </div>

            {conversation.map((conv, index) => {
                let userId = conv.members.find((it) => it !== user._id)

                return (
                    <InfoMessage
                        key={index}
                        conversationId={conv._id}
                        userId={userId}
                        showNoMessage={showNoMessage}
                        setshowNoMessage={setshowNoMessage}
                    />
                )
            })}
        </div>
    )
}

export default ListMessage
