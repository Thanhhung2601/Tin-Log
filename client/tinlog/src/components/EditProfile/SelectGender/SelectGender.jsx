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

const CustomFormControllLabel = styled(FormControlLabel)(({ theme }) => ({
    '& .MuiTypography-body1': {
        fontSize: '1.6rem',
    },
}))

const CustomRadioGrop = styled(RadioGroup)(({ theme }) => ({
    flexDirection: 'row',
}))

const cx = classNames.bind(styles)

const SelectGender = () => {
    const [selectedValue, setSelectedValue] = useState('All')
    const handleChange = (event) => {
        setSelectedValue(event.target.value)
    }
    return (
        <div className={cx('selectGender')}>
            <FormControl>
                <h4>Đang tìm kiếm :</h4>

                <CustomRadioGrop
                    aria-labelledby="demo-controlled-radio-buttons-group"
                    name="controlled-radio-buttons-group"
                    value={selectedValue}
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
                        value="All"
                        control={
                            <Radio
                                sx={{
                                    '& .MuiSvgIcon-root': {
                                        fontSize: 24,
                                    },
                                }}
                            />
                        }
                        label="Mọi người"
                    />
                </CustomRadioGrop>
            </FormControl>
        </div>
    )
}

export default SelectGender
