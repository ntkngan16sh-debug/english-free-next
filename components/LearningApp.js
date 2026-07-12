'use client';

import { useMemo, useState } from 'react';

const sections = [
  ['overview', 'Tổng quan'],
  ['dialogue', 'Hội thoại'],
  ['vocabulary', 'Từ vựng + IPA'],
  ['grammar', 'Ngữ pháp'],
  ['flashcards', 'Flashcards'],
  ['quiz', 'Quiz']
];

export default function LearningApp({ unit }) {
  const [active, setActive] = useState('overview');
  const [done, setDone] = useState([]);
  const [cardIndex, setCardIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);

  const progress = Math.round((done.length / sections.length) * 100);
  const currentCard = unit.vocabulary[cardIndex];

  function markDone(id) {
    setDone(prev => Array.from(new Set([...prev, id])));
  }

  function submitQuiz() {
    let score = 0;
    unit.quiz.forEach((q, i) => {
      if (answers[i] === q.answer) score++;
    });
    setResult(score);
    if (score === unit.quiz.length) markDone('quiz');
  }

  return (
    <main>
      <header className="topbar">
        <div className="brand">English Free</div>
        <nav>
          <a href="#course">Khóa học</a>
          <a href="#lesson">Unit 1</a>
          <a href="#progress">Tiến độ</a>
        </nav>
      </header>

      <section className="hero">
        <div>
          <span className="eyebrow">HỌC TIẾNG ANH MIỄN PHÍ</span>
          <h1>Mỗi ngày một bài,<br/>tự tin hơn mỗi ngày.</h1>
          <p>Học theo Unit với hội thoại, IPA, cách đọc gần đúng, ngữ pháp, flashcards và quiz có giải thích.</p>
          <a className="primary" href="#lesson">Bắt đầu học</a>
        </div>
        <div className="dashboardCard">
          <div className="dashboardHead">
            <div>
              <span className="eyebrow">TIẾN ĐỘ HÔM NAY</span>
              <h3>{unit.title}</h3>
            </div>
            <span className="streak">🔥 1 ngày</span>
          </div>
          <div className="progressTrack"><div className="progressFill" style={{width:`${progress}%`}} /></div>
          <p>{done.length}/{sections.length} phần hoàn thành · {progress}%</p>
        </div>
      </section>

      <section id="course" className="section">
        <span className="eyebrow">KHÓA HỌC ĐẦU TIÊN</span>
        <h2>Streamline Connections</h2>
        <div className="courseGrid">
          <article className="courseCard activeCard"><span>01</span><h3>All Aboard!</h3><p>Chào hỏi, giới thiệu bản thân, hỏi quê quán và nghề nghiệp.</p></article>
          <article className="courseCard locked"><span>02</span><h3>Telephoning</h3><p>Gọi điện, hỏi số và chuyển máy.</p></article>
          <article className="courseCard locked"><span>03</span><h3>Fizz is fantastic!</h3><p>So sánh và mô tả sự khác biệt.</p></article>
        </div>
      </section>

      <section id="lesson" className="section lessonSection">
        <span className="eyebrow">UNIT {unit.id}</span>
        <h2>{unit.title}</h2>

        <div className="tabs">
          {sections.map(([id,label]) => (
            <button key={id} className={active===id?'tab active':'tab'} onClick={()=>setActive(id)}>{label}</button>
          ))}
        </div>

        <div className="panel">
          {active === 'overview' && <Overview unit={unit} done={()=>markDone('overview')} />}
          {active === 'dialogue' && <Dialogue unit={unit} done={()=>markDone('dialogue')} />}
          {active === 'vocabulary' && <Vocabulary unit={unit} done={()=>markDone('vocabulary')} />}
          {active === 'grammar' && <Grammar unit={unit} done={()=>markDone('grammar')} />}
          {active === 'flashcards' && (
            <Flashcards
              item={currentCard}
              flipped={flipped}
              setFlipped={setFlipped}
              prev={()=>{setCardIndex((cardIndex-1+unit.vocabulary.length)%unit.vocabulary.length);setFlipped(false)}}
              next={()=>{setCardIndex((cardIndex+1)%unit.vocabulary.length);setFlipped(false)}}
              done={()=>markDone('flashcards')}
            />
          )}
          {active === 'quiz' && <Quiz unit={unit} answers={answers} setAnswers={setAnswers} submit={submitQuiz} result={result} />}
        </div>
      </section>

      <section id="progress" className="section">
        <span className="eyebrow">HÀNH TRÌNH CỦA BẠN</span>
        <h2>Học đều mỗi ngày</h2>
        <div className="stats">
          <div><strong>{progress}%</strong><span>Tiến độ Unit 1</span></div>
          <div><strong>{unit.vocabulary.length}</strong><span>Từ vựng</span></div>
          <div><strong>{unit.grammar.length}</strong><span>Cấu trúc</span></div>
          <div><strong>{result ?? 0}</strong><span>Điểm quiz</span></div>
        </div>
      </section>

      <footer>© 2026 English Free</footer>
    </main>
  );
}

function Overview({unit, done}) {
  return <div>
    <h3>Mục tiêu bài học</h3>
    <ul className="checkList">{unit.objectives.map(x=><li key={x}>{x}</li>)}</ul>
    <div className="note"><b>Mẹo:</b> Nice to meet you phổ biến hơn; Pleased to meet you trang trọng hơn.</div>
    <button className="primary" onClick={done}>Đánh dấu đã học</button>
  </div>
}

function Dialogue({unit, done}) {
  return <div>
    <h3>Hội thoại song ngữ</h3>
    <div className="dialogueList">
      {unit.dialogue.map((line,i)=><div className="dialogueLine" key={i}>
        <div className="speaker">{line.speaker}</div>
        <div><p className="english">{line.english}</p><p className="translation">{line.vietnamese}</p></div>
      </div>)}
    </div>
    <button className="primary" onClick={done}>Đã học hội thoại</button>
  </div>
}

function Vocabulary({unit, done}) {
  return <div>
    <h3>Từ vựng + phiên âm IPA</h3>
    <p className="muted">Dòng “đọc gần đúng” chỉ hỗ trợ bước đầu; hãy ưu tiên IPA và audio.</p>
    <div className="vocabList">
      {unit.vocabulary.map(v=><article className="vocabItem" key={v.word}>
        <div className="wordBlock"><strong>{v.word}</strong><span className="ipa">{v.ipa}</span><span>Đọc gần đúng: {v.easy}</span><em>{v.partOfSpeech}</em></div>
        <div><h4>{v.meaning}</h4><p>{v.example}</p><p className="translation">{v.translation}</p></div>
      </article>)}
    </div>
    <button className="primary" onClick={done}>Đã học từ vựng</button>
  </div>
}

function Grammar({unit, done}) {
  return <div>
    <h3>Cấu trúc ngữ pháp</h3>
    <div className="grammarGrid">
      {unit.grammar.map(g=><article className="grammarCard" key={g.title}>
        <h4>{g.title}</h4>
        <div className="formula">{g.pattern}</div>
        {g.examples.map(x=><p key={x}>• {x}</p>)}
        <p className="mistake">⚠ {g.commonMistake}</p>
        <p className="tip">💡 {g.tip}</p>
      </article>)}
    </div>
    <button className="primary" onClick={done}>Đã học ngữ pháp</button>
  </div>
}

function Flashcards({item, flipped, setFlipped, prev, next, done}) {
  return <div>
    <h3>Flashcards</h3>
    <button className={flipped?'flashcard flipped':'flashcard'} onClick={()=>setFlipped(!flipped)}>
      {!flipped ? <div><span>Mặt trước</span><strong>{item.word}</strong><small>Nhấn để lật</small></div> :
      <div><span>{item.ipa}</span><strong>{item.meaning}</strong><p>{item.example}</p><small>{item.translation}</small></div>}
    </button>
    <div className="cardControls"><button onClick={prev}>← Trước</button><button onClick={next}>Tiếp →</button></div>
    <button className="primary" onClick={done}>Hoàn thành flashcards</button>
  </div>
}

function Quiz({unit, answers, setAnswers, submit, result}) {
  return <div>
    <h3>Quiz cuối bài</h3>
    {unit.quiz.map((q,i)=><div className="question" key={i}>
      <p><b>{i+1}. {q.question}</b></p>
      {q.options.map((opt,j)=><label key={j}><input type="radio" name={`q${i}`} checked={answers[i]===j} onChange={()=>setAnswers({...answers,[i]:j})}/>{opt}</label>)}
      {result !== null && <p className={answers[i]===q.answer?'correct':'wrong'}>{answers[i]===q.answer?'✅ Đúng':'❌ Chưa đúng'} — {q.explanation}</p>}
    </div>)}
    <button className="primary" onClick={submit}>Nộp bài</button>
    {result !== null && <h4>Bạn đạt {result}/{unit.quiz.length} điểm.</h4>}
  </div>
}
