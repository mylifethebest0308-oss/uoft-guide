/* ============================================
   UofT Guide — 동작 (4-A 단계)

   지금 이 파일이 하는 일은 딱 하나입니다:
   섹션 줄을 누르면 알림창을 띄운다.

   4-B 단계에서 Residence 를 누르면 기숙사 목록으로
   넘어가도록 이 파일을 고칠 예정입니다.
   ============================================ */


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
  detail: document.getElementById("view-detail")     // ← 4-C 에서 추가
};

function showView(name) {
  // 일단 전부 숨기고
  Object.values(views).forEach(function (el) {
    if (el) el.hidden = true;
  });

  // 요청받은 것 하나만 꺼냅니다
  if (views[name]) views[name].hidden = false;

  // 화면 맨 위로 올려줍니다 (안 하면 스크롤이 중간에 걸려 있습니다)
  window.scrollTo(0, 0);
}


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

function buildMetaLine(item) {
  const parts = [];

  // 가격이 범위면 카드에서는 "from $21,933" 처럼 낮은 쪽만 보여줍니다.
  // (카드가 너무 길어지지 않게. 전체 범위는 상세 화면에 나옵니다.)
  if (item.price) {
    parts.push(item.priceMax ? "from " + formatPrice(item.price) : formatPrice(item.price));
  }

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

  return '' +
    '<button type="button" class="card" data-id="' + esc(item.id) + '">' +
      '<span class="card__photo' + emptyClass + '">' + photo + '</span>' +
      '<span class="card__body">' +
        '<span class="card__name">' + esc(item.name) + '</span>' +
        '<span class="card__cue">&rarr;</span>' +
        '<span class="card__meta">' + esc(buildMetaLine(item)) + '</span>' +
        (item.address
          ? '<span class="card__addr">' + esc(item.address) + '</span>'
          : "") +
      '</span>' +
    '</button>';
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

  // 카드들을 만들어서 한 번에 넣습니다
  listBox.innerHTML = RESIDENCES.map(buildCard).join("");

  // 개수 표시. 1개일 때는 residence, 여러 개면 residences
  if (countBox) {
    countBox.textContent =
      RESIDENCES.length + (RESIDENCES.length === 1 ? " residence" : " residences");
  }

  // 카드를 눌렀을 때 상세 화면으로
  listBox.querySelectorAll(".card").forEach(function (card) {
    card.addEventListener("click", function () {
      openDetail(card.dataset.id);      // ← 4-C 에서 바뀐 부분
    });
  });
}


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

  if (item.roomType) rows.push(["Room type", item.roomType]);

  if (item.mealPlan) {
    const mealText = item.mealPlan === "None" ? "Not offered" : item.mealPlan;
    rows.push(["Meal plan", mealText]);
  }

  if (item.capacity) rows.push(["Capacity", "about " + item.capacity.toLocaleString("en-US") + " students"]);
  if (item.college) rows.push(["Open to", item.college === "Any" ? "Any college" : item.college]);
  if (item.address) rows.push(["Address", item.address]);

  if (rows.length === 0) return "";

  const lines = rows.map(function (r) {
    return '<li class="fact">' +
             '<span class="fact__label">' + esc(r[0]) + '</span>' +
             '<span class="fact__value">' + esc(r[1]) + '</span>' +
           '</li>';
  }).join("");

  return '<ul class="facts">' + lines + '</ul>';
}


/* ---- 상세 화면 내용 만들기 ---- */

function buildDetail(item) {
  const html = [];

  /* 1. 제목 */
  html.push('<h2 class="page-title">' + esc(item.name) + '</h2>');

  if (item.summary) {
    html.push('<p class="lede">' + esc(item.summary) + '</p>');
  }

  /* 2. 영상 — videoUrl 이 비어 있으면 이 부분 전체가 안 나옴 */
  const embed = youtubeEmbed(item.videoUrl);
  if (embed) {
    html.push(
      '<div class="media">' +
        '<div class="video">' +
          '<iframe src="' + esc(embed) + '" title="' + esc(item.name) + ' video" ' +
          'frameborder="0" allowfullscreen ' +
          'allow="accelerometer; encrypted-media; gyroscope; picture-in-picture"></iframe>' +
        '</div>' +
        (item.videoCredit
          ? '<p class="credit">' + esc(item.videoCredit) + '</p>'
          : "") +
      '</div>'
    );
  }

  /* 3. 사진 — 대표 사진 + 추가 사진들 */
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
    html.push('<div class="strip">' + imgs + '</div>');
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

  /* 6. 학생 의견 — 없으면 이 부분 전체가 안 나옴 */
  const notes = Array.isArray(item.studentNote)
    ? item.studentNote.filter(function (n) { return n; })
    : (item.studentNote ? [item.studentNote] : []);

  if (notes.length > 0) {
    const lines = notes.map(function (n) {
      return '<li>' + esc(n) + '</li>';
    }).join("");

    html.push(
      '<section class="block block--student">' +
        '<h3 class="block__head">Student notes</h3>' +
        '<ul class="notes">' + lines + '</ul>' +
        (item.noteSource
          ? '<p class="credit">Source: ' + esc(item.noteSource) + '</p>'
          : "") +
      '</section>'
    );
  }

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
  showView("detail");
}
