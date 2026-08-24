/* ============================================
   UofT Guide — 기숙사 정보 (St. George 캠퍼스)

   ★ 앞으로 정보를 고칠 때는 이 파일만 열면 됩니다.

   출처: University of Toronto 공식 페이지
         https://future.utoronto.ca/housing
   확인일: 2026-08-24

   ⚠️ 가격은 매년 바뀝니다. 1년에 두 번쯤 위 페이지를 열어
      숫자가 그대로인지 확인하고 lastChecked 날짜를 고치세요.
   ============================================ */


/* ---- 각 칸에 무엇을 넣는지 ----------------------------------

   id           : 영문 짧은 이름표. 띄어쓰기 없이 (필수)
   name         : 화면에 보이는 이름 (필수)
   price        : 가격. 범위면 낮은 쪽 숫자만. 쉼표 없이 (필수)
   priceMax     : 가격 범위의 높은 쪽. 하나뿐이면 비워둘 것
   priceUnit    : 기간 단위. 비워두면 "per academic year"
   roomType     : 방 형태
   mealPlan     : Included / Optional / None 중 하나
   deadline     : 이 기숙사만의 마감일. 없으면 비워둘 것
   college      : 누가 신청할 수 있는지
   capacity     : 수용 인원. 숫자만
   address      : 주소
   summary      : 상세 화면 맨 위 짧은 설명
   photoUrl     : 대표 사진 주소 (목록 카드에 나옴)
   morePhotos   : 상세 화면에 더 보여줄 사진들
   officialUrl  : 공식 페이지 주소 (필수)
   videoUrl     : 유튜브 주소. 비우면 영상칸이 안 보임
   videoCredit  : 영상 출처
   studentNote  : 학생 의견. 아직 없으면 빈 대괄호 [] 로 둘 것
   noteSource   : 학생 의견 출처
   lastChecked  : 마지막 확인 날짜 (필수)

   ---- 규칙 3가지 ----
   1. 각 줄 끝에 쉼표(,) 를 빠뜨리지 말 것
   2. 글자는 따옴표 "" 로 감쌀 것. 숫자는 감싸지 말 것
   3. { } 와 [ ] 는 항상 짝이 맞아야 함
------------------------------------------------------------- */


const RESIDENCES = [

  {
    id: "campusone",
    name: "CampusOne",
    price: 30380,
    priceMax: 37848,
    priceUnit: "per 12-month lease",
    roomType: "Suite",
    mealPlan: "Included",
    deadline: "",
    college: "Any college",
    capacity: null,
    address: "253 College St",
    summary: "A privately run residence affiliated with U of T, in the middle of downtown. Newer building with hotel-like amenities. Note the fee covers a full 12 months, not just the school year, so it is not directly comparable to the others.",
    photoUrl: "https://future.utoronto.ca/sites/default/files/styles/landscape_3_2_1200/public/2025-02/photo-campusone-exterior.webp?itok=KT-IAR5P",
    morePhotos: [
      "https://future.utoronto.ca/sites/default/files/styles/landscape_3_2_1200/public/2025-02/photo-campusone-bedroom.webp?itok=YXJBWx8h",
      "https://future.utoronto.ca/sites/default/files/styles/landscape_3_2_1200/public/2025-02/photo-campusone-lounge.webp?itok=NNMVbFZ8"
    ],
    officialUrl: "https://live-campusone.ca/",
    videoUrl: "",
    videoCredit: "",
    studentNote: [],
    noteSource: "",
    lastChecked: "2026-08-24"
  },

  {
    id: "chestnut",
    name: "Chestnut Residence",
    price: 21933,
    priceMax: 26202,
    priceUnit: "",
    roomType: "Modified dormitory",
    mealPlan: "Included",
    deadline: "",
    college: "Any college",
    capacity: 1100,
    address: "89 Chestnut St",
    summary: "The largest residence on campus, open to students from every college and faculty. A converted downtown hotel tower, so it sits a few blocks off the main campus.",
    photoUrl: "https://future.utoronto.ca/sites/default/files/styles/landscape_3_2_1200/public/2025-02/photo-chestnut-exterior.jpg?itok=MErgFZ7r",
    morePhotos: [
      "https://future.utoronto.ca/sites/default/files/styles/landscape_3_2_1200/public/2025-02/photo-chestnut-bedroom.jpg?itok=SEPDXDqq",
      "https://future.utoronto.ca/sites/default/files/styles/landscape_3_2_1200/public/2025-02/photo-chestnut-common-area.jpeg?itok=OBekOLF4"
    ],
    officialUrl: "https://chestnut.utoronto.ca/",
    videoUrl: "",
    videoCredit: "",
    studentNote: [],
    noteSource: "",
    lastChecked: "2026-08-24"
  },

  {
    id: "innis",
    name: "Innis College",
    price: 13645,
    priceMax: null,
    priceUnit: "",
    roomType: "Apartment",
    mealPlan: "Optional",
    deadline: "",
    college: "Innis College students",
    capacity: null,
    address: "111 St. George St",
    summary: "Apartment-style living across the street from Innis College. Each unit gives you a private bedroom, with four or five people sharing a kitchen, living room and two bathrooms. One of the cheapest options, partly because no meal plan is required.",
    photoUrl: "https://future.utoronto.ca/sites/default/files/styles/landscape_3_2_1200/public/2025-02/photo-innis-exterior.jpg?itok=5mw9FGqe",
    morePhotos: [
      "https://future.utoronto.ca/sites/default/files/styles/landscape_3_2_1200/public/2025-02/photo-innis-bedroom.jpg?itok=dMjxu26H",
      "https://future.utoronto.ca/sites/default/files/styles/landscape_3_2_1200/public/2025-02/photo-innis-common-area.jpg?itok=0IgVMlEQ"
    ],
    officialUrl: "https://innis.utoronto.ca/residence/about-the-residence/",
    videoUrl: "",
    videoCredit: "",
    studentNote: [],
    noteSource: "",
    lastChecked: "2026-08-24"
  },

  {
    id: "knox",
    name: "Knox Residence",
    price: 17898,
    priceMax: 19585,
    priceUnit: "",
    roomType: "Traditional dormitory",
    mealPlan: "Included",
    deadline: "",
    college: "Any college",
    capacity: null,
    address: "59 St. George St",
    summary: "Right in the middle of the St. George campus and open to students from any faculty or college. Traditional dorm setup with shared washrooms.",
    photoUrl: "https://future.utoronto.ca/sites/default/files/styles/landscape_3_2_1200/public/2025-02/photo-knox-residence-courtyard.jpg?itok=cGoOH_OL",
    morePhotos: [
      "https://future.utoronto.ca/sites/default/files/styles/landscape_3_2_1200/public/2025-02/photo-knox-residence-single-room.jpg?itok=Fo8HGLUG",
      "https://future.utoronto.ca/sites/default/files/styles/landscape_3_2_1200/public/2025-02/photo-knox-residence-common-room.jpg?itok=bEzYf7OB"
    ],
    officialUrl: "https://knoxresidence.utoronto.ca/",
    videoUrl: "",
    videoCredit: "",
    studentNote: [],
    noteSource: "",
    lastChecked: "2026-08-24"
  },

  {
    id: "new-college",
    name: "New College",
    price: 14395,
    priceMax: 20220,
    priceUnit: "",
    roomType: "Traditional dormitory",
    mealPlan: "Included",
    deadline: "",
    college: "New College students",
    capacity: null,
    address: "",
    summary: "Dormitory-style residence with three room options: single, double, and a cheaper economy double. The wide price range comes from that choice, so the room type you pick matters a lot here.",
    photoUrl: "https://future.utoronto.ca/sites/default/files/styles/landscape_3_2_1200/public/2025-02/photo-new-college-exterior.webp?itok=PXnPiRLh",
    morePhotos: [
      "https://future.utoronto.ca/sites/default/files/styles/landscape_3_2_1200/public/2025-02/photo-new-college-bedroom.webp?itok=YUSSqi8Q"
    ],
    officialUrl: "https://www.newcollege.utoronto.ca/student-experience/living-in-residence/",
    videoUrl: "",
    videoCredit: "",
    studentNote: [],
    noteSource: "",
    lastChecked: "2026-08-24"
  },

  {
    id: "oak-house",
    name: "Oak House",
    price: 24335,
    priceMax: 29700,
    priceUnit: "",
    roomType: "Apartment / Modified dormitory",
    mealPlan: "Included",
    deadline: "",
    college: "Any college",
    capacity: null,
    address: "Spadina Ave & Sussex Ave",
    summary: "The newest residence on campus, at Spadina and Sussex, a short walk from Robarts Library. Offers both apartment units and modified dorm rooms. The meal plan is required for the dorm-style rooms.",
    photoUrl: "https://future.utoronto.ca/sites/default/files/styles/landscape_3_2_1200/public/2025-02/photo-oak-house.jpg?itok=I1iqXGkP",
    morePhotos: [],
    officialUrl: "http://spacesandexperiences.utoronto.ca/housing/introducing-oak-house-student-residence/",
    videoUrl: "",
    videoCredit: "",
    studentNote: [],
    noteSource: "",
    lastChecked: "2026-08-24"
  },

  {
    id: "st-michaels",
    name: "St. Michael's College",
    price: 19057,
    priceMax: 21146,
    priceUnit: "",
    roomType: "Traditional dormitory",
    mealPlan: "Included",
    deadline: "",
    college: "St. Michael's College students",
    capacity: null,
    address: "",
    summary: "A classic dorm experience in single or double rooms, with washrooms and common areas shared between housemates and floormates.",
    photoUrl: "https://future.utoronto.ca/sites/default/files/styles/landscape_3_2_1200/public/2026-01/photo-st-mikes-exterior.jpg?itok=pxasgOTx",
    morePhotos: [
      "https://future.utoronto.ca/sites/default/files/styles/landscape_3_2_1200/public/2026-01/photo-st-mikes-dorm.jpg?itok=QrOSUR0n"
    ],
    officialUrl: "https://stmikes.utoronto.ca/community/st-michaels-college-residence",
    videoUrl: "",
    videoCredit: "",
    studentNote: [],
    noteSource: "",
    lastChecked: "2026-08-24"
  },

  {
    id: "trinity",
    name: "Trinity College",
    price: 19714,
    priceMax: 22405,
    priceUnit: "",
    roomType: "Traditional dormitory",
    mealPlan: "Included",
    deadline: "",
    college: "Trinity College students",
    capacity: 470,
    address: "",
    summary: "Two traditional buildings, Trinity College Residence and St. Hilda's, housing roughly 470 first-year and upper-year students between them. Rooms come as singles, doubles and triples.",
    photoUrl: "https://future.utoronto.ca/sites/default/files/styles/landscape_3_2_1200/public/2025-02/photo-trinity-exterior.jpg?itok=IhbL7PNW",
    morePhotos: [
      "https://future.utoronto.ca/sites/default/files/styles/landscape_3_2_1200/public/2025-02/photo-trinity-bedroom.jpg?itok=4cjoZodt",
      "https://future.utoronto.ca/sites/default/files/styles/landscape_3_2_1200/public/2025-02/photo-trinity-common-area.jpg?itok=foADmo5D"
    ],
    officialUrl: "https://www.trinity.utoronto.ca/engage/residence/",
    videoUrl: "",
    videoCredit: "",
    studentNote: [],
    noteSource: "",
    lastChecked: "2026-08-24"
  },

  {
    id: "university-college",
    name: "University College",
    price: 15938,
    priceMax: 20274,
    priceUnit: "",
    roomType: "Traditional dormitory",
    mealPlan: "Included",
    deadline: "",
    college: "University College students",
    capacity: null,
    address: "",
    summary: "Sits in the middle of the St. George campus, so the walk to class is short. Dormitory-style rooms spread across both historic and modern halls.",
    photoUrl: "https://future.utoronto.ca/sites/default/files/styles/landscape_3_2_1200/public/2025-02/photo-uc-exterior.jpg?itok=s2UDcceo",
    morePhotos: [
      "https://future.utoronto.ca/sites/default/files/styles/landscape_3_2_1200/public/2025-02/photo-uc-bedroom.jpg?itok=HCnxWz9z",
      "https://future.utoronto.ca/sites/default/files/styles/landscape_3_2_1200/public/2025-02/photo-uc-common-area.jpg?itok=BTUpWSq4"
    ],
    officialUrl: "https://www.uc.utoronto.ca/residence",
    videoUrl: "",
    videoCredit: "",
    studentNote: [],
    noteSource: "",
    lastChecked: "2026-08-24"
  },

  {
    id: "victoria",
    name: "Victoria College",
    price: 16642,
    priceMax: 23797,
    priceUnit: "",
    roomType: "Traditional dormitory / Apartment",
    mealPlan: "Included",
    deadline: "",
    college: "Victoria College students",
    capacity: null,
    address: "",
    summary: "Five residence buildings housing a mix of first-year and upper-year students, in a college community of around 3,500 people from more than 50 countries. A small number of apartment-style units exist but most rooms are dorm-style.",
    photoUrl: "https://future.utoronto.ca/sites/default/files/styles/landscape_3_2_1200/public/2025-02/photo-vic-common-area.jpg?itok=oyoBGYJH",
    morePhotos: [],
    officialUrl: "https://www.vic.utoronto.ca/current-students/campus-life/residence-life",
    videoUrl: "",
    videoCredit: "",
    studentNote: [],
    noteSource: "",
    lastChecked: "2026-08-24"
  },

  {
    id: "woodsworth",
    name: "Woodsworth College",
    price: 13920,
    priceMax: null,
    priceUnit: "",
    roomType: "Apartment",
    mealPlan: "Optional",
    deadline: "",
    college: "Woodsworth College students",
    capacity: null,
    address: "",
    summary: "Apartment-style residence sitting between the Annex and Yorkville, close to gyms, libraries, museums, restaurants and grocery stores. No meal plan is required, which keeps the fee low, but you will be cooking for yourself.",
    photoUrl: "https://future.utoronto.ca/sites/default/files/styles/landscape_3_2_1200/public/2025-02/photo-woodsworth-exterior.jpg?itok=YOMtRIPy",
    morePhotos: [
      "https://future.utoronto.ca/sites/default/files/styles/landscape_3_2_1200/public/2025-02/photo-woodsworth-bedroom.jpg?itok=rXuFTG7R",
      "https://future.utoronto.ca/sites/default/files/styles/landscape_3_2_1200/public/2025-02/photo-woodsworth-common-area.jpg?itok=tencykHe"
    ],
    officialUrl: "https://wdw.utoronto.ca/life-in-residence",
    videoUrl: "",
    videoCredit: "",
    studentNote: [],
    noteSource: "",
    lastChecked: "2026-08-24"
  }

];
