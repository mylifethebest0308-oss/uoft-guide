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
    } else if (key === "facilities") {
      showView("facilities");
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
  facilities: document.getElementById("view-facilities"),
  facilityDetail: document.getElementById("view-facility-detail"),
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
  // 화면 내부 이름은 "fees"지만 주소에는 "undergraduate"로 보여줍니다 (탭 이름과 맞춤)
  const wantHash = hashOverride || (name === "home" ? "" : (name === "fees" ? "undergraduate" : name));
  const currentHash = location.hash.replace(/^#/, "");
  if (currentHash !== wantHash && !isRestoringFromHash) {
    if (wantHash) {
      lastAppliedHash = wantHash;   // 방금 우리가 바꾼 해시 — hashchange 가 되울려도 다시 그리지 않게 표시
      location.hash = wantHash;
    }
    else history.pushState("", document.title, location.pathname + location.search);
  }
}


/* ---- 뒤로/앞으로가기, 직접 링크 접속 처리 ----
   주소 해시가 바뀌면(사람이 직접 치거나, 브라우저 뒤로가기를 누르거나) 그에 맞는 화면을 엽니다.

   지원하는 주소들:
     #residence                          기숙사 목록
     #residence/{id}                     기숙사 상세
     #facilities                         편의시설 목록
     #facilities/{id}                    편의시설 상세
     #undergraduate                      Undergraduate 카테고리 (옛 #fees 도 동작)
     #undergraduate/{catId}              카테고리 하나 열림 (prep/money/aid/visa)
     #undergraduate/programs             Choosing a Program 홈
     #undergraduate/programs/az          전체 프로그램 A-Z
     #undergraduate/programs/cat/{id}    학부 하나
     #undergraduate/programs/p/{id}      프로그램 상세
     #courses                            Courses 카테고리
     #courses/enrol · /degree · /breadth 각 화면
     #courses/breadth/{b1~b5}            교양 카테고리 목록
     #courses/c/{courseId}               과목 상세

   딥링크로 하위 화면에 바로 들어올 땐 위 단계 화면들을 스택에 미리 쌓아서,
   화면 안의 Back 버튼도 자연스럽게 동작하게 합니다. */
let isRestoringFromHash = false;
let lastAppliedHash = null;   // showView 가 방금 쓴 해시 (되울림 무시용)

function routeFromHash() {
  const hash = location.hash.replace(/^#/, "");

  // 우리가 방금 프로그램으로 바꾼 해시가 되울린 것이면, 화면은 이미 맞으니 다시 안 그립니다
  if (hash === lastAppliedHash) { lastAppliedHash = null; return; }
  lastAppliedHash = null;

  isRestoringFromHash = true;
  const parts = hash.split("/");

  if (!hash) {
    showView("home");

  } else if (parts[0] === "residence") {
    if (parts[1] && typeof RESIDENCES !== "undefined" && RESIDENCES.some(function (r) { return r.id === parts[1]; })) {
      showView("residence");   // 뒤로 눌렀을 때 목록이 먼저 보이게
      openDetail(parts[1]);
    } else {
      showView("residence");
    }

  } else if (parts[0] === "facilities") {
    if (parts[1] && typeof FACILITIES !== "undefined" && FACILITIES.some(function (f) { return f.id === parts[1]; })) {
      showView("facilities");
      openFacilityDetail(parts[1]);
    } else {
      showView("facilities");
    }

  } else if (parts[0] === "undergraduate" || parts[0] === "fees") {
    if (parts[1] === "programs") {
      courseReturnView = "fees";
      goToCourseScreen(buildProgramHomeScreen(""), true);
      if (parts[2] === "az") {
        goToCourseScreen(buildAzScreen(""), false);
      } else if (parts[2] === "cat" && parts[3]) {
        goToCourseScreen(buildCategoryDeptScreen(parts[3]), false);
      } else if (parts[2] === "p" && parts[3]) {
        goToCourseScreen(buildProgramDetailScreen(parts[3]), false);
      } else if (parts[2] === "list" && parts[3]) {
        goToCourseScreen(buildAzScreen(""), false);
        goToCourseScreen(buildListingDetailScreen(parts[3]), false);
      }
    } else if (parts[1] && FEES_CATEGORIES.some(function (c) { return c.id === parts[1]; })) {
      showView("fees");
      renderFeesCategories();
      openFeesCategory(parts[1]);
    } else {
      showView("fees");
      // 열려있던 타임라인이 있으면 닫고 카테고리 목록부터 보여줍니다
      const fi = document.getElementById("fees-items");
      const fc = document.getElementById("fees-categories");
      if (fi) fi.hidden = true;
      if (fc) fc.hidden = false;
    }

  } else if (parts[0] === "courses") {
    courseReturnView = "courses";
    if (parts[1] === "enrol") {
      goToCourseScreen(buildEnrolScreen(), true);
    } else if (parts[1] === "degree") {
      goToCourseScreen(buildDegreeScreen(), true);
    } else if (parts[1] === "breadth") {
      goToCourseScreen(buildCourseReviewHomeScreen(""), true);
      if (parts[2]) goToCourseScreen(buildCourseListScreen(parts[2]), false);
    } else if (parts[1] === "glossary") {
      goToCourseScreen(buildGlossaryScreen(""), true);
    } else if (parts[1] === "c" && parts[2]) {
      const course = COURSE_CATALOG.filter(function (c) { return c.id === parts[2]; })[0];
      goToCourseScreen(buildCourseReviewHomeScreen(""), true);
      if (course) goToCourseScreen(buildCourseListScreen(course.category), false);
      goToCourseScreen(buildCourseDetailScreen(parts[2]), false);
    } else {
      showView("courses");
    }

  } else if (views[parts[0]] && parts[0] !== "coursePage" && parts[0] !== "detail") {
    showView(parts[0]);

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

/* ============================================
   포인트 시스템 (에브리타임 스타일 — 가볍게)
   ------------------------------------------------
   리뷰를 쓰면 포인트를 얻고, 포인트로 다른 기숙사의 리뷰를 더 볼 수 있습니다.

   ⚠️ localStorage(이 브라우저에만 저장) 기반입니다. 로그인도, 서버 검증도
   없어서 개발자도구를 열면 우회할 수 있습니다. 진짜 계정 시스템이 아니라
   "정직하게 참여하면 더 보인다"는 가벼운 장치로 만든 겁니다. */

const POINTS_KEY = "uoftGuidePoints";
const UNLOCKED_KEY = "uoftGuideUnlockedReviews";

function getPoints() {
  const n = parseInt(localStorage.getItem(POINTS_KEY) || "1", 10);
  return isNaN(n) ? 1 : n;
}

function addPoints(n) {
  const next = getPoints() + n;
  localStorage.setItem(POINTS_KEY, String(next));
  refreshPointsBadge();
  return next;
}

function spendPoint() {
  const cur = getPoints();
  if (cur < 1) return false;
  localStorage.setItem(POINTS_KEY, String(cur - 1));
  refreshPointsBadge();
  return true;
}

function getUnlockedList() {
  try {
    const v = JSON.parse(localStorage.getItem(UNLOCKED_KEY) || "[]");
    return Array.isArray(v) ? v : [];   // 배열이 아닌 값이 저장돼 있어도 앱이 죽지 않게
  } catch (e) {
    return [];
  }
}

function reviewsUnlocked(id) {
  return getUnlockedList().indexOf(id) !== -1;
}

function unlockReviews(id) {
  const list = getUnlockedList();
  if (list.indexOf(id) === -1) {
    list.push(id);
    localStorage.setItem(UNLOCKED_KEY, JSON.stringify(list));
  }
}

/* 홈 화면 위쪽에 지금 포인트를 작게 보여줍니다 */
function refreshPointsBadge() {
  const el = document.getElementById("points-badge");
  if (el) el.textContent = pointsLevel(getPoints()) + " \u2B50 " + getPoints() + " pts";
}

/* ---- 포인트 등급 ---- */
function pointsLevel(n) {
  if (n >= 15) return "Local Expert";
  if (n >= 8) return "Contributor";
  if (n >= 3) return "Regular";
  return "Newcomer";
}


/* ---- 리뷰 "도움됨" 투표 (에브리타임 추천 참고) ----
   한 리뷰에 한 번만 누를 수 있고, 이 브라우저 기준으로 기억합니다. */
const HELPFUL_KEY = "uoftGuideHelpful";

function getHelpfulMap() {
  try {
    const v = JSON.parse(localStorage.getItem(HELPFUL_KEY) || "{}");
    return (v && typeof v === "object" && !Array.isArray(v)) ? v : {};   // null·숫자·배열 방어
  } catch (e) {
    return {};
  }
}

function getHelpfulCount(reviewId) {
  return getHelpfulMap()[reviewId] || 0;
}

function hasVotedHelpful(reviewId) {
  return getHelpfulMap()["voted:" + reviewId] === true;
}

function voteHelpful(reviewId) {
  const map = getHelpfulMap();
  if (map["voted:" + reviewId]) return false;
  map[reviewId] = (map[reviewId] || 0) + 1;
  map["voted:" + reviewId] = true;
  localStorage.setItem(HELPFUL_KEY, JSON.stringify(map));
  return true;
}

document.addEventListener("click", function (e) {
  const btn = e.target.closest("[data-helpful-id]");
  if (!btn || btn.disabled) return;

  const id = btn.dataset.helpfulId;
  if (!voteHelpful(id)) return;

  btn.disabled = true;
  btn.classList.add("is-on");
  const count = getHelpfulCount(id);
  btn.innerHTML = "\uD83D\uDC4D Helpful <span class=\"helpfulbtn__count\">" + count + "</span>";
});


/* ---- 태그 선택 UI (에브리타임 강의평처럼 3단계 선택) ---- */
function buildTagPicker(key, label, choices) {
  return '<div class="tagpicker" data-tagpicker="' + key + '">' +
           '<span class="tagpicker__label">' + esc(label) + '</span>' +
           '<div class="tagpicker__choices">' +
             choices.map(function (c, i) {
               return '<button type="button" class="tagchip" data-tag-value="' + i + '">' + esc(c) + '</button>';
             }).join("") +
           '</div>' +
         '</div>';
}


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


/* ---- Residence 페이지 상단 마감일 박스 ----
   FEES_TIMELINE 중 category === "residence" 인 항목을 여기서 보여줍니다.
   (예전엔 Fees & Dates 안에 따로 있었는데, "기숙사 얘기는 기숙사 페이지에서
   보이게 해달라"는 요청으로 여기로 옮겼습니다. 데이터는 FEES_TIMELINE
   하나만 쓰고, 보여주는 자리만 여기로 옮긴 거라 나중에 날짜가 바뀌어도
   한 곳만 고치면 됩니다.) */
function renderResidenceDeadlines() {
  const box = document.getElementById("residence-deadlines");
  if (!box || typeof FEES_TIMELINE === "undefined") return;

  const items = FEES_TIMELINE.filter(function (item) { return item.category === "residence"; });
  if (items.length === 0) { box.innerHTML = ""; return; }

  box.innerHTML = items.map(function (item) {
    return '<div class="keybox keybox--alert">' +
             '<div class="keybox__icon">!</div>' +
             '<div>' +
               '<p class="keybox__main">' + esc(item.title) + '</p>' +
               '<p class="keybox__sub">' + boldMarks(item.body) +
                 (item.officialUrl
                   ? ' <a href="' + esc(item.officialUrl) + '" target="_blank" rel="noopener noreferrer">Details &nearr;</a>'
                   : "") +
               '</p>' +
             '</div>' +
           '</div>';
  }).join("");
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

/* ---- 태그 칩 클릭 — 하나만 켜지게 ---- */
document.addEventListener("click", function (e) {
  const chip = e.target.closest(".tagchip");
  if (!chip) return;

  const picker = chip.closest(".tagpicker");
  picker.dataset.value = chip.dataset.tagValue;

  picker.querySelectorAll(".tagchip").forEach(function (c) {
    c.classList.remove("is-on");
  });
  chip.classList.add("is-on");
});

/* ---- 리뷰 잠금 해제 버튼 ---- */
document.addEventListener("click", function (e) {
  const btn = e.target.closest("[data-unlock-reviews]");
  if (!btn) return;

  const id = btn.dataset.unlockReviews;

  if (!spendPoint()) {
    showToast("Not enough points \u2014 write a review to earn some");
    return;
  }

  unlockReviews(id);
  showToast("Unlocked! (" + getPoints() + " points left)");
  openDetail(id);   // 상세를 다시 그려서 잠금 풀린 리뷰를 보여줍니다
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

  // 태그 3개(소음/방크기/관리) 값을 모읍니다. 안 고르면 그냥 빠집니다.
  const tagLabels = { noise: "Noise", room: "Room size", staff: "Staff & maintenance" };
  const tagChoices = {
    noise: ["Quiet", "Average", "Loud"],
    room: ["Small", "Average", "Spacious"],
    staff: ["Slow", "Average", "Responsive"]
  };
  const tagLines = [];
  form.querySelectorAll("[data-tagpicker]").forEach(function (picker) {
    const key = picker.dataset.tagpicker;
    if (picker.dataset.value === undefined) return;
    const idx = Number(picker.dataset.value);
    tagLines.push(tagLabels[key] + ": " + tagChoices[key][idx]);
  });

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
    (tagLines.length ? tagLines.join("\n") + "\n" : "") +
    "Name: " + name + "\n\n" +
    text;

  window.location.href =
    "mailto:" + ADMIN_EMAIL +
    "?subject=" + encodeURIComponent(subject) +
    "&body=" + encodeURIComponent(body);

  const earned = addPoints(2);
  showToast("Opening your email app… +2 points (you have " + earned + ")");
});


/* ============================================
   Fees & Dates — 카테고리 고르고 → 그 안 날짜 보기
   ============================================ */

let feesAudience = "domestic";   // "domestic" 또는 "international"

/* ---- 카테고리 목록. 여기 하나 추가하면 화면에도 자동으로 생깁니다 ----
   ⚠️ "residence" 카테고리는 일부러 없습니다 — 그 날짜는 이제
      Residence 페이지 상단에서 보여줍니다 (renderResidenceDeadlines 참고).
   ⚠️ "program"(Choosing a Program)은 원래 Courses 쪽에 있었는데,
      지원 준비 단계에 더 맞아서 여기로 옮겨왔습니다. 클릭 동작은
      renderFeesCategories() 안에서 따로 처리합니다 (course-page 화면 재사용). */
const FEES_CATEGORIES = [
  { id: "prep",      label: "Grade 12",                 desc: "Everything from exploring programs to accepting your offer", icon: "\uD83C\uDF92", color: "#0E7C86" },
  { id: "program",   label: "Choosing a Program",        desc: "How to pick and apply for your major",       icon: "\uD83C\uDFAF", color: "#7A3FA0" },
  { id: "money",     label: "Money & Tuition",          desc: "Deposits, tuition, payment deadlines",       icon: "\uD83D\uDCB0", color: "#0F7A4D" },
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


/* ---- Courses 화면(course-page)을 Undergraduate 쪽에서도 재사용하기 위한 표시.
   "program" 카드를 어디서 눌렀는지 기억해뒀다가, 뒤로가기 끝까지 눌렀을 때
   원래 있던 탭(courses 또는 fees)으로 돌아가게 합니다. */
let courseReturnView = "courses";
window.getCourseReturnView = function () { return courseReturnView; };


/* ---- 카테고리 목록 화면 그리기 ----
   각 카테고리에 몇 개 날짜가 있는지 보여주고, 0개면 흐리게(못 누르게) 만듭니다.
   "program" 카드는 날짜가 아니라 학부 수만큼 보여주고, 절대 안 흐려집니다. */
function renderFeesCategories() {
  const box = document.getElementById("fees-categories");
  if (!box) return;

  const items = feesForAudience();
  const checked = getCheckedDates();

  box.innerHTML = FEES_CATEGORIES.map(function (cat) {
    const isProgram = cat.id === "program";
    const catItems = isProgram ? [] : items.filter(function (i) { return i.category === cat.id; });
    const count = isProgram
      ? (typeof COURSE_FACULTIES !== "undefined" ? COURSE_FACULTIES.length : 0)
      : catItems.length;
    const doneCount = catItems.filter(function (i) { return checked.indexOf(i.id) !== -1; }).length;
    const disabled = !isProgram && count === 0;

    let badge;
    if (disabled)        badge = '<span class="feescard__badge feescard__badge--off">N/A</span>';
    else if (isProgram)  badge = '<span class="feescard__badge">' + count + ' faculties</span>';
    else if (doneCount > 0) badge = '<span class="feescard__badge">' + doneCount + '/' + count + ' done</span>';
    else                 badge = '<span class="feescard__badge">' + count + (count === 1 ? " date" : " dates") + '</span>';

    return '<button type="button" class="feescard' + (disabled ? " is-off" : "") +
           '" data-category="' + cat.id + '"' + (disabled ? " disabled" : "") +
           ' style="--cat-color:' + cat.color + '">' +
             '<span class="feescard__top">' +
               '<span class="feescard__icon">' + cat.icon + '</span>' +
               badge +
             '</span>' +
             '<span class="feescard__name">' + esc(cat.label) + '</span>' +
             '<span class="feescard__desc">' + esc(cat.desc) + '</span>' +
           '</button>';
  }).join("");

  box.querySelectorAll(".feescard:not(.is-off)").forEach(function (row) {
    row.addEventListener("click", function () {
      if (row.dataset.category === "program") {
        courseReturnView = "fees";
        goToCourseScreen(buildProgramHomeScreen(""), true);
        return;
      }
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

  // 주소에도 남깁니다 (pushState 는 hashchange 를 안 일으켜서 화면이 두 번 그려지지 않습니다)
  if (!isRestoringFromHash) history.pushState(null, "", "#undergraduate/" + catId);
}


/* ---- "← Categories" 를 누르면 목록으로 돌아갑니다 ---- */
document.addEventListener("click", function (e) {
  if (!e.target.closest("[data-fees-back]")) return;
  document.getElementById("fees-items").hidden = true;
  document.getElementById("fees-categories").hidden = false;
  if (!isRestoringFromHash) history.pushState(null, "", "#undergraduate");
});


/* ---- 마감일 체크리스트 ----
   "이건 했다"를 체크해두면 이 브라우저에 저장됩니다 (localStorage).
   지원 준비하면서 어디까지 했는지 다시 와서 확인할 수 있게. */
const CHECKED_KEY = "uoftguide-checked-dates";

function getCheckedDates() {
  try {
    const v = JSON.parse(localStorage.getItem(CHECKED_KEY) || "[]");
    return Array.isArray(v) ? v : [];   // 배열이 아닌 값이 저장돼 있어도 앱이 죽지 않게
  }
  catch (err) { return []; }
}

function setDateChecked(id, on) {
  try {
    let list = getCheckedDates();
    if (on && list.indexOf(id) === -1) list.push(id);
    if (!on) list = list.filter(function (x) { return x !== id; });
    localStorage.setItem(CHECKED_KEY, JSON.stringify(list));
  } catch (err) { /* 시크릿 모드 등에서 저장이 막혀도 화면은 그대로 동작 */ }
}


/* ---- 날짜 목록 그리기 (카테고리 하나 안의 내용) ---- */
function renderFeesTimeline(items, color) {
  const box = document.getElementById("fees-timeline");
  if (!box) return;

  if (!items || items.length === 0) {
    box.innerHTML = '<p class="empty">No dates here yet.</p>';
    return;
  }

  const checked = getCheckedDates();

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

    const isDone = checked.indexOf(item.id) !== -1;

    return '<article class="tl-item' + (isDone ? " is-done" : "") + '" style="--cat-color:' + color + '" data-tl-id="' + esc(item.id) + '">' +
             '<div class="tl-num">' + (i + 1) + '</div>' +
             '<div class="tl-month">' + monthHtml + '</div>' +
             '<div class="tl-body">' +
               '<h4 class="tl-title">' + esc(item.title) + tag + '</h4>' +
               '<p class="tl-text">' + boldMarks(item.body) + '</p>' +
               (item.officialUrl
                 ? '<a class="tl-link" href="' + esc(item.officialUrl) + '" target="_blank" rel="noopener noreferrer">Official page &nearr;</a>'
                 : "") +
               (item.icsDate
                 ? '<button type="button" class="icsbtn" data-ics-title="' + esc(item.title) + '" data-ics-date="' + esc(item.icsDate) + '">' +
                     '\uD83D\uDCC5 Add to calendar' +
                   '</button>'
                 : "") +
             '</div>' +
             '<label class="tl-check" title="Mark as done (saved in this browser)">' +
               '<input type="checkbox" data-check-id="' + esc(item.id) + '"' + (isDone ? " checked" : "") + '>' +
               '<span>Done</span>' +
             '</label>' +
           '</article>';
  }).join("");
}


/* 체크하면 저장하고, 그 줄만 살짝 흐리게 표시합니다 */
document.addEventListener("change", function (e) {
  const cb = e.target.closest("[data-check-id]");
  if (!cb) return;
  setDateChecked(cb.dataset.checkId, cb.checked);
  const row = cb.closest(".tl-item");
  if (row) row.classList.toggle("is-done", cb.checked);
  renderFeesCategories();   // 카테고리 카드의 "N done" 뱃지도 같이 갱신
});


/* ---- 캘린더에 저장 ----
   날짜가 확실한(icsDate 가 있는) 항목만 지원합니다.
   애매한 날짜에 잘못 저장되는 걸 막으려고, 확인 안 된 건 아예 버튼을 안 보여줍니다. */
document.addEventListener("click", function (e) {
  const btn = e.target.closest(".icsbtn");
  if (!btn) return;

  const title = btn.dataset.icsTitle;
  const dateStr = btn.dataset.icsDate;   // "YYYY-MM-DD"
  const compact = dateStr.replace(/-/g, "");

  const ics =
    "BEGIN:VCALENDAR\r\n" +
    "VERSION:2.0\r\n" +
    "PRODID:-//UofT Guide//EN\r\n" +
    "BEGIN:VEVENT\r\n" +
    "UID:" + compact + "-" + Math.random().toString(36).slice(2) + "@uoft-guide\r\n" +
    "DTSTART;VALUE=DATE:" + compact + "\r\n" +
    "SUMMARY:" + title.replace(/,/g, "\\,") + "\r\n" +
    "DESCRIPTION:Added from the UofT St. George unofficial student guide.\r\n" +
    "END:VEVENT\r\n" +
    "END:VCALENDAR\r\n";

  const blob = new Blob([ics], { type: "text/calendar" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = title.replace(/[^a-z0-9]+/gi, "-") + ".ics";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);

  showToast("Calendar file downloaded");
});


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
renderResidenceDeadlines();


/* ---- 캠퍼스 편의시설 화면 그리기 ----
   FACILITIES를 카테고리별로 묶어서 보여줍니다. 용어사전과 같은 구조라
   화면 코드도 거의 같습니다. Residence처럼 독립된 최상위 화면이라
   course-page 시스템(스택)은 안 씁니다.
   각 행은 버튼입니다 — 누르면 사진/위치/리뷰가 있는 상세 화면으로 갑니다. */
function renderFacilities(term) {
  const box = document.getElementById("facilities-list");
  if (!box || typeof FACILITIES === "undefined") return;

  const q = (term || "").trim().toLowerCase();
  const hits = q
    ? FACILITIES.filter(function (f) {
        return (f.name + " " + f.address + " " + f.note).toLowerCase().indexOf(q) !== -1;
      })
    : FACILITIES;

  let body = "";
  FACILITY_CATS.forEach(function (cat) {
    const items = hits.filter(function (f) { return f.cat === cat.id; });
    if (!items.length) return;
    body +=
      '<h3 class="glossgroup" style="color:' + cat.color + '">' + cat.icon + ' ' + esc(cat.label) + '</h3>' +
      '<div class="glosslist">' +
        items.map(function (f) {
          const reviews = Array.isArray(f.reviews) ? f.reviews.filter(function (r) { return r && r.text; }) : [];
          const avg = reviews.length
            ? reviews.reduce(function (s, r) { return s + (r.stars || 0); }, 0) / reviews.length
            : 0;
          return '<button type="button" class="glossrow facrow' + (f.photoUrl ? " facrow--photo" : "") + '" data-open-facility="' + esc(f.id) + '">' +
                   (f.photoUrl
                     ? '<img class="facrow__thumb" src="' + esc(f.photoUrl) + '" alt="" loading="lazy" onerror="this.remove(); this.closest(\'.facrow\').classList.remove(\'facrow--photo\');">'
                     : '') +
                   '<div class="facrow__body">' +
                   '<h4 class="glossrow__term">' + esc(f.name) +
                     (avg ? ' <span class="facrow__rating">\u2605 ' + avg.toFixed(1) + '</span>' : '') +
                   '</h4>' +
                   (f.address ? '<p class="facrow__addr">' + esc(f.address) + '</p>' : '') +
                   '<p class="glossrow__def">' + esc(f.note) + '</p>' +
                   '<span class="tl-link">' + (reviews.length ? reviews.length + (reviews.length === 1 ? " review" : " reviews") + " \u00b7 " : "") + 'See details &rarr;</span>' +
                   '</div>' +
                 '</button>';
        }).join("") +
      '</div>';
  });

  if (!body) body = '<p class="empty">No matches for \u201c' + esc(term) + '\u201d</p>';

  box.innerHTML = body;
}

const facilitySearchInput = document.getElementById("facility-search");
if (facilitySearchInput) {
  facilitySearchInput.addEventListener("input", function (e) {
    renderFacilities(e.target.value);
  });
}

renderFacilities("");


/* ---- 편의시설 상세 화면 ----
   기숙사 상세와 같은 구성: 사진(있으면) → 위치 지도 → 학생 리뷰 → 리뷰 쓰기 폼.
   사진은 학생이 리뷰 메일에 첨부해서 보내주면 관리자가 data.js에 추가합니다
   (기숙사처럼 서버 업로드가 아니라 이메일 경유 — 같은 방식으로 통일). */
function buildFacilityDetail(item) {
  const html = [];
  const reviews = Array.isArray(item.reviews) ? item.reviews.filter(function (r) { return r && r.text; }) : [];
  const avg = reviews.length ? reviews.reduce(function (s, r) { return s + (r.stars || 0); }, 0) / reviews.length : 0;

  html.push(
    '<h2 class="page-title">' + esc(item.name) +
      (avg ? ' <span class="title-rating">\u2605 ' + avg.toFixed(1) + '<span class="title-rating__count">(' + reviews.length + ')</span></span>' : '') +
    '</h2>'
  );

  html.push('<p class="tl-text" style="margin-bottom:14px;">' + esc(item.note) + '</p>');

  /* 사진 — 아직 확보된 공식 사진이 없으면 이 구역은 통째로 안 나옵니다 */
  const photos = [];
  if (item.photoUrl) photos.push(item.photoUrl);
  if (Array.isArray(item.morePhotos)) item.morePhotos.forEach(function (p) { if (p) photos.push(p); });
  if (photos.length) {
    html.push(
      '<div class="media">' +
        '<div class="strip' + (photos.length === 1 ? " strip--single" : "") + '">' +
          photos.map(function (src) {
            return '<img class="strip__img" src="' + esc(src) + '" alt="' + esc(item.name) + '" loading="lazy" onerror="this.remove();">';
          }).join("") +
        '</div>' +
        /* 사진 출처 표기 — Commons 등 외부 사진일 때만 나옵니다 */
        (item.photoCredit
          ? '<p class="media__credit">' +
              (item.photoCreditUrl
                ? '<a href="' + esc(item.photoCreditUrl) + '" target="_blank" rel="noopener noreferrer">' + esc(item.photoCredit) + '</a>'
                : esc(item.photoCredit)) +
            '</p>'
          : '') +
      '</div>'
    );
  }

  /* 위치 지도 */
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

  html.push(
    '<a class="tl-link" href="' + esc(item.officialUrl) + '" target="_blank" rel="noopener noreferrer" ' +
    'style="display:inline-block; margin:6px 0 22px;">Official page &nearr;</a>'
  );

  /* 학생 리뷰 */
  const reviewCards = reviews.length
    ? (function () {
        const cards = reviews.map(function (r, i) {
          const stars = Math.max(0, Math.min(5, Math.round(r.stars || 0)));
          const reviewId = item.id + "-r" + i;
          const helpfulCount = getHelpfulCount(reviewId);
          const iVoted = hasVotedHelpful(reviewId);
          return '<article class="review">' +
                   '<div class="review__stars" aria-label="' + stars + ' out of 5 stars">' +
                     '★★★★★'.slice(0, stars) + '☆☆☆☆☆'.slice(0, 5 - stars) +
                   '</div>' +
                   '<p class="review__text">' + esc(r.text) + '</p>' +
                   (r.source ? '<p class="credit">' + esc(r.source) + '</p>' : "") +
                   '<button type="button" class="helpfulbtn' + (iVoted ? " is-on" : "") + '" ' +
                     'data-helpful-id="' + esc(reviewId) + '" ' + (iVoted ? "disabled" : "") + '>' +
                     '\uD83D\uDC4D Helpful' + (helpfulCount > 0 ? ' <span class="helpfulbtn__count">' + helpfulCount + '</span>' : "") +
                   '</button>' +
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

  const formHtml =
    '<form class="reviewform" data-facility-review-form data-facility-id="' + esc(item.id) + '" data-facility-name="' + esc(item.name) + '">' +
      '<p class="reviewform__label">Write a review</p>' +
      '<div class="starpicker" data-starpicker>' +
        [1, 2, 3, 4, 5].map(function (n) {
          return '<button type="button" class="starpicker__btn" data-star="' + n + '" aria-label="' + n + ' stars">☆</button>';
        }).join("") +
      '</div>' +
      '<textarea class="reviewform__text" data-review-text rows="3" ' +
        'placeholder="What should other students know about this place?" required></textarea>' +
      '<input class="reviewform__name" data-review-name type="text" placeholder="Your name or \'Anonymous\'">' +
      '<button type="submit" class="reviewform__submit">Send review</button>' +
      '<p class="reviewform__note">Opens your email app \u2014 feel free to attach a photo too. We read every submission and add it to the site.</p>' +
    '</form>';

  html.push(
    '<section class="block block--student">' +
      '<h3 class="block__head">Student reviews</h3>' +
      reviewCards +
      formHtml +
    '</section>'
  );

  return html.join("");
}

function openFacilityDetail(id) {
  const box = document.getElementById("facility-detail-body");
  if (!box) return;

  const item = FACILITIES.filter(function (f) { return f.id === id; })[0];
  if (!item) { showToast(MESSAGES.notFound); return; }

  box.innerHTML = buildFacilityDetail(item);
  showView("facilityDetail", "facilities/" + id);
}

document.addEventListener("click", function (e) {
  const btn = e.target.closest("[data-open-facility]");
  if (!btn) return;
  openFacilityDetail(btn.dataset.openFacility);
});


/* ---- 편의시설 리뷰 제출 ---- */
document.addEventListener("submit", function (e) {
  const form = e.target.closest("[data-facility-review-form]");
  if (!form) return;
  e.preventDefault();

  const stars = Number(form.querySelector("[data-starpicker]").dataset.value || 0);
  const text = form.querySelector("[data-review-text]").value.trim();
  const name = form.querySelector("[data-review-name]").value.trim() || "Anonymous";
  const facilityName = form.dataset.facilityName;

  if (!stars) { showToast("Pick a star rating first"); return; }
  if (!text) { showToast("Write a few words first"); return; }

  const subject = "Facility review: " + facilityName;
  const body =
    "Facility: " + facilityName + "\n" +
    "Stars: " + stars + " / 5\n" +
    "Name: " + name + "\n\n" +
    text +
    "\n\n(Attach a photo to this email if you have one!)";

  window.location.href = "mailto:" + ADMIN_EMAIL + "?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(body);

  const earned = addPoints(2);
  showToast("Opening your email app\u2026 +2 points (you have " + earned + ")");
});


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

/* 위와 같은 파싱이지만 순수 영상 ID만 반환 (썸네일/링크용) */
function youtubeId(url) {
  if (!url) return "";
  const text = String(url);
  let id = "";
  if (text.indexOf("youtu.be/") !== -1) {
    id = text.split("youtu.be/")[1];
  } else if (text.indexOf("watch?v=") !== -1) {
    id = text.split("watch?v=")[1];
  } else if (text.indexOf("/embed/") !== -1) {
    id = text.split("/embed/")[1];
  } else {
    return "";
  }
  return id.split("&")[0].split("?")[0].split("/")[0];
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
        '<div class="strip' + (photos.length === 1 ? " strip--single" : "") + '">' + imgs + '</div>' +
        '<p class="credit">Official U of T photos</p>' +
      '</div>'
    );
  }

  /* 3. 학생 리뷰 — 사진 바로 아래. 별점 + 글.
     첫 리뷰 1개는 항상 무료로 보이고, 그 이상은 포인트로 잠급니다.
     (에브리타임처럼: 리뷰를 쓰면 포인트를 얻고, 포인트로 더 볼 수 있음)
     ⚠️ 이 포인트는 이 브라우저에만 저장됩니다. 서버가 없어서 개발자도구로
        우회할 수 있습니다 — 진짜 계정 시스템이 아니라 가벼운 참여 유도 장치입니다. */
  const reviews = Array.isArray(item.reviews) ? item.reviews.filter(function (r) { return r && r.text; }) : [];
  const isUnlocked = reviewsUnlocked(item.id);
  const lockedCount = reviews.length > 1 && !isUnlocked ? reviews.length - 1 : 0;
  const visibleReviews = lockedCount > 0 ? reviews.slice(0, 1) : reviews;

  const reviewCards = reviews.length > 0
    ? (function () {
        const avg = reviews.reduce(function (sum, r) { return sum + (r.stars || 0); }, 0) / reviews.length;

        /* ---- 태그 집계 (에브리타임 강의평처럼 색깔 막대로) ----
           각 리뷰에 tags:{noise:0~2, room:0~2, staff:0~2} 가 있으면
           평균 내서 3단계 중 제일 가까운 걸 색깔로 보여줍니다.
           태그를 단 리뷰가 하나도 없으면 이 구역은 통째로 안 나옵니다. */
        const tagDefs = [
          { key: "noise", label: "Noise", choices: ["Quiet", "Average", "Loud"], colors: ["#0F7A4D", "#0B4DA0", "#C05A16"] },
          { key: "room", label: "Room size", choices: ["Small", "Average", "Spacious"], colors: ["#C05A16", "#0B4DA0", "#0F7A4D"] },
          { key: "staff", label: "Staff & maintenance", choices: ["Slow", "Average", "Responsive"], colors: ["#C05A16", "#0B4DA0", "#0F7A4D"] }
        ];

        const tagBars = tagDefs.map(function (def) {
          const vals = reviews.filter(function (r) { return r.tags && r.tags[def.key] !== undefined; })
                               .map(function (r) { return r.tags[def.key]; });
          if (vals.length === 0) return "";

          const idx = Math.round(vals.reduce(function (a, b) { return a + b; }, 0) / vals.length);
          const safeIdx = Math.max(0, Math.min(2, idx));

          return '<div class="tagbar">' +
                   '<span class="tagbar__label">' + esc(def.label) + '</span>' +
                   '<span class="tagbar__value" style="background:' + def.colors[safeIdx] + '">' + esc(def.choices[safeIdx]) + '</span>' +
                 '</div>';
        }).filter(Boolean).join("");

        const tagSummary = tagBars ? '<div class="tagbars">' + tagBars + '</div>' : "";

        const cards = visibleReviews.map(function (r, i) {
          const stars = Math.max(0, Math.min(5, Math.round(r.stars || 0)));
          const reviewId = item.id + "-r" + i;
          const helpfulCount = getHelpfulCount(reviewId);
          const iVoted = hasVotedHelpful(reviewId);

          return '<article class="review">' +
                   '<div class="review__stars" aria-label="' + stars + ' out of 5 stars">' +
                     '★★★★★'.slice(0, stars) + '☆☆☆☆☆'.slice(0, 5 - stars) +
                   '</div>' +
                   '<p class="review__text">' + esc(r.text) + '</p>' +
                   (r.source ? '<p class="credit">' + esc(r.source) + '</p>' : "") +
                   '<button type="button" class="helpfulbtn' + (iVoted ? " is-on" : "") + '" ' +
                     'data-helpful-id="' + esc(reviewId) + '" ' + (iVoted ? "disabled" : "") + '>' +
                     '\uD83D\uDC4D Helpful' + (helpfulCount > 0 ? ' <span class="helpfulbtn__count">' + helpfulCount + '</span>' : "") +
                   '</button>' +
                 '</article>';
        }).join("");

        const gate = lockedCount > 0
          ? '<div class="reviewgate">' +
              '<p class="reviewgate__text">\uD83D\uDD12 ' + lockedCount + (lockedCount === 1 ? " more review is" : " more reviews are") + ' locked.</p>' +
              '<button type="button" class="reviewgate__btn" data-unlock-reviews="' + esc(item.id) + '">' +
                'Unlock with 1 point (you have <span data-points-inline>' + getPoints() + '</span>)' +
              '</button>' +
              '<p class="reviewgate__hint">Get points by writing a review \u2014 anywhere on the site.</p>' +
            '</div>'
          : "";

        return '<div class="review__avg">' +
                 '<span class="review__avgnum">' + avg.toFixed(1) + '</span>' +
                 '<span class="review__avgstars">' + '★★★★★'.slice(0, Math.round(avg)) + '</span>' +
                 '<span class="review__avgcount">' + reviews.length + (reviews.length === 1 ? " review" : " reviews") + '</span>' +
               '</div>' +
               tagSummary +
               '<div class="reviews">' + cards + '</div>' +
               gate;
      })()
    : '<p class="empty empty--small">No reviews yet. Be the first to write one.</p>';

  // 별점 선택 버튼 5개 + 태그 3개(소음/방크기/관리) + 글 입력칸 + 이메일로 보내기.
  // 여기서 쓴 내용이 자동으로 사이트에 올라가지는 않습니다 — 관리자가 받아서 확인 후 추가합니다.
  const formHtml =
    '<form class="reviewform" data-review-form data-residence="' + esc(item.name) + '">' +
      '<p class="reviewform__label">Write a review</p>' +
      '<div class="starpicker" data-starpicker>' +
        [1, 2, 3, 4, 5].map(function (n) {
          return '<button type="button" class="starpicker__btn" data-star="' + n + '" aria-label="' + n + ' stars">☆</button>';
        }).join("") +
      '</div>' +
      buildTagPicker("noise", "Noise", ["Quiet", "Average", "Loud"]) +
      buildTagPicker("room", "Room size", ["Small", "Average", "Spacious"]) +
      buildTagPicker("staff", "Staff & maintenance", ["Slow", "Average", "Responsive"]) +
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

  /* 4. 공식 투어 영상 — videoUrl 이 비어 있으면 이 부분 전체가 안 나옴
     iframe 임베드 대신 썸네일을 눌러 유튜브로 바로 이동하는 방식.
     (iframe 임베드는 로컬에서 열거나 배포 전 테스트할 때 유튜브 쪽에서
     막아서 에러가 뜨는 경우가 있어, 링크 방식이 훨씬 안전합니다) */
  const ytId = youtubeId(item.videoUrl);
  if (ytId) {
    html.push(
      '<div class="media">' +
        '<a class="video video--link" href="https://www.youtube.com/watch?v=' + esc(ytId) + '" ' +
          'target="_blank" rel="noopener" aria-label="Watch ' + esc(item.name) + ' tour on YouTube">' +
          '<img src="https://img.youtube.com/vi/' + esc(ytId) + '/hqdefault.jpg" alt="" loading="lazy">' +
          '<span class="video__play" aria-hidden="true">\u25B6</span>' +
        '</a>' +
        '<p class="credit">' +
          (item.videoCredit ? esc(item.videoCredit) : "Official residence tour") +
          ' \u2014 tap to watch on YouTube' +
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
  { id: "degree",  label: "Degree Requirements",  desc: "Credits, breadth, and what it takes to graduate", icon: "\uD83C\uDF93", color: "#0F7A4D" },
  { id: "enrol",   label: "Enrolment (ACORN)",    desc: "When you can start choosing courses",          icon: "\uD83D\uDCBB", color: "#0B4DA0" },
  { id: "coursereviews", label: "Breadth Courses", desc: "Find courses to fill your breadth requirements \u2014 with student reviews", icon: "\uD83D\uDCDD", color: "#C05A16" },
  { id: "glossary", label: "UofT Glossary",       desc: "POSt, FCE, CR/NCR, LWD\u2026 what all the jargon actually means", icon: "\uD83D\uDCD6", color: "#0E7C86" }
];

function courseBadge(catId) {
  if (catId === "enrol")   return COURSE_ENROLMENT.length + " dates";
  if (catId === "degree")  return "Guide";
  if (catId === "coursereviews") return COURSE_CATALOG.length + " courses";
  if (catId === "glossary") return (typeof GLOSSARY !== "undefined" ? GLOSSARY.length : 0) + " terms";
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
      courseReturnView = "courses";
      if (id === "enrol")   goToCourseScreen(buildEnrolScreen(), true);
      if (id === "degree")  goToCourseScreen(buildDegreeScreen(), true);
      if (id === "coursereviews") goToCourseScreen(buildCourseReviewHomeScreen(""), true);
      if (id === "glossary") goToCourseScreen(buildGlossaryScreen(""), true);
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
  showView("coursePage", screen.route || "coursePage");
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

  // 학점 계산기가 이 화면 안에 있으면(=Degree Requirements 화면), 결과를 바로 계산해서 보여줍니다.
  if (document.getElementById("credit-calc-result")) renderCreditResult();
}

/* Back 버튼: 스택에 남은 게 있으면 하나 꺼내서 보여주고,
   없으면 Courses 카테고리 화면(진짜 홈)으로 돌아갑니다. */
document.addEventListener("click", function (e) {
  if (!e.target.closest("[data-course-back]")) return;

  if (courseStack.length > 0) {
    currentCourseScreen = courseStack.pop();
    renderCourseScreen(currentCourseScreen);
    showView("coursePage", currentCourseScreen.route || "coursePage");
  } else {
    currentCourseScreen = null;
    showView(courseReturnView);
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

  return { title: "Enrolment (ACORN)", color: "#0B4DA0", html: '<div class="timeline">' + rows + '</div>' + buildCourseCodeGuideHTML() };
}


/* ---- 과목코드 & ACORN/TTB 용어 가이드 (접이식) ---- */
function buildCourseCodeGuideHTML() {
  const g = COURSE_CODE_GUIDE;

  const termsList = '<ul class="codeguide__list">' +
    g.terms.map(function (t) {
      return '<li><strong>' + esc(t.term) + '</strong> — ' + esc(t.def) + '</li>';
    }).join("") +
  '</ul>';

  const codeRow = function (c) {
    return '<span class="codeguide__chip"><b>' + esc(c.code) + '</b>' + esc(c.meaning) + '</span>';
  };

  const sessionRow = codeRow;
  const sessions = g.sessionCodes.map(sessionRow).join("");
  const activities = g.activityCodes.map(sessionRow).join("");
  const enrolCtrls = g.enrolCodes.map(sessionRow).join("");

  const uoftTime =
    '<div class="blocknote">' +
      esc(g.uoftTime.text) +
      '<br><small>' + esc(g.uoftTime.sourceLabel) +
      (g.uoftTime.sourceUrl
        ? ' — <a href="' + esc(g.uoftTime.sourceUrl) + '" target="_blank" rel="noopener noreferrer">source</a>'
        : "") +
      '</small>' +
    '</div>';

  const deptTable = '<div class="codeguide__depts">' +
    g.deptCodes.map(function (d) {
      return '<span class="codeguide__deptrow"><b>' + esc(d.code) + '</b>' + esc(d.name) + '</span>';
    }).join("") +
  '</div>';

  return (
    '<details class="codeguide">' +
      '<summary>\uD83D\uDCD6 Understanding course codes &amp; ACORN terms</summary>' +
      '<div class="codeguide__body">' +
        '<p class="codeguide__format"><strong>Code format:</strong> ' + esc(g.format) + '</p>' +
        '<p class="codeguide__formatnote">' + esc(g.formatNote) + '</p>' +

        '<h5 class="codeguide__h">Key terms</h5>' + termsList +

        '<h5 class="codeguide__h">Session codes</h5><div class="codeguide__chips">' + sessions + '</div>' +
        '<h5 class="codeguide__h">Activity types</h5><div class="codeguide__chips">' + activities + '</div>' +
        '<h5 class="codeguide__h">Enrolment control codes</h5><div class="codeguide__chips">' + enrolCtrls + '</div>' +

        uoftTime +

        '<h5 class="codeguide__h">Department codes (' + g.deptCodes.length + ')</h5>' +
        deptTable +

        '<p class="blocknote">This code table is unofficial and unverified per-entry — always confirm the exact code on the ' +
        '<a href="' + esc(g.verifyUrl) + '" target="_blank" rel="noopener noreferrer">official course search</a> before enrolling.</p>' +
      '</div>' +
    '</details>'
  );
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

  const calculator = buildCreditCalculator();

  const cats = '<div class="halls">' +
    BREADTH_CATEGORIES.map(function (c) {
      return '<article class="hall"><h4 class="hall__name">' + esc(c.name) + '</h4></article>';
    }).join("") +
  '</div>';

  const html = basics + rule + calculator +
    '<h3 class="block__head" style="margin: 0 0 12px;">The 5 breadth categories</h3>' +
    cats +
    '<p class="blocknote">Category names are shown on each course in the official calendar. ' +
    'Confirm current names and rules there, as these can change.</p>' +
    '<a class="cta" href="https://artsci.calendar.utoronto.ca/hbahbsc-requirements" target="_blank" rel="noopener noreferrer">Open official calendar &nearr;</a>';

  return { title: "Degree Requirements", color: "#0F7A4D", html: html };
}


/* ============================================
   학점 계산기 (에브리타임 "학점계산기" 참고)
   ------------------------------------------------
   졸업까지 20.0학점 중 몇 학점 남았는지, Breadth 요건이
   충족됐는지 입력한 대로 계산해줍니다.
   ⚠️ 입력값은 이 브라우저(localStorage)에만 저장됩니다.
   ============================================ */

const CREDIT_CALC_KEY = "uoftGuideCreditCalc";

function loadCreditCalc() {
  try {
    const parsed = JSON.parse(localStorage.getItem(CREDIT_CALC_KEY) || "{}");
    const saved = (parsed && typeof parsed === "object") ? parsed : {};   // null·숫자 방어
    return {
      total: saved.total || 0,
      b1: saved.b1 || 0, b2: saved.b2 || 0, b3: saved.b3 || 0, b4: saved.b4 || 0, b5: saved.b5 || 0
    };
  } catch (e) {
    return { total: 0, b1: 0, b2: 0, b3: 0, b4: 0, b5: 0 };
  }
}

function saveCreditCalc(v) {
  localStorage.setItem(CREDIT_CALC_KEY, JSON.stringify(v));
}

function buildCreditCalculator() {
  const v = loadCreditCalc();
  const catFields = ["b1", "b2", "b3", "b4", "b5"];

  const catInputs = BREADTH_CATEGORIES.map(function (c, i) {
    const key = catFields[i];
    return '<label class="calc__field">' +
             '<span class="calc__fieldlabel">' + esc(c.name) + '</span>' +
             '<input type="number" step="0.5" min="0" class="calc__input" data-calc-field="' + key + '" value="' + v[key] + '">' +
           '</label>';
  }).join("");

  return '<div class="creditcalc" id="credit-calc">' +
           '<p class="creditcalc__title">\uD83D\uDCCA Credit Calculator</p>' +
           '<label class="calc__field calc__field--total">' +
             '<span class="calc__fieldlabel">Total credits completed</span>' +
             '<input type="number" step="0.5" min="0" max="20" class="calc__input" data-calc-field="total" value="' + v.total + '">' +
           '</label>' +
           '<p class="creditcalc__sub">Credits per breadth category (leave 0 if unsure)</p>' +
           '<div class="calc__grid">' + catInputs + '</div>' +
           '<div class="creditcalc__result" id="credit-calc-result"></div>' +
         '</div>';
}

/* ---- 계산해서 결과 보여주기 ---- */
function renderCreditResult() {
  const box = document.getElementById("credit-calc-result");
  if (!box) return;

  const v = loadCreditCalc();
  const total = Math.max(0, v.total);
  const cats = [v.b1, v.b2, v.b3, v.b4, v.b5];

  const pct = Math.min(100, Math.round((total / 20) * 100));
  const remaining = Math.max(0, 20 - total);

  const full = cats.filter(function (c) { return c >= 1; }).length;
  const half = cats.filter(function (c) { return c >= 0.5; }).length;
  const optionA = full >= 4;
  const optionB = full >= 3 && half >= 5;
  const breadthDone = optionA || optionB;

  box.innerHTML =
    '<div class="creditbar">' +
      '<div class="creditbar__fill" style="width:' + pct + '%"></div>' +
    '</div>' +
    '<p class="creditcalc__line"><strong>' + total.toFixed(1) + ' / 20.0 credits</strong> \u2014 ' +
      (remaining > 0 ? remaining.toFixed(1) + " to go" : "You've hit the credit minimum \uD83C\uDF89") +
    '</p>' +
    '<p class="creditcalc__line ' + (breadthDone ? "creditcalc__line--good" : "") + '">' +
      (breadthDone
        ? "\u2705 Breadth requirement looks satisfied (based on what you entered)"
        : "\u23F3 Breadth not yet satisfied \u2014 need 1.0+ in 4 categories, or 1.0+ in 3 and 0.5+ in the other 2") +
    '</p>';
}

/* 입력할 때마다 저장하고 다시 계산 */
document.addEventListener("input", function (e) {
  const field = e.target.closest("[data-calc-field]");
  if (!field) return;

  const v = loadCreditCalc();
  v[field.dataset.calcField] = parseFloat(field.value) || 0;
  saveCreditCalc(v);
  renderCreditResult();
});


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


/* ---- A-Z 이름으로 상세 가이드(COURSE_PROGRAMS)가 있는지 찾기 ----
   "Computer Science: Specialist" 같은 항목도 "Computer Science" 상세로 연결되게
   credentialBadgesFor 와 같은 방식으로 이름 앞부분만 비교합니다. */
function detailedProgramForAzName(name) {
  if (typeof COURSE_PROGRAMS === "undefined") return null;
  const base = name.split(":")[0].split("(")[0].trim().toLowerCase();
  return COURSE_PROGRAMS.filter(function (p) {
    const pbase = p.name.split(":")[0].split("(")[0].trim().toLowerCase();
    return pbase === base || pbase.indexOf(base) === 0 || base.indexOf(pbase) === 0;
  })[0] || null;
}


/* ---- 화면: 전체 프로그램 A-Z 목록 ----
   상세 가이드가 있는 프로그램은 "Guide" 뱃지가 붙고 그 가이드로,
   없는 프로그램은 우리 사이트 안의 간단 소개 화면으로 이동합니다.
   (예전엔 클릭하면 바로 외부 공식 페이지로 나갔는데, 이제 사이트 안에서 해결) */
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
          const hasGuide = !!detailedProgramForAzName(p.name);
          return '<button type="button" class="azrow" data-open-az-listing="' + esc(p.id) + '">' +
                   '<span class="azrow__name">' + esc(p.name) +
                     (hasGuide ? ' <span class="azrow__badge">Guide</span>' : '') +
                   '</span>' +
                   '<span class="azrow__meta">' + esc(p.degree) + (p.types ? ' \u00b7 ' + esc(p.types) : '') + '</span>' +
                   '<span class="azrow__go">&rarr;</span>' +
                 '</button>';
        }).join("") +
      '</div>'
    : '<p class="empty">No matches for \u201c' + esc(term) + '\u201d</p>';

  return { title: "Full Program List", color: "#7A3FA0", html: searchHtml + rows };
}

document.addEventListener("click", function (e) {
  const row = e.target.closest("[data-open-az-listing]");
  if (!row) return;
  const item = ALL_PROGRAMS_AZ.filter(function (p) { return p.id === row.dataset.openAzListing; })[0];
  if (!item) return;
  const matched = detailedProgramForAzName(item.name);
  if (matched) goToCourseScreen(buildProgramDetailScreen(matched.id), false);
  else goToCourseScreen(buildListingDetailScreen(item.id), false);
});


/* ---- 화면: A-Z 프로그램 간단 소개 (상세 가이드가 아직 없는 프로그램용) ----
   확인된 정보만 보여줍니다: 학위 종류, Specialist/Major/Minor 중 뭐가 열리는지,
   그리고 그 셋이 뭔지. 아직 안 쓴 내용은 지어내지 않고 공식 페이지로 안내합니다. */
function buildListingDetailScreen(azId) {
  const p = ALL_PROGRAMS_AZ.filter(function (x) { return x.id === azId; })[0];
  if (!p) return { title: "Not found", color: "#7A3FA0", html: '<p class="empty">That program isn\u2019t in data.js</p>' };

  const types = (p.types || "").split(/\s+/).filter(function (t) {
    return t === "Specialist" || t === "Major" || t === "Minor";
  });

  const badges = types.length
    ? '<p class="hall__tags" style="margin-bottom:16px; font-size:14px;">' +
        esc(p.degree) + ' \u00b7 offered as: ' + types.join(", ") +
      '</p>'
    : '<p class="hall__tags" style="margin-bottom:16px; font-size:14px;">' + esc(p.degree) + '</p>';

  const typeExplain =
    '<h3 class="block__head" style="margin:22px 0 10px;">Specialist vs Major vs Minor</h3>' +
    '<ul class="lede" style="text-align:left; margin:0 0 6px;">' +
      '<li><strong>Specialist</strong> \u2014 the deepest option; big enough to be the whole focus of your degree.</li>' +
      '<li><strong>Major</strong> \u2014 a medium-sized program; usually paired with another Major or Minors.</li>' +
      '<li><strong>Minor</strong> \u2014 the smallest; an add-on next to your main program.</li>' +
      '<li>You can combine up to <strong>3 programs</strong>: one Specialist alone, or a mix of Majors and Minors.</li>' +
    '</ul>';

  const honest =
    '<div class="keybox" style="margin:22px 0;">' +
      '<div class="keybox__icon">i</div>' +
      '<div>' +
        '<p class="keybox__main">We haven\u2019t written a full guide for this program yet</p>' +
        '<p class="keybox__sub">Enrolment requirements (grades, prerequisite courses, program type) are on the official calendar page below \u2014 that\u2019s the source we\u2019d use anyway.</p>' +
      '</div>' +
    '</div>';

  const html =
    badges +
    typeExplain +
    honest +
    '<a class="cta" href="' + esc(p.officialUrl) + '" target="_blank" rel="noopener noreferrer">Open official calendar page &nearr;</a>';

  return { title: p.name, color: "#7A3FA0", html: html };
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


/* ---- 화면: UofT 용어사전 ----
   공식 학사요람 용어사전(2026-27)을 쉬운 말로 다시 쓴 것.
   검색창에 치면 용어와 설명 양쪽에서 찾습니다. */
const GLOSSARY_CATS = [
  { id: "courses",  label: "Reading a course listing" },
  { id: "rules",    label: "Enrolment rules" },
  { id: "programs", label: "Programs" },
  { id: "records",  label: "Grades & your record" },
  { id: "systems",  label: "Websites you'll live on" }
];

function buildGlossaryScreen(term) {
  const q = (term || "").trim().toLowerCase();

  const hits = q
    ? GLOSSARY.filter(function (g) {
        return (g.term + " " + (g.abbr || "") + " " + g.def).toLowerCase().indexOf(q) !== -1;
      })
    : GLOSSARY;

  const searchHtml =
    '<div class="search program-search">' +
      '<label class="search__label" for="gloss-search">Find a term</label>' +
      '<input class="search__input" id="gloss-search" type="text" ' +
      'placeholder="Try \u201cPOSt\u201d or \u201cdrop\u201d" value="' + esc(term || "") + '" autocomplete="off">' +
    '</div>' +
    '<p class="count" style="border-top:0; padding-top:0;">' + hits.length + ' of ' + GLOSSARY.length + ' terms</p>';

  let body = "";
  GLOSSARY_CATS.forEach(function (cat) {
    const items = hits.filter(function (g) { return g.cat === cat.id; });
    if (!items.length) return;
    body +=
      '<h3 class="glossgroup">' + esc(cat.label) + '</h3>' +
      '<div class="glosslist">' +
        items.map(function (g) {
          return '<article class="glossrow">' +
                   '<h4 class="glossrow__term">' + esc(g.term) +
                     (g.abbr ? ' <span class="glossrow__abbr">' + esc(g.abbr) + '</span>' : '') +
                   '</h4>' +
                   '<p class="glossrow__def">' + esc(g.def) + '</p>' +
                 '</article>';
        }).join("") +
      '</div>';
  });

  if (!body) body = '<p class="empty">No terms match \u201c' + esc(term) + '\u201d</p>';

  const source =
    '<p class="glosssource">Definitions rewritten in plain language from the official ' +
    '<a href="https://artsci.calendar.utoronto.ca/glossary-terms" target="_blank" rel="noopener noreferrer">' +
    'Arts &amp; Science Glossary of Terms &nearr;</a> (2026-27 Calendar).</p>';

  return { title: "UofT Glossary", color: "#0E7C86", html: searchHtml + body + source };
}

document.addEventListener("input", function (e) {
  if (e.target.id !== "gloss-search") return;
  const caret = e.target.selectionStart;
  replaceCourseScreen(buildGlossaryScreen(e.target.value));
  const el = document.getElementById("gloss-search");
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

  /* 교양 과목 — 코드와 이름 둘 다 label 에 넣어서
     "CSC108" 로 검색해도, "psychology" 로 검색해도 걸리게 합니다 */
  if (typeof COURSE_CATALOG !== "undefined") {
    COURSE_CATALOG.forEach(function (co) {
      const cat = (typeof BREADTH_CATEGORIES !== "undefined")
        ? BREADTH_CATEGORIES.filter(function (c) { return c.id === co.category; })[0]
        : null;
      items.push({ kind: "Course", label: co.code + " \u00b7 " + co.name, sub: cat ? cat.name : "", id: co.id });
    });
  }

  /* 용어사전 — "POSt", "CR/NCR" 같은 걸 홈에서 바로 검색되게 */
  if (typeof GLOSSARY !== "undefined") {
    GLOSSARY.forEach(function (g) {
      items.push({ kind: "Term", label: g.term + (g.abbr ? " \u00b7 " + g.abbr : ""), sub: "Glossary", id: g.id, term: g.term });
    });
  }

  /* 편의시설 — "gym", "library" 같은 걸 홈에서 바로 검색되게.
     이름에 없는 단어(예: gym)로도 찾을 수 있도록 설명(note)을
     extra 필드에 넣어 검색 대상에만 포함시킵니다(화면에는 안 보임). */
  if (typeof FACILITIES !== "undefined") {
    FACILITIES.forEach(function (f) {
      items.push({ kind: "Facility", label: f.name, sub: f.address || "Campus Facilities", id: f.id, extra: f.note || "" });
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
    return (it.label + " " + (it.extra || "")).toLowerCase().indexOf(q) !== -1;
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
    courseReturnView = "fees";
    showView("fees");                // 뒤로가기가 자연스럽도록 카테고리 화면을 먼저 거칩니다
    renderFeesCategories();
    goToCourseScreen(buildProgramDetailScreen(id), true);

  } else if (kind === "Term") {
    const g = GLOSSARY.filter(function (x) { return x.id === id; })[0];
    if (!g) return;
    courseReturnView = "courses";
    showView("courses");
    goToCourseScreen(buildGlossaryScreen(g.term), true);   // 그 용어로 필터 미리 채워서 열기

  } else if (kind === "Facility") {
    openFacilityDetail(id);

  } else if (kind === "Course") {
    // 딥링크 라우터한테 맡깁니다 — 중간 화면 스택까지 알아서 쌓아줍니다
    location.hash = "courses/c/" + id;

  } else if (kind === "Listing") {
    const item = ALL_PROGRAMS_AZ.filter(function (p) { return p.id === id; })[0];
    if (!item) return;
    // 예전엔 여기서 외부 공식 페이지가 새 창으로 열렸는데,
    // 이제 우리 사이트 안 화면으로 갑니다 (상세 가이드가 있으면 그걸로)
    const matched = detailedProgramForAzName(item.name);
    courseReturnView = "fees";
    showView("fees");
    renderFeesCategories();
    if (matched) goToCourseScreen(buildProgramDetailScreen(matched.id), true);
    else goToCourseScreen(buildListingDetailScreen(item.id), true);
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




/* ---- 포인트 뱃지 첫 표시 ---- */
refreshPointsBadge();


/* ============================================
   Breadth Courses — 교양 학점 채울 과목 찾기 (Choosing a Program 과는 다름)
   ------------------------------------------------
   화면 1: 검색창 + 교양 카테고리 5개 (b1~b5, BREADTH_CATEGORIES 재사용)
   화면 2: 카테고리 안 과목 목록
   화면 3: 과목 상세 — 집계 지표 + 리뷰들(교수명 포함) + 리뷰 쓰기 폼
   ============================================ */

/* ---- 화면 1: 검색 + 교양 카테고리 + 주제 태그 ---- */
let courseTagFilter = "";   // 지금 고른 주제 태그. 빈 문자열이면 전체.

/* 태그마다 보여줄 이름과 아이콘. data.js 의 tags 값과 맞춰야 합니다. */
const COURSE_TAGS = [
  { id: "no-math",         label: "\uD83D\uDEAB\uD83D\uDD22 No math" },
  { id: "beginner",        label: "\uD83C\uDF31 Beginner-friendly" },
  { id: "first-year-only", label: "1\uFE0F\u20E3 First-years only" },
  { id: "seminar",         label: "\uD83D\uDCAC Small seminar" },
  { id: "hands-on",        label: "\uD83D\uDD27 Hands-on" },
  { id: "space",           label: "\uD83E\uDE90 Space" },
  { id: "writing",         label: "\u270D\uFE0F Writing" },
  { id: "creative",        label: "\uD83C\uDFA8 Creative" },
  { id: "data",            label: "\uD83D\uDCCA Data" },
  { id: "coding",          label: "\uD83D\uDCBB Coding" },
  { id: "psychology",      label: "\uD83E\uDDE0 Psychology" },
  { id: "philosophy",      label: "\uD83E\uDD14 Philosophy" },
  { id: "history",         label: "\uD83D\uDCDC History" },
  { id: "society",         label: "\uD83D\uDC65 Society" },
  { id: "media",           label: "\uD83D\uDCF1 Media" },
  { id: "literature",      label: "\uD83D\uDCD6 Literature" },
  { id: "art",             label: "\uD83D\uDDBC\uFE0F Art" },
  { id: "music",           label: "\uD83C\uDFB5 Music" },
  { id: "games",           label: "\uD83C\uDFAE Games" },
  { id: "biology",         label: "\uD83E\uDDEC Biology" },
  { id: "environment",     label: "\uD83C\uDF3F Environment" },
  { id: "health",          label: "\uD83C\uDFE5 Health" },
  { id: "business",        label: "\uD83D\uDCBC Business" },
  { id: "language",        label: "\uD83D\uDDE3\uFE0F Language" }
];

function buildCourseReviewHomeScreen(term) {
  const q = (term || "").trim().toLowerCase();

  /* 태그 필터가 걸려 있으면 그 태그를 가진 과목만 대상으로 삼습니다 */
  const pool = !courseTagFilter
    ? COURSE_CATALOG
    : courseTagFilter === "__noprereq"
      ? COURSE_CATALOG.filter(function (co) { return !co.prereq; })
      : COURSE_CATALOG.filter(function (co) { return (co.tags || []).indexOf(courseTagFilter) !== -1; });

  const cats = !q
    ? BREADTH_CATEGORIES
    : BREADTH_CATEGORIES.filter(function (c) {
        return c.name.toLowerCase().indexOf(q) !== -1 ||
               pool.some(function (co) { return co.category === c.id && (co.code.toLowerCase().indexOf(q) !== -1 || co.name.toLowerCase().indexOf(q) !== -1); });
      });

  const matches = q
    ? pool.filter(function (co) { return co.code.toLowerCase().indexOf(q) !== -1 || co.name.toLowerCase().indexOf(q) !== -1; })
    : [];

  const searchHtml =
    '<div class="search program-search">' +
      '<label class="search__label" for="course-review-search">Search</label>' +
      '<input class="search__input" id="course-review-search" type="text" ' +
      'placeholder="Course code or name" value="' + esc(term || "") + '" autocomplete="off">' +
    '</div>';

  /* 주제 태그 줄. 실제로 과목이 붙어있는 태그만 보여줍니다. */
  const availableTags = COURSE_TAGS.filter(function (t) {
    return COURSE_CATALOG.some(function (co) { return (co.tags || []).indexOf(t.id) !== -1; });
  });

  const tagBar =
    '<div class="tagfilter">' +
      '<button type="button" class="tagfilter__btn' + (courseTagFilter ? "" : " is-on") + '" data-course-tag="">All</button>' +
      '<button type="button" class="tagfilter__btn tagfilter__btn--open' + (courseTagFilter === "__noprereq" ? " is-on" : "") + '" data-course-tag="__noprereq">' +
        '\u2705 No prerequisites <span class="tagfilter__count">' +
        COURSE_CATALOG.filter(function (co) { return !co.prereq; }).length + '</span>' +
      '</button>' +
      availableTags.map(function (t) {
        const n = COURSE_CATALOG.filter(function (co) { return (co.tags || []).indexOf(t.id) !== -1; }).length;
        return '<button type="button" class="tagfilter__btn' + (courseTagFilter === t.id ? " is-on" : "") + '" data-course-tag="' + t.id + '">' +
                 t.label + ' <span class="tagfilter__count">' + n + '</span>' +
               '</button>';
      }).join("") +
    '</div>';

  const catCards = cats.length
    ? '<div class="halls">' +
        cats.map(function (c) {
          const n = pool.filter(function (co) { return co.category === c.id; }).length;
          return '<button type="button" class="hall hall--clickable" data-open-course-cat="' + c.id + '" style="--cat-color:' + c.color + '">' +
                   '<h4 class="hall__name">' + c.icon + ' ' + esc(c.name) + '</h4>' +
                   '<p class="hall__tags">' + n + (n === 1 ? " course" : " courses") + '</p>' +
                 '</button>';
        }).join("") +
      '</div>'
    : '<p class="empty">No matches for \u201c' + esc(term) + '\u201d</p>';

  const matchHtml = matches.length
    ? '<h3 class="block__head" style="margin: 20px 0 12px;">Matching courses</h3>' +
      '<div class="halls">' +
        matches.map(function (co) {
          const cat = BREADTH_CATEGORIES.filter(function (c) { return c.id === co.category; })[0];
          return '<button type="button" class="hall hall--clickable" data-open-course="' + co.id + '" style="--cat-color:' + (cat ? cat.color : "#0B4DA0") + '">' +
                   '<h4 class="hall__name">' + esc(co.code) + '</h4>' +
                   '<p class="hall__tags">' + esc(co.name) + '</p>' +
                 '</button>';
        }).join("") +
      '</div>'
    : "";

  return {
    title: "Breadth Courses",
    color: "#C05A16",
    html: '<ul class="lede">' +
            '<li>Pick a category below, then browse courses that count toward it.</li>' +
            '<li>Only courses open to students outside that subject \u2014 program prerequisites are left out.</li>' +
            '<li>Already took one? Leave a review so the next student knows what to expect.</li>' +
          '</ul>' +
          searchHtml + tagBar + catCards + matchHtml +
          '<p class="blocknote">\uD83D\uDCA1 marks courses that U of T\u2019s own student advice service (askastudent) flags as accessible for students outside that subject. ' +
          'Not every course has one \u2014 that just means we haven\u2019t found a solid recommendation, not that it\u2019s hard.</p>'
  };
}

/* 태그 버튼 클릭 */
document.addEventListener("click", function (e) {
  const btn = e.target.closest("[data-course-tag]");
  if (!btn) return;
  courseTagFilter = btn.dataset.courseTag;
  const input = document.getElementById("course-review-search");
  replaceCourseScreen(buildCourseReviewHomeScreen(input ? input.value : ""));
});

document.addEventListener("input", function (e) {
  if (e.target.id !== "course-review-search") return;
  const caret = e.target.selectionStart;
  replaceCourseScreen(buildCourseReviewHomeScreen(e.target.value));
  const el = document.getElementById("course-review-search");
  if (el) { el.focus(); el.setSelectionRange(caret, caret); }
});


/* ---- 화면 2: 카테고리 안 과목 목록 ---- */
function buildCourseListScreen(catId) {
  const cat = BREADTH_CATEGORIES.filter(function (c) { return c.id === catId; })[0];
  let courses = COURSE_CATALOG.filter(function (co) { return co.category === catId; });

  // 홈에서 주제 태그를 골라놨으면 여기서도 그대로 적용합니다
  if (courseTagFilter === "__noprereq") {
    courses = courses.filter(function (co) { return !co.prereq; });
  } else if (courseTagFilter) {
    courses = courses.filter(function (co) { return (co.tags || []).indexOf(courseTagFilter) !== -1; });
  }

  const list = courses.length
    ? '<div class="halls">' +
        courses.map(function (co) {
          const n = co.reviews.length;
          return '<button type="button" class="hall hall--clickable" data-open-course="' + co.id + '" style="--cat-color:' + (cat ? cat.color : "#0B4DA0") + '">' +
                   '<h4 class="hall__name">' + esc(co.code) + ' \u2014 ' + esc(co.name) + '</h4>' +
                   (co.desc ? '<p class="hall__rooms">' + esc(co.desc) + '</p>' : "") +
                   (co.prereq
                     ? '<p class="prereq">\uD83D\uDD10 Needs first: ' + esc(co.prereq) + '</p>'
                     : '<p class="prereq prereq--open">\u2705 Open to everyone \u2014 no prerequisites</p>') +
                   (co.note ? '<p class="coursenote">\uD83D\uDCA1 ' + esc(co.note) + '</p>' : "") +
                   '<p class="hall__tags">' + (n ? n + (n === 1 ? " review" : " reviews") : "No reviews yet") + '</p>' +
                 '</button>';
        }).join("") +
      '</div>'
    : '<p class="empty">No courses here' + (courseTagFilter ? " with that tag" : "") + ' yet.</p>';

  return { title: cat ? cat.name : "Category", color: cat ? cat.color : "#0B4DA0", html: list };
}


/* ---- 화면 3: 과목 상세 — 집계 지표 + 리뷰 + 작성 폼 ---- */
function buildCourseDetailScreen(courseId) {
  const co = COURSE_CATALOG.filter(function (c) { return c.id === courseId; })[0];
  if (!co) return { title: "Not found", color: "#C05A16", html: '<p class="empty">That course isn\u2019t in data.js</p>' };

  const cat = BREADTH_CATEGORIES.filter(function (c) { return c.id === co.category; })[0];
  const reviews = co.reviews || [];

  let summaryHtml = "";
  if (reviews.length) {
    const avg = reviews.reduce(function (s, r) { return s + (r.stars || 0); }, 0) / reviews.length;

    const dims = [
      { key: "workload", label: "Workload", choices: ["Light", "Moderate", "Heavy"], colors: ["#0F7A4D", "#0B4DA0", "#C05A16"] },
      { key: "difficulty", label: "Difficulty", choices: ["Easy", "Medium", "Hard"], colors: ["#0F7A4D", "#0B4DA0", "#C05A16"] }
    ];
    const tagBars = dims.map(function (def) {
      const vals = reviews.filter(function (r) { return r.tags && r.tags[def.key] !== undefined; }).map(function (r) { return r.tags[def.key]; });
      if (!vals.length) return "";
      const idx = Math.max(0, Math.min(2, Math.round(vals.reduce(function (a, b) { return a + b; }, 0) / vals.length)));
      return '<div class="tagbar"><span class="tagbar__label">' + esc(def.label) + '</span>' +
             '<span class="tagbar__value" style="background:' + def.colors[idx] + '">' + esc(def.choices[idx]) + '</span></div>';
    }).filter(Boolean).join("");

    summaryHtml =
      '<div class="review__avg">' +
        '<span class="review__avgnum">' + avg.toFixed(1) + '</span>' +
        '<span class="review__avgstars">' + '★★★★★'.slice(0, Math.round(avg)) + '</span>' +
        '<span class="review__avgcount">' + reviews.length + (reviews.length === 1 ? " review" : " reviews") + '</span>' +
      '</div>' +
      (tagBars ? '<div class="tagbars">' + tagBars + '</div>' : "");
  }

  const reviewCards = reviews.length
    ? '<div class="reviews">' +
        reviews.map(function (r, i) {
          const stars = Math.max(0, Math.min(5, Math.round(r.stars || 0)));
          const reviewId = co.id + "-r" + i;
          const helpfulCount = getHelpfulCount(reviewId);
          const iVoted = hasVotedHelpful(reviewId);
          return '<article class="review">' +
                   '<p class="review__prof">\uD83D\uDC64 ' + esc(r.professor || "Professor not given") + '</p>' +
                   '<div class="review__stars" aria-label="' + stars + ' out of 5 stars">' +
                     '★★★★★'.slice(0, stars) + '☆☆☆☆☆'.slice(0, 5 - stars) +
                   '</div>' +
                   '<p class="review__text">' + esc(r.text) + '</p>' +
                   (r.source ? '<p class="credit">' + esc(r.source) + '</p>' : "") +
                   '<button type="button" class="helpfulbtn' + (iVoted ? " is-on" : "") + '" data-helpful-id="' + esc(reviewId) + '" ' + (iVoted ? "disabled" : "") + '>' +
                     '\uD83D\uDC4D Helpful' + (helpfulCount > 0 ? ' <span class="helpfulbtn__count">' + helpfulCount + '</span>' : "") +
                   '</button>' +
                 '</article>';
        }).join("") +
      '</div>'
    : '<p class="empty empty--small">No reviews yet. Be the first.</p>';

  const formHtml =
    '<form class="reviewform" data-course-review-form data-course-code="' + esc(co.code) + '" style="margin-top:20px;">' +
      '<p class="reviewform__label">Write a review</p>' +
      '<div class="starpicker" data-starpicker>' +
        [1, 2, 3, 4, 5].map(function (n) { return '<button type="button" class="starpicker__btn" data-star="' + n + '" aria-label="' + n + ' stars">☆</button>'; }).join("") +
      '</div>' +
      '<input class="reviewform__name" data-course-prof type="text" placeholder="Professor\u2019s name" required>' +
      buildTagPicker("workload", "Workload", ["Light", "Moderate", "Heavy"]) +
      buildTagPicker("difficulty", "Difficulty", ["Easy", "Medium", "Hard"]) +
      '<textarea class="reviewform__text" data-review-text rows="3" placeholder="How was the course? Assignments, exams, lecture style\u2026" required></textarea>' +
      '<input class="reviewform__name" data-review-name type="text" placeholder="Your name or \'Anonymous\'">' +
      '<button type="submit" class="reviewform__submit">Send review</button>' +
      '<p class="reviewform__note">Opens your email app. We read every submission and add it to the site.</p>' +
    '</form>';

  const topicsHtml = (co.topics && co.topics.length)
    ? '<h3 class="block__head" style="margin: 18px 0 8px;">What it covers</h3>' +
      '<ul class="lede">' + co.topics.map(function (t) { return '<li>' + esc(t) + '</li>'; }).join("") + '</ul>'
    : "";

  const tagsHtml = (co.tags && co.tags.length)
    ? '<div class="credbadges" style="margin-bottom:12px;">' +
        co.tags.map(function (t) {
          const def = COURSE_TAGS.filter(function (x) { return x.id === t; })[0];
          return '<span class="credbadge">' + (def ? def.label : esc(t)) + '</span>';
        }).join("") +
      '</div>'
    : "";

  const prereqHtml = co.prereq
    ? '<div class="prereqbox"><p class="prereqbox__label">\uD83D\uDD10 Prerequisites</p><p class="prereqbox__text">' + esc(co.prereq) + '</p></div>'
    : '<div class="prereqbox prereqbox--open"><p class="prereqbox__label">\u2705 Open to everyone</p><p class="prereqbox__text">No prerequisites listed \u2014 anyone can enrol.</p></div>';

  const html =
    '<p class="hall__tags" style="margin-bottom:10px;">' + esc(co.name) + '</p>' +
    tagsHtml +
    (co.desc ? '<p class="tl-text" style="margin-bottom:14px;">' + esc(co.desc) + '</p>' : "") +
    prereqHtml +
    (co.note ? '<p class="coursenote coursenote--big">\uD83D\uDCA1 ' + esc(co.note) + '</p>' : "") +
    topicsHtml +
    '<a class="tl-link" href="https://artsci.calendar.utoronto.ca/course/' + esc(co.code) + '" target="_blank" rel="noopener noreferrer" style="display:inline-block; margin:14px 0 20px;">Official calendar entry &nearr;</a>' +
    summaryHtml + reviewCards + formHtml;

  return { title: co.code, color: cat ? cat.color : "#0B4DA0", html: html };
}


/* ---- 클릭 위임: 카테고리 → 과목목록 → 과목상세 ---- */
document.addEventListener("click", function (e) {
  const catBtn = e.target.closest("[data-open-course-cat]");
  if (catBtn) {
    goToCourseScreen(buildCourseListScreen(catBtn.dataset.openCourseCat), false);
    return;
  }
  const courseBtn = e.target.closest("[data-open-course]");
  if (courseBtn) {
    goToCourseScreen(buildCourseDetailScreen(courseBtn.dataset.openCourse), false);
  }
});


/* ---- 과목 리뷰 제출 ---- */
document.addEventListener("submit", function (e) {
  const form = e.target.closest("[data-course-review-form]");
  if (!form) return;
  e.preventDefault();

  const stars = Number(form.querySelector("[data-starpicker]").dataset.value || 0);
  const professor = form.querySelector("[data-course-prof]").value.trim();
  const text = form.querySelector("[data-review-text]").value.trim();
  const name = form.querySelector("[data-review-name]").value.trim() || "Anonymous";
  const code = form.dataset.courseCode;

  if (!stars) { showToast("Pick a star rating first"); return; }
  if (!professor) { showToast("Add the professor's name"); return; }
  if (!text) { showToast("Write a few words first"); return; }

  const tagLines = [];
  form.querySelectorAll("[data-tagpicker]").forEach(function (picker) {
    if (picker.dataset.value === undefined) return;
    tagLines.push(picker.dataset.tagpicker + ": " + picker.dataset.value);
  });

  const subject = "Course review: " + code;
  const body =
    "Course: " + code + "\n" +
    "Professor: " + professor + "\n" +
    "Stars: " + stars + " / 5\n" +
    (tagLines.length ? tagLines.join("\n") + "\n" : "") +
    "Name: " + name + "\n\n" +
    text;

  window.location.href = "mailto:" + ADMIN_EMAIL + "?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(body);

  const earned = addPoints(2);
  showToast("Opening your email app\u2026 +2 points (you have " + earned + ")");
});


/* ---- 화면마다 주소 꼬리표(route) 달기 ----
   각 build 함수가 만든 화면 객체에 route 를 붙여서,
   goToCourseScreen 이 주소창을 그 값으로 바꿀 수 있게 합니다.
   이 꼬리표 덕분에 (1) 과목/프로그램 링크를 복사해 공유할 수 있고
   (2) 브라우저 뒤로가기가 화면 단위로 정확하게 움직입니다. */
function tagScreenRoute(buildFn, makeRoute) {
  return function () {
    const screen = buildFn.apply(null, arguments);
    if (screen) screen.route = makeRoute.apply(null, arguments);
    return screen;
  };
}

buildEnrolScreen            = tagScreenRoute(buildEnrolScreen,            function () { return "courses/enrol"; });
buildDegreeScreen           = tagScreenRoute(buildDegreeScreen,           function () { return "courses/degree"; });
buildCourseReviewHomeScreen = tagScreenRoute(buildCourseReviewHomeScreen, function () { return "courses/breadth"; });
buildCourseListScreen       = tagScreenRoute(buildCourseListScreen,       function (catId) { return "courses/breadth/" + catId; });
buildCourseDetailScreen     = tagScreenRoute(buildCourseDetailScreen,     function (id) { return "courses/c/" + id; });
buildProgramHomeScreen      = tagScreenRoute(buildProgramHomeScreen,      function () { return "undergraduate/programs"; });
buildAzScreen               = tagScreenRoute(buildAzScreen,               function () { return "undergraduate/programs/az"; });
buildCategoryDeptScreen     = tagScreenRoute(buildCategoryDeptScreen,     function (catId) { return "undergraduate/programs/cat/" + catId; });
buildProgramDetailScreen    = tagScreenRoute(buildProgramDetailScreen,    function (id) { return "undergraduate/programs/p/" + id; });
buildListingDetailScreen    = tagScreenRoute(buildListingDetailScreen,    function (id) { return "undergraduate/programs/list/" + id; });
buildGlossaryScreen         = tagScreenRoute(buildGlossaryScreen,         function () { return "courses/glossary"; });


/* ---- 링크 복사 버튼 ----
   지금 보고 있는 화면의 주소(해시 포함)를 클립보드에 복사합니다.
   화면마다 고유 주소가 있어서(위 라우팅 참고) 그대로 공유하면 됩니다. */
document.addEventListener("click", function (e) {
  const btn = e.target.closest("[data-copy-link]");
  if (!btn) return;

  const url = location.href;

  function done() { showToast("Link copied \u2014 paste it anywhere"); }
  function fail() { showToast("Couldn't copy \u2014 copy the address bar instead"); }

  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(url).then(done, function () {
      // 클립보드 권한이 막힌 환경용 예비 방법
      try {
        const ta = document.createElement("textarea");
        ta.value = url;
        ta.style.position = "fixed";
        ta.style.opacity = "0";
        document.body.appendChild(ta);
        ta.select();
        document.execCommand("copy");
        document.body.removeChild(ta);
        done();
      } catch (err) { fail(); }
    });
  } else {
    try {
      const ta = document.createElement("textarea");
      ta.value = url;
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
      done();
    } catch (err) { fail(); }
  }
});


/* ---- 페이지를 처음 열 때, 주소에 해시가 있으면(공유된 링크 등) 그 화면부터 보여줍니다 ---- */
routeFromHash();
