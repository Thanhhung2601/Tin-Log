import React from 'react'
import styles from './ListMatch.module.scss'
import classNames from 'classnames/bind'
import CardMatch from './CardMatch/CardMatch'

const cx = classNames.bind(styles)

const fakeData = [
    {
        id: 1,
        userName: 'kobe2k2',
        profileImage:
            'https://scontent.fsgn2-4.fna.fbcdn.net/v/t1.6435-1/177565248_2906957672917278_1600894721905628046_n.jpg?stp=dst-jpg_p320x320&_nc_cat=109&ccb=1-7&_nc_sid=7206a8&_nc_ohc=jLpWJ1rkPX8AX97gO7E&tn=6gKIGndEmIdQctvi&_nc_ht=scontent.fsgn2-4.fna&oh=00_AT9QzgS_fSsWgXhSmHnlvR5hk63iE4zXkrP3pqwlQz2szA&oe=62E39711',
    },
    {
        id: 2,
        userName: 'Thu Hương',
        profileImage:
            'https://scontent.fsgn2-5.fna.fbcdn.net/v/t39.30808-6/272980591_3123466684589063_3043601546710835731_n.jpg?stp=dst-jpg_p843x403&_nc_cat=106&ccb=1-7&_nc_sid=8bfeb9&_nc_ohc=vu8hhpnV1NkAX-B0Wf8&_nc_ht=scontent.fsgn2-5.fna&oh=00_AT8qO3sdbQz3wSIROGN3XQLNlwq-Zb3Os4rhRaG87fGKpA&oe=62C0F453',
    },
    {
        id: 3,
        userName: 'Ánh Dương',
        profileImage:
            'https://scontent.fsgn2-4.fna.fbcdn.net/v/t39.30808-6/261301088_106266348563626_3753042623771024983_n.jpg?stp=c0.13.160.160a_dst-jpg_p160x160&_nc_cat=109&ccb=1-7&_nc_sid=574b62&_nc_ohc=9tdAUOLSBBoAX90r7oK&_nc_ht=scontent.fsgn2-4.fna&oh=00_AT_FwgppbpMQaQPMaiB5b0azSwfQ2Aa2OdprFSETHBXEDg&oe=62C01465',
    },
    {
        id: 4,
        userName: 'Ýy Nhi',
        profileImage:
            'https://scontent.fsgn2-3.fna.fbcdn.net/v/t51.36329-10/285015896_590899438924316_1960779149720012980_n.jpg?stp=dst-jpg_p296x100&_nc_cat=108&ccb=1-7&_nc_sid=ad6a45&_nc_ohc=RYHgr6MHch4AX9L2aXc&_nc_ht=scontent.fsgn2-3.fna&oh=00_AT8DALp_C2ehYEPq2-BpACmpYvedD8s10Vt9x_YaEldNxA&oe=62C0EDBE',
    },
    {
        id: 5,
        userName: 'Ýy Nhi',
        profileImage:
            'https://scontent.fsgn2-3.fna.fbcdn.net/v/t51.36329-10/285015896_590899438924316_1960779149720012980_n.jpg?stp=dst-jpg_p296x100&_nc_cat=108&ccb=1-7&_nc_sid=ad6a45&_nc_ohc=RYHgr6MHch4AX9L2aXc&_nc_ht=scontent.fsgn2-3.fna&oh=00_AT8DALp_C2ehYEPq2-BpACmpYvedD8s10Vt9x_YaEldNxA&oe=62C0EDBE',
    },
    {
        id: 6,
        userName: 'Ýy Nhi',
        profileImage:
            'https://scontent.fsgn2-3.fna.fbcdn.net/v/t51.36329-10/285015896_590899438924316_1960779149720012980_n.jpg?stp=dst-jpg_p296x100&_nc_cat=108&ccb=1-7&_nc_sid=ad6a45&_nc_ohc=RYHgr6MHch4AX9L2aXc&_nc_ht=scontent.fsgn2-3.fna&oh=00_AT8DALp_C2ehYEPq2-BpACmpYvedD8s10Vt9x_YaEldNxA&oe=62C0EDBE',
    },
    {
        id: 7,
        userName: 'Ýy Nhi',
        profileImage:
            'https://scontent.fsgn2-3.fna.fbcdn.net/v/t51.36329-10/285015896_590899438924316_1960779149720012980_n.jpg?stp=dst-jpg_p296x100&_nc_cat=108&ccb=1-7&_nc_sid=ad6a45&_nc_ohc=RYHgr6MHch4AX9L2aXc&_nc_ht=scontent.fsgn2-3.fna&oh=00_AT8DALp_C2ehYEPq2-BpACmpYvedD8s10Vt9x_YaEldNxA&oe=62C0EDBE',
    },
    {
        id: 8,
        userName: 'Ýy Nhi',
        profileImage:
            'https://scontent.fsgn2-3.fna.fbcdn.net/v/t51.36329-10/285015896_590899438924316_1960779149720012980_n.jpg?stp=dst-jpg_p296x100&_nc_cat=108&ccb=1-7&_nc_sid=ad6a45&_nc_ohc=RYHgr6MHch4AX9L2aXc&_nc_ht=scontent.fsgn2-3.fna&oh=00_AT8DALp_C2ehYEPq2-BpACmpYvedD8s10Vt9x_YaEldNxA&oe=62C0EDBE',
    },
    {
        id: 9,
        userName: 'Ýy Nhi',
        profileImage:
            'https://scontent.fsgn2-3.fna.fbcdn.net/v/t51.36329-10/285015896_590899438924316_1960779149720012980_n.jpg?stp=dst-jpg_p296x100&_nc_cat=108&ccb=1-7&_nc_sid=ad6a45&_nc_ohc=RYHgr6MHch4AX9L2aXc&_nc_ht=scontent.fsgn2-3.fna&oh=00_AT8DALp_C2ehYEPq2-BpACmpYvedD8s10Vt9x_YaEldNxA&oe=62C0EDBE',
    },
]

const ListMatch = () => {
    console.log('run')
    return (
        <div className={cx('listMatch')}>
            {fakeData.map((card) => {
                return (
                    <div className={cx('listMatch-item')} key={card.id}>
                        <CardMatch card={card} />
                    </div>
                )
            })}
        </div>
    )
}

export default ListMatch
