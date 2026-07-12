'use client';
import { useEffect, useState } from 'react';

const vocabulary=[
{word:'aboard',ipa:'/əˈbɔːd/',easy:'ờ-BOĐ',meaning:'ở trên tàu; lên tàu',example:'All passengers are aboard the ship.'},
{word:'passenger',ipa:'/ˈpæsɪndʒə(r)/',easy:'PÁ-si-n-jờ',meaning:'hành khách',example:'The passengers are on deck.'},
{word:'crew',ipa:'/kruː/',easy:'kru',meaning:'thủy thủ đoàn; tổ phục vụ',example:'The crew are preparing dinner.'},
{word:'cruise',ipa:'/kruːz/',easy:'kruz',meaning:'chuyến du lịch bằng tàu',example:'They are on a Mediterranean cruise.'},
{word:'deck',ipa:'/dek/',easy:'đéc',meaning:'boong tàu',example:'Most people are standing on deck.'},
{word:'captain',ipa:'/ˈkæptɪn/',easy:'KÁP-tịn',meaning:'thuyền trưởng',example:'The captain is talking to the crew.'},
{word:'foreigner',ipa:'/ˈfɒrənə(r)/',easy:'FO-rờ-nờ',meaning:'người nước ngoài',example:'There are many foreigners on the ship.'},
{word:'nationality',ipa:'/ˌnæʃəˈnæləti/',easy:'na-shờ-NÁ-lờ-ti',meaning:'quốc tịch',example:'What is your nationality?'}
];

const grammar=[
['Giới thiệu tên','My name is + tên. / I’m + tên.',['My name is Ngan.','I’m Ngan.'],'I’m… tự nhiên và phổ biến hơn.'],
['Hỏi quê quán','Where do you come from?',['I come from Vietnam.','I’m from Vietnam.'],'I’m from… là cách nói hiện đại, ngắn gọn.'],
['Hỏi vị trí','Where is + địa điểm?',['Where is Stirling?','It’s in Scotland.'],'Where’s là dạng viết tắt của Where is.'],
['Hỏi nghề nghiệp','What do you do?',['I work in logistics.','I’m a QC specialist.'],'Đây là câu hỏi về nghề nghiệp.'],
['Mời lịch sự','Would you like + danh từ?',['Would you like another drink?','Yes, please. / No, thanks.'],'Would you like… lịch sự hơn Do you want…'],
['Hỏi số lượng','How many + danh từ số nhiều + are there?',['How many passengers are there?','There are about one hundred passengers.'],'How many dùng với danh từ đếm được.']
];

const tabs=[['overview','Tổng quan'],['dialogue','Hội thoại'],['vocabulary','Từ vựng + IPA'],['grammar','Cấu trúc ngữ pháp'],['practice','Luyện tập'],['quiz','Quiz']];

export default function LessonTabs(){
 const [active,setActive]=useState('overview');
 const [completed,setCompleted]=useState([]);
 const [answer,setAnswer]=useState('');
 const [feedback,setFeedback]=useState('');
 const [quiz,setQuiz]=useState({q1:'',q2:'',q3:'',q4:''});
 const [quizResult,setQuizResult]=useState('');
 useEffect(()=>setCompleted(JSON.parse(localStorage.getItem('englishFreeProgress')||'[]')),[]);
 function completeStep(step){const next=Array.from(new Set([...completed,step]));setCompleted(next);localStorage.setItem('englishFreeProgress',JSON.stringify(next));window.dispatchEvent(new Event('english-free-progress'));alert('Đã lưu tiến độ!')}
 function checkPractice(){setFeedback(/my name|i'm|i am/i.test(answer.trim())?'✅ Tốt! Câu tự nhiên hơn: “Hello, I’m Ngan. Nice to meet you.”':'💡 Hãy bắt đầu bằng “My name is…” hoặc “I’m…”')}
 function gradeQuiz(){let s=0;if(quiz.q1==='a')s++;if(quiz.q2==='b')s++;if(quiz.q3==='a')s++;if(quiz.q4==='b')s++;setQuizResult(`Bạn đạt ${s}/4 điểm.${s===4?' 🎉 Xuất sắc!':''}`);if(s===4)completeStep('quiz')}
 return <section className="lessonShell">
  <div className="tabs">{tabs.map(([id,label])=><button key={id} className={active===id?'tab active':'tab'} onClick={()=>setActive(id)}>{label}</button>)}</div>
  <div className="tabPanel">
   {active==='overview'&&<div><h2>Mục tiêu bài học</h2><ul className="checkList"><li>Giới thiệu tên, quê quán và nghề nghiệp.</li><li>Hỏi vị trí của một địa điểm.</li><li>Mời đồ uống và trả lời lịch sự.</li><li>Hỏi số lượng hành khách.</li></ul><div className="note"><b>Lưu ý:</b> “Nice to meet you” phổ biến hiện nay; “Pleased to meet you” trang trọng hơn.</div><button className="primaryButton" onClick={()=>completeStep('overview')}>Đánh dấu đã học</button></div>}
   {active==='dialogue'&&<div><h2>Hội thoại mẫu</h2><div className="dialogueBox"><p><b>A:</b> Hello. My name’s Charles Beatty. I’m from Chicago.</p><p><b>B:</b> Pleased to meet you. I’m Wendy Hillman.</p><p><b>A:</b> Where do you come from?</p><p><b>B:</b> I come from Stirling.</p><p><b>A:</b> Oh, where’s that?</p><p><b>B:</b> It’s in Scotland.</p></div><div className="pronunciationTip"><b>Cách đọc tự nhiên</b><p>Pleased to meet you → /pliːzd tə miːt juː/ → “plizd-tờ-miit-yu”</p><p>Where do you come from? → /weə də juː kʌm frəm/ → “weờ-đờ-yu-kăm-frờm”</p></div><button className="primaryButton" onClick={()=>completeStep('dialogue')}>Đã học hội thoại</button></div>}
   {active==='vocabulary'&&<div><h2>Từ vựng + phiên âm IPA</h2><p className="muted">IPA là phiên âm quốc tế. “Đọc gần đúng” chỉ hỗ trợ bước đầu.</p><div className="vocabTable">{vocabulary.map(i=><article className="vocabRow" key={i.word}><div className="vocabWord"><strong>{i.word}</strong><span className="ipa">{i.ipa}</span><span className="easyPronounce">Đọc gần đúng: {i.easy}</span></div><div><p className="meaning">{i.meaning}</p><p className="example">{i.example}</p></div></article>)}</div><button className="primaryButton" onClick={()=>completeStep('vocabulary')}>Đã học từ vựng</button></div>}
   {active==='grammar'&&<div><h2>Cấu trúc ngữ pháp quan trọng</h2><div className="grammarGrid">{grammar.map(([t,s,ex,n])=><article className="grammarCard" key={t}><h3>{t}</h3><div className="formula">{s}</div>{ex.map(x=><p key={x}>• {x}</p>)}<p className="grammarNote">{n}</p></article>)}</div><button className="primaryButton" onClick={()=>completeStep('grammar')}>Đã học ngữ pháp</button></div>}
   {active==='practice'&&<div><h2>Luyện phản xạ</h2><div className="practiceBox"><p><b>English Free:</b> Hello! What’s your name?</p><input value={answer} onChange={e=>setAnswer(e.target.value)} placeholder="Nhập câu trả lời bằng tiếng Anh..."/><button className="secondaryButton" onClick={checkPractice}>Kiểm tra</button><p className="feedback">{feedback}</p></div><div className="speakingPrompts"><h3>Tự luyện nói</h3><p>1. What’s your name?</p><p>2. Where do you come from?</p><p>3. What do you do?</p><p>4. Would you like another drink?</p></div><button className="primaryButton" onClick={()=>completeStep('practice')}>Hoàn thành luyện tập</button></div>}
   {active==='quiz'&&<div><h2>Mini Quiz</h2><Quiz title='1. Câu nào nghĩa là “Rất vui được gặp bạn”?' name="q1" value={quiz.q1} setValue={v=>setQuiz({...quiz,q1:v})} options={[['a','Nice to meet you.'],['b','Nice to miss you.']]}/><Quiz title='2. “Where do you come from?” hỏi về điều gì?' name="q2" value={quiz.q2} setValue={v=>setQuiz({...quiz,q2:v})} options={[['a','Nghề nghiệp'],['b','Quê quán / nơi đến từ']]}/><Quiz title='3. Câu trả lời đúng cho “What do you do?” là:' name="q3" value={quiz.q3} setValue={v=>setQuiz({...quiz,q3:v})} options={[['a','I work in logistics.'],['b','I am from Vietnam.']]}/><Quiz title='4. Cấu trúc hỏi số lượng danh từ đếm được là:' name="q4" value={quiz.q4} setValue={v=>setQuiz({...quiz,q4:v})} options={[['a','How much + plural noun'],['b','How many + plural noun']]}/><button className="primaryButton" onClick={gradeQuiz}>Nộp bài</button><p className="quizResult">{quizResult}</p></div>}
  </div>
 </section>
}
function Quiz({title,name,value,setValue,options}){return <div className="question"><p><b>{title}</b></p>{options.map(([v,l])=><label key={v}><input type="radio" name={name} checked={value===v} onChange={()=>setValue(v)}/>{l}</label>)}</div>}
