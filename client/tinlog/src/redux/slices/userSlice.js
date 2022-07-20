import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getUser, register, updateProfile } from '../../api'
import { toast } from 'react-toastify'

const initialState = {
    user: null,
    loading: false,
    selectGender: 'All',
    ageRange: [18, 26],
}

const userSlice = createSlice({
    name: 'userSlice',
    initialState,
    reducers: {
        logOut(state, action) {
            state.user = null
            action.payload.navigate('/')
        },
        selectRangeAge(state, action) {
            state.ageRange = action.payload
        },
        selectGender(state, action) {
            state.selectGender = action.payload
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchUser.fulfilled, (state, action) => {
            console.log('data from builder', action.payload)
            state.user = action.payload.userData
            action.payload.navigate('/app')
            toast.success('Welcome to Tin-Log ❤️', {
                autoClose: 2500,
                position: 'top-right',
                hideProgressBar: true,
            })
        })
        builder.addCase(fetchUser.rejected, (state, action) => {
            toast.error(`${action.error.message}`, {
                autoClose: 3000,
                position: 'bottom-right',
            })
        })
        builder.addCase(registerUser.fulfilled, (state, action) => {
            toast.success(
                'You have successfully registered , let connect with us ❤️',
                {
                    autoClose: 5000,
                }
            )
        })
        builder.addCase(registerUser.rejected, (state, action) => {
            toast.error(`${action.error.message}`, {
                autoClose: 3000,
                position: 'bottom-right',
            })
        })
        builder.addCase(updateProfileUser.pending, (state, action) => {
            state.loading = true
        })
        builder.addCase(updateProfileUser.fulfilled, (state, action) => {
            state.user = action.payload.data[0]
            state.loading = false
        })
        builder.addCase(updateProfileUser.rejected, (state, action) => {
            toast.error(`${action.error.message}`)
            state.loading = false
        })
    },
})

export const fetchUser = createAsyncThunk(
    'userSlice/fetchUser',
    async (userData) => {
        console.log(userData)
        try {
            const res = await getUser(userData.valueLogin)
            return { userData: res.data, navigate: userData.navigate, res }
        } catch (error) {
            console.log(error)
            const customError = {
                name: 'Custom axios error',
                message: error.response.data.message,
            }
            throw customError
        }
    }
)

export const registerUser = createAsyncThunk(
    'userSlice/registerUser',
    async (userData) => {
        try {
            const res = await register(userData)
            return res
        } catch (error) {
            console.log(error)
            const customError = {
                name: 'Custom axios error',
                message: error.response.data.message,
            }
            throw customError
        }
    }
)

export const updateProfileUser = createAsyncThunk(
    'userSlice/updateProfile',
    async (userInfo) => {
        try {
            const res = await updateProfile(userInfo)
            return res
        } catch (error) {
            console.log(error)
            const customError = {
                name: 'Custom axios error',
                message: error.response.data.message,
            }
            throw customError
        }
    }
)

export const actions = userSlice.actions
export default userSlice.reducer
