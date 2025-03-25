import { Schema, model, models, Document } from 'mongoose';

export interface IStatistics extends Document {
  totalTestimonials: number;
  approvedTestimonials: number;
  pendingTestimonials: number;
  rejectedTestimonials: number;
  totalDollarsGenerated: number;
  lastUpdated: Date;
}

const StatisticsSchema = new Schema<IStatistics>({
  totalTestimonials: { type: Number, default: 0 },
  approvedTestimonials: { type: Number, default: 0 },
  pendingTestimonials: { type: Number, default: 0 },
  rejectedTestimonials: { type: Number, default: 0 },
  totalDollarsGenerated: { type: Number, default: 0 },
  lastUpdated: { type: Date, default: Date.now }
});

const Statistics = models.Statistics || model<IStatistics>('Statistics', StatisticsSchema);

export default Statistics;
