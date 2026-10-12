/*
  SETUP NOTE:
  1) Set SONG_URL to the shareable link for the updated custom song.
  2) Open qr-cards.html after uploading this folder to hosting.
  3) QR links use ?stage=1 through ?stage=7. The car QR is the finale.
*/
const SONG_URL =
  "https://drive.google.com/file/d/1qQgVSWIn1imkWJIKuBi87Z1NItc92xnc/view?usp=drivesdk";
const stages = {
  1: {
    title: "The silent storytellers",
    clue: "I hold many worlds but never travel. My silent secrets are yours to unravel. My friends stand in rows, with stories to tell. Where do these paper storytellers gather?",
    answers: ["bookshelf", "book shelf", "books", "bookcase", "the bookshelf"],
    destination:
      "Head to the bookshelf. Look for a small QR card tucked nearby.",
    wrong:
      "Close, but no case closed yet. Look for a home where stories stand side by side.",
  },
  2: {
    title: "The quiet keeper",
    clue: "Where plans are made and work gets done, a quiet keeper hides from everyone. Behind its doors, away from sight, a secret waits out of the light. Find the closed space in the room of work. Where am I?",
    answers: [
      "office closet",
      "office room closet",
      "closet in office",
      "closet in the office",
      "office cupboard",
      "office cabinet",
      "work room closet",
      "study closet",
      "office wardrobe",
    ],
    destination:
      "Head to the closet in your office room. Your next QR code is hidden inside. Search carefully.",
    wrong:
      "Think of a storage space with doors, inside the room where you work.",
  },
  3: {
    title: "A chilly personality",
    clue: "I keep things fresh and have a chilly personality. I guard snacks, leftovers, and midnight decisions. What am I?",
    answers: ["refrigerator", "fridge", "the fridge", "the refrigerator"],
    destination:
      "Visit the refrigerator. Your next QR card is waiting nearby—not inside anything that could get wet.",
    wrong: "Brrr… you're looking for the place that keeps food cold.",
  },
  4: {
    title: "The daily decision",
    clue: "Some things are folded, some hang with care. Some are favorites you choose to wear. Find the place where your daily outfit decisions live.",
    answers: [
      "wardrobe",
      "closet",
      "clothes closet",
      "the wardrobe",
      "his wardrobe",
    ],
    destination:
      "Go to your wardrobe and look behind the folded clothes for the next QR card.",
    wrong:
      "Not the laundry basket, detective. Think of where clothes are stored and chosen.",
  },
  5: {
    title: "A well-earned break",
    clue: "I welcome movie nights, scrolling sessions, naps, and long conversations. I take the weight off your feet. Where am I?",
    answers: ["sofa", "couch", "the sofa", "the couch"],
    destination:
      "Head to the sofa. Check around the cushions and nearby side table for your next QR card.",
    wrong: "Take a seat and think about the comfiest spot in the living room.",
  },
  6: {
    title: "The waiting traveler",
    clue: "I wait patiently when journeys end, yet I'm always ready when plans begin. I have windows but I'm not a house, and a key brings me to life. Where am I?",
    answers: [
      "car",
      "our car",
      "my car",
      "his car",
      "vehicle",
      "the car",
      "automobile",
    ],
    destination:
      "Correct, detective! Your next QR code is waiting inside your car. Search carefully.",
    wrong:
      "Think of something parked that takes you places, even though it stays still between trips.",
  },
};
const app = document.getElementById("app");
const params = new URLSearchParams(window.location.search);
const stage = Number(params.get("stage") || 0);
const clean = (s) =>
  s
    .toLowerCase()
    .trim()
    .replace(/[’']/g, "")
    .replace(/[^a-z0-9 ]/g, "")
    .replace(/\s+/g, " ");
function home() {
  app.innerHTML = `<div class="ornament">✦ ✧ ✦</div><p class="eyebrow">A birthday case file</p><h1>A little<br>mystery for you.</h1>
 <p class="lead">Hey, birthday boy. ♥</p>
 <p>An unusual situation has been reported. I have planned something special just for you. Every little detail was put together with love, and every clue holds a little piece of my heart.</p>
 <p>Today, I want to take you on a little adventure filled with love, laughter, and a few surprises. No shortcuts. No asking your wife for hints! 😉</p>
 <div class="rule"></div><p>Trust your instincts, follow the clues, and remember — behind this mystery is someone who loves you more than words can express. ♥</p>
 <button id="begin">ACCEPT THE MISSION ↗</button>`;
  document.getElementById("begin").onclick = () => {
    history.replaceState(null, "", location.pathname);
    showStage(0);
  };
}
function showStage(n) {
  if (n === 0) {
    app.innerHTML = `<div class="ornament">✦ ✧ ✦</div><p class="eyebrow">Mission activated · Opening riddle</p><h2>Detective, you're in.</h2><p class="lead">I have a face, but no eyes of my own. I copy your expressions without making a sound. You probably see me every morning. Where am I?</p><div class="rule"></div><label for="answer">Your best guess</label><input id="answer" autocomplete="off" placeholder="Type your answer…"><button id="check">CHECK MY ANSWER</button><p class="feedback" id="feedback"></p><p class="note">Solve this to uncover your first hidden QR location.</p>`;
    document.getElementById("check").onclick = () =>
      checkAnswer(
        ["bathroom mirror", "mirror", "the mirror"],
        "Correct! Go to the bathroom mirror and find the first hidden QR card. Scan it to unlock your next riddle.",
        "Not quite, detective. Think of the silent copycat you see every morning. 😏",
      );
    document.getElementById("answer").addEventListener("keydown", (e) => {
      if (e.key === "Enter") document.getElementById("check").click();
    });
    return;
  }
  if (n >= 1 && n <= 6) {
    const s = stages[n];
    app.innerHTML = `<p class="eyebrow">A new lead</p><h2>${s.title}</h2><p class="lead">${s.clue}</p><div class="rule"></div><label for="answer">What is your answer?</label><input id="answer" autocomplete="off" placeholder="Type your answer…"><button id="check">CHECK MY ANSWER</button><p class="feedback" id="feedback"></p><p class="note">Hint: read it twice before accusing the furniture.</p>`;
    document.getElementById("check").onclick = () =>
      checkAnswer(s.answers, s.destination, s.wrong);
    document.getElementById("answer").addEventListener("keydown", (e) => {
      if (e.key === "Enter") document.getElementById("check").click();
    });
    return;
  }
  home();
}
function checkAnswer(answers, destination, wrong) {
  const input = clean(document.getElementById("answer").value);
  const fb = document.getElementById("feedback");
  if (answers.some((a) => clean(a) === input)) {
    fb.textContent = "Correct. Okay, detective… not bad. 😏";
    const old = document.getElementById("destination");
    if (old) old.remove();
    const p = document.createElement("p");
    p.id = "destination";
    p.className = "lead";
    p.style.marginTop = "18px";
    p.textContent = destination;
    document.getElementById("check").after(p);
    document.getElementById("check").textContent = "CASE NOTE RECEIVED ✓";
    document.getElementById("check").disabled = true;
  } else {
    fb.textContent = wrong;
    const inputEl = document.getElementById("answer");
    inputEl.focus();
  }
}
// These QR stages are located beside wrapped gifts; celebrate on arrival,
// not when the previous riddle is answered.
const giftCheckpoints = {
  3: "Excellent detective work! There is something waiting for you here. Unwrap it before continuing. ♥",
  5: "Another mystery solved! Take a moment to enjoy what you found. ✨",
  7: "You found the final surprise, Sugam! ♥ Take your time unwrapping it. When you are ready, I have something I want to tell you.",
};
function launchCelebration(message) {
  const overlay = document.getElementById("celebration");
  document.getElementById("party-message").textContent = message;
  overlay
    .querySelectorAll(".party-piece,.party-balloon")
    .forEach((el) => el.remove());
  overlay.classList.add("active");
  document.getElementById("party-continue").focus();
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  for (let i = 0; i < 85; i++) {
    const el = document.createElement("span");
    el.className = "party-piece";
    el.textContent = ["✦", "●", "◆", "✨"][Math.floor(Math.random() * 4)];
    el.style.color = ["#d6b574", "#fff6eb", "#f3a4b5", "#e9cf95"][
      Math.floor(Math.random() * 4)
    ];
    el.style.left = Math.random() * 100 + "%";
    el.style.fontSize = 10 + Math.random() * 16 + "px";
    el.style.animationDuration = 2.8 + Math.random() * 3 + "s";
    el.style.animationDelay = Math.random() * 1.5 + "s";
    overlay.appendChild(el);
    el.addEventListener("animationend", () => el.remove());
  }
  for (let i = 0; i < 10; i++) {
    const el = document.createElement("span");
    el.className = "party-balloon";
    el.textContent = "🎈";
    el.style.left = Math.random() * 95 + "%";
    el.style.fontSize = 27 + Math.random() * 24 + "px";
    el.style.animationDuration = 5 + Math.random() * 4 + "s";
    el.style.animationDelay = Math.random() * 1.4 + "s";
    overlay.appendChild(el);
    el.addEventListener("animationend", () => el.remove());
  }
}
document.getElementById("party-continue").onclick = () => {
  document.getElementById("celebration").classList.remove("active");
  document.getElementById("app").querySelector("input,button,a")?.focus();
};
if (stage >= 1 && stage <= 6) {
  showStage(stage);
} else if (stage === 7) {
  showFinalCheckpoint();
} else {
  home();
}
if (giftCheckpoints[stage]) launchCelebration(giftCheckpoints[stage]);

// Final gift: scanning the QR inside his car unlocks a love letter first.
// The updated song is only revealed after Sugam chooses to continue.
function showFinalCheckpoint() {
  app.innerHTML = `<div class="ornament">♥ ✦ ♥</div>
    <p class="eyebrow">The final checkpoint</p>
    <h1>Mission accomplished, my love.</h1>
    <p class="lead">You found the last surprise! Take your time and enjoy it. ♥</p>
    <p>Before this little mystery ends, there's something I want you to read — something that comes straight from my heart.</p>
    <button id="read-letter" type="button">READ SOMETHING FROM MY HEART ♥</button>`;
  document.getElementById("read-letter").onclick = showLoveLetter;
}
function showLoveLetter() {
  app.classList.add("reveal");
  app.innerHTML = `<div class="ornament">♥ ✧ ♥</div>
    <p class="eyebrow">From my heart to yours</p>
    <h2>Happy Birthday, Sugam ♥</h2>
    <p>જન્મદિવસની ખૂબ ખૂબ શુભેચ્છાઓ! ♥</p>
    <p>ક્યાંથી શરૂ કરું અને શું લખું એ જ સમજાતું નથી, કારણ કે તારા માટે મારા દિલમાં જેટલો પ્રેમ છે, એને શબ્દોમાં વ્યક્ત કરવો કદાચ શક્ય જ નથી.</p>
    <p>ક્યારેક આપણી અત્યાર સુધીની સફર વિશે વિચારું છું ત્યારે થાય છે કે સમય કેટલો જલદી પસાર થઈ ગયો! એવું લાગે છે જાણે હમણાં જ આપણે એકબીજાનો હાથ પકડ્યો હતો અને આજે એ જ હાથ પકડીને જીવનની કેટલી બધી પળો સાથે જીવી લીધી છે.</p>
    <p>આપણે સાથે ખૂબ હસ્યાં છીએ, મસ્તી કરી છે, નાની નાની વાતોમાં ઝઘડ્યાં પણ છીએ, એકબીજાને મનાવ્યાં છે અને કેટલાંય સપનાં સાથે જોયાં છે. આ બધી નાની નાની પળો જ આજે મારી જિંદગીની સૌથી સુંદર યાદો બની ગઈ છે.</p>
    <p>સુગમ, તું મારા માટે ફક્ત મારો જીવનસાથી નથી. તું મારો સૌથી સારો મિત્ર છે, મારી ખુશી છે, મારી હિંમત છે અને મારું એવું પોતાનું વ્યક્તિ છે જેની સામે હું કોઈ પણ સંકોચ વગર મારા દિલની દરેક વાત કહી શકું છું. ♥</p>
    <p>જિંદગી હંમેશાં આપણે ધારીએ એવી નથી હોતી. કેટલીક પળો ખૂબ સુંદર હોય છે, તો કેટલીક એવી પણ હોય છે જે આપણને અંદરથી હલાવી નાખે છે. પણ આ બધાની વચ્ચે એક વાત મને હંમેશાં હિંમત આપે છે — મારી સાથે તું છે. ♥</p>
    <p>ક્યારેક હું તને કહી નથી શકતી, પણ તું મારા માટે જે કંઈ કરે છે, મારી નાની નાની વાતોનું ધ્યાન રાખે છે, મને સમજવાનો પ્રયત્ન કરે છે, એ બધું મારા માટે ખૂબ જ કિંમતી છે. કદાચ રોજ તને આભાર નથી કહેતી, પણ દિલથી હું આ બધું અનુભવું છું. ♥</p>
    <p>મને નથી ખબર કે આવનારી જિંદગી આપણા માટે શું લઈને આવશે, પણ એટલી ખબર છે કે એ દરેક પળ હું તારી સાથે જીવવા માગું છું. તારી સાથે હસવું છે, તારી સાથે સપનાં પૂરાં કરવાં છે, તારી સાથે વૃદ્ધ થવું છે અને વર્ષો પછી પણ આમ જ તારો હાથ પકડીને કહેવું છે કે તું મારી જિંદગીનો સૌથી સુંદર નિર્ણય છે.♥</p>
    <p>આજે તારા જન્મદિવસે ભગવાન પાસે બસ એટલું જ માગું છું કે તું હંમેશાં સ્વસ્થ રહે, ખુશ રહે, તારાં બધાં સપનાં પૂરાં થાય, આપણાં બધા સપના પૂરા થાય અને તારા ચહેરા પરનું આ સુંદર સ્મિત ક્યારેય ઓછું ન થાય.♥</p>
    <p>અને હા, જો મને ફરીથી આ જિંદગી જીવવાનો મોકો મળે ને, તો હું ફરીથી તને જ શોધું, ફરીથી તને જ પ્રેમ કરું અને ફરીથી તારી જ બનવાનું પસંદ કરું.♥</p>
    <p class="lead">કારણ કે મારા માટે પ્રેમ એટલે તું, સાથ એટલે તું, અને મારું ઘર એટલે પણ તું જ. ❤️</p>
    <p>Happy Birthday My Love! આજે, કાલે અને જિંદગીના છેલ્લા શ્વાસ સુધી હું તને આમ જ પ્રેમ કરતી રહીશ.</p>
    <div class="rule"></div>
    <p>And there's one more way I wanted to tell you how much you mean to me...</p>
    <button id="one-more" type="button">ONE LAST SURPRISE… ♫</button>`;
  document.getElementById("one-more").onclick = showSongReveal;
  window.scrollTo?.(0, 0);
}
function showSongReveal() {
  const valid = /^https?:\/\//i.test(SONG_URL);
  app.innerHTML = `<div class="ornament">♥ ♫ ♥</div>
    <p class="eyebrow">A little piece of my heart</p>
    <h1>Our story, in a song.</h1>
    <p class="lead">Some feelings are too big for words</p>
    <p>This one's from my heart to yours. ♥</p>
    <div id="song-action"></div>
    <p class="note">Happy Birthday, Sugam. I'd choose you, every single time. ♥</p>`;
  const action = document.getElementById("song-action");
  if (valid) {
    const link = document.createElement("a");
    link.className = "button";
    link.textContent = "♫ LISTEN TO MY HEART";
    link.href = SONG_URL;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    action.appendChild(link);
  } else {
    action.innerHTML =
      '<p class="feedback">Song link not set yet. Add your updated song URL to script.js before sharing.</p>';
  }
}
