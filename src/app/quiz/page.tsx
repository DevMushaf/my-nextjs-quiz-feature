"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { quizService } from '@/lib/services/quizService';
import { Sidebar } from '@/components/Sidebar';
import { Clock, Rocket } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Toast } from '@/components/ui/Toast';
import type { Quiz } from '@/lib/types/quiz';

export default function QuizZone() {
  const router = useRouter();
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
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
      console.log('Page: Fetching quizzes...');
      const data = await quizService.getAllQuizzes();
      console.log('Page: Quizzes fetched successfully:', data);
      setQuizzes(data);
      setError(null);
    } catch (err) {
      console.error('Page: Error fetching quizzes:', err);
      if (err instanceof Error) {
        setError(`Failed to fetch quizzes: ${err.message}`);
      } else {
        setError('Failed to fetch quizzes: Unknown error');
      }
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

  if (loading) {
    return (
      <div className="flex h-screen">
        <Sidebar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-lg">Loading quizzes...</div>
        </div>
      </div>
    );
  }

   if (error) {
    return (
      <div className="flex h-screen">
        <Sidebar />
        <div className="flex-1 flex items-center justify-center p-6">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-3xl w-full">
            <h2 className="text-xl font-semibold text-red-700 mb-4">Error Loading Quizzes</h2>
            <p className="text-red-600 mb-4">{error}</p>
            <div className="bg-red-100 p-4 rounded-md">
              <p className="text-sm text-red-800 mb-2"><strong>Troubleshooting:</strong></p>
              <ul className="list-disc list-inside text-sm text-red-800 space-y-1">
                <li>Check that your MongoDB connection string in .env.local is correct</li>
                <li>Verify that your MongoDB Atlas IP whitelist includes your current IP address</li>
                <li>Make sure your database user has the correct permissions</li>
                <li>Ensure your MongoDB cluster is running</li>
              </ul>
            </div>
            <button 
              onClick={() => {
                setError(null);
                setLoading(true);
                fetchQuizzes();
              }}
              className="mt-6 bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 overflow-y-auto bg-[#f5f4fa]">
        <div className="p-8">
          <div className="bg-[#e9e7f7] rounded-md p-6 mb-8 relative overflow-hidden">
            <div className="relative z-10">
              <h1 className="text-2xl font-bold mb-2">Quiz Zone</h1>
              <p className="text-gray-600">Challenge yourself and create your own quizzes!</p>
            </div>
            
            <Button 
              onClick={handleCreateQuiz}
              className="absolute right-6 top-1/2 transform -translate-y-1/2 flex items-center gap-2 bg-black text-white"
            >
              <span className="text-lg">+</span> Create Quiz
            </Button>
            
            {/* Background decorative elements */}
            <div className="absolute right-0 top-0 w-full h-full opacity-10">
              <div className="absolute right-10 top-5 text-9xl font-bold">?</div>
              <div className="absolute right-40 top-10 text-9xl font-bold">?</div>
              <div className="absolute right-20 top-20 text-9xl font-bold">?</div>
            </div>
          </div>

          <h2 className="text-xl font-semibold mb-6">Explore Quiz</h2>

          <div className="space-y-6">
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
              quizzes.map((quiz) => (
                <div 
                  key={quiz._id}
                  className="bg-white rounded-lg overflow-hidden flex"
                >
                  <div className="w-1/4 min-w-[200px]">
                    <div className="h-full bg-blue-600 p-4 flex items-center justify-center">
                      <div className="w-28 h-28 bg-blue-500 rounded flex items-center justify-center">
                        <div className="text-white">
                          <div className="flex justify-center mb-2">
                            <code className="text-2xl">{"<>"}</code>
                          </div>
                          <div className="bg-yellow-400 w-12 h-12 mx-auto flex items-center justify-center rounded">
                            <span className="font-bold text-lg">JS</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex-1 p-6">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-xl font-semibold">{quiz.title}</h3>
                      <span className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm">
                        {quiz.difficulty}
                      </span>
                    </div>
                    
                    <p className="text-gray-600 mb-4">
                      {quiz.description}
                    </p>
                    
                    <div className="flex items-center space-x-6 text-sm text-gray-500 mb-4">
                      <div className="flex items-center">
                        <Rocket className="w-4 h-4 mr-2" />
                        <span>{quiz.questions.length} questions</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-2" />
                        <span>{quiz.timeLimit} minutes</span>
                      </div>
                    </div>
                    
                    <Button
                      onClick={() => handleStartQuiz(quiz._id!)}
                      className="w-full bg-black text-white"
                    >
                      Start Quiz
                    </Button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

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