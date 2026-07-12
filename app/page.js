import ProgressCard from "../components/ProgressCard";
import LessonTabs from "../components/LessonTabs";

export default function Home() {
  return (
    <main>
      <header className="topbar">
        <a className="brand" href="#">English Free</a>
        <nav>
          <a href="#course">Khóa học</a>
          <a href="#unit1">Unit 1</a>
          <a href="#progress">Tiến độ</a>
        </nav>
      </header>

      <section className="hero">
        <div className="heroCopy">
          <span className="eyebrow">HỌC TIẾNG ANH MIỄN PHÍ</span>
          <h1>Mỗi ngày một bài,<br />tự tin hơn mỗi ngày.</h1>
          <p>
            Khóa học giao tiếp có từ vựng, ngữ pháp, luyện phản xạ,
            bài kiểm tra và lưu tiến độ học ngay trên thiết bị.
          </p>
          <a className="primaryButton" href="#unit1">Bắt đầu Unit 1</a>
        </div>
        <ProgressCard />
      </section>

      <section id="course" className="section">
        <div className="sectionHeader">
          <div>
            <span className="eyebrow">KHÓA HỌC ĐẦU TIÊN</span>
            <h2>Streamline Connections</h2>
          </div>
          <span className="levelPill">Pre-intermediate</span>
        </div>

        <div className="lessonGrid">
          <article className="lessonCard featured">
            <span className="lessonNumber">01</span>
            <h3>All Aboard!</h3>
            <p>Chào hỏi, giới thiệu bản thân, hỏi quê quán và nghề nghiệp.</p>
            <a className="secondaryButton" href="#unit1">Học ngay</a>
          </article>
          <article className="lessonCard locked">
            <span className="lessonNumber">02</span>
            <h3>Telephoning</h3>
            <p>Gọi điện, hỏi số và chuyển máy.</p>
            <span>🔒 Sắp mở</span>
          </article>
          <article className="lessonCard locked">
            <span className="lessonNumber">03</span>
            <h3>Fizz is fantastic!</h3>
            <p>So sánh và mô tả sự khác biệt.</p>
            <span>🔒 Sắp mở</span>
          </article>
        </div>
      </section>

      <section id="unit1" className="section lessonSection">
        <span className="eyebrow">UNIT 1</span>
        <h2>All Aboard!</h2>
        <LessonTabs />
      </section>

      <section id="progress" className="section">
        <span className="eyebrow">HÀNH TRÌNH CỦA BẠN</span>
        <h2>Học đều mỗi ngày</h2>
        <p className="muted">Phiên bản tiếp theo sẽ có audio MP3, Unit 2–5, flashcards nâng cao và dashboard cá nhân.</p>
      </section>

      <footer>© 2026 English Free · Learn English Anytime Anywhere</footer>
    </main>
  );
}
