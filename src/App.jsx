import { useState, useEffect } from "react";

/* =====================================================
   1. DATA
   Each item has: hindi, english, and 3 examples.
   Add more items here whenever you want.
   ===================================================== */
const DATA = {
  collocations: [
    {
      hindi: "नज़र डालना",
      english: "take a look",
      examples: [
        "Can I take a look at your book?",
        "She took a look at the report and smiled.",
        "Take a look at this photo from yesterday.",
      ],
    },
    {
      hindi: "फ़ैसला करना",
      english: "make a decision",
      examples: [
        "You need to make a decision today.",
        "It took him a long time to make a decision.",
        "We finally made a decision about the trip.",
      ],
    },
    {
      hindi: "ध्यान देना",
      english: "pay attention",
      examples: [
        "Please pay attention to the teacher.",
        "He wasn't paying attention during the meeting.",
        "You should pay attention to the road while driving.",
      ],
    },
    {
      hindi: "मदद करना",
      english: "help out",
      examples: [
        "Can you help me out with this problem?",
        "My friends always help out when I need them.",
        "She helped out at the charity event last weekend.",
      ],
    },
    {
      hindi: "समय बिताना",
      english: "spend time",
      examples: [
        "I like to spend time with my family.",
        "Don't spend too much time on social media.",
        "We spent time exploring the old city.",
      ],
    },
    {
      hindi: "कोशिश करना",
      english: "make an effort",
      examples: [
        "He is making an effort to improve his English.",
        "You should make an effort to arrive on time.",
        "She made a real effort to finish the project.",
      ],
    },
    {
      hindi: "ब्रेक लेना",
      english: "take a break",
      examples: [
        "Let's take a break and have some tea.",
        "You have been studying for hours, so take a break.",
        "He takes a short break every afternoon.",
      ],
    },
    {
      hindi: "ग़लती करना",
      english: "make a mistake",
      examples: [
        "Everyone can make a mistake.",
        "I made a mistake in the last question.",
        "Try not to make the same mistake again.",
      ],
    },
    {
      hindi: "होमवर्क करना",
      english: "do homework",
      examples: [
        "I do my homework after school.",
        "Have you done your homework yet?",
        "She was doing her homework when I called.",
      ],
    },
    {
      hindi: "नहाना",
      english: "take a shower",
      examples: [
        "I take a shower every morning.",
        "He took a shower and got ready for work.",
        "Can I take a shower before dinner?",
      ],
    },
    {
      hindi: "ज़ुकाम होना",
      english: "catch a cold",
      examples: [
        "Wear a jacket or you will catch a cold.",
        "I caught a cold after getting wet in the rain.",
        "My sister caught a cold last week.",
      ],
    },
    {
      hindi: "प्रगति करना",
      english: "make progress",
      examples: [
        "She is making progress in her English.",
        "We made good progress on the project today.",
        "You will make progress if you practise every day.",
      ],
    },
    {
      hindi: "सलाह देना",
      english: "give advice",
      examples: [
        "Can you give me some advice about my career?",
        "My teacher always gives good advice.",
        "He gave us advice on how to save money.",
      ],
    },
    {
      hindi: "दोस्त बनाना",
      english: "make friends",
      examples: [
        "It is easy to make friends at a new school.",
        "She made friends with her classmates quickly.",
        "How do you make friends in a new city?",
      ],
    },
    {
      hindi: "वादा निभाना",
      english: "keep a promise",
      examples: [
        "A good friend always keeps a promise.",
        "I kept my promise and came on time.",
        "He tries hard to keep every promise he makes.",
      ],
    },
    {
      hindi: "वादा तोड़ना",
      english: "break a promise",
      examples: [
        "Please don't break a promise to your child.",
        "He broke his promise and did not call.",
        "It hurts when people break a promise.",
      ],
    },
    {
      hindi: "सच बोलना",
      english: "tell the truth",
      examples: [
        "Always tell the truth, even when it is hard.",
        "She told the truth about what happened.",
        "Did he tell you the truth?",
      ],
    },
    {
      hindi: "झूठ बोलना",
      english: "tell a lie",
      examples: [
        "It is wrong to tell a lie.",
        "The boy told a lie to avoid trouble.",
        "I never tell a lie to my parents.",
      ],
    },
    {
      hindi: "पैसे कमाना",
      english: "make money",
      examples: [
        "He wants to make money from his online shop.",
        "You can make money by selling old books.",
        "They made good money last year.",
      ],
    },
    {
      hindi: "पैसे बचाना",
      english: "save money",
      examples: [
        "I try to save money every month.",
        "We saved money by cooking at home.",
        "You can save money if you buy in bulk.",
      ],
    },
    {
      hindi: "समय बर्बाद करना",
      english: "waste time",
      examples: [
        "Don't waste time on things that don't matter.",
        "We wasted time waiting in the wrong line.",
        "He wastes time scrolling on his phone.",
      ],
    },
    {
      hindi: "समय बचाना",
      english: "save time",
      examples: [
        "Taking the metro will save time.",
        "Prepare your bag at night to save time in the morning.",
        "This app helps me save time at work.",
      ],
    },
    {
      hindi: "रोज़ी-रोटी कमाना",
      english: "make a living",
      examples: [
        "He makes a living by driving a taxi.",
        "It is hard to make a living as an artist.",
        "She makes a living by teaching music.",
      ],
    },
    {
      hindi: "योजना बनाना",
      english: "make a plan",
      examples: [
        "Let's make a plan for the weekend.",
        "You should make a plan before you start studying.",
        "They made a plan to visit their grandparents.",
      ],
    },
    {
      hindi: "ज़िम्मेदारी लेना",
      english: "take responsibility",
      examples: [
        "You must take responsibility for your actions.",
        "The manager took responsibility for the mistake.",
        "Children learn to take responsibility at home.",
      ],
    },
    {
      hindi: "सर्वश्रेष्ठ प्रयास करना",
      english: "do your best",
      examples: [
        "Just do your best and don't worry.",
        "She always does her best in exams.",
        "We did our best to finish on time.",
      ],
    },
    {
      hindi: "बदलाव लाना",
      english: "make a difference",
      examples: [
        "Small acts of kindness make a difference.",
        "One vote can make a difference.",
        "Your help made a big difference to us.",
      ],
    },
    {
      hindi: "मज़े करना",
      english: "have fun",
      examples: [
        "We had fun at the beach.",
        "Have fun at the party!",
        "The kids are having fun in the park.",
      ],
    },
    {
      hindi: "जोखिम उठाना",
      english: "take a risk",
      examples: [
        "You have to take a risk to grow.",
        "He took a risk and started his own business.",
        "I don't like to take a risk with my health.",
      ],
    },
    {
      hindi: "मिलने जाना",
      english: "pay a visit",
      examples: [
        "We paid a visit to our uncle on Sunday.",
        "I will pay you a visit next week.",
        "The doctor paid a visit to the village.",
      ],
    },
    {
      hindi: "बस पकड़ना",
      english: "catch the bus",
      examples: [
        "I catch the bus at eight o'clock.",
        "We ran to catch the bus.",
        "You can catch the bus near the station.",
      ],
    },
    {
      hindi: "बस छूट जाना",
      english: "miss the bus",
      examples: [
        "He woke up late and missed the bus.",
        "If we miss the bus, we will be late.",
        "Hurry up, or we will miss the bus.",
      ],
    },
    {
      hindi: "मदद माँगना",
      english: "ask for help",
      examples: [
        "Don't be shy to ask for help.",
        "She asked for help with her homework.",
        "When you are stuck, ask for help.",
      ],
    },
    {
      hindi: "भाषण देना",
      english: "give a speech",
      examples: [
        "The principal gave a speech on Independence Day.",
        "I am nervous to give a speech in front of everyone.",
        "He will give a speech at the wedding.",
      ],
    },
    {
      hindi: "बर्तन धोना",
      english: "do the dishes",
      examples: [
        "I do the dishes after dinner.",
        "Who is going to do the dishes today?",
        "He helps his mother do the dishes.",
      ],
    },
    {
      hindi: "फ़ोन करना",
      english: "make a phone call",
      examples: [
        "I need to make a phone call to the bank.",
        "She made a phone call to her parents.",
        "Can I make a phone call from your office?",
      ],
    },
    {
      hindi: "आयोजित होना",
      english: "take place",
      examples: [
        "The meeting will take place on Monday.",
        "The wedding took place in a small village.",
        "Where does the match take place?",
      ],
    },
    {
      hindi: "समझ में आना",
      english: "make sense",
      examples: [
        "Your explanation makes sense to me.",
        "This sentence doesn't make sense.",
        "It makes sense to start early.",
      ],
    },
    {
      hindi: "ख़याल रखना",
      english: "take care",
      examples: [
        "Take care of yourself.",
        "She takes care of her grandmother.",
        "Please take care of my books.",
      ],
    },
    {
      hindi: "संपर्क में रहना",
      english: "keep in touch",
      examples: [
        "Let's keep in touch after college.",
        "We keep in touch through messages.",
        "He didn't keep in touch with his old friends.",
      ],
    },
    {
      hindi: "वज़न घटाना",
      english: "lose weight",
      examples: [
        "He wants to lose weight before the wedding.",
        "Walking every day helped her lose weight.",
        "Many people try to lose weight in January.",
      ],
    },
    {
      hindi: "वज़न बढ़ना",
      english: "gain weight",
      examples: [
        "He gained weight during the holidays.",
        "Eating late at night can make you gain weight.",
        "The doctor told her to gain weight.",
      ],
    },
    {
      hindi: "भारी बारिश",
      english: "heavy rain",
      examples: [
        "There was heavy rain last night.",
        "Heavy rain caused floods in the city.",
        "We stayed inside because of the heavy rain.",
      ],
    },
    {
      hindi: "कड़क कॉफ़ी",
      english: "strong coffee",
      examples: [
        "I like strong coffee in the morning.",
        "He drank a cup of strong coffee to stay awake.",
        "Strong coffee keeps me awake at night.",
      ],
    },
    {
      hindi: "फ़ास्ट फ़ूड",
      english: "fast food",
      examples: [
        "Eating too much fast food is unhealthy.",
        "We ordered fast food for lunch.",
        "There is a fast food shop near my college.",
      ],
    },
    {
      hindi: "परीक्षा पास करना",
      english: "pass an exam",
      examples: [
        "She worked hard to pass the exam.",
        "I hope to pass the exam this year.",
        "He passed the exam on his first try.",
      ],
    },
    {
      hindi: "परीक्षा में फ़ेल होना",
      english: "fail an exam",
      examples: [
        "He failed the exam because he did not study.",
        "Don't be sad if you fail an exam; try again.",
        "Some students fail an exam and still go on to succeed.",
      ],
    },
    {
      hindi: "सुझाव देना",
      english: "make a suggestion",
      examples: [
        "Can I make a suggestion?",
        "She made a suggestion about the schedule.",
        "He made a good suggestion for the project.",
      ],
    },
    {
      hindi: "फ़ोटो खींचना",
      english: "take a photo",
      examples: [
        "Can you take a photo of us?",
        "She took a photo of the sunset.",
        "Please don't take a photo here.",
      ],
    },
    {
      hindi: "बातचीत करना",
      english: "have a conversation",
      examples: [
        "We had a long conversation about our plans.",
        "I like to have a conversation in English every day.",
        "They were having a conversation near the gate.",
      ],
    },
  ],
  connectors: [
    {
      hindi: "इसलिए",
      english: "therefore",
      examples: [
        "It was raining; therefore we stayed inside.",
        "He studied hard; therefore he passed the exam.",
        "The shop was closed; therefore we went home.",
      ],
    },
    {
      hindi: "हालाँकि",
      english: "however",
      examples: [
        "She was tired; however she finished the work.",
        "The movie was long; however it was interesting.",
        "I wanted to go; however I had no time.",
      ],
    },
    {
      hindi: "इसके अलावा",
      english: "moreover",
      examples: [
        "The plan is cheap; moreover it is effective.",
        "He is smart; moreover he is hardworking.",
        "The food was delicious; moreover the service was excellent.",
      ],
    },
    {
      hindi: "उदाहरण के लिए",
      english: "for example",
      examples: [
        "Many fruits are healthy, for example apples and bananas.",
        "You can use different tools, for example a pen or a pencil.",
        "Several cities are famous, for example Delhi and Mumbai.",
      ],
    },
    {
      hindi: "दूसरी ओर",
      english: "on the other hand",
      examples: [
        "It is expensive; on the other hand the quality is high.",
        "The job is hard; on the other hand the salary is good.",
        "Living in a city is convenient; on the other hand it is noisy.",
      ],
    },
    {
      hindi: "परिणामस्वरूप",
      english: "as a result",
      examples: [
        "He missed the train. As a result, he was late for work.",
        "It rained all day; as a result, the match was cancelled.",
        "She practised daily and, as a result, her speaking improved.",
      ],
    },
    {
      hindi: "साथ ही",
      english: "in addition",
      examples: [
        "The hotel is cheap. In addition, it is near the station.",
        "In addition to Hindi, she speaks English and Tamil.",
        "The job pays well; in addition, it offers free lunch.",
      ],
    },
    {
      hindi: "फिर भी",
      english: "nevertheless",
      examples: [
        "The test was difficult; nevertheless, she scored well.",
        "He was very tired. Nevertheless, he kept working.",
        "The weather was bad; nevertheless, we went for a walk.",
      ],
    },
    {
      hindi: "भले ही",
      english: "although",
      examples: [
        "Although it was late, we kept talking.",
        "She went to school although she had a fever.",
        "Although he is rich, he lives a simple life.",
      ],
    },
    {
      hindi: "के बावजूद",
      english: "despite",
      examples: [
        "Despite the rain, we played football.",
        "He passed despite his poor health.",
        "Despite working hard, she did not get the job.",
      ],
    },
    {
      hindi: "वरना",
      english: "otherwise",
      examples: [
        "Hurry up; otherwise you will miss the train.",
        "Take your umbrella; otherwise you will get wet.",
        "I must study tonight. Otherwise, I will fail the test.",
      ],
    },
    {
      hindi: "दरअसल",
      english: "in fact",
      examples: [
        "I thought it was easy. In fact, it was very hard.",
        "He is not lazy; in fact, he works day and night.",
        "She is not shy; in fact, she loves talking to people.",
      ],
    },
    {
      hindi: "इस बीच",
      english: "meanwhile",
      examples: [
        "I cooked dinner. Meanwhile, my brother set the table.",
        "Wash the rice. Meanwhile, chop the vegetables.",
        "She went to the market. Meanwhile, the guests arrived.",
      ],
    },
    {
      hindi: "जबकि",
      english: "whereas",
      examples: [
        "Rohan likes tea, whereas his sister prefers coffee.",
        "Some people enjoy cities, whereas others like villages.",
        "I am a morning person, whereas my brother stays up late.",
      ],
    },
    {
      hindi: "अंत में",
      english: "in conclusion",
      examples: [
        "In conclusion, regular practice is the key to success.",
        "In conclusion, the plan is good but needs more time.",
        "In conclusion, I would like to thank everyone.",
      ],
    },
  ],
  idioms: [
    {
      hindi: "सिर दर्द होना",
      english: "a pain in the neck",
      examples: [
        "This problem is a pain in the neck.",
        "Filling forms is such a pain in the neck.",
        "My little brother can be a pain in the neck sometimes.",
      ],
    },
    {
      hindi: "झिझक तोड़ना",
      english: "break the ice",
      examples: [
        "He told a joke to break the ice.",
        "A small chat can break the ice at a party.",
        "Games helped the new students break the ice.",
      ],
    },
    {
      hindi: "बाएँ हाथ का खेल",
      english: "a piece of cake",
      examples: [
        "The exam was a piece of cake.",
        "Don't worry, this task is a piece of cake for me.",
        "Making tea is a piece of cake.",
      ],
    },
    {
      hindi: "तबीयत ठीक न होना",
      english: "under the weather",
      examples: [
        "I'm feeling a bit under the weather today.",
        "She stayed home because she was under the weather.",
        "He looks under the weather this morning.",
      ],
    },
    {
      hindi: "कभी-कभार ही",
      english: "once in a blue moon",
      examples: [
        "We eat out once in a blue moon.",
        "He visits his village once in a blue moon.",
        "It snows here once in a blue moon.",
      ],
    },
    {
      hindi: "बिल्कुल सही बात कहना",
      english: "hit the nail on the head",
      examples: [
        "You hit the nail on the head with that answer.",
        "Her comment hit the nail on the head.",
        "He hit the nail on the head when he said we need more time.",
      ],
    },
    {
      hindi: "राज़ खोल देना",
      english: "spill the beans",
      examples: [
        "Don't spill the beans about the surprise party.",
        "Someone spilled the beans and everyone knew.",
        "She promised not to spill the beans.",
      ],
    },
    {
      hindi: "बहुत महँगा पड़ना",
      english: "cost an arm and a leg",
      examples: [
        "That phone cost me an arm and a leg.",
        "Living in the city costs an arm and a leg.",
        "Their wedding cost an arm and a leg.",
      ],
    },
    {
      hindi: "हिम्मत करके मुश्किल काम करना",
      english: "bite the bullet",
      examples: [
        "I had to bite the bullet and see the dentist.",
        "It's time to bite the bullet and talk to him.",
        "She bit the bullet and told her boss the truth.",
      ],
    },
    {
      hindi: "आज का काम बंद करना",
      english: "call it a day",
      examples: [
        "We're tired, so let's call it a day.",
        "He called it a day at five o'clock.",
        "After six hours of work, they called it a day.",
      ],
    },
  ],
  "phrasal-verbs": [
    {
      hindi: "उठना",
      english: "get up",
      examples: [
        "I get up at 6 every morning.",
        "She finds it hard to get up early on Mondays.",
        "What time do you usually get up?",
      ],
    },
    {
      hindi: "छोड़ देना",
      english: "give up",
      examples: [
        "Don't give up on your dreams.",
        "He gave up smoking last year.",
        "After three attempts she refused to give up.",
      ],
    },
    {
      hindi: "देखभाल करना",
      english: "look after",
      examples: [
        "She looks after her younger brother.",
        "Can you look after my plants while I'm away?",
        "Nurses look after patients in the hospital.",
      ],
    },
    {
      hindi: "अचानक मिलना",
      english: "run into",
      examples: [
        "I ran into an old friend yesterday.",
        "We ran into some problems during the project.",
        "Guess who I ran into at the market!",
      ],
    },
    {
      hindi: "जारी रखना",
      english: "carry on",
      examples: [
        "Please carry on with your work.",
        "They carried on talking even after the teacher entered.",
        "Despite the rain we decided to carry on.",
      ],
    },
    {
      hindi: "चालू करना",
      english: "turn on",
      examples: [
        "Please turn on the light.",
        "Can you turn on the fan?",
        "He turned on the TV to watch the news.",
      ],
    },
    {
      hindi: "बंद करना",
      english: "turn off",
      examples: [
        "Turn off your phone in the exam hall.",
        "Don't forget to turn off the gas.",
        "She turned off the lights and went to sleep.",
      ],
    },
    {
      hindi: "ढूँढना",
      english: "look for",
      examples: [
        "I'm looking for my keys.",
        "She is looking for a new job.",
        "What are you looking for?",
      ],
    },
    {
      hindi: "पता लगाना",
      english: "find out",
      examples: [
        "I need to find out the exact time.",
        "He found out the truth yesterday.",
        "Can you find out if the shop is open?",
      ],
    },
    {
      hindi: "वापस आना",
      english: "come back",
      examples: [
        "Come back soon!",
        "She came back home late last night.",
        "When will your brother come back from Delhi?",
      ],
    },
    {
      hindi: "बाहर जाना",
      english: "go out",
      examples: [
        "Let's go out for dinner tonight.",
        "It's raining, so we can't go out.",
        "They go out for a walk every evening.",
      ],
    },
    {
      hindi: "उठाना / लेने जाना",
      english: "pick up",
      examples: [
        "Please pick up your bag from the floor.",
        "I will pick you up from the station at seven.",
        "She picked up the phone on the second ring.",
      ],
    },
    {
      hindi: "पहनना",
      english: "put on",
      examples: [
        "Put on your jacket; it's cold.",
        "He put on his shoes and left.",
        "She put on a blue shirt for the party.",
      ],
    },
    {
      hindi: "उतारना",
      english: "take off",
      examples: [
        "Please take off your shoes at the door.",
        "He took off his coat and sat down.",
        "Take off your glasses and look at me.",
      ],
    },
    {
      hindi: "जागना",
      english: "wake up",
      examples: [
        "I wake up at five o'clock.",
        "Please wake me up at seven.",
        "The baby woke up crying.",
      ],
    },
    {
      hindi: "बैठना",
      english: "sit down",
      examples: [
        "Please sit down and relax.",
        "He sat down on the sofa.",
        "Everyone sat down when the teacher came in.",
      ],
    },
    {
      hindi: "खड़े होना",
      english: "stand up",
      examples: [
        "Stand up when the teacher enters.",
        "She stood up to give her seat to an old man.",
        "He stood up and walked to the board.",
      ],
    },
    {
      hindi: "(जानकारी) खोजना",
      english: "look up",
      examples: [
        "Look up the word in the dictionary.",
        "I looked up the train time online.",
        "If you don't know the meaning, look it up.",
      ],
    },
    {
      hindi: "वापस देना",
      english: "give back",
      examples: [
        "Please give back my pen.",
        "He gave back the book to the library.",
        "Can you give me back my notes?",
      ],
    },
    {
      hindi: "शुरू करना / तैयार करना",
      english: "set up",
      examples: [
        "They set up a small shop in the market.",
        "Can you help me set up my new phone?",
        "She set up a meeting for Friday.",
      ],
    },
    {
      hindi: "ख़राब हो जाना",
      english: "break down",
      examples: [
        "The bus broke down on the way.",
        "My laptop broke down yesterday.",
        "The car broke down in the middle of the road.",
      ],
    },
    {
      hindi: "बात उठाना",
      english: "bring up",
      examples: [
        "Don't bring up that topic at dinner.",
        "She brought up the issue in the meeting.",
        "Why did you bring up my old mistake?",
      ],
    },
    {
      hindi: "उपाय / विचार सोचना",
      english: "come up with",
      examples: [
        "She came up with a great idea.",
        "Can you come up with a better plan?",
        "We need to come up with a solution quickly.",
      ],
    },
    {
      hindi: "टालना",
      english: "put off",
      examples: [
        "Don't put off your work until tomorrow.",
        "They put off the trip because of the rain.",
        "He keeps putting off going to the dentist.",
      ],
    },
    {
      hindi: "रद्द करना",
      english: "call off",
      examples: [
        "They called off the match because of rain.",
        "The school called off the picnic.",
        "We had to call off the meeting.",
      ],
    },
    {
      hindi: "कम करना",
      english: "cut down",
      examples: [
        "I'm trying to cut down on sugar.",
        "You should cut down your screen time.",
        "The company cut down its costs.",
      ],
    },
    {
      hindi: "समझ पाना",
      english: "figure out",
      examples: [
        "I can't figure out this math problem.",
        "She figured out how to fix the printer.",
        "Let's figure out a way to reach on time.",
      ],
    },
    {
      hindi: "(फ़ॉर्म) भरना",
      english: "fill in",
      examples: [
        "Please fill in this form.",
        "Fill in the blanks with the correct words.",
        "He filled in his name and address.",
      ],
    },
    {
      hindi: "पटना (अच्छे संबंध होना)",
      english: "get along",
      examples: [
        "I get along well with my classmates.",
        "The two brothers don't get along.",
        "Do you get along with your neighbours?",
      ],
    },
    {
      hindi: "उबरना",
      english: "get over",
      examples: [
        "It took her weeks to get over the flu.",
        "He couldn't get over the shock.",
        "You will get over it soon.",
      ],
    },
    {
      hindi: "बड़ा होना",
      english: "grow up",
      examples: [
        "I grew up in a small town.",
        "What do you want to be when you grow up?",
        "They grew up together as friends.",
      ],
    },
    {
      hindi: "रुकना / इंतज़ार करना",
      english: "hold on",
      examples: [
        "Hold on, I will be there in a minute.",
        "Can you hold on while I check?",
        "Hold on! You forgot your bag.",
      ],
    },
    {
      hindi: "बनाए रखना",
      english: "keep up",
      examples: [
        "Keep up the good work!",
        "It is hard to keep up with new technology.",
        "He ran fast to keep up with the others.",
      ],
    },
    {
      hindi: "निराश करना",
      english: "let down",
      examples: [
        "Don't let me down.",
        "She felt let down by her friend.",
        "The team let down its fans with a poor game.",
      ],
    },
    {
      hindi: "(कहानी) गढ़ना",
      english: "make up",
      examples: [
        "He made up a story to avoid trouble.",
        "Don't make up excuses.",
        "The children made up a new game.",
      ],
    },
    {
      hindi: "आगे बढ़ना",
      english: "move on",
      examples: [
        "It is time to move on from the past.",
        "After the break-up, she moved on.",
        "Let's move on to the next question.",
      ],
    },
    {
      hindi: "ध्यान दिलाना",
      english: "point out",
      examples: [
        "She pointed out a mistake in my essay.",
        "Thank you for pointing that out.",
        "He pointed out that the shop was closed.",
      ],
    },
    {
      hindi: "पहुँच जाना",
      english: "show up",
      examples: [
        "He didn't show up for the meeting.",
        "She showed up late to the party.",
        "Many people showed up to help.",
      ],
    },
    {
      hindi: "सुलझाना",
      english: "sort out",
      examples: [
        "We need to sort out this problem.",
        "She sorted out her papers.",
        "Let's sort out the schedule first.",
      ],
    },
    {
      hindi: "संभाल लेना",
      english: "take over",
      examples: [
        "The new manager will take over next month.",
        "He took over the family business.",
        "I'll take over the driving now.",
      ],
    },
    {
      hindi: "पहनकर देखना",
      english: "try on",
      examples: [
        "Can I try on this shirt?",
        "She tried on three dresses.",
        "Try it on before you buy it.",
      ],
    },
    {
      hindi: "ठुकरा देना",
      english: "turn down",
      examples: [
        "He turned down the job offer.",
        "She turned down our invitation.",
        "They turned down my request.",
      ],
    },
    {
      hindi: "व्यायाम करना",
      english: "work out",
      examples: [
        "I work out at the gym every morning.",
        "He works out three times a week.",
        "She wants to work out more.",
      ],
    },
    {
      hindi: "चेक-इन करना",
      english: "check in",
      examples: [
        "We checked in at the hotel at noon.",
        "Please check in two hours before the flight.",
        "What time can we check in?",
      ],
    },
    {
      hindi: "चेक-आउट करना",
      english: "check out",
      examples: [
        "We check out of the hotel at 11 a.m.",
        "He checked out early in the morning.",
        "Please check out before noon.",
      ],
    },
    {
      hindi: "सफ़ाई करना",
      english: "clean up",
      examples: [
        "Please clean up your room.",
        "We cleaned up the garden on Sunday.",
        "Let's clean up after the party.",
      ],
    },
    {
      hindi: "छोड़ आना",
      english: "drop off",
      examples: [
        "I drop my son off at school.",
        "Can you drop me off at the station?",
        "She dropped off the parcel at the office.",
      ],
    },
    {
      hindi: "आख़िर में पहुँचना",
      english: "end up",
      examples: [
        "We ended up eating at home.",
        "He ended up in the hospital.",
        "If you don't plan, you will end up late.",
      ],
    },
    {
      hindi: "घूमना-फिरना",
      english: "hang out",
      examples: [
        "We hang out at the café after class.",
        "Do you want to hang out this weekend?",
        "He likes to hang out with his cousins.",
      ],
    },
    {
      hindi: "रिश्ता तोड़ना",
      english: "break up",
      examples: [
        "They broke up after two years.",
        "She broke up with him last month.",
        "Why did you two break up?",
      ],
    },
  ],
};

// The tabs (besides Overview). "key" must match the keys in DATA above.
const CATEGORIES = [
  { key: "collocations", name: "Collocations", icon: "🔗" },
  { key: "connectors", name: "Connectors", icon: "🌉" },
  { key: "idioms", name: "Idioms", icon: "💡" },
  { key: "phrasal-verbs", name: "Phrasal Verbs", icon: "⚡" },
];

/* =====================================================
   2. SMALL HELPER FUNCTIONS (they don't use React)
   ===================================================== */

// Every item needs a unique id so we can save its mark.
// Example id: "idioms::heartbroken::दिल टूटना"
function getId(categoryKey, item) {
  return categoryKey + "::" + item.english + "::" + item.hindi;
}

// Read saved marks from the browser. If nothing is saved, return an empty object.
function loadMarks() {
  try {
    const saved = localStorage.getItem("lexora-marks");
    if (saved) {
      return JSON.parse(saved);
    }
    return {};
  } catch (error) {
    return {};
  }
}

// Does this item match what the user typed in the search box?
function matchesSearch(item, searchText) {
  const text = searchText.trim().toLowerCase();
  if (text === "") {
    return true; // nothing typed, so everything matches
  }
  const allExamples = item.examples.join(" ").toLowerCase();
  return (
    item.hindi.toLowerCase().includes(text) ||
    item.english.toLowerCase().includes(text) ||
    allExamples.includes(text)
  );
}

// Make a shuffled copy of a list (Fisher-Yates shuffle).
function shuffleList(list) {
  const copy = [...list]; // copy, so we don't change the original
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1)); // random position from 0 to i
    const temp = copy[i];
    copy[i] = copy[j];
    copy[j] = temp;
  }
  return copy;
}

/* =====================================================
   3. THE APP
   ===================================================== */
export default function App() {
  // ---------- STATE (data that changes and updates the screen) ----------
  const [tab, setTab] = useState("overview"); // which tab is open
  const [marks, setMarks] = useState(loadMarks); // { id: "weak" | "semi" | "mastered" }
  const [mode, setMode] = useState("practice"); // "practice" or "list"
  const [currentIndex, setCurrentIndex] = useState(0); // which item is showing in practice mode
  const [searchText, setSearchText] = useState("");
  const [filter, setFilter] = useState("all"); // "all", "weak", "semi", "mastered"
  const [shuffledList, setShuffledList] = useState(null); // null means "normal order"
  const [showAnswer, setShowAnswer] = useState(false); // is English + examples visible?

  // ---------- SAVE MARKS ----------
  // Runs every time "marks" changes, and saves it in the browser.
  useEffect(() => {
    localStorage.setItem("lexora-marks", JSON.stringify(marks));
  }, [marks]);

  // ---------- STATUS HELPER ----------
  // An item with no mark counts as "mastered" (same as the original app).
  function getStatus(id) {
    return marks[id] || "mastered";
  }

  // ---------- COUNT PROGRESS FOR THE OVERVIEW ----------
  let weakTotal = 0;
  let semiTotal = 0;
  let masteredTotal = 0;
  const perCategory = {}; // counts for each category, like { idioms: {weak, semi, mastered} }

  for (const category of CATEGORIES) {
    let weak = 0;
    let semi = 0;
    let mastered = 0;

    for (const item of DATA[category.key]) {
      const status = getStatus(getId(category.key, item));
      if (status === "weak") {
        weak++;
      } else if (status === "semi") {
        semi++;
      } else {
        mastered++;
      }
    }

    perCategory[category.key] = { weak: weak, semi: semi, mastered: mastered };
    weakTotal = weakTotal + weak;
    semiTotal = semiTotal + semi;
    masteredTotal = masteredTotal + mastered;
  }
  const grandTotal = weakTotal + semiTotal + masteredTotal;

  // ---------- WORK OUT WHICH ITEMS TO SHOW ----------
  // Step 1: all items of the open tab (empty list on the Overview tab)
  let baseWords = [];
  if (tab !== "overview") {
    baseWords = DATA[tab];
  }

  // Step 2: use the shuffled list if the user pressed Shuffle
  let wordsToShow = baseWords;
  if (shuffledList !== null) {
    wordsToShow = shuffledList;
  }

  // Step 3: keep only the items that pass the filter and the search
  const filteredWords = [];
  for (const item of wordsToShow) {
    const status = getStatus(getId(tab, item));

    if (filter !== "all" && status !== filter) {
      continue; // skip this item
    }
    if (!matchesSearch(item, searchText)) {
      continue; // skip this item
    }
    filteredWords.push(item);
  }

  // ---------- CURRENT ITEM (practice mode) ----------
  // If the list got shorter and our index is too big, go back to 0.
  let safeIndex = currentIndex;
  if (safeIndex >= filteredWords.length) {
    safeIndex = 0;
  }
  const currentItem = filteredWords[safeIndex]; // undefined if the list is empty
  let currentId = null;
  let currentMark = null;
  if (currentItem) {
    currentId = getId(tab, currentItem);
    currentMark = marks[currentId] || null; // used to highlight the clicked button
  }

  // ---------- ACTIONS (functions that run on clicks) ----------

  // Open a tab and reset everything to the start
  function openTab(newTab) {
    setTab(newTab);
    setMode("practice");
    setCurrentIndex(0);
    setSearchText("");
    setFilter("all");
    setShuffledList(null);
    setShowAnswer(false);
  }

  // Save a mark. Clicking the same mark again removes it.
  function setMark(id, status) {
    const newMarks = { ...marks }; // copy the old marks
    if (marks[id] === status) {
      delete newMarks[id];
    } else {
      newMarks[id] = status;
    }
    setMarks(newMarks);
  }

  // Go to the next item (and come back to the first after the last)
  function goNext() {
    if (filteredWords.length === 0) {
      return;
    }
    setCurrentIndex((safeIndex + 1) % filteredWords.length);
    setShowAnswer(false); // hide the answer for the next item
  }

  // Mark the current item, then move to the next one
  function markAndNext(status) {
    setMark(currentId, status);
    goNext();
  }

  // Called when the user types in the search box
  function changeSearch(text) {
    setSearchText(text);
    setCurrentIndex(0);
    setShowAnswer(false);
  }

  // Called when the user clicks a filter button
  function changeFilter(newFilter) {
    setFilter(newFilter);
    setCurrentIndex(0);
    setShowAnswer(false);
  }

  function handleShuffle() {
    setShuffledList(shuffleList(baseWords));
    setFilter("all");
    setSearchText("");
    setCurrentIndex(0);
    setShowAnswer(false);
  }

  function handleShowAll() {
    setShuffledList(null);
    setFilter("all");
    setSearchText("");
    setCurrentIndex(0);
    setShowAnswer(false);
  }

  function pickItem(index) {
    setCurrentIndex(index);
    setShowAnswer(false);
  }

  function resetAll() {
    const sure = window.confirm("Reset all marks? This cannot be undone.");
    if (sure) {
      setMarks({});
    }
  }

  // ---------- WHAT APPEARS ON THE SCREEN ----------
  return (
    <div className="app">
      {/* Progress bar at the top */}
      <div className="progress-rail">
        <span className="rail-item weak"><span className="dot" /> Weak {weakTotal}</span>
        <span className="rail-item semi"><span className="dot" /> Semi {semiTotal}</span>
        <span className="rail-item mastered"><span className="dot" /> Mastered {masteredTotal}</span>
        <span className="rail-total">Total {grandTotal}</span>
      </div>

      {/* Tabs */}
      <nav className="tabs">
        <button
          className={tab === "overview" ? "tab active" : "tab"}
          onClick={() => openTab("overview")}
        >
          Overview
        </button>

        {CATEGORIES.map((category) => (
          <button
            key={category.key}
            className={tab === category.key ? "tab active" : "tab"}
            onClick={() => openTab(category.key)}
          >
            {category.icon} {category.name}
          </button>
        ))}
      </nav>

      {/* ================= OVERVIEW TAB ================= */}
      {tab === "overview" && (
        <section className="overview">
          <h1>My English Progress</h1>
          <p className="sub">All {grandTotal} items together</p>

          <div className="stat-cards">
            <div className="stat weak">
              <div className="num">{weakTotal}</div>
              <div className="label">Weak</div>
            </div>
            <div className="stat semi">
              <div className="num">{semiTotal}</div>
              <div className="label">Semi Weak</div>
            </div>
            <div className="stat mastered">
              <div className="num">{masteredTotal}</div>
              <div className="label">Mastered</div>
            </div>
          </div>

          <div className="cat-list">
            {CATEGORIES.map((category) => {
              const counts = perCategory[category.key];
              return (
                <div
                  key={category.key}
                  className="cat-row"
                  onClick={() => openTab(category.key)}
                >
                  <div className="cat-name">{category.icon} {category.name}</div>
                  <div className="cat-counts">
                    <span className="w">● {counts.weak}</span>
                    <span className="s">● {counts.semi}</span>
                    <span className="m">● {counts.mastered}</span>
                  </div>
                </div>
              );
            })}
          </div>

          <button className="reset-btn" onClick={resetAll}>Reset all marks</button>
        </section>
      )}

      {/* ================= CATEGORY TABS ================= */}
      {tab !== "overview" && (
        <section className="practice-section">
          {/* Search + filter buttons */}
          <div className="toolbar">
            <input
              type="search"
              placeholder="Search Hindi, English or example…"
              value={searchText}
              onChange={(e) => changeSearch(e.target.value)}
            />
            <button onClick={handleShuffle}>Shuffle</button>
            <button onClick={handleShowAll}>Show All</button>
            <button className={filter === "weak" ? "on" : ""} onClick={() => changeFilter("weak")}>Weak only</button>
            <button className={filter === "semi" ? "on" : ""} onClick={() => changeFilter("semi")}>Semi only</button>
            <button className={filter === "mastered" ? "on" : ""} onClick={() => changeFilter("mastered")}>Mastered only</button>
            <button
              className="mode-toggle"
              onClick={() => setMode(mode === "practice" ? "list" : "practice")}
            >
              {mode === "practice" ? "Show list" : "Practice mode"}
            </button>
          </div>

          {/* Case 1: nothing matches */}
          {filteredWords.length === 0 && (
            <div className="empty">No items match your filters.</div>
          )}

          {/* Case 2: practice mode */}
          {filteredWords.length > 0 && mode === "practice" && (
            <div className="practice-layout">
              <div className="practice-card">
                <div className="card-label">Current phrase</div>
                <div className="hindi">{currentItem.hindi}</div>

                {/* English + examples stay hidden until the user clicks */}
                {showAnswer === false && (
                  <div className="reveal-area">
                    <button className="reveal-btn" onClick={() => setShowAnswer(true)}>
                      Show English &amp; Examples
                    </button>
                    <p className="reveal-hint">Try to recall the meaning first</p>
                  </div>
                )}

                {showAnswer === true && (
                  <div className="answer-area">
                    <div className="english">{currentItem.english}</div>
                    <div className="examples">
                      <span className="ex-label">Examples</span>
                      <ul>
                        {currentItem.examples.map((example, i) => (
                          <li key={i}>{example}</li>
                        ))}
                      </ul>
                    </div>
                    <button className="hide-btn" onClick={() => setShowAnswer(false)}>
                      Hide answer
                    </button>
                  </div>
                )}

                {/* Weak / Semi / Mastered buttons */}
                <div className="mark-btns">
                  <button
                    className={currentMark === "weak" ? "mark weak active" : "mark weak"}
                    onClick={() => markAndNext("weak")}
                  >
                    <span className="icon">↓</span> Weak <small>Need more practice</small>
                  </button>
                  <button
                    className={currentMark === "semi" ? "mark semi active" : "mark semi"}
                    onClick={() => markAndNext("semi")}
                  >
                    <span className="icon">−</span> Semi Weak <small>Somewhat familiar</small>
                  </button>
                  <button
                    className={currentMark === "mastered" ? "mark mastered active" : "mark mastered"}
                    onClick={() => markAndNext("mastered")}
                  >
                    <span className="icon">✓</span> Mastered <small>I know this well</small>
                  </button>
                </div>

                <div className="card-footer">
                  <button className="next-btn" onClick={goNext}>Next →</button>
                  <span className="counter">{safeIndex + 1} / {filteredWords.length}</span>
                </div>
              </div>

              {/* Side list of all items */}
              <aside className="remaining">
                <div className="remaining-header">Remaining items {filteredWords.length}</div>
                <ul>
                  {filteredWords.map((item, index) => {
                    const id = getId(tab, item);
                    return (
                      <li
                        key={id}
                        className={index === safeIndex ? "current" : ""}
                        onClick={() => pickItem(index)}
                      >
                        <span className={"status-dot " + getStatus(id)} />
                        <span className="item-hindi">{item.hindi}</span>
                      </li>
                    );
                  })}
                </ul>
              </aside>
            </div>
          )}

          {/* Case 3: list (table) mode */}
          {filteredWords.length > 0 && mode === "list" && (
            <div className="list-view">
              <table>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Hindi</th>
                    <th>English</th>
                    <th>Examples</th>
                    <th>Progress</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredWords.map((item, index) => {
                    const id = getId(tab, item);
                    const mark = marks[id] || null;
                    return (
                      <tr key={id} className={mark || ""}>
                        <td>{index + 1}</td>
                        <td className="hi">{item.hindi}</td>
                        <td>{item.english}</td>
                        <td className="ex-cell">
                          <ul>
                            {/* show only the first 2 examples in the table */}
                            {item.examples.slice(0, 2).map((example, i) => (
                              <li key={i}>{example}</li>
                            ))}
                            {item.examples.length > 2 && (
                              <li className="more">+{item.examples.length - 2} more</li>
                            )}
                          </ul>
                        </td>
                        <td className="btns">
                          <button className={mark === "weak" ? "active-weak" : ""} onClick={() => setMark(id, "weak")}>Weak</button>
                          <button className={mark === "semi" ? "active-semi" : ""} onClick={() => setMark(id, "semi")}>Semi</button>
                          <button className={mark === "mastered" ? "active-mastered" : ""} onClick={() => setMark(id, "mastered")}>Mastered</button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </section>
      )}
    </div>
  );
}