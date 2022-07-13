import React, { useState } from 'react'
import styles from './SelectGender.module.scss'
import classNames from 'classnames/bind'
import {
    FormControl,
    Radio,
    RadioGroup,
    FormLabel,
    FormControlLabel,
} from '@mui/material'
import { styled } from '@mui/material/styles'
import { useDispatch } from 'react-redux'
import { actions } from '../../../redux/slices/userSlice'

const CustomFormControllLabel = styled(FormControlLabel)(({ theme }) => ({
    '& .MuiTypography-body1': {
        fontSize: '1.6rem',
    },
}))

const CustomRadioGrop = styled(RadioGroup)(({ theme }) => ({
    flexDirection: 'row',
}))

const cx = classNames.bind(styles)

const SelectGender = ({ selectGender }) => {
    console.log(selectGender)
    const dispatch = useDispatch()
    const handleChange = (event) => {
        dispatch(actions.selectGender(event.target.value))
    }

    return (
        <div className={cx('selectGender')}>
            <FormControl>
                <h4>Đang tìm kiếm :</h4>

                <CustomRadioGrop
                    aria-labelledby="demo-controlled-radio-buttons-group"
                    name="controlled-radio-buttons-group"
                    value={selectGender}
                    onChange={handleChange}
                >
                    <CustomFormControllLabel
                        value="male"
                        control={
                            <Radio
                                color="default"
                                sx={{
                                    '& .MuiSvgIcon-root': {
                                        fontSize: 24,
                                    },
                                }}
                            />
                        }
                        label="Nam"
                    />
                    <CustomFormControllLabel
                        value="female"
                        control={
                            <Radio
                                sx={{
                                    '& .MuiSvgIcon-root': {
                                        fontSize: 24,
                                    },
                                    color: '#fd267a',
                                    '&.Mui-checked': {
                                        color: '#fd267a',
                                    },
                                }}
                            />
                        }
                        label="Nữ"
                    />
                    <CustomFormControllLabel
                        value="other"
                        control={
                            <Radio
                                sx={{
                                    '& .MuiSvgIcon-root': {
                                        fontSize: 24,
                                    },
                                }}
                            />
                        }
                        label="Khác"
                    />
                </CustomRadioGrop>
            </FormControl>
        </div>
    )
}

export default SelectGender
