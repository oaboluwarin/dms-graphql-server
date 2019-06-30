import mongoose, { Schema } from 'mongoose';

const documentSchema = new Schema({
  title: String,
  content: String,
  access: String,
  owner: [
    {
      type: Schema.Types.ObjectId,
      ref: 'user',
      default: null
    }
  ]
});

const Documents = mongoose.model('document', documentSchema);

export default Documents;
