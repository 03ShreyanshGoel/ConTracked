import mongoose from "mongoose";

const BookmarkSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    contest: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Contest',
        required: true
    },
    notes: {
        type: String,
        default: ''
    }
}, {
    timestamps: true
});

// Index for faster querying
BookmarkSchema.index({ user: 1, contest: 1 }, { unique: true });

export default mongoose.model('Bookmark', BookmarkSchema);