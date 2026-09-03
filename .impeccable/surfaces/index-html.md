---
version: 1
slug: "index-html"
primary_target: "index.html"
related_targets: ["posts/hello-world.html"]
---

# Surface: 홈(index.html)과 글 페이지(posts/*.html)

## Scope and mode

Read. 홈은 글을 고르는 목록, 글 페이지는 읽는 화면. 두 화면이 하나의 세계를 공유한다.

## Audience, job, action

한국 주니어 개발자. 관심 글을 고르고 끝까지 읽고 다시 온다. 주 행동: 그래프의 노드(글)를 열기.

## Proof and content

실제 글은 hello-world 1편. 나머지 예시 글은 합성 콘텐츠이며 각 글의 meta에 "예시 글"로 표기한다. 지표·추천사 없음.

## Constraints

빌드 단계 없음, 바닐라 HTML/CSS/JS. cleanUrls 절대 경로. 라이트/다크 모두. 글 추가 = 파일 하나 + index.html 한 항목. 그래프는 index.html의 목록 DOM에서 JS가 그린다(단일 진실 원천, JS 없이도 목록 동작).

## Direction contract

THESIS: 블로그 히스토리가 곧 커밋 그래프다. 목록은 `git log --graph`, 오른쪽은 체크아웃된 글(HEAD). 거부하는 기본형: 썸네일 카드 목록과 사이드바.

OWN-WORLD: 근검정 청회색 바탕 #0e1218과 흰 형제 테마 #f7f8fa. Commit Mono 워드마크·해시·코드, Wanted Sans 본문. 브랜치 4색: frontend 초록, backend 파랑, infra 분홍, cs 호박. diff 거터 +초록 −빨강. 선, 점, 표만 있고 카드·그라데이션 없음.

STORY: 주제별 브랜치로 쌓인 한 사람의 기록임을 알고, 노드를 훑어 글을 고르고, 읽는다. 돌아오면 HEAD가 읽던 글을 가리킨다.

FIRST VIEWPORT: 상단 바(devgrr 좌, 글 우). 좌 1/3: 브랜치 태그 4개 아래 세로 그래프가 로드 시 아래에서 위로 그려지고 노드마다 제목과 해시. 우 2/3: HEAD 글의 제목, 요약 한 단락, diff 블록. 호버·포커스한 노드가 우측을 바꾼다. 주 행동은 노드 클릭.

SIGNATURE: 그래프 draw-in, 노드 호버 = checkout 미리보기, j/k/Enter 키보드 탐색, 마지막으로 읽은 글이 HEAD.

FORM: 커밋 그래프. 내 목록 1순위(IMPECCABLE'S PICK). seed e76a0f54. 승인 시안 `.impeccable/mocks/comp-1-split.webp`.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance.

## Unresolved

카테고리 페이지, 소개, 검색, RSS는 미정. 내비는 홈 링크 하나.
