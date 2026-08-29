/* ============================================
   guide.html 생성기 — SEO용 정적 텍스트 버전
   ------------------------------------------------
   data.js의 내용을 검색엔진이 읽을 수 있는 순수 HTML 한 장으로 만듭니다.
   해시(#) 라우팅 화면들은 구글에 안 잡히므로, 이 페이지가 검색 유입을 담당합니다.
   실행: node make-guide.js   (data.js 수정할 때마다 다시 실행)
   ============================================ */
const fs = require('fs');
const vm = require('vm');

const ctx = {};
vm.createContext(ctx);
vm.runInContext(fs.readFileSync('data.js', 'utf8') +
  ';__out = { RESIDENCES, FEES_TIMELINE, COURSE_ENROLMENT, GLOSSARY, BUILDING_CODES, FACILITIES, FACILITY_CATS, BREADTH_CATEGORIES, COURSE_CATALOG, APPLICANT_GUIDE };', ctx);
const D = ctx.__out;

function esc(s){ return String(s==null?'':s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }
function price(n){ return n==null?'':'$'+Number(n).toLocaleString('en-CA'); }
const today = new Date().toISOString().slice(0,10);

let h = [];
h.push(`<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>UofT St. George Student Guide — Full Text Version (Residence Fees, Deadlines, Glossary, Building Codes)</title>
<meta name="description" content="Complete plain-text guide to UofT St. George: all 11 residence fees ${new Date().getFullYear()}, application and tuition deadlines, course enrolment dates, ${D.GLOSSARY.length} glossary terms, ${D.BUILDING_CODES.length} building codes, and campus facilities. Made by students.">
<style>
  body{font-family:-apple-system,Segoe UI,Roboto,sans-serif;max-width:760px;margin:0 auto;padding:24px 16px;line-height:1.6;color:#1a2433}
  h1{font-size:1.6rem} h2{font-size:1.2rem;margin-top:2.2em;border-bottom:2px solid #002A5C;padding-bottom:4px}
  table{border-collapse:collapse;width:100%;font-size:0.92rem} td,th{border:1px solid #d8dee8;padding:6px 8px;text-align:left;vertical-align:top}
  th{background:#f2f5fa} code{background:#efe9f8;padding:1px 6px;border-radius:6px;font-weight:600}
  .top{background:#eaf1fa;border-radius:12px;padding:12px 16px} a{color:#0B4DA0}
  .src{color:#6b7686;font-size:0.85rem}
</style>
</head>
<body>
<h1>UofT St. George — Unofficial Student Guide (Text Version)</h1>
<p class="top">This is the plain-text version of the guide. For the interactive version with search, reviews, and checklists, <a href="./index.html">open the main site</a>. Unofficial — made by students, verified against official U of T pages. Last generated: ${today}.</p>`);

/* 지원자 가이드 — 검색 유입의 핵심 콘텐츠 */
h.push(`<h2>Applying to U of T</h2>`);
Object.keys(D.APPLICANT_GUIDE.pages).forEach(pid=>{
  const p = D.APPLICANT_GUIDE.pages[pid];
  if (!p.sections) return;
  h.push(`<h3 style="margin-top:1.6em">${esc(p.title)}</h3><p>${esc(p.intro.replace(/\*\*/g,''))}</p>`);
  p.sections.forEach(sec=>{
    if (sec.kv && sec.kv.length){
      h.push(`<table><tr><th colspan="2">${esc(sec.h)}</th></tr>`);
      sec.kv.forEach(r=>h.push(`<tr><td><strong>${esc(r[0].replace(/\*\*/g,''))}</strong></td><td>${esc(r[1].replace(/\*\*/g,''))}</td></tr>`));
      h.push(`</table>`);
    }
  });
});

/* 기숙사 */
h.push(`<h2>Residence Fees (2026–27)</h2><table><tr><th>Residence</th><th>Fee range</th><th>Meal plan</th><th>Winter break</th></tr>`);
D.RESIDENCES.forEach(r=>{
  const range = r.priceMax && r.priceMax!==r.price ? price(r.price)+' – '+price(r.priceMax) : price(r.price);
  h.push(`<tr><td><a href="${esc(r.officialUrl)}" rel="noopener">${esc(r.name)}</a></td><td>${esc(range)}${r.priceNote?' <span class=src>('+esc(r.priceNote)+')</span>':''}</td><td>${esc(r.mealPlan||'')}</td><td>${esc(r.winterBreak||'')}</td></tr>`);
});
h.push(`</table><p class="src">Fees verified against each residence's official page. Always confirm on the official link before deciding.</p>`);

/* 마감일 */
h.push(`<h2>Key Dates &amp; Deadlines</h2><ul>`);
D.FEES_TIMELINE.forEach(t=>h.push(`<li><strong>${esc(t.month)}</strong> — ${esc(t.title)}${t.officialUrl?` <a class="src" href="${esc(t.officialUrl)}" rel="noopener">official ↗</a>`:''}</li>`));
h.push(`</ul>`);

/* 수강신청 */
h.push(`<h2>Course Enrolment Dates (Fall/Winter)</h2><ul>`);
D.COURSE_ENROLMENT.forEach(t=>h.push(`<li><strong>${esc(t.month)}</strong> — ${esc(t.title)}</li>`));
h.push(`</ul>`);

/* 용어집 */
h.push(`<h2>UofT Glossary (${D.GLOSSARY.length} terms)</h2><table><tr><th>Term</th><th>Plain-language meaning</th></tr>`);
D.GLOSSARY.forEach(g=>h.push(`<tr><td><strong>${esc(g.term)}</strong>${g.abbr?' ('+esc(g.abbr)+')':''}</td><td>${esc(g.def)}</td></tr>`));
h.push(`</table><p class="src">Rewritten in plain language from the official <a href="https://artsci.calendar.utoronto.ca/glossary-terms" rel="noopener">Arts &amp; Science Glossary</a>.</p>`);

/* 건물 코드 */
h.push(`<h2>Building Codes (${D.BUILDING_CODES.length} buildings)</h2><p>Example: <strong>SS 2135</strong> = Sidney Smith Hall, room 2135 (first digit is usually the floor).</p><table><tr><th>Code</th><th>Building</th></tr>`);
D.BUILDING_CODES.forEach(b=>h.push(`<tr><td><code>${esc(b.code)}</code></td><td>${esc(b.name)}</td></tr>`));
h.push(`</table><p class="src">From the official U of T campus map. For directions use the <a href="https://map.utoronto.ca/" rel="noopener">Interactive Campus Map</a>.</p>`);

/* 시설 */
h.push(`<h2>Campus Facilities</h2><ul>`);
D.FACILITIES.forEach(f=>h.push(`<li><strong>${esc(f.name)}</strong>${f.address?' — '+esc(f.address):''}${f.officialUrl?` <a class="src" href="${esc(f.officialUrl)}" rel="noopener">official ↗</a>`:''}</li>`));
h.push(`</ul>`);

/* breadth */
h.push(`<h2>Breadth Requirement Categories</h2><ul>`);
D.BREADTH_CATEGORIES.forEach(c=>h.push(`<li><strong>${esc(c.official||c.name)}</strong>${c.official?' — shown on this site as “'+esc(c.name)+'”':''}</li>`));
h.push(`</ul><p>To graduate: at least 1.0 credit in each of 4 of the 5 categories, or 1.0 in each of any 3 plus 0.5 in each of the other 2 (<a href="https://artsci.calendar.utoronto.ca/hbahbsc-requirements" rel="noopener">official rule</a>). The main site lists ${D.COURSE_CATALOG.length} breadth courses with student reviews.</p>`);

h.push(`<hr><p class="src">Unofficial student guide. Not affiliated with the University of Toronto. Every figure links to its official source — always double-check there before making decisions. <a href="./index.html">← Back to the interactive guide</a></p>
</body></html>`);

fs.writeFileSync('guide.html', h.join('\n'));
console.log('guide.html 생성 완료:', (fs.statSync('guide.html').size/1024).toFixed(1)+'KB');
