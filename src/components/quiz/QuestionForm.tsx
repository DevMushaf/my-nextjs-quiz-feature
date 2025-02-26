"use client";

import React from 'react';
import { X } from 'lucide-react';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Question } from '@/lib/types/quiz';

interface QuestionFormProps {
  questionNumber: number;
  onDelete: () => void;
  onChange: (questionData: Question) => void;
  questionData: Question;
}

export const QuestionForm = ({
  questionNumber,
  onDelete,
  onChange,
  questionData,
}: QuestionFormProps) => {
  const handleOptionChange = (optionIndex: number, value: string) => {
    const newOptions = [...questionData.options];
    newOptions[optionIndex] = value;
    onChange({ ...questionData, options: newOptions });
  };

  const handleCorrectAnswerChange = (answer: string) => {
    onChange({ ...questionData, correctAnswer: answer });
  };

  return (
    <Card className="p-6">
      <div className="flex justify-between items-start mb-4">
        <h3 className="font-semibold">Question {questionNumber}</h3>
        <Button variant="ghost" onClick={onDelete} size="icon">
          <X className="h-4 w-4" />
        </Button>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Question Type</label>
          <select 
            className="w-full p-2 border rounded"
            value={questionData.questionType}
            onChange={(e) => onChange({ ...questionData, questionType: e.target.value as 'multiple-choice' | 'true-false' })}
          >
            <option value="multiple-choice">Multiple choice (Single answer)</option>
            <option value="true-false">True/False</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Question Text</label>
          <Input
            placeholder="Enter your question"
            value={questionData.questionText}
            onChange={(e) => onChange({ ...questionData, questionText: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Options</label>
          <div className="space-y-2">
            {questionData.questionType === 'true-false' ? (
              // True/False options
              <>
                {['True', 'False'].map((option, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name={`correctAnswer-${questionNumber}`}
                      checked={questionData.correctAnswer === option}
                      onChange={() => handleCorrectAnswerChange(option)}
                      className="h-4 w-4"
                    />
                    <label className="flex-1">{option}</label>
                  </div>
                ))}
              </>
            ) : (
              // Multiple choice options
              questionData.options.map((option, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name={`correctAnswer-${questionNumber}`}
                    checked={questionData.correctAnswer === option}
                    onChange={() => handleCorrectAnswerChange(option)}
                    className="h-4 w-4"
                    disabled={!option}
                  />
                  <Input
                    placeholder={`Option ${index + 1}`}
                    value={option}
                    onChange={(e) => handleOptionChange(index, e.target.value)}
                  />
                </div>
              ))
            )}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Marks</label>
          <Input
            type="number"
            min="1"
            max="100"
            className="w-24"
            value={questionData.marks}
            onChange={(e) => onChange({ ...questionData, marks: parseInt(e.target.value) || 1 })}
          />
        </div>
      </div>
    </Card>
  );
};
