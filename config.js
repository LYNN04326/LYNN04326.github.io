/* ==========================================
   1. 遠端接收端點 (選填)
   - 貼上你的 Discord Webhook 或 Formspree URL
   - 留空也能正常產生破冰小卡（對方複製後私訊你）
   - 注意：這個網址所有人都看得到，Discord Webhook 可能被別人拿去灌訊息
========================================== */
const RECEIVER_ENDPOINT = "";

/* ==========================================
   2. 個人自介資料 (修改你的個人檔案)
   - 換行請用 \n
   - avatar：把照片上傳到同一個資料夾，再改成 "./你的照片檔名.jpg"
========================================== */
const MY_PROFILE = {
  name: "你的名字",
  mbti: "INFP",
  location: "台北",
  avatar: "./avatar.svg",
  bio: "在這裡寫你的自我介紹。\n也可以直接說：請開始下面的測驗吧！",
  goodPoints: "脾氣好，不開心的時候可以好好說話\n有自己的興趣，可以互相分享喜歡的東西",
  badPoints: "習慣使用髒話\n已讀不回",
  tags: ["25歲", "上班族", "喜歡貓"]
};

/* ==========================================
   3. 題目與你的答案（想要幾題就放幾題）
   - category: 分類
   - title: 題目
   - desc: 副標說明（不需要就留 ""）
   - options: 選項
   - myAnswerText: 點完後跳出的「你的選擇」
   - myAnswerNote: 點完後跳出的「你的心聲 / 為什麼這樣選」
   - 每一題之間用逗號隔開，最後一題後面不用逗號
========================================== */
const QUIZ_QUESTIONS = [
  {
    id: "q1",
    category: "飲食習慣",
    title: "你比較喜歡哪一個？",
    desc: "",
    options: [
      { text: "烏龍茶" },
      { text: "麥茶" },
      { text: "咖啡" },
      { text: "我喜歡有糖的" }
    ],
    myAnswerText: "茶派！",
    myAnswerNote: "這裡寫你自己的答案與理由。"
  },
  {
    id: "q2",
    category: "休閒活動",
    title: "放假最想做什麼？",
    desc: "",
    options: [
      { text: "爬山" },
      { text: "看書" },
      { text: "在家耍廢" },
      { text: "其他" }
    ],
    myAnswerText: "看書配咖啡廳",
    myAnswerNote: "可以分享你最近在讀什麼。"
  },
  {
    id: "q3",
    category: "情緒溝通",
    title: "你生氣或不開心的時候，通常會怎麼做？",
    desc: "沒有標準答案",
    options: [
      { text: "直接說出來" },
      { text: "先冷靜一下再好好談" },
      { text: "自己消化" },
      { text: "以上皆非(願意的話可以跟我說答案)" }
    ],
    myAnswerText: "先冷靜，再好好談",
    myAnswerNote: "希望兩個人都能把話說開。"
  },
  {
    id: "q4",
    category: "閱讀習慣",
    title: "請選擇你喜歡的書籍類型！",
    desc: "",
    options: [
      { text: "歷史" },
      { text: "科幻" },
      { text: "其他" },
      { text: "不太喜歡看書" }
    ],
    myAnswerText: "超級喜歡科幻小說",
    myAnswerNote: "如果你也喜歡的話，希望可以一起討論讀後感！"
  },
  {
    id: "q5",
    category: "個人喜好",
    title: "你比較喜歡哪種電影？",
    desc: "",
    options: [
      { text: "喜劇" },
      { text: "懸疑" },
      { text: "動畫" },
      { text: "紀錄片" }
    ],
    myAnswerText: "懸疑片",
    myAnswerNote: "看完可以一起討論劇情！"
  }
];
