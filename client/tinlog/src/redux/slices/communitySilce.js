import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getAllUser } from '../../api'

const initialState = {
    community: [],
    loading: false,
}

const communitySlice = createSlice({
    name: 'communitySlice',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchAllUser.pending, (state, action) => {
            state.loading = true
        })
        builder.addCase(fetchAllUser.fulfilled, (state, action) => {
            state.community = action.payload
            state.loading = false
        })
    },
})

export const fetchAllUser = createAsyncThunk(
    'communitySlice/getAll',
    async () => {
        try {
            const { data } = await getAllUser()
            return data
        } catch (error) {}
    }
)
export const actions = communitySlice.actions
export default communitySlice.reducer
