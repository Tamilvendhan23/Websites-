import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useExamStore } from '../../store/exam';
import { ExamTimer } from '../../components/exam/exam-timer';
import { QuestionNavigation } from '../../components/exam/question-navigation';
import { QuestionView } from '../../components/exam/question-view';
import { ExamControls } from './exam-controls';

export function ExamTaking() {
  const { id } = useParams();
  const navigate = useNavigate();
  const exam = useExamStore((state) => 
    state.exams.find((e) => e.id === id)
  );

  const [currentQuestion, setCurrentQuestion] = React.useState(0);
  const [answers, setAnswers] = React.useState<Record<string, string>>({});
  const [answeredQuestions, setAnsweredQuestions] = React.useState<Set<number>>(new Set());

  if (!exam) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900">Exam not found</h2>
        <p className="mt-2 text-gray-600">The exam you're looking for doesn't exist.</p>
      </div>
    );
  }

  const handleAnswerChange = (answer: string) => {
    setAnswers((prev) => ({
      ...prev,
      [exam.questions[currentQuestion].id]: answer,
    }));
    setAnsweredQuestions((prev) => new Set(prev.add(currentQuestion)));
  };

  const handleNext = () => {
    if (currentQuestion < exam.questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((prev) => prev - 1);
    }
  };

  const handleSubmit = () => {
    // Calculate score
    let score = 0;
    exam.questions.forEach((question) => {
      if (answers[question.id] === question.correctAnswer) {
        score++;
      }
    });

    // In a real app, you would send this to the server
    console.log('Exam submitted:', {
      examId: exam.id,
      answers,
      score: `${score}/${exam.questions.length}`,
    });

    navigate('/dashboard');
  };

  const handleTimeUp = () => {
    handleSubmit();
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">{exam.title}</h1>
          <ExamTimer duration={exam.duration} onTimeUp={handleTimeUp} />
        </div>

        <QuestionNavigation
          totalQuestions={exam.questions.length}
          currentQuestion={currentQuestion}
          answeredQuestions={answeredQuestions}
          onQuestionChange={setCurrentQuestion}
        />
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <QuestionView
          question={exam.questions[currentQuestion]}
          userAnswer={answers[exam.questions[currentQuestion].id] || ''}
          onAnswerChange={handleAnswerChange}
        />
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <ExamControls
          currentQuestion={currentQuestion}
          totalQuestions={exam.questions.length}
          onNext={handleNext}
          onPrevious={handlePrevious}
          onSubmit={handleSubmit}
        />
      </div>
    </div>
  );
}