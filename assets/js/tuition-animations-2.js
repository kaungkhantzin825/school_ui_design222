// Function to create letter spans for typing animation
function createLetterSpans(element) {
  // Save any HTML structure inside the element
  const html = element.innerHTML;
  const temp = document.createElement('div');
  temp.innerHTML = html;
  
  // Clear the element
  element.innerHTML = '';
  
  // Process each text node
  const processNode = (node) => {
    if (node.nodeType === Node.TEXT_NODE) {
      const text = node.nodeValue.trim();
      if (text) {
        const parent = document.createElement('span');
        parent.className = 'text-node';
        
        // Create spans for each character
        Array.from(text).forEach((char, index) => {
          const span = document.createElement('span');
          span.textContent = char === ' ' ? '\u00A0' : char;
          span.style.opacity = '0';
          span.style.display = 'inline-block';
          span.style.transform = 'translateY(10px)';
          span.style.transition = 'opacity 0.2s ease, transform 0.2s ease';
          span.style.transitionDelay = `${index * 0.03}s`; // Faster animation
          parent.appendChild(span);
        });
        
        return parent;
      }
    } else if (node.nodeType === Node.ELEMENT_NODE) {
      const clone = node.cloneNode(false);
      Array.from(node.childNodes).forEach(child => {
        const processed = processNode(child);
        if (processed) clone.appendChild(processed);
      });
      return clone;
    }
    return null;
  };
  
  // Process all child nodes
  Array.from(temp.childNodes).forEach(child => {
    const processed = processNode(child);
    if (processed) element.appendChild(processed);
  });
  
  return element;
}

// Function to start typing animation
function startTypingAnimation(element) {
  const letters = element.querySelectorAll('span');
  letters.forEach(letter => {
    setTimeout(() => {
      letter.style.opacity = '1';
      letter.style.transform = 'translateY(0)';
    }, 100); // Small delay to ensure DOM is ready
  });
}

document.addEventListener('DOMContentLoaded', function() {
  // Function to check if element is in viewport
  function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    const windowHeight = window.innerHeight || document.documentElement.clientHeight;
    
    // Check if element is in the viewport (with 100px offset from bottom)
    return (
      rect.top <= windowHeight - 100 &&
      rect.bottom >= 0
    );
  }

  // Function to handle scroll events
  function handleScroll() {
    // Animate Tuition section title
    const tuitionTitle = document.querySelector('.scholarship');
    if (tuitionTitle && isInViewport(tuitionTitle) && !tuitionTitle.classList.contains('animate-typing')) {
      tuitionTitle.classList.add('animate-typing');
      createLetterSpans(tuitionTitle);
      startTypingAnimation(tuitionTitle);
    }

    // Animate section03.png image
    const tuitionImage = document.querySelector('img[src*="section03.png"]');
    if (tuitionImage && isInViewport(tuitionImage) && !tuitionImage.classList.contains('animate-slide')) {
      tuitionImage.classList.add('animate-slide');
    }

    // Animate Japanese text in card2
    const japaneseTitle = document.querySelector('.card2-content h2');
    const japaneseSubtitle = document.querySelector('.card2-content h3');

    if (japaneseTitle && isInViewport(japaneseTitle) && !japaneseTitle.classList.contains('animated')) {
      japaneseTitle.classList.add('animated');
      createLetterSpans(japaneseTitle);
      startTypingAnimation(japaneseTitle);
    }

    if (japaneseSubtitle && isInViewport(japaneseSubtitle) && !japaneseSubtitle.classList.contains('animated')) {
      japaneseSubtitle.classList.add('animated');
      createLetterSpans(japaneseSubtitle);
      startTypingAnimation(japaneseSubtitle);
    }
  }

  // Add scroll event listener with debounce for better performance
  let isScrolling;
  window.addEventListener('scroll', function() {
    window.clearTimeout(isScrolling);
    isScrolling = setTimeout(handleScroll, 50);
  }, { passive: true });

  // Initial check in case elements are already in viewport
  handleScroll();
});

// アニメーションさせたい要素をすべて取得
const animatedCards = document.querySelectorAll('.about-card');

// Intersection Observerのオプション設定
const observerOptions = {
  root: null, // ビューポートを基準にする
  rootMargin: '0px',
  threshold: 0.1 // 要素が10%見えたらトリガー
};

// Intersection Observerのコールバック関数
const observerCallback = (entries, observer) => {
  entries.forEach((entry, index) => {
    // entry.isIntersectingがtrueなら、要素が画面内に入ったことを意味する
    if (entry.isIntersecting) {
      // 少し遅延（delay）させてクラスを追加し、時間差を表現
      setTimeout(() => {
        entry.target.classList.add('is-visible');
      }, index * 1000); // 200ミリ秒ずつ遅延 (0ms, 200ms, 400ms...)

      // 一度表示されたら、その要素の監視を停止する
      observer.unobserve(entry.target);
    }
  });
};

// Observerのインスタンスを作成
const observer = new IntersectionObserver(observerCallback, observerOptions);

// 各カード要素の監視を開始
animatedCards.forEach(card => {
  observer.observe(card);
});
// アニメーションさせたい要素（.moving-card .left）をすべて取得
const cardsToAnimate = document.querySelectorAll('.moving-card .left');

// Intersection Observerの準備（画面内に入ったかを監視する）
const cardObserver = new IntersectionObserver((entries, observer) => {
  // 監視している各要素についての処理
  entries.forEach(entry => {
    // entry.isIntersectingがtrueなら「要素が画面内に入った」ということ
    if (entry.isIntersecting) {
      // ★ HTML要素に紐づけておいたタイムラインを取得して再生する
      const timeline = entry.target.gsapTimeline;
      if (timeline) {
        timeline.play();
      }
      
      // アニメーションは1回だけで良いので、この要素の監視を停止する
      observer.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.5 // 要素が50%画面に見えたら実行する
});


// 各カード要素に対して、個別にタイムライン設定と監視設定を行う
cardsToAnimate.forEach(card => {
  // カード内の各線要素を取得
  const bottomLine = card.querySelector('.line-bottom');
  const leftLine = card.querySelector('.line-left');   // 順番変更のため変数も整理
  const topLine = card.querySelector('.line-top');
  const rightLine = card.querySelector('.line-right');

  // GSAPタイムラインを作成（最初は停止状態）
  const tl = gsap.timeline({ paused: true });

  // アニメーションを順番に登録
  tl.to(bottomLine, { scaleX: 1, duration: 0.8 }) // 1. 下の線が左へ
    .to(leftLine,   { scaleY: 1, duration: 0.8 })  // 2. 左の線が上へ
    .to(topLine,    { scaleX: 1, duration: 0.8 })  // 3. 上の線が右へ
    .to(rightLine,  { scaleY: 1, duration: 0.8 }); // 4. 右の線が下へ

  // ★ 作成したタイムラインをHTML要素自体にプロパティとして保存しておく
  card.gsapTimeline = tl;

  // このカードの監視を開始する
  cardObserver.observe(card);
});
// === ここから右側のボックス用のアニメーション ===

// アニメーションさせたい右側のボックスをすべて取得
const rightCardsToAnimate = document.querySelectorAll('.moving-card .right');

// 右側用のIntersection Observerを準備
const rightCardObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const timeline = entry.target.gsapTimeline;
      if (timeline) {
        timeline.play();
      }
      observer.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.5
});

// 各右側ボックスに、個別にタイムライン設定と監視設定を行う
rightCardsToAnimate.forEach(card => {
  // カード内の各線要素を取得
  const leftLine = card.querySelector('.line-left');
  const bottomLine = card.querySelector('.line-bottom');
  const rightLine = card.querySelector('.line-right');
  const topLine = card.querySelector('.line-top');

  // GSAPタイムラインを作成
  const tl = gsap.timeline({ paused: true });

  // ★★★ アニメーションを「左→下→右→上」の順番に登録 ★★★
  tl.to(leftLine,   { scaleY: 1, duration: 0.8 }) // 1. 左の線が下へ
    .to(bottomLine, { scaleX: 1, duration: 0.8 }) // 2. 下の線が右へ
    .to(rightLine,  { scaleY: 1, duration: 0.8 }) // 3. 右の線が上へ
    .to(topLine,    { scaleX: 1, duration: 0.8 }); // 4. 上の線が左へ

  // 作成したタイムラインをHTML要素自体にプロパティとして保存
  card.gsapTimeline = tl;

  // このカードの監視を開始
  rightCardObserver.observe(card);
});

// すべてのカード要素を取得
const cards = document.querySelectorAll('.card');

function setActive(clickedCard) {
  // すべてのカードから一旦 'active' クラスを削除
  cards.forEach(card => {
    card.classList.remove('active');
  });

  // クリックされたカードにだけ 'active' クラスを追加
  clickedCard.classList.add('active');
}
// キャンパス機能
        // JavaScriptロジック
        document.addEventListener('DOMContentLoaded', function() {
            // 必要な要素を取得
            const carouselContainer = document.querySelector('.campus-carousel-container');
            const campuses = carouselContainer.querySelectorAll('.campus-content');
            const prevButton = carouselContainer.querySelector('.nav-arrow-left');
            const nextButton = carouselContainer.querySelector('.nav-arrow-right');

            // 現在表示しているキャンパスのインデックス（0から始まる）
            let currentIndex = 0;
            const totalCampuses = campuses.length;

            // 特定のインデックスのキャンパスを表示する関数
            function showCampus(index) {
                // すべてのキャンパスを一旦非表示にする
                campuses.forEach(campus => {
                    campus.classList.remove('active');
                });
                // 指定されたインデックスのキャンパスだけを表示する
                campuses[index].classList.add('active');
            }

            // 「次へ」ボタンがクリックされたときの処理
            nextButton.addEventListener('click', function() {
                // インデックスを1つ増やす
                currentIndex++;
                // インデックスが最後を超えたら、最初（0）に戻す
                if (currentIndex >= totalCampuses) {
                    currentIndex = 0;
                }
                showCampus(currentIndex);
            });

            // 「前へ」ボタンがクリックされたときの処理
            prevButton.addEventListener('click', function() {
                // インデックスを1つ減らす
                currentIndex--;
                // インデックスが0より小さくなったら、最後（totalCampuses - 1）に戻す
                if (currentIndex < 0) {
                    currentIndex = totalCampuses - 1;
                }
                showCampus(currentIndex);
            });

            // 最初に表示するキャンパスを設定
            showCampus(currentIndex);
        });
