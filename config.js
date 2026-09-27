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
  name: "Lynn",
  mbti: "ENFP",
  location: "台北",
  avatar: "./avatar.svg",
  bio: "我不太會寫自介，每次寫都像在寫履歷。\n所以做了這個小測驗，你點點選項就好，還可以順便偷看我的答案。\n越後面的題目會越認真，請做好心理準備（x）",
  goodPoints: "情緒穩定，有事會說出來，不冷戰也不突然消失\n專一，會主動分享生活，讓我不用猜自己有沒有被愛\n尊重彼此的想法和界線，一起做決定\n工作穩定，能把自己的生活照顧好",
  badPoints: "搞曖昧，同時跟很多人聊\n吵架就冷處理或消失\n想控制對方、查手機\n大男人主義、貶低女性\n媽寶",
  tags: ["22歲", "Podcast 重度使用者", "陷入美國影集"]
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
    category: "飲料甜度",
    title: "手搖飲你都點幾分糖？",
    desc: "",
    options: [
      { text: "無糖" },
      { text: "一分糖" },
      { text: "微糖" },
      { text: "半糖" },
      { text: "全糖，人生才會甜" }
    ],
    myAnswerText: "一分糖",
    myAnswerNote: "一分糖最剛好！不管是果汁加茶還是鮮奶茶，都不會甜到膩，又剛好能壓住茶的澀感。"
  },
  {
    id: "q2",
    category: "旅行風格",
    title: "你的旅行風格是？",
    desc: "",
    options: [
      { text: "行程排滿滿" },
      { text: "睡到自然醒再出門亂晃" },
      { text: "跟團最輕鬆" },
      { text: "不太愛出門" }
    ],
    myAnswerText: "想去的地方很多，行程隨興就好",
    myAnswerNote: "最喜歡在路上亂逛時發現的小店，比排好的景點還好玩。"
  },
  {
    id: "q3",
    category: "通勤日常",
    title: "通勤的時候你都在做什麼？",
    desc: "",
    options: [
      { text: "聽音樂" },
      { text: "聽 Podcast" },
      { text: "滑手機看影片" },
      { text: "放空發呆" }
    ],
    myAnswerText: "聽 Podcast",
    myAnswerNote: "聽有趣的內容可以暖機我的腦袋😇"
  },
  {
    id: "q4",
    category: "週末",
    title: "週末你比較常？",
    desc: "",
    options: [
      { text: "在家耍廢" },
      { text: "出門探索新地方" },
      { text: "一半出門、一半耍廢" },
      { text: "找朋友吃飯" },
      { text: "補眠補到下午" }
    ],
    myAnswerText: "一半出門、一半耍廢",
    myAnswerNote: "出門是充電，在家耍廢也是充電，兩種都需要。"
  },
  {
    id: "q5",
    category: "音樂喜好",
    title: "你平常都聽什麼類型的音樂？",
    desc: "",
    options: [
      { text: "獨立音樂" },
      { text: "流行樂" },
      { text: "嘻哈饒舌" },
      { text: "搖滾" },
      { text: "什麼都聽" }
    ],
    myAnswerText: "獨立音樂",
    myAnswerNote: "從小對流行歌手就比較無感，長大後才發現，我就是聽獨立音樂的料，哈"
  },
  {
    id: "q6",
    category: "影集喜好",
    title: "你喜歡看什麼風格的影集？",
    desc: "",
    options: [
      { text: "犯罪懸疑" },
      { text: "喜劇、情境喜劇" },
      { text: "奇幻科幻" },
      { text: "愛情劇" },
      { text: "醫療、律政" },
      { text: "不太看影集" }
    ],
    myAnswerText: "最近完全陷入美國影集",
    myAnswerNote: "一集接一集根本停不下來，有好看的劇歡迎推坑給我！"
  },
  {
    id: "q7",
    category: "小秘密",
    title: "你身上通常是什麼味道？",
    desc: "",
    options: [
      { text: "洗衣精" },
      { text: "香水" },
      { text: "沐浴乳" },
      { text: "不知道欸" }
    ],
    myAnswerText: "洗衣精的味道最讚",
    myAnswerNote: "乾淨的味道真的會加分，這是我的秘密條件之一（x）"
  },
  {
    id: "q8",
    category: "情緒溝通",
    title: "意見不合的時候，你通常會？",
    desc: "",
    options: [
      { text: "當下說清楚" },
      { text: "先冷靜一下再回來談" },
      { text: "不想講就先不講" },
      { text: "其他" }
    ],
    myAnswerText: "可以先冷靜，但一定要回來談",
    myAnswerNote: "我最怕冷戰和突然疏遠。需要時間可以，說一聲「我想一下，晚點聊」就好。"
  },
  {
    id: "q9",
    category: "聯絡頻率",
    title: "交往之後，你習慣多常聯絡？",
    desc: "",
    options: [
      { text: "整天都會分享" },
      { text: "一天聊幾次" },
      { text: "睡前聊一下就好" },
      { text: "有事再說" }
    ],
    myAnswerText: "想每天分享生活",
    myAnswerNote: "先自首，我是有點黏人的類型，喜歡知道你今天吃了什麼、遇到什麼事。不用秒回，但希望你也會想跟我分享。"
  },
  {
    id: "q10",
    category: "約會",
    title: "約會通常誰安排？",
    desc: "",
    options: [
      { text: "我會主動安排" },
      { text: "輪流" },
      { text: "看誰有空" },
      { text: "對方安排我就去" }
    ],
    myAnswerText: "希望你也會主動安排",
    myAnswerNote: "被放在心上的感覺，常常是從「他記得我說過想去那裡」開始的。"
  },
  {
    id: "q11",
    category: "約會",
    title: "約會的花費，你覺得怎麼分比較好？",
    desc: "",
    options: [
      { text: "我來付" },
      { text: "輪流請" },
      { text: "AA 制" },
      { text: "看情況" }
    ],
    myAnswerText: "看情況，不要太計較",
    myAnswerNote: "我在意的不是誰付多少，而是兩個人都願意付出，不亂花錢也不斤斤計較。"
  },
  {
    id: "q12",
    category: "信任",
    title: "伴侶想看你的手機，你會？",
    desc: "",
    options: [
      { text: "隨便看" },
      { text: "不太喜歡但會給" },
      { text: "不行，這是隱私" },
      { text: "其他" }
    ],
    myAnswerText: "我不會查你的手機",
    myAnswerNote: "信任是互相的。我不查你的手機，也希望你不要做讓我不安的事。"
  },
  {
    id: "q13",
    category: "價值觀",
    title: "你怎麼看台灣？",
    desc: "",
    options: [
      { text: "台灣就是台灣" },
      { text: "兩岸一家親" },
      { text: "沒想過這個問題" },
      { text: "不想談政治" }
    ],
    myAnswerText: "台灣就是台灣",
    myAnswerNote: "立場不用一模一樣，但核心價值要相近。這題對我來說蠻重要的。"
  },
  {
    id: "q14",
    category: "價值觀",
    title: "你怎麼看男女平等？",
    desc: "",
    options: [
      { text: "認同，也會做到" },
      { text: "認同，但有些事還是男生該做" },
      { text: "覺得現在女生比較吃香" },
      { text: "沒想過" }
    ],
    myAnswerText: "希望是平等的夥伴",
    myAnswerNote: "不需要你讓我，也不需要你管我，我們一起做決定就好。"
  },
  {
    id: "q15",
    category: "加分題",
    title: "你的身高是？",
    desc: "",
    options: [
      { text: "175 以下" },
      { text: "175～180" },
      { text: "180 以上" },
      { text: "問這個很膚淺ㄟ" }
    ],
    myAnswerText: "175 以上是加分題（x）",
    myAnswerNote: "老實說我喜歡高高的、乾淨清爽、韓系短髮的類型……但如果你會比任何人都更愛我，這題可以不算分。"
  },
  {
    id: "q16",
    category: "最後一題",
    title: "最後認真問：你現在想找的是？",
    desc: "",
    options: [
      { text: "認真交往" },
      { text: "先當朋友慢慢認識" },
      { text: "隨緣" },
      { text: "還沒想清楚" }
    ],
    myAnswerText: "想談長久的感情",
    myAnswerNote: "不是一見面就要結婚啦，只是希望我們方向一樣，不浪費彼此的時間。"
  }
];
