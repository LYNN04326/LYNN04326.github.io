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
  bio: "我不太會寫自介，每次寫都像在寫履歷～\n所以做了這個小測驗，你點點選項就好，還可以順便偷看我的答案～\n越後面的題目會越認真，請做好心理準備（x）",
  goodPoints: "情緒穩定，有事會說出來，不冷戰也不突然消失\n尊重彼此的想法和界線，一起做決定\n工作穩定，能把自己的生活照顧好",
  badPoints: "習慣使用髒話\n愛聽抖音歌或愛看抖音\n支持國民黨或民眾黨",
  tags: ["女", "22歲", "異性戀", "菜鳥社畜"],
  contact: ""  // 你的 IG 帳號，例如 "@lynn_xxx"；留空就不顯示
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
    myAnswerNote: "一分糖最剛好！不管是果汁加茶還是鮮奶茶，都不會甜到膩，又剛好能壓住茶的澀感～"
  },
  {
    id: "q2",
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
    id: "q3",
    category: "通勤日常",
    title: "通勤的時候你都在聽什麼？",
    desc: "",
    options: [
      { text: "音樂" },
      { text: "Podcast" },
      { text: "看影片" },
      { text: "什麼都不聽，放空" }
    ],
    myAnswerText: "Podcast",
    myAnswerNote: "聽有趣的內容可以暖機我的腦袋😇"
  },
  {
    id: "q4",
    category: "影集喜好",
    title: "你比較喜歡哪種類型的影集？",
    desc: "",
    options: [
      { text: "肥皂劇" },
      { text: "喜劇" },
      { text: "科幻" },
      { text: "動作" }
    ],
    myAnswerText: "喜劇跟動作都愛",
    myAnswerNote: "曾經有一段時間沉迷於 Friends 跟良善之地～\n因為喜歡團隊合作的感覺，最近迷上軍警、警探類：正在看 SEAL Team～"
  },
  {
    id: "q5",
    category: "政治傾向",
    title: "請 pick 你的政治傾向",
    desc: "",
    options: [
      { text: "國民黨" },
      { text: "民進黨" },
      { text: "民眾黨" },
      { text: "我沒有很關心政治" }
    ],
    myAnswerText: "民進黨",
    myAnswerNote: "因為我在意國家主權，也很關注性別議題，所以這是綜合下來的選擇～"
  },
  {
    id: "q6",
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
    myAnswerNote: "出門是充電，在家耍廢也是充電，兩種都需要～\n不過週日基本上不出門，因為需要躺在家一整天備戰 Blue Monday ʕథ౪థʔ"
  },
  {
    id: "q7",
    category: "香味",
    title: "你喜歡哪種香水味？",
    desc: "",
    options: [
      { text: "花果香" },
      { text: "木質調" },
      { text: "柑橘調" },
      { text: "乾淨的皂感" },
      { text: "我不噴香水" }
    ],
    myAnswerText: "花果香",
    myAnswerNote: "我是香水控！根據天氣跟心情會有不同選擇～\n尤其喜歡玫瑰🌹幾乎每瓶香水都帶點玫瑰，今年給自己買的生日禮物也是香水 哈哈哈"
  },
  {
    id: "q8",
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
    myAnswerNote: "我是會想說出來的類型，說完就好一大半，而且需要感受到朋友的理解或安慰哈哈哈"
  },
  {
    id: "q9",
    category: "旅行",
    title: "如果能馬上出發，你最想去哪？",
    desc: "",
    options: [
      { text: "日本" },
      { text: "濟州島" },
      { text: "東南亞海島" },
      { text: "歐洲" },
      { text: "其他（可以跟我說！）" }
    ],
    myAnswerText: "濟州島",
    myAnswerNote: "目前去過最喜歡的地方！那邊的步調很慢很放鬆，一眼望出去都是海，東西也好吃～"
  },
  {
    id: "q10",
    category: "咖啡廳",
    title: "你喜歡去咖啡廳嗎？",
    desc: "",
    options: [
      { text: "超喜歡，會特地找" },
      { text: "偶爾，有需要才去" },
      { text: "比較喜歡待在家" },
      { text: "咖啡廳是拿來工作的地方" }
    ],
    myAnswerText: "超喜歡，會特地找",
    myAnswerNote: "也想聽聽你的愛店～有推薦的話一定要跟我說！"
  },
  {
    id: "q11",
    category: "朋友相處",
    title: "跟朋友在一起的時候，你通常是？",
    desc: "",
    options: [
      { text: "負責炒熱氣氛的人" },
      { text: "安靜聽大家說話的人" },
      { text: "負責揪團的人" },
      { text: "看場合切換" }
    ],
    myAnswerText: "負責揪團的人",
    myAnswerNote: "我的朋友們都不太主動 哈 所以我每次揪團還會附贈挑餐廳服務( っ ⸝⸝⸝◜~◝⸝⸝⸝ c)"
  },
  {
    id: "q12",
    category: "溝通",
    title: "跟別人意見不合的時候，你通常會？",
    desc: "",
    options: [
      { text: "當下說清楚" },
      { text: "先冷靜一下再回來談" },
      { text: "不想講就先不講" },
      { text: "其他（願意的話可以跟我說）" }
    ],
    myAnswerText: "先冷靜一下再回來談",
    myAnswerNote: "我可以等你冷靜，但不要冷戰或直接消失啦，講開就沒事了"
  },
  {
    id: "q13",
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
    myAnswerNote: "好笑的東西一個人笑太可惜了！分享生活的大小事對我來說很重要～"
  },
  {
    id: "q14",
    category: "價值觀",
    title: "你對女性困境有了解嗎？",
    desc: "",
    options: [
      { text: "有稍微了解" },
      { text: "不了解" },
      { text: "認為現在女性比較吃香" },
      { text: "女權自助餐" }
    ],
    myAnswerText: "一些價值觀～",
    myAnswerNote: "我其實很不喜歡聽到有人在話語中，無意識地帶入一些辱女詞彙～\n如果你不覺得現今女性在社會上還是相對比較弱勢，也還有很多女性困境，那請❌"
  },
  {
    id: "q15",
    category: "金錢觀",
    title: "跟伴侶出去吃飯，你習慣？",
    desc: "",
    options: [
      { text: "各付各的" },
      { text: "輪流請" },
      { text: "我來請" },
      { text: "看情況" }
    ],
    myAnswerText: "看情況",
    myAnswerNote: "在意的不是誰付多少，而是彼此都願意付出～不亂花錢，也不斤斤計較～"
  },
  {
    id: "q16",
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
    myAnswerNote: "老實說我喜歡高高的、乾淨清爽、韓系短髮的類型……但聊得來比什麼都重要，這題可以不算分～"
  },
  {
    id: "q17",
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
    myAnswerNote: "不急著決定什麼，先從認識開始～如果真的很合拍，我是會認真走下去的那種人～"
  }
];
