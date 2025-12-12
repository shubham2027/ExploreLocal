import mongoose from 'mongoose';

const tripSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    title: {
        type: String,
        required: true,
        trim: true
    },
    location: {
        type: String,
        required: true
    },
    startDate: {
        type: Date
    },
    endDate: {
        type: Date
    },
    guests: {
        type: Number,
        required: true,
        default: 1,
        min: 1
    },
    experiences: [{
        experience: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Experience'
        },
        plannedDate: {
            type: Date
        },
        notes: {
            type: String
        }
    }]
}, {
    timestamps: true
});

const Trip = mongoose.model('Trip', tripSchema);

export default Trip;
