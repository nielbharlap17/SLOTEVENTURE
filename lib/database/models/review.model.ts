import { Schema, model, models, Document } from "mongoose";

export interface IReview extends Document {
  _id: string;
  quote: string;
  name: string;
  role: string;
  avatar: string;
  rating: number;
  bgColor: string;
  event: { _id: string, title: string };
  user: { _id: string, firstName: string, lastName: string };
  createdAt: Date;
}

const ReviewSchema = new Schema({
  quote: { type: String, required: true },
  name: { type: String, required: true },
  role: { type: String, default: 'Attendee' },
  avatar: { type: String, default: '' },
  rating: { type: Number, required: true, min: 1, max: 5 },
  bgColor: { type: String, default: '#F5F5F5' },
  event: { type: Schema.Types.ObjectId, ref: 'Event', required: true },
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  createdAt: { type: Date, default: Date.now }
});

const Review = models.Review || model('Review', ReviewSchema);

export default Review;
