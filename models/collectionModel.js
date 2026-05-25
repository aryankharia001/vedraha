import mongoose from 'mongoose';
import mongooseLong from 'mongoose-long';

mongooseLong(mongoose); // extend mongoose with Long type
const { Types: { Long } } = mongoose;

const collectionSchema = mongoose.Schema({
  title: { type: String, required: true },
  handle: { type: String, required: true, unique: true },
  body_html: { type: String, default: '' },
  image: {
    url: { type: String, default: '' },
    publicId: { type: String, default: '' }
  },
  imageUrl: { type: String, default: '' },
  isActive: { type: Boolean, default: true },
  sortOrder: { type: Number, default: 0 },
  seo: { metaTitle: String, metaDescription: String, keywords: [String] },
  externalCollectionId: { type: Long, unique: true, sparse: true }
}, { timestamps: true });

// Pre-save middleware for handle and externalCollectionId
collectionSchema.pre('save', function(next) {
  // Generate handle from title if missing or modified
  if (this.isModified('title') && (!this.handle || this.handle === '')) {
    this.handle = this.title
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9-]/g, '');
  }

  // Generate externalCollectionId if not present
  if (!this.externalCollectionId) {
    // Use first 15 chars of _id hex as numeric Long
    this.externalCollectionId = Long.fromNumber(
      parseInt(this._id.toString().substring(0, 15), 16)
    );
  }

  next();
});

const Collection = mongoose.model('Collection', collectionSchema);
export default Collection;
