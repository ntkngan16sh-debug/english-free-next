'use client';

import { useEffect, useState } from 'react';

const tabs = [
  { id: 'overview', label: 'Tổng quan' },
  { id: 'vocabulary', label: 'Từ vựng' },
  { id: 'grammar', label: 'Ngữ pháp' },
  { id: 'practice', label: 'Luyện tập' },
  { id: 'quiz', label: 'Quiz' },
];

export default function LessonTabs() {
  const [active, setActive] = useState('overview');
  const [completed, setCompleted] = useState([]);
  const [answer, setAnswer] = useState('');
  const [feedback, setFeedback] = useState('');
  const [quiz, setQuiz] = useState({ q1: '', q2: '', q3: '' });
  const [quizResult, setQuizResult] = useState('');

  useEffect(() => {
    setCompleted(JSON.parse(localStorage.getItem('englishFreeProgress') || '[]'));
  }, []);

  function completeStep(step) {
    const next = Array.from(new Set([...completed, step]));
    setCompleted(next);
    localStorage.setItem('englishFreeProgress', JSON.stringify(next));
    window.dispatchEvent(new Event('storage'));
    alert('Đã lưu tiến độ!');
  }

  function checkPractice() {
    const good = /my name|i'm|i am/i.test(answer.trim());
    setFeedback(
      good
        ? '✅ Tốt! Một câu tự nhiên: “Hello, I’m Ngan. Nice to meet you.”'
        : '💡 Hãy thử bắt đầu bằng “My name is…” hoặc “I’m…”'
    );
  }

  function gradeQuiz() {
    let score = 0;
    if (quiz.q1 === 'a') score += 1;
    if (quiz.q2 === 'b') score += 1;
    if (quiz.q3 === 'a') score += 1;
    setQuizResult(`Bạn đạt ${score}/3 điểm.${score === 3 ? ' 🎉 Xuất sắc!' : ''}`);
    if (score === 3) completeStep('quiz');
  }

  return (
    <section className="lessonShell">
      <div className="tabs">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={active === tab.id ? 'tab active' : 'tab'}
            onClick={() => setActive(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="tabPanel">
        {active === 'overview' && (
          <div>
            <h2>Mục tiêu bài học</h2>
            <ul className="checkList">
              <li>Giới thiệu tên và nơi ở.</li>
              <li>Hỏi người khác đến từ đâu.</li>
              <li>Dùng lời chào lịch sự khi mới gặp.</li>
              <li>Thực hiện một đoạn hội thoại ngắn.</li>
            </ul>
            <div className="note">
              <strong>Mẹo nói tự nhiên:</strong> “Nice to meet you” phổ biến trong giao tiếp hiện đại; “Pleased to meet you” trang trọng hơn.
            </div>
            <button className="primaryButton" onClick={() => completeStep('overview')}>Đánh dấu đã học</button>
          </div>
        )}

        {active === 'vocabulary' && (
          <div>
            <h2>Từ vựng trọng tâm</h2>
            <div className="cards">
              {[
                ['aboard', 'ở trên tàu / lên tàu'],
                ['passenger', 'hành khách'],
                ['crew', 'thủy thủ đoàn'],
                ['cruise', 'chuyến du lịch bằng tàu'],
                ['deck', 'boong tàu'],
                ['captain', 'thuyền trưởng'],
              ].map(([word, meaning]) => (
                <div className="wordCard" key={word}>
                  <strong>{word}</strong>
                  <span>{meaning}</span>
                </div>
              ))}
            </div>
            <button className="primaryButton" onClick={() => completeStep('vocabulary')}>Đã học từ vựng</button>
          </div>
        )}

        {active === 'grammar' && (
          <div>
            <h2>Ngữ pháp</h2>
            <div className="grammarBox">
              <h3>Hỏi quê quán</h3>
              <p><strong>Where do you come from?</strong></p>
              <p>Trả lời: <strong>I come from Vietnam.</strong></p>
              <p>Tự nhiên hơn: <strong>I’m from Vietnam.</strong></p>
            </div>
            <div className="grammarBox">
              <h3>Hỏi nghề nghiệp</h3>
              <p><strong>What do you do?</strong></p>
              <p>Trả lời: <strong>I work in logistics.</strong></p>
            </div>
            <button className="primaryButton" onClick={() => completeStep('grammar')}>Đã học ngữ pháp</button>
          </div>
        )}

        {active === 'practice' && (
          <div>
            <h2>Luyện phản xạ</h2>
            <div className="practiceBox">
              <p><strong>English Free:</strong> Hello! What’s your name?</p>
              <input
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                placeholder="Nhập câu trả lời bằng tiếng Anh..."
              />
              <button className="secondaryButton" onClick={checkPractice}>Kiểm tra</button>
              <p>{feedback}</p>
            </div>
            <button className="primaryButton" onClick={() => completeStep('practice')}>Hoàn thành luyện tập</button>
          </div>
        )}

        {active === 'quiz' && (
          <div>
            <h2>Mini Quiz</h2>
            <QuizQuestion
              title='1. Câu nào nghĩa là “Rất vui được gặp bạn”?'
              name="q1"
              value={quiz.q1}
              onChange={(value) => setQuiz({ ...quiz, q1: value })}
              options={[['a', 'Nice to meet you.'], ['b', 'Nice to miss you.']]}
            />
            <QuizQuestion
              title='2. “Where do you come from?” hỏi về điều gì?'
              name="q2"
              value={quiz.q2}
              onChange={(value) => setQuiz({ ...quiz, q2: value })}
              options={[['a', 'Nghề nghiệp'], ['b', 'Quê quán / nơi đến từ']]}
            />
            <QuizQuestion
              title='3. Câu trả lời tự nhiên cho “What do you do?” là:'
              name="q3"
              value={quiz.q3}
              onChange={(value) => setQuiz({ ...quiz, q3: value })}
              options={[['a', 'I work in logistics.'], ['b', 'I am from Vietnam.']]}
            />
            <button className="primaryButton" onClick={gradeQuiz}>Nộp bài</button>
            <p className="quizResult">{quizResult}</p>
          </div>
        )}
      </div>
    </section>
  );
}

function QuizQuestion({ title, name, value, onChange, options }) {
  return (
    <div className="question">
      <p><strong>{title}</strong></p>
      {options.map(([optionValue, label]) => (
        <label key={optionValue}>
          <input
            type="radio"
            name={name}
            value={optionValue}
            checked={value === optionValue}
            onChange={() => onChange(optionValue)}
          />
          {label}
        </label>
      ))}
    </div>
  );
}
