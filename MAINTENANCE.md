# 유지보수 체크리스트 — UofT 가이드

_이 문서 생성일: 2026-08-28_

이 사이트의 정보는 **매년 썩습니다** (요금·마감일이 해마다 바뀜).
아래 루틴만 지키면 사이트는 계속 정확합니다.

## 🗓 연 1회 대점검 (매년 6월 권장 — 새 학년도 요금·날짜가 공개되는 시기)

### 1. 기숙사 요금 (data.js → RESIDENCES)
각 공식 페이지에서 새 학년도 요금 확인 → `price`/`priceMax`/`roomOptions` 갱신 → `lastChecked` 날짜 변경:

| 기숙사 | 마지막 확인 | 공식 페이지 |
|---|---|---|
| Innis College | 2026-08-24 | https://innis.utoronto.ca/residence/about-the-residence/ |
| Woodsworth College | 2026-08-24 | https://wdw.utoronto.ca/life-in-residence |
| New College | 2026-08-24 | https://www.newcollege.utoronto.ca/student-experience/living-in-residence/ |
| Victoria College | 2026-08-24 | https://www.vic.utoronto.ca/current-students/campus-life/residence-life |
| University College | 2026-08-24 | https://www.uc.utoronto.ca/residence |
| St. Michael's College | 2026-08-24 | https://stmikes.utoronto.ca/community/st-michaels-college-residence |
| Knox Residence | 2026-08-24 | https://knoxresidence.utoronto.ca/ |
| Trinity College | 2026-08-24 | https://www.trinity.utoronto.ca/engage/residence/ |
| Chestnut Residence | 2026-08-24 | https://chestnut.utoronto.ca/ |
| Oak House | 2026-08-24 | http://spacesandexperiences.utoronto.ca/housing/introducing-oak-house-student-residence/ |
| CampusOne | 2026-08-24 | https://live-campusone.ca/ |

### 2. 지원·등록금 마감일 (data.js → FEES_TIMELINE)
- 지원 마감·조기지원·입학연기: https://future.utoronto.ca/deadlines
- 등록금 최소납부(매년 8월 중순, 해마다 날짜 다름!)·잔액 마감: https://www.registrar.utoronto.ca/fees-payments/payment-deadlines/
- 기숙사 보장 신청(3월 31일): https://future.utoronto.ca/admitted/residence/

### 3. 수강신청 날짜 (data.js → COURSE_ENROLMENT)
- 매년 6월경 공개: https://www.artsci.utoronto.ca/current/academics/course-enrolment
- 학년별 시작일(7월)·LWD 마감(12월/4월) 전부 갱신

### 4. 학사요람 연동 항목 (덜 자주 바뀜, 훑어보기만)
- 용어집 35개: https://artsci.calendar.utoronto.ca/glossary-terms
- 학위 요건·breadth 규칙: https://artsci.calendar.utoronto.ca/hbahbsc-requirements
- 건물 코드: https://map.utoronto.ca/ (신축 건물 추가 여부)

### 5. 갱신 후 반드시
```
node make-guide.js      # 검색엔진용 guide.html 재생성 (이거 잊으면 구글에 옛날 정보가 남음)
```
- 폴더 통째로 백업 → GitHub 푸시 → 폰에서 화면 훑기


### 6. 파일 교체 후 캐시버스팅 (중요!)
`index.html` 안의 `?v=20260829` 숫자 3곳(style.css·data.js·app.js)을 오늘 날짜로 바꾸세요.
안 바꾸면 방문자 브라우저가 옛 파일을 계속 씁니다.

## 🔍 수시 진단
- 사이트를 열고 브라우저 개발자도구 콘솔(F12)을 보면, 300일 넘게 재확인 안 된 기숙사가 자동으로 표시됩니다
- 리뷰 신고 메일이 오면: 해당 리뷰를 data.js에서 찾아 수정/삭제

## 📁 파일 구조 요약
- `index.html` — 앱 뼈대 · `app.js` — 화면 로직 · `data.js` — **모든 내용은 여기** · `style.css` — 디자인
- `guide.html` — 자동 생성물 (직접 수정 금지, make-guide.js 로만)
- `robots.txt` / `sitemap.xml` — 배포 주소 반영 필요 (YOUR-SITE-URL 부분)