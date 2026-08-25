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
    videoUrl: "",
    videoCredit: "",
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
    videoUrl: "",
    videoCredit: "",
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
    videoUrl: "",
    videoCredit: "",
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
    videoUrl: "",
    videoCredit: "",
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
    videoUrl: "",
    videoCredit: "",
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
    videoUrl: "",
    videoCredit: "",
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
    videoUrl: "",
    videoCredit: "",
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
      { stars: 4, text: "Rooms are small but the location is unbeatable.", source: "Reddit r/UofT, 2025" },
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
