import { Schema, model, models } from "mongoose";

export interface IContact {
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: Date;
}

const ContactSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  subject: { type: String, required: true },
  message: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const Contact = models.Contact || model('Contact', ContactSchema);

export default Contact;
