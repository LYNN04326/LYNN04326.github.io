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
  badPoints: "搞曖昧，同時跟很多人聊\n吵架就冷處理或消失\n想控制對方、查手機\n大男人主義、貶低女性\n媽寶\n支持國民黨或民眾黨",
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
    category: "個性",
    title: "你是 I 人還是 E 人？",
    desc: "不信 MBTI 也可以選",
    options: [
      { text: "I 人，需要自己的時間充電" },
      { text: "E 人，跟人相處就是充電" },
      { text: "看場合切換" },
      { text: "不信這個" }
    ],
    myAnswerText: "E 人（ENFP）",
    myAnswerNote: "話很多，但也很喜歡聽別人說話，聊到喜歡的話題會停不下來。"
  },
  {
    id: "q8",
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
    id: "q9",
    category: "分享習慣",
    title: "看到好笑的迷因或影片，你會？",
    desc: "",
    options: [
      { text: "馬上傳給想分享的人" },
      { text: "自己笑完就好" },
      { text: "存起來之後再看" },
      { text: "轉發到限動" }
    ],
    myAnswerText: "馬上傳給想分享的人",
    myAnswerNote: "好笑的東西一個人笑太可惜了！分享生活的大小事對我來說很重要。"
  },
  {
    id: "q10",
    category: "情緒",
    title: "心情不好的時候，你通常會？",
    desc: "",
    options: [
      { text: "找人聊聊" },
      { text: "自己消化" },
      { text: "運動或睡一覺" },
      { text: "吃好吃的" }
    ],
    myAnswerText: "找人聊聊",
    myAnswerNote: "我是會想說出來的類型，說完就好一大半。反過來也一樣，很願意當你的樹洞。"
  },
  {
    id: "q11",
    category: "溝通",
    title: "跟別人意見不合的時候，你通常會？",
    desc: "",
    options: [
      { text: "當下說清楚" },
      { text: "先冷靜一下再回來談" },
      { text: "不想講就先不講" },
      { text: "其他(願意的話可以跟我說)" }
    ],
    myAnswerText: "可以先冷靜，但一定要回來談",
    myAnswerNote: "最怕冷戰跟突然疏遠。需要時間可以，說一聲「我想一下，晚點聊」就好。"
  },
  {
    id: "q12",
    category: "金錢觀",
    title: "跟朋友出去吃飯，你習慣？",
    desc: "",
    options: [
      { text: "各付各的" },
      { text: "輪流請" },
      { text: "我來請" },
      { text: "看情況" }
    ],
    myAnswerText: "看情況，不要太計較",
    myAnswerNote: "在意的不是誰付多少，而是彼此都願意付出。不亂花錢，也不斤斤計較。"
  },
  {
    id: "q13",
    category: "政治傾向",
    title: "請 pick 你的政治傾向",
    desc: "放在第 13 題剛剛好",
    options: [
      { text: "台灣就是台灣" },
      { text: "國民黨" },
      { text: "民進黨" },
      { text: "民眾黨" },
      { text: "我沒有很關心政治" }
    ],
    myAnswerText: "台灣就是台灣",
    myAnswerNote: "立場不用一模一樣，但核心價值要相近，這題對我來說蠻重要的。"
  },
  {
    id: "q14",
    category: "價值觀",
    title: "你怎麼看性別平等？",
    desc: "沒有想過也很正常！",
    options: [
      { text: "認同，也會做到" },
      { text: "認同，但有些事還是男生該做" },
      { text: "覺得現在女生比較吃香" },
      { text: "沒想過" }
    ],
    myAnswerText: "希望大家都是平等的",
    myAnswerNote: "不需要誰讓誰，也不需要誰管誰，一起討論、一起做決定就好。"
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
    myAnswerNote: "老實說我喜歡高高的、乾淨清爽、韓系短髮的類型……但聊得來比什麼都重要，這題可以不算分。"
  },
  {
    id: "q16",
    category: "最後一題",
    title: "你是怎麼點進來的？",
    desc: "",
    options: [
      { text: "想認識新朋友" },
      { text: "想找對象" },
      { text: "好奇點進來看看" },
      { text: "被朋友推坑" }
    ],
    myAnswerText: "先聊得來最重要",
    myAnswerNote: "不急著決定什麼，先從認識開始。如果真的很合拍，我是會認真走下去的那種人。"
  }
];
