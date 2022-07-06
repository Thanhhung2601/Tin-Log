import mongoose from 'mongoose'
//{ timestamps: true }
const userSchema = mongoose.Schema({
    profileImage: { type: String, default: '' },
    highlightImage: { type: [String], default: [] },
    likes: { type: [String], default: [] },
    userName: String,
    age: { type: String, default: '' },
    sex: { type: String, default: '' },
    hobby: { type: [Object], default: [] },
    email: String,
    password: String,
    bio: String,
})

export default mongoose.model('User', userSchema)
