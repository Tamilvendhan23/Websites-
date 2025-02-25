import React from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Question } from '../../types';

interface ExamFormProps {
  onSubmit: (data: any) => void;
}

export function ExamForm({ onSubmit }: ExamFormProps) {
  const [formData, setFormData] = React.useState({
    title: '',
    description: '',
    duration: 60,
    startTime: '',
    endTime: '',
    questions: [] as Question[],
  });

  const [currentQuestion, setCurrentQuestion] = React.useState({
    text: '',
    type: 'mcq',
    options: ['', '', '', ''],
    correctAnswer: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      id: Date.now().toString(),
      questions: [...formData.questions],
    });
  };

  const addQuestion = () => {
    setFormData({
      ...formData,
      questions: [
        ...formData.questions,
        {
          id: Date.now().toString(),
          ...currentQuestion,
        },
      ],
    });
    setCurrentQuestion({
      text: '',
      type: 'mcq',
      options: ['', '', '', ''],
      correctAnswer: '',
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700">Title</label>
        <Input
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Description
        </label>
        <textarea
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          rows={3}
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Duration (minutes)
          </label>
          <Input
            type="number"
            value={formData.duration}
            onChange={(e) =>
              setFormData({ ...formData, duration: Number(e.target.value) })
            }
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Start Time
          </label>
          <Input
            type="datetime-local"
            value={formData.startTime}
            onChange={(e) =>
              setFormData({ ...formData, startTime: e.target.value })
            }
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            End Time
          </label>
          <Input
            type="datetime-local"
            value={formData.endTime}
            onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
            required
          />
        </div>
      </div>

      <div className="border-t border-gray-200 pt-6">
        <h3 className="text-lg font-medium text-gray-900">Questions</h3>
        
        <div className="mt-4 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Question Text
            </label>
            <Input
              value={currentQuestion.text}
              onChange={(e) =>
                setCurrentQuestion({ ...currentQuestion, text: e.target.value })
              }
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Question Type
            </label>
            <select
              value={currentQuestion.type}
              onChange={(e) =>
                setCurrentQuestion({
                  ...currentQuestion,
                  type: e.target.value as 'mcq' | 'true-false' | 'short-answer',
                })
              }
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            >
              <option value="mcq">Multiple Choice</option>
              <option value="true-false">True/False</option>
              <option value="short-answer">Short Answer</option>
            </select>
          </div>

          {currentQuestion.type === 'mcq' && (
            <div className="space-y-2">
              {currentQuestion.options.map((option, index) => (
                <div key={index}>
                  <label className="block text-sm font-medium text-gray-700">
                    Option {index + 1}
                  </label>
                  <Input
                    value={option}
                    onChange={(e) => {
                      const newOptions = [...currentQuestion.options];
                      newOptions[index] = e.target.value;
                      setCurrentQuestion({
                        ...currentQuestion,
                        options: newOptions,
                      });
                    }}
                  />
                </div>
              ))}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Correct Answer
            </label>
            <Input
              value={currentQuestion.correctAnswer}
              onChange={(e) =>
                setCurrentQuestion({
                  ...currentQuestion,
                  correctAnswer: e.target.value,
                })
              }
            />
          </div>

          <Button
            type="button"
            onClick={addQuestion}
            className="bg-gray-100 text-gray-900 hover:bg-gray-200"
          >
            Add Question
          </Button>
        </div>

        <div className="mt-4">
          <h4 className="text-sm font-medium text-gray-700">
            Added Questions ({formData.questions.length})
          </h4>
          <ul className="mt-2 space-y-2">
            {formData.questions.map((question, index) => (
              <li
                key={question.id}
                className="text-sm text-gray-600 bg-gray-50 p-2 rounded"
              >
                {index + 1}. {question.text}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="flex justify-end">
        <Button type="submit" className="bg-indigo-600 hover:bg-indigo-700">
          Create Exam
        </Button>
      </div>
    </form>
  );
}