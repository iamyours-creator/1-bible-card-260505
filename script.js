// 애드센스 승인을 위해 text, ref 외에 'reflection(해설/묵상)' 텍스트를 반드시 추가해야 합니다.
const bibleVerses = [
    { 
        text: "The Lord bless you and keep you; the Lord make his face shine on you and be gracious to you.", 
        ref: "Numbers 6:24-25",
        reflection: "This profound blessing from the Book of Numbers reminds us that God's ultimate desire is to bless His people. When we feel overwhelmed by daily challenges, we can find peace in knowing that God is actively watching over us, offering His grace and making His presence known in our lives. Take a moment today to reflect on the specific ways God has kept you safe and shown you favor."
    },
    { 
        text: "For I know the plans I have for you, declares the Lord, plans to prosper you and not to harm you, plans to give you hope and a future.", 
        ref: "Jeremiah 29:11",
        reflection: "During times of uncertainty, it is easy to become anxious about what tomorrow holds. This verse serves as a powerful anchor for our souls. God is not a distant observer; He is the architect of your future. His plans are intentionally designed for your well-being, growth, and eternal hope. Trust that even in the waiting periods, He is orchestrating a beautiful outcome for your life."
    },
    { 
        text: "I can do all this through him who gives me strength.", 
        ref: "Philippians 4:13",
        reflection: "True strength does not come from our own physical or mental capacity, which can easily be depleted. The Apostle Paul wrote these words while facing extreme difficulties, teaching us that the secret to enduring any situation is tapping into Christ's boundless power. Whenever you face an obstacle today, remind yourself that you are not relying on your own strength, but on the limitless power of God within you."
    }
    // 나머지 297개도 이와 같이 3줄 이상의 reflection 텍스트를 포함하여 추가하세요.
];

const cardsWrapper = document.getElementById('cards-wrapper');
const refreshBtn = document.getElementById('refresh-btn');
const devotionArea = document.getElementById('devotion-area');
const devotionVerse = document.getElementById('devotion-verse');
const devotionText = document.getElementById('devotion-text');

const totalCards = 5;

function shuffleArray(array) {
    let currentIndex = array.length, randomIndex;
    while (currentIndex != 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
    return array;
}

function initCards() {
    cardsWrapper.innerHTML = '';
    devotionArea.classList.add('hidden'); // 새 카드를 뽑을 때 해설창 숨김
    
    const shuffledVerses = shuffleArray([...bibleVerses]);
    
    for (let i = 0; i < totalCards; i++) {
        const verse = shuffledVerses[i];
        const cardContainer = document.createElement('div');
        cardContainer.classList.add('card-container');
        
        cardContainer.innerHTML = `
            <div class="card-inner">
                <div class="card-front"></div>
                <div class="card-back">
                    <div class="verse-text">"${verse.text}"</div>
                    <div class="verse-ref">- ${verse.ref}</div>
                </div>
            </div>
        `;
        
        // 카드 클릭 시 뒤집히고, 하단에 묵상 텍스트 표시
        cardContainer.addEventListener('click', function() {
            // 다른 카드들이 이미 뒤집혀 있다면 원상복구 (선택사항, 원치 않으면 아래 3줄 삭제)
            document.querySelectorAll('.card-container').forEach(card => {
                if(card !== this) card.classList.remove('flipped');
            });

            this.classList.toggle('flipped');
            
            // 텍스트 영역 업데이트 및 표시
            if(this.classList.contains('flipped')) {
                devotionVerse.innerText = `"${verse.text}" - ${verse.ref}`;
                devotionText.innerText = verse.reflection;
                devotionArea.classList.remove('hidden');
                // 부드럽게 스크롤 이동
                devotionArea.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            } else {
                devotionArea.classList.add('hidden');
            }
        });
        
        cardsWrapper.appendChild(cardContainer);
    }
}

refreshBtn.addEventListener('click', initCards);
document.addEventListener('DOMContentLoaded', initCards);