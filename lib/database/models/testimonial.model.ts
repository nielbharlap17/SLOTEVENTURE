import { Schema, model, models, Document } from 'mongoose';

export interface ITestimonial extends Document {
  user: Schema.Types.ObjectId;
  text: string;
  role: string;
  rating: number;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: Date;
}

const TestimonialSchema = new Schema<ITestimonial>({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  text: { type: String, required: true },
  role: { type: String, required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  status: { 
    type: String, 
    required: true, 
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending'
  },
  createdAt: { type: Date, default: Date.now }
});

const Testimonial = models.Testimonial || model<ITestimonial>('Testimonial', TestimonialSchema);

export default Testimonial; 