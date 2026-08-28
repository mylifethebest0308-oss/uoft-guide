/* ============================================
   UofT Guide — 기숙사 정보 (St. George 캠퍼스)

   ★ 앞으로 정보를 고칠 때는 이 파일만 열면 됩니다.

   출처 (전부 University of Toronto 공식)
     요금·밀플랜 : studentlife.utoronto.ca/task/compare-u-of-t-residence-fees/
     겨울방학    : studentlife.utoronto.ca/task/winter-break-housing-options/
                   + 각 기숙사 FAQ (Trinity 는 유료 체류 가능)
     사진·설명   : future.utoronto.ca/housing
   확인일: 2026-08-24
   요금 기준: 2026-27 학년도 (9월~4월)

   ⚠️ 요금은 매년 5월쯤 갱신됩니다.
      1년에 두 번쯤 위 페이지를 열어 확인하고 lastChecked 를 고치세요.
   ⚠️ 겨울방학 날짜는 학교가 발표한 가장 최근 연도(2025-26) 기준입니다.
   ============================================ */


/* ---- 각 칸에 무엇을 넣는지 ----------------------------------
   id, name, price(필수)     : 이름표 / 이름 / 가격 낮은 쪽
   priceMax                  : 가격 높은 쪽. 하나뿐이면 null
   priceUnit                 : 기간 단위. 비우면 "per academic year"
   priceNote                 : 이 가격에 밥값이 포함인지 등 한 줄 설명
   roomType, mealPlan        : 방 형태 / Included·Optional·None
   college, capacity, address
   winterBreak               : 겨울방학에 문을 여는지 닫는지 (한 줄)
   winterBreakDetail         : 머물려면 어떻게 해야 하는지, 돈이 드는지
   winterBreakClosed         : true 면 방학에 방을 비워야 함
   winterBreakCost           : "paid"    돈을 내야 머물 수 있음 (확인됨)
                               "free"    추가 비용 없음 (확인됨)
                               "none"    머물 방법이 없음
                               "unknown" 학교가 공개 안 함 → 문의 안내가 뜸
   roomOptions               : [{ label:"방 종류", price:숫자, unit:"/month" }]
   mealPlans                 : 밀플랜 목록. 아는 만큼만 채우면 됩니다.
                               [{ label:"플랜 이름",
                                  price:숫자,            // 따로 내는 금액. 방값에 포함이면 비움
                                  priceLabel:"금액 옆 설명",
                                  bullets:["점 찍어서 보여줄 내용", ...],
                                  note:"아래 기울임체로 붙는 한 줄" }]
   mealNote                  : 밀플랜 관련 설명 한 줄
   halls                     : 건물이 여러 채인 경우 각각의 설명.
                               [{ name, built, capacity, rooms, note }]
                               비워두면 이 구역이 안 나옵니다
   mealSystem                : 밀플랜이 어떤 방식인지 설명 (한두 문장)
   floorPhotos               : 직접 찍은 층별 방 사진.
                               [{ floor:"3F", caption:"설명", url:"사진주소" }]
                               비워두면 "곧 올라올 자리" 안내가 나옵니다
   summary, photoUrl, morePhotos, officialUrl
   videoUrl, videoCredit, studentNote, noteSource, lastChecked(필수)

   ---- 규칙 3가지 ----
   1. 줄 끝 쉼표(,) 빠뜨리지 말 것
   2. 글자는 따옴표 "" 로. 숫자는 감싸지 말 것
   3. { } 와 [ ] 는 짝이 맞아야 함
------------------------------------------------------------- */


const RESIDENCES = [

  {
    id: "innis",
    name: "Innis College",
    price: 9000,
    priceMax: 17500,
    priceUnit: "",
    priceNote: "Room only — no meal plan included",
    roomType: "Apartment",
    mealPlan: "Optional",
    college: "Innis College students",
    capacity: null,
    address: "111 St. George St",
    winterBreak: "Stays open",
    winterBreakDetail: "The building stays open, but you must apply through the U of T Residence Portal. U of T does not publish whether a fee applies here — ask Innis directly.",
    winterBreakClosed: false,
    winterBreakCost: "unknown",
    roomOptions: [
      { label: "Double bedroom", price: 9000 },
      { label: "Standard single bedroom", price: 14054 },
      { label: "Premium single bedroom", price: 17500 }
    ],
    mealPlans: [],
    mealNote: "Every suite has a full kitchen, so no meal plan is required. Optional campus plans can be bought separately through U of T Food Services.",
    summary: "Apartment-style living across the street from Innis College. Each unit gives you a private bedroom, with four or five people sharing a kitchen, living room and two bathrooms. The cheapest option on campus, but the price does not include food.",
    photoUrl: "https://future.utoronto.ca/sites/default/files/styles/landscape_3_2_1200/public/2025-02/photo-innis-exterior.jpg?itok=5mw9FGqe",
    morePhotos: [
      "https://future.utoronto.ca/sites/default/files/styles/landscape_3_2_1200/public/2025-02/photo-innis-bedroom.jpg?itok=dMjxu26H",
      "https://future.utoronto.ca/sites/default/files/styles/landscape_3_2_1200/public/2025-02/photo-innis-common-area.jpg?itok=0IgVMlEQ"
    ],
    floorPhotos: [],
    officialUrl: "https://innis.utoronto.ca/residence/about-the-residence/",
    videoUrl: "https://www.youtube.com/watch?v=fpxObSIGwdI",
    videoCredit: "U of T Faculty of Arts & Science — official college tour",
    reviews: [],
    lastChecked: "2026-08-24"
  },

  {
    id: "woodsworth",
    name: "Woodsworth College",
    price: 14615,
    priceMax: null,
    priceUnit: "",
    priceNote: "Room only — no meal plan included",
    roomType: "Apartment",
    mealPlan: "Optional",
    college: "Woodsworth College students",
    capacity: null,
    address: "321 Bloor St W",
    winterBreak: "Closed — you have to move out",
    winterBreakDetail: "U of T lists no option to stay through the break here. If you cannot leave Toronto, contact Woodsworth directly and ask about exceptions before you accept an offer.",
    winterBreakClosed: true,
    winterBreakCost: "none",
    roomOptions: [
      { label: "Room fee (all rooms)", price: 14615 }
    ],
    mealPlans: [],
    mealNote: "Suites have full kitchens, so no meal plan is required. Optional campus plans can be bought separately through U of T Food Services.",
    summary: "Apartment-style residence sitting between the Annex and Yorkville, close to gyms, libraries, museums, restaurants and grocery stores. No meal plan is required, which keeps the fee low, but you will be cooking for yourself — and you have to move out over winter break.",
    photoUrl: "https://future.utoronto.ca/sites/default/files/styles/landscape_3_2_1200/public/2025-02/photo-woodsworth-exterior.jpg?itok=YOMtRIPy",
    morePhotos: [
      "https://future.utoronto.ca/sites/default/files/styles/landscape_3_2_1200/public/2025-02/photo-woodsworth-bedroom.jpg?itok=rXuFTG7R",
      "https://future.utoronto.ca/sites/default/files/styles/landscape_3_2_1200/public/2025-02/photo-woodsworth-common-area.jpg?itok=tencykHe"
    ],
    floorPhotos: [],
    officialUrl: "https://wdw.utoronto.ca/life-in-residence",
    videoUrl: "https://www.youtube.com/watch?v=a-W9mWSSbzs",
    videoCredit: "U of T Faculty of Arts & Science — official college tour",
    reviews: [],
    lastChecked: "2026-08-24"
  },

  {
    id: "new-college",
    name: "New College",
    price: 14965,
    priceMax: 20770,
    priceUnit: "",
    priceNote: "Meal plan included in every price below",
    roomType: "Traditional dormitory",
    mealPlan: "Included",
    college: "New College students",
    capacity: null,
    address: "300 Huron St",
    winterBreak: "Closed — but you can pay to stay",
    winterBreakDetail: "New College closes the building and charges a per-night fee for any partial or full stay over the break. You apply in advance and the college emails the fee amounts to residents around mid-October. Note that U of T's central housing page lists New College as simply open, but the college's own page is the one to trust.",
    winterBreakClosed: true,
    winterBreakCost: "paid",
    roomOptions: [
      { label: "Economy double + Access 10", price: 14965 },
      { label: "Economy double + Access 14", price: 15465 },
      { label: "Economy double + Unlimited", price: 16015 },
      { label: "Double + Access 10", price: 17520 },
      { label: "Double + Access 14", price: 18020 },
      { label: "Double + Unlimited", price: 18570 },
      { label: "Single + Access 10", price: 19720 },
      { label: "Single + Access 14", price: 20220 },
      { label: "Single + Unlimited", price: 20770 }
    ],
    mealPlans: [],
    mealNote: "Meal plan is mandatory and already built into each price above. Three tiers: Access 10, Access 14 and Unlimited. The economy double has a bed over the desk, which is why it costs less.",
    summary: "Dormitory-style residence with three room types: single, double, and a cheaper economy double where the bed sits above the desk. The wide price range comes from that choice, so which room you pick matters a lot here. The building closes over winter break and charges by the night if you need to stay.",
    photoUrl: "https://future.utoronto.ca/sites/default/files/styles/landscape_3_2_1200/public/2025-02/photo-new-college-exterior.webp?itok=PXnPiRLh",
    morePhotos: [
      "https://future.utoronto.ca/sites/default/files/styles/landscape_3_2_1200/public/2025-02/photo-new-college-bedroom.webp?itok=YUSSqi8Q"
    ],
    floorPhotos: [],
    officialUrl: "https://www.newcollege.utoronto.ca/student-experience/living-in-residence/",
    videoUrl: "https://www.youtube.com/watch?v=LGi9VvtJnPw",
    videoCredit: "U of T Faculty of Arts & Science — official college tour",
    reviews: [],
    lastChecked: "2026-08-24"
  },

  {
    id: "victoria",
    name: "Victoria College",
    price: 15800,
    priceMax: 23819,
    priceUnit: "",
    priceNote: "Room fee plus a mandatory meal plan — see both lists below",
    roomType: "Traditional dormitory / Apartment",
    mealPlan: "Included",
    college: "Victoria College students",
    capacity: null,
    address: "73 Queen's Park Cres",
    winterBreak: "Stays open",
    winterBreakDetail: "Stays open and no application is needed, which makes it one of the easiest residences to stay in over the break. U of T does not publish a fee for this — contact vic.dean@utoronto.ca to confirm.",
    winterBreakClosed: false,
    winterBreakCost: "unknown",
    roomOptions: [
      { label: "Annesley — Economy loft triple", price: 10378 },
      { label: "Annesley — Economy loft double", price: 11528 },
      { label: "Annesley — Double", price: 12365 },
      { label: "Annesley — Single", price: 13327 },
      { label: "Annesley — Super single", price: 14390 },
      { label: "Margaret Addison — Triple", price: 10378 },
      { label: "Margaret Addison — Double", price: 12365 },
      { label: "Margaret Addison — Single", price: 13327 },
      { label: "Margaret Addison — Double w/ bath", price: 13514 },
      { label: "Margaret Addison — Single w/ bath", price: 14470 },
      { label: "Upper Burwash — Economy loft double", price: 11528 },
      { label: "Upper Burwash — Double", price: 12365 },
      { label: "Upper Burwash — Double w/ shared bath", price: 12720 },
      { label: "Upper Burwash — Single", price: 13327 },
      { label: "Upper Burwash — Single w/ shared bath", price: 13685 },
      { label: "Lower Burwash — Triple", price: 10378 },
      { label: "Lower Burwash — Double", price: 13079 },
      { label: "Lower Burwash — Single, no bed alcove", price: 14718 },
      { label: "Lower Burwash — Single w/ bed alcove", price: 15839 },
      { label: "Lower Burwash — Super single", price: 17094 },
      { label: "Rowell Jackman — Double", price: 12720 },
      { label: "Rowell Jackman — Double w/ 2p bath", price: 13079 },
      { label: "Rowell Jackman — Single", price: 14577 },
      { label: "Rowell Jackman — Super single", price: 15733 },
      { label: "Rowell Jackman — Super single w/ bath", price: 16016 }
    ],
    mealPlans: [
      { label: "Meal Plan A", price: 6380, bullets: [], note: "" },
      { label: "Meal Plan B", price: 7042, bullets: [], note: "" },
      { label: "Meal Plan C", price: 5551, bullets: [], note: "Upper-year students only — not available to first-years" }
    ],
    mealNote: "Meal plan is mandatory. Add one of the plans below to your room fee to get your real total. Plan C is only open to upper-year students, so first-years choose between A and B.",
    mealSystem: "",
    halls: [
      { name: "Annesley Hall", built: "", capacity: "", rooms: "Singles, doubles, super singles, economy loft doubles and triples", note: "Holds some of the cheapest rooms at Vic through the economy loft options." },
      { name: "Margaret Addison Hall", built: "", capacity: "", rooms: "Singles, doubles and triples, some with private bathrooms", note: "The only hall where you can add a private bathroom to your room for about $1,150 more." },
      { name: "Upper Burwash Hall", built: "", capacity: "", rooms: "Singles and doubles, some with shared bathrooms", note: "Prices sit close to Annesley." },
      { name: "Lower Burwash Hall", built: "", capacity: "", rooms: "Singles with or without a bed alcove, doubles, triples, super singles", note: "The most expensive rooms at Vic are here — the super single runs $17,094 before meals." },
      { name: "Rowell Jackman Hall", built: "", capacity: "", rooms: "Singles, doubles and super singles", note: "Generally pricier than Annesley or Upper Burwash for the same room type." }
    ],
    summary: "Five residence buildings housing a mix of first-year and upper-year students, in a college community of around 3,500 people from more than 50 countries. Far more room types than anywhere else on campus, so the price you pay depends heavily on which hall and room you land in.",
    photoUrl: "https://future.utoronto.ca/sites/default/files/styles/landscape_3_2_1200/public/2025-02/photo-vic-common-area.jpg?itok=oyoBGYJH",
    morePhotos: [],
    floorPhotos: [],
    officialUrl: "https://www.vic.utoronto.ca/current-students/campus-life/residence-life",
    videoUrl: "https://www.youtube.com/watch?v=HLMOF_WC-qQ",
    videoCredit: "U of T Faculty of Arts & Science — official college tour",
    reviews: [],
    lastChecked: "2026-08-24"
  },

  {
    id: "university-college",
    name: "University College",
    price: 16548,
    priceMax: 21236,
    priceUnit: "",
    priceNote: "Meal plan included in every price below",
    roomType: "Traditional dormitory",
    mealPlan: "Included",
    college: "University College students",
    capacity: null,
    address: "15 King's College Cir",
    winterBreak: "Stays open",
    winterBreakDetail: "The building stays open, but you must apply and UC emails the details to residents. U of T does not publish whether a fee applies here, and several other residences do charge, so ask UC directly before you count on staying for free.",
    winterBreakClosed: false,
    winterBreakCost: "unknown",
    roomOptions: [
      { label: "Whitney — Double + Plan B", price: 16548 },
      { label: "Whitney — Double + Plan A", price: 17361 },
      { label: "Whitney / Sir Daniel Wilson — Single + Plan B", price: 18591 },
      { label: "Whitney / Sir Daniel Wilson — Single + Plan A", price: 19404 },
      { label: "Morrison — Single + Plan B", price: 20423 },
      { label: "Morrison — Single + Plan A", price: 21236 }
    ],
    mealPlans: [
      {
        label: "Meal Plan A — LARGE",
        price: null,
        priceLabel: "",
        bullets: [
          "Starting balance of $6,923 meal dollars",
          "Suggested use of $30.22 meal dollars per day"
        ],
        note: "Expires at the end of the Winter semester"
      },
      {
        label: "Meal Plan B — BASIC",
        price: null,
        priceLabel: "",
        bullets: [
          "Starting balance of $6,110 meal dollars",
          "Suggested use of $26.68 meal dollars per day"
        ],
        note: "Expires at the end of the Winter semester"
      }
    ],
    mealNote: "Meal plan is mandatory and already built into each price above. Double rooms are only offered at Whitney Hall. Balances shown are the most recent figures U of T has published and may be updated for the new year.",
    mealSystem: "Declining balance, not a swipe count. Your TCard works like a debit card and the balance drops with every purchase, so you can also take food to go. Plans A and B buy exactly the same things. Worth knowing: Plan A costs $813 more than Plan B, and it also starts you with exactly $813 more in meal dollars — so you are not paying a premium, you are just pre-loading more. Anything left over is lost at the end of Winter term, so the real question is how much you will actually eat. Most food here is HST-free, worth up to about 13 per cent.",
    halls: [
      {
        name: "Whitney Hall",
        built: "",
        capacity: "240+ students",
        rooms: "Single and double rooms, split across four houses",
        note: "The only UC building that offers double rooms, so it holds the cheapest option. Full kitchens available."
      },
      {
        name: "Sir Daniel Wilson Hall",
        built: "1954",
        capacity: "200+ students",
        rooms: "Mostly single rooms, split across six houses",
        note: "UC's second oldest building, originally opened as a men's residence. Same price as Whitney singles. Full kitchens available."
      },
      {
        name: "Morrison Hall",
        built: "2005",
        capacity: "260+ students",
        rooms: "Single rooms only",
        note: "The newest of the three and about $1,800 more per year than the other two. Has kitchenettes rather than full kitchens. The dining hall is in this building."
      }
    ],
    summary: "Sits in the middle of the St. George campus, so the walk to class is short. Three separate buildings share one price list, and which one you land in changes what you pay by roughly $1,800 a year.",
    photoUrl: "https://future.utoronto.ca/sites/default/files/styles/landscape_3_2_1200/public/2025-02/photo-uc-exterior.jpg?itok=s2UDcceo",
    morePhotos: [
      "https://future.utoronto.ca/sites/default/files/styles/landscape_3_2_1200/public/2025-02/photo-uc-bedroom.jpg?itok=HCnxWz9z",
      "https://future.utoronto.ca/sites/default/files/styles/landscape_3_2_1200/public/2025-02/photo-uc-common-area.jpg?itok=BTUpWSq4"
    ],
    floorPhotos: [],
    officialUrl: "https://www.uc.utoronto.ca/residence",
    videoUrl: "https://www.youtube.com/watch?v=B2P6z0hhAv0",
    videoCredit: "U of T Faculty of Arts & Science — official college tour",
    reviews: [],
    lastChecked: "2026-08-24"
  },

  {
    id: "st-michaels",
    name: "St. Michael's College",
    price: 18035,
    priceMax: 24538,
    priceUnit: "",
    priceNote: "Room fee plus a mandatory meal plan — see both lists below",
    roomType: "Traditional dormitory",
    mealPlan: "Included",
    college: "St. Michael's College students",
    capacity: null,
    address: "81 St. Mary St",
    winterBreak: "Closed — you have to move out",
    winterBreakDetail: "U of T lists no option to stay through the break here. If you cannot leave Toronto, contact St. Michael's directly and ask about exceptions before you accept an offer.",
    winterBreakClosed: true,
    winterBreakCost: "none",
    roomOptions: [
      { label: "Triple", price: 11190 },
      { label: "Double, economy", price: 11840 },
      { label: "Single, economy", price: 12758 },
      { label: "Double", price: 12937 },
      { label: "Single", price: 13953 },
      { label: "Graduate suite (Loretto)", price: 16552 }
    ],
    mealPlans: [
      { label: "5-day meal plan", price: 6845, bullets: ["Covers weekdays only"], note: "You pay for your own food on weekends" },
      { label: "7-day meal plan", price: 7986, bullets: ["Covers every day of the week"], note: "$1,141 more than the 5-day plan" }
    ],
    mealNote: "Meal plan is mandatory. Add one of the plans below to your room fee. The 5-day plan does not cover weekends.",
    summary: "A classic dorm experience in single, double or triple rooms, with washrooms and common areas shared between housemates and floormates. Note that the building closes over winter break, so you cannot stay through the holidays.",
    photoUrl: "https://future.utoronto.ca/sites/default/files/styles/landscape_3_2_1200/public/2026-01/photo-st-mikes-exterior.jpg?itok=pxasgOTx",
    morePhotos: [
      "https://future.utoronto.ca/sites/default/files/styles/landscape_3_2_1200/public/2026-01/photo-st-mikes-dorm.jpg?itok=QrOSUR0n"
    ],
    floorPhotos: [],
    officialUrl: "https://stmikes.utoronto.ca/community/st-michaels-college-residence",
    videoUrl: "https://www.youtube.com/watch?v=twsOQwhuwUw",
    videoCredit: "U of T Faculty of Arts & Science — official college tour",
    reviews: [],
    lastChecked: "2026-08-24"
  },

  {
    id: "knox",
    name: "Knox Residence",
    price: 18772,
    priceMax: 20358,
    priceUnit: "",
    priceNote: "Meal plan included in every price below",
    roomType: "Traditional dormitory",
    mealPlan: "Included",
    college: "Any college",
    capacity: null,
    address: "59 St. George St",
    winterBreak: "Stays open",
    winterBreakDetail: "The building stays open, but you must apply through the U of T Residence Portal. U of T does not publish whether a fee applies here — ask Knox directly.",
    winterBreakClosed: false,
    winterBreakCost: "unknown",
    roomOptions: [
      { label: "Double + Access 14", price: 18772 },
      { label: "Double + Unlimited", price: 19342 },
      { label: "Single + Access 14", price: 19808 },
      { label: "Single + Unlimited", price: 20358 }
    ],
    mealPlans: [],
    mealNote: "Meal plan is mandatory and already built into each price above. Prices shown are new-resident rates; returning students pay different rates.",
    summary: "Right in the middle of the St. George campus and open to students from any faculty or college. Traditional dorm setup with shared washrooms, and one of the few good options if you are not tied to a college residence.",
    photoUrl: "https://future.utoronto.ca/sites/default/files/styles/landscape_3_2_1200/public/2025-02/photo-knox-residence-courtyard.jpg?itok=cGoOH_OL",
    morePhotos: [
      "https://future.utoronto.ca/sites/default/files/styles/landscape_3_2_1200/public/2025-02/photo-knox-residence-single-room.jpg?itok=Fo8HGLUG",
      "https://future.utoronto.ca/sites/default/files/styles/landscape_3_2_1200/public/2025-02/photo-knox-residence-common-room.jpg?itok=bEzYf7OB"
    ],
    floorPhotos: [],
    officialUrl: "https://knoxresidence.utoronto.ca/",
    videoUrl: "",
    videoCredit: "",
    reviews: [],
    lastChecked: "2026-08-24"
  },

  {
    id: "trinity",
    name: "Trinity College",
    price: 22668,
    priceMax: 25068,
    priceUnit: "",
    priceNote: "Room fee plus a mandatory meal plan — see both lists below",
    roomType: "Traditional dormitory",
    mealPlan: "Included",
    college: "Trinity College students",
    capacity: 470,
    address: "6 Hoskin Ave",
    winterBreak: "Closed — but you can pay to stay",
    winterBreakDetail: "Apply to the Office of the Dean of Students. Approval is only given for exceptional circumstances, and you are charged for every night you stay. There is no meal service during the break, even though your meal plan is mandatory.",
    winterBreakClosed: true,
    winterBreakCost: "paid",
    roomOptions: [
      { label: "Triple", price: 14100 },
      { label: "Double", price: 15400 },
      { label: "Single", price: 16500 }
    ],
    mealPlans: [
      { label: "Trinity meal plan", price: 8568, bullets: ["The only plan offered — there is no cheaper tier"], note: "No meal service during the winter break, even though the plan is mandatory" }
    ],
    mealNote: "Meal plan is mandatory and there is only one tier, so add $8,568 to whichever room fee applies. It is the most expensive meal plan on campus and there is no cheaper option to fall back on.",
    mealSystem: "",
    halls: [
      { name: "Trinity College Residence", built: "", capacity: "", rooms: "Singles, doubles and triples", note: "6 Hoskin Avenue, the main quad building." },
      { name: "St. Hilda's College Residence", built: "", capacity: "", rooms: "Singles, doubles and triples", note: "44 Devonshire Place. Also used for summer residence." }
    ],
    summary: "Two traditional buildings, Trinity College Residence and St. Hilda's, housing roughly 470 first-year and upper-year students between them. The meal plan is the most expensive on campus and there is no cheaper tier to fall back on. The building also closes over winter break.",
    photoUrl: "https://future.utoronto.ca/sites/default/files/styles/landscape_3_2_1200/public/2025-02/photo-trinity-exterior.jpg?itok=IhbL7PNW",
    morePhotos: [
      "https://future.utoronto.ca/sites/default/files/styles/landscape_3_2_1200/public/2025-02/photo-trinity-bedroom.jpg?itok=4cjoZodt",
      "https://future.utoronto.ca/sites/default/files/styles/landscape_3_2_1200/public/2025-02/photo-trinity-common-area.jpg?itok=foADmo5D"
    ],
    floorPhotos: [],
    officialUrl: "https://www.trinity.utoronto.ca/engage/residence/",
    videoUrl: "https://www.youtube.com/watch?v=l7T8H51mNKs",
    videoCredit: "U of T Faculty of Arts & Science — official college tour",
    reviews: [],
    lastChecked: "2026-08-24"
  },

  {
    id: "chestnut",
    name: "Chestnut Residence",
    price: 22858,
    priceMax: 27120,
    priceUnit: "",
    priceNote: "Meal plan included in every price below",
    roomType: "Modified dormitory",
    mealPlan: "Included",
    college: "Any college",
    capacity: 1100,
    address: "89 Chestnut St",
    winterBreak: "Stays open",
    winterBreakDetail: "The building stays open, but you must apply through the U of T Residence Portal. U of T does not publish whether a fee applies here — ask Chestnut directly.",
    winterBreakClosed: false,
    winterBreakCost: "unknown",
    roomOptions: [
      { label: "Double + Access 14", price: 22858 },
      { label: "Double + Unlimited", price: 23408 },
      { label: "Single + Access 14", price: 26570 },
      { label: "Single + Unlimited", price: 27120 }
    ],
    mealPlans: [],
    mealNote: "Meal plan is mandatory and already built into each price above. Two tiers: Access 14 and Unlimited.",
    summary: "The largest residence on campus, open to students from every college and faculty. A converted downtown hotel tower, so it sits a few blocks off the main campus. Going from a double to a single costs about $3,700 more per year.",
    photoUrl: "https://future.utoronto.ca/sites/default/files/styles/landscape_3_2_1200/public/2025-02/photo-chestnut-exterior.jpg?itok=MErgFZ7r",
    morePhotos: [
      "https://future.utoronto.ca/sites/default/files/styles/landscape_3_2_1200/public/2025-02/photo-chestnut-bedroom.jpg?itok=SEPDXDqq",
      "https://future.utoronto.ca/sites/default/files/styles/landscape_3_2_1200/public/2025-02/photo-chestnut-common-area.jpeg?itok=OBekOLF4"
    ],
    floorPhotos: [],
    officialUrl: "https://chestnut.utoronto.ca/",
    videoUrl: "",
    videoCredit: "",
    reviews: [
      { stars: 4, text: "Rooms are small but the location is unbeatable.", source: "Reddit r/UofT, 2025", tags: { room: 0 } },
      { stars: 2, text: "Elevators get very busy around 8am on weekdays.", source: "Reddit r/UofT, 2025" }
    ],
    lastChecked: "2026-08-24"
  },

  {
    id: "oak-house",
    name: "Oak House",
    price: 24335,
    priceMax: 29700,
    priceUnit: "",
    priceNote: "Dorm rooms include meals; suites do not and require 12 months",
    roomType: "Apartment / Modified dormitory",
    mealPlan: "Included",
    college: "Any college",
    capacity: null,
    address: "Spadina Ave & Sussex Ave",
    winterBreak: "Stays open",
    winterBreakDetail: "Oak House handles winter break directly rather than through the Residence Portal. Contact them for the process and any fees.",
    winterBreakClosed: false,
    winterBreakCost: "unknown",
    roomOptions: [
      { label: "Dorm single economy + Access 14", price: 25182 },
      { label: "Dorm single economy + Unlimited", price: 25732 },
      { label: "Dorm single standard + Access 14", price: 26036 },
      { label: "Dorm single standard + Unlimited", price: 26586 },
      { label: "Dorm single premium + Access 14", price: 26407 },
      { label: "Dorm single premium + Unlimited", price: 27901 },
      { label: "Suite single economy (12 months)", price: 27893 },
      { label: "Suite single standard (12 months)", price: 29093 },
      { label: "Suite single premium (12 months)", price: 29692 }
    ],
    mealPlans: [],
    mealNote: "Dormitory rooms have a mandatory meal plan built into the prices above. Suite rooms have kitchens and no meal plan, but require a full 12-month stay rather than 8 months.",
    summary: "The newest residence on campus, at Spadina and Sussex, a short walk from Robarts Library. Two very different options live in the same building: 8-month dorm rooms with meals included, and 12-month suites with kitchens instead.",
    photoUrl: "https://future.utoronto.ca/sites/default/files/styles/landscape_3_2_1200/public/2025-02/photo-oak-house.jpg?itok=I1iqXGkP",
    morePhotos: [],
    floorPhotos: [],
    officialUrl: "http://spacesandexperiences.utoronto.ca/housing/introducing-oak-house-student-residence/",
    videoUrl: "",
    videoCredit: "",
    reviews: [],
    lastChecked: "2026-08-24"
  },

  {
    id: "campusone",
    name: "CampusOne",
    price: 29089,
    priceMax: 33965,
    priceUnit: "per 12-month lease",
    priceNote: "Covers 12 months, not 8 — not directly comparable to the others",
    roomType: "Suite",
    mealPlan: "Included",
    college: "Any college",
    capacity: null,
    address: "253 College St",
    winterBreak: "Stays open",
    winterBreakDetail: "No application needed and no extra charge — your lease already covers all 12 months, so the winter break is simply part of what you have paid for.",
    winterBreakClosed: false,
    winterBreakCost: "free",
    roomOptions: [
      { label: "5 Bed, 2 Bath standard value", price: 1874, unit: "/month" },
      { label: "3 Bed, 2 Bath standard value", price: 2062, unit: "/month" },
      { label: "4 Bed, 2 Bath standard value", price: 2073, unit: "/month" },
      { label: "5 Bed, 2 Bath standard", price: 2085, unit: "/month" },
      { label: "3 Bed, 1 Bath standard", price: 2132, unit: "/month" },
      { label: "5 Bed, 3+ Bath standard", price: 2135, unit: "/month" },
      { label: "4 Bed, 2 Bath (no living room)", price: 2160, unit: "/month" },
      { label: "2 Bed, 1 Bath standard", price: 2180, unit: "/month" },
      { label: "3 Bed, 2 Bath standard", price: 2185, unit: "/month" },
      { label: "4 Bed, 2 Bath standard", price: 2195, unit: "/month" },
      { label: "4 Bed, 2 Bath south facing", price: 2295, unit: "/month" }
    ],
    mealPlans: [
      { label: "Access 14 meal plan", price: 6925, bullets: [], note: "" },
      { label: "Unlimited meal plan", price: 7625, bullets: [], note: "" }
    ],
    mealNote: "Meal plan is mandatory. The plan prices shown are 2025-26 figures; U of T updates them in May, so check before you commit.",
    summary: "A privately run residence affiliated with U of T, in the middle of downtown. Newer building with hotel-like amenities and suite living. The fee covers a full 12 months rather than the 8-month school year, so comparing it to the other residences by price alone is misleading.",
    photoUrl: "https://future.utoronto.ca/sites/default/files/styles/landscape_3_2_1200/public/2025-02/photo-campusone-exterior.webp?itok=KT-IAR5P",
    morePhotos: [
      "https://future.utoronto.ca/sites/default/files/styles/landscape_3_2_1200/public/2025-02/photo-campusone-bedroom.webp?itok=YXJBWx8h",
      "https://future.utoronto.ca/sites/default/files/styles/landscape_3_2_1200/public/2025-02/photo-campusone-lounge.webp?itok=NNMVbFZ8"
    ],
    floorPhotos: [],
    officialUrl: "https://live-campusone.ca/",
    videoUrl: "",
    videoCredit: "",
    reviews: [],
    lastChecked: "2026-08-24"
  }

];


/* ============================================
   Fees & Dates — 지원부터 입주까지 전체 타임라인

   출처 (전부 University of Toronto 공식)
     지원·서류·마감일 : future.utoronto.ca/deadlines
     지원자 타임라인   : future.utoronto.ca/timeline-canadian-living-in-ontario
                        future.utoronto.ca/timeline-international-student
     등록금 납부일     : registrar.utoronto.ca/fees-payments/payment-deadlines
     기숙사 마감일     : studentlife.utoronto.ca/task/1st-year-residence-guarantee
   확인일: 2026-08-24 (2026-27 입학 기준)

   ⚠️ 날짜는 매년 바뀝니다. 특히 등록금 납부일은 학과마다 다릅니다.
      여기 있는 건 Arts & Science, St. George 캠퍼스 학부 기준입니다.
   ============================================ */


/* ---- 각 칸에 무엇을 넣는지 ----------------------------------

   id        : 이름표 (필수)
   month     : 화면 왼쪽에 크게 뜨는 시기 (예: "Jan 15", "Sep - Oct")
   title     : 제목
   body      : 한두 문장 설명
   audience  : "both"          — 모두 해당
               "domestic"      — 캐나다 거주자만
               "international" — 국제학생만
   category    : "prep" / "money" / "residence" / "aid" / "visa" 중 하나
               (residence 카테고리는 Undergraduate 페이지 카드에는 더 이상
               안 뜨고, Residence 페이지 상단 keybox에 렌더링됩니다)
   officialUrl : 자세히 볼 공식 페이지
------------------------------------------------------------- */

const FEES_TIMELINE = [

  {
    id: "explore",
    month: "Grade 11 - 12",
    title: "Explore programs",
    body: "Look through U of T's program list and figure out what you want to study before applications open.",
    category: "prep",
    audience: "both",
    officialUrl: "https://future.utoronto.ca/undergraduate-programs"
  },

  {
    id: "ones-program",
    month: "March",
    title: "Consider a First-Year Foundations (Ones) Program",
    body: "Small-group, theme-based courses exclusive to first-years. Some require a separate application — as early as March, before you've even accepted an offer.",
    category: "prep",
    audience: "both",
    officialUrl: "https://future.utoronto.ca/undergraduate-programs"
  },

  {
    id: "requirements",
    month: "Sep - Oct",
    title: "Check admission requirements",
    body: "Confirm the prerequisite courses and English language requirements for your programs.",
    category: "prep",
    audience: "both",
    officialUrl: "https://future.utoronto.ca/requirements"
  },

  {
    id: "apply",
    month: "Sep - Jan",
    title: "Submit your application",
    body: "Apply through OUAC. Applications typically open in late September.",
    category: "prep",
    audience: "both",
    officialUrl: "https://future.utoronto.ca/how-to-apply"
  },

  {
    id: "early-apply",
    month: "Nov 7",
    title: "Recommended early application date",
    body: "Not a hard deadline, but applying and sending documents by **November 7** gives you the best shot at being considered in the earliest admission rounds. Early documents are due by **December 2**.",
    category: "prep",
    audience: "both",
    officialUrl: "https://future.utoronto.ca/deadlines"
  },

  {
    id: "app-deadline",
    month: "Jan 15",
    title: "Main application deadline",
    body: "Most programs close **January 15**. Some faculties extend this — always confirm the current deadline for your specific program on the official page.",
    category: "prep",
    audience: "both",
    officialUrl: "https://future.utoronto.ca/deadlines"
  },

  {
    id: "documents",
    month: "Feb",
    title: "Document deadline",
    body: "Transcripts and other required documents are usually due in **early February**, but the exact date varies by faculty (some extend into February). Check your program's deadline on the official page.",
    category: "prep",
    audience: "both",
    officialUrl: "https://future.utoronto.ca/required-documents"
  },

  {
    id: "residence-apply",
    month: "Jan - Mar",
    title: "First-year residence guarantee",
    body: "Finish your U of T Residence Portal application by **March 31** and accept your admission offer by **June 2**. Miss either date and the guarantee is gone. This is separate from your admission application.",
    category: "residence",
    audience: "both",
    officialUrl: "https://residence.utoronto.ca/"
  },

  {
    id: "decision",
    month: "Jan - May",
    title: "Admission decisions released",
    body: "Offers go out in rounds. If you applied to more than one program, decisions may arrive at different times.",
    category: "prep",
    audience: "both",
    officialUrl: "https://future.utoronto.ca/admission-decisions"
  },

  {
    id: "accept",
    month: "Jan - May",
    title: "Accept your offer",
    body: "Accept on the Join U of T portal before the deadline stated in your specific offer letter — this date varies by applicant.",
    category: "prep",
    audience: "both",
    officialUrl: "https://join.utoronto.ca/"
  },

  {
    id: "deposit",
    month: "Feb - May",
    title: "Pay your admission deposit",
    body: "Some offers require a deposit through ACORN to hold your spot. Check your offer letter for the amount and deadline.",
    category: "money",
    audience: "both",
    officialUrl: "https://future.utoronto.ca/fees"
  },

  {
    id: "study-permit",
    month: "Feb - May",
    title: "Apply for your study permit",
    body: "You'll need a study permit to study in Canada, plus a Provincial Attestation Letter (PAL) issued after you accept your offer and pay the deposit.",
    category: "visa",
    audience: "international",
    officialUrl: "https://internationalexperience.utoronto.ca/international-student-services/immigration/studying-in-canada/apply-for-your-study-permit"
  },

  {
    id: "osap",
    month: "Feb onward",
    title: "Apply for financial aid",
    body: "Ontario residents can apply for OSAP and UTAPS to help cover costs.",
    category: "aid",
    audience: "domestic",
    officialUrl: "https://future.utoronto.ca/financial-aid"
  },

  {
    id: "deferral",
    month: "Sep 11",
    title: "Deferral request deadline",
    body: "If you want to push your admission back one year, request it by **September 11** of your admission year.",
    category: "prep",
    audience: "both",
    officialUrl: "https://future.utoronto.ca/admission-decisions"
  },

  {
    id: "mpr",
    month: "Aug 11",
    title: "Tuition: minimum payment to register",
    body: "For Arts & Science, St. George undergrads, you must pay or defer your Minimum Payment to Register by **August 11** to stay enrolled in your courses.",
    category: "money",
    audience: "both",
    icsDate: "2026-08-11",
    officialUrl: "https://www.registrar.utoronto.ca/fees-payments/payment-deadlines/"
  },

  {
    id: "fall-balance",
    month: "Sep 30",
    title: "Fall term balance due",
    body: "Remaining Fall term fees are due. Miss this and monthly service charges start **October 15**.",
    category: "money",
    audience: "both",
    icsDate: "2026-09-30",
    officialUrl: "https://www.registrar.utoronto.ca/fees-payments/payment-deadlines/"
  },

  {
    id: "winter-balance",
    month: "Nov 30",
    title: "Winter term balance due",
    body: "Remaining Winter term fees are due. Miss this and monthly service charges start **December 15**.",
    category: "money",
    audience: "both",
    icsDate: "2026-11-30",
    officialUrl: "https://www.registrar.utoronto.ca/fees-payments/payment-deadlines/"
  },

  {
    id: "tcard",
    month: "Aug",
    title: "Get your TCard (Student ID)",
    body: "Start online **before you arrive**: enable your JOINid, then upload your photo and ID. Processing takes 2\u20137 business days, so don't leave it until you land.",
    category: "prep",
    audience: "both",
    officialUrl: "https://tcard.utoronto.ca/get-your-utorid-tcard/"
  },

  {
    id: "begin",
    month: "September",
    title: "Classes begin",
    body: "Welcome to U of T.",
    category: "prep",
    audience: "both",
    officialUrl: "https://future.utoronto.ca/"
  }

];


/* ============================================
   Courses — 수강신청 · 전공선택 · 졸업요건

   출처 (전부 University of Toronto 공식, Faculty of Arts & Science 기준)
     수강신청 일정 : artsci.calendar.utoronto.ca/course-enrolment
                    acadcalendar.com/uoft-academic-calendar (2026-27 학사일정 정리)
     전공(Subject POSt) : registrar.utoronto.ca (Choosing Your Program)
                          Type 1/2/3 설명: theinnisherald.com/choosing-a-post, thevarsity.ca
     졸업요건       : artsci.calendar.utoronto.ca/hbahbsc-requirements
   확인일: 2026-08-25 (2026-27 학년도 기준)

   ⚠️ St. George, Arts & Science 기준입니다. Engineering·Music 등 다른 학부는 일정이 다릅니다.
      매년 날짜가 바뀌니 1년에 한 번씩 위 공식 페이지에서 확인하세요.
   ============================================ */


/* ---- 수강신청(ACORN) 일정 ----
   id/month/title/body/officialUrl 구조는 FEES_TIMELINE 과 같습니다 */

const COURSE_ENROLMENT = [
  {
    id: "start-times-posted",
    month: "Jul 1",
    title: "Your start time is posted",
    body: "Log into ACORN to see the exact date and time you're allowed to start enrolling. You can't get in before this time even on your assigned day.",
    officialUrl: "https://www.artsci.utoronto.ca/current/academics/course-enrolment"
  },
  {
    id: "enrol-4th",
    month: "Jul 6",
    title: "4th-years start enrolling",
    body: "Students with **14.0+ credits** get first access.",
    officialUrl: "https://www.artsci.utoronto.ca/current/academics/course-enrolment"
  },
  {
    id: "enrol-3rd",
    month: "Jul 8",
    title: "3rd-years start enrolling",
    body: "Students with **9.0–13.5 credits**.",
    officialUrl: "https://www.artsci.utoronto.ca/current/academics/course-enrolment"
  },
  {
    id: "enrol-2nd",
    month: "Jul 13",
    title: "2nd-years start enrolling",
    body: "Students with **4.0–8.5 credits**.",
    officialUrl: "https://www.artsci.utoronto.ca/current/academics/course-enrolment"
  },
  {
    id: "enrol-1st",
    month: "Jul 16",
    title: "1st-years start enrolling",
    body: "This is the date **incoming students** (fewer than 4.0 credits) can start building their timetable. Mark this one.",
    officialUrl: "https://www.artsci.utoronto.ca/current/academics/course-enrolment"
  },
  {
    id: "classes-begin",
    month: "Sep 8",
    title: "Classes begin",
    body: "Fall session starts.",
    officialUrl: "https://www.artsci.utoronto.ca/current/dates-deadlines"
  },
  {
    id: "lwd-fall",
    month: "Dec 8",
    title: "Last day to withdraw from Fall courses (LWD)",
    body: "Final deadline to request **LWD (Late Withdrawal)**. Withdrawing after the drop date and by today puts \u201cLWD\u201d on your transcript instead of a mark. After today you can't leave the course without a petition \u2014 whatever mark you earn stands.",
    officialUrl: "https://www.artsci.utoronto.ca/current/dates-deadlines/academic-dates"
  },
  {
    id: "lwd-winter",
    month: "Apr 12",
    title: "Last day to withdraw from Winter courses (LWD)",
    body: "Same rule as Fall, for Winter and full-year (Y) courses \u2014 last day to request **LWD** before the mark becomes final.",
    officialUrl: "https://www.artsci.utoronto.ca/current/dates-deadlines/academic-dates"
  }
];


/* ============================================
   과목코드 & ACORN/TTB 용어 가이드
   ------------------------------------------------
   출처: 사용자가 제공한 자료 기반 (artsci.calendar.utoronto.ca 및
   ACORN/TTB 화면에서 흔히 쓰이는 표준 표기법). 학과코드 표는
   공식 페이지에서 건별로 재확인하지 않았으니, 신청 전에는
   반드시 artsci.calendar.utoronto.ca 검색으로 코드를 다시 확인하세요.
   확인일: 2026-08-27
   ============================================ */

const COURSE_CODE_GUIDE = {
  format: "Department code (3 letters) + level (3 digits) + H or Y (credit weight) + 1 (St. George campus). Example: CSC108H1 = Computer Science, 100-level, 0.5 credit, St. George.",
  formatNote: "H = 0.5 credit (one term), Y = 1.0 credit (runs the full year).",

  terms: [
    { term: "Prerequisite", def: "A course you must complete before you can take this one." },
    { term: "Corequisite", def: "A course you must take in the same term as this one (or have taken already)." },
    { term: "Exclusion", def: "A course that overlaps too much — if you've already taken it, you won't get credit for both." }
  ],

  sessionCodes: [
    { code: "F", meaning: "Fall Session — September to December" },
    { code: "S", meaning: "Winter Session — January to April" },
    { code: "Y", meaning: "Full Year — September through April" }
  ],

  activityCodes: [
    { code: "LEC", meaning: "Lecture — the main class" },
    { code: "TUT", meaning: "Tutorial — smaller discussion / problem-solving session" },
    { code: "PRA", meaning: "Practical / Lab — hands-on work" }
  ],

  enrolCodes: [
    { code: "P", meaning: "Priority — certain program students can enrol first; opens to everyone after the priority period." },
    { code: "R", meaning: "Restricted — only students in the listed programs can enrol." },
    { code: "E", meaning: "Enrolment control — departmental approval required." },
    { code: "AE", meaning: "Automated Enrolment — the tutorial/practical is added automatically with the lecture." }
  ],

  uoftTime: {
    text: "U of T Time: most lectures and events start ten minutes after the hour, not on the hour (e.g. a 10:00 class actually begins at 10:10). The gap gives you time to walk between buildings.",
    sourceLabel: "U of T EngSci orientation page (official utoronto.ca)",
    sourceUrl: "https://orientation.engsci.utoronto.ca/timetables/"
  },

  deptCodes: [
    { code: "ACT", name: "Actuarial Science" }, { code: "AFR", name: "African Studies" },
    { code: "ANA", name: "Anatomy" }, { code: "ANT", name: "Anthropology" },
    { code: "ARH", name: "Archaeology" }, { code: "AST", name: "Astronomy and Astrophysics" },
    { code: "BCH", name: "Biochemistry" }, { code: "BIO", name: "Biology" },
    { code: "BMS", name: "Book and Media Studies" }, { code: "CAR", name: "Caribbean Studies" },
    { code: "CDN", name: "Canadian Studies" }, { code: "CHM", name: "Chemistry" },
    { code: "CIN", name: "Cinema Studies" }, { code: "CLA", name: "Classics" },
    { code: "COG", name: "Cognitive Science" }, { code: "CRI", name: "Criminology and Sociolegal Studies" },
    { code: "CSC", name: "Computer Science" }, { code: "CSB", name: "Cell and Systems Biology" },
    { code: "DRM", name: "Drama, Theatre and Performance Studies" }, { code: "DTS", name: "Diaspora and Transnational Studies" },
    { code: "EAS", name: "East Asian Studies" }, { code: "ECO", name: "Economics" },
    { code: "EEB", name: "Ecology and Evolutionary Biology" }, { code: "ENG", name: "English" },
    { code: "ENV", name: "Environment (School of the Environment)" }, { code: "ESS", name: "Earth Sciences" },
    { code: "EUR", name: "European Studies" }, { code: "FAH", name: "Fine Art History" },
    { code: "FIN", name: "Finnish Studies" }, { code: "FRE", name: "French" },
    { code: "GGR", name: "Geography and Planning" }, { code: "GER", name: "German" },
    { code: "GRK", name: "Greek" }, { code: "HIS", name: "History" },
    { code: "HMB", name: "Human Biology" }, { code: "HPS", name: "History and Philosophy of Science and Technology" },
    { code: "HUN", name: "Hungarian Studies" }, { code: "IMM", name: "Immunology" },
    { code: "INS", name: "Indigenous Studies" }, { code: "IRE", name: "Industrial Relations and Human Resources" },
    { code: "ITA", name: "Italian" }, { code: "JLS", name: "Joint Language Studies" },
    { code: "JSU", name: "Joint Studies / Interdisciplinary" }, { code: "LAT", name: "Latin" },
    { code: "LIN", name: "Linguistics" }, { code: "LMP", name: "Laboratory Medicine and Pathobiology" },
    { code: "MAT", name: "Mathematics" }, { code: "MGY", name: "Molecular Genetics" },
    { code: "MUS", name: "Music / Music History" }, { code: "NMC", name: "Near and Middle Eastern Civilizations" },
    { code: "NTR", name: "Nutritional Sciences" }, { code: "PCL", name: "Pharmacology and Toxicology" },
    { code: "PHL", name: "Philosophy" }, { code: "PHY", name: "Physics" },
    { code: "PLA", name: "Planning" }, { code: "POL", name: "Political Science" },
    { code: "PSL", name: "Physiology" }, { code: "PSY", name: "Psychology" },
    { code: "RLG", name: "Religion" }, { code: "RSM", name: "Rotman Commerce" },
    { code: "SLA", name: "Slavic Languages and Literatures" }, { code: "SOC", name: "Sociology" },
    { code: "SPA", name: "Spanish and Portuguese" }, { code: "STA", name: "Statistical Sciences" },
    { code: "TRN", name: "Trinity College Programs" }, { code: "UNI", name: "University College Programs" },
    { code: "URB", name: "Urban Studies" }, { code: "VIC", name: "Victoria College Programs" },
    { code: "WGS", name: "Women and Gender Studies" }, { code: "WDW", name: "Woodsworth College Programs" }
  ],

  verifyUrl: "https://artsci.calendar.utoronto.ca/search-courses"
};


/* ---- 전공(Subject POSt) 종류 ---- */

const PROGRAM_TYPES = [
  {
    id: "type1",
    name: "Type 1",
    tag: "Most accessible",
    desc: "No minimum grade needed. If you meet the basic course requirements, you're in — no application.",
    note: "Most programs at U of T are Type 1."
  },
  {
    id: "type2",
    name: "Type 2 (and 2L)",
    tag: "Minimum grade required",
    desc: "You need a minimum grade in specific prerequisite courses to enrol. The \"L\" in Type 2L means limited spots — meeting the grade doesn't guarantee a seat.",
    note: "Some Type 2 programs will admit you even missing a prerequisite if you email the coordinator."
  },
  {
    id: "type3",
    name: "Type 3",
    tag: "Competitive application",
    desc: "On top of prerequisite grades, you submit a written application — sometimes a personal statement, resume, or interview.",
    note: "Common in competitive Life Science specialists. Apply early and don't assume grades alone are enough."
  }
];


/* ---- 졸업요건 기본 사실 ---- */

const DEGREE_BASICS = [
  "You need **20.0 credits** total to graduate (most courses are 0.5 or 1.0 credits each).",
  "At the end of first year — once you're on track for **4.0 credits** — you enrol in your program (subject POSt) on ACORN.",
  "You can combine up to **3 programs**: one Specialist alone, or a mix of Majors and Minors."
];


/* ---- 폭넓힘(Breadth) 요건 5개 카테고리 ----
   ⚠️ 이 5개 이름은 2014년 자료 기준입니다. 이름이 바뀌었을 수 있으니
      artsci.calendar.utoronto.ca 최신 캘린더에서 다시 확인하세요. */

const BREADTH_CATEGORIES = [
  { id: "b1", name: "Arts, Literature & Language", desc: "", icon: "\uD83D\uDCDA", color: "#7A3FA0" },
  { id: "b2", name: "History, Philosophy & Cultural Studies", desc: "", icon: "\uD83C\uDFDB\uFE0F", color: "#C05A16" },
  { id: "b3", name: "Social & Behavioural Sciences", desc: "", icon: "\uD83D\uDC65", color: "#0B4DA0" },
  { id: "b4", name: "Natural Sciences", desc: "", icon: "\uD83E\uDDEA", color: "#0F7A4D" },
  { id: "b5", name: "Quantitative Reasoning", desc: "", icon: "\uD83D\uDD22", color: "#0E7C86" }
];


/* ============================================
   과목 리뷰 카탈로그 (재학생용 — Choosing a Program 과는 다름)

   출처: 이 대화 안에서 이미 확인된 과목 코드만 사용했습니다
   (Computer Science/Economics/Psychology/Sociology/Biology/Chemistry
   학과 자료 조사 중 실제로 나온 코드들). 과목명은 널리 알려진 표준
   제목이지만, 학기마다 소폭 바뀔 수 있으니 등록 전 공식 캘린더에서
   최종 확인하세요.
   확인일: 2026-08-27

   ⚠️ 딱 10개만 시드로 넣었습니다. 학생들이 리뷰 쓰면서 새 과목이
      필요하면 COURSE_CATALOG 에 한 덩어리 더 추가하면 됩니다.
   ============================================ */

/* ============================================
   교양(Breadth) 과목 목록

   ⚠️ 전공 필수/전공생 전용 과목도 사용자 요청으로 포함되어 있습니다.
      (예: CSC207H1, CSC236H1, CSC301H1, CSC373H1, CSC413H1, CSC488H1,
      RSM219H1, RSM222H1, RSM430H1) 이런 과목은 note 필드에
      "⚠️" 로 선수과목 부담이나 프로그램 제한을 명시해뒀습니다.
      CSC110Y1/CSC111H1(CS 전공자 전용 입학 트랙 과목)처럼 완전히
      제한된 과목은 여전히 제외합니다.

   출처
     과목명·설명·다루는내용 : artsci.calendar.utoronto.ca (공식 학사요람)
     추천 근거(note)        : askastudent.utoronto.ca
                              (Innis College 운영 U of T 공식 학생상담)
   확인일: 2026-08-27

   필드 설명
     desc   : 이 과목이 뭘 하는 과목인지 한 줄
     topics : 실제로 뭘 다루는지 불릿 (학사요람 설명에서 추출 — 지어내지 말 것)
     tags   : 주제 태그. 학생이 관심사로 골라볼 수 있게 하는 용도
     note   : 왜 교양으로 좋은지 (근거 있을 때만)
   ============================================ */

const COURSE_CATALOG = [
  // ── b1 (21개) ──
{ id: "phl388h1", code: "PHL388H1", name: "Philosophy and Literature", category: "b1", desc: "Where literature and philosophy meet and clash.", topics: ["The ancient 'quarrel of poets and philosophers'", "Form versus content in philosophical writing", "Aphorism, essay, dialogue, manifesto", "Translation and interpretation"], tags: ["philosophy", "literature"], prereq: "8.0 credits, including 1.5 credits in PHL", reviews: [] },
{ id: "ren240h1", code: "REN240H1", name: "The Renaissance in Italy", category: "b1", desc: "An interdisciplinary introduction to the Italian Renaissance.", topics: ["Florence, Venice, Milan, Rome", "Michelangelo and Sofonisba Anguissola", "Brunelleschi's architecture", "The Medici and Isabella d'Este", "Machiavelli and Laura Cereta"], tags: ["history", "art", "literature"], reviews: [] },
{ id: "ren241h1", code: "REN241H1", name: "Renaissance Masterworks and Remixes", category: "b1", desc: "Iconic Renaissance works and how modern pop culture reuses them.", topics: ["Celebrated works in literature, music, and visual art", "Later adaptations and appropriations", "Renaissance in modern popular culture"], tags: ["history", "art", "media"], reviews: [] },
{ id: "ren244h1", code: "REN244H1", name: "The Renaissance in Europe and the World", category: "b1", desc: "How the Renaissance spread beyond Italy and around the globe.", topics: ["Northern Europe, Iberia, England, Poland", "Engagement with Greek and Roman models", "Contact with Africa, the Americas, Asia", "Religious conflict and colonization", "Global trade networks"], tags: ["history", "society"], reviews: [] },
{ id: "ren245h1", code: "REN245H1", name: "Race and Power in the Renaissance", category: "b1", desc: "Race, imperialism, and culture in the Renaissance world.", topics: ["How early modern Europeans made sense of human diversity", "Portraits of a Black duke in Florence", "Trial records of falsely accused Jewish men", "Plays featuring Roma fortune-tellers", "How these ideas persist today"], tags: ["history", "society"], reviews: [] },
{ id: "ren342h1", code: "REN342H1", name: "Women and Writing in the Renaissance", category: "b1", desc: "Early modern women's writing across Europe.", topics: ["Treatises, letters, and poetry by women", "Female experience in a literate society", "How women constructed gendered identity"], tags: ["history", "literature", "society"], note: "A 300-level course with no prerequisites \u2014 open to anyone.", reviews: [] },
{ id: "ren344h1", code: "REN344H1", name: "Renaissance Narrative", category: "b1", desc: "Renaissance storytelling, read in English translation.", topics: ["Boccaccio's Decameron", "Rabelais' Gargantua", "Romeo and Juliet", "Picaresque rogues in Lazarillo de Tormes"], tags: ["literature", "history", "stories"], note: "A 300-level course with no prerequisites \u2014 open to anyone.", reviews: [] },
{ id: "ren345h1", code: "REN345H1", name: "Media and Communications in the Early Modern Era", category: "b1", desc: "How ideas spread before mass media.", topics: ["The printing press", "Representational art and music", "Preaching", "Censorship and education"], tags: ["history", "media"], note: "A 300-level course with no prerequisites \u2014 open to anyone.", reviews: [] },
{ id: "ren346h1", code: "REN346H1", name: "The Idea of the Renaissance", category: "b1", desc: "How our picture of the Renaissance was constructed — and by whom.", topics: ["Earliest definitions by poets and painters", "Contemporary historians' views", "Biases: aesthetic, gendered, Eurocentric"], tags: ["history", "philosophy"], prereq: "Completion of 4.0 credits", reviews: [] },
{ id: "ren347h1", code: "REN347H1", name: "Studies in Renaissance Performance", category: "b1", desc: "Music, drama, and dance of the Renaissance — sometimes with live performances in Toronto.", topics: ["New forms in music and drama", "Dance", "Live performances and recordings"], tags: ["history", "music", "art"], prereq: "Recommended: REN240Y1 or another Renaissance Studies course", reviews: [] },
{ id: "wrr201h1", code: "WRR201H1", name: "Theories of Rhetoric: A Brief History of Persuasion", category: "b1", desc: "The history of persuasion, from ancient Greece to today.", topics: ["Greco-Roman origins of rhetoric", "Modern rhetorical theory", "Philosophy, psychology, media, advertising"], tags: ["writing", "history"], prereq: "Completion of 4.0 credits", reviews: [] },
{ id: "wrr211h1", code: "WRR211H1", name: "Introduction to Creative Writing", category: "b1", desc: "The craft of creative writing across three genres.", topics: ["Short fiction", "Creative nonfiction", "Poetry", "Workshopping peers' work"], tags: ["writing", "creative"], prereq: "Completion of 4.0 credits", reviews: [] },
{ id: "wrr300h1", code: "WRR300H1", name: "Strategic Writing in Business and the Professions", category: "b1", desc: "Workplace communication and ethics.", topics: ["Ethical reasoning with case studies", "Working with a community partner", "Written and verbal communication"], tags: ["writing", "business"], prereq: "Completion of 4.0 credits", reviews: [] },
{ id: "wrr303h1", code: "WRR303H1", name: "Digital Rhetoric", category: "b1", desc: "How media and technology persuade us.", topics: ["Marshall McLuhan's ideas about media", "Social media platforms", "Online activism", "Surveillance capitalism", "Persuasion in dating apps"], tags: ["writing", "media"], prereq: "Completion of 4.0 credits", reviews: [] },
{ id: "wrr305h1", code: "WRR305H1", name: "Word and Image in Modern Writing", category: "b1", tags: ["writing", "art"], prereq: "Completion of 4.0 credits", reviews: [] },
{ id: "wrr310h1", code: "WRR310H1", name: "Stylistic Editing and Copy Editing", category: "b1", desc: "Professional editing skills.", topics: ["Improving a writer's style", "Accuracy and consistency", "Editorial conventions"], tags: ["writing"], prereq: "Completion of 4.0 credits", reviews: [] },
{ id: "wrr311h1", code: "WRR311H1", name: "Seminar in Creative Writing - Fiction", category: "b1", desc: "A fiction workshop.", topics: ["Setting, character, and scene", "Structure and point of view", "Taking creative risks", "Editing your own and others' work"], tags: ["writing", "creative"], prereq: "Completion of 4.0 credits", reviews: [] },
{ id: "wrr312h1", code: "WRR312H1", name: "Writing Literary Journalism", category: "b1", desc: "Reading and writing long-form journalism.", topics: ["Personal essay, profile, polemic, memoir", "Orwell, Baldwin, Didion, Oates", "Writing your own feature-length piece"], tags: ["writing", "media"], prereq: "Completion of 4.0 credits", reviews: [] },
{ id: "wrr315h1", code: "WRR315H1", name: "Creative Writing and Territory", category: "b1", desc: "Creative writing rooted in place — classes held outdoors around Toronto.", topics: ["Writing grounded in a specific place", "Guided outdoor writing activities", "Any genre welcome"], tags: ["writing", "creative", "hands-on"], note: "Classes are held outdoors at various locations in Toronto.", prereq: "Completion of 4.0 credits", reviews: [] },
{ id: "wrr316h1", code: "WRR316H1", name: "Developmental and Substantive Editing", category: "b1", desc: "The early stages of editing — content and structure.", topics: ["Assessing content and argument", "Reorganizing a draft", "Explaining edits persuasively"], tags: ["writing"], prereq: "Completion of 4.0 credits", reviews: [] },
{ id: "wrr414h1", code: "WRR414H1", name: "Writing for Social Change", category: "b1", desc: "Writing aimed at changing something.", topics: ["Theories of social change", "Journalism, critical theory, fiction", "A focused final project"], tags: ["writing", "society"], prereq: "Completion of 4.0 credits", reviews: [] },
  // ── b2 (45개) ──
{ id: "cla204h1", code: "CLA204H1", name: "Introduction to Classical Mythology", category: "b2", desc: "Greek and Roman myth.", topics: ["Major myths and their meanings", "Gods, heroes, and monsters", "How myth shaped later culture"], tags: ["history", "stories"], note: "Recommended by askastudent as an accessible breadth 2 option.", reviews: [] },
{ id: "hps100h1", code: "HPS100H1", name: "Introduction to History and Philosophy of Science", category: "b2", desc: "How science developed and what it means to know something scientifically.", topics: ["History of scientific ideas", "Philosophy of scientific method"], tags: ["philosophy", "history"], note: "Recommended by askastudent. Often available online.", reviews: [] },
{ id: "phl200y1", code: "PHL200Y1", name: "Ancient Philosophy", category: "b2", desc: "The foundational texts of Western philosophy.", topics: ["The pre-Socratics", "Plato", "Aristotle", "Post-Aristotelian philosophy"], tags: ["philosophy", "history"], note: "No 200-series PHL course requires a 100-series PHL prerequisite.", reviews: [] },
{ id: "phl201h1", code: "PHL201H1", name: "Introductory Philosophy", category: "b2", desc: "An introduction to philosophy for students with little or no background.", topics: ["Logic", "Theory of knowledge", "Metaphysics", "Ethics", "How the branches connect"], tags: ["philosophy", "beginner"], note: "Explicitly intended for those with little or no philosophy background who have finished Year 1.", reviews: [] },
{ id: "phl325h1", code: "PHL325H1", name: "Early Analytic Philosophy", category: "b2", desc: "Classic texts of early analytic philosophy.", topics: ["Frege", "Russell", "Wittgenstein"], tags: ["philosophy"], prereq: "PHL245H1 (or MAT157Y1), one of PHL232/233/240, plus 7.5 credits with 1.5 in philosophy", reviews: [] },
{ id: "phl327h1", code: "PHL327H1", name: "Ethics and Religion in Sanskrit Philosophy", category: "b2", desc: "Ethics and philosophy of religion in Sanskrit texts (read in translation).", topics: ["Theology and atheism in Sanskrit schools", "Dharmakīrti, Udayana, Rāmānuja", "Śāntideva and epic texts"], tags: ["philosophy", "religion"], prereq: "7.5 credits with 1.5 credits in PHL", reviews: [] },
{ id: "phl328h1", code: "PHL328H1", name: "Metaphysics and Epistemology in Sanskrit Philosophy", category: "b2", desc: "Metaphysics and knowledge in Sanskrit philosophy.", topics: ["The Upaniṣads", "The Mahābhārata", "Buddhist dialogues", "Nyāya and Vaiśeṣika texts"], tags: ["philosophy", "religion"], prereq: "7.5 credits with 1.5 credits in Philosophy", reviews: [] },
{ id: "phl329h1", code: "PHL329H1", name: "Topics in 20th Century Continental Philosophy", category: "b2", desc: "Hermeneutics, phenomenology, critical theory, deconstruction, and more.", topics: ["Adorno, Arendt, Benjamin", "Deleuze, Derrida, Fanon", "Foucault, Freud, Heidegger", "Feminism and post-colonial theory"], tags: ["philosophy"], prereq: "8.0 credits including PHL217H1 and 1.5 more PHL credits", reviews: [] },
{ id: "phl330h1", code: "PHL330H1", name: "Contemporary Continental Philosophy", category: "b2", desc: "Recent debates in Continental philosophy.", topics: ["Agamben, Badiou, Butler", "Derrida, Mbembe, Rancière", "Spivak, Žižek, Wynter"], tags: ["philosophy"], prereq: "8.0 credits including PHL217H1 and 1.5 more PHL credits", reviews: [] },
{ id: "phl331h1", code: "PHL331H1", name: "Metaphysics", category: "b2", desc: "What reality fundamentally is.", topics: ["Substance and existence", "Necessity and possibility", "Causality", "Universals and particulars"], tags: ["philosophy"], prereq: "7.5 credits with 1.5 PHL credits, including logic and one of PHL232/233/240", reviews: [] },
{ id: "phl332h1", code: "PHL332H1", name: "Epistemology", category: "b2", desc: "The theory of knowledge.", topics: ["Truth, belief, justification", "Perception", "A priori knowledge", "Skepticism and other minds"], tags: ["philosophy"], prereq: "PHL232H1/PHL233H1, plus 7.5 courses with 1.5 in philosophy", reviews: [] },
{ id: "phl333h1", code: "PHL333H1", name: "Puzzles and Paradoxes", category: "b2", desc: "Philosophical paradoxes and what they reveal.", topics: ["Time travel", "Truth and infinity", "Rational decision making", "Using logic to resolve paradoxes"], tags: ["philosophy", "logic"], prereq: "7.5 credits with 1.5 in philosophy, plus PHL245H1 (or MAT157Y1)", reviews: [] },
{ id: "phl334h1", code: "PHL334H1", name: "Mind and Language in Chinese Thought", category: "b2", desc: "Philosophy of mind and language in classical China.", topics: ["Names, speech, and 'correcting names'", "Perception and knowledge", "The Analects, Mòzǐ, Zhuāngzǐ"], tags: ["philosophy", "language"], prereq: "7.5 credits with 1.5 PHL credits including PHL237H1", reviews: [] },
{ id: "phl335h1", code: "PHL335H1", name: "Issues in Philosophy of Religion", category: "b2", desc: "Philosophical problems about religious belief.", topics: ["Faith versus belief", "The ontological argument", "Divine transcendence", "The modern critique of religion"], tags: ["philosophy", "religion"], prereq: "7.5 courses with 1.5 in philosophy", reviews: [] },
{ id: "phl337h1", code: "PHL337H1", name: "Classical Chinese Ethics", category: "b2", desc: "Confucian, Mohist, and Daoist ethical ideals.", topics: ["What is the way (dào)?", "What is virtue (dé)?", "The Analects, Mèngzǐ, Dàodéjīng", "Relevance to contemporary ethics"], tags: ["philosophy", "ethics"], prereq: "7.5 credits with 1.5 PHL credits including PHL237H1", reviews: [] },
{ id: "phl338h1", code: "PHL338H1", name: "Jewish Philosophy", category: "b2", desc: "Texts and issues in Jewish philosophy.", topics: ["Maimonides' Guide of the Perplexed", "Buber's The Prophetic Faith", "Prophecy and revelation", "Divine Command and morality"], tags: ["philosophy", "religion"], prereq: "7.5 courses with 1.5 in philosophy", reviews: [] },
{ id: "phl340h1", code: "PHL340H1", name: "Issues in Philosophy of Mind", category: "b2", desc: "What the mind is.", topics: ["Mind-brain identity theory", "Intentionality", "Personal identity"], tags: ["philosophy", "psychology"], prereq: "COG250Y1 or PHL240H1, plus 7.5 courses with 1.5 in philosophy", reviews: [] },
{ id: "phl341h1", code: "PHL341H1", name: "Freedom, Responsibility, and Human Action", category: "b2", desc: "Do we have free will?", topics: ["Human action", "Nature of freedom", "Responsibility and the causation of behaviour"], tags: ["philosophy", "ethics"], prereq: "PHL210Y1/232/233/240, plus 7.5 courses with 1.5 in philosophy", reviews: [] },
{ id: "phl342h1", code: "PHL342H1", name: "Minds and Machines", category: "b2", desc: "Philosophy of AI and cognitive science.", topics: ["Could machines think or be conscious?", "The computational theory of mind", "Embodied cognition", "The 'singularity'", "Ethics of machine learning"], tags: ["philosophy", "coding", "psychology"], prereq: "8.0 credits including COG250Y1 or 1.5 credits in PHL", reviews: [] },
{ id: "phl344h1", code: "PHL344H1", name: "Philosophy of Emotions", category: "b2", desc: "What emotions are and what they're for.", topics: ["What exactly is an emotion?", "How culture shapes emotion", "Emotion versus reason", "Emotions in decision-making", "Can an emotion be morally wrong?"], tags: ["philosophy", "psychology"], prereq: "PHL240/244/342, plus 7.5 courses with 1.5 in philosophy", reviews: [] },
{ id: "phl345h1", code: "PHL345H1", name: "Intermediate Logic", category: "b2", desc: "First-order logic and basic metalogic.", topics: ["Soundness and completeness", "Basic set theory", "Löwenheim-Skolem theorems", "Gödel's incompleteness theorems"], tags: ["philosophy", "logic"], prereq: "PHL245H1 (or MAT157Y1) and a full course in PHL/CSC/MAT — no other philosophy or math background needed", reviews: [] },
{ id: "phl347h1", code: "PHL347H1", name: "Modal Logic and Philosophical Applications of Logic", category: "b2", desc: "The logic of necessity and possibility.", topics: ["Possible-worlds semantics", "Metaphysics of modality", "Counterfactuals, vagueness", "Epistemic and temporal logic"], tags: ["philosophy", "logic"], prereq: "PHL245H1 (or MAT157Y1) and a full course in PHL/CSC/MAT", reviews: [] },
{ id: "phl348h1", code: "PHL348H1", name: "Logic and Computation", category: "b2", desc: "Gödel's incompleteness theorems and their meaning.", topics: ["How the theorems are proved", "Relation to the theory of computation", "Are there unknowable mathematical truths?", "Limits of formal modelling"], tags: ["philosophy", "logic", "coding"], prereq: "PHL245H1 (or MAT157Y1) and a full course in PHL/CSC/MAT", reviews: [] },
{ id: "phl349h1", code: "PHL349H1", name: "Set Theory", category: "b2", desc: "Set theory as a foundation for mathematics and logic.", topics: ["Paradoxes of 'naïve' set theory", "Building numbers from sets", "The axiom of choice", "Model theory"], tags: ["philosophy", "logic", "math"], prereq: "PHL245H1 (or MAT157Y1) and a full course in PHL/CSC/MAT", reviews: [] },
{ id: "phl351h1", code: "PHL351H1", name: "Philosophy of Language", category: "b2", desc: "How language means anything at all.", topics: ["Theories of meaning", "Language and the world", "Language and the mind"], tags: ["philosophy", "language"], prereq: "PHL245H1, one of PHL232/233/240, plus 7.5 courses with 1.5 in philosophy", reviews: [] },
{ id: "phl354h1", code: "PHL354H1", name: "Philosophy of Mathematics", category: "b2", desc: "What mathematical objects actually are.", topics: ["Platonism versus nominalism", "Logic and mathematics", "Implications of Gödel's theorem", "Formalism and intuitionism"], tags: ["philosophy", "math"], prereq: "PHL245H1 (or MAT157Y1) and a full course in PHL/CSC/MAT", reviews: [] },
{ id: "phl355h1", code: "PHL355H1", name: "Philosophy of Natural Science", category: "b2", desc: "How science works and whether it gets at truth.", topics: ["Scientific explanation", "Methodology", "Realism versus instrumentalism"], tags: ["philosophy", "science"], prereq: "7.5 credits including PHL255H1 + 1.0 PHL credit, or 1.5 PHL credits + HPS250H1", reviews: [] },
{ id: "phl357h1", code: "PHL357H1", name: "Philosophy of Biology", category: "b2", desc: "Conceptual puzzles at the foundation of biology.", topics: ["What is life?", "Controversies about natural selection", "Units of selection", "The problem of species", "Genetics and reductionism", "Sociobiology and artificial life"], tags: ["philosophy", "biology"], prereq: "7.5 credits including either philosophy of science courses, or 1.5 credits in life-science subjects", reviews: [] },
{ id: "phl358h1", code: "PHL358H1", name: "Philosophy of Psychiatry", category: "b2", desc: "Where philosophy and psychiatry meet.", topics: ["What makes something a psychiatric disease?", "What syndromes reveal about mood and decision-making", "Agency and moral or criminal responsibility"], tags: ["philosophy", "psychology", "health"], prereq: "8.0 credits including 1.5 PHL credits, or 1.0 PHL credit and PSY240H1", reviews: [] },
{ id: "phl362h1", code: "PHL362H1", name: "Philosophy of History", category: "b2", desc: "Does history have meaning or direction?", topics: ["Can there be general theories of history?", "Is history deterministic?", "Must historians make value judgements?", "Is history a science or an art?"], tags: ["philosophy", "history"], prereq: "7.5 courses with 1.5 in philosophy", reviews: [] },
{ id: "phl365h1", code: "PHL365H1", name: "Political Philosophy", category: "b2", desc: "Central problems of political philosophy.", topics: ["Historical political theorists", "Contemporary political theory"], tags: ["philosophy", "society"], prereq: "PHL265H1 or POL200Y1, plus 7.5 courses with 1.5 in philosophy", reviews: [] },
{ id: "phl366h1", code: "PHL366H1", name: "Topics in Political Philosophy", category: "b2", desc: "A focused look at one issue in political philosophy.", tags: ["philosophy", "society"], prereq: "PHL265H1 or POL200Y1, plus 7.5 courses with 1.5 in philosophy", reviews: [] },
{ id: "phl367h1", code: "PHL367H1", name: "Philosophy of Feminism", category: "b2", desc: "Issues and topics in feminist philosophy.", tags: ["philosophy", "society"], prereq: "PHL265H1 or PHL268H1, plus 7.5 courses with 1.5 in philosophy", reviews: [] },
{ id: "psy475h1", code: "PSY475H1", name: "Attention and Performance", category: "b2", desc: "How attention and visual cognition work.", topics: ["Attention and working memory", "Spatial cognition", "Processing features and objects", "Eye and limb movement control"], tags: ["psychology"], prereq: "A stats course (PSY201H1 or equivalent) and PSY270H1/COG250Y1 or PSY280H1", reviews: [] },
{ id: "psy495h1", code: "PSY495H1", name: "Sex and the Brain", category: "b2", desc: "The science behind claims that sex, orientation, and gender identity are brain-based.", topics: ["The making of sex", "Hormone action", "Brain-based sexual behaviours", "Sex and cognition", "Close reading of original research papers"], tags: ["psychology", "society", "health"], prereq: "A stats course and PSY290H1/HMB200H1/PSL300H1", reviews: [] },
{ id: "ren340h1", code: "REN340H1", name: "Travel, Trade, and Difference in the Renaissance World", category: "b2", desc: "When the world first became truly global.", topics: ["Cross-cultural encounters between Asia, Africa, the Americas, Europe", "Trade networks and imperial expansion", "How power structures shaped early globalization", "Race, class, religion, and gender"], tags: ["history", "society"], prereq: "Recommended: REN240Y1", reviews: [] },
{ id: "ren341h1", code: "REN341H1", name: "The Self and Society: Women, Men and Children", category: "b2", desc: "How the idea of the 'self' changed during the Renaissance.", topics: ["Erasmus and Rabelais", "Marguerite de Navarre", "Castiglione and Machiavelli"], tags: ["history", "literature"], note: "A 300-level course with no prerequisites \u2014 open to anyone.", reviews: [] },
{ id: "wrr103h1", code: "WRR103H1", name: "Introduction to Academic Writing", category: "b2", desc: "Writing at the university level, from the ground up.", topics: ["Critical reading", "Written communication", "Writing projects in different genres"], tags: ["writing", "beginner"], reviews: [] },
{ id: "wrr104h1", code: "WRR104H1", name: "Writing Reports", category: "b2", desc: "How to write reports, abstracts, and literature reviews.", topics: ["Abstracts and literature reviews", "Qualitative and quantitative research", "Tables, charts, and graphs", "A formal report and poster presentation"], tags: ["writing"], reviews: [] },
{ id: "wrr306h1", code: "WRR306H1", name: "Writing About Plants and the Environment", category: "b2", desc: "Rhetoric applied to plants, land, and environmental justice.", topics: ["Indigenous knowledge about plants", "Urban tree coverage and inequality", "Community gardening and forest bathing", "Podcasts, video essays, and field trips"], tags: ["writing", "environment"], prereq: "Completion of 4.0 credits", reviews: [] },
{ id: "wrr307h1", code: "WRR307H1", name: "Rhetoric of Health and Medicine", category: "b2", desc: "How persuasion works in health research and pharmaceutical advertising.", topics: ["Medicalized phenomena and influence", "Pharmaceutical advertising", "Health narratives and media"], tags: ["writing", "health"], prereq: "Completion of 4.0 credits", reviews: [] },
{ id: "wrr314h1", code: "WRR314H1", name: "Style in Creative, Professional, and Academic Writing", category: "b2", desc: "Style across three very different kinds of writing.", topics: ["Storytelling in non-fiction", "AI-assisted professional writing", "Academic blogs and research on social media"], tags: ["writing"], prereq: "Completion of 4.0 credits", reviews: [] },
{ id: "wrr319h1", code: "WRR319H1", name: "Rhetoric of Race", category: "b2", desc: "Communication and rhetoric through critical race studies.", topics: ["Black and Indigenous scholarship on communication", "Rhetoric of sovereignty", "Colonialism and systemic prejudice"], tags: ["writing", "society"], prereq: "Completion of 4.0 credits", reviews: [] },
{ id: "phl245h1", code: "PHL245H1", name: "Modern Symbolic Logic", category: "b2", desc: "A rigorous introduction to formal deductive logic.", topics: ["Semantics and symbolization in sentential logic", "Natural deduction techniques", "Monadic and polyadic predicate logic", "Advanced first-order logic concepts"], tags: ["philosophy", "logic"], note: "No prerequisite \u2014 open to anyone. Also satisfies the prereq for several other logic courses.", reviews: [] },
{ id: "psy370h1", code: "PSY370H1", name: "Thinking and Reasoning", category: "b2", desc: "How people actually think \u2014 problem-solving, reasoning, and creativity.", topics: ["Problem-solving as directed thinking", "Conceptual behaviour and mental representation", "Induction, deduction, and learning", "Probabilistic and creative reasoning"], tags: ["psychology"], prereq: "PSY201H1 (or equivalent stats course), plus PSY270H1/COG250Y1", reviews: [] },
  // ── b3 (15개) ──
{ id: "psy100h1", code: "PSY100H1", name: "Introductory Psychology", category: "b3", desc: "The standard first course in psychology.", topics: ["How the mind and behaviour work", "Major areas of psychology research"], tags: ["psychology", "beginner"], note: "One of the most popular breadth choices at U of T.", reviews: [] },
{ id: "ren242h1", code: "REN242H1", name: "Scientific Worldviews of the Renaissance", category: "b3", desc: "How people understood the natural world before modern science.", topics: ["Natural philosophy and cosmology", "Astronomy, optics, medicine", "Free will versus determinism", "Finite versus infinite universe", "Theism and deism"], tags: ["history", "science", "philosophy"], prereq: "Recommended: 4.0 credits completed", reviews: [] },
{ id: "ren338h1", code: "REN338H1", name: "Renaissance in the City", category: "b3", desc: "One Renaissance city, examined from every angle.", topics: ["History, art, and architecture", "Literature and music", "How local politics shaped culture"], tags: ["history", "art"], prereq: "Recommended: REN240Y1 or another Renaissance Studies course", reviews: [] },
{ id: "ren343h1", code: "REN343H1", name: "Sex and Gender", category: "b3", desc: "Gender and sexuality in early modern Europe.", topics: ["Representations of sexual drive", "Gender roles of men and women", "Varieties of sexual experience in art and literature"], tags: ["history", "society"], note: "A 300-level course with no prerequisites \u2014 open to anyone.", reviews: [] },
{ id: "wrr313h1", code: "WRR313H1", name: "Visual Rhetoric", category: "b3", desc: "How images and objects persuade viewers.", topics: ["The 'language' of visual display", "How objects carry meaning", "Museum and exhibition analysis", "Ceramics, jewellery, architecture, fashion"], tags: ["art", "writing"], prereq: "Completion of 4.0 credits", reviews: [] },
{ id: "eco101h1", code: "ECO101H1", name: "Principles of Microeconomics", category: "b3", desc: "An introduction to how prices, markets, and public policy actually work.", topics: ["Price determination through supply and demand", "Market structure and competition", "Decision-making by individuals and firms", "Public policy applications"], tags: ["society", "business"], note: "No U of T prerequisite \u2014 open to first-years. Heavy use of graphs and quantitative reasoning.", reviews: [] },
{ id: "eco102h1", code: "ECO102H1", name: "Principles of Macroeconomics", category: "b3", desc: "The economy as a whole \u2014 growth, money, trade, and government policy.", topics: ["International trade and finance", "The banking system and money supply", "Monetary and fiscal policy"], tags: ["society", "business"], prereq: "ECO101H1", reviews: [] },
{ id: "eco200y1", code: "ECO200Y1", name: "Microeconomic Theory", category: "b3", desc: "A full-year, more rigorous follow-up to intro microeconomics.", topics: ["Theory of markets and prices", "Household and firm decision-making", "How the price system allocates goods in a market economy"], tags: ["society", "business", "math"], prereq: "ECO101H1 + ECO102H1 (63%) or ECO105Y1 (80%), plus a calculus course (e.g. MAT137Y1)", reviews: [] },
{ id: "eco220y1", code: "ECO220Y1", name: "Introduction to Data Analysis and Applied Econometrics", category: "b3", desc: "Learn to analyze real data and interpret statistical results, Excel-based.", topics: ["Data description and sampling", "Probability and statistical inference", "Simple and multiple regression analysis", "Replicating real economics research in Excel"], tags: ["society", "math"], prereq: "ECO101H1 + ECO102H1 (63%) or ECO105Y1 (80%), plus a calculus course (e.g. MAT137Y1)", reviews: [] },
{ id: "eco375h1", code: "ECO375H1", name: "Applied Econometrics I", category: "b3", desc: "Hands-on regression analysis applied to real economic questions and data.", topics: ["Statistical foundations of multiple regression", "Cross-sectional data analysis", "Using statistical software on real datasets", "Identifying causality and common statistical pitfalls"], tags: ["society", "math"], prereq: "ECO200Y1/ECO204Y1/ECO206Y1, plus ECO220Y1 or a stats course", reviews: [] },
{ id: "eco466h1", code: "ECO466H1", name: "Empirical Microeconomics", category: "b3", desc: "Building macro/policy forecasting skills on top of earlier econometrics courses.", topics: ["Monetary policy conduct", "Central bank general equilibrium models", "Predicting key macroeconomic variables", "Group presentations on current economic issues"], tags: ["society", "math"], prereq: "ECO208Y1/ECO209Y1/ECO202Y1/ECO325H1, plus ECO374H1 or ECO375H1", reviews: [] },
{ id: "his311h1", code: "HIS311H1", name: "Canada in the World", category: "b3", desc: "How Canada's relationships with the rest of the world have been built, from the 1400s to today.", topics: ["Treaties, trade agreements, and alliances", "Informal traditions and cultural ties", "Military, political, economic, and immigration policy", "15th century to the turn of the 21st century"], tags: ["history", "society"], note: "No hard prerequisite \u2014 a course in Canadian history or politics is recommended, not required.", reviews: [] },
{ id: "rsm219h1", code: "RSM219H1", name: "Introduction to Financial Accounting", category: "b3", desc: "How to read and prepare basic financial statements, using real companies as examples.", topics: ["Decision-making from financial statements", "Interpreting real-world company reports", "Preparing a basic set of financial statements"], tags: ["business"], note: "\u26a0\ufe0f Offered through Rotman Commerce \u2014 normally taken by Commerce students in first year. Confirm with Rotman Commerce whether non-Commerce students can enrol before counting on this.", reviews: [] },
{ id: "rsm222h1", code: "RSM222H1", name: "Introduction to Management Accounting", category: "b3", desc: "How companies use cost data to make decisions and control operations.", topics: ["Conceptual and analytical foundations of management accounting", "Costing systems", "Using cost information for business decisions and performance evaluation"], tags: ["business"], note: "\u26a0\ufe0f Offered through Rotman Commerce. Confirm with Rotman Commerce whether non-Commerce students can enrol before counting on this.", reviews: [] },
{ id: "rsm430h1", code: "RSM430H1", name: "Fixed Income Securities", category: "b3", desc: "How bond markets work, using real-time data in the Rotman trading lab.", topics: ["Traditional bond and term structure concepts", "Government participation in fixed income markets", "Hands-on work in the Rotman Financial Research & Trading Lab"], tags: ["business", "math"], prereq: "RSM219H1, RSM222H1", note: "\u26a0\ufe0f Offered through Rotman Commerce, upper-year \u2014 requires completing RSM219H1 and RSM222H1 first.", reviews: [] },
  // ── b4 (11개) ──
{ id: "eeb202h1", code: "EEB202H1", name: "Evolution and Society", category: "b4", desc: "Evolution explained for students with no science background.", topics: ["Evidence supporting the fact of evolution", "How species form", "The evolution of sex", "Infanticide and disease"], tags: ["biology", "beginner", "no-math"], note: "The calendar states this is 'for non-science students in all years and disciplines.'", reviews: [] },
{ id: "eeb215h1", code: "EEB215H1", name: "Conservation Biology", category: "b4", desc: "The science of protecting threatened species and habitats.", topics: ["Threatened species", "Habitat loss", "Conservation science"], tags: ["biology", "environment"], reviews: [] },
{ id: "eeb240h1", code: "EEB240H1", name: "Ecology and Environmental Biology", category: "b4", desc: "How organisms, populations, and ecosystems affect each other.", topics: ["Organisms, populations, communities, ecosystems", "Human impact on environmental conditions", "Global change and biological diversity", "Aquatic and terrestrial ecosystems", "Field trips and labs — includes one mandatory weekend day trip"], tags: ["biology", "environment", "hands-on"], reviews: [] },
{ id: "psy480h1", code: "PSY480H1", name: "Seminar in Perception", category: "b4", desc: "Current debates in how we perceive the world.", topics: ["Perceptual organization", "Object and face recognition", "Motion perception"], tags: ["psychology"], prereq: "A stats course and PSY280H1. Capacity 20 — PSY Specialists get priority", reviews: [] },
{ id: "psy490h1", code: "PSY490H1", name: "Seminar in Behavioural Neuroscience", category: "b4", desc: "Current issues in behavioural neuroscience.", topics: ["Activity of neurons", "Sensory and motor systems", "Motivational and higher cortical systems"], tags: ["psychology", "biology"], prereq: "A stats course and PSY290H1/HMB200H1/PSL300H1. Capacity 20 — PSY Specialists get priority", reviews: [] },
{ id: "psy492h1", code: "PSY492H1", name: "Neurobiology of Learning and Memory", category: "b4", desc: "How the brain stores information and turns it into behaviour.", topics: ["How the nervous system acquires information", "Neural basis of learning", "Neural basis of memory"], tags: ["psychology", "biology"], prereq: "A stats course and PSY260H1 or PSY290H1/HMB200H1/PSL300H1", reviews: [] },
{ id: "psy493h1", code: "PSY493H1", name: "Cognitive Neuroscience", category: "b4", desc: "A capstone course on how the mind arises from the brain.", topics: ["From single neurons to billions", "Recognizing a face", "Remembering childhood", "Understanding spoken words", "Reading primary research literature"], tags: ["psychology", "biology"], prereq: "A stats course and one of PSY260H1, PSY270H1/COG250Y1, or PSY290H1", reviews: [] },
{ id: "psy494h1", code: "PSY494H1", name: "Physiology and Psychology of Emotion", category: "b4", desc: "The role of brain and body in emotion.", topics: ["Experimental approaches", "Physiological approaches", "Theoretical and clinical literatures"], tags: ["psychology", "health"], prereq: "A stats course and one of PSY260H1, PSY270H1/COG250Y1, or PSY290H1", reviews: [] },
{ id: "psy496h1", code: "PSY496H1", name: "Cognitive Dysfunction in Neurological Disorders", category: "b4", desc: "Cognitive impairment in Alzheimer's, Parkinson's, and schizophrenia.", topics: ["Alzheimer's Disease", "Parkinson's Disease", "Schizophrenia", "How impairments map onto neuropsychological models"], tags: ["psychology", "health"], prereq: "A stats course and PSY270H1/COG250Y1 or PSY290H1/HMB200H1/PSL300H1", reviews: [] },
{ id: "psy497h1", code: "PSY497H1", name: "Seminar in Biological Timing", category: "b4", desc: "Body clocks and why timing matters in living things.", topics: ["Clocks and oscillations in physiology", "Timing in sensorimotor integration", "Timing in memory and decision making", "Health implications"], tags: ["psychology", "biology", "health"], prereq: "A stats course and PSY290H1/HMB200H1/PSL300H1. Capacity 20 — PSY Specialists get priority", reviews: [] },
{ id: "bio120h1", code: "BIO120H1", name: "Adaptation and Biodiversity", category: "b4", desc: "The first-year foundation course for life sciences \u2014 evolution and ecology.", topics: ["Genetic diversity and natural selection", "Speciation", "Population and community ecology", "Conservation, extinction, and global environmental change"], tags: ["biology"], prereq: "Grade 12 Biology or equivalent", note: "Includes a lab (lab coat required, $26 materials fee).", reviews: [] },
  // ── b5 (31개) ──
{ id: "act100h1", code: "ACT100H1", name: "Wizard Managers of Risks: Exploring Actuarial Science", category: "b5", desc: "First-year intro to risk and insurance — only high school math needed.", topics: ["Where math, finance, and risk meet", "Actuarial principles", "Real-world case studies"], tags: ["business", "beginner"], note: "Only high school math required.", reviews: [] },
{ id: "ast101h1", code: "AST101H1", name: "The Sun and Its Neighbours", category: "b5", desc: "Our place in the Universe, built for students with no science background.", topics: ["Phenomena we see in the sky", "The Sun, planets, and comets", "How the solar system formed", "What makes a planet suitable for life", "Nearby stars and their planets"], tags: ["space", "no-math", "beginner"], note: "Recommended by U of T's askastudent as a light, non-math option for humanities students.", reviews: [] },
{ id: "ast198h1", code: "AST198H1", name: "Great Astronomical Issues", category: "b5", desc: "First-year seminar on the biggest questions humans have asked about the sky.", topics: ["Where did it all begin?", "Are we alone?", "Origin of the elements and of Earth", "Extinction of the dinosaurs", "Global warming and the scientific method"], tags: ["space", "seminar", "first-year-only"], note: "Restricted to first-years. Small seminar format — askastudent recommends these as the easiest breadth options.", reviews: [] },
{ id: "ast199h1", code: "AST199H1", name: "Astronomy at the Frontier", category: "b5", desc: "First-year seminar on current topics in astronomy and space science.", topics: ["How stars form, live, and die", "White dwarfs, neutron stars, black holes", "Planets around other stars", "Dark energy and dark matter", "Age and future of the universe"], tags: ["space", "seminar", "first-year-only"], note: "Restricted to first-years. askastudent specifically plugged this course as a great breadth 5 pick.", reviews: [] },
{ id: "ast201h1", code: "AST201H1", name: "Stars and Galaxies", category: "b5", desc: "Life cycles of stars and galaxies — also intended for students with no science background.", topics: ["Properties and life cycles of stars", "How galaxies work", "The Universe itself", "How astronomers measure vast distances and time"], tags: ["space", "no-math", "beginner"], reviews: [] },
{ id: "ast210h1", code: "AST210H1", name: "Great Moments in Astronomy", category: "b5", desc: "The history of astronomical discovery, from Copernicus to modern astrophysics.", topics: ["The Copernican Revolution", "Twentieth century astrophysics", "How major discoveries actually happened", "Unsolved puzzles in astronomy today"], tags: ["space", "history", "no-math"], reviews: [] },
{ id: "ast251h1", code: "AST251H1", name: "Life on Other Worlds", category: "b5", desc: "Is there life elsewhere in the universe? A scholarly look at the odds.", topics: ["Origin and evolution of the universe", "How the solar system and life began", "Techniques for searching for life", "Interstellar travel and space colonies"], tags: ["space", "beginner"], reviews: [] },
{ id: "ast301h1", code: "AST301H1", name: "Observational Astronomy", category: "b5", desc: "Hands-on telescope work for students without a science background.", topics: ["How telescopes actually work", "Lab exercises and sky observations", "Measuring distance, motion, and chemical makeup", "Basic arithmetic only — no advanced math"], tags: ["space", "hands-on", "no-math"], note: "Explicitly built for students without a formal science background.", prereq: "AST101H1, AST201H1, or AST251H1", reviews: [] },
{ id: "phl356h1", code: "PHL356H1", name: "Philosophy of Physics", category: "b5", desc: "Philosophical puzzles raised by relativity and quantum mechanics.", topics: ["Relativity", "Quantum mechanics", "Philosophical challenges modern physics poses"], tags: ["philosophy", "science"], note: "Accessible to students without a significant physics background — one MAT/PHY course required.", prereq: "One full course in MAT or PHY (two recommended)", reviews: [] },
{ id: "phy100h1", code: "PHY100H1", name: "The Magic of Physics", category: "b5", desc: "Physics for people who aren't scientists — no math or physics background needed.", topics: ["How physicists unravel the universe's secrets", "Elementary classical physics is reviewed as needed", "Two lectures and one tutorial per week", "Small-group tutorials to pursue your own interests"], tags: ["science", "no-math", "beginner"], note: "The calendar states this is primarily a Breadth Requirement course for Humanities and Social Science students. ⚠️ Anyone with university-level physics credit (including high school transfer credit) cannot take it.", reviews: [] },
{ id: "phy207h1", code: "PHY207H1", name: "Physics of Music", category: "b5", desc: "The science behind sound and music — an online course for non-science students.", topics: ["Oscillations and waves", "Human hearing and music perception", "Musical scales and instruments", "Recording and storing sound digitally", "Producing sound and broadcasting"], tags: ["science", "music", "no-math", "beginner"], note: "Online, but tutorials require live webinars and the final exam is written on the St. George campus. ⚠️ Not open to students with university-level physics credit.", reviews: [] },
{ id: "csc108h1", code: "CSC108H1", name: "Introduction to Computer Programming", category: "b5", desc: "Learn to program in a language like Python — no experience needed.", topics: ["Elementary data types, lists, and maps", "Control flow, functions, classes, and objects", "Algorithms: searching, sorting, and complexity", "Unit testing and floating-point computation"], tags: ["coding", "beginner"], note: "No prior programming experience required. One of the most common breadth 5 picks.", reviews: [] },
{ id: "mat137y1", code: "MAT137Y1", name: "Calculus with Proofs", category: "b5", desc: "A full-year, proof-based calculus course for students with a serious interest in math.", topics: ["Limits, continuity, and the mean value theorem", "Differentiation and integration", "Elementary transcendental functions", "Taylor's theorem, sequences, and series"], tags: ["math"], prereq: "High school level calculus", note: "Useful prep for later courses in CS, economics, math, physics, or statistics.", reviews: [] },
{ id: "sta130h1", code: "STA130H1", name: "An Introduction to Statistical Reasoning and Data Science", category: "b5", desc: "How statistical reasoning is used to tackle real problems across science, health, tech, and policy.", topics: ["Data collection, analysis, and interpretation", "Statistical computation and simulation", "Communicating statistical findings"], tags: ["math", "coding"], prereq: "Corequisite: a calculus course (e.g. MAT137Y1) and a first programming course (e.g. CSC108H1)", note: "⚠️ Restricted to first-year students — plan to take it in year one if you want it.", reviews: [] },
{ id: "csc148h1", code: "CSC148H1", name: "Introduction to Computer Science", category: "b5", desc: "The natural follow-on to CSC108H1 \u2014 data structures and object-oriented programming.", topics: ["Abstract data types and linked data structures", "Encapsulation and information-hiding", "Object-oriented programming", "Analyzing the efficiency of programs", "Recursion"], tags: ["coding"], prereq: "CSC108H1 (or equivalent programming experience)", reviews: [] },
{ id: "mat157y1", code: "MAT157Y1", name: "Analysis I", category: "b5", desc: "A rigorous, proof-heavy alternative to MAT137Y1 for students who want the theory in full.", topics: ["Limits, continuity, and least upper bounds", "Derivatives and the mean value theorem", "Integrals and the fundamental theorem", "Taylor's theorem, sequences, and series"], tags: ["math"], prereq: "High school level calculus", note: "More theoretical/demanding than MAT137Y1 \u2014 choose this if you want maximum rigour.", reviews: [] },
{ id: "mat223h1", code: "MAT223H1", name: "Linear Algebra I", category: "b5", desc: "A first course on linear algebra in R^n, blending algebra and geometry.", topics: ["Systems of equations and Gaussian elimination", "Vectors, subspaces, and change of basis", "Rank, nullity, and matrix inverses", "Determinants, eigenvectors, and diagonalization"], tags: ["math"], prereq: "High school level calculus", reviews: [] },
{ id: "mat237y1", code: "MAT237Y1", name: "Multivariable Calculus with Proofs", category: "b5", desc: "A full-year, proof-based follow-up to first-year calculus.", topics: ["Differential calculus of vector-valued functions", "Optimization and Lagrange multipliers", "Integral calculus and change of variables", "Green's, Divergence, and Stokes' theorems"], tags: ["math"], prereq: "MAT137Y1 or MAT157Y1, plus MAT223H1", reviews: [] },
{ id: "mat327h1", code: "MAT327H1", name: "Introduction to Topology", category: "b5", desc: "An introduction to how mathematicians formalize the idea of \u2018closeness\u2019 and shape.", topics: ["Metric and topological spaces", "Separation, compactness, connectedness", "Fundamental group and covering spaces", "The Brouwer fixed-point theorem"], tags: ["math"], prereq: "MAT157Y1, plus MAT237Y1 or MAT246H1", reviews: [] },
{ id: "sta237h1", code: "STA237H1", name: "Probability, Statistics and Data Analysis I", category: "b5", desc: "An introduction to probability using both simulation and mathematical frameworks.", topics: ["Probability spaces and random variables", "Discrete and continuous distributions", "Expectation, variance, and independence", "The law of large numbers and central limit theorem"], tags: ["math"], prereq: "A calculus course (e.g. MAT137Y1)", reviews: [] },
{ id: "sta302h1", code: "STA302H1", name: "Methods of Data Analysis I", category: "b5", desc: "A hands-on introduction to regression analysis.", topics: ["Correlation and regression models using least squares", "Confidence and prediction intervals", "Diagnostics and variable selection", "Interactions and dummy variables"], tags: ["math", "coding"], prereq: "A stats course, a programming course (e.g. CSC108H1), and MAT223H1", reviews: [] },
{ id: "chm135h1", code: "CHM135H1", name: "Chemistry: Physical Principles", category: "b5", desc: "First-year chemistry for students who want the fundamentals without a heavy course load.", topics: ["Structure of matter: gases, liquids, solids", "Phase equilibria and phase diagrams", "Chemical equilibria and electrochemistry", "Reaction kinetics and intro thermodynamics"], tags: ["science"], note: "Paired with CHM136H1 for students in Life/Health Sciences who don't need a heavy chemistry load. Can't be taken in the same term as CHM136H1.", reviews: [] },
{ id: "chm136h1", code: "CHM136H1", name: "Introductory Organic Chemistry I", category: "b5", desc: "An introduction to organic chemistry \u2014 structure, bonding, and reactivity.", topics: ["Structure, bonding, and reactivity of organic molecules", "Structural identification", "Fundamentals of chemical reactivity"], tags: ["science"], note: "Can't be taken in the same term as CHM135H1.", reviews: [] },
{ id: "phy131h1", code: "PHY131H1", name: "Introduction to Physics I", category: "b5", desc: "A first university physics course, built for students not majoring in physical or math sciences.", topics: ["Classical kinematics and dynamics", "Momentum, energy, force, and friction", "Work, power, and angular momentum", "Oscillations, waves, and sound"], tags: ["science"], note: "No prerequisite \u2014 open to anyone.", reviews: [] },
{ id: "csc207h1", code: "CSC207H1", name: "Software Design", category: "b5", desc: "Software design and development using a statically-typed OO language like Java.", topics: ["Version control and unit testing", "Refactoring and object-oriented design", "Design patterns", "Advanced IDE usage, regular expressions, reflection"], tags: ["coding"], prereq: "60%+ in CSC148H1 (or CSC111H1)", note: "\u26a0\ufe0f Effectively CS-track \u2014 needs CSC108H1 then CSC148H1 completed first.", reviews: [] },
{ id: "csc236h1", code: "CSC236H1", name: "Introduction to the Theory of Computation", category: "b5", desc: "Logic and proof techniques applied to computer science.", topics: ["Mathematical induction", "Correctness proofs for iterative and recursive algorithms", "Recurrence equations and their solutions", "Automata and formal languages"], tags: ["coding", "math", "logic"], prereq: "60%+ in CSC148H1, plus 60%+ in CSC165H1 (or CSC111H1)", note: "\u26a0\ufe0f Effectively CS-track \u2014 needs two prior CS courses.", reviews: [] },
{ id: "csc301h1", code: "CSC301H1", name: "Introduction to Software Engineering", category: "b5", desc: "Agile development for real, team-sized software projects.", topics: ["Requirements elicitation and tracking", "Estimation and prioritization", "Basic modelling, design patterns, refactoring", "Ethics and professional responsibility"], tags: ["coding"], prereq: "CSC209H1, plus one of CSC263H1/CSC265H1/CSC309H1/CSC343H1 as corequisite", note: "\u26a0\ufe0f Effectively CS-track \u2014 needs several prior CS courses.", reviews: [] },
{ id: "csc373h1", code: "CSC373H1", name: "Algorithm Design, Analysis, and Complexity", category: "b5", desc: "Standard techniques for designing and analyzing algorithms.", topics: ["Divide-and-conquer, greedy strategies, dynamic programming", "Linear programming and network flows", "Randomization and approximation algorithms", "Intro to NP-completeness"], tags: ["coding", "math"], prereq: "CSC263H1 or CSC265H1", note: "\u26a0\ufe0f Effectively CS-track \u2014 needs the CS data structures course first.", reviews: [] },
{ id: "csc413h1", code: "CSC413H1", name: "Neural Networks and Deep Learning", category: "b5", desc: "An introduction to how modern neural networks are built and trained.", topics: ["Backpropagation and automatic differentiation", "Convolutional and recurrent network architectures", "Optimization and generalization methods", "Unsupervised and reinforcement learning"], tags: ["coding", "math"], prereq: "CSC311H1 or STA314H1, plus multivariable calculus and linear algebra", note: "\u26a0\ufe0f Advanced CS/stats course \u2014 needs an intro machine-learning course plus upper-year math first.", reviews: [] },
{ id: "csc488h1", code: "CSC488H1", name: "Compilers and Interpreters", category: "b5", desc: "Build a working compiler from scratch, start to finish.", topics: ["Scanning with regular expressions", "Parsing with context-free grammars", "Semantic analysis and runtime organization", "Code generation and optimization"], tags: ["coding"], prereq: "CSC258H1, CSC324H1, and CSC263H1/CSC265H1", note: "\u26a0\ufe0f Deep in the CS-major sequence \u2014 needs three prior CS courses.", reviews: [] },
{ id: "sta414h1", code: "STA414H1", name: "Statistical Methods for Machine Learning II", category: "b5", desc: "The probabilistic foundations underneath machine learning methods.", topics: ["Naive Bayes, mixture models, logistic regression", "Gradient-based fitting including neural nets", "Exact inference and stochastic variational inference", "Variational autoencoders and GANs"], tags: ["math", "coding"], prereq: "CSC311H1 or STA314H1 (an intro machine-learning course)", note: "\u26a0\ufe0f Advanced \u2014 needs an intro ML/stats course first.", reviews: [] },
];


/* ============================================
   전공 탐색용: 단과대(Faculty) → 과(Program) 구조

   출처
     Computer Science Specialist: fas.calendar.utoronto.ca (공식 학사요람)
     Rotman Commerce           : rotmancommerce.utoronto.ca/future-students (공식)
   확인일: 2026-08-25

   ⚠️ 아직 2개 과만 들어있습니다. 실제로는 수백 개 과가 있어요.
      새 과를 추가하려면 COURSE_PROGRAMS 에 한 덩어리 더 넣고
      facultyId 를 아래 COURSE_FACULTIES 중 하나와 맞추면 됩니다.
      새 단과대가 필요하면 COURSE_FACULTIES 에 먼저 추가하세요.
   ============================================ */

/* ============================================
   캠퍼스 구조: St. George 학부 직접입학(First-Entry) 단과대 5개

   출처: 사용자 제공 자료 (utoronto.ca, future.utoronto.ca, ouac.on.ca 기준)
   확인일: 2026-08

   ⚠️ Rotman Commerce는 별도 단과대가 아닙니다.
      Faculty of Arts & Science 안의 입학 카테고리 6개 중 하나입니다.
      (학생 신분은 어디까지나 Arts & Science 소속)
   ============================================ */

const COURSE_FACULTIES = [
  {
    id: "as",
    name: "Arts & Science",
    desc: "The largest faculty. Admits by 6 broad categories, not by department.",
    color: "#7A3FA0"
  },
  {
    id: "engineering",
    name: "Applied Science & Engineering",
    desc: "Engineering \u2014 nicknamed \"Skule\"",
    color: "#0B4DA0"
  },
  {
    id: "daniels",
    name: "Architecture, Landscape & Design",
    desc: "John H. Daniels Faculty",
    color: "#C05A16"
  },
  {
    id: "music",
    name: "Music",
    desc: "Audition required",
    color: "#7A3FA0"
  },
  {
    id: "kinesiology",
    name: "Kinesiology & Physical Education",
    desc: "",
    color: "#0F7A4D"
  }
];


/* ---- Arts & Science 안 6개 입학 카테고리 ----
   신입생은 학과가 아니라 이 6개 중 하나로 지원합니다.
   실제 학과(POSt)는 1학년을 마친 뒤 별도로 신청합니다.

   "advantage" 는 공식 문서에 그대로 나온 문장이 아니라,
   지금까지 정리한 학과별 자료를 바탕으로 제가 종합한 설명입니다.
   참고용으로만 보고, 확실한 건 각 학과 페이지에서 다시 확인하세요. */

const COURSE_ADMISSION_CATEGORIES = [
  {
    id: "humanities",
    name: "Humanities",
    emoji: "\uD83D\uDCDA",
    color: "#7A3FA0",
    desc: "Languages, literature, philosophy, history, and the arts.",
    advantage: "Widest open-enrolment access \u2014 most Humanities departments have no minimum grade, so moving between majors in 2nd year is usually easy."
  },
  {
    id: "social-sciences",
    name: "Social Sciences",
    emoji: "\uD83C\uDFDB\uFE0F",
    color: "#7A3FA0",
    desc: "Economics, Political Science, Sociology, Geography, Anthropology, and more.",
    advantage: "A mix of open and limited programs \u2014 Economics and Political Science need a minimum grade, but several others are more accessible."
  },
  {
    id: "life-sciences",
    name: "Life Sciences",
    emoji: "\uD83E\uDDEC",
    color: "#0F7A4D",
    desc: "Biology, Psychology, and related programs \u2014 the usual path toward medicine and health sciences.",
    advantage: "Keeps pre-health-relevant programs open, but several (Psychology, Cell & Systems Biology) are competitive \u2014 your first-year grades matter a lot here."
  },
  {
    id: "math-physical-sciences",
    name: "Mathematical & Physical Sciences",
    emoji: "\uD83D\uDD2D",
    color: "#0B4DA0",
    desc: "Math, Physics, Astronomy, Earth Sciences, Statistics, and Chemistry.",
    advantage: "Most of these (Math, Physics, Astronomy, Earth Sciences) are open enrolment \u2014 quantitative options with less admission risk than Computer Science."
  },
  {
    id: "computer-science-cat",
    name: "Computer Science",
    emoji: "\uD83D\uDCBB",
    color: "#C05A16",
    desc: "The Computer Science admission category itself.",
    advantage: "The only category with a guarantee attached \u2014 CMP1 admission gives a guaranteed CS program spot if you hit the required first-year grades."
  },
  {
    id: "rotman-commerce-cat",
    name: "Rotman Commerce",
    emoji: "\uD83D\uDCBC",
    color: "#0F7A4D",
    desc: "The Bachelor of Commerce, run jointly with the Rotman School of Management.",
    advantage: "Admission already comes with guaranteed BCom status pending your first-year grades \u2014 unlike other categories, you don't reapply in 2nd year."
  }
];


const COURSE_PROGRAMS = [
  {
    id: "anthropology",
    facultyId: "as",
    name: "Anthropology",
    enrolType: "Limited enrolment",
    typeTag: "Type 2",
    emoji: "🟠",
    summary: "All Anthropology programs need the same thing: 4.0 credits plus 65% in one qualifying first-year course.",
    streams: [
      { name: "Major / Minor (General)", req: "65% in ANT100Y1" },
      { name: "Major / Specialist (Society, Culture & Language)", req: "65% in ANT200Y1 or ARH100Y1" },
      { name: "Major (Evolutionary)", req: "65% in ANT203Y1" },
      { name: "Archaeology Specialist", req: "65% in a qualifying first-year course" },
    ],
    flags: [
      "You can only complete one program (Specialist, Major, or Minor) per subject area.",
    ],
    admissionCategory: "social-sciences",
    calcRequired: false,
    officialUrl: "https://artsci.calendar.utoronto.ca/"
  },

  {
    id: "art-history",
    facultyId: "as",
    name: "Art History",
    enrolType: "Split",
    typeTag: "Open + Limited",
    emoji: "🟣",
    summary: "The Major and Minor are open enrolment. The Specialist is limited.",
    streams: [
      { name: "Major", req: "Open — just 4.0 credits, no minimum grade" },
      { name: "Minor", req: "Open — just 4.0 credits, no minimum grade" },
      { name: "Specialist", req: "2.0 FAH credits with 70% in each" },
    ],
    flags: [],
    admissionCategory: "humanities",
    calcRequired: false,
    officialUrl: "https://artsci.calendar.utoronto.ca/"
  },

  {
    id: "astronomy",
    facultyId: "as",
    name: "Astronomy & Astrophysics",
    enrolType: "Open enrolment",
    typeTag: "Type 1",
    emoji: "🟢",
    summary: "Every Astronomy & Astrophysics program is open enrolment.",
    streams: [
      { name: "Major / Specialist / Minor", req: "No minimum grade — just 4.0 credits" },
    ],
    flags: [
      "A B+ average in program courses is needed to guarantee a spot in the 4th-year research course AST425Y1.",
    ],
    admissionCategory: "math-physical-sciences",
    calcRequired: true,
    officialUrl: "https://artsci.calendar.utoronto.ca/"
  },

  {
    id: "cell-systems-biology",
    facultyId: "as",
    name: "Cell & Systems Biology",
    enrolType: "Limited enrolment",
    typeTag: "Type 2",
    emoji: "🟠",
    summary: "Cell & Molecular Biology programs need a strong first-year biology grade.",
    streams: [
      { name: "Specialist", req: "70% in BIO130H1 (or BIO230H1/BIO255H1)" },
      { name: "Major", req: "Same first-year courses as the Specialist" },
    ],
    flags: [
      "The general co-sponsored Biology Major is open enrolment — see Ecology & Evolutionary Biology.",
    ],
    admissionCategory: "life-sciences",
    calcRequired: true,
    officialUrl: "https://artsci.calendar.utoronto.ca/"
  },

  {
    id: "chemistry",
    facultyId: "as",
    name: "Chemistry",
    enrolType: "Limited enrolment",
    typeTag: "Type 2",
    emoji: "🟠",
    summary: "Chemistry programs use a minimum grade that resets every year based on demand.",
    streams: [
      { name: "Specialist", req: "Variable minimum — floor is 63% in required courses" },
      { name: "Major / other Specialists", req: "Variable minimum, changes yearly" },
    ],
    flags: [
      "Meeting the floor grade never guarantees a spot — actual cutoffs usually run higher.",
    ],
    admissionCategory: "math-physical-sciences",
    calcRequired: true,
    officialUrl: "https://artsci.calendar.utoronto.ca/"
  },

  {
    id: "classics",
    facultyId: "as",
    name: "Classics",
    enrolType: "Open enrolment",
    typeTag: "Type 1",
    emoji: "🟢",
    summary: "Classics programs are open enrolment.",
    streams: [
      { name: "Major / Specialist / Minor", req: "No minimum grade — just 4.0 credits" },
    ],
    flags: [
      "Some older calendar mirrors list the Classical Civilization Specialist as limited (65%). The current live calendar shows it as open — double check before relying on this.",
    ],
    admissionCategory: "humanities",
    calcRequired: false,
    officialUrl: "https://artsci.calendar.utoronto.ca/"
  },

  {
    id: "computer-science",
    facultyId: "as",
    name: "Computer Science",
    enrolType: "Very limited enrolment",
    typeTag: "Type 3",
    emoji: "🔴",
    summary: "The hardest gate in the Faculty. A guaranteed spot only exists for one admission category — everyone else competes.",
    streams: [
      { name: "CMP1-admitted students (Specialist)", req: "Guaranteed if you hit 70%+ in CSC110Y1, MAT137Y1, STA130H1, and 77%+ in CSC111H1, within 12 months" },
      { name: "Everyone else (Major or Specialist)", req: "Supplemental application. Floor is 70% in CSC148H1 — below that, you won't be considered at all" },
    ],
    flags: [
      "At least 20 spots are reserved yearly for CMP1 applicants.",
      "Only grades from CSC148H1/CSC165H1/CSC240H1 taken on the St. George campus count for non-guarantee applicants.",
      "Always keep a backup program — this is the most competitive POSt at U of T.",
    ],
    admissionCategory: "computer-science-cat",
    calcRequired: true,
    officialUrl: "https://fas.calendar.utoronto.ca/computer-science-specialist-science-program-asspe1689"
  },

  {
    id: "earth-sciences",
    facultyId: "as",
    name: "Earth Sciences",
    enrolType: "Open enrolment",
    typeTag: "Type 1",
    emoji: "🟢",
    summary: "All Earth Sciences programs (Geology, Geophysics, Environmental Geosciences) are open enrolment.",
    streams: [
      { name: "All programs", req: "No minimum grade — just 4.0 credits" },
    ],
    flags: [],
    admissionCategory: "math-physical-sciences",
    calcRequired: true,
    officialUrl: "https://artsci.calendar.utoronto.ca/"
  },

  {
    id: "east-asian-studies",
    facultyId: "as",
    name: "East Asian Studies",
    enrolType: "Open enrolment",
    typeTag: "Type 1",
    emoji: "🟢",
    summary: "Open enrolment, but finishing the program needs steady language progress.",
    streams: [
      { name: "Major / Specialist", req: "No enrolment grade. Completion needs EAS103H1, EAS105H1, EAS209H1, plus language proficiency" },
    ],
    flags: [],
    admissionCategory: "humanities",
    calcRequired: false,
    officialUrl: "https://artsci.calendar.utoronto.ca/"
  },

  {
    id: "ecology-evolutionary-biology",
    facultyId: "as",
    name: "Ecology & Evolutionary Biology",
    enrolType: "Open enrolment",
    typeTag: "Type 1",
    emoji: "🟢",
    summary: "All co-sponsored Biology programs, including EEB's own, are open enrolment.",
    streams: [
      { name: "All programs", req: "No minimum grade (Grade 12 Biology required for BIO120H1/BIO130H1)" },
    ],
    flags: [],
    admissionCategory: "life-sciences",
    calcRequired: true,
    officialUrl: "https://artsci.calendar.utoronto.ca/"
  },

  {
    id: "economics",
    facultyId: "as",
    name: "Economics",
    enrolType: "Limited enrolment",
    typeTag: "Type 2",
    emoji: "🟠",
    summary: "Requirements step up the further you go — the Specialist needs a noticeably higher grade than the Major.",
    streams: [
      { name: "Major / Minor", req: "63% in ECO101H1, 63% in ECO102H1 (or 80% in ECO105Y1), plus a math course" },
      { name: "Specialist", req: "70% in both ECO101H1 and ECO102H1" },
      { name: "Economics & Mathematics Specialist", req: "70% in ECO206Y1/ECO208Y1, 60% in MAT137Y1/MAT157Y1" },
    ],
    flags: [],
    admissionCategory: "social-sciences",
    calcRequired: false,
    officialUrl: "https://artsci.calendar.utoronto.ca/"
  },

  {
    id: "english",
    facultyId: "as",
    name: "English",
    enrolType: "Split",
    typeTag: "Open + Limited",
    emoji: "🟣",
    summary: "The Literature & Language Major stream and Minor are open. The Specialist is limited.",
    streams: [
      { name: "Major (Literature & Language stream)", req: "Open — just 4.0 credits" },
      { name: "Minor", req: "Open — just 4.0 credits" },
      { name: "Specialist", req: "73% in a first-year ENG full course (ENG110Y/140Y/150Y)" },
    ],
    flags: [
      "ENG100H1 and ENG102H1 don't count toward any English program.",
    ],
    admissionCategory: "humanities",
    calcRequired: false,
    officialUrl: "https://artsci.calendar.utoronto.ca/"
  },

  {
    id: "french",
    facultyId: "as",
    name: "French",
    enrolType: "Open enrolment",
    typeTag: "Type 1",
    emoji: "🟢",
    summary: "Open enrolment. A placement test decides which level you start at, not your admission.",
    streams: [
      { name: "Major / Specialist / Minor", req: "No minimum grade — just 4.0 credits" },
    ],
    flags: [],
    admissionCategory: "humanities",
    calcRequired: false,
    officialUrl: "https://artsci.calendar.utoronto.ca/"
  },

  {
    id: "geography-planning",
    facultyId: "as",
    name: "Geography & Planning",
    enrolType: "Split",
    typeTag: "Open + Limited",
    emoji: "🟣",
    summary: "Majors and Specialists are limited; Minors are open.",
    streams: [
      { name: "Human Geography Major", req: "67% in 0.5 GGR credit, or 63% in 1.0 GGR credit" },
      { name: "Human / Environmental Geography Specialist", req: "75% in 0.5 GGR credit, or 70% in 1.0 GGR credit" },
      { name: "Minors", req: "Open — just 4.0 credits" },
    ],
    flags: [],
    admissionCategory: "social-sciences",
    calcRequired: false,
    officialUrl: "https://artsci.calendar.utoronto.ca/"
  },

  {
    id: "germanic-languages",
    facultyId: "as",
    name: "Germanic Languages & Literatures",
    enrolType: "Open enrolment",
    typeTag: "Type 1",
    emoji: "🟢",
    summary: "German Studies Major and the Business German Minor are open enrolment.",
    streams: [
      { name: "Major / Minor", req: "No minimum grade — just 4.0 credits" },
    ],
    flags: [
      "The German Studies Specialist stopped accepting new students as of January 15, 2025.",
    ],
    admissionCategory: "humanities",
    calcRequired: false,
    officialUrl: "https://artsci.calendar.utoronto.ca/"
  },

  {
    id: "history",
    facultyId: "as",
    name: "History",
    enrolType: "Split",
    typeTag: "Open + Limited",
    emoji: "🟣",
    summary: "The Major is open (but has specific course requirements). The Specialist is limited.",
    streams: [
      { name: "Major", req: "Open, but needs 1.0 HIS credit completed — no minimum grade" },
      { name: "Specialist", req: "70% floor in each required course" },
    ],
    flags: [],
    admissionCategory: "humanities",
    calcRequired: false,
    officialUrl: "https://artsci.calendar.utoronto.ca/"
  },

  {
    id: "italian-studies",
    facultyId: "as",
    name: "Italian Studies",
    enrolType: "Open enrolment",
    typeTag: "Type 1",
    emoji: "🟢",
    summary: "Open enrolment.",
    streams: [
      { name: "Major / Specialist", req: "No minimum grade — just 4.0 credits" },
    ],
    flags: [],
    admissionCategory: "humanities",
    calcRequired: false,
    officialUrl: "https://artsci.calendar.utoronto.ca/"
  },

  {
    id: "linguistics",
    facultyId: "as",
    name: "Linguistics",
    enrolType: "Open enrolment",
    typeTag: "Type 1",
    emoji: "🟢",
    summary: "Open enrolment.",
    streams: [
      { name: "Major / Specialist", req: "No minimum grade — just 4.0 credits" },
    ],
    flags: [
      "LIN200H1 doesn't count as an entrance course — take LIN101H1 and LIN102H1 first.",
    ],
    admissionCategory: "humanities",
    calcRequired: false,
    officialUrl: "https://artsci.calendar.utoronto.ca/"
  },

  {
    id: "mathematics",
    facultyId: "as",
    name: "Mathematics",
    enrolType: "Open enrolment",
    typeTag: "Type 1",
    emoji: "🟢",
    summary: "Open enrolment for standard Math programs. (The joint Economics & Mathematics Specialist is limited — see Economics.)",
    streams: [
      { name: "Major / Specialist / Applied Math Specialist", req: "No minimum grade — just 4.0 credits" },
    ],
    flags: [],
    admissionCategory: "math-physical-sciences",
    calcRequired: true,
    officialUrl: "https://artsci.calendar.utoronto.ca/"
  },

  {
    id: "near-middle-eastern-civilizations",
    facultyId: "as",
    name: "Near & Middle Eastern Civilizations",
    enrolType: "Open enrolment",
    typeTag: "Type 1",
    emoji: "🟢",
    summary: "Open enrolment.",
    streams: [
      { name: "Major / Specialist (all variants)", req: "No minimum grade. Completion needs 0.5–1.0 credit from NMC101H1–106H1" },
    ],
    flags: [],
    admissionCategory: "humanities",
    calcRequired: false,
    officialUrl: "https://artsci.calendar.utoronto.ca/"
  },

  {
    id: "philosophy",
    facultyId: "as",
    name: "Philosophy",
    enrolType: "Open enrolment",
    typeTag: "Type 1",
    emoji: "🟢",
    summary: "Open enrolment.",
    streams: [
      { name: "Major / Specialist", req: "No minimum grade — just 4.0 credits" },
    ],
    flags: [],
    admissionCategory: "humanities",
    calcRequired: false,
    officialUrl: "https://artsci.calendar.utoronto.ca/"
  },

  {
    id: "physics",
    facultyId: "as",
    name: "Physics",
    enrolType: "Open enrolment",
    typeTag: "Type 1",
    emoji: "🟢",
    summary: "Open enrolment across all Physics programs.",
    streams: [
      { name: "Major / Specialist / joint programs", req: "No minimum grade — just 4.0 credits" },
    ],
    flags: [],
    admissionCategory: "math-physical-sciences",
    calcRequired: true,
    officialUrl: "https://artsci.calendar.utoronto.ca/"
  },

  {
    id: "political-science",
    facultyId: "as",
    name: "Political Science",
    enrolType: "Limited enrolment",
    typeTag: "Type 2",
    emoji: "🟠",
    summary: "Same grade bar for Major and Specialist, but it rises once you've got 9.0+ credits.",
    streams: [
      { name: "Major / Specialist (4.0–8.5 credits)", req: "65% each in 1.0 credit of POL courses" },
      { name: "Major / Specialist (9.0+ credits)", req: "70% each in 2.0 credits of POL courses" },
    ],
    flags: [],
    admissionCategory: "social-sciences",
    calcRequired: false,
    officialUrl: "https://artsci.calendar.utoronto.ca/"
  },

  {
    id: "psychology",
    facultyId: "as",
    name: "Psychology",
    enrolType: "Limited enrolment",
    typeTag: "Type 2, competitive",
    emoji: "🟠",
    summary: "One of the more competitive Life Science POSts, with a mandatory (but pass-only) high school requirement.",
    streams: [
      { name: "Major", req: "75% in PSY100H1" },
      { name: "Specialist", req: "80% in PSY100H1" },
    ],
    flags: [
      "Grade 12 Calculus and Grade 12 Biology are mandatory for every Psychology program — but only a passing grade is needed, and they're not counted in your admission average.",
    ],
    admissionCategory: "life-sciences",
    calcRequired: true,
    officialUrl: "https://artsci.calendar.utoronto.ca/"
  },

  {
    id: "study-of-religion",
    facultyId: "as",
    name: "Study of Religion",
    enrolType: "Open enrolment",
    typeTag: "Type 1",
    emoji: "🟢",
    summary: "Open enrolment.",
    streams: [
      { name: "Major / Specialist / Minor", req: "No minimum grade — just 4.0 credits" },
    ],
    flags: [],
    admissionCategory: "humanities",
    calcRequired: false,
    officialUrl: "https://artsci.calendar.utoronto.ca/"
  },

  {
    id: "slavic-east-european",
    facultyId: "as",
    name: "Slavic & East European Languages & Cultures",
    enrolType: "Open enrolment",
    typeTag: "Type 1",
    emoji: "🟢",
    summary: "Open enrolment.",
    streams: [
      { name: "Specialist / Major / Minor", req: "No minimum grade — just 4.0 credits" },
    ],
    flags: [],
    admissionCategory: "humanities",
    calcRequired: false,
    officialUrl: "https://artsci.calendar.utoronto.ca/"
  },

  {
    id: "sociology",
    facultyId: "as",
    name: "Sociology",
    enrolType: "Limited enrolment",
    typeTag: "Type 2",
    emoji: "🟠",
    summary: "The Specialist bar is much higher than the Major's.",
    streams: [
      { name: "Major", req: "65% average in SOC100H1 and SOC150H1" },
      { name: "Specialist", req: "80% average in SOC100H1 and SOC150H1" },
    ],
    flags: [
      "You can't combine a Sociology Specialist with another Sociology program.",
    ],
    admissionCategory: "social-sciences",
    calcRequired: false,
    officialUrl: "https://artsci.calendar.utoronto.ca/"
  },

  {
    id: "spanish-portuguese",
    facultyId: "as",
    name: "Spanish & Portuguese",
    enrolType: "Open enrolment",
    typeTag: "Type 1",
    emoji: "🟢",
    summary: "Open enrolment. A placement test decides your starting level, not your admission.",
    streams: [
      { name: "Specialist / Major (Spanish or Portuguese)", req: "No minimum grade — just 4.0 credits" },
    ],
    flags: [],
    admissionCategory: "humanities",
    calcRequired: false,
    officialUrl: "https://artsci.calendar.utoronto.ca/"
  },

  {
    id: "statistical-sciences",
    facultyId: "as",
    name: "Statistical Sciences",
    enrolType: "Limited enrolment",
    typeTag: "Type 2",
    emoji: "🟠",
    summary: "Requirements vary depending on how many credits you've completed, and the exact cutoff resets yearly.",
    streams: [
      { name: "Statistics Major", req: "Variable minimum average in STA130H1 + a math course" },
      { name: "Theory & Methods Specialist (9.0+ credits)", req: "63% in STA257H1 and STA261H1, plus a variable average" },
    ],
    flags: [],
    admissionCategory: "math-physical-sciences",
    calcRequired: true,
    officialUrl: "https://artsci.calendar.utoronto.ca/"
  },
  {
    id: "bcom",
    facultyId: "as",
    name: "Rotman Commerce (BCom)",
    kind: "Direct-entry program",
    type: "Type 3 \u2014 competitive, supplemental application",
    summary: "You apply to this directly through OUAC, not after first year. Acceptance formally comes through Arts & Science with guaranteed BCom status, pending your first-year grades.",
    bullets: [
      "OSSD with six 4U/M courses, including **English (ENG4U)** and **Calculus & Vectors (MCV4U)**",
      "Recommended minimum overall average: **mid-to-high 80s** — this is a floor, not a target",
      "A required **supplemental application** (written responses, video) is assessed alongside your grades",
      "Extracurriculars and leadership are also considered — grades alone won't get you in"
    ],
    admissionCategory: "rotman-commerce-cat",
    calcRequired: true,
    officialUrl: "https://rotmancommerce.utoronto.ca/future-students/ontario-applicants/"
  },

  /* ============================================
     나머지 4개 St. George 직접입학 단과대
     출처: 사용자 제공 자료 (engineering.utoronto.ca, daniels.utoronto.ca,
           music.utoronto.ca, kpe.utoronto.ca 기준) + 공식 페이지로 재확인
     확인일: 2026-08-25
     ============================================ */

  {
    id: "eng-core",
    facultyId: "engineering",
    name: "Chemical / Civil / Computer / Electrical / Industrial / Materials / Mechanical / Mineral Engineering",
    kind: "Direct-entry (choose at application)",
    type: "Competitive",
    summary: "You pick your specific engineering program when you apply, but everyone follows the same first-year courses before specializing.",
    streams: [
      { name: "Computer / Electrical Engineering", req: "Consideration has recently started around the low-to-mid 90s" },
      { name: "Chemical / Civil / Industrial / Materials / Mechanical / Mineral", req: "Consideration has recently started in the high-80s to low-90s" }
    ],
    flags: [
      "Only your first attempt at each course counts \u2014 retakes aren't used.",
      "Prerequisite courses must be completed within 5 years of your start date.",
      "September entry only \u2014 there's no other intake."
    ],
    calcRequired: true,
    officialUrl: "https://discover.engineering.utoronto.ca/"
  },

  {
    id: "eng-sci",
    facultyId: "engineering",
    name: "Engineering Science",
    kind: "Direct-entry, most competitive track",
    type: "Highly competitive",
    summary: "The hardest engineering program to get into. Splits into Aerospace, Biomedical, Robotics and other majors starting 3rd year.",
    streams: [
      { name: "Admission average", req: "Recent admitted students have mostly scored in the high 90s across all five required courses" }
    ],
    flags: [
      "A required supplemental (Personal Profile) is what actually separates applicants with near-identical top averages.",
      "A weak mark specifically in SPH4U or MCV4U stands out even with a strong overall average."
    ],
    calcRequired: true,
    officialUrl: "https://discover.engineering.utoronto.ca/"
  },

  {
    id: "eng-trackone",
    facultyId: "engineering",
    name: "TrackOne",
    kind: "Undeclared entry",
    type: "Choose your program at the end of year 1",
    summary: "Apply to Engineering without picking a specific program \u2014 decide after trying the core first-year courses.",
    streams: [
      { name: "Admission", req: "Same 5 prerequisite courses and Online Student Profile as every other Engineering program" }
    ],
    flags: [],
    calcRequired: true,
    officialUrl: "https://discover.engineering.utoronto.ca/"
  },

  {
    id: "arch-studies",
    facultyId: "daniels",
    name: "Architectural Studies (BA)",
    kind: "Direct-entry",
    type: "Competitive, essay-based",
    summary: "A common curriculum through 2nd year, then you apply internally for a stream: Design, History & Theory, or Technology.",
    groups: [
      {
        heading: "Years 1\u20132 (automatic \u2014 no choice)",
        items: [
          { name: "Comprehensive Stream", req: "Everyone starts here. No application, no choice." }
        ]
      },
      {
        heading: "After 8.0 credits \u2014 apply for a specialist stream (not guaranteed)",
        items: [
          { name: "Design of Architecture, Landscape & Urbanism", req: "Needs 80%+ in required upper-year courses (the ARC456H1/ARC461H1/ARC486H1 series) + Program Director approval" },
          { name: "History and Theory of Architecture, Landscape & Urbanism", req: "Same 80%+ requirement and approval" },
          { name: "Technology of Architecture, Landscape & Urbanism", req: "Same 80%+ requirement and approval" },
          { name: "Stay in Comprehensive", req: "The default if you don't apply, or aren't accepted, into a specialist stream" }
        ]
      },
      {
        heading: "Optional add-on (not a separate major)",
        items: [
          { name: "Visual Studies", req: "Apply after 4.0 credits, in addition to Architectural Studies \u2014 open only to Architectural Studies Specialist students" }
        ]
      }
    ],
    streams: [
      { name: "Recent admitted average", req: "Roughly 85\u201391% \u2014 not a guarantee at that range" }
    ],
    flags: [
      "The \u201cOne Idea\u201d supplementary is a short written response (plus up to 2 images) about a creative problem you solved. U of T is explicit that it is not a portfolio.",
      "Deadline is mid-February (February 16 for the 2026 cycle).",
      "Meeting the 80% stream threshold doesn't guarantee a spot \u2014 it's a floor, not a target.",
      "Daniels also runs graduate-only programs (Master of Architecture, Landscape Architecture, Urban Design, Visual Studies) \u2014 these need a bachelor's degree first, not open to high school applicants."
    ],
    calcRequired: false,
    officialUrl: "https://daniels.utoronto.ca/"
  },

  {
    id: "music-programs",
    facultyId: "music",
    name: "Music Major / Composition / Music Technology / Jazz",
    kind: "Audition-based",
    type: "Highly selective",
    summary: "Two degrees, two idioms, and half a dozen specializations \u2014 this is the most complex direct-entry structure at St. George.",
    groups: [
      {
        heading: "Bachelor of Music \u2014 available in Classical & Jazz",
        items: [
          { name: "Composition", req: "Direct-entry possible. Submit a portfolio: 4+ finished pieces, 15+ minutes total" },
          { name: "Interdisciplinary Music Studies (IMS)", req: "Direct-entry, or after the Exploratory Year" },
          { name: "Music Education", req: "Direct-entry, or after the Exploratory Year" },
          { name: "Music Technology & Digital Media", req: "Direct-entry, or after the Exploratory Year. Submit a portfolio" }
        ]
      },
      {
        heading: "Bachelor of Music \u2014 Classical only",
        items: [
          { name: "History, Culture & Theory", req: "No direct entry \u2014 only open after completing the Exploratory Year" },
          { name: "Exploratory Year", req: "A year to explore before picking a specialization; also the required path into History, Culture & Theory" }
        ]
      },
      {
        heading: "Bachelor of Music \u2014 Jazz only",
        items: [
          { name: "Jazz Performance / Jazz IMS / Jazz Music Education / Jazz Music Tech & Digital Media", req: "All available from 1st year. Jazz has no Composition or History, Culture & Theory track" }
        ]
      },
      {
        heading: "Bachelor of Music in Performance",
        items: [
          { name: "Classical Performance", req: "Start your instrument/voice focus immediately in 1st year" },
          { name: "Jazz Performance", req: "Start immediately in 1st year" },
          { name: "Instrument families", req: "Brass, Guitar, Percussion, Piano, Strings, Voice, Woodwinds" }
        ]
      },
      {
        heading: "Minors & certificates you can add later (not separate admission)",
        items: [
          { name: "Minors", req: "History and Culture, Composition, Historical Keyboard" },
          { name: "Certificates", req: "Music Entrepreneurship, Health Applications in Music, Music Technology, Popular Music Studies and Ethnomusicology, Piano Pedagogy" }
        ]
      }
    ],
    streams: [
      { name: "Audition", req: "On your major instrument or voice, held Feb\u2013early March. 300km+ from Toronto? You can submit a recording instead" },
      { name: "Theory exam", req: "RCM Level 8 Theory or better, or 60%+ on U of T's own entrance theory exam" },
      { name: "Interview", req: "About your repertoire, musical background, and goals" },
      { name: "Jazz applicants", req: "Submit an audio/video pre-screening recording" }
    ],
    flags: [
      "You have to arrange your own accompanist for the audition.",
      "Keyboard skill isn't required (unless piano is your instrument), but RCM Grade 3-level piano helps.",
      "The Arts & Science Music Major is a completely different, separate program \u2014 different audition and theory requirements from everything on this page."
    ],
    calcRequired: false,
    officialUrl: "https://music.utoronto.ca/admissions/undergraduate/requirements"
  },

  {
    id: "bkin",
    facultyId: "kinesiology",
    name: "Bachelor of Kinesiology (BKin)",
    kind: "Direct-entry, single degree",
    type: "No majors or specialists \u2014 just one degree",
    summary: "One degree for everyone \u2014 there's no major/specialist split. You shape it with certificates and electives instead.",
    groups: [
      {
        heading: "Not majors \u2014 optional extras on top of the one degree",
        items: [
          { name: "Certificates (choose up to 3)", req: "Global Kinesiology & PE, Physical Activity Instruction, Clinical Movement Sciences, Foundational Sciences and Research, Mental Health and Physical Activity" },
          { name: "BKin/MT combined degree", req: "Apply to OISE's Master of Teaching in 3rd year \u2014 overlaps your last BKin year with MT year 1" },
          { name: "Elective flexibility", req: "Shape your degree with electives (biology, psychology, humanities, etc.) \u2014 course choice, not an official major" }
        ]
      }
    ],
    streams: [
      { name: "Math (pick one)", req: "Advanced Functions (MHF4U) or Calculus & Vectors (MCV4U)" },
      { name: "Science (pick one)", req: "Biology, Chemistry, or Physics (SBI4U / SCH4U / SPH4U)" },
      { name: "Recommended, not required", req: "Introductory Kinesiology (PSK4U) or Exercise Science (PSE4U)" }
    ],
    flags: [
      "Calculus isn't the only math option here \u2014 Advanced Functions works too, you only need one.",
      "Want a Psychology minor/major later? Taking both Calculus and Biology now keeps that door open.",
      "The required Statement of Interest needs one reference's contact info \u2014 skip it and you're disqualified.",
      "Deadline is mid-February (February 16 for the 2026 cycle).",
      "\u201cGreen Path\u201d is a separate route for Chinese high school applicants \u2014 no Gaokao score needed, standardized test scores (IB/A-Level/SAT/AP) in math and a science instead, plus a summer prep program."
    ],
    calcRequired: true,
    officialUrl: "https://kpe.utoronto.ca/"
  }
];


/* ============================================
   주(province)별 온타리오 과목 대응표

   출처: future.utoronto.ca/requirements-canadian-high-schools
   확인일: 2026-08 (사용자 제공 자료)

   공통 규칙
     - 영어(ENG4U 상당)는 모든 프로그램 공통 필수
     - Calculus(MCV4U 상당)는 Computer Science / Life Sciences /
       Mathematical & Physical Sciences / Rotman Commerce 카테고리만 필수
     - Advanced Functions·Biology·Chemistry·Physics 는 프로그램마다 필요 여부가
       달라서, "참고용"으로만 보여주고 필수라고 단정하지 않습니다.
   ============================================ */

const PROVINCES = [
  { id: "on", name: "Ontario", english: "ENG4U / EAE4U", calculus: "MCV4U", advFunc: "MHF4U", biology: "SBI4U", chemistry: "SCH4U", physics: "SPH4U" },
  { id: "ab", name: "Alberta", english: "ELA 30-1", calculus: "Math 31 / AP Calculus (AB/BC)", advFunc: "Math 30-1", biology: "Biology 30", chemistry: "Chemistry 30", physics: "Physics 30" },
  { id: "bc", name: "British Columbia", english: "English Studies 12 / English First Peoples 12", calculus: "Calculus 12 / AP Calculus (AB/BC)", advFunc: "Pre-Calculus 12", biology: "Anatomy & Physiology 12", chemistry: "Chemistry 12", physics: "Physics 12" },
  { id: "mb", name: "Manitoba", english: "English 40S", calculus: "Calculus 42U / AP Calculus / Intro to Calculus 45S + Advanced Math 45S", advFunc: "Pre-Calculus Math 40S", biology: "Biology 40S", chemistry: "Chemistry 40S", physics: "Physics 40S" },
  { id: "nb", name: "New Brunswick", english: "English 120/121/122 / Anglais 22411", calculus: "Calculus 120 / AP Calculus / Math 30421", advFunc: "Pre-Calculus B 120 / Math 30411C", biology: "Biology 122 / Biologie 53411\u00b753421", chemistry: "Chemistry 121/122 / Chimie 52411", physics: "Physics 121/122 / Physique 51411\u00b751421" },
  { id: "nl", name: "Newfoundland and Labrador", english: "English 3201", calculus: "Math 3208 / AP Calculus", advFunc: "Math 3200", biology: "Biology 3201", chemistry: "Chemistry 3202", physics: "Physics 3204" },
  { id: "nt", name: "Northwest Territories", english: "ELA 30-1", calculus: "Math 31 / AP Calculus", advFunc: "Math 30-1", biology: "Biology 30", chemistry: "Chemistry 30", physics: "Physics 30" },
  { id: "ns", name: "Nova Scotia", english: "English 12 / English 12 African Heritage", calculus: "Calculus 12 / AP Calculus", advFunc: "Advanced Math 12 / Math 12 / Pre-Calculus 12", biology: "Biology 12", chemistry: "Chemistry 12", physics: "Physics 12" },
  { id: "nu", name: "Nunavut", english: "ELA 30-1", calculus: "Math 31 / AP Calculus", advFunc: "Math 30-1", biology: "Biology 30", chemistry: "Chemistry 30", physics: "Physics 30" },
  { id: "pe", name: "Prince Edward Island", english: "English 621", calculus: "Math 611B / AP Calculus", advFunc: "Math 621A/621B", biology: "Biology 621", chemistry: "Chemistry 621", physics: "Physics 621" },
  { id: "qc-cegep", name: "Quebec (CEGEP, 1 year+)", english: "2 semesters of English/Anglais", calculus: "Calculus 1", advFunc: "Linear Algebra 1", biology: "Biology 1", chemistry: "Chemistry 1 & 2", physics: "Physics 1 & 2" },
  { id: "qc-hs", name: "Quebec (Secondary / Grade 12)", english: "Grade 12 English (DES / Secondary V alone is not accepted)", calculus: "AP Calculus or an Ontario MCV4U-equivalent course", advFunc: "Ontario-equivalent course", biology: "Ontario-equivalent course", chemistry: "Ontario-equivalent course", physics: "Ontario-equivalent course" },
  { id: "sk", name: "Saskatchewan", english: "English A30, English B30", calculus: "Calculus 30 / AP Calculus", advFunc: "Pre-Calculus 30", biology: "Biology 30", chemistry: "Chemistry 30", physics: "Physics 30" },
  { id: "yt", name: "Yukon", english: "English Studies 12 / English First Peoples 12", calculus: "Calculus 12 / AP Calculus", advFunc: "Pre-Calculus 12", biology: "Anatomy & Physiology 12", chemistry: "Chemistry 12", physics: "Physics 12" }
];


/* ============================================
   최근 업데이트 로그 — 홈 화면 아래에 표시
   재방문하는 학생에게 "이 사이트가 계속 관리되고 있다"는 신뢰를 줍니다.
   새 걸 위에 추가하세요. 최근 3개만 화면에 보입니다. */

/* =====================================================
   UofT 용어사전 (GLOSSARY)
   -----------------------------------------------------
   출처: Faculty of Arts & Science Academic Calendar 2026-27
        https://artsci.calendar.utoronto.ca/glossary-terms
        (2026-08-28 확인 — 공식 정의를 쉬운 말로 다시 쓴 것.
        숫자·코드·명칭은 원문 그대로.)
   "systems" 카테고리(ACORN 등)는 공식 용어사전에는 없지만
   학사요람 곳곳에서 공식적으로 쓰이는 시스템 이름들입니다.
   필드: id / term / abbr(줄임말 풀이, 없으면 생략) / cat / def
   cat: courses(수업 읽는 법) / rules(수강 규칙) /
        programs(프로그램) / records(성적·기록) / systems(시스템)
   ===================================================== */
const GLOSSARY = [
  /* ---- courses: 수업·코드 읽는 법 ---- */
  { id: "course-code",  term: "Course code",  cat: "courses",
    def: "Every course's unique ID, like PSY100H1. The letters = subject, the number = level, and the letter near the end tells you the credit weight (H or Y)." },
  { id: "credit",       term: "Credit",       cat: "courses",
    def: "The weight of a course. Almost every course is 0.5 credit (an \u201cH\u201d in the code) or 1.0 credit (a \u201cY\u201d). You need 20.0 credits in total to graduate." },
  { id: "course-weight", term: "Course weight", cat: "courses",
    def: "Same idea as credit \u2014 how much a course counts, based on its teaching hours. With few exceptions it's 0.5 or 1.0." },
  { id: "fce",          term: "FCE",          abbr: "Full-Course Equivalent", cat: "courses",
    def: "Older way of saying 1.0 credit. If someone says \u201c1 FCE\u201d, they mean one full credit; \u201c0.5 FCE\u201d is a half course." },
  { id: "lecture",      term: "Lecture (L)",  cat: "courses",
    def: "The standard class format \u2014 the instructor teaches, you listen and take notes. In course listings, \u201c36L\u201d means 36 hours of lecture." },
  { id: "tutorial",     term: "Tutorial (T)", cat: "courses",
    def: "A smaller group session for discussing lecture material and asking questions, usually run by a TA (teaching assistant). \u201c24T\u201d = 24 tutorial hours." },
  { id: "practical",    term: "Practical (P)", cat: "courses",
    def: "Hands-on sessions \u2014 for science courses this means labs. \u201c18P\u201d = 18 hours of practical work." },
  { id: "seminar",      term: "Seminar (S)",  cat: "courses",
    def: "A small discussion-heavy class, common in upper years \u2014 part lecture, part structured discussion, often with student presentations. \u201c24S\u201d = 24 seminar hours." },

  /* ---- rules: 수강 규칙 ---- */
  { id: "prerequisite", term: "Prerequisite", cat: "rules",
    def: "A course you must finish before taking another one \u2014 sometimes with a minimum grade (e.g. \u201cCSC148 with at least 60%\u201d)." },
  { id: "corequisite",  term: "Co-requisite", cat: "rules",
    def: "A course you must take at the same time as (or before) another course." },
  { id: "exclusion",    term: "Exclusion",    cat: "rules",
    def: "A course you can't get credit for because it overlaps too much with one you've already taken (or are taking now). Check this before enrolling \u2014 taking an exclusion wastes money and credit." },
  { id: "recommended-prep", term: "Recommended preparation", cat: "rules",
    def: "A course the department suggests taking first, but it's not required. You can enrol without it." },
  { id: "extra",        term: "Extra (EXT)",  cat: "rules",
    def: "A course marked EXT on your transcript doesn't count toward your 20.0 credits. This happens to courses you designate as Extra." },
  { id: "lop",          term: "Letter of Permission", cat: "rules",
    def: "Official pre-approval to take a course at another university and transfer the credit back to U of T. Get this approved before you enrol elsewhere." },

  /* ---- programs: 프로그램 ---- */
  { id: "specialist",   term: "Specialist",   cat: "programs",
    def: "The deepest program type \u2014 10.0 to 14.0 credits in one subject. Usually the main focus of your whole degree. Program codes start with ASSPE." },
  { id: "major",        term: "Major",        cat: "programs",
    def: "A solid, medium-depth program \u2014 6.0 to 8.0 credits. Usually paired with another Major or two Minors. Codes start with ASMAJ." },
  { id: "minor",        term: "Minor",        cat: "programs",
    def: "The lightest program \u2014 4.0 credits. An add-on next to a Major or Specialist, never on its own. Codes start with ASMIN." },
  { id: "focus",        term: "Focus",        cat: "programs",
    def: "A small optional cluster of courses inside a Specialist or Major that shows you concentrated on a theme (e.g. Data Analytics within the Economics Major). Codes start with ASFOC." },
  { id: "stream",       term: "Stream",       cat: "programs",
    def: "A flavour of a program listed as its own entry \u2014 e.g. Cognitive Science Major has separate Language, Perception, and Thinking streams, each with its own code." },
  { id: "program-code", term: "Program code", cat: "programs",
    def: "Every program's ID: ASSPE\u2026 = Specialist, ASMAJ\u2026 = Major, ASMIN\u2026 = Minor, ASFOC\u2026 = Focus. You can search these codes on ACORN and in the Calendar." },
  { id: "open-program", term: "Open enrolment program", cat: "programs",
    def: "A program you can join with no conditions other than finishing 4.0 credits. Just request it on ACORN and you're in." },
  { id: "limited-program", term: "Limited enrolment program", cat: "programs",
    def: "A program with extra requirements beyond 4.0 credits \u2014 minimum grades in certain courses, sometimes an application, and sometimes limited seats." },
  { id: "post",         term: "Subject POSt", abbr: "Program of Study", cat: "programs",
    def: "The official name for your program on ACORN. \u201cRequesting a POSt\u201d = applying to enrol in a Specialist/Major/Minor, which you do near the end of first year." },
  { id: "certificate",  term: "Certificate",  cat: "programs",
    def: "A short for-credit credential. Category 2 certificates can be done alongside your undergrad degree; Category 1 usually requires a finished degree first." },

  /* ---- records: 성적·기록 ---- */
  { id: "gpa",          term: "GPA",          abbr: "Grade Point Average", cat: "records",
    def: "Your average grade, weighted by course size (a 1.0-credit course counts double a 0.5). U of T uses a 4.0 scale." },
  { id: "crncr",        term: "CR/NCR",       abbr: "Credit / No Credit", cat: "records",
    def: "An option that puts CR (credit) or NCR (no credit) on your transcript instead of a percentage mark \u2014 the course still counts toward your 20.0 credits if you pass, but doesn't affect GPA. Some courses aren't eligible." },
  { id: "lwd",          term: "LWD",          abbr: "Late Withdrawal after the Drop Date", cat: "records",
    def: "Lets you leave a course after the drop deadline (up to the last day of classes) without a mark \u2014 the transcript shows LWD instead. You can use this for at most 3.0 credits total, no petition needed." },
  { id: "academic-standing", term: "Academic standing", cat: "records",
    def: "Your academic status based on GPA. The four levels: In Good Standing, On Probation, On Suspension, and Refused Further Registration." },
  { id: "petition",     term: "Petition",     cat: "records",
    def: "A formal request asking the Faculty to make an exception to a rule for you \u2014 e.g. a deadline extension for documented circumstances." },
  { id: "language-citation", term: "Language citation", cat: "records",
    def: "A transcript recognition for advanced language study. It's not a program and doesn't count toward your program requirements \u2014 it's a bonus line on your record." },
  { id: "year-of-study", term: "Year of study", cat: "records",
    def: "Decided by credits finished, not calendar years: under 4.0 credits = Year 1, 4.0\u20138.5 = Year 2, 9.0\u201313.5 = Year 3, 14.0+ = Year 4." },

  /* ---- systems: 시스템·사이트 ---- */
  { id: "acorn",        term: "ACORN",        cat: "systems",
    def: "U of T's student portal (acorn.utoronto.ca) \u2014 where you enrol in courses and programs, check your invoice, and see your grades." },
  { id: "quercus",      term: "Quercus",      cat: "systems",
    def: "The online course hub (q.utoronto.ca) \u2014 where instructors post the syllabus, readings, assignments, announcements, and marks during the term." },
  { id: "degree-explorer", term: "Degree Explorer", cat: "systems",
    def: "The official degree-planning tool \u2014 shows which degree and program requirements you've completed and what's still missing." },
  { id: "ttb",          term: "Timetable Builder", cat: "systems",
    def: "The official timetable site (ttb.utoronto.ca) \u2014 look up when and where every course section runs before you enrol on ACORN." }
];


/* =====================================================
   캠퍼스 편의시설 (FACILITIES)
   -----------------------------------------------------
   출처(전부 .utoronto.ca 공식 페이지, 2026-08-28 확인):
   - 도서관 주소/설명: library.utoronto.ca, gerstein.library.utoronto.ca
   - 체육시설: kpe.utoronto.ca/facility/athletic-centre,
     kpe.utoronto.ca/facilities-memberships/contact-us
   - 보건소: studentlife.utoronto.ca (Health & Wellness)
   - 식당: foodservices.utoronto.ca
   - 프린트: onesearch.library.utoronto.ca (printing FAQ), printhere.utoronto.ca
   - 서점: U of T Bookstore 공식 안내(Koffler Student Centre 주소)
   ⚠️ 운영시간은 학기 중 바뀌는 경우가 많아 일부러 안 넣었습니다.
      각 항목의 officialUrl에서 그날그날 시간 확인하세요.
   필드: id / name / cat / address / note / officialUrl
   cat: library / athletics / health / food / print / other
   ===================================================== */
const FACILITY_CATS = [
  { id: "library",   label: "Libraries",           icon: "\uD83D\uDCDA", color: "#0F7A4D" },
  { id: "athletics", label: "Athletics & Rec",      icon: "\uD83C\uDFCA", color: "#0B4DA0" },
  { id: "health",    label: "Health & Wellness",    icon: "\uD83E\uDE7A", color: "#C05A16" },
  { id: "food",      label: "Food & Dining",        icon: "\uD83C\uDF74", color: "#7A3FA0" },
  { id: "print",     label: "Printing & Bookstore", icon: "\uD83D\uDDA8\uFE0F", color: "#1B7A9E" },
  { id: "other",     label: "Other essentials",     icon: "\u2728", color: "#0E7C86" }
];

const FACILITIES = [
  /* ---- library ---- */
  { id: "robarts", name: "Robarts Library", cat: "library",
    address: "130 St. George Street",
    photoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/Robarts_Library_2015.jpg/800px-Robarts_Library_2015.jpg",
    /* 출처: 위키미디어 공용 (자유 라이선스) — 저작자·라이선스는 아래 파일 페이지 참조 */
    photoCredit: "Photo: Wikimedia Commons",
    photoCreditUrl: "https://commons.wikimedia.org/wiki/File:Robarts_Library_2015.jpg",
    note: "The biggest library on campus \u2014 humanities & social sciences, plus the Information Commons (computers, printing) and long study hours, especially useful around exams.",
    officialUrl: "https://onesearch.library.utoronto.ca/library-campus/st-george-campus" },
  { id: "gerstein", name: "Gerstein Science Information Centre", cat: "library",
    address: "9 King's College Circle",
    photoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Gerstein_Library,_UofT_(2001)_(50945692187).jpg/800px-Gerstein_Library,_UofT_(2001)_(50945692187).jpg",
    /* 출처: 위키미디어 공용 (자유 라이선스) — 저작자·라이선스는 아래 파일 페이지 참조 */
    photoCredit: "Photo: Wikimedia Commons",
    photoCreditUrl: "https://commons.wikimedia.org/wiki/File:Gerstein_Library,_UofT_(2001)_(50945692187).jpg",
    note: "The main science & health science library \u2014 go here for anything Biology, Chemistry, Physics, or pre-health related. Over 1,400 study spaces and bookable group rooms.",
    officialUrl: "https://gerstein.library.utoronto.ca/" },
  { id: "uc-library", name: "University College Library", cat: "library",
    address: "Inside University College",
    photoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/University_College,_University_of_Toronto_(2026).jpg/800px-University_College,_University_of_Toronto_(2026).jpg",
    /* 출처: 위키미디어 공용 (자유 라이선스) — 저작자·라이선스는 아래 파일 페이지 참조 */
    photoCredit: "Photo: Wikimedia Commons",
    photoCreditUrl: "https://commons.wikimedia.org/wiki/File:University_College,_University_of_Toronto_(2026).jpg",
    note: "A smaller, quieter library inside UC \u2014 a good alternative if Robarts feels too busy.",
    officialUrl: "https://onesearch.library.utoronto.ca/library-campus/st-george-campus" },
  { id: "fisher", name: "Thomas Fisher Rare Book Library", cat: "library",
    address: "120 St. George Street",
    photoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/07/Thomas_Fisher_Rare_Book_Library,_University_of_Toronto,_May_13,_2025.jpg/800px-Thomas_Fisher_Rare_Book_Library,_University_of_Toronto,_May_13,_2025.jpg",
    /* 출처: 위키미디어 공용 (자유 라이선스) — 저작자·라이선스는 아래 파일 페이지 참조 */
    photoCredit: "Photo: Wikimedia Commons",
    photoCreditUrl: "https://commons.wikimedia.org/wiki/File:Thomas_Fisher_Rare_Book_Library,_University_of_Toronto,_May_13,_2025.jpg",
    note: "Canada's largest public rare book library. Worth a visit even just to see the building \u2014 free exhibitions are open to everyone.",
    officialUrl: "https://onesearch.library.utoronto.ca/library-campus/st-george-campus" },
  { id: "lib-full-list", name: "Full list of St. George libraries", cat: "library",
    address: "",
    note: "U of T has dozens of libraries across St. George (college libraries, faculty libraries, etc.), each with different hours. This official page lists all of them with current hours.",
    officialUrl: "https://onesearch.library.utoronto.ca/library-campus/st-george-campus" },

  /* ---- athletics ---- */
  { id: "athletic-centre", name: "Athletic Centre", cat: "athletics",
    address: "Spadina Ave. & Harbord St.",
    photoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/Athletic_Centre,_University_of_Toronto.jpg/800px-Athletic_Centre,_University_of_Toronto.jpg",
    /* 출처: 위키미디어 공용 (자유 라이선스) — 저작자·라이선스는 아래 파일 페이지 참조 */
    photoCredit: "Photo: Wikimedia Commons",
    photoCreditUrl: "https://commons.wikimedia.org/wiki/File:Athletic_Centre,_University_of_Toronto.jpg",
    note: "The main gym \u2014 seven gymnasiums, three pools, a strength & conditioning centre, indoor track, dance studio, and squash courts. Your student athletic fee gets you in automatically, just bring your TCard.",
    officialUrl: "https://kpe.utoronto.ca/facility/athletic-centre" },
  { id: "goldring", name: "Goldring Centre for High Performance Sport", cat: "athletics",
    address: "100 Devonshire Place",
    photoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a1/Goldring-Centre-for-High-Performance-Sport-in-Toronto.jpg/800px-Goldring-Centre-for-High-Performance-Sport-in-Toronto.jpg",
    /* 출처: 위키미디어 공용 (자유 라이선스) — 저작자·라이선스는 아래 파일 페이지 참조 */
    photoCredit: "Photo: Wikimedia Commons (CC BY 2.0)",
    photoCreditUrl: "https://commons.wikimedia.org/wiki/File:Goldring-Centre-for-High-Performance-Sport-in-Toronto.jpg",
    note: "A newer, high-performance training facility \u2014 also included with your athletic fee membership.",
    officialUrl: "https://kpe.utoronto.ca/facilities-memberships/buildings-overview" },
  { id: "varsity-centre", name: "Varsity Centre & Arena", cat: "athletics",
    address: "299 Bloor Street West",
    photoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/Varsity_Stadium,_U_of_T_St._George_(4448136129).jpg/800px-Varsity_Stadium,_U_of_T_St._George_(4448136129).jpg",
    /* 출처: 위키미디어 공용 (자유 라이선스) — 저작자·라이선스는 아래 파일 페이지 참조 */
    photoCredit: "Photo: Wikimedia Commons",
    photoCreditUrl: "https://commons.wikimedia.org/wiki/File:Varsity_Stadium,_U_of_T_St._George_(4448136129).jpg",
    note: "Outdoor turf field, track, and the Varsity Arena (ice hockey). Building hours are generally 7 a.m.\u201311 p.m.",
    officialUrl: "https://kpe.utoronto.ca/facilities-memberships/contact-us" },

  /* ---- health ---- */
  { id: "health-wellness", name: "Health & Wellness Centre", cat: "health",
    address: "700 Bay Street (SW corner of Bay & Gerrard, entrance on Gerrard just west of Shoppers Drug Mart)",
    photoUrl: "https://www.studentlife.utoronto.ca/wp-content/uploads/Image-1.jpeg",
    note: "Free medical and mental health care for U of T students \u2014 physical health, counselling, sexual health, and more. Call 416-978-8030 (Mon\u2013Fri, 9 a.m.\u20134:30 p.m.) to register as a new patient before your first visit.",
    officialUrl: "https://studentlife.utoronto.ca/task/find-health-wellness/" },
  { id: "telus-ssp", name: "U of T Telus Health Student Support", cat: "health",
    address: "Phone / app, available anywhere",
    note: "Free, confidential 24-hour support line for any school, health, or life concern \u2014 no appointment needed, works even when you're not on campus.",
    officialUrl: "https://studentlife.utoronto.ca/task/find-health-wellness/" },

  /* ---- food ---- */
  { id: "food-services", name: "U of T Food Services \u2014 Where to Eat", cat: "food",
    address: "30+ locations across St. George",
    note: "The official map and menu list for every cafeteria, café, and dining hall on campus (Robarts Cafeteria, Sid Smith food court, Second Cup locations, and more). TBucks (loaded via TCard+) get you a 5% discount at the main dining halls.",
    officialUrl: "https://foodservices.utoronto.ca/where-to-eat/" },
  { id: "mobile-order", name: "U of T Mobile Order App", cat: "food",
    address: "App (iOS / Android)",
    note: "Order ahead and skip the lineup at participating campus food locations \u2014 handy between back-to-back classes.",
    officialUrl: "https://foodservices.utoronto.ca/where-to-eat/" },

  /* ---- print ---- */
  { id: "tcard-plus", name: "TCard+", cat: "print",
    address: "tcardplus.utoronto.ca",
    note: "Load funds (TBucks) onto your TCard for printing, photocopying, and food purchases across campus.",
    officialUrl: "https://tcardplus.utoronto.ca/" },
  { id: "wireless-printing", name: "Wireless / mobile printing", cat: "print",
    address: "Library computers & printers across campus",
    note: "Send a print job from your own laptop while on U of T WiFi, then release it with your TCard at any library printer \u2014 Robarts, Gerstein, and most other St. George libraries all support this.",
    officialUrl: "https://onesearch.library.utoronto.ca/faq/where-are-printers-st-george-campus" },
  { id: "uoft-bookstore", name: "U of T Bookstore", cat: "print",
    address: "214 College Street (Koffler Student Centre, corner of College & St. George)",
    note: "Textbooks, course materials, stationery, and U of T merch. Also buys back used textbooks year-round. Check the official site for today's hours \u2014 they change with the term.",
    officialUrl: "https://www.uoftbookstore.com" },

  /* ---- other ---- */
  { id: "acorn-help", name: "Student Help Desk (UTORid, WiFi, tech issues)", cat: "other",
    address: "Robarts Library & online",
    note: "If your UTORid, WiFi, printing, or ACORN login isn't working, this is who to ask \u2014 not your college registrar.",
    officialUrl: "https://onesearch.library.utoronto.ca/library-campus/st-george-campus" }
];


const SITE_UPDATES = [
  { date: "Aug 2026", text: "Added Campus Facilities: libraries, gyms, health services, food, printing and the bookstore, verified against official U of T pages." },
  { date: "Aug 2026", text: "Added the UofT Glossary: 35 terms like POSt, FCE, CR/NCR and LWD explained in plain language, from the official 2026-27 Calendar." },
  { date: "Aug 2026", text: "Every page now has its own shareable link, deadline checklists save your progress, and search covers all 123 breadth courses." },
  { date: "Aug 2026", text: "Renamed Fees & Dates to Undergraduate and moved program-choosing there; Courses now focuses on current students." },
  { date: "Aug 2026", text: "Verified all 11 residences against the official 2026-27 fee schedule and winter break policies." }
];


/* ============================================
   전체 St. George 학부 프로그램 A-Z 목록 (188개)

   출처: utoronto.ca/academics/undergraduate-programs (공식, 캠퍼스=St. George 필터링)
   확인일: 2026-08-25

   ⚠️ 이 목록은 이름·학위종류·Major/Minor/Specialist 여부·공식 링크만 있습니다.
      필수과목·최소성적처럼 자세히 조사된 건 위쪽 COURSE_PROGRAMS(학과별 상세)뿐입니다.
      여기 없는 조사 내용은 "공식 페이지에서 확인" 버튼으로 안내합니다.
   ============================================ */

const ALL_PROGRAMS_AZ = [
  { id: "az-accounting", name: "Accounting", degree: "Bachelor of Commerce", types: "Specialist", officialUrl: "https://artsci.calendar.utoronto.ca/section/Rotman-Commerce" },
  { id: "az-actuarial-science", name: "Actuarial Science", degree: "Honours Bachelor of Science", types: "Major Specialist", officialUrl: "https://artsci.calendar.utoronto.ca/section/Actuarial-Science" },
  { id: "az-african-studies", name: "African Studies", degree: "Honours Bachelor of Arts", types: "Major Minor Specialist", officialUrl: "https://artsci.calendar.utoronto.ca/section/African-Studies" },
  { id: "az-american-studies", name: "American Studies", degree: "Honours Bachelor of Arts", types: "Major Minor", officialUrl: "https://artsci.calendar.utoronto.ca/section/American-Studies" },
  { id: "az-animal-physiology", name: "Animal Physiology", degree: "Honours Bachelor of Science", types: "Major Internship", officialUrl: "https://artsci.calendar.utoronto.ca/section/Cell-and-Systems-Biology" },
  { id: "az-anthropology-evolutionary", name: "Anthropology: Evolutionary", degree: "Honours Bachelor of Science", types: "Major", officialUrl: "https://artsci.calendar.utoronto.ca/section/Anthropology" },
  { id: "az-anthropology-general-arts", name: "Anthropology: General (Arts)", degree: "Honours Bachelor of Arts", types: "Major Minor", officialUrl: "https://artsci.calendar.utoronto.ca/section/Anthropology" },
  { id: "az-anthropology-society-culture-and-language", name: "Anthropology: Society, Culture and Language", degree: "Honours Bachelor of Arts", types: "Major Specialist", officialUrl: "https://artsci.calendar.utoronto.ca/section/Anthropology" },
  { id: "az-applied-data-science", name: "Applied Data Science", degree: "Honours Bachelor of Science", types: "Minor", officialUrl: "https://artsci.calendar.utoronto.ca/section/Data-Science" },
  { id: "az-applied-mathematics", name: "Applied Mathematics", degree: "Honours Bachelor of Science", types: "Specialist Internship", officialUrl: "https://artsci.calendar.utoronto.ca/section/Mathematics" },
  { id: "az-archaeology", name: "Archaeology", degree: "Honours Bachelor of Arts", types: "Major Minor Specialist", officialUrl: "https://artsci.calendar.utoronto.ca/section/Archaeology" },
  { id: "az-architectural-studies", name: "Architectural Studies", degree: "Honours Bachelor of Arts", types: "Major Specialist", officialUrl: "https://daniels.calendar.utoronto.ca/section/Architectural-Studies" },
  { id: "az-art-history", name: "Art History", degree: "Honours Bachelor of Arts", types: "Major Minor Specialist", officialUrl: "https://artsci.calendar.utoronto.ca/section/Art-History" },
  { id: "az-artist-diploma-music", name: "Artist Diploma (Music)", degree: "Artist Diploma", types: "Specialist", officialUrl: "https://music.calendar.utoronto.ca/section/Artist-Diploma" },
  { id: "az-asian-canadian-studies", name: "Asian Canadian Studies", degree: "Honours Bachelor of Arts", types: "Minor", officialUrl: "https://artsci.calendar.utoronto.ca/section/University-College" },
  { id: "az-astronomy-and-astrophysics", name: "Astronomy and Astrophysics", degree: "Honours Bachelor of Science", types: "Major Minor", officialUrl: "https://artsci.calendar.utoronto.ca/section/Astronomy-and-Astrophysics" },
  { id: "az-astronomy-and-physics", name: "Astronomy and Physics", degree: "Honours Bachelor of Science", types: "Specialist", officialUrl: "https://artsci.calendar.utoronto.ca/section/Astronomy-and-Astrophysics" },
  { id: "az-biochemistry", name: "Biochemistry", degree: "Honours Bachelor of Science", types: "Major Specialist", officialUrl: "https://artsci.calendar.utoronto.ca/section/Biochemistry" },
  { id: "az-biodiversity-and-conservation-biology", name: "Biodiversity and Conservation Biology", degree: "Honours Bachelor of Science", types: "Major", officialUrl: "https://artsci.calendar.utoronto.ca/section/Ecology-and-Evolutionary-Biology" },
  { id: "az-bioethics", name: "Bioethics", degree: "Honours Bachelor of Arts", types: "Major Minor Specialist", officialUrl: "https://artsci.calendar.utoronto.ca/section/Philosophy" },
  { id: "az-bioinformatics-and-computational-biology", name: "Bioinformatics and Computational Biology", degree: "Honours Bachelor of Science", types: "Specialist Internship", officialUrl: "https://artsci.calendar.utoronto.ca/section/Cell-and-Systems-Biology" },
  { id: "az-biological-chemistry", name: "Biological Chemistry", degree: "Honours Bachelor of Science", types: "Specialist Internship", officialUrl: "https://artsci.calendar.utoronto.ca/section/Chemistry" },
  { id: "az-biological-physics", name: "Biological Physics", degree: "Honours Bachelor of Science", types: "Specialist Internship", officialUrl: "https://artsci.calendar.utoronto.ca/section/Physics" },
  { id: "az-biology", name: "Biology", degree: "Honours Bachelor of Science", types: "Major Minor Specialist", officialUrl: "https://artsci.calendar.utoronto.ca/section/Biology" },
  { id: "az-biomedical-toxicology", name: "Biomedical Toxicology", degree: "Honours Bachelor of Science", types: "Major Specialist Internship", officialUrl: "https://artsci.calendar.utoronto.ca/section/Pharmacology-and-Toxicology" },
  { id: "az-book-and-media-studies", name: "Book and Media Studies", degree: "Honours Bachelor of Arts", types: "Major Minor Internship", officialUrl: "https://artsci.calendar.utoronto.ca/section/St.-Michael's-College" },
  { id: "az-buddhist-studies", name: "Buddhist Studies", degree: "Honours Bachelor of Arts", types: "Major Specialist", officialUrl: "https://artsci.calendar.utoronto.ca/section/Religion" },
  { id: "az-business-german", name: "Business German", degree: "Honours Bachelor of Arts", types: "Minor", officialUrl: "https://artsci.calendar.utoronto.ca/section/German" },
  { id: "az-canadian-studies", name: "Canadian Studies", degree: "Honours Bachelor of Arts", types: "Major Minor Specialist", officialUrl: "https://artsci.calendar.utoronto.ca/section/University-College" },
  { id: "az-caribbean-studies", name: "Caribbean Studies", degree: "Honours Bachelor of Arts", types: "Major Minor Specialist", officialUrl: "https://artsci.calendar.utoronto.ca/section/Centre-for-Caribbean-Studies" },
  { id: "az-cell-and-molecular-biology", name: "Cell and Molecular Biology", degree: "Honours Bachelor of Science", types: "Major Specialist Internship", officialUrl: "https://artsci.calendar.utoronto.ca/section/Cell-and-Systems-Biology" },
  { id: "az-celtic-studies", name: "Celtic Studies", degree: "Honours Bachelor of Arts", types: "Major Minor Specialist", officialUrl: "https://artsci.calendar.utoronto.ca/section/St.-Michael's-College" },
  { id: "az-chemical-engineering", name: "Chemical Engineering", degree: "Bachelor of Applied Science", types: "Major Co-op", officialUrl: "https://engineering.calendar.utoronto.ca/section/Chemical-Engineering-and-Applied-Chemistry" },
  { id: "az-chemical-physics", name: "Chemical Physics", degree: "Honours Bachelor of Science", types: "Specialist Internship", officialUrl: "https://artsci.calendar.utoronto.ca/section/Chemistry" },
  { id: "az-chemistry", name: "Chemistry", degree: "Honours Bachelor of Science", types: "Major Minor Specialist Internship", officialUrl: "https://artsci.calendar.utoronto.ca/section/Chemistry" },
  { id: "az-christianity-and-culture", name: "Christianity and Culture", degree: "Honours Bachelor of Arts", types: "Major Minor", officialUrl: "https://artsci.calendar.utoronto.ca/section/St.-Michael's-College" },
  { id: "az-christianity-and-education", name: "Christianity and Education", degree: "Honours Bachelor of Arts", types: "Minor", officialUrl: "https://artsci.calendar.utoronto.ca/section/St.-Michael's-College" },
  { id: "az-cinema-studies", name: "Cinema Studies", degree: "Honours Bachelor of Arts", types: "Major Minor Specialist", officialUrl: "https://artsci.calendar.utoronto.ca/section/Cinema-Studies-Institute" },
  { id: "az-civil-engineering", name: "Civil Engineering", degree: "Bachelor of Applied Science", types: "Major Co-op", officialUrl: "https://engineering.calendar.utoronto.ca/section/Civil-Engineering" },
  { id: "az-classical-civilization", name: "Classical Civilization", degree: "Honours Bachelor of Arts", types: "Major Minor", officialUrl: "https://artsci.calendar.utoronto.ca/section/Classics" },
  { id: "az-classics-greek-and-latin", name: "Classics (Greek and Latin)", degree: "Honours Bachelor of Arts", types: "Major", officialUrl: "https://artsci.calendar.utoronto.ca/section/Classics" },
  { id: "az-cognitive-science-arts", name: "Cognitive Science (Arts)", degree: "Honours Bachelor of Arts", types: "Major", officialUrl: "https://artsci.calendar.utoronto.ca/section/University-College" },
  { id: "az-cognitive-science-science", name: "Cognitive Science (Science)", degree: "Honours Bachelor of Science", types: "Major", officialUrl: "https://artsci.calendar.utoronto.ca/section/University-College" },
  { id: "az-composition-music", name: "Composition (Music)", degree: "Bachelor of Music", types: "Major Minor", officialUrl: "https://music.calendar.utoronto.ca/section/Bachelor-of-Music" },
  { id: "az-computer-engineering", name: "Computer Engineering", degree: "Bachelor of Applied Science", types: "Major Co-op", officialUrl: "https://engineering.calendar.utoronto.ca/section/Electrical-and-Computer-Engineering" },
  { id: "az-computer-science", name: "Computer Science", degree: "Honours Bachelor of Science", types: "Major Minor Specialist Internship", officialUrl: "https://artsci.calendar.utoronto.ca/section/Computer-Science" },
  { id: "az-contemporary-asian-studies-dr-david-chu-program-in", name: "Contemporary Asian Studies, Dr. David Chu Program in", degree: "Honours Bachelor of Arts", types: "Major Minor", officialUrl: "https://artsci.calendar.utoronto.ca/section/Contemporary-Asian-Studies" },
  { id: "az-creative-writing", name: "Creative Writing", degree: "Honours Bachelor of Arts", types: "Minor", officialUrl: "https://artsci.calendar.utoronto.ca/section/English" },
  { id: "az-creativity-and-society", name: "Creativity and Society", degree: "Honours Bachelor of Arts", types: "Minor", officialUrl: "https://artsci.calendar.utoronto.ca/section/Victoria-College" },
  { id: "az-criminology-and-sociolegal-studies", name: "Criminology and Sociolegal Studies", degree: "Honours Bachelor of Arts", types: "Major Specialist", officialUrl: "https://artsci.calendar.utoronto.ca/section/Criminology-and-Sociolegal-Studies" },
  { id: "az-critical-studies-in-equity-and-solidarity", name: "Critical Studies in Equity and Solidarity", degree: "Honours Bachelor of Arts", types: "Major Minor", officialUrl: "https://artsci.calendar.utoronto.ca/section/New-College" },
  { id: "az-data-science", name: "Data Science", degree: "Honours Bachelor of Science", types: "Specialist Internship", officialUrl: "https://artsci.calendar.utoronto.ca/section/Data-Science" },
  { id: "az-diaspora-and-transnational-studies", name: "Diaspora and Transnational Studies", degree: "Honours Bachelor of Arts", types: "Major Minor", officialUrl: "https://artsci.calendar.utoronto.ca/section/Diaspora-and-Transnational-Studies" },
  { id: "az-digital-humanities", name: "Digital Humanities", degree: "Honours Bachelor of Arts", types: "Minor", officialUrl: "https://artsci.calendar.utoronto.ca/section/Woodsworth-College" },
  { id: "az-drama", name: "Drama", degree: "Honours Bachelor of Arts", types: "Major Minor Specialist", officialUrl: "https://artsci.calendar.utoronto.ca/section/Drama,-Theatre-and-Performance-Studies" },
  { id: "az-earth-and-environmental-systems", name: "Earth and Environmental Systems", degree: "Honours Bachelor of Science", types: "Major", officialUrl: "https://artsci.calendar.utoronto.ca/section/Earth-Sciences" },
  { id: "az-east-asian-studies", name: "East Asian Studies", degree: "Honours Bachelor of Arts", types: "Major Minor Specialist", officialUrl: "https://artsci.calendar.utoronto.ca/section/East-Asian-Studies" },
  { id: "az-ecology-and-evolutionary-biology", name: "Ecology and Evolutionary Biology", degree: "Honours Bachelor of Science", types: "Major Specialist", officialUrl: "https://artsci.calendar.utoronto.ca/section/Ecology-and-Evolutionary-Biology" },
  { id: "az-economics-arts", name: "Economics (Arts)", degree: "Honours Bachelor of Arts", types: "Major Minor Specialist Internship", officialUrl: "https://artsci.calendar.utoronto.ca/section/Economics" },
  { id: "az-economics-and-mathematics", name: "Economics and Mathematics", degree: "Honours Bachelor of Science", types: "Specialist Internship", officialUrl: "https://artsci.calendar.utoronto.ca/section/Economics" },
  { id: "az-education-and-society", name: "Education and Society", degree: "Honours Bachelor of Arts", types: "Minor", officialUrl: "https://artsci.calendar.utoronto.ca/section/Victoria-College" },
  { id: "az-electrical-engineering", name: "Electrical Engineering", degree: "Bachelor of Applied Science", types: "Major Co-op", officialUrl: "https://engineering.calendar.utoronto.ca/section/Electrical-and-Computer-Engineering" },
  { id: "az-engineering-science", name: "Engineering Science", degree: "Bachelor of Applied Science in Engineering Science", types: "Major Co-op", officialUrl: "https://engineering.calendar.utoronto.ca/section/Engineering-Science" },
  { id: "az-english", name: "English", degree: "Honours Bachelor of Arts", types: "Major Minor Specialist", officialUrl: "https://artsci.calendar.utoronto.ca/section/English" },
  { id: "az-environment-and-behaviour", name: "Environment and Behaviour", degree: "Honours Bachelor of Science", types: "Minor", officialUrl: "https://artsci.calendar.utoronto.ca/section/School-of-the-Environment" },
  { id: "az-environment-and-energy", name: "Environment and Energy", degree: "Honours Bachelor of Science", types: "Minor", officialUrl: "https://artsci.calendar.utoronto.ca/section/School-of-the-Environment" },
  { id: "az-environment-and-health", name: "Environment and Health", degree: "Honours Bachelor of Science", types: "Major Specialist Internship", officialUrl: "https://artsci.calendar.utoronto.ca/section/School-of-the-Environment" },
  { id: "az-environment-and-toxicology", name: "Environment and Toxicology", degree: "Honours Bachelor of Science", types: "Specialist Internship", officialUrl: "https://artsci.calendar.utoronto.ca/section/School-of-the-Environment" },
  { id: "az-environmental-anthropology", name: "Environmental Anthropology", degree: "Honours Bachelor of Arts", types: "Minor", officialUrl: "https://artsci.calendar.utoronto.ca/section/Anthropology" },
  { id: "az-environmental-biology", name: "Environmental Biology", degree: "Honours Bachelor of Science", types: "Major Minor", officialUrl: "https://artsci.calendar.utoronto.ca/section/Ecology-and-Evolutionary-Biology" },
  { id: "az-environmental-chemistry", name: "Environmental Chemistry", degree: "Honours Bachelor of Science", types: "Major Minor", officialUrl: "https://artsci.calendar.utoronto.ca/section/Chemistry" },
  { id: "az-environmental-economics", name: "Environmental Economics", degree: "Honours Bachelor of Arts", types: "Minor", officialUrl: "https://artsci.calendar.utoronto.ca/section/School-of-the-Environment" },
  { id: "az-environmental-ethics", name: "Environmental Ethics", degree: "Honours Bachelor of Arts", types: "Major Minor Internship", officialUrl: "https://artsci.calendar.utoronto.ca/section/School-of-the-Environment" },
  { id: "az-environmental-geography", name: "Environmental Geography", degree: "Honours Bachelor of Arts", types: "Major Minor Specialist", officialUrl: "https://artsci.calendar.utoronto.ca/section/School-of-the-Environment" },
  { id: "az-environmental-geosciences", name: "Environmental Geosciences", degree: "Honours Bachelor of Science", types: "Minor Specialist", officialUrl: "https://artsci.calendar.utoronto.ca/section/Earth-Sciences" },
  { id: "az-environmental-science", name: "Environmental Science", degree: "Honours Bachelor of Science", types: "Major Minor Internship", officialUrl: "https://artsci.calendar.utoronto.ca/section/School-of-the-Environment" },
  { id: "az-environmental-studies", name: "Environmental Studies", degree: "Honours Bachelor of Arts", types: "Major Minor Internship", officialUrl: "https://artsci.calendar.utoronto.ca/section/School-of-the-Environment" },
  { id: "az-ethics-society-and-law", name: "Ethics, Society and Law", degree: "Honours Bachelor of Arts", types: "Major", officialUrl: "https://artsci.calendar.utoronto.ca/section/Trinity-College" },
  { id: "az-european-affairs", name: "European Affairs", degree: "Honours Bachelor of Arts", types: "Major Minor", officialUrl: "https://artsci.calendar.utoronto.ca/section/European-Affairs" },
  { id: "az-finance-and-economics", name: "Finance and Economics", degree: "Bachelor of Commerce", types: "Specialist", officialUrl: "https://artsci.calendar.utoronto.ca/section/Rotman-Commerce" },
  { id: "az-financial-economics", name: "Financial Economics", degree: "Honours Bachelor of Science", types: "Specialist Internship", officialUrl: "https://artsci.calendar.utoronto.ca/section/Economics" },
  { id: "az-forest-conservation", name: "Forest Conservation", degree: "Honours Bachelor of Arts", types: "Major Minor Specialist", officialUrl: "https://artsci.calendar.utoronto.ca/section/Forest-Conservation-and-Forest-Biomaterials-Science" },
  { id: "az-forest-conservation-science", name: "Forest Conservation Science", degree: "Honours Bachelor of Science", types: "Major Minor Specialist", officialUrl: "https://artsci.calendar.utoronto.ca/section/Forest-Conservation-and-Forest-Biomaterials-Science" },
  { id: "az-french-language", name: "French Language", degree: "Honours Bachelor of Arts", types: "Minor", officialUrl: "https://artsci.calendar.utoronto.ca/section/French" },
  { id: "az-french-language-and-french-linguistics", name: "French Language and French Linguistics", degree: "Honours Bachelor of Arts", types: "Major Specialist", officialUrl: "https://artsci.calendar.utoronto.ca/section/French" },
  { id: "az-french-language-and-literature", name: "French Language and Literature", degree: "Honours Bachelor of Arts", types: "Major Specialist", officialUrl: "https://artsci.calendar.utoronto.ca/section/French" },
  { id: "az-french-language-learning", name: "French Language Learning", degree: "Honours Bachelor of Arts", types: "Major", officialUrl: "https://artsci.calendar.utoronto.ca/section/French" },
  { id: "az-french-studies", name: "French Studies", degree: "Honours Bachelor of Arts", types: "Minor", officialUrl: "https://artsci.calendar.utoronto.ca/section/French" },
  { id: "az-genome-biology", name: "Genome Biology", degree: "Honours Bachelor of Science", types: "Major Internship", officialUrl: "https://artsci.calendar.utoronto.ca/section/Biology" },
  { id: "az-geology", name: "Geology", degree: "Honours Bachelor of Science", types: "Specialist", officialUrl: "https://artsci.calendar.utoronto.ca/section/Earth-Sciences" },
  { id: "az-geophysics", name: "Geophysics", degree: "Honours Bachelor of Science", types: "Specialist", officialUrl: "https://artsci.calendar.utoronto.ca/section/Earth-Sciences" },
  { id: "az-geoscience", name: "Geoscience", degree: "Honours Bachelor of Science", types: "Major Minor", officialUrl: "https://artsci.calendar.utoronto.ca/section/Earth-Sciences" },
  { id: "az-german-studies", name: "German Studies", degree: "Honours Bachelor of Arts", types: "Major Minor Specialist", officialUrl: "https://artsci.calendar.utoronto.ca/section/German" },
  { id: "az-german-studies-in-english", name: "German Studies in English", degree: "Honours Bachelor of Arts", types: "Minor", officialUrl: "https://artsci.calendar.utoronto.ca/section/German" },
  { id: "az-greek", name: "Greek", degree: "Honours Bachelor of Arts", types: "Major Minor", officialUrl: "https://artsci.calendar.utoronto.ca/section/Classics" },
  { id: "az-history", name: "History", degree: "Honours Bachelor of Arts", types: "Major Minor Specialist Internship", officialUrl: "https://artsci.calendar.utoronto.ca/section/History" },
  { id: "az-history-and-philosophy-of-science-and-technology", name: "History and Philosophy of Science and Technology", degree: "Honours Bachelor of Arts", types: "Major Minor", officialUrl: "https://artsci.calendar.utoronto.ca/section/History-and-Philosophy-of-Science-and-Technology" },
  { id: "az-history-culture-and-theory-music", name: "History, Culture and Theory (Music)", degree: "Bachelor of Music", types: "Major Minor", officialUrl: "https://music.calendar.utoronto.ca/section/Bachelor-of-Music" },
  { id: "az-human-biology", name: "Human Biology", degree: "Honours Bachelor of Science", types: "Major", officialUrl: "https://artsci.calendar.utoronto.ca/section/Human-Biology" },
  { id: "az-human-biology-fundamental-genetics-and-its-applications", name: "Human Biology: Fundamental Genetics and its Applications", degree: "Honours Bachelor of Science", types: "Major Specialist Internship", officialUrl: "https://artsci.calendar.utoronto.ca/section/Human-Biology" },
  { id: "az-human-biology-global-health", name: "Human Biology: Global Health", degree: "Honours Bachelor of Science", types: "Major Specialist Internship", officialUrl: "https://artsci.calendar.utoronto.ca/section/Human-Biology" },
  { id: "az-human-biology-health-and-disease", name: "Human Biology: Health and Disease", degree: "Honours Bachelor of Science", types: "Major Specialist Internship", officialUrl: "https://artsci.calendar.utoronto.ca/section/Human-Biology" },
  { id: "az-human-biology-neuroscience", name: "Human Biology: Neuroscience", degree: "Honours Bachelor of Science", types: "Major Specialist Internship", officialUrl: "https://artsci.calendar.utoronto.ca/section/Human-Biology" },
  { id: "az-human-geography", name: "Human Geography", degree: "Honours Bachelor of Arts", types: "Major Minor Specialist", officialUrl: "https://artsci.calendar.utoronto.ca/section/Geography-and-Planning" },
  { id: "az-immunology", name: "Immunology", degree: "Honours Bachelor of Science", types: "Major Minor Specialist", officialUrl: "https://artsci.calendar.utoronto.ca/section/Immunology" },
  { id: "az-indigenous-studies", name: "Indigenous Studies", degree: "Honours Bachelor of Arts", types: "Major Minor Specialist", officialUrl: "https://artsci.calendar.utoronto.ca/section/Indigenous-Studies" },
  { id: "az-industrial-engineering", name: "Industrial Engineering", degree: "Bachelor of Applied Science", types: "Major Co-op", officialUrl: "https://engineering.calendar.utoronto.ca/section/Industrial-Engineering" },
  { id: "az-industrial-relations-and-human-resources", name: "Industrial Relations and Human Resources", degree: "Honours Bachelor of Arts", types: "Major Specialist Internship", officialUrl: "https://artsci.calendar.utoronto.ca/section/Industrial-Relations-and-Human-Resources" },
  { id: "az-information", name: "Information", degree: "Bachelor of Information", types: "Professional", officialUrl: "https://ischool.utoronto.ca/bachelor-of-information/" },
  { id: "az-interdisciplinary-music-studies-classical-or-jazz", name: "Interdisciplinary Music Studies: Classical or Jazz", degree: "Bachelor of Music", types: "Major Minor", officialUrl: "https://music.calendar.utoronto.ca/section/Bachelor-of-Music" },
  { id: "az-international-relations", name: "International Relations", degree: "Honours Bachelor of Arts", types: "Major Specialist", officialUrl: "https://artsci.calendar.utoronto.ca/section/Trinity-College" },
  { id: "az-islamic-studies", name: "Islamic Studies", degree: "Honours Bachelor of Arts", types: "Major", officialUrl: "https://artsci.calendar.utoronto.ca/section/Religion" },
  { id: "az-italian", name: "Italian", degree: "Honours Bachelor of Arts", types: "Major Minor Specialist", officialUrl: "https://artsci.calendar.utoronto.ca/section/Italian" },
  { id: "az-italian-culture-and-communication-studies", name: "Italian Culture and Communication Studies", degree: "Honours Bachelor of Arts", types: "Minor", officialUrl: "https://artsci.calendar.utoronto.ca/section/Italian" },
  { id: "az-jewish-studies", name: "Jewish Studies", degree: "Honours Bachelor of Arts", types: "Major Minor Specialist", officialUrl: "https://artsci.calendar.utoronto.ca/section/Centre-for-Jewish-Studies" },
  { id: "az-kinesiology-and-physical-education", name: "Kinesiology and Physical Education", degree: "Bachelor of Kinesiology", types: "Major", officialUrl: "https://kpe.utoronto.ca/academics-researchfuture-students/bachelor-kinesiology-bkin" },
  { id: "az-latin", name: "Latin", degree: "Honours Bachelor of Arts", types: "Major Minor", officialUrl: "https://artsci.calendar.utoronto.ca/section/Classics" },
  { id: "az-latin-american-studies", name: "Latin American Studies", degree: "Honours Bachelor of Arts", types: "Major Minor", officialUrl: "https://artsci.calendar.utoronto.ca/section/Latin-American-Studies" },
  { id: "az-linguistics", name: "Linguistics", degree: "Honours Bachelor of Arts", types: "Major Minor Specialist", officialUrl: "https://artsci.calendar.utoronto.ca/section/Linguistics" },
  { id: "az-literature-and-critical-theory", name: "Literature and Critical Theory", degree: "Honours Bachelor of Arts", types: "Major Minor Specialist", officialUrl: "https://artsci.calendar.utoronto.ca/section/Victoria-College" },
  { id: "az-management-commerce", name: "Management (Commerce)", degree: "Bachelor of Commerce", types: "Specialist", officialUrl: "https://artsci.calendar.utoronto.ca/section/Rotman-Commerce" },
  { id: "az-material-culture-and-semiotics", name: "Material Culture and Semiotics", degree: "Honours Bachelor of Arts", types: "Minor", officialUrl: "https://artsci.calendar.utoronto.ca/section/Victoria-College" },
  { id: "az-materials-engineering", name: "Materials Engineering", degree: "Bachelor of Applied Science", types: "Major Co-op", officialUrl: "https://engineering.calendar.utoronto.ca/section/Materials-Science-and-Engineering" },
  { id: "az-materials-science", name: "Materials Science", degree: "Honours Bachelor of Science", types: "Specialist Internship", officialUrl: "https://artsci.calendar.utoronto.ca/section/Materials-Science" },
  { id: "az-mathematical-applications-in-economics-and-finance", name: "Mathematical Applications in Economics and Finance", degree: "Honours Bachelor of Science", types: "Specialist Internship", officialUrl: "https://artsci.calendar.utoronto.ca/section/Mathematics" },
  { id: "az-mathematics", name: "Mathematics", degree: "Honours Bachelor of Science", types: "Major Minor Specialist Internship", officialUrl: "https://artsci.calendar.utoronto.ca/section/Mathematics" },
  { id: "az-mathematics-and-its-applications-physical-science", name: "Mathematics and its Applications: Physical Science", degree: "Honours Bachelor of Science", types: "Specialist Internship", officialUrl: "https://artsci.calendar.utoronto.ca/section/Mathematics" },
  { id: "az-mathematics-and-its-applications-probability-statistics", name: "Mathematics and its Applications: Probability/Statistics", degree: "Honours Bachelor of Science", types: "Specialist Internship", officialUrl: "https://artsci.calendar.utoronto.ca/section/Mathematics" },
  { id: "az-mathematics-and-its-applications-teaching", name: "Mathematics and its Applications: Teaching", degree: "Honours Bachelor of Science", types: "Specialist Internship", officialUrl: "https://artsci.calendar.utoronto.ca/section/Mathematics" },
  { id: "az-mathematics-and-philosophy", name: "Mathematics and Philosophy", degree: "Honours Bachelor of Science", types: "Specialist Internship", officialUrl: "https://artsci.calendar.utoronto.ca/section/Mathematics" },
  { id: "az-mathematics-and-physics", name: "Mathematics and Physics", degree: "Honours Bachelor of Science", types: "Specialist Internship", officialUrl: "https://artsci.calendar.utoronto.ca/section/Mathematics" },
  { id: "az-mechanical-engineering", name: "Mechanical Engineering", degree: "Bachelor of Applied Science", types: "Major Co-op", officialUrl: "https://engineering.calendar.utoronto.ca/section/Mechanical-Engineering" },
  { id: "az-mediaeval-studies", name: "Mediaeval Studies", degree: "Honours Bachelor of Arts", types: "Major Minor Specialist", officialUrl: "https://artsci.calendar.utoronto.ca/section/St.-Michael's-College" },
  { id: "az-medical-anthropology", name: "Medical Anthropology", degree: "Honours Bachelor of Arts", types: "Minor", officialUrl: "https://artsci.calendar.utoronto.ca/section/Anthropology" },
  { id: "az-medical-radiation-sciences", name: "Medical Radiation Sciences", degree: "Bachelor of Science in Medical Radiation Science", types: "Professional", officialUrl: "https://radonc.utoronto.ca/bachelor-science-medical-radiation-sciences" },
  { id: "az-medicine", name: "Medicine", degree: "Doctor of Medicine", types: "Professional Second-Entry", officialUrl: "https://applymd.utoronto.ca" },
  { id: "az-mineral-engineering", name: "Mineral Engineering", degree: "Bachelor of Applied Science", types: "Major Co-op", officialUrl: "https://engineering.calendar.utoronto.ca/section/Mineral-Engineering" },
  { id: "az-molecular-genetics-and-microbiology", name: "Molecular Genetics and Microbiology", degree: "Honours Bachelor of Science", types: "Major Specialist", officialUrl: "https://artsci.calendar.utoronto.ca/section/Molecular-Genetics-and-Microbiology" },
  { id: "az-music", name: "Music", degree: "Honours Bachelor of Arts", types: "Major Specialist", officialUrl: "https://artsci.calendar.utoronto.ca/section/Music" },
  { id: "az-music-education-classical-or-jazz", name: "Music Education: Classical or Jazz", degree: "Bachelor of Music", types: "Major Minor", officialUrl: "https://music.calendar.utoronto.ca/section/Bachelor-of-Music" },
  { id: "az-music-history-and-culture", name: "Music History and Culture", degree: "Honours Bachelor of Arts", types: "Minor", officialUrl: "https://artsci.calendar.utoronto.ca/section/Music" },
  { id: "az-music-with-ensemble-option", name: "Music with Ensemble Option", degree: "Honours Bachelor of Arts", types: "Major Specialist", officialUrl: "https://artsci.calendar.utoronto.ca/section/Music" },
  { id: "az-near-and-middle-eastern-civilizations", name: "Near and Middle Eastern Civilizations", degree: "Honours Bachelor of Arts", types: "Major Minor Specialist", officialUrl: "https://artsci.calendar.utoronto.ca/section/Near-and-Middle-Eastern-Civilizations" },
  { id: "az-nursing", name: "Nursing", degree: "Bachelor of Science in Nursing", types: "Professional", officialUrl: "https://bloomberg.nursing.utoronto.ca/learn-with-us/bachelor-of-science-in-nursing/" },
  { id: "az-nutritional-sciences", name: "Nutritional Sciences", degree: "Honours Bachelor of Science", types: "Major", officialUrl: "https://artsci.calendar.utoronto.ca/section/Nutritional-Sciences" },
  { id: "az-pathobiology", name: "Pathobiology", degree: "Honours Bachelor of Science", types: "Specialist Internship", officialUrl: "https://artsci.calendar.utoronto.ca/section/Laboratory-Medicine-and-Pathobiology" },
  { id: "az-peace-conflict-and-justice", name: "Peace, Conflict and Justice", degree: "Honours Bachelor of Arts", types: "Major Specialist", officialUrl: "https://artsci.calendar.utoronto.ca/section/Peace,-Conflict-and-Justice" },
  { id: "az-performance-classical-or-jazz", name: "Performance: Classical or Jazz", degree: "Bachelor of Music in Performance", types: "Major Minor", officialUrl: "https://music.calendar.utoronto.ca/section/Bachelor-of-Music-in-Performance" },
  { id: "az-pharmaceutical-chemistry", name: "Pharmaceutical Chemistry", degree: "Honours Bachelor of Science", types: "Specialist Internship", officialUrl: "https://artsci.calendar.utoronto.ca/section/Chemistry" },
  { id: "az-pharmacology", name: "Pharmacology", degree: "Honours Bachelor of Science", types: "Major Specialist Internship", officialUrl: "https://artsci.calendar.utoronto.ca/section/Pharmacology-and-Toxicology" },
  { id: "az-pharmacology-and-biomedical-toxicology", name: "Pharmacology and Biomedical Toxicology", degree: "Honours Bachelor of Science", types: "Specialist Internship", officialUrl: "https://artsci.calendar.utoronto.ca/section/Pharmacology-and-Toxicology" },
  { id: "az-philosophy", name: "Philosophy", degree: "Honours Bachelor of Arts", types: "Major Minor Specialist", officialUrl: "https://artsci.calendar.utoronto.ca/section/Philosophy" },
  { id: "az-physical-and-environmental-geography", name: "Physical and Environmental Geography", degree: "Honours Bachelor of Science", types: "Major Minor Specialist", officialUrl: "https://artsci.calendar.utoronto.ca/section/Geography-and-Planning" },
  { id: "az-physician-assistant", name: "Physician Assistant", degree: "Bachelor of Science Physician Assistant", types: "Professional", officialUrl: "https://paconsortium.ca/overview-prospective-students" },
  { id: "az-physics", name: "Physics", degree: "Honours Bachelor of Science", types: "Major Minor Specialist Internship", officialUrl: "https://artsci.calendar.utoronto.ca/section/Physics" },
  { id: "az-physics-and-philosophy", name: "Physics and Philosophy", degree: "Honours Bachelor of Science", types: "Specialist", officialUrl: "https://artsci.calendar.utoronto.ca/section/Physics" },
  { id: "az-physiology", name: "Physiology", degree: "Honours Bachelor of Science", types: "Major Minor Specialist", officialUrl: "https://artsci.calendar.utoronto.ca/section/Physiology" },
  { id: "az-planetary-science", name: "Planetary Science", degree: "Honours Bachelor of Science", types: "Specialist", officialUrl: "https://artsci.calendar.utoronto.ca/section/Planetary-Science" },
  { id: "az-political-science", name: "Political Science", degree: "Honours Bachelor of Arts", types: "Major Minor Specialist Internship", officialUrl: "https://artsci.calendar.utoronto.ca/section/Political-Science" },
  { id: "az-portuguese", name: "Portuguese", degree: "Honours Bachelor of Arts", types: "Major Minor Specialist", officialUrl: "https://artsci.calendar.utoronto.ca/section/Portuguese" },
  { id: "az-psychology", name: "Psychology", degree: "Honours Bachelor of Science", types: "Major Minor Specialist Internship", officialUrl: "https://artsci.calendar.utoronto.ca/section/Psychology" },
  { id: "az-psychology-research", name: "Psychology Research", degree: "Honours Bachelor of Science", types: "Specialist", officialUrl: "https://artsci.calendar.utoronto.ca/section/Psychology" },
  { id: "az-public-health", name: "Public Health", degree: "Honours Bachelor of Arts", types: "Major", officialUrl: "https://artsci.calendar.utoronto.ca/section/University-College" },
  { id: "az-public-policy", name: "Public Policy", degree: "Honours Bachelor of Arts", types: "Major", officialUrl: "https://artsci.calendar.utoronto.ca/section/Public-Policy" },
  { id: "az-quantitative-biology", name: "Quantitative Biology", degree: "Honours Bachelor of Science", types: "Major", officialUrl: "https://artsci.calendar.utoronto.ca/section/Biology" },
  { id: "az-religion", name: "Religion", degree: "Honours Bachelor of Arts", types: "Major Minor Specialist Internship", officialUrl: "https://artsci.calendar.utoronto.ca/section/Religion" },
  { id: "az-renaissance-studies", name: "Renaissance Studies", degree: "Honours Bachelor of Arts", types: "Major Minor Specialist", officialUrl: "https://artsci.calendar.utoronto.ca/section/Victoria-College" },
  { id: "az-science-technology-and-society", name: "Science, Technology and Society", degree: "Honours Bachelor of Arts", types: "Minor", officialUrl: "https://artsci.calendar.utoronto.ca/section/History-and-Philosophy-of-Science-and-Technology" },
  { id: "az-sexual-diversity-studies", name: "Sexual Diversity Studies", degree: "Honours Bachelor of Arts", types: "Major Minor Specialist", officialUrl: "https://artsci.calendar.utoronto.ca/section/Sexual-Diversity-Studies" },
  { id: "az-slavic-and-east-european-languages-and-cultures", name: "Slavic and East European Languages and Cultures", degree: "Honours Bachelor of Arts", types: "Major Minor Specialist", officialUrl: "https://artsci.calendar.utoronto.ca/section/Slavic-and-East-European-Languages-and-Cultures" },
  { id: "az-slavic-and-east-european-literature-in-translation", name: "Slavic and East European Literature in Translation", degree: "Honours Bachelor of Arts", types: "Minor", officialUrl: "https://artsci.calendar.utoronto.ca/section/Slavic-and-East-European-Languages-and-Cultures" },
  { id: "az-sociology", name: "Sociology", degree: "Honours Bachelor of Arts", types: "Major Minor Specialist Internship", officialUrl: "https://artsci.calendar.utoronto.ca/section/Sociology" },
  { id: "az-south-asian-studies", name: "South Asian Studies", degree: "Honours Bachelor of Arts", types: "Minor", officialUrl: "https://artsci.calendar.utoronto.ca/section/South-Asian-Studies" },
  { id: "az-spanish", name: "Spanish", degree: "Honours Bachelor of Arts", types: "Major Minor Specialist", officialUrl: "https://artsci.calendar.utoronto.ca/section/Spanish" },
  { id: "az-statistical-science-methods-and-practice", name: "Statistical Science: Methods and Practice", degree: "Honours Bachelor of Science", types: "Specialist Internship", officialUrl: "https://artsci.calendar.utoronto.ca/section/Statistical-Sciences" },
  { id: "az-statistical-science-theory-and-methods", name: "Statistical Science: Theory and Methods", degree: "Honours Bachelor of Science", types: "Specialist Internship", officialUrl: "https://artsci.calendar.utoronto.ca/section/Statistical-Sciences" },
  { id: "az-statistics", name: "Statistics", degree: "Honours Bachelor of Science", types: "Major Minor", officialUrl: "https://artsci.calendar.utoronto.ca/section/Statistical-Sciences" },
  { id: "az-synthetic-and-catalytic-chemistry", name: "Synthetic and Catalytic Chemistry", degree: "Honours Bachelor of Science", types: "Specialist Internship", officialUrl: "https://artsci.calendar.utoronto.ca/section/Chemistry" },
  { id: "az-track-one-undeclared-engineering", name: "Track One: Undeclared Engineering", degree: "Bachelor of Applied Science", types: "Major Co-op", officialUrl: "https://engineering.calendar.utoronto.ca/section/Track-One" },
  { id: "az-urban-studies", name: "Urban Studies", degree: "Honours Bachelor of Arts", types: "Major Minor Specialist", officialUrl: "https://artsci.calendar.utoronto.ca/section/Innis-College" },
  { id: "az-visual-studies-arts", name: "Visual Studies (Arts)", degree: "Honours Bachelor of Arts", types: "Minor", officialUrl: "https://artsci.calendar.utoronto.ca/section/Architecture-and-Visual-Studies" },
  { id: "az-visual-studies-design", name: "Visual Studies (Design)", degree: "Honours Bachelor of Arts", types: "Major Minor Specialist", officialUrl: "https://daniels.calendar.utoronto.ca/section/Visual-Studies" },
  { id: "az-women-and-gender-studies", name: "Women and Gender Studies", degree: "Honours Bachelor of Arts", types: "Major Minor Specialist", officialUrl: "https://artsci.calendar.utoronto.ca/section/Women-and-Gender-Studies" },
  { id: "az-work-and-organizations-humanities-contexts", name: "Work and Organizations: Humanities Contexts", degree: "Honours Bachelor of Arts", types: "Major", officialUrl: "https://artsci.calendar.utoronto.ca/section/Industrial-Relations-and-Human-Resources" },
  { id: "az-work-and-organizations-sciences-contexts", name: "Work and Organizations: Sciences Contexts", degree: "Honours Bachelor of Arts", types: "Major", officialUrl: "https://artsci.calendar.utoronto.ca/section/Industrial-Relations-and-Human-Resources" },
  { id: "az-work-and-organizations-social-sciences-contexts", name: "Work and Organizations: Social Sciences Contexts", degree: "Honours Bachelor of Arts", types: "Major", officialUrl: "https://artsci.calendar.utoronto.ca/section/Industrial-Relations-and-Human-Resources" },
  { id: "az-writing-and-rhetoric", name: "Writing and Rhetoric", degree: "Honours Bachelor of Arts", types: "Minor", officialUrl: "https://artsci.calendar.utoronto.ca/section/Innis-College" },
  { id: "az-yiddish-al-and-malka-green-program-in", name: "Yiddish, Al and Malka Green Program in", degree: "Honours Bachelor of Arts", types: "Minor", officialUrl: "https://artsci.calendar.utoronto.ca/section/Yiddish-Studies" },
];

