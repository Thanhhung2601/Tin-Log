import React, { useState } from 'react'
import styles from './SelectRangeSlider.module.scss'
import classNames from 'classnames/bind'
import { Slider } from '@mui/material'

const cx = classNames.bind(styles)

const SelectRangeSlider = () => {
    const [value, setValue] = useState([18, 26])
    const handleChange = (event, newValue) => {
        setValue(newValue)
    }
    console.log(value)

    return (
        <div className={cx('SelectRangeSlider')}>
            <div className={cx('title')}>
                <h4>Độ tuổi ưu tiên : </h4>
                <p>{`${value[0]} - ${value[1]}`}</p>
            </div>
            <div className={cx('range-age')}>
                <Slider
                    getAriaLabel={() => 'Temperature range'}
                    value={value}
                    onChange={handleChange}
                    valueLabelDisplay="auto"
                />
            </div>
        </div>
    )
}

export default SelectRangeSlider
