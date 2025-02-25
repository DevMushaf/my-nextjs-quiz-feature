"use client";

import { useState } from 'react';
import { QuizForm } from '@/components/quiz/QuizForm';
import { Toast } from '@/components/ui/Toast';
import { QuizSchema } from '@/lib/validations/quiz';
import { quizService } from '@/lib/services/quizService';

const CreateQuiz = () => {
  const [toast, setToast] = useState({
    show: false,
    message: '',
    type: 'success'
  });

  const handleSubmit = async (quizData) => {
    try {
      // Validate the data
      const validatedData = QuizSchema.parse(quizData);
      
      // Submit to API
      await quizService.createQuiz(validatedData);
      
      // Show success toast
      setToast({
        show: true,
        message: 'Quiz created successfully!',
        type: 'success'
      });
      
      // Optionally redirect to quiz list
      // router.push('/quiz');
    } catch (error) {
      // Handle validation errors
      if (error.errors) {
        setToast({
          show: true,
          message: error.errors[0].message,
          type: 'error'
        });
      } else {
        setToast({
          show: true,
          message: 'Failed to create quiz',
          type: 'error'
        });
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <QuizForm onSubmit={handleSubmit} />
        {toast.show && (
          <Toast
            message={toast.message}
            type={toast.type}
            onClose={() => setToast({ ...toast, show: false })}
          />
        )}
      </div>
    </div>
  );
};

export default CreateQuiz;