import mongoose, { Schema } from 'mongoose';

const documentSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  access: {
    type: String,
    required: true,
    enum: ['PUBLIC', 'PRIVATE', 'ROLE'],
    default: 'PUBLIC'
  },
  owner: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'user'
  }
});

const Documents = mongoose.model('document', documentSchema);

export default Documents;
