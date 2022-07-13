import React, { useState } from 'react'
import styles from './SelectRangeSlider.module.scss'
import classNames from 'classnames/bind'
import { Slider } from '@mui/material'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { actions } from '../../../redux/slices/userSlice'

const cx = classNames.bind(styles)

const SelectRangeSlider = ({ ageRange }) => {
    const dispatch = useDispatch()

    const handleChange = (event, newValue) => {
        dispatch(actions.selectRangeAge(newValue))
    }

    return (
        <div className={cx('SelectRangeSlider')}>
            <div className={cx('title')}>
                <h4>Độ tuổi ưu tiên : </h4>
                <p>{`${ageRange[0]} - ${ageRange[1]}`}</p>
            </div>
            <div className={cx('range-age')}>
                <Slider
                    getAriaLabel={() => 'Temperature range'}
                    value={ageRange}
                    onChange={handleChange}
                    valueLabelDisplay="auto"
                />
            </div>
        </div>
    )
}

export default SelectRangeSlider
