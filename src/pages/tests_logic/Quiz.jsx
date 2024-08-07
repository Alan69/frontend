import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchQuestion, submitResult } from '../../api.js';

const Quiz = () => {
  const { testId } = useParams();
  const navigate = useNavigate();
  const [question, setQuestion] = useState(null);
  const [answers, setAnswers] = useState({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  useEffect(() => {
    const loadQuestion = async () => {
      try {
        const response = await fetchQuestion(testId, currentQuestionIndex);
        setQuestion(response.data);
      } catch (error) {
        console.error("Failed to fetch question", error);
      }
    };

    loadQuestion();
  }, [testId, currentQuestionIndex]);

  const handleOptionChange = (optionId) => {
    setAnswers(prev => ({ ...prev, [currentQuestionIndex]: optionId }));
  };

  const handleSubmit = async () => {
    const data = {
      test: testId,
      question: question.id,
      selected_option: answers[currentQuestionIndex],
    };

    try {
      await submitResult(data);
      if (currentQuestionIndex < question.totalQuestions - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      } else {
        alert('Quiz completed');
        navigate('/');
      }
    } catch (error) {
      console.error("Failed to submit result", error);
    }
  };

  if (!question) return <div>Loading...</div>;

  return (
    <main className='quiz-page main-wrapper relative overflow-hidden pt-[150px] pb-[150px]'>
      <div className="quiz-container">
        <div className="question-nav">
          <button
            className="nav-button prev-button"
            onClick={() => setCurrentQuestionIndex(Math.max(0, currentQuestionIndex - 1))}
            disabled={currentQuestionIndex === 0}
          >
            Предыдущий вопрос
          </button>
          <button
            className="nav-button next-button"
            onClick={handleSubmit}
          >
            {currentQuestionIndex < question.totalQuestions - 1 ? 'Следующий вопрос' : 'Завершить тест'}
          </button>
        </div>
        <h3>Тестовый раздел</h3>
        <div className="content">
          <div className="question-text">
            <h2>{question.text}</h2>
          </div>
          <div className="answer-options">
            {question.options.map(option => (
              <label key={option.id}>
                <input
                  type="radio"
                  name={`question_${question.id}`}
                  value={option.id}
                  checked={answers[currentQuestionIndex] === option.id}
                  onChange={() => handleOptionChange(option.id)}
                />
                {option.text}
              </label>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Quiz;
