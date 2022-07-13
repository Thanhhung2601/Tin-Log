import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getAllUser } from '../../api'

const initialState = {
    community: [],
    loading: false,
}

const communitySlice = createSlice({
    name: 'communitySlice',
    initialState,
    reducers: {
        updateUser(state, action) {
            const { id, newLikes } = action.payload
            state.community = state.community.map((item) =>
                item._id === id ? { ...item, likes: newLikes } : item
            )
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchAllUser.pending, (state, action) => {
            state.loading = true
        })
        builder.addCase(fetchAllUser.fulfilled, (state, action) => {
            const { data, option } = action.payload
            console.log(data, option)
            const filter = data.filter(
                (user) =>
                    user._id !== option.filterById &&
                    user.sex === option.filterByGender &&
                    user.age >= option.filterByAgeRange[0] &&
                    user.age <= option.filterByAgeRange[1] &&
                    option.user.following.every((id) => id !== user._id)
            )
            state.community = filter
            state.loading = false
        })
        builder.addCase(fetchAllUser.rejected, (state, action) => {
            console.log('reject runn')
            state.loading = false
        })
    },
})

export const fetchAllUser = createAsyncThunk(
    'communitySlice/getAll',
    async (option) => {
        try {
            const { data } = await getAllUser()
            return { data, option }
        } catch (error) {
            throw error
        }
    }
)
export const actions = communitySlice.actions
export default communitySlice.reducer
