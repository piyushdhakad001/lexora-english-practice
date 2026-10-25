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
  ],
  idioms: [
    {
      hindi: "आँखों का तारा",
      english: "the apple of one's eye",
      examples: [
        "His daughter is the apple of his eye.",
        "That old car is the apple of his eye.",
        "The youngest child is the apple of her grandmother's eye.",
      ],
    },
    {
      hindi: "हाथ में होना",
      english: "in the bag",
      examples: [
        "The match is in the bag now.",
        "With this score, the championship is in the bag.",
        "Don't worry, the deal is almost in the bag.",
      ],
    },
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
      hindi: "दिल टूटना",
      english: "heartbroken",
      examples: [
        "She was heartbroken after the news.",
        "He looked heartbroken when he heard the result.",
        "Losing the pet left the whole family heartbroken.",
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
        "After three attempts she decided not to give up.",
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
      hindi: "मिलना",
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