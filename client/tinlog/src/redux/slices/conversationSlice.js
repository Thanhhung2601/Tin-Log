import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import {
    addConversation,
    getAllConversation,
    getConversationById,
} from '../../api'

const initialState = {
    conversationFilterdMatch: [],
    conversation: [],
}

const conversationSlice = createSlice({
    name: 'conversationSlice',
    initialState,
    reducers: {
        filterMatchConversation(state, action) {
            const match = []
            for (let index = 0; index < state.conversation.length; index++) {
                for (
                    let index2 = index + 1;
                    index2 < state.conversation.length;
                    index2++
                ) {
                    if (
                        state.conversation[index].members[0] ===
                            state.conversation[index2].members[1] &&
                        state.conversation[index].members[1] ===
                            state.conversation[index2].members[0]
                    ) {
                        match.push(state.conversation[index])
                    }
                }
            }
            const filterdMatch = match.filter((item) => {
                let check = item.members.some(
                    (member) => member === action.payload._id
                )
                if (check) {
                    return item
                }
            })
            state.conversationFilterdMatch = filterdMatch
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getAllConversationAction.fulfilled, (state, action) => {
            state.conversation = action.payload
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
            return data
        } catch (error) {
            console.log(error)
        }
    }
)

export const actions = conversationSlice.actions
export default conversationSlice.reducer
