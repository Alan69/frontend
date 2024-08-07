import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchTestQuestions, submitResult } from '../../api.js';

const Quiz = () => {
  const { testId } = useParams();
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadQuestions = async () => {
      try {
        const response = await fetchTestQuestions(testId);
        setQuestions(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch questions", error);
        setError("Failed to fetch questions");
        setLoading(false);
      }
    };

    loadQuestions();
  }, [testId]);

  const handleOptionChange = (questionId, optionId) => {
    setAnswers(prev => ({ ...prev, [questionId]: optionId }));
  };

  const handleSubmit = async () => {
    const currentQuestion = questions[currentQuestionIndex];
    const data = {
      test: testId,
      question: currentQuestion.id,
      selected_option: answers[currentQuestion.id],
    };
    
    try {
      await submitResult(data);
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      } else {
        alert('Quiz completed');
        navigate('/');
      }
    } catch (error) {
      console.error("Failed to submit result", error);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (questions.length === 0) return <div>No questions available</div>;

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <main className='quiz-page main-wrapper relative overflow-hidden pt-[150px] pb-[150px]'>
      <div className="quiz-container">
        <div className="question-nav">
          <button
            className="nav-button prev-button"
            onClick={() => setCurrentQuestionIndex(Math.max(0, currentQuestionIndex - 1))}
          >
            Предыдущий вопрос
          </button>
          <button
            className="nav-button next-button"
            onClick={() => setCurrentQuestionIndex(Math.min(questions.length - 1, currentQuestionIndex + 1))}
          >
            Следующий вопрос
          </button>
        </div>
        <h3>Тестовый раздел</h3>
        <div className="questions-list">
          <div className="question-buttons">
            {questions.map((_, index) => (
              <button
                key={index}
                className={`question-btn ${currentQuestionIndex === index ? 'selected' : ''}`}
                onClick={() => setCurrentQuestionIndex(index)}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>
        <div className="content">
          <div className="question-text">
            <h2>{currentQuestion.text}</h2>
          </div>
          <div className="answer-options">
            {currentQuestion.options && currentQuestion.options.map(option => (
              <label key={option.id}>
                <input
                  type="radio"
                  name={`question_${currentQuestion.id}`}
                  value={option.id}
                  checked={answers[currentQuestion.id] === option.id}
                  onChange={() => handleOptionChange(currentQuestion.id, option.id)}
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
            {currentQuestionIndex < questions.length - 1 ? 'Следующий вопрос' : 'Завершить тест'}
          </button>
        </div>
      </div>
    </main>
  );
};

export default Quiz;
