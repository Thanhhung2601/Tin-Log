import React from 'react'
import styles from './ContentSidebar.module.scss'
import classNames from 'classnames/bind'
import { useRef } from 'react'
import { useEffect } from 'react'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import { a11yProps } from '../TabPanel/TabPanel'
import { useState } from 'react'
import Box from '@mui/material/Box'
import TabPanel from '../TabPanel/TabPanel'
import './Custom.scss'
import ListMatch from './ListMatch/ListMatch'
import { useDispatch, useSelector } from 'react-redux'
import { getAllConversationAction } from '../../redux/slices/conversationSlice'
import ListMessage from './ListMessage/ListMessage'

const cx = classNames.bind(styles)
const ContentSideBar = ({ user }) => {
    const [value, setValue] = useState(0)
    const { conversation } = useSelector((state) => state.conversation)
    const handleChange = (event, newValue) => {
        setValue(newValue)
    }

    console.log(conversation)

    return (
        <div className={cx('list-match')}>
            <div className={cx('list-match-titleTop')}>
                <div className={cx('list-match-inner')}>
                    <Box>
                        <Tabs
                            value={value}
                            onChange={handleChange}
                            aria-label="basic tabs example"
                        >
                            <Tab label="Tương Hợp" {...a11yProps(0)} />
                            <Tab label="Tin Nhắn" {...a11yProps(1)} />
                        </Tabs>
                    </Box>
                    <TabPanel value={value} index={0}>
                        <ListMatch user={user} conversation={conversation} />
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                        <ListMessage user={user} conversation={conversation} />
                    </TabPanel>
                </div>
            </div>
        </div>
    )
}

export default ContentSideBar
