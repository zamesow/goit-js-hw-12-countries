const callback = (entries, io) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // что мы будем делать с входящими пересечениями?
            console.log('Привет из колбека в forEach');
            console.log(entry);
        }
  });
};

const options = {
    // rootMargin: '100px',
    // threshold: 0.5,
};
const observer = new IntersectionObserver(callback, options);

// наблюдай за элементом
const sentinel = document.querySelector('#sentinel');
observer.observe(sentinel);

