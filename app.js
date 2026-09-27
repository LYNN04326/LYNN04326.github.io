let currentIndex = 0;
let recordedAnswers = {};

window.addEventListener('DOMContentLoaded', () => {
  // 載入自介資料
  document.getElementById('intro-name').innerText = MY_PROFILE.name;
  document.getElementById('intro-avatar').src = MY_PROFILE.avatar;
  document.getElementById('intro-mbti').innerText = MY_PROFILE.mbti;
  document.getElementById('intro-location').innerText = MY_PROFILE.location;
  document.getElementById('intro-bio').innerText = MY_PROFILE.bio;
  document.getElementById('intro-good').innerText = MY_PROFILE.goodPoints;
  document.getElementById('intro-bad').innerText = MY_PROFILE.badPoints;
  document.getElementById('header-title').innerText = `${MY_PROFILE.name} 的徵友問答`;

  const tagsContainer = document.getElementById('intro-tags');
  tagsContainer.innerHTML = MY_PROFILE.tags.map(tag => `
    <span class="px-2 py-0.5 rounded text-xs bg-slate-100 text-slate-700 border border-slate-200 font-medium">${tag}</span>
  `).join('');

  const total = QUIZ_QUESTIONS.length;
  document.getElementById('start-btn-text').innerText = `開始互動（共 ${total} 題）`;
  document.getElementById('contact-title').innerText = `${total} 題全部完成 🎆`;

  lucide.createIcons();
});

// 開始測驗
function startQuiz() {
  showPage('page-question');
  loadQuestion(currentIndex);
}

// 渲染當前題目
function loadQuestion(index) {
  const q = QUIZ_QUESTIONS[index];
  const total = QUIZ_QUESTIONS.length;

  document.getElementById('header-status').innerText = `${index + 1} / ${total}`;
  document.getElementById('q-counter').innerText = `Question ${index + 1} / ${total}`;
  document.getElementById('q-category').innerText = q.category;
  document.getElementById('q-title').innerText = q.title;
  document.getElementById('q-desc').innerText = q.desc || '';

  const pct = (index / total) * 100;
  document.getElementById('q-progress-bar').style.width = `${pct}%`;

  // 渲染單選選項按鈕
  const optContainer = document.getElementById('q-options');
  optContainer.innerHTML = q.options.map((opt, i) => `
    <button onclick="handleOptionSelect(${i})" class="w-full p-3.5 text-left rounded-xl border border-slate-200 bg-white hover:border-blue-500 hover:bg-blue-50/40 text-xs sm:text-sm font-medium text-slate-700 transition flex items-center justify-between group">
      <span>${opt.text}</span>
      <i data-lucide="circle" class="w-4 h-4 text-slate-300 group-hover:text-blue-500 shrink-0"></i>
    </button>
  `).join('');

  lucide.createIcons();
}

// 點選選項後切換到我的答案揭曉頁
function handleOptionSelect(optIndex) {
  const q = QUIZ_QUESTIONS[currentIndex];
  const chosen = q.options[optIndex];

  recordedAnswers[q.id] = {
    question: q.title,
    choice: chosen.text
  };

  document.getElementById('reveal-q-badge').innerText = `Q${currentIndex + 1} 解鎖`;
  document.getElementById('user-choice-text').innerText = chosen.text;
  document.getElementById('my-choice-text').innerText = q.myAnswerText;
  document.getElementById('my-choice-note').innerText = q.myAnswerNote;

  const isLast = (currentIndex === QUIZ_QUESTIONS.length - 1);
  document.getElementById('next-step-btn-text').innerText = isLast ? "完成作答！" : "下一題";

  showPage('page-reveal');
  lucide.createIcons();
}

// 揭曉頁點擊下一題
function handleNextClick() {
  if (currentIndex < QUIZ_QUESTIONS.length - 1) {
    currentIndex++;
    showPage('page-question');
    loadQuestion(currentIndex);
  } else {
    document.getElementById('header-status').innerText = `作答完成`;
    showPage('page-contact');
  }
}

// 頁面切換控制
function showPage(pageId) {
  ['page-intro', 'page-question', 'page-reveal', 'page-contact', 'page-result'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.classList.add('hidden');
  });
  const target = document.getElementById(pageId);
  if (target) {
    target.classList.remove('hidden');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}

// 最終送出並傳送結果
async function submitFinalAnswers() {
  const name = document.getElementById('resp-name').value.trim();
  const contact = document.getElementById('resp-contact').value.trim();
  const note = document.getElementById('resp-note').value.trim();

  if (!name || !contact) {
    alert("請留下你的稱呼與聯絡方式！");
    return;
  }

  const feedbackEl = document.getElementById('submit-feedback');

  const total = QUIZ_QUESTIONS.length;

  if (RECEIVER_ENDPOINT) {
    try {
      let res;
      // 整理題目與對方的作答內容
      const answerDetails = Object.values(recordedAnswers).map((item, idx) => {
        return `**Q${idx + 1}. ${item.question}**\n：${item.choice}`;
      }).join('\n\n');

      if (RECEIVER_ENDPOINT.includes("discord.com")) {
        res = await fetch(RECEIVER_ENDPOINT, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            content: `📬 **收到來自 ${name} 的 ${total} 題測驗回覆！**`,
            embeds: [
              {
                title: `作答者：${name}`,
                color: 3888374,
                fields: [
                  { name: "聯絡方式", value: contact, inline: true },
                  { name: "留言備註", value: note || "無", inline: false },
                  { name: `📋 ${total} 題完整作答明細`, value: answerDetails.slice(0, 1024), inline: false }
                ]
              }
            ]
          })
        });
      } else {
        // Formspree / 自訂 API
        res = await fetch(RECEIVER_ENDPOINT, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
          body: JSON.stringify({
            name,
            contact,
            note: note || "無",
            submittedAnswersText: answerDetails,
            answersRaw: recordedAnswers
          })
        });
      }
      if (!res.ok) throw new Error('HTTP ' + res.status);
      feedbackEl.innerText = "✓ 回覆與作答明細已即時傳送給我！";
      feedbackEl.className = "text-xs text-emerald-600 mt-1 font-semibold";
    } catch (err) {
      feedbackEl.innerText = "傳送失敗了，請直接複製下方訊息私訊我！";
    }
  } else {
    feedbackEl.innerText = "複製下方訊息私訊我就可以了！";
  }

  // 破冰訊息
  const iceText = `嗨！我剛剛做完了你的 ${total} 題認識對方的互動 ✨ 我是 ${name} (${contact})！`;
  document.getElementById('icebreaker-msg').innerText = iceText;

  showPage('page-result');
  confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });
}

// 複製破冰訊息
function copyIcebreakerMessage() {
  const msg = document.getElementById('icebreaker-msg').innerText;
  navigator.clipboard.writeText(msg).then(() => {
    const label = document.getElementById('copy-btn-label');
    label.innerText = "已複製！直接去私訊";
    setTimeout(() => { label.innerText = "一鍵複製我是誰"; }, 2500);
  });
}