// --- Selectors ---
const galleryItems = document.querySelectorAll('.gallery-item');
const filterButtons = document.querySelectorAll('.filter-btn');

const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxCaption = document.getElementById('lightbox-caption');
const closeBtn = document.getElementById('close-btn');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');

let currentIndex = 0;

let itemsArray = Array.from(galleryItems);

// --- 1. FILTERING FEATURE  ---
filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        
        document.querySelector('.filter-btn.active').classList.remove('active');
        button.classList.add('active');

        const filterValue = button.getAttribute('data-filter');

        galleryItems.forEach(item => {
            const itemCategory = item.getAttribute('data-category');

            if (filterValue === 'all' || filterValue === itemCategory) {
                item.classList.remove('hidden'); 
            } else {
                item.classList.add('hidden'); 
            }
        });

    
        itemsArray = Array.from(document.querySelectorAll('.gallery-item:not(.hidden)'));
    });
});


// --- 2. LIGHTBOX FEATURE ---
function showImage(index) {
    if (index < 0 || index >= itemsArray.length) return; 
    
    currentIndex = index;
    const item = itemsArray[currentIndex];
    const img = item.querySelector('img');
    
    
    const h3Element = item.querySelector('.item-info h3');
    const title = h3Element ? h3Element.innerText : '';
    
    // Image Src Fallback
    const largeImgSrc = img.getAttribute('data-full') || img.getAttribute('src');
    
    lightboxImg.src = largeImgSrc;
    lightboxCaption.innerText = title;
    
    lightbox.classList.add('active'); 
}


galleryItems.forEach(item => {
    item.addEventListener('click', () => {
        
        const visibleIndex = itemsArray.indexOf(item);
        if (visibleIndex !== -1) {
            showImage(visibleIndex);
        }
    });
});

// Next Button Click
nextBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    if (itemsArray.length === 0) return;
    currentIndex = (currentIndex + 1) % itemsArray.length;
    showImage(currentIndex);
});

// Prev Button Click
prevBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    if (itemsArray.length === 0) return;
    currentIndex = (currentIndex - 1 + itemsArray.length) % itemsArray.length;
    showImage(currentIndex);
});

// Close Button Click
closeBtn.addEventListener('click', () => {
    lightbox.classList.remove('active');
});


lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
        lightbox.classList.remove('active');
    }
});
