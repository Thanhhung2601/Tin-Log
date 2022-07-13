import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { addConversation, getAllConversation } from '../../api'

const initialState = {
    conversation: [],
}

const conversationSlice = createSlice({
    name: 'conversationSlice',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getAllConversationAction.fulfilled, (state, action) => {
            const { data, user } = action.payload
            console.log(action.payload)
            const match = []
            for (let index = 0; index < data.length; index++) {
                for (let index2 = index + 1; index2 < data.length; index2++) {
                    if (
                        data[index].members[0] === data[index2].members[1] &&
                        data[index].members[1] === data[index2].members[0]
                    ) {
                        match.push(data[index])
                    }
                }
            }
            const filterdMatch = match.filter((item) => {
                let check = item.members.some((member) => member === user._id)
                if (check) {
                    return item
                }
            })
            state.conversation = filterdMatch
        })
    },
})

export const addConversationAction = createAsyncThunk(
    'conversationSlice/add',
    async (data) => {
        try {
            const res = await addConversation(data)
        } catch (error) {}
    }
)

export const getAllConversationAction = createAsyncThunk(
    'conversationSlice/getAll',
    async (user) => {
        try {
            const { data } = await getAllConversation()
            return { data, user }
        } catch (error) {
            console.log(error)
        }
    }
)

export const actions = conversationSlice.actions
export default conversationSlice.reducer
