// 여기에 300개의 성경 구절을 추가할 수 있습니다. (우선 10개 샘플)
const bibleVerses = [
    { text: "The Lord bless you and keep you; the Lord make his face shine on you and be gracious to you.", ref: "Numbers 6:24-25" },
    { text: "For I know the plans I have for you, declares the Lord, plans to prosper you and not to harm you, plans to give you hope and a future.", ref: "Jeremiah 29:11" },
    { text: "I can do all this through him who gives me strength.", ref: "Philippians 4:13" },
    { text: "Trust in the Lord with all your heart and lean not on your own understanding.", ref: "Proverbs 3:5" },
    { text: "But the fruit of the Spirit is love, joy, peace, forbearance, kindness, goodness, faithfulness.", ref: "Galatians 5:22" },
    { text: "And we know that in all things God works for the good of those who love him, who have been called according to his purpose.", ref: "Romans 8:28" },
    { text: "Be strong and courageous. Do not be afraid; do not be discouraged, for the Lord your God will be with you wherever you go.", ref: "Joshua 1:9" },
    { text: "The Lord is my shepherd, I lack nothing.", ref: "Psalm 23:1" },
    { text: "Cast all your anxiety on him because he cares for you.", ref: "1 Peter 5:7" },
    { text: "May the God of hope fill you with all joy and peace as you trust in him, so that you may overflow with hope by the power of the Holy Spirit.", ref: "Romans 15:13" }
];

const cardsWrapper = document.getElementById('cards-wrapper');
const refreshBtn = document.getElementById('refresh-btn');
const totalCards = 5;

// 배열 요소를 무작위로 섞는 함수
function shuffleArray(array) {
    let currentIndex = array.length, randomIndex;
    while (currentIndex != 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
    return array;
}

// 카드를 생성하고 화면에 표시하는 함수
function initCards() {
    // 만약 HTML에 카드를 넣을 공간이 없으면 실행 중단 (에러 방지)
    if (!cardsWrapper) return;
    
    // 기존 카드 지우기
    cardsWrapper.innerHTML = '';
    
    // 전체 구절 배열을 섞은 복사본 만들기
    const shuffledVerses = shuffleArray([...bibleVerses]);
    
    // 5개의 카드 생성
    for (let i = 0; i < totalCards; i++) {
        const verse = shuffledVerses[i];
        
        // 카드 컨테이너 생성
        const cardContainer = document.createElement('div');
        cardContainer.classList.add('card-container');
        
        // 카드 내부 구조 HTML
        cardContainer.innerHTML = `
            <div class="card-inner">
                <div class="card-front">
                    <!-- Front design handled by CSS -->
                </div>
                <div class="card-back">
                    <div class="verse-text">"${verse.text}"</div>
                    <div class="verse-ref">- ${verse.ref}</div>
                </div>
            </div>
        `;
        
        // 클릭 이벤트 추가 (뒤집기 기능만 단독으로 실행)
        cardContainer.addEventListener('click', function() {
            // 다른 카드가 뒤집혀 있으면 다시 덮는 기능 (선택사항)
            document.querySelectorAll('.card-container').forEach(card => {
                if(card !== this) card.classList.remove('flipped');
            });

            this.classList.toggle('flipped');
        });
        
        // 화면에 추가
        cardsWrapper.appendChild(cardContainer);
    }
}

// 새 카드 뽑기 버튼 이벤트
if (refreshBtn) {
    refreshBtn.addEventListener('click', initCards);
}

// 페이지 로드 시 초기 카드 세팅
document.addEventListener('DOMContentLoaded', initCards);