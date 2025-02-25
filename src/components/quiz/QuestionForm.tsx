"use client";

import React from 'react';
import { X } from 'lucide-react';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';

interface QuestionFormProps {
  questionNumber: number;
  onDelete: () => void;
  onChange: (questionData: any) => void;
  questionData: any;
}

export const QuestionForm = ({
  questionNumber,
  onDelete,
  onChange,
  questionData,
}: QuestionFormProps) => {
  return (
    <Card className="p-6">
      <div className="flex justify-between items-start mb-4">
        <h3 className="font-semibold">Question {questionNumber}</h3>
        <Button variant="ghost" onClick={onDelete} size="icon">
          <X className="h-4 w-4" />
        </Button>
      </div>

      <div className="space-y-4">
        <select 
          className="w-full p-2 border rounded"
          value={questionData.questionType}
          onChange={(e) => onChange({ ...questionData, questionType: e.target.value })}
        >
          <option value="multiple-choice">Multiple choice (Single answer)</option>
          <option value="true-false">True/False</option>
        </select>

        <Input
          placeholder="Enter your question"
          value={questionData.questionText}
          onChange={(e) => onChange({ ...questionData, questionText: e.target.value })}
        />

        {questionData.questionType === 'multiple-choice' && (
          <div className="space-y-2">
            {[1, 2, 3, 4].map((num) => (
              <Input
                key={num}
                placeholder={`Option ${num}`}
                value={questionData.options[num - 1] || ''}
                onChange={(e) => {
                  const newOptions = [...questionData.options];
                  newOptions[num - 1] = e.target.value;
                  onChange({ ...questionData, options: newOptions });
                }}
              />
            ))}
          </div>
        )}

        <div className="flex items-center space-x-2">
          <Input
            type="number"
            placeholder="Marks"
            className="w-20"
            value={questionData.marks}
            onChange={(e) => onChange({ ...questionData, marks: parseInt(e.target.value) })}
          />
        </div>
      </div>
    </Card>
  );
};
