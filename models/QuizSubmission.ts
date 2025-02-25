import mongoose from 'mongoose';

const QuizSubmissionSchema = new mongoose.Schema({
  quiz: { type: mongoose.Schema.Types.ObjectId, ref: 'Quiz', required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  answers: [{ type: String }],
  score: { type: Number, required: true },
  maxScore: { type: Number, required: true },
  submittedAt: { type: Date, default: Date.now }
});

export default mongoose.models.QuizSubmission || 
  mongoose.model('QuizSubmission', QuizSubmissionSchema);