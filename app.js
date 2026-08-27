/* ============================================
   UofT Guide — 동작 (4-A 단계)

   지금 이 파일이 하는 일은 딱 하나입니다:
   섹션 줄을 누르면 알림창을 띄운다.

   4-B 단계에서 Residence 를 누르면 기숙사 목록으로
   넘어가도록 이 파일을 고칠 예정입니다.
   ============================================ */


/* ---- 리뷰를 받을 이메일 주소.
   나중에 실제 이메일로 바꿔주세요. 그 전까지는 눌러도 예시 주소로 갑니다. */
const ADMIN_EMAIL = "youremail@example.com";


/* ---- 화면에 뜨는 안내 문구를 여기 모아둡니다.
        나중에 한국어를 추가하고 싶으면 이 부분만 번역하면 됩니다. ---- */
const MESSAGES = {
  comingSoon: "This section isn't ready yet.",
  detailSoon: "Residence details open in the next build step.",
  notFound: "That residence isn't in data.js"
};


/* ---- 알림창을 잠깐 띄웠다 지우는 기능 ---- */
const toastBox = document.getElementById("toast");
let toastTimer = null;   // 이전 알림이 남아 있으면 취소하려고 기억해둡니다

function showToast(text) {
  if (!toastBox) return;          // 알림창이 없으면 아무것도 안 함

  toastBox.textContent = text;
  toastBox.classList.add("is-shown");

  clearTimeout(toastTimer);       // 연속으로 눌러도 겹치지 않게
  toastTimer = setTimeout(function () {
    toastBox.classList.remove("is-shown");
  }, 2600);                       // 2.6초 뒤에 사라짐
}


/* ---- 섹션 줄을 모두 찾아서 클릭을 감지합니다 ---- */
const rows = document.querySelectorAll(".row");

rows.forEach(function (row) {
  row.addEventListener("click", function () {

    // data-key 값을 읽습니다 ("residence", "courses" 등)
    const key = row.dataset.key;

    if (key === "residence") {
      showView("residence");        // ← 4-B에서 바뀐 부분
    } else if (key === "fees") {
      showView("fees");
    } else if (key === "courses") {
      showView("courses");
    } else {
      showToast(MESSAGES.comingSoon);
    }
  });
});


/* ============================================
   여기서부터 4-B 에서 추가한 부분입니다
   ============================================ */


/* ---- 화면 전환 ----
   홈과 Residence 목록을 번갈아 보여줍니다.
   페이지를 새로 여는 게 아니라, 한쪽을 숨기고 다른 쪽을 꺼내는 방식입니다. */

const views = {
  home: document.getElementById("view-home"),
  residence: document.getElementById("view-residence"),
  detail: document.getElementById("view-detail"),
  fees: document.getElementById("view-fees"),
  courses: document.getElementById("view-courses"),
  coursePage: document.getElementById("view-course-page")
};

/* ---- 화면 전환 + 주소창 동기화 ----
   화면을 바꿀 때마다 주소 끝에 #residence 같은 해시를 남깁니다.
   그래서 (1) 링크를 공유하면 그 화면으로 바로 열리고,
   (2) 브라우저 뒤로가기를 눌러도 사이트 밖으로 안 나가고 이전 화면으로 돌아옵니다.

   hashOverride 를 따로 주면 그걸 쓰고(예: "residence/chestnut"),
   안 주면 화면 이름을 그대로 씁니다. 홈은 해시를 비워서 주소를 깔끔하게 둡니다. */
function showView(name, hashOverride) {
  // 일단 전부 숨기고
  Object.values(views).forEach(function (el) {
    if (el) el.hidden = true;
  });

  // 요청받은 것 하나만 꺼냅니다
  if (views[name]) {
    views[name].hidden = false;

    // 화면이 뚝 끊기지 않고 살짝 떠오르며 나타나게.
    // 클래스를 뺐다 다시 넣어야 매번 애니메이션이 재생됩니다(reflow 강제).
    views[name].classList.remove("view-fade");
    void views[name].offsetWidth;
    views[name].classList.add("view-fade");
  }

  // 화면 맨 위로 올려줍니다 (안 하면 스크롤이 중간에 걸려 있습니다)
  window.scrollTo(0, 0);

  // 주소창 해시 갱신 (뒤로가기가 이 해시를 다시 불러옵니다)
  const wantHash = hashOverride || (name === "home" ? "" : name);
  const currentHash = location.hash.replace(/^#/, "");
  if (currentHash !== wantHash && !isRestoringFromHash) {
    if (wantHash) location.hash = wantHash;
    else history.pushState("", document.title, location.pathname + location.search);
  }
}


/* ---- 뒤로/앞으로가기, 직접 링크 접속 처리 ----
   주소 해시가 바뀌면(사람이 직접 치거나, 브라우저 뒤로가기를 누르거나) 그에 맞는 화면을 엽니다. */
let isRestoringFromHash = false;

function routeFromHash() {
  const hash = location.hash.replace(/^#/, "");
  isRestoringFromHash = true;

  if (!hash) {
    showView("home");
  } else if (hash.indexOf("residence/") === 0) {
    const id = hash.slice("residence/".length);
    if (typeof openDetail === "function" && typeof RESIDENCES !== "undefined" && RESIDENCES.some(function (r) { return r.id === id; })) {
      showView("residence");   // 뒤로 눌렀을 때 목록이 먼저 보이게
      openDetail(id);
    } else {
      showView("residence");
    }
  } else if (views[hash]) {
    showView(hash);
  } else {
    showView("home");
  }

  isRestoringFromHash = false;
}

window.addEventListener("hashchange", routeFromHash);


/* ---- Back 버튼 ----
   data-back 이 붙은 버튼을 누르면 홈으로 돌아갑니다. */

document.querySelectorAll("[data-back]").forEach(function (btn) {
  btn.addEventListener("click", function () {
    showView("home");
  });
});

/* data-back-to="residence" 처럼 목적지가 적힌 버튼은 그곳으로 돌아갑니다. */
document.querySelectorAll("[data-back-to]").forEach(function (btn) {
  btn.addEventListener("click", function () {
    showView(btn.dataset.backTo);
  });
});


/* ---- 글자 안전장치 ----
   데이터에 < > 같은 기호가 들어가도 화면이 깨지지 않게 바꿔줍니다. */

function esc(text) {
  return String(text == null ? "" : text)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}


/* ---- 가격을 보기 좋게 ----
   18000  ->  $18,000 */

function formatPrice(n) {
  if (typeof n !== "number" || isNaN(n)) return "";
  return "$" + n.toLocaleString("en-US");
}


/* ---- 카드 아래 한 줄 요약 만들기 ----
   비어 있는 항목은 자동으로 건너뜁니다.
   예) $18,000 · Single · Meal included */

/* ---- 카드에 들어갈 가격 줄 ----
   범위가 있으면 최저~최고를 모두 보여줍니다.
   예) $22,858 – $27,120 */

function buildPriceLine(item) {
  if (!item.price) return "";

  const text = item.priceMax
    ? formatPrice(item.price) + " – " + formatPrice(item.priceMax)
    : formatPrice(item.price);

  return text;
}


/* ---- 카드 아래 한 줄 요약 (방 형태와 식사) ----
   비어 있는 항목은 자동으로 건너뜁니다. */

/* ---- 방 형태 용어 설명 ----
   "Traditional dormitory" 같은 말이 처음 보는 사람에겐 낯설어서
   이름 옆에 짧은 설명을 괄호로 붙여줍니다. */

const ROOM_TYPE_HELP = {
  "Traditional dormitory": "shared bathroom down the hall, no kitchen",
  "Modified dormitory": "shared bathroom, small kitchen on the floor",
  "Apartment": "full kitchen and bathroom in the unit",
  "Suite": "private bathroom, shared kitchen with suitemates"
};

function roomTypeWithHelp(text) {
  if (!text) return "";
  // "A / B" 처럼 두 가지가 합쳐진 경우 각각 설명을 답니다
  return text.split(" / ").map(function (part) {
    const help = ROOM_TYPE_HELP[part];
    return help ? part + " (" + help + ")" : part;
  }).join(" / ");
}


function buildMetaLine(item) {
  const parts = [];

  if (item.roomType) parts.push(item.roomType);

  if (item.mealPlan === "Included") parts.push("Meal included");
  else if (item.mealPlan === "Optional") parts.push("Meal optional");
  else if (item.mealPlan === "None") parts.push("No meal plan");

  return parts.join(" · ");
}


/* ---- 카드 한 장 만들기 ---- */

function buildCard(item) {
  // 사진이 없으면 회색 네모를 대신 넣습니다
  const photo = item.photoUrl
    ? '<img class="card__img" src="' + esc(item.photoUrl) +
      '" alt="' + esc(item.name) + '" loading="lazy" ' +
      'onerror="this.parentElement.classList.add(\'is-empty\'); this.remove();">'
    : "";

  const emptyClass = item.photoUrl ? "" : " is-empty";

  /* 가격을 오해하기 쉬운 경우에 딱지를 붙입니다.
     - 식사플랜이 없어서 싸 보이는 곳
     - 계약 기간이 달라서 비싸 보이는 곳
     둘 다 똑같이 중요하므로 같은 노란 딱지로 표시합니다. */
  /* 겨울방학에 어떻게 되는지를 목록에서 바로 보이게 합니다.
     집에 못 가는 유학생에게는 가격만큼이나 중요한 정보입니다. */
  const badges = [];

  if (item.winterBreakCost === "paid") {
    badges.push("Winter break costs extra");
  } else if (item.winterBreakCost === "none") {
    badges.push("Closed over winter break");
  } else if (item.winterBreakClosed) {
    badges.push("Closed over winter break");
  }

  if (item.mealPlan === "Optional" || item.mealPlan === "None") {
    badges.push("Food not included");
  }
  if (item.priceUnit) {
    badges.push(item.priceUnit.replace("per ", ""));
  }

  const badgeHtml = badges.length
    ? '<span class="card__badges">' +
        badges.map(function (b) {
          return '<span class="badge">' + esc(b) + '</span>';
        }).join("") +
      '</span>'
    : "";

  /* 주소는 카드에 넣지 않습니다.
     주소를 아는 곳과 모르는 곳이 섞여 있어 카드 높이가 들쭉날쭉해지기 때문입니다.
     주소는 상세 화면의 OFFICIAL INFO 에 나옵니다. */
  return '' +
    '<button type="button" class="card" data-id="' + esc(item.id) + '">' +
      '<span class="card__photo' + emptyClass + '">' + photo + '</span>' +
      '<span class="card__body">' +
        '<span class="card__name">' + esc(item.name) + '</span>' +
        '<span class="card__cue">&rarr;</span>' +
        '<span class="card__price">' + esc(buildPriceLine(item)) + '</span>' +
        '<span class="card__meta">' + esc(buildMetaLine(item)) + '</span>' +
        badgeHtml +
      '</span>' +
    '</button>';
}


/* ---- 정렬 ----
   sortMode 에 담긴 값에 따라 목록 순서가 바뀝니다.
   처음에는 "price" 입니다. 기숙사에서 제일 먼저 궁금한 게 돈이라서요. */

let sortMode = "price";
let activeFilters = [];   // 여러 필터를 동시에 켤 수 있습니다


function sortedResidences() {
  // slice() 로 복사본을 만듭니다. 원본 RESIDENCES 순서는 건드리지 않습니다.
  let list = RESIDENCES.slice();

  // 필터를 하나씩 통과시킵니다. 켜진 필터가 없으면 전부 통과합니다.
  if (activeFilters.indexOf("meal") !== -1) {
    list = list.filter(function (r) { return r.mealPlan === "Included"; });
  }
  if (activeFilters.indexOf("open") !== -1) {
    list = list.filter(function (r) { return !r.winterBreakClosed; });
  }
  if (activeFilters.indexOf("budget") !== -1) {
    list = list.filter(function (r) { return r.price && r.price < 20000; });
  }

  if (sortMode === "price") {
    list.sort(function (a, b) { return (a.price || 0) - (b.price || 0); });
  } else {
    list.sort(function (a, b) { return a.name.localeCompare(b.name); });
  }

  return list;
}


/* ---- 목록 전체 그리기 ----
   data.js 의 RESIDENCES 를 하나씩 읽어 카드로 만듭니다.
   기숙사를 추가하면 카드도 저절로 늘어납니다. */

function renderResidenceList() {
  const listBox = document.getElementById("res-list");
  const countBox = document.getElementById("res-count");

  if (!listBox) return;

  // data.js 가 없거나 비어 있을 때
  if (typeof RESIDENCES === "undefined" || RESIDENCES.length === 0) {
    listBox.innerHTML =
      '<p class="empty">No residences yet. Add them in data.js</p>';
    if (countBox) countBox.textContent = "";
    return;
  }

  const shown = sortedResidences();

  // 개수 표시. 필터가 켜져 있으면 "N of 11", 아니면 그냥 "N residences"
  if (countBox) {
    countBox.textContent = activeFilters.length
      ? shown.length + " of " + RESIDENCES.length + " residences"
      : shown.length + (shown.length === 1 ? " residence" : " residences");
  }

  // 필터를 걸었는데 하나도 안 남았을 때
  if (shown.length === 0) {
    listBox.innerHTML = '<p class="empty">No residences match these filters. Try turning one off.</p>';
    return;
  }

  listBox.innerHTML = shown.map(buildCard).join("");
  attachRowClicks(listBox.querySelectorAll(".card"));
}


/* ---- 클릭하면 상세로 이동 ---- */

function attachRowClicks(elements) {
  elements.forEach(function (el) {
    el.addEventListener("click", function () {
      openDetail(el.dataset.id);
    });
  });
}


/* ---- 정렬 버튼 누르기 ---- */

document.querySelectorAll(".sortbtn").forEach(function (btn) {
  btn.addEventListener("click", function () {

    // 이미 켜져 있는 버튼을 또 누르면 아무 일도 안 합니다
    if (sortMode === btn.dataset.sort) return;

    sortMode = btn.dataset.sort;

    // 눌린 버튼만 켜진 모양으로 바꿉니다 (스크린리더용 aria-pressed 도 같이)
    document.querySelectorAll(".sortbtn").forEach(function (b) {
      b.classList.remove("is-on");
      b.setAttribute("aria-pressed", "false");
    });
    btn.classList.add("is-on");
    btn.setAttribute("aria-pressed", "true");

    // 목록을 새 순서로 다시 그립니다
    renderResidenceList();
  });
});


/* ---- 필터 버튼 누르기 ----
   누를 때마다 켜짐/꺼짐이 바뀝니다. 여러 개 동시에 켤 수 있습니다. */

document.querySelectorAll(".filterbtn").forEach(function (btn) {
  btn.addEventListener("click", function () {
    const key = btn.dataset.filter;
    const i = activeFilters.indexOf(key);

    if (i === -1) {
      activeFilters.push(key);
      btn.classList.add("is-on");
      btn.setAttribute("aria-pressed", "true");
    } else {
      activeFilters.splice(i, 1);
      btn.classList.remove("is-on");
      btn.setAttribute("aria-pressed", "false");
    }

    renderResidenceList();
  });
});


/* ---- 리뷰 작성 폼 ----
   상세 화면은 매번 새로 그려지므로, document 전체에 한 번만 걸어두고
   클릭/제출이 폼 안에서 일어났을 때만 반응합니다 (이벤트 위임). */

// 별점 버튼 클릭 — 몇 번째까지 눌렀는지에 따라 별을 채웁니다
document.addEventListener("click", function (e) {
  const btn = e.target.closest(".starpicker__btn");
  if (!btn) return;

  const picker = btn.closest(".starpicker");
  const chosen = Number(btn.dataset.star);
  picker.dataset.value = chosen;

  picker.querySelectorAll(".starpicker__btn").forEach(function (b) {
    b.textContent = Number(b.dataset.star) <= chosen ? "★" : "☆";
  });
});

// 제출 — 이메일 앱을 열어 관리자에게 보냅니다.
// (서버가 없어서 자동으로 사이트에 올라가진 않습니다. 관리자가 받아서 data.js 에 추가합니다.)
document.addEventListener("submit", function (e) {
  const form = e.target.closest("[data-review-form]");
  if (!form) return;
  e.preventDefault();

  const stars = Number(form.querySelector("[data-starpicker]").dataset.value || 0);
  const text = form.querySelector("[data-review-text]").value.trim();
  const name = form.querySelector("[data-review-name]").value.trim() || "Anonymous";
  const residence = form.dataset.residence;

  if (!stars) {
    showToast("Pick a star rating first");
    return;
  }
  if (!text) {
    showToast("Write a few words first");
    return;
  }

  const subject = "Review: " + residence;
  const body =
    "Residence: " + residence + "\n" +
    "Stars: " + stars + " / 5\n" +
    "Name: " + name + "\n\n" +
    text;

  window.location.href =
    "mailto:" + ADMIN_EMAIL +
    "?subject=" + encodeURIComponent(subject) +
    "&body=" + encodeURIComponent(body);

  showToast("Opening your email app…");
});


/* ============================================
   Fees & Dates — 카테고리 고르고 → 그 안 날짜 보기
   ============================================ */

let feesAudience = "domestic";   // "domestic" 또는 "international"

/* ---- 카테고리 목록. 여기 하나 추가하면 화면에도 자동으로 생깁니다 ---- */
const FEES_CATEGORIES = [
  { id: "prep",      label: "Grade 12",                 desc: "Everything from exploring programs to accepting your offer", icon: "\uD83C\uDF92", color: "#0E7C86" },
  { id: "money",     label: "Money & Tuition",          desc: "Deposits, tuition, payment deadlines",       icon: "\uD83D\uDCB0", color: "#0F7A4D" },
  { id: "residence", label: "Residence",                desc: "When to apply for housing",                  icon: "\uD83C\uDFE0", color: "#C05A16" },
  { id: "aid",       label: "Financial Aid",            desc: "OSAP, UTAPS, scholarships",                  icon: "\uD83C\uDF93", color: "#7A3FA0" },
  { id: "visa",      label: "Visa & Permits",           desc: "Study permit, immigration steps",            icon: "\u2708\uFE0F", color: "#1B7A9E" }
];


/* ---- 텍스트 안 **강조** 를 굵게 바꿔줍니다 (데이터 작성 시 편하게 쓰라고) ---- */
function boldMarks(text) {
  return esc(text).replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
}


/* ---- 지금 고른 대상(국내/국제)에 맞는 항목만 걸러내기 ---- */
function feesForAudience() {
  if (typeof FEES_TIMELINE === "undefined") return [];
  return FEES_TIMELINE.filter(function (item) {
    return item.audience === "both" || item.audience === feesAudience;
  });
}


/* ---- 카테고리 목록 화면 그리기 ----
   각 카테고리에 몇 개 날짜가 있는지 보여주고, 0개면 흐리게(못 누르게) 만듭니다. */
function renderFeesCategories() {
  const box = document.getElementById("fees-categories");
  if (!box) return;

  const items = feesForAudience();

  box.innerHTML = FEES_CATEGORIES.map(function (cat) {
    const count = items.filter(function (i) { return i.category === cat.id; }).length;
    const disabled = count === 0;

    return '<button type="button" class="feescard' + (disabled ? " is-off" : "") +
           '" data-category="' + cat.id + '"' + (disabled ? " disabled" : "") +
           ' style="--cat-color:' + cat.color + '">' +
             '<span class="feescard__top">' +
               '<span class="feescard__icon">' + cat.icon + '</span>' +
               (disabled
                 ? '<span class="feescard__badge feescard__badge--off">N/A</span>'
                 : '<span class="feescard__badge">' + count + (count === 1 ? " date" : " dates") + '</span>') +
             '</span>' +
             '<span class="feescard__name">' + esc(cat.label) + '</span>' +
             '<span class="feescard__desc">' + esc(cat.desc) + '</span>' +
           '</button>';
  }).join("");

  box.querySelectorAll(".feescard:not(.is-off)").forEach(function (row) {
    row.addEventListener("click", function () {
      openFeesCategory(row.dataset.category);
    });
  });
}


/* ---- 카테고리 하나를 열어서 그 안 날짜들을 보여줍니다 ---- */
function openFeesCategory(catId) {
  const cat = FEES_CATEGORIES.filter(function (c) { return c.id === catId; })[0];
  const items = feesForAudience().filter(function (i) { return i.category === catId; });

  document.getElementById("fees-items-title").textContent = cat ? cat.label : "";
  document.getElementById("fees-items-title").style.color = cat ? cat.color : "";
  renderFeesTimeline(items, cat ? cat.color : "#0B4DA0");

  document.getElementById("fees-categories").hidden = true;
  document.getElementById("fees-items").hidden = false;
}


/* ---- "← Categories" 를 누르면 목록으로 돌아갑니다 ---- */
document.addEventListener("click", function (e) {
  if (!e.target.closest("[data-fees-back]")) return;
  document.getElementById("fees-items").hidden = true;
  document.getElementById("fees-categories").hidden = false;
});


/* ---- 날짜 목록 그리기 (카테고리 하나 안의 내용) ---- */
function renderFeesTimeline(items, color) {
  const box = document.getElementById("fees-timeline");
  if (!box) return;

  if (!items || items.length === 0) {
    box.innerHTML = '<p class="empty">No dates here yet.</p>';
    return;
  }

  box.innerHTML = items.map(function (item, i) {
    const tag = item.audience === "both" ? ""
      : '<span class="tl-tag">' + (item.audience === "domestic" ? "Canadian only" : "International only") + '</span>';

    // "Sep - Jan" 처럼 기간이면 From/To 로 나눠서, 아니면 그냥 큰 글씨로
    const parts = item.month.split(" - ");
    const monthHtml = parts.length === 2
      ? '<span class="tl-from">' + esc(parts[0]) + '</span>' +
        '<span class="tl-arrow">&darr;</span>' +
        '<span class="tl-to">' + esc(parts[1]) + '</span>'
      : '<span class="tl-single">' + esc(item.month) + '</span>';

    return '<article class="tl-item" style="--cat-color:' + color + '">' +
             '<div class="tl-num">' + (i + 1) + '</div>' +
             '<div class="tl-month">' + monthHtml + '</div>' +
             '<div class="tl-body">' +
               '<h4 class="tl-title">' + esc(item.title) + tag + '</h4>' +
               '<p class="tl-text">' + boldMarks(item.body) + '</p>' +
               (item.officialUrl
                 ? '<a class="tl-link" href="' + esc(item.officialUrl) + '" target="_blank" rel="noopener noreferrer">Official page &nearr;</a>'
                 : "") +
             '</div>' +
           '</article>';
  }).join("");
}


/* ---- 대상(국내/국제) 전환 ----
   전환하면 카테고리 화면으로 돌아갑니다 (개수가 바뀌니까). */
document.querySelectorAll("[data-audience]").forEach(function (btn) {
  btn.addEventListener("click", function () {
    if (feesAudience === btn.dataset.audience) return;

    feesAudience = btn.dataset.audience;

    document.querySelectorAll("[data-audience]").forEach(function (b) {
      b.classList.remove("is-on");
      b.setAttribute("aria-pressed", "false");
    });
    btn.classList.add("is-on");
    btn.setAttribute("aria-pressed", "true");

    document.getElementById("fees-items").hidden = true;
    document.getElementById("fees-categories").hidden = false;
    renderFeesCategories();
  });
});

renderFeesCategories();


/* ---- 페이지가 열릴 때 목록을 미리 만들어 둡니다 ---- */
renderResidenceList();


/* ---- 확인용: 검사창(Console)에서 볼 수 있습니다 ---- */
console.log("app.js loaded — sections:", rows.length,
            "| residences:", typeof RESIDENCES !== "undefined" ? RESIDENCES.length : "data.js not found");


/* ============================================
   여기서부터 4-C 에서 추가한 부분입니다
   (상세 화면)
   ============================================ */


/* ---- 날짜를 보기 좋게 ----
   "2027-03-15"  ->  "March 15, 2027"
   비어 있으면 빈 글자를 돌려줍니다. */

const MONTHS = ["January", "February", "March", "April", "May", "June",
                "July", "August", "September", "October", "November", "December"];

function formatDate(text) {
  if (!text) return "";

  const parts = String(text).split("-");
  if (parts.length !== 3) return text;      // 형식이 다르면 그대로 둠

  const month = MONTHS[Number(parts[1]) - 1];
  if (!month) return text;

  return month + " " + Number(parts[2]) + ", " + parts[0];
}


/* ---- 마감일이 지났는지 확인 ---- */

function isPastDeadline(text) {
  if (!text) return false;
  const today = new Date().toISOString().slice(0, 10);   // 오늘을 "2026-08-24" 모양으로
  return text < today;
}


/* ---- 유튜브 주소를 '박아 넣을 수 있는 주소'로 바꾸기 ----

   사람들이 복사하는 주소는 보통 이런 모양입니다:
     https://www.youtube.com/watch?v=ABC123
     https://youtu.be/ABC123
   이걸 사이트 안에서 재생되는 주소로 바꿔줍니다.
   주소가 이상하면 아무것도 돌려주지 않아 영상칸이 안 보이게 됩니다. */

function youtubeEmbed(url) {
  if (!url) return "";

  let id = "";
  const text = String(url);

  if (text.indexOf("youtu.be/") !== -1) {
    id = text.split("youtu.be/")[1];
  } else if (text.indexOf("watch?v=") !== -1) {
    id = text.split("watch?v=")[1];
  } else if (text.indexOf("/embed/") !== -1) {
    id = text.split("/embed/")[1];
  } else {
    return "";
  }

  // 주소 뒤에 붙은 다른 정보(&t=30s 등)를 잘라냅니다
  id = id.split("&")[0].split("?")[0].split("/")[0];

  if (!id) return "";
  return "https://www.youtube-nocookie.com/embed/" + id;
}


/* ---- 공식 정보 불릿 만들기 ----
   비어 있는 항목은 줄 자체가 안 나옵니다. */

function buildOfficialBullets(item) {
  const rows = [];

  if (item.roomType) rows.push(["Room type", roomTypeWithHelp(item.roomType)]);

  if (item.mealPlan) {
    const mealText = item.mealPlan === "Included" ? "Mandatory"
                   : item.mealPlan === "Optional" ? "Not required"
                   : "Not offered";
    rows.push(["Meal plan", mealText]);
  }

  if (item.capacity) rows.push(["Capacity", "about " + item.capacity.toLocaleString("en-US") + " students"]);
  if (item.college) rows.push(["Open to", item.college === "Any" ? "Any college" : item.college]);

  if (rows.length === 0) return "";

  const lines = rows.map(function (r) {
    return '<li class="fact">' +
             '<span class="fact__label">' + esc(r[0]) + '</span>' +
             '<span class="fact__value">' + esc(r[1]) + '</span>' +
           '</li>';
  }).join("");

  return '<ul class="facts">' + lines + '</ul>';
}


/* ---- 밀플랜 목록 만들기 ----
   플랜 이름 + 점 찍은 설명 + 기울임체 한 줄.
   금액이 있으면 이름 오른쪽에 붙습니다.
   bullets 나 note 가 없으면 그 줄은 안 나옵니다. */

function buildMealPlanList(plans) {
  if (!Array.isArray(plans) || plans.length === 0) return "";

  const cards = plans.map(function (pl) {
    const bullets = Array.isArray(pl.bullets)
      ? pl.bullets.filter(function (x) { return x; })
      : [];

    return '<article class="plan">' +
             '<div class="plan__top">' +
               '<h4 class="plan__name">' + esc(pl.label) + '</h4>' +
               (pl.price
                 ? '<span class="plan__price">' + esc(formatPrice(pl.price)) +
                   (pl.priceLabel ? ' <span class="plan__pricelabel">' + esc(pl.priceLabel) + '</span>' : "") +
                   '</span>'
                 : "") +
             '</div>' +
             (bullets.length
               ? '<ul class="plan__list">' +
                   bullets.map(function (x) { return '<li>' + esc(x) + '</li>'; }).join("") +
                 '</ul>'
               : "") +
             (pl.note ? '<p class="plan__note">' + esc(pl.note) + '</p>' : "") +
           '</article>';
  }).join("");

  return '<div class="plans">' + cards + '</div>';
}


/* ---- 방 종류별 요금 목록 만들기 ----
   왼쪽에 방 이름, 오른쪽에 금액을 표처럼 보여줍니다.
   비어 있으면 그 구역 전체가 안 나옵니다. */

function buildPriceList(rows) {
  if (!Array.isArray(rows) || rows.length === 0) return "";

  const lines = rows.map(function (r) {
    const priceText = formatPrice(r.price) + (r.unit ? r.unit : "");
    return '<li class="fact fact--price">' +
             '<span class="fact__value">' + esc(r.label) + '</span>' +
             '<span class="fact__amount">' + esc(priceText) + '</span>' +
           '</li>';
  }).join("");

  return '<ul class="facts">' + lines + '</ul>';
}


/* ---- 상세 화면 내용 만들기 ---- */

function buildDetail(item) {
  const html = [];

  /* 1. 제목 — 리뷰가 있으면 옆에 작은 평균 별점을 붙입니다 */
  const allReviews = Array.isArray(item.reviews) ? item.reviews.filter(function (r) { return r && r.text; }) : [];
  const titleAvg = allReviews.length
    ? allReviews.reduce(function (sum, r) { return sum + (r.stars || 0); }, 0) / allReviews.length
    : 0;

  html.push(
    '<h2 class="page-title">' +
      esc(item.name) +
      (titleAvg
        ? ' <span class="title-rating">★ ' + titleAvg.toFixed(1) + '<span class="title-rating__count">(' + allReviews.length + ')</span></span>'
        : "") +
    '</h2>'
  );

  if (item.summary) {
    // 문장 단위로 쪼개서 불릿으로 보여줍니다 (한 줄로 쭉 읽는 것보다 눈에 잘 들어옴)
    const sentences = item.summary.match(/[^.]+[.]+/g) || [item.summary];
    const points = sentences.map(function (s) { return s.trim(); }).filter(function (s) { return s; });

    html.push(
      '<ul class="lede">' +
        points.map(function (s) { return '<li>' + esc(s) + '</li>'; }).join("") +
      '</ul>'
    );
  }

  /* 2. 사진 — 학교 공식 사진이 맨 위에 옵니다 */
  const photos = [];
  if (item.photoUrl) photos.push(item.photoUrl);
  if (Array.isArray(item.morePhotos)) {
    item.morePhotos.forEach(function (p) { if (p) photos.push(p); });
  }

  if (photos.length > 0) {
    const imgs = photos.map(function (src) {
      return '<img class="strip__img" src="' + esc(src) + '" alt="' + esc(item.name) + '" ' +
             'loading="lazy" onerror="this.remove();">';
    }).join("");
    html.push(
      '<div class="media">' +
        '<div class="strip">' + imgs + '</div>' +
        '<p class="credit">Official U of T photos</p>' +
      '</div>'
    );
  }

  /* 3. 학생 리뷰 — 사진 바로 아래. 별점 + 글. */
  const reviews = Array.isArray(item.reviews) ? item.reviews.filter(function (r) { return r && r.text; }) : [];

  const reviewCards = reviews.length > 0
    ? (function () {
        const avg = reviews.reduce(function (sum, r) { return sum + (r.stars || 0); }, 0) / reviews.length;
        const cards = reviews.map(function (r) {
          const stars = Math.max(0, Math.min(5, Math.round(r.stars || 0)));
          return '<article class="review">' +
                   '<div class="review__stars" aria-label="' + stars + ' out of 5 stars">' +
                     '★★★★★'.slice(0, stars) + '☆☆☆☆☆'.slice(0, 5 - stars) +
                   '</div>' +
                   '<p class="review__text">' + esc(r.text) + '</p>' +
                   (r.source ? '<p class="credit">' + esc(r.source) + '</p>' : "") +
                 '</article>';
        }).join("");
        return '<div class="review__avg">' +
                 '<span class="review__avgnum">' + avg.toFixed(1) + '</span>' +
                 '<span class="review__avgstars">' + '★★★★★'.slice(0, Math.round(avg)) + '</span>' +
                 '<span class="review__avgcount">' + reviews.length + (reviews.length === 1 ? " review" : " reviews") + '</span>' +
               '</div>' +
               '<div class="reviews">' + cards + '</div>';
      })()
    : '<p class="empty empty--small">No reviews yet. Be the first to write one.</p>';

  // 별점 선택 버튼 5개 + 글 입력칸 + 이메일로 보내기.
  // 여기서 쓴 내용이 자동으로 사이트에 올라가지는 않습니다 — 관리자가 받아서 확인 후 추가합니다.
  const formHtml =
    '<form class="reviewform" data-review-form data-residence="' + esc(item.name) + '">' +
      '<p class="reviewform__label">Write a review</p>' +
      '<div class="starpicker" data-starpicker>' +
        [1, 2, 3, 4, 5].map(function (n) {
          return '<button type="button" class="starpicker__btn" data-star="' + n + '" aria-label="' + n + ' stars">☆</button>';
        }).join("") +
      '</div>' +
      '<textarea class="reviewform__text" data-review-text rows="3" ' +
        'placeholder="What should other students know about living here?" required></textarea>' +
      '<input class="reviewform__name" data-review-name type="text" placeholder="Your name or \'Anonymous\' (shown next to your review)">' +
      '<button type="submit" class="reviewform__submit">Send review</button>' +
      '<p class="reviewform__note">Opens your email app. We read every submission and add it to the site.</p>' +
    '</form>';

  html.push(
    '<section class="block block--student">' +
      '<h3 class="block__head">Student reviews</h3>' +
      reviewCards +
      formHtml +
    '</section>'
  );

  /* 4. 공식 투어 영상 — videoUrl 이 비어 있으면 이 부분 전체가 안 나옴 */
  const embed = youtubeEmbed(item.videoUrl);
  if (embed) {
    html.push(
      '<div class="media">' +
        '<div class="video">' +
          '<iframe src="' + esc(embed) + '" title="' + esc(item.name) + ' residence tour" ' +
          'frameborder="0" allowfullscreen ' +
          'allow="accelerometer; encrypted-media; gyroscope; picture-in-picture"></iframe>' +
        '</div>' +
        '<p class="credit">' +
          (item.videoCredit ? esc(item.videoCredit) : "Official residence tour") +
        '</p>' +
      '</div>'
    );
  }

  /* 3-2. 위치 — 주소를 위에 쓰고 그 아래 구글 지도.
     API 키 없이 되는 무료 임베드 방식이라 비용이 들지 않습니다. */
  if (item.address) {
    const q = encodeURIComponent(item.address + ", Toronto, ON");
    html.push(
      '<section class="block block--official">' +
        '<h3 class="block__head">Location</h3>' +
        '<p class="address-line">' + esc(item.address) + '</p>' +
        '<div class="mapbox">' +
          '<iframe src="https://www.google.com/maps?q=' + q + '&output=embed" ' +
          'title="' + esc(item.name) + ' location" loading="lazy" ' +
          'referrerpolicy="no-referrer-when-downgrade"></iframe>' +
        '</div>' +
        '<a class="maplink" href="https://www.google.com/maps/search/?api=1&query=' + q + '" ' +
        'target="_blank" rel="noopener noreferrer">Open in Google Maps &nearr;</a>' +
      '</section>'
    );
  }

  /* 4. 제일 중요한 정보 — 노란 박스 */
  const keyLines = [];
  if (item.price) {
    // 범위가 있으면 "$21,933 – $26,202", 없으면 "$13,645"
    const priceText = item.priceMax
      ? formatPrice(item.price) + " – " + formatPrice(item.priceMax)
      : formatPrice(item.price);

    // 기간 단위. 비어 있으면 학년도 기준으로 봅니다.
    const unit = item.priceUnit || "per academic year";

    keyLines.push('<p class="keybox__main">' + esc(priceText) +
                  ' <span class="keybox__unit">' + esc(unit) + '</span></p>');

    if (item.priceNote) {
      keyLines.push('<p class="keybox__sub">' + esc(item.priceNote) + '</p>');
    }
  }
  if (item.deadline) {
    const passed = isPastDeadline(item.deadline);
    keyLines.push(
      '<p class="keybox__sub">' +
        (passed ? "Deadline passed — " : "Apply by ") +
        esc(formatDate(item.deadline)) +
      '</p>'
    );
  }
  if (keyLines.length > 0) {
    html.push('<div class="keybox">' + keyLines.join("") + '</div>');
  }

  /* 5. 공식 정보 */
  const bullets = buildOfficialBullets(item);
  if (bullets) {
    html.push(
      '<section class="block block--official">' +
        '<h3 class="block__head">Official info</h3>' +
        bullets +
      '</section>'
    );
  }

  /* 5-2. 방 종류별 요금.
     건물이 여러 채면(halls) 건물별로 묶어서 보여주고,
     건물이 하나뿐이면 예전처럼 flat한 목록으로 보여줍니다. */
  const halls = Array.isArray(item.halls) ? item.halls.filter(function (h) { return h && h.name; }) : [];

  if (halls.length > 0) {
    const allRooms = Array.isArray(item.roomOptions) ? item.roomOptions : [];

    const cards = halls.map(function (h) {
      const bits = [];
      if (h.built) bits.push("Built " + h.built);
      if (h.capacity) bits.push(h.capacity);

      // "Whitney — Single" 처럼 그 홀만 쓰는 경우도,
      // "Whitney / Sir Daniel Wilson — Single" 처럼 두 홀이 방을 공유하는 경우도
      // 전부 잡히도록 "포함"으로 찾습니다 (맨 앞 글자만 보지 않음).
      const shortName = h.name.replace(" Hall", "");
      const hallRooms = allRooms.filter(function (r) {
        const namesPart = r.label.split(" — ")[0] || "";
        return namesPart.split(" / ").indexOf(shortName) !== -1;
      });
      const priceHtml = hallRooms.length
        ? buildPriceList(hallRooms.map(function (r) {
            return { label: r.label.split("— ")[1] || r.label, price: r.price, unit: r.unit };
          }))
        : "";

      return '<article class="hall">' +
               '<h4 class="hall__name">' + esc(h.name) + '</h4>' +
               (bits.length
                 ? '<p class="hall__tags">' + esc(bits.join(" · ")) + '</p>'
                 : "") +
               (h.rooms ? '<p class="hall__rooms">' + esc(h.rooms) + '</p>' : "") +
               priceHtml +
               (h.note ? '<p class="hall__note">' + esc(h.note) + '</p>' : "") +
             '</article>';
    }).join("");

    html.push(
      '<section class="block block--official">' +
        '<h3 class="block__head">Room options &amp; prices &mdash; ' + halls.length + ' buildings</h3>' +
        '<div class="halls">' + cards + '</div>' +
      '</section>'
    );
  } else {
    const roomList = buildPriceList(item.roomOptions);
    if (roomList) {
      html.push(
        '<section class="block block--official">' +
          '<h3 class="block__head">Room options &amp; prices</h3>' +
          roomList +
        '</section>'
      );
    }
  }

  /* 5-3. 밀플랜 */
  const mealList = buildMealPlanList(item.mealPlans);
  if (mealList || item.mealNote || item.mealSystem) {
    html.push(
      '<section class="block block--official">' +
        '<h3 class="block__head">Meal plan</h3>' +
        mealList +
        (item.mealNote ? '<p class="blocknote">' + esc(item.mealNote) + '</p>' : "") +
        (item.mealSystem ? '<p class="blocknote">' + esc(item.mealSystem) + '</p>' : "") +
      '</section>'
    );
  }

  /* 5-4. 겨울방학 — 머물 수 있는지, 돈이 드는지 */
  if (item.winterBreak || item.winterBreakDetail) {
    html.push(
      '<section class="block block--official">' +
        '<h3 class="block__head">Winter break</h3>' +
        (item.winterBreak
          ? '<p class="verdict' + (item.winterBreakClosed ? " verdict--warn" : "") + '">' +
              esc(item.winterBreak) + '</p>'
          : "") +
        (item.winterBreakDetail
          ? '<p class="blocknote">' + esc(item.winterBreakDetail) + '</p>'
          : "") +
      '</section>'
    );
  }

  /* 5-5. 층별 방 사진 — 직접 찍어서 올릴 자리.
     아직 사진이 없으면 "곧 올라올 자리"라고 안내합니다.
     data.js 의 floorPhotos 에 { floor, caption, url } 을 넣으면 채워집니다. */
  const floors = Array.isArray(item.floorPhotos)
    ? item.floorPhotos.filter(function (f) { return f && f.url; })
    : [];

  let floorInner;
  if (floors.length > 0) {
    floorInner = '<div class="floors">' +
      floors.map(function (f) {
        return '<figure class="floor">' +
                 '<img class="floor__img" src="' + esc(f.url) + '" ' +
                 'alt="' + esc(item.name) + ' ' + esc(f.floor || "") + '" ' +
                 'loading="lazy" onerror="this.parentElement.remove();">' +
                 '<figcaption class="floor__cap">' +
                   (f.floor ? '<span class="floor__num">' + esc(f.floor) + '</span>' : "") +
                   (f.caption ? esc(f.caption) : "") +
                 '</figcaption>' +
               '</figure>';
      }).join("") +
    '</div>';
  } else {
    floorInner = '<div class="floors-empty">' +
                   '<p class="floors-empty__title">No student photos yet</p>' +
                   '<p class="floors-empty__body">' +
                     'Real room photos, floor by floor. Official photos only show the good rooms &mdash; ' +
                     'these will show what you actually get.' +
                   '</p>' +
                 '</div>';
  }

  html.push(
    '<section class="block block--student">' +
      '<h3 class="block__head">Rooms by floor</h3>' +
      floorInner +
    '</section>'
  );

  /* 7. 공식 사이트로 가는 버튼 */
  if (item.officialUrl) {
    html.push(
      '<a class="cta" href="' + esc(item.officialUrl) + '" target="_blank" rel="noopener noreferrer">' +
        'Open official page &nearr;' +
      '</a>'
    );
  }

  /* 8. 마지막 확인 날짜 */
  if (item.lastChecked) {
    html.push('<p class="colophon__date">Last checked ' + esc(formatDate(item.lastChecked)) + '</p>');
  }

  return html.join("");
}


/* ---- 상세 화면 열기 ----
   목록에서 카드를 누르면 이 기능이 실행됩니다. */

function openDetail(id) {
  const box = document.getElementById("detail-body");
  if (!box) return;

  // data.js 에서 id 가 같은 기숙사를 찾습니다
  const item = RESIDENCES.filter(function (r) { return r.id === id; })[0];

  if (!item) {
    showToast(MESSAGES.notFound);
    return;
  }

  box.innerHTML = buildDetail(item);
  showView("detail", "residence/" + id);
}


/* ============================================
   Courses
   ------------------------------------------------
   구조:
     view-courses      → 카테고리 3장 (Enrolment / Degree / Program)
     view-course-page  → 하위 페이지 전부가 재사용하는 화면 1개
                          (Enrolment 타임라인 / Degree 안내 /
                           전공 검색·단과대 타일 / 단과대 안 과 목록 /
                           과 상세)

   courseStack 에 지나온 화면을 쌓아두고, Back 을 누르면 하나씩 꺼냅니다.
   진짜 "다른 페이지로 넘어가는" 느낌을 주려고 Residence 상세와 같은
   방식(별도 <main>, showView 로 맨 위로 스크롤)을 씁니다.
   ============================================ */

const COURSE_CATEGORIES = [
  { id: "program", label: "Choosing a Program",  desc: "How to pick and apply for your major",         icon: "\uD83C\uDFAF", color: "#7A3FA0" },
  { id: "degree",  label: "Degree Requirements",  desc: "Credits, breadth, and what it takes to graduate", icon: "\uD83C\uDF93", color: "#0F7A4D" },
  { id: "enrol",   label: "Enrolment (ACORN)",    desc: "When you can start choosing courses",          icon: "\uD83D\uDCBB", color: "#0B4DA0" }
];

function courseBadge(catId) {
  if (catId === "enrol")   return COURSE_ENROLMENT.length + " dates";
  if (catId === "program") return COURSE_FACULTIES.length + " faculties";
  if (catId === "degree")  return "Guide";
  return "";
}

function renderCourseCategories() {
  const box = document.getElementById("courses-categories");
  if (!box) return;

  box.innerHTML = COURSE_CATEGORIES.map(function (cat) {
    return '<button type="button" class="feescard" data-course-category="' + cat.id + '" style="--cat-color:' + cat.color + '">' +
             '<span class="feescard__top">' +
               '<span class="feescard__icon">' + cat.icon + '</span>' +
               '<span class="feescard__badge">' + courseBadge(cat.id) + '</span>' +
             '</span>' +
             '<span class="feescard__name">' + esc(cat.label) + '</span>' +
             '<span class="feescard__desc">' + esc(cat.desc) + '</span>' +
           '</button>';
  }).join("");

  box.querySelectorAll("[data-course-category]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      const id = btn.dataset.courseCategory;
      if (id === "enrol")   goToCourseScreen(buildEnrolScreen(), true);
      if (id === "degree")  goToCourseScreen(buildDegreeScreen(), true);
      if (id === "program") goToCourseScreen(buildProgramHomeScreen(""), true);
    });
  });
}

renderCourseCategories();


/* ---- 화면 전환 스택 ---- */

let courseStack = [];       // 지나온 화면들을 쌓아둠
let currentCourseScreen = null;

/* resetStack=true 면 Courses 카테고리에서 새로 들어온 것 (스택 비움) */
function goToCourseScreen(screen, resetStack) {
  if (resetStack) {
    courseStack = [];
  } else if (currentCourseScreen) {
    courseStack.push(currentCourseScreen);
  }
  currentCourseScreen = screen;
  renderCourseScreen(screen);
  showView("coursePage");
}

/* 같은 화면을 다시 그리기만 함 (검색창 입력할 때 씀 — 스택에 안 쌓임) */
function replaceCourseScreen(screen) {
  currentCourseScreen = screen;
  renderCourseScreen(screen);
}

function renderCourseScreen(screen) {
  document.getElementById("course-page-title").textContent = screen.title;
  document.getElementById("course-page-content").innerHTML = screen.html;
  document.getElementById("course-page-content").style.setProperty("--cat-color", screen.color || "#0B4DA0");

  // 브레드크럼: 지나온 화면 제목 + 지금 화면 제목을 " / " 로 이어붙입니다.
  const crumbEl = document.getElementById("course-crumb");
  if (crumbEl) {
    const parts = courseStack.map(function (s) { return s.title; }).concat([screen.title]);
    crumbEl.textContent = parts.join(" / ");
  }
}

/* Back 버튼: 스택에 남은 게 있으면 하나 꺼내서 보여주고,
   없으면 Courses 카테고리 화면(진짜 홈)으로 돌아갑니다. */
document.addEventListener("click", function (e) {
  if (!e.target.closest("[data-course-back]")) return;

  if (courseStack.length > 0) {
    currentCourseScreen = courseStack.pop();
    renderCourseScreen(currentCourseScreen);
    showView("coursePage");
  } else {
    currentCourseScreen = null;
    showView("courses");
  }
});


/* ---- 화면 1: 수강신청 일정 ---- */
function buildEnrolScreen() {
  const rows = COURSE_ENROLMENT.map(function (item, i) {
    return '<article class="tl-item">' +
             '<div class="tl-num">' + (i + 1) + '</div>' +
             '<div class="tl-month"><span class="tl-single">' + esc(item.month) + '</span></div>' +
             '<div class="tl-body">' +
               '<h4 class="tl-title">' + esc(item.title) + '</h4>' +
               '<p class="tl-text">' + boldMarks(item.body) + '</p>' +
               (item.officialUrl
                 ? '<a class="tl-link" href="' + esc(item.officialUrl) + '" target="_blank" rel="noopener noreferrer">Official page &nearr;</a>'
                 : "") +
             '</div>' +
           '</article>';
  }).join("");

  return { title: "Enrolment (ACORN)", color: "#0B4DA0", html: '<div class="timeline">' + rows + '</div>' };
}


/* ---- 화면 2: 졸업요건 ---- */
function buildDegreeScreen() {
  const basics = '<ul class="lede">' +
    DEGREE_BASICS.map(function (b) { return '<li>' + boldMarks(b) + '</li>'; }).join("") +
  '</ul>';

  const rule =
    '<div class="keybox">' +
      '<p class="keybox__main">Breadth Requirement &mdash; pick one way to satisfy it</p>' +
      '<p class="keybox__sub">' +
        '<strong>Option A:</strong> 1.0 credit in each of 4 of the 5 categories below.<br>' +
        '<strong>Option B:</strong> 1.0 credit in each of any 3 categories, plus 0.5 credit in each of the other 2.' +
      '</p>' +
    '</div>';

  const cats = '<div class="halls">' +
    BREADTH_CATEGORIES.map(function (c) {
      return '<article class="hall"><h4 class="hall__name">' + esc(c.name) + '</h4></article>';
    }).join("") +
  '</div>';

  const html = basics + rule +
    '<h3 class="block__head" style="margin: 0 0 12px;">The 5 breadth categories</h3>' +
    cats +
    '<p class="blocknote">Category names are shown on each course in the official calendar. ' +
    'Confirm current names and rules there, as these can change.</p>' +
    '<a class="cta" href="https://artsci.calendar.utoronto.ca/hbahbsc-requirements" target="_blank" rel="noopener noreferrer">Open official calendar &nearr;</a>';

  return { title: "Degree Requirements", color: "#0F7A4D", html: html };
}


/* ---- 화면 3: 전공 탐색 홈 (검색창 + 단과대 타일) ---- */
/* ---- 카드에 보여줄 짧은 태그 한 줄 ----
   학과(streams 방식)와 Rotman(kind/type 방식) 둘 다 지원합니다. */
function programTagLine(p) {
  if (p.enrolType) return (p.emoji ? p.emoji + " " : "") + p.enrolType;
  return (p.kind || "") + (p.type ? " \u00b7 " + p.type : "");
}

function buildProgramHomeScreen(term) {
  const q = (term || "").trim().toLowerCase();

  const faculties = COURSE_FACULTIES.filter(function (f) {
    if (!q) return true;
    if (f.name.toLowerCase().indexOf(q) !== -1) return true;
    return COURSE_PROGRAMS.some(function (p) { return p.facultyId === f.id && p.name.toLowerCase().indexOf(q) !== -1; });
  });

  const matchingPrograms = q
    ? COURSE_PROGRAMS.filter(function (p) { return p.name.toLowerCase().indexOf(q) !== -1; })
    : [];

  const searchHtml =
    '<div class="search program-search">' +
      '<label class="search__label" for="course-search">Search</label>' +
      '<input class="search__input" id="course-search" type="text" ' +
      'placeholder="Program or faculty name" value="' + esc(term || "") + '" autocomplete="off">' +
    '</div>';

  const facultyCards = faculties.length
    ? '<div class="halls">' +
        faculties.map(function (f) {
          const tag = f.id === "as"
            ? COURSE_ADMISSION_CATEGORIES.length + " admission categories"
            : (function () {
                const n = COURSE_PROGRAMS.filter(function (p) { return p.facultyId === f.id; }).length;
                return n ? n + (n === 1 ? " program listed" : " programs listed") : "No programs added yet";
              })();
          return '<button type="button" class="hall hall--clickable" data-open-faculty="' + f.id + '" style="--cat-color:' + f.color + '">' +
                   '<h4 class="hall__name">' + esc(f.name) + '</h4>' +
                   '<p class="hall__tags">' + esc(tag) + '</p>' +
                   '<p class="hall__rooms">' + esc(f.desc) + '</p>' +
                 '</button>';
        }).join("") +
      '</div>'
    : '<p class="empty">No faculty matches "' + esc(term) + '".</p>';

  const matchHtml = matchingPrograms.length
    ? '<h3 class="block__head" style="margin: 20px 0 12px;">Matching programs</h3>' +
      '<div class="halls">' +
        matchingPrograms.map(function (p) {
          const fac = COURSE_FACULTIES.filter(function (f) { return f.id === p.facultyId; })[0];
          return '<button type="button" class="hall hall--clickable" data-open-program="' + p.id + '" style="--cat-color:' + (fac ? fac.color : "#0B4DA0") + '">' +
                   '<h4 class="hall__name">' + esc(p.name) + '</h4>' +
                   '<p class="hall__tags">' + esc(programTagLine(p)) + ' \u00b7 ' + esc(fac ? fac.name : "") + '</p>' +
                 '</button>';
        }).join("") +
      '</div>'
    : "";

  return {
    title: "Choosing a Program",
    color: "#7A3FA0",
    html: searchHtml + facultyCards + matchHtml +
          '<button type="button" class="cta cta--outline" data-open-az style="margin-top:18px;">' +
            'Browse the full A\u2013Z program list (188 programs) &rarr;' +
          '</button>' +
          '<p class="blocknote">Only a couple of programs are researched in depth so far &mdash; more get added over time. ' +
          'The full list above has every official St.\u00a0George program by name, with a direct link to its calendar page.</p>'
  };
}

/* 검색창에 입력할 때마다 같은 화면을 새로 그립니다 (뒤로가기 스택에는 안 쌓음) */
document.addEventListener("input", function (e) {
  if (e.target.id !== "course-search") return;
  const caret = e.target.selectionStart;
  replaceCourseScreen(buildProgramHomeScreen(e.target.value));
  const el = document.getElementById("course-search");
  if (el) { el.focus(); el.setSelectionRange(caret, caret); }
});


/* ---- 화면: 전체 프로그램 A-Z 목록 (검색만 되고, 클릭하면 바로 공식 페이지) ---- */
function buildAzScreen(term) {
  const q = (term || "").trim().toLowerCase();

  const list = (q ? ALL_PROGRAMS_AZ.filter(function (p) { return p.name.toLowerCase().indexOf(q) !== -1; }) : ALL_PROGRAMS_AZ)
    .slice()
    .sort(function (a, b) { return a.name.localeCompare(b.name); });

  const searchHtml =
    '<div class="search program-search">' +
      '<label class="search__label" for="az-search">Filter</label>' +
      '<input class="search__input" id="az-search" type="text" ' +
      'placeholder="Type a program name" value="' + esc(term || "") + '" autocomplete="off">' +
    '</div>' +
    '<p class="count" style="border-top:0; padding-top:0;">' + list.length + ' of ' + ALL_PROGRAMS_AZ.length + ' programs</p>';

  const rows = list.length
    ? '<div class="azlist">' +
        list.map(function (p) {
          return '<a class="azrow" href="' + esc(p.officialUrl) + '" target="_blank" rel="noopener noreferrer">' +
                   '<span class="azrow__name">' + esc(p.name) + '</span>' +
                   '<span class="azrow__meta">' + esc(p.degree) + (p.types ? ' \u00b7 ' + esc(p.types) : '') + '</span>' +
                   '<span class="azrow__go">&nearr;</span>' +
                 '</a>';
        }).join("") +
      '</div>'
    : '<p class="empty">No matches for \u201c' + esc(term) + '\u201d</p>';

  return { title: "Full Program List", color: "#7A3FA0", html: searchHtml + rows };
}

document.addEventListener("click", function (e) {
  if (!e.target.closest("[data-open-az]")) return;
  goToCourseScreen(buildAzScreen(""), false);
});

document.addEventListener("input", function (e) {
  if (e.target.id !== "az-search") return;
  const caret = e.target.selectionStart;
  replaceCourseScreen(buildAzScreen(e.target.value));
  const el = document.getElementById("az-search");
  if (el) { el.focus(); el.setSelectionRange(caret, caret); }
});
function buildFacultyScreen(facultyId) {
  const fac = COURSE_FACULTIES.filter(function (f) { return f.id === facultyId; })[0];
  const programs = COURSE_PROGRAMS.filter(function (p) { return p.facultyId === facultyId; });

  const list = programs.length
    ? '<div class="halls">' +
        programs.map(function (p) {
          return '<button type="button" class="hall hall--clickable" data-open-program="' + p.id + '" style="--cat-color:' + (fac ? fac.color : "#0B4DA0") + '">' +
                   '<h4 class="hall__name">' + esc(p.name) + '</h4>' +
                   '<p class="hall__tags">' + esc(programTagLine(p)) + '</p>' +
                   '<p class="hall__rooms">' + esc(p.summary) + '</p>' +
                 '</button>';
        }).join("") +
      '</div>'
    : '<p class="empty">No programs added for this faculty yet. It\u2019s a real St.\u00a0George direct-entry faculty \u2014 just not filled in here.</p>';

  return { title: fac ? fac.name : "Faculty", color: fac ? fac.color : "#0B4DA0", html: list };
}


/* ---- 화면 4-A: Arts & Science 전용 — 입학 카테고리 6개 ----
   A&S 는 학과가 아니라 이 6개 카테고리로 지원받습니다. */
function buildCategoryScreen() {
  const cards = COURSE_ADMISSION_CATEGORIES.map(function (c) {
    const n = COURSE_PROGRAMS.filter(function (p) { return p.admissionCategory === c.id; }).length;
    return '<button type="button" class="feescard" data-open-category="' + c.id + '" style="--cat-color:' + c.color + '">' +
             '<span class="feescard__top">' +
               '<span class="feescard__icon">' + c.emoji + '</span>' +
               '<span class="feescard__badge">' + n + (n === 1 ? " program" : " programs") + '</span>' +
             '</span>' +
             '<span class="feescard__name">' + esc(c.name) + '</span>' +
             '<span class="feescard__desc">' + esc(c.desc) + '</span>' +
           '</button>';
  }).join("");

  return {
    title: "Arts & Science",
    color: "#7A3FA0",
    html:
      '<ul class="lede">' +
        '<li>You apply to one of these <strong>6 categories</strong>, not to a specific department.</li>' +
        '<li>After finishing 1st year, you enrol in an actual department (POSt) from within your category \u2014 or sometimes from a different one.</li>' +
      '</ul>' +
      '<div class="halls">' + cards + '</div>'
  };
}


/* ---- 화면 4-B: 카테고리 하나 안의 학과 목록 + 2학년 진입 시 장점 ---- */
function buildCategoryDeptScreen(categoryId) {
  const cat = COURSE_ADMISSION_CATEGORIES.filter(function (c) { return c.id === categoryId; })[0];
  const programs = COURSE_PROGRAMS.filter(function (p) { return p.admissionCategory === categoryId; });

  const advantageBox = cat
    ? '<div class="keybox">' +
        '<p class="keybox__main">Going into 2nd year from ' + esc(cat.name) + '</p>' +
        '<p class="keybox__sub">' + esc(cat.advantage) + '</p>' +
      '</div>' +
      '<p class="blocknote">This is a general pattern based on the departments below, not an official U of T statement \u2014 confirm specifics on each department\u2019s own page.</p>'
    : "";

  const list = programs.length
    ? '<div class="halls">' +
        programs.map(function (p) {
          return '<button type="button" class="hall hall--clickable" data-open-program="' + p.id + '" style="--cat-color:' + (cat ? cat.color : "#0B4DA0") + '">' +
                   '<h4 class="hall__name">' + esc(p.name) + '</h4>' +
                   '<p class="hall__tags">' + esc(programTagLine(p)) + '</p>' +
                   '<p class="hall__rooms">' + esc(p.summary) + '</p>' +
                 '</button>';
        }).join("") +
      '</div>'
    : '<p class="empty">No departments added for this category yet.</p>';

  return { title: cat ? cat.name : "Category", color: cat ? cat.color : "#7A3FA0", html: advantageBox + list };
}


/* ---- 화면 5: 과 상세 (필수과목·최소성적 불릿) ----
   학과(streams 여러 개)와 Rotman(flat bullets 하나) 둘 다 지원합니다.
   provinceId 를 바꾸면 주별 과목 대응표만 다시 그립니다. */
/* ---- 이 학과에 Major/Minor/Specialist 중 뭐가 있는지 찾기 ----
   전체 A-Z 목록(공식) 에서 이름이 겹치는 것들을 모아 종류를 합칩니다.
   "Anthropology" 학과면 "Anthropology: Evolutionary", "Anthropology: General (Arts)" 등
   전부 찾아서 그 안에 있는 Major/Minor/Specialist 를 다 모읍니다. */
function credentialBadgesFor(name) {
  if (typeof ALL_PROGRAMS_AZ === "undefined") return [];

  const base = name.split(":")[0].split("(")[0].trim().toLowerCase();
  const found = ALL_PROGRAMS_AZ.filter(function (p) {
    const pbase = p.name.split(":")[0].split("(")[0].trim().toLowerCase();
    return pbase === base || pbase.indexOf(base) === 0 || base.indexOf(pbase) === 0;
  });

  const set = {};
  found.forEach(function (p) {
    (p.types || "").split(/\s+/).forEach(function (t) {
      if (t === "Major" || t === "Minor" || t === "Specialist") set[t] = true;
    });
  });

  // 항상 Major, Minor, Specialist 순서로
  return ["Major", "Minor", "Specialist"].filter(function (t) { return set[t]; });
}


function buildProgramDetailScreen(programId, provinceId) {
  const p = COURSE_PROGRAMS.filter(function (x) { return x.id === programId; })[0];
  if (!p) return { title: "Not found", color: "#0B4DA0", html: '<p class="empty">That program isn\u2019t in data.js</p>' };

  const fac = COURSE_FACULTIES.filter(function (f) { return f.id === p.facultyId; })[0];
  const pv = provinceId || "on";
  const province = PROVINCES.filter(function (x) { return x.id === pv; })[0] || PROVINCES[0];

  /* ---- Major / Minor / Specialist 뱃지 ----
     Specialist 는 대체로 제일 빡세고 중요한 정보라 따로 강조합니다. */
  const credBadges = credentialBadgesFor(p.name);
  const credHtml = credBadges.length
    ? '<div class="credbadges">' +
        credBadges.map(function (c) {
          return '<span class="credbadge' + (c === "Specialist" ? " credbadge--specialist" : "") + '">' + c + '</span>';
        }).join("") +
      '</div>'
    : "";

  /* ---- 주 선택 드롭다운 + 영어/미적분 대응 ---- */
  const provincePicker =
    '<div class="province-picker">' +
      '<label class="search__label" for="course-province">Applying from</label>' +
      '<select id="course-province" class="province-select">' +
        PROVINCES.map(function (pr) {
          return '<option value="' + pr.id + '"' + (pr.id === pv ? " selected" : "") + '>' + esc(pr.name) + '</option>';
        }).join("") +
      '</select>' +
    '</div>';

  const hsBullets = '<ul class="lede">' +
    '<li><strong>English:</strong> ' + esc(province.english) + '</li>' +
    (p.calcRequired
      ? '<li><strong>Calculus:</strong> ' + esc(province.calculus) + ' \u2014 required for this program category</li>'
      : '<li>Calculus is <strong>not required</strong> for this program category.</li>') +
  '</ul>';

  const hsNote = '<p class="blocknote">Some programs also want Advanced Functions, Biology, Chemistry or Physics. ' +
    'In ' + esc(province.name) + ', those are: Advanced Functions \u2192 ' + esc(province.advFunc) +
    '; Biology \u2192 ' + esc(province.biology) + '; Chemistry \u2192 ' + esc(province.chemistry) +
    '; Physics \u2192 ' + esc(province.physics) + '. Check your specific program to see which of these it actually needs.</p>';

  /* ---- 대학 안에서의 전공(POSt) 요건 — 기존 그대로 ---- */
  let bulletsHtml = "";
  if (Array.isArray(p.streams) && p.streams.length) {
    bulletsHtml = '<ul class="lede">' +
      p.streams.map(function (s) {
        return '<li><strong>' + esc(s.name) + ':</strong> ' + esc(s.req) + '</li>';
      }).join("") +
    '</ul>';
  } else if (Array.isArray(p.bullets)) {
    bulletsHtml = '<ul class="lede">' +
      p.bullets.map(function (b) { return '<li>' + boldMarks(b) + '</li>'; }).join("") +
    '</ul>';
  }

  const flagsHtml = (Array.isArray(p.flags) && p.flags.length)
    ? '<div class="blocknote"><ul style="margin:0; padding-left:18px;">' +
        p.flags.map(function (f) { return '<li style="margin-bottom:6px;">' + esc(f) + '</li>'; }).join("") +
      '</ul></div>'
    : "";

  /* ---- 전공 내부 구조 (학위·계열·스트림 등) — groups 필드가 있을 때만 ---- */
  const groupsHtml = (Array.isArray(p.groups) && p.groups.length)
    ? '<h3 class="block__head" style="margin: 0 0 10px;">Program structure</h3>' +
      p.groups.map(function (g) {
        const items = '<ul class="lede">' +
          g.items.map(function (it) {
            return it.req
              ? '<li><strong>' + esc(it.name) + ':</strong> ' + esc(it.req) + '</li>'
              : '<li>' + esc(it.name) + '</li>';
          }).join("") +
        '</ul>';
        return '<p class="hall__tags" style="margin:14px 0 6px; font-size:12px;">' + esc(g.heading) + '</p>' + items;
      }).join("")
    : "";

  const html =
    '<div data-program-id="' + esc(p.id) + '">' +
      '<p class="hall__tags" style="margin-bottom:14px; font-size:14px;">' + esc(programTagLine(p)) + '</p>' +
      credHtml +
      '<p class="tl-text" style="margin-bottom:18px;">' + esc(p.summary) + '</p>' +

      groupsHtml +

      '<h3 class="block__head" style="margin: 22px 0 10px;">High school courses you need</h3>' +
      provincePicker +
      hsBullets +
      hsNote +

      '<h3 class="block__head" style="margin: 22px 0 10px;">To enrol in the program, you\u2019ll need</h3>' +
      bulletsHtml +
      flagsHtml +
      '<a class="cta" href="' + esc(p.officialUrl) + '" target="_blank" rel="noopener noreferrer" style="margin-top:16px;">Open official calendar &nearr;</a>' +
    '</div>';

  return { title: p.name, color: fac ? fac.color : "#0B4DA0", html: html };
}


/* ---- 주 선택 바꾸면 같은 화면을 그 주 기준으로 다시 그립니다 ---- */
document.addEventListener("change", function (e) {
  if (e.target.id !== "course-province") return;
  const wrap = e.target.closest("[data-program-id]");
  if (!wrap) return;
  replaceCourseScreen(buildProgramDetailScreen(wrap.dataset.programId, e.target.value));
});


/* ---- 단과대 타일 / 카테고리 타일 / 과 카드 클릭 처리 (위임) ---- */
document.addEventListener("click", function (e) {
  const facBtn = e.target.closest("[data-open-faculty]");
  if (facBtn) {
    // Arts & Science 는 학과 목록이 아니라 입학 카테고리 6개로 먼저 갑니다.
    const screen = facBtn.dataset.openFaculty === "as"
      ? buildCategoryScreen()
      : buildFacultyScreen(facBtn.dataset.openFaculty);
    goToCourseScreen(screen, false);
    return;
  }
  const catBtn = e.target.closest("[data-open-category]");
  if (catBtn) {
    goToCourseScreen(buildCategoryDeptScreen(catBtn.dataset.openCategory), false);
    return;
  }
  const progBtn = e.target.closest("[data-open-program]");
  if (progBtn) {
    goToCourseScreen(buildProgramDetailScreen(progBtn.dataset.openProgram), false);
  }
});


/* ============================================
   홈 검색 — 기숙사·날짜·전공을 한 번에 찾습니다
   ============================================ */

/* ---- 검색 대상 전부를 한 목록으로 모읍니다 ---- */
function buildSearchIndex() {
  const items = [];

  if (typeof RESIDENCES !== "undefined") {
    RESIDENCES.forEach(function (r) {
      items.push({ kind: "Residence", label: r.name, sub: formatPrice(r.price), id: r.id });
    });
  }

  if (typeof FEES_TIMELINE !== "undefined") {
    FEES_TIMELINE.forEach(function (f) {
      items.push({ kind: "Date", label: f.title, sub: f.month, id: f.id, category: f.category, audience: f.audience });
    });
  }

  if (typeof COURSE_PROGRAMS !== "undefined") {
    COURSE_PROGRAMS.forEach(function (p) {
      const fac = COURSE_FACULTIES.filter(function (f) { return f.id === p.facultyId; })[0];
      items.push({ kind: "Program", label: p.name, sub: fac ? fac.name : "", id: p.id });
    });
  }

  if (typeof ALL_PROGRAMS_AZ !== "undefined") {
    ALL_PROGRAMS_AZ.forEach(function (p) {
      items.push({ kind: "Listing", label: p.name, sub: p.degree, id: p.id, url: p.officialUrl });
    });
  }

  return items;
}


/* ---- 입력할 때마다 결과를 다시 그립니다 ---- */
function renderHomeSearch(term) {
  const box = document.getElementById("home-search-results");
  if (!box) return;

  const q = term.trim().toLowerCase();
  if (!q) {
    box.hidden = true;
    box.innerHTML = "";
    return;
  }

  const hits = buildSearchIndex().filter(function (it) {
    return it.label.toLowerCase().indexOf(q) !== -1;
  });

  box.hidden = false;

  if (hits.length === 0) {
    box.innerHTML = '<p class="empty">No matches for \u201c' + esc(term) + '\u201d</p>';
    return;
  }

  box.innerHTML = hits.slice(0, 8).map(function (it) {
    return '<button type="button" class="searchresult" data-sr-kind="' + it.kind + '" data-sr-id="' + esc(it.id) + '">' +
             '<span class="searchresult__kind">' + it.kind + '</span>' +
             '<span class="searchresult__label">' + esc(it.label) + '</span>' +
             (it.sub ? '<span class="searchresult__sub">' + esc(it.sub) + '</span>' : "") +
           '</button>';
  }).join("");
}

/* ---- 디바운스 ----
   타이핑을 멈추고 나서야 실제로 실행합니다. 데이터가 커져도
   글자 하나 칠 때마다 전체를 다시 검색하지 않도록 막아줍니다. */
function debounce(fn, wait) {
  let timer = null;
  return function () {
    const args = arguments;
    clearTimeout(timer);
    timer = setTimeout(function () { fn.apply(null, args); }, wait);
  };
}

const debouncedHomeSearch = debounce(function (value) {
  renderHomeSearch(value);
}, 150);

const homeSearchInput = document.getElementById("search");
if (homeSearchInput) {
  homeSearchInput.addEventListener("input", function (e) {
    debouncedHomeSearch(e.target.value);
  });
}


/* ---- 검색 결과를 누르면 해당 화면으로 바로 이동합니다 ---- */
document.addEventListener("click", function (e) {
  const btn = e.target.closest(".searchresult");
  if (!btn) return;

  const kind = btn.dataset.srKind;
  const id = btn.dataset.srId;

  if (kind === "Residence") {
    openDetail(id);

  } else if (kind === "Date") {
    const item = FEES_TIMELINE.filter(function (f) { return f.id === id; })[0];
    if (!item) return;

    // 국내/국제 전용 항목이면 그 대상으로 맞춰줍니다 (버튼 표시도 같이 갱신)
    if (item.audience !== "both") {
      feesAudience = item.audience;
      document.querySelectorAll("[data-audience]").forEach(function (b) {
        b.classList.toggle("is-on", b.dataset.audience === feesAudience);
        b.setAttribute("aria-pressed", b.dataset.audience === feesAudience ? "true" : "false");
      });
    }
    showView("fees");
    renderFeesCategories();
    openFeesCategory(item.category);

  } else if (kind === "Program") {
    showView("courses");            // 뒤로가기가 자연스럽도록 카테고리 화면을 먼저 거칩니다
    goToCourseScreen(buildProgramDetailScreen(id), true);

  } else if (kind === "Listing") {
    const item = ALL_PROGRAMS_AZ.filter(function (p) { return p.id === id; })[0];
    if (item) window.open(item.officialUrl, "_blank", "noopener");
  }

  // 검색창과 결과 목록을 정리합니다
  if (homeSearchInput) homeSearchInput.value = "";
  const resultsBox = document.getElementById("home-search-results");
  if (resultsBox) { resultsBox.hidden = true; resultsBox.innerHTML = ""; }
});


/* ============================================
   홈 하단 — 최근 업데이트 로그
   ============================================ */

function renderUpdateLog() {
  const box = document.getElementById("update-log");
  if (!box || typeof SITE_UPDATES === "undefined" || SITE_UPDATES.length === 0) return;

  box.innerHTML =
    '<p class="updatelog__head">Recently updated</p>' +
    '<ul class="updatelog__list">' +
      SITE_UPDATES.slice(0, 3).map(function (u) {
        return '<li><span class="updatelog__date">' + esc(u.date) + '</span> ' + esc(u.text) + '</li>';
      }).join("") +
    '</ul>';
}

renderUpdateLog();


/* ---- 페이지를 처음 열 때, 주소에 해시가 있으면(공유된 링크 등) 그 화면부터 보여줍니다 ---- */
routeFromHash();

