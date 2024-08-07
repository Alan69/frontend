import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchQuestionWithOptions, submitResult } from '../../api.js';

const Quiz = () => {
  const { testId } = useParams();
  const navigate = useNavigate();
  const [question, setQuestion] = useState(null);
  const [answers, setAnswers] = useState({});
  const [currentQuestionId, setCurrentQuestionId] = useState(null);

  useEffect(() => {
    const loadQuestion = async () => {
      try {
        const response = await fetchQuestionWithOptions(testId, currentQuestionId);
        setQuestion(response.data);
        setCurrentQuestionId(response.data.id); // Update current question ID
      } catch (error) {
        console.error("Failed to fetch question", error);
      }
    };

    loadQuestion();
  }, [testId, currentQuestionId]);

  const handleOptionChange = (optionId) => {
    setAnswers(prev => ({ ...prev, [currentQuestionId]: optionId }));
  };

  const handleSubmit = async () => {
    const data = {
      test: testId,
      question: currentQuestionId,
      selected_option: answers[currentQuestionId],
    };

    try {
      await submitResult(data);
      setCurrentQuestionId(null); // Trigger fetching of the next question
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
            onClick={() => setCurrentQuestionId(Math.max(0, currentQuestionId - 1))}
          >
            Предыдущий вопрос
          </button>
          <button
            className="nav-button next-button"
            onClick={() => setCurrentQuestionId(null)} // Fetch next question
          >
            Следующий вопрос
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
                  checked={answers[question.id] === option.id}
                  onChange={() => handleOptionChange(option.id)}
                />
                {option.text}
              </label>
            ))}
          </div>
        </div>
        <div className="navigation-buttons">
          <button
            onClick={handleSubmit}
            className='nav-button submit-button'
          >
            {currentQuestionId ? 'Следующий вопрос' : 'Завершить тест'}
          </button>
        </div>
      </div>
    </main>
  );
};

export default Quiz;
