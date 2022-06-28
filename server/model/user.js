import mongoose from 'mongoose'
//{ timestamps: true }
const userSchema = mongoose.Schema({
    profileImage: { type: String, default: '' },
    highlightImage: { type: [String], default: [] },
    likes: { type: [String], default: [] },
    userName: String,
    age: { type: String, default: '' },
    sex: { type: String, default: '' },
    hobby: { type: [String], default: [] },
    email: String,
    password: String,
})

export default mongoose.model('User', userSchema)
