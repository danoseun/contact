import mongoose, { Schema } from 'mongoose';

export const ContactSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user'
     },
      firstname: {
        type: String,
        trim: true,
        required: true,
      },
      lastname: {
        type: String,
        trim: true,
        required: true,
      },
      companyName: {
        type: String,
        trim: true,
        required: true,
      },
      houseAddress: {
        type: String,
        trim: true,
        required: true,
      },
      emailAddress: {
        type: String,
        trim: true,
        index: true,
        unique: true,
        required: true,
      },
      mobile: {
        type: String,
        required: true,
      }
    },
    { collection: "contacts" }
  );

export default mongoose.model('Contact', ContactSchema);
