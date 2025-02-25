"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { quizService } from '@/lib/services/quizService';
import { QuizCard } from '@/components/quiz/QuizCard';
import { ConfirmDialog } from '@/components/ui/ConfirmDialog';
import { Button } from '@/components/ui/Button';
import { Toast } from '@/components/ui/Toast';
import { Plus } from 'lucide-react';
import type { Quiz } from '@/lib/types/quiz';

export default function QuizList() {
  const router = useRouter();
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [quizToDelete, setQuizToDelete] = useState<string | null>(null);
  const [toast, setToast] = useState({
    show: false,
    message: '',
    type: 'success' as const,
  });

  useEffect(() => {
    fetchQuizzes();
  }, []);

  const fetchQuizzes = async () => {
    try {
      setLoading(true);
      const data = await quizService.getAllQuizzes();
      setQuizzes(data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch quizzes');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateQuiz = () => {
    router.push('/quiz/create');
  };

  const handleStartQuiz = (id: string) => {
    router.push(`/quiz/${id}`);
  };

  const handleDeleteQuiz = (id: string) => {
    setQuizToDelete(id);
    setConfirmDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (!quizToDelete) return;

    try {
      await quizService.deleteQuiz(quizToDelete);
      setQuizzes(quizzes.filter(quiz => quiz._id !== quizToDelete));
      setToast({
        show: true,
        message: 'Quiz deleted successfully',
        type: 'success',
      });
    } catch (err) {
      setToast({
        show: true,
        message: 'Failed to delete quiz',
        type: 'error',
      });
    } finally {
      setConfirmDialogOpen(false);
      setQuizToDelete(null);
    }
  };

  const cancelDelete = () => {
    setConfirmDialogOpen(false);
    setQuizToDelete(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Loading quizzes...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Quiz Dashboard</h1>
          <Button 
            onClick={handleCreateQuiz}
            className="flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Create Quiz
          </Button>
        </div>

        {quizzes.length === 0 ? (
          <div className="bg-white p-8 rounded-lg shadow text-center">
            <h2 className="text-xl mb-4">No quizzes available</h2>
            <p className="mb-6 text-gray-600">
              Create your first quiz to get started!
            </p>
            <Button onClick={handleCreateQuiz}>
              Create Quiz
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {quizzes.map((quiz) => (
              <QuizCard
                key={quiz._id}
                quiz={quiz}
                onStart={handleStartQuiz}
                onDelete={handleDeleteQuiz}
              />
            ))}
          </div>
        )}
      </div>

      <ConfirmDialog
        isOpen={confirmDialogOpen}
        message="Are you sure you want to delete this quiz? This action cannot be undone."
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
      />

      {toast.show && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast({ ...toast, show: false })}
        />
      )}
    </div>
  );
}