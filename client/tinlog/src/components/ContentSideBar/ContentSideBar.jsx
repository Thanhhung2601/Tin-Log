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

const cx = classNames.bind(styles)
const ContentSideBar = () => {
    const [value, setValue] = useState(0)
    const lineRef = useRef()

    const handleChange = (event, newValue) => {
        setValue(newValue)
    }

    return (
        <div className={cx('list-match')}>
            <div className={cx('list-match-titleTop')}>
                <div>
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
                        <ListMatch />
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                        Tin Nhắn
                    </TabPanel>
                </div>
            </div>
        </div>
    )
}

export default ContentSideBar
