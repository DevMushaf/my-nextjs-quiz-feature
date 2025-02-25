"use client";

import React from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Clock, Book, Trash2 } from 'lucide-react';
import type { Quiz } from '@/lib/types/quiz';

interface QuizCardProps {
  quiz: Quiz;
  onStart: (id: string) => void;
  onDelete: (id: string) => void;
}

export const QuizCard: React.FC<QuizCardProps> = ({ quiz, onStart, onDelete }) => {
  return (
    <Card className="overflow-hidden">
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2">{quiz.title}</h3>
        <p className="text-gray-600 mb-4 line-clamp-2">{quiz.description}</p>
        
        <div className="flex items-center space-x-4 text-sm text-gray-500 mb-4">
          <div className="flex items-center">
            <Clock className="w-4 h-4 mr-1" />
            <span>{quiz.timeLimit} mins</span>
          </div>
          <div className="flex items-center">
            <Book className="w-4 h-4 mr-1" />
            <span>{quiz.questions.length} questions</span>
          </div>
        </div>

        <div className="flex space-x-2">
          <span className={`px-2 py-1 rounded text-xs ${
            quiz.difficulty === 'Beginner' ? 'bg-green-100 text-green-800' :
            quiz.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' :
            'bg-red-100 text-red-800'
          }`}>
            {quiz.difficulty}
          </span>
          <span className="px-2 py-1 rounded text-xs bg-gray-100 text-gray-800">
            {quiz.category}
          </span>
        </div>

        <div className="mt-4 flex space-x-2">
          <Button
            onClick={() => onStart(quiz._id!)}
            className="flex-1"
          >
            Start Quiz
          </Button>
          <Button
            variant="outline"
            onClick={() => onDelete(quiz._id!)}
            className="text-red-500 hover:bg-red-50"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
};

