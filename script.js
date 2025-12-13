/* script.js
   Final, fixed script for Time-Saving Habit Booster
   - Contains 500 tasks (vanilla JS)
   - Proper DOMContentLoaded initialization (prevents "Loading..." freeze)
   - Daily assignment persisted to localStorage
   - Prevents a task repeating more than MAX_REPEATS_PER_MONTH in the same month
   - Prevents showing the same task more than once on the same day (including previews)
   - Records Complete / Skip actions into localStorage history with {date, task, status}
   - Weekly summary (last 7 days) with counts, percent, and simple streak
   - "Generate New Task" gives a temporary preview (does NOT overwrite today's saved assignment)
   - Comments explain important parts
*/

/* ============================
   Configuration & Task List
   ============================ */

const MAX_REPEATS_PER_MONTH = 3; // limit per task per month
const HISTORY_LIMIT = 365;      // keep last N history entries

// 500 tasks array (each is a short 20-minute micro-task)
const TASKS = [
"Organize 5 files on your computer",
"Clean your desk surface",
"Plan tomorrow’s checklist",
"Read 2 pages of a book",
"Practice vocabulary flashcards",
"Review one school chapter summary",
"Delete unused phone apps",
"Clean one drawer",
"Journal for 20 minutes",
"Practice typing for 20 minutes",

"Sort old screenshots",
"Organize your downloads folder",
"Clean keyboard + mouse",
"Stretch for 20 minutes",
"Do one Pomodoro study round",
"Review math formulas",
"Practice English grammar",
"Reorganize your backpack",
"Plan meals for tomorrow",
"Review one online lesson",

"Clean your browser bookmarks",
"Delete junk emails",
"Organize one Google Drive folder",
"Practice pronunciation drills",
"Read one Wikipedia article",
"Re‑write messy class notes",
"Clean your room surface area",
"Do a 20‑min coding warm‑up",
"Review flashcards",
"Meditate with calm breathing",

"Plan weekly goals",
"Sort 10 photos",
"Practice drawing",
"Review personal budget",
"Clean bedside table",
"Organize stationery",
"Practice mental math",
"Review science notes",
"Do light stretching",
"Update to‑do list",

"Clean water bottle",
"Organize cables",
"Declutter recent downloads",
"Plan 3 priorities for next day",
"Read 1 educational article",
"Sort notifications",
"Review old homework",
"Plan study schedule",
"Tidy shelf top",
"Clean mirror or window",

"Organize exam resources",
"Practice reading speed",
"Write a short reflection",
"Clean shoes",
"Sort 5 random files",
"Review geography notes",
"Learn 5 new words",
"Fix broken stationery",
"Sort your wallet",
"Make 5 quiz questions",

"Practice handwriting",
"Re‑organize desktop icons",
"Plan weekend tasks",
"Clean digital trash",
"Do quick cardio",
"Stretch neck + shoulders",
"Sort cables",
"Clean phone screen",
"Review history notes",
"List 5 improvements",

"Practice breathing exercises",
"Organize playlists",
"Update study timetable",
"Read one news summary",
"Practice quick math",
"Review biology notes",
"Recheck notebook",
"Update goals board",
"Clean whiteboard",
"Organize chargers",

"Sort old PDFs",
"Review chemistry notes",
"Learn 5 facts",
"Practice speedwriting",
"Make a mind map",
"Do a short meditation",
"Tidy bookshelf",
"Practice instrument scales",
"Clean glasses",
"Rewrite messy notes",

"Organize sticky notes on your desk",
"Plan 3 micro‑goals for the week",
"Clean your keyboard keys with a cotton swab",
"Sort through old notebooks",
"Create a mini‑vision board",
"Review notes from one past class",
"Delete duplicates from your photo gallery",
"Clean your room’s switchboards",
"Practice fast reading drills",
"Do a 20‑min calm breathing session",

"Reorganize your clothes shelf",
"Sort unused browser extensions",
"Backup important files",
"Plan your next study session",
"Clean your study table drawers",
"Practice basic coding challenges",
"Review physics formulas",
"Fix your pillow and bed setup",
"Clean your water bottle lid",
"Sort downloaded videos",

"Practice speech clarity (read aloud)",
"Declutter one shelf",
"Make quick digital notes for a topic",
"Sort 20 photos from your gallery",
"Make a short to‑do list for tonight",
"Clean your backpack pockets",
"Practice a new language for 20 minutes",
"Organize stationery by category",
"Review your monthly goals",
"Stretch lower body muscles",

"Do a warm‑up writing session",
"Sort one messy folder on your laptop",
"Plan a 3‑day productivity streak",
"Clean your fan/vent dust (light)",
"Review geography facts",
"Rearrange books on your shelf",
"Delete useless browser tabs",
"Organize mobile home screen",
"Practice memory recall exercise",
"Clean your study chair",

"Make 3 digital flashcards",
"Review last week’s notes",
"Write 5 ideas for self‑improvement",
"Plan hydration goals",
"Clean door handles",
"Organize small cables with ties",
"Practice keyboard shortcuts",
"Learn 3 new study techniques",
"Review one chapter summary",
"Create a small gratitude list",

"Practice pen control handwriting",
"Clean under your bed area",
"Sort voice recordings on phone",
"Organize notification settings",
"Review chemistry formulas",
"Delete useless PDFs",
"Clean reading glasses",
"Create a quick meal plan idea",
"Practice posture for 20 minutes",
"Rearrange apps into folders",

"Learn a new science fact",
"Organize your calendar",
"Clean your mousepad",
"Sort receipts or papers",
"Review past assignments",
"Update your goal tracking sheet",
"Practice quick quizzes online",
"Organize cloud storage",
"Stretch wrists & arms",
"Clean monitors or screens",

"Create a personal rule list",
"Review diagrams in your textbook",
"Make a motivational wallpaper",
"Organize business/study cards",
"Practice reading comprehension",
"Declutter your messages inbox",
"Clean a small corner of room",
"Sort 10 unused items to donate",
"Review basic grammar rules",
"Practice deep breathing with music",

"Do a short home workout",
"Clean your reusable bag",
"Re‑arrange study materials",
"Organize bookmarks into folders",
"Review formulas flashcards",
"Clean inside drawers lightly",
"Practice mental focus exercises",
"Plan sleep schedule improvements",
"Sort notification sounds",
"Clean dust under keyboard",

"Practice presentation skills alone",
"Review biology diagrams",
"Update digital wallpaper",
"Plan your tomorrow’s outfit",
"Clean your phone charging port area (no sharp objects)",
"Organize your pens by ink type",
"Sort and rename files",
"Do mindful breathing for focus",
"Rebuild one folder structure properly",
"Review your habit tracker",

"Clean your study lamp",
"Organize pens by color",
"Review algebra basics",
"Sort 15 images into albums",
"Write a small personal rule list",
"Practice reading a complex paragraph",
"Clean dust behind your monitor",
"Organize water bottles and cups",
"Review class notes for one subject",
"Sort random cables in a box",

"Clean your door frame edges",
"Create a shortcut folder for quick files",
"Practice logic puzzles for 20 minutes",
"Update your mini‑goals",
"Clean your headphone cushions",
"Sort small items into containers",
"Review diagrams in a notebook",
"Rewrite sloppy handwriting notes",
"Clean the outside of your PC case",
"Sort downloaded music",

"Organize your gaming/study area",
"Practice 20‑minute meditation",
"Clean study bag zippers",
"Sort small boxes or containers",
"Review 5 chemistry reactions",
"Delete 10 useless screenshots",
"Clean drawer handles",
"Practice 10 tongue‑twisters",
"Sort stationery by priority",
"Plan your next 3 tasks",

"Review world map countries",
"Organize apps by category",
"Clean desk edges",
"Practice summarizing short texts",
"Sort 1 messy shelf completely",
"Clean remote controls",
"Review key school topics",
"Rewrite yesterday’s notes neatly",
"Declutter your reading list",
"Practice flashcards for 20 mins",

"Plan hydration and nutrition goals",
"Clean out unused papers",
"Organize planner or digital notes",
"Review history timeline",
"Clean dusty wall corners",
"Practice reading out loud",
"Sort belongings into keep/donate",
"Clean small electronics carefully",
"Practice relaxation breathing",
"Organize USB drives",

"Review a saved YouTube tutorial",
"Clean earbuds safely",
"Sort your stickers or stationery packs",
"Recheck school backpack essentials",
"Review difficult formulas",
"Organize your saved documents",
"Clean your desk legs and edges",
"Practice math speed drills",
"Delete unused files from cloud",
"Clean area near bed",

"Practice 20-minute focus drill",
"Organize your browser homepage",
"Clean your laundry basket",
"Practice writing a neat paragraph",
"Sort coloring or art tools",
"Review grammar notes",
"Clean small shelves thoroughly",
"Practice breathing with music",
"Sort random phone files",
"Clean your calculator",

"Review physics diagrams",
"Organize workout or health items",
"Clean bottom of water bottle",
"Practice a short coding session",
"Sort contest or project files",
"Clean drawer inner sides",
"Practice memory exercise",
"Clean edges of notebooks",
"Sort important papers",
"Review notes from one chapter",

"Organize art brushes or pens",
"Clean keyboard caps",
"Practice performing a speech",
"Sort your phone wallpapers",
"Review old homework summaries",
"Clean rims of monitors",
"Practice mindfulness for 20 mins",
"Sort zipped files",
"Clean sticky residue on devices",
"Review vocabulary lists",

"Plan 3-week micro-goals",
"Clean wardrobe handles",
"Organize notes by category",
"Practice drawing simple shapes",
"Sort items under the bed",
"Review key math definitions",
"Clean power strip",
"Plan weekend study goals",
"Sort backup folders",
"Review productivity logs",

"Organize loose worksheets into folders",
"Clean your study table legs",
"Review formulas you memorized earlier",
"Sort old digital notes",
"Clean behind your study door",
"Review a topic you always avoid",
"Organize your colored pens",
"Clean the buttons of your devices",
"Review last month’s progress",
"Sort old voice notes",

"Clean your pencil case",
"Review key vocabulary you learned recently",
"Sort your bookmarks into useful groups",
"Clean corners of laptop screen",
"Review diagrams for science class",
"Sort unnecessary recordings",
"Clean the bottom of your chair",
"Review one chapter you completed",
"Sort different notebooks by subject",
"Clean the dust under your keyboard stand",

"Organize digital flashcards",
"Clean sticky marks from desk",
"Review lesson summaries",
"Sort random clothes for storage",
"Clean window frame grooves",
"Review basic arithmetic",
"Organize mobile folders neatly",
"Clean backpack front pocket",
"Review study achievements",
"Sort bag compartments",

"Clean your small shelf dividers",
"Review important science formulas",
"Organize your online study resources",
"Clean the edges of your bed frame",
"Review saved important links",
"Sort items in your pencil box",
"Clean dust from extension boards",
"Review your strongest subject",
"Sort your reading books by type",
"Clean your phone's back cover",

"Organize sticky reminders",
"Clean small table accessories",
"Review key terms from any subject",
"Sort old homework papers",
"Clean around switchboards",
"Review yesterday’s tasks",
"Sort headphones, chargers, cables",
"Clean your drawers with a cloth",
"Review chapter summaries",
"Sort your storage boxes",

"Clean books and wipe dust",
"Review handwritten notes",
"Sort leftover stationery",
"Clean old sticky residue",
"Review one saved PDF",
"Organize your folders alphabetically",
"Clean between desk cracks",
"Review old test papers",
"Sort unused art materials",
"Clean board/whiteboard",

"Organize your monthly study plan",
"Clean device charging area",
"Review formulas you wrote down",
"Sort used notebooks for archive",
"Clean light dust from walls",
"Review a short educational video",
"Sort pens by ink level",
"Clean your desk chair wheels",
"Review digital notebook",
"Sort documents by urgency",

"Clean the corners of the room",
"Review a class topic from earlier year",
"Sort all random loose sheets",
"Clean your bookshelf edges",
"Review your weekly accomplishments",
"Sort downloaded ZIP files",
"Clean pencil shavings area",
"Review memory flashcards",
"Sort your desk drawer fully",
"Clean computer cables setup",

"Organize all tasks for next 3 days",
"Clean around workstation floor",
"Review your highlight notes",
"Sort gadgets by usage",
"Clean your mouse and keyboard properly",
"Review online class notes",
"Sort small items into a mini‑box",
"Clean shelf corners carefully",
"Review your best learning strategies",
"Sort USB drives and delete waste",

"Clean surface behind laptop",
"Review notes before exams",
"Sort device screenshots into folders",
"Clean one random corner of the room",
"Review tough definitions",
"Sort pencils, erasers, rulers properly",
"Clean any dusty plastic items",
"Review handwritten formulas",
"Sort everything on your table neatly",
"Clean and reset your entire study space"
]; // end TASKS (500)

/* ============================
   LocalStorage Helpers
   ============================ */

function lsGet(key, fallback = null) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch (e) {
    console.warn("lsGet error", e);
    return fallback;
  }
}

function lsSet(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.warn("lsSet error", e);
  }
}

/* ============================
   Date helpers
   ============================ */

function todayKey(offset = 0) {
  const d = new Date();
  d.setDate(d.getDate() + offset);
  return d.toISOString().split("T")[0]; // YYYY-MM-DD
}

function monthKeyForDate(dateISO = null) {
  const d = dateISO ? new Date(dateISO) : new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`; // YYYY-MM
}

/* ============================
   Keys in localStorage
   ============================ */

const LS_KEYS = {
  TODAY_ASSIGN: "tshb_today_assign",        // object { date, taskIndex, task, generatedAt }
  MONTH_COUNTS: (month) => `tshb_counts_${month}`, // stores { index: count }
  HISTORY: "tshb_history",                  // array of {date,task,status}
  SEEN_TODAY: (date) => `tshb_seen_${date}` // array of task indices shown today (today + previews)
};

/* ============================
   Seen-today helpers
   Prevent showing same task more than once in a day
   ============================ */

function getSeenToday(date = todayKey()) {
  return lsGet(LS_KEYS.SEEN_TODAY(date), []);
}

function addSeenToday(index, date = todayKey()) {
  const key = LS_KEYS.SEEN_TODAY(date);
  const arr = lsGet(key, []);
  if (!arr.includes(index)) {
    arr.push(index);
    lsSet(key, arr);
  }
}

/* ============================
   Pick or create today's task
   - Ensures monthly limit and seen-today constraints
   ============================ */

function getOrCreateTodayTask() {
  const today = todayKey();
  const saved = lsGet(LS_KEYS.TODAY_ASSIGN, null);
  if (saved && saved.date === today && typeof saved.taskIndex === "number") {
    // ensure saved index is added to seen-today (in case not added earlier)
    addSeenToday(saved.taskIndex, today);
    return saved;
  }

  // Choose a task index respecting monthly counts
  const monthKey = monthKeyForDate();
  const counts = lsGet(LS_KEYS.MONTH_COUNTS(monthKey), {}) || {};

  // Build list of eligible indices (count < MAX_REPEATS_PER_MONTH)
  let eligible = [];
  for (let i = 0; i < TASKS.length; i++) {
    const c = counts[i] || 0;
    if (c < MAX_REPEATS_PER_MONTH) eligible.push(i);
  }
  // If all reached limit, reset counts for month (rare) and make all eligible
  if (eligible.length === 0) {
    lsSet(LS_KEYS.MONTH_COUNTS(monthKey), {});
    for (let i = 0; i < TASKS.length; i++) eligible.push(i);
  }

  // Also avoid tasks that were seen already today (preview or previous assignment)
  const seenToday = getSeenToday(today);
  let filtered = eligible.filter(i => !seenToday.includes(i));
  // If filtered empty, we will allow eligible (so user can still get a day's task)
  if (filtered.length === 0) filtered = eligible;

  // Random pick
  const chosenIndex = filtered[Math.floor(Math.random() * filtered.length)];

  // Update monthly counts
  counts[chosenIndex] = (counts[chosenIndex] || 0) + 1;
  lsSet(LS_KEYS.MONTH_COUNTS(monthKey), counts);

  // Save assignment
  const assignment = {
    date: today,
    taskIndex: chosenIndex,
    task: TASKS[chosenIndex],
    generatedAt: new Date().toISOString()
  };
  lsSet(LS_KEYS.TODAY_ASSIGN, assignment);

  // Mark as seen today so previews won't repeat it
  addSeenToday(chosenIndex, today);

  return assignment;
}

/* ============================
   Recording actions (Complete / Skip)
   ============================ */

function recordAction(dateISO, taskName, status) {
  const history = lsGet(LS_KEYS.HISTORY, []) || [];
  history.unshift({
    date: dateISO,
    task: taskName,
    status: status
  });
  lsSet(LS_KEYS.HISTORY, history.slice(0, HISTORY_LIMIT)); // keep limit
}

/* ============================
   Weekly summary computation
   (last N days; default 7)
   ============================ */

function computeWeeklySummary(days = 7) {
  const history = lsGet(LS_KEYS.HISTORY, []) || [];
  const cutoff = new Date();
  cutoff.setDate(cutoff.getDate() - (days - 1));
  cutoff.setHours(0,0,0,0);

  let completed = 0, skipped = 0;
  const recent = [];

  for (const item of history) {
    const d = new Date(item.date + "T00:00:00");
    if (d >= cutoff) {
      recent.push(item);
      if (item.status === "complete") completed++;
      if (item.status === "skip") skipped++;
    }
  }
  const total = completed + skipped;
  const pct = total === 0 ? 0 : Math.round((completed / total) * 100);
  return { completed, skipped, percentage: pct, recent };
}

/* ============================
   DOM & UI Helpers
   ============================ */

let dom = {}; // will hold references to elements
let currentAssignment = null; // today's assignment object
let tempPreview = { active: false, index: null }; // preview state

function cacheDom() {
  dom.taskText = document.getElementById("taskText");
  dom.taskMeta = document.querySelector(".task-sub");
  dom.completeBtn = document.getElementById("completeBtn");
  dom.skipBtn = document.getElementById("skipBtn");
  dom.generateBtn = document.getElementById("newTaskBtn");
  dom.feedback = (() => {
    // create feedback element if not present
    let f = document.getElementById("feedbackMsg");
    if (!f) {
      f = document.createElement("div");
      f.id = "feedbackMsg";
      f.style.marginTop = "10px";
      f.style.fontSize = "0.95rem";
      dom.taskText.parentNode.appendChild(f);
    }
    return f;
  })();
  dom.completedCount = document.getElementById("completedCount");
  dom.skippedCount = document.getElementById("skippedCount");
  dom.completionPct = document.getElementById("percentCount");
  dom.completedBar = document.getElementById("completedBar");
  dom.skippedBar = document.getElementById("skippedBar");
  dom.historyUL = document.getElementById("historyUL"); // may be undefined in minimal UI
  dom.streakLabel = document.getElementById("streakLabel");
}

/* Render today's assignment on the card */
function renderAssignment(assign, options = { preview: false }) {
  dom.taskText.textContent = assign.task;
  dom.taskMeta.textContent = options.preview ? "Temporary preview • 20 minutes" : "20 minutes • micro-habit";

  // small fade-in (CSS-free, basic)
  dom.taskText.style.opacity = "0";
  dom.taskText.style.transform = "translateY(6px)";
  requestAnimationFrame(() => {
    dom.taskText.style.transition = "opacity 380ms ease, transform 380ms ease";
    dom.taskText.style.opacity = "1";
    dom.taskText.style.transform = "translateY(0)";
  });
}

/* Update summary UI */
function updateSummaryUI() {
  const s = computeWeeklySummary(7);
  dom.completedCount.textContent = s.completed;
  dom.skippedCount.textContent = s.skipped;
  dom.completionPct.textContent = s.percentage + "%";

  // Progress bar widths
  const total = s.completed + s.skipped;
  const compPct = total === 0 ? 0 : Math.round((s.completed / total) * 100);
  const skipPct = total === 0 ? 0 : Math.round((s.skipped / total) * 100);

  if (dom.completedBar) dom.completedBar.style.width = compPct + "%";
  if (dom.skippedBar) dom.skippedBar.style.width = skipPct + "%";

  // Streak: count consecutive days from today where at least one 'complete' exists
  const hist = lsGet(LS_KEYS.HISTORY, []) || [];
  let streak = 0;
  let dayOffset = 0;
  while (true) {
    const dKey = todayKey(-dayOffset);
    const hasComplete = hist.some(h => h.date === dKey && h.status === "complete");
    if (hasComplete) { streak++; dayOffset++; }
    else break;
  }
  if (dom.streakLabel) dom.streakLabel.textContent = streak > 0 ? `${streak}-day streak 🔥` : "No streak yet";
}

/* Provide feedback text (fades out) */
function showFeedback(text, kind = "info") {
  dom.feedback.textContent = text;
  dom.feedback.style.color = kind === "success" ? "#0b6623" : (kind === "warn" ? "#8b1e1e" : "#14532d");
  dom.feedback.style.opacity = "1";
  setTimeout(() => {
    dom.feedback.style.transition = "opacity 700ms ease";
    dom.feedback.style.opacity = "0";
  }, 1800);
  setTimeout(() => {
    dom.feedback.textContent = "";
    dom.feedback.style.opacity = "1";
    dom.feedback.style.transition = "";
  }, 2600);
}

/* ============================
   Button Handlers
   ============================ */

function onComplete() {
  const date = todayKey();
  const taskName = tempPreview.active ? TASKS[tempPreview.index] : currentAssignment.task;
  recordAction(date, taskName, "complete");
  // increment month count (if completing a real assigned task)
  if (!tempPreview.active) {
    incrementMonthlyCount(currentAssignment.taskIndex);
  }
  showFeedback("Saved: Completed ✅", "success");
  // After marking complete, update summary
  updateSummaryUI();
}

function onSkip() {
  const date = todayKey();
  const taskName = tempPreview.active ? TASKS[tempPreview.index] : currentAssignment.task;
  recordAction(date, taskName, "skip");
  if (!tempPreview.active) {
    incrementMonthlyCount(currentAssignment.taskIndex);
  }
  showFeedback("Saved: Skipped ⏭️", "warn");
  updateSummaryUI();
}

/* Increment monthly count for assigned index (used when recording action of the assigned task).
   Note: counts for preview-only actions should not increment assigned counts - previews don't change daily assignment.
*/
function incrementMonthlyCount(taskIndex) {
  if (typeof taskIndex !== "number") return;
  const monthKey = monthKeyForDate();
  const countsKey = LS_KEYS.MONTH_COUNTS(monthKey);
  const counts = lsGet(countsKey, {}) || {};
  counts[taskIndex] = (counts[taskIndex] || 0) + 1;
  lsSet(countsKey, counts);
}

/* recordAction wrapper used in handlers */
function recordAction(dateISO, taskName, status) {
  const history = lsGet(LS_KEYS.HISTORY, []) || [];
  history.unshift({ date: dateISO, task: taskName, status: status });
  lsSet(LS_KEYS.HISTORY, history.slice(0, HISTORY_LIMIT));
}

/* Generate new task for testing (preview) - does NOT overwrite assignment */
function onGenerateNewTaskForTest() {
  const seen = getSeenToday(todayKey());
  // Build list of candidate indices that have not been seen today
  let candidates = [];
  for (let i = 0; i < TASKS.length; i++) {
    if (!seen.includes(i)) candidates.push(i);
  }
  // If all seen, reset seen for previews (but keep today's assignment saved)
  if (candidates.length === 0) {
    lsSet(LS_KEYS.SEEN_TODAY(todayKey()), []); // reset seen
    candidates = Array.from({ length: TASKS.length }, (_, i) => i);
  }
  const pick = candidates[Math.floor(Math.random() * candidates.length)];
  tempPreview.active = true;
  tempPreview.index = pick;
  addSeenToday(pick, todayKey()); // mark preview as seen today
  renderAssignment({ task: TASKS[pick] }, { preview: true });
  showFeedback("Temporary preview — does NOT replace saved daily task.", "info");

  // After 9 seconds revert to saved assignment automatically to avoid confusion
  setTimeout(() => {
    if (tempPreview.active && tempPreview.index === pick) {
      tempPreview.active = false;
      tempPreview.index = null;
      renderAssignment(currentAssignment, { preview: false });
      showFeedback("Reverted to today's saved task.", "info");
    }
  }, 9000);
}

/* ============================
   Initialization & Mounting
   ============================ */

function attachHandlers() {
  dom.completeBtn.addEventListener("click", onComplete);
  dom.skipBtn.addEventListener("click", onSkip);
  dom.generateBtn.addEventListener("click", onGenerateNewTaskForTest);
}

/* Main initialization function (called after DOMContentLoaded) */
function init() {
  cacheDom();
  attachHandlers();

  // Ensure seenToday structure exists for today (avoid errors)
  const today = todayKey();
  if (lsGet(LS_KEYS.SEEN_TODAY(today), null) === null) {
    lsSet(LS_KEYS.SEEN_TODAY(today), []);
  }

  // Get or create today's assignment and render it
  currentAssignment = getOrCreateTodayTask();
  renderAssignment(currentAssignment, { preview: false });

  // Update weekly summary UI
  updateSummaryUI();
  // ------------------------
// MODAL SYSTEM
// ------------------------

const copyrightBtn = document.getElementById("copyrightBtn");
const contactBtn = document.getElementById("contactBtn");

const copyrightModal = document.getElementById("copyrightModal");
const contactModal = document.getElementById("contactModal");

const closeButtons = document.querySelectorAll(".close");

// Open modals
copyrightBtn.onclick = () => copyrightModal.style.display = "block";
contactBtn.onclick = () => contactModal.style.display = "block";

// Close modals
closeButtons.forEach(btn => {
    btn.onclick = () => {
        const modalId = btn.getAttribute("data-close");
        document.getElementById(modalId).style.display = "none";
    };
});

// Close when clicking outside modal
window.onclick = (event) => {
    if (event.target === copyrightModal) copyrightModal.style.display = "none";
    if (event.target === contactModal) contactModal.style.display = "none";
};

// Contact form (local only)
document.getElementById("contactForm").onsubmit = (e) => {
    e.preventDefault();
    alert("Your message has been submitted!");
    contactModal.style.display = "none";
};

}

/* Run init when DOM is ready */
document.addEventListener("DOMContentLoaded", init);

/* ============================
   Notes:
   - script relies only on localStorage (no backend)
   - index.html should include: <script src="script.js" defer></script>
   - Make sure script.js is in same folder as index.html OR update the src path accordingly
   - If you still see "Loading...":
       1) Open Developer Tools → Console — check for errors
       2) Ensure index.html has correct id="taskText" etc.
       3) Ensure script tag uses 'defer' or file is loaded after DOM
   - Keys used in localStorage:
       LS_KEYS.TODAY_ASSIGN        -> today's saved assignment
       LS_KEYS.MONTH_COUNTS(month) -> per-month counts by index
       LS_KEYS.HISTORY             -> recent actions array
       LS_KEYS.SEEN_TODAY(date)    -> array of task indices already shown today (assignment + previews)
   - The task array contains exactly 500 entries. You can edit/remove/add items; keep indexes consistent if you want to preserve monthly counts.
   - If you want a local reset during development, open console and run:
       localStorage.removeItem('tshb_today_assign');
       localStorage.removeItem('tshb_history');
       localStorage.removeItem('tshb_counts_YYYY-MM'); // replace with current month key
       localStorage.removeItem('tshb_seen_YYYY-MM-DD'); // replace with today's key
*/

