import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchTests, fetchTestQuestions, submitResult, fetchOptions } from '../../api.js';
import styles from './Quiz.module.css';

const Quiz = () => {
  const { testIds } = useParams(); // Get test IDs from URL
  const [tests, setTests] = useState([]);
  const [currentTestIndex, setCurrentTestIndex] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const ids = testIds.split(',').map(id => parseInt(id, 10));
        const response = await fetchTests(ids);
        setTests(response.data);
        if (response.data.length > 0) {
          await loadQuestions(response.data[0].id);
        }
      } catch (error) {
        console.error('Error fetching tests:', error);
      }
    };

    fetchData();
  }, [testIds]);

  const loadQuestions = async (testId) => {
    try {
      const questionsResponse = await fetchTestQuestions(testId);
      const optionsResponse = await fetchOptions();

      // Log the responses to verify their structure
      console.log('Questions Response:', questionsResponse);
      console.log('Options Response:', optionsResponse);

      if (!questionsResponse || !questionsResponse.data || !Array.isArray(questionsResponse.data)) {
        throw new Error('No questions data received');
      }

      if (!optionsResponse || !optionsResponse.data || !Array.isArray(optionsResponse.data)) {
        throw new Error('No options data received');
      }

      const questions = questionsResponse.data;
      questions.forEach(question => {
        question.options = optionsResponse.data.filter(option => option.question === question.id);
      });

      setQuestions(questions);
    } catch (error) {
      console.error('Error fetching questions and options:', error);
    }
  };

  const handleNextTest = async () => {
    const nextIndex = Math.min(currentTestIndex + 1, tests.length - 1);
    setCurrentTestIndex(nextIndex);
    await loadQuestions(tests[nextIndex].id);
    setCurrentQuestionIndex(0);
  };

  const handlePreviousTest = async () => {
    const prevIndex = Math.max(currentTestIndex - 1, 0);
    setCurrentTestIndex(prevIndex);
    await loadQuestions(tests[prevIndex].id);
    setCurrentQuestionIndex(0);
  };

  const handleNextQuestion = () => {
    const nextIndex = Math.min(currentQuestionIndex + 1, questions.length - 1);
    setCurrentQuestionIndex(nextIndex);
  };

  const handlePreviousQuestion = () => {
    const prevIndex = Math.max(currentQuestionIndex - 1, 0);
    setCurrentQuestionIndex(prevIndex);
  };

  const handleOptionChange = (questionId, optionId) => {
    setSelectedOptions(prevState => ({
      ...prevState,
      [questionId]: optionId
    }));
  };

  const handleSubmit = async () => {
    const results = Object.entries(selectedOptions).map(([questionId, optionId]) => ({
      question: questionId,
      selected_option: optionId
    }));

    try {
      await submitResult({ results });
      alert('Results submitted successfully!');
    } catch (error) {
      console.error('Error submitting results:', error);
    }
  };

  return (
    <main className={styles.testPage}>
      <div className={styles.testContainer}>
        <div className={styles.questionNav}>
          <button className={styles.navButton} onClick={handlePreviousTest}>Предыдущий тест</button>
          <button className={styles.navButton} onClick={handleNextTest}>Следующий тест</button>
        </div>
        <h3>Тест: {tests[currentTestIndex]?.title}</h3>
        <div className={styles.questionsList}>
          <div className={styles.questionButtons}>
            {questions.map((question, index) => (
              <button
                key={question.id}
                className={`${styles.questionBtn} ${currentQuestionIndex === index ? styles.selected : ''}`}
                onClick={() => setCurrentQuestionIndex(index)}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>
        <div className={styles.content}>
          {questions.length > 0 && (
            <>
              <div className={styles.questionText}>
                <p>{questions[currentQuestionIndex]?.text}</p>
              </div>
              <div className={styles.answerOptions}>
                {questions[currentQuestionIndex]?.options.map(option => (
                  <label key={option.id}>
                    <input
                      type="radio"
                      name={`question_${questions[currentQuestionIndex].id}`}
                      value={option.id}
                      checked={selectedOptions[questions[currentQuestionIndex].id] === option.id}
                      onChange={() => handleOptionChange(questions[currentQuestionIndex].id, option.id)}
                    />
                    {option.text}
                  </label>
                ))}
              </div>
            </>
          )}
        </div>
        <div className={styles.navigationButtons}>
          <button className={styles.navButton} onClick={handlePreviousQuestion}>Предыдущий вопрос</button>
          <button className={styles.navButton} onClick={handleNextQuestion}>Следующий вопрос</button>
        </div>
        <button className={styles.submitButton} onClick={handleSubmit}>Submit</button>
      </div>
    </main>
  );
};

export default Quiz;
