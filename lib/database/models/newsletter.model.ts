import { Schema, model, models, Document } from 'mongoose';

export interface INewsletter extends Document {
  name: string;
  email: string;
  preferences: {
    eventAlerts: boolean;
    monthlyCalendar: boolean;
    industryInsights: boolean;
    exclusiveOffers: boolean;
  };
  subscribedAt: Date;
  unsubscribedAt?: Date;
  isActive: boolean;
}

const NewsletterSchema = new Schema<INewsletter>({
  name: { type: String, required: true },
  email: { 
    type: String, 
    required: true, 
    unique: true,
    trim: true,
    lowercase: true
  },
  preferences: {
    eventAlerts: { type: Boolean, default: false },
    monthlyCalendar: { type: Boolean, default: false },
    industryInsights: { type: Boolean, default: false },
    exclusiveOffers: { type: Boolean, default: false }
  },
  subscribedAt: { type: Date, default: Date.now },
  unsubscribedAt: { type: Date },
  isActive: { type: Boolean, default: true }
}, {
  timestamps: true
});

const Newsletter = models.Newsletter || model<INewsletter>('Newsletter', NewsletterSchema);

export default Newsletter; 