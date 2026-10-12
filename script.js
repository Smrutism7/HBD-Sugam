/*
  SETUP NOTE:
  1) The song is revealed physically in a framed gift, not on this website.
  2) Open qr-cards.html after uploading this folder to hosting.
  3) QR links use ?stage=1 through ?stage=8.
*/
const stages = {
  1: {
    title:"The silent storytellers",
    clue:"I hold many worlds but never travel. My silent secrets are yours to unravel. My friends stand in rows, with stories to tell. Where do these paper storytellers gather?",
    answers:["bookshelf","book shelf","books","bookcase","the bookshelf"],
    destination:"Head to the bookshelf. Look for a small QR card tucked nearby.",
    wrong:"Close, but no case closed yet. Look for a home where stories stand side by side."
  },
  2: {
    title:"The quiet keeper",
    clue:"Where plans are made and work gets done, a quiet keeper hides from everyone. Behind its doors, away from sight, a secret waits out of the light. Find the closed space in the room of work. Where am I?",
    answers:["office closet","office room closet","closet in office","closet in the office","office cupboard","office cabinet","work room closet","study closet","office wardrobe"],
    destination:"Head to the closet in your office room. Your next QR code is hidden inside. Search carefully.",
    wrong:"Think of a storage space with doors, inside the room where you work."
  },
  3: {
    title:"A chilly personality",
    clue:"I keep things fresh and have a chilly personality. I guard snacks, leftovers, and midnight decisions. What am I?",
    answers:["refrigerator","fridge","the fridge","the refrigerator"],
    destination:"Visit the refrigerator. Your next QR card is waiting nearby—not inside anything that could get wet.",
    wrong:"Brrr… you're looking for the place that keeps food cold."
  },
  4: {
    title:"The daily decision",
    clue:"Some things are folded, some hang with care. Some are favorites you choose to wear. Find the place where your daily outfit decisions live.",
    answers:["wardrobe","closet","clothes closet","the wardrobe","his wardrobe"],
    destination:"Go to your wardrobe and look behind the folded clothes for the next QR card.",
    wrong:"Not the laundry basket, detective. Think of where clothes are stored and chosen."
  },
  5: {
    title:"A well-earned break",
    clue:"I welcome movie nights, scrolling sessions, naps, and long conversations. I take the weight off your feet. Where am I?",
    answers:["sofa","couch","the sofa","the couch"],
    destination:"Head to the sofa. Check around the cushions and nearby side table for your next QR card.",
    wrong:"Take a seat and think about the comfiest spot in the living room."
  },
  6: {
    title:"The waiting traveler",
    clue:"I wait patiently when journeys end, yet I'm always ready when plans begin. I have windows but I'm not a house, and a key brings me to life. Where am I?",
    answers:["car","our car","my car","his car","vehicle","the car","automobile"],
    destination:"Correct, detective! Your next QR code is waiting inside your car. Search carefully.",
    wrong:"Think of something parked that takes you places, even though it stays still between trips."
  },
  7: {
    title:"Where we gather",
    clue:"A place for stories, laughter, and something to eat. We gather here when it's time to dine. Where do our plates meet?",
    answers:["dining table","table","kitchen table","the dining table"],
    destination:"Go to the dining table. Look underneath or around it for your next QR card.",
    wrong:"You're hungry for the answer! Think of where we sit down for a meal."
  },
  8: {
    title:"One last quiet corner",
    clue:"The day is nearly done, and dreams are close at hand. Beside the place where we rest, a little hiding spot is waiting. Look inside the drawer nearby. Where am I?",
    answers:["bedside drawer","nightstand","nightstand drawer","bedside table","side table","bedside cabinet","drawer"],
    destination:"CASE CLOSED! ♥ You solved the final mystery. Your last destination is the bedside drawer. Go discover what is waiting for you there. Happy Birthday, Sugam!",
    wrong:"Think of the little drawer beside the bed."
  }
};
const app = document.getElementById("app");
const params = new URLSearchParams(window.location.search);
const stage = Number(params.get("stage") || 0);
const clean = s => s.toLowerCase().trim().replace(/[’']/g,"").replace(/[^a-z0-9 ]/g,"").replace(/\s+/g," ");
function home(){
 app.innerHTML = `<div class="ornament">✦ ✧ ✦</div><p class="eyebrow">A birthday case file</p><h1>A little<br>mystery for you.</h1>
 <p class="lead">Hey, birthday boy. ♥</p>
 <p>An unusual situation has been reported. Someone has planned something for you. The details are classified, and the suspect is suspiciously close to you.</p>
 <p>No shortcuts. No asking your wife for hints. (We know how you are.)</p>
 <div class="rule"></div><p>Trust your instincts. Follow the clues. Let's see how good your detective skills really are.</p>
 <button id="begin">ACCEPT THE MISSION ↗</button>`;
 document.getElementById("begin").onclick = () => { history.replaceState(null,"",location.pathname); showStage(0); };
}
function showStage(n){
 if(n===0){
   app.innerHTML = `<div class="ornament">✦ ✧ ✦</div><p class="eyebrow">Mission activated · Opening riddle</p><h2>Detective, you're in.</h2><p class="lead">I have a face, but no eyes of my own. I copy your expressions without making a sound. You probably see me every morning. Where am I?</p><div class="rule"></div><label for="answer">Your best guess</label><input id="answer" autocomplete="off" placeholder="Type your answer…"><button id="check">CHECK MY ANSWER</button><p class="feedback" id="feedback"></p><p class="note">Solve this to uncover your first hidden QR location.</p>`;
   document.getElementById("check").onclick = () => checkAnswer(["bathroom mirror","mirror","the mirror"],"Correct! Go to the bathroom mirror and find the first hidden QR card. Scan it to unlock your next riddle.","Not quite, detective. Think of the silent copycat you see every morning. 😏");
   document.getElementById("answer").addEventListener("keydown",e=>{if(e.key==="Enter")document.getElementById("check").click()});
   return;
 }
 if(n>=1 && n<=8){
   const s=stages[n];
   app.innerHTML = `<p class="eyebrow">A new lead</p><h2>${s.title}</h2><p class="lead">${s.clue}</p><div class="rule"></div><label for="answer">What is your answer?</label><input id="answer" autocomplete="off" placeholder="Type your answer…"><button id="check">CHECK MY ANSWER</button><p class="feedback" id="feedback"></p><p class="note">Hint: read it twice before accusing the furniture.</p>`;
   document.getElementById("check").onclick = () => checkAnswer(s.answers,s.destination,s.wrong);
   document.getElementById("answer").addEventListener("keydown",e=>{if(e.key==="Enter")document.getElementById("check").click()});
   return;
 }
 home();
}
function checkAnswer(answers,destination,wrong){
 const input = clean(document.getElementById("answer").value);
 const fb = document.getElementById("feedback");
 if(answers.some(a=>clean(a)===input)){
   fb.textContent = "Correct. Okay, detective… not bad. 😏";
   const old = document.getElementById("destination");
   if(old)old.remove();
   const p=document.createElement("p");p.id="destination";p.className="lead";p.style.marginTop="18px";p.textContent=destination;
   document.getElementById("check").after(p);
   document.getElementById("check").textContent="CASE NOTE RECEIVED ✓";
   document.getElementById("check").disabled=true;
   if(stage===8) launchCelebration("You solved the final riddle, Sugam! ♥ The mystery ends here. Head to the bedside drawer for your last surprise. Happy Birthday!");
 } else {
   fb.textContent=wrong;
   const inputEl=document.getElementById("answer");
   inputEl.focus();
 }
}
// These QR stages are located beside wrapped gifts; celebrate on arrival,
// not when the previous riddle is answered.
const giftCheckpoints = {
  3: "Excellent detective work! There is something waiting for you here. Unwrap it before continuing. ♥",
  5: "Another mystery solved! Take a moment to enjoy what you found. ✨",
  7: "You made it to another special checkpoint! A little surprise is yours. 🎁",

};
function launchCelebration(message){
  const overlay=document.getElementById("celebration");
  document.getElementById("party-message").textContent=message;
  overlay.querySelectorAll(".party-piece,.party-balloon").forEach(el=>el.remove());
  overlay.classList.add("active");
  document.getElementById("party-continue").focus();
  if(window.matchMedia("(prefers-reduced-motion: reduce)").matches)return;
  for(let i=0;i<85;i++){
    const el=document.createElement("span");
    el.className="party-piece";
    el.textContent=["✦","●","◆","✨"][Math.floor(Math.random()*4)];
    el.style.color=["#d6b574","#fff6eb","#f3a4b5","#e9cf95"][Math.floor(Math.random()*4)];
    el.style.left=Math.random()*100+"%";
    el.style.fontSize=(10+Math.random()*16)+"px";
    el.style.animationDuration=(2.8+Math.random()*3)+"s";
    el.style.animationDelay=Math.random()*1.5+"s";
    overlay.appendChild(el);
    el.addEventListener("animationend",()=>el.remove());
  }
  for(let i=0;i<10;i++){
    const el=document.createElement("span");
    el.className="party-balloon";
    el.textContent="🎈";
    el.style.left=Math.random()*95+"%";
    el.style.fontSize=(27+Math.random()*24)+"px";
    el.style.animationDuration=(5+Math.random()*4)+"s";
    el.style.animationDelay=Math.random()*1.4+"s";
    overlay.appendChild(el);
    el.addEventListener("animationend",()=>el.remove());
  }
}
document.getElementById("party-continue").onclick=()=>{
  document.getElementById("celebration").classList.remove("active");
  document.getElementById("app").querySelector("input,button,a")?.focus();
};
if(stage>=1 && stage<=8){showStage(stage);} else {home();}
if(giftCheckpoints[stage])launchCelebration(giftCheckpoints[stage]);
