// const userSchema = new Schema({
//     firstName: String,
//     require: true,
//     lastName: String,
//     require: true,
//     email: String,
//     require: true,
//     lowercase: true,
//     password: String,
//     require: true,
//     min: 3,
//     max: 40,
//     lowercase: true,
//     cars: [{
//         type: Schema.Types.ObjectId,
//         ref: 'car'
//     }]
// });

// const User = mongoose.model('user', userSchema);
// module.exports = User;

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

// Create a schema
const userSchema = new Schema({
    methods: {
        type: [String],
        required: true
    },
    local: {
        firstName: {
            type: String,
            require: true,
            lowercase: true
        },
        lastName: {
            type: String,
            require: true,
            lowercase: true
        },
        email: {
            type: String,
            lowercase: true
        },
        password: {
            type: String,
            require: true
        }
    },
    google: {
        id: {
            type: String
        },
        email: {
            type: String,
            lowercase: true
        }
    },
    facebook: {
        id: {
            type: String
        },
        email: {
            type: String,
            lowercase: true
        }
    },
    cars: [{
        type: Schema.Types.ObjectId,
        ref: 'car'
    }]
});

userSchema.pre('save', async function(next) {
    try {
        console.log('entered');
        if (!this.methods.includes('local')) {
            next();
        }
        //the user schema is instantiated
        const user = this;
        //check if the user has been modified to know if the password has already been hashed
        if (!user.isModified('local.password')) {
            next();
        }
        // Generate a salt
        const salt = await bcrypt.genSalt(10);
        // Generate a password hash (salt + hash)
        const passwordHash = await bcrypt.hash(this.local.password, salt);
        // Re-assign hashed version over original, plain text password
        this.local.password = passwordHash;
        console.log('exited');
        next();
    } catch (error) {
        next(error);
    }
});

userSchema.methods.isValidPassword = async function(newPassword) {
    try {
        return await bcrypt.compare(newPassword, this.local.password);
    } catch (error) {
        throw new Error(error);
    }
}

// Create a model
const User = mongoose.model('user', userSchema);

// Export the model
module.exports = User;