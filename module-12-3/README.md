# goit-js-hw-12-3-infinite-scroll

Бесконечный скролл

Установка и запуск

- устанавливаем npm install infinite-scroll
- создаём new.js файл и импортируем в него библиотеку
- импортируем new.js в index.js
- в html нужен контейнер option - передаются при инициализации экземпляра

```
const infScroll = new InfiniteScroll('.container', {
    path() {
        return `https://api.unsplash.com/photos?client_id=${unsplashID}&page=${this.pageindex}`;
    },
});
```

api

```
infScroll.loadNextPage()
```

плагины с ивентами appenditems - передача элементов (принимает только массив
элементов), поэтому нужно перевести строку в элементы, можно:

- создать div

```
// без
const markup = '<p>qweqweqwe</p>';
const d = document.createElement('div');
d.innerHTML = markup;
```

- или с помощью Documents Fragment (сам всё сделает)

```
const markup = '<p>qweqweqwe</p>';
const fragment = new DocumentFragment();
fragment.innerHTML = markup;
```

- этот метод плох тем, что не работает с рандомными запросами, но работает через
  fetch(). InfiniteScroll использует старую технологию XMLHttpRequest - она
  работает во всех браузера, но разработчикам доступ кнастройкам запроса закрыт,
  поэтому надо писать свой InfiniteScroll

---

Intersection Observer - наблюдатель пересечений - сообщит как только target
пересечёт root

```
// регестрируем observer - создаём новый класс и передаём в коллбек пересечения (entries)
let observer = new YOUR-TYPE-OF-OBSERVER(function (entries) {
  // entries: Array of observed elements
  entries.forEach(entry => {
      // Here we can do something with each particular entry
  });
});
// следить за чем-то
observer.observe(WHAT-TO-OBSERVE);
```

- forEach - чтобы просто перебрать, а map - чтобы из оригинального массива
  создать новый (обратно не нужно ничего получать)

```
// регистрируем observer
const callback = entries => {
  entries.forEach(entry => {
      // что мы будем делать с входящими пересечениями?
      console.log('Привет из колбека в forEach');
      console.log(entry);
  });
});

 // опции, определяем root - по-умолчанию это viewport, не меняем
const options = {};
const observer = new IntersectionObserver(callback, options);
// наблюдай за элементом
const sentinel = document.querySelector('#sentinel');
observer.observe(sentinel);
```

- как только следующий блок пересечёт вьюпорт - произойдёт следующая итерация (и
  на пересечение когда видно и обратно тоже), поэтому для отображения лишь
  итераций при пересечении видимой обрасти используют

```
const callback = entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // что мы будем делать с входящими пересечениями?
            console.log('Привет из колбека в forEach');
            console.log(entry);
        }
  });
};
const options = {};
const observer = new IntersectionObserver(callback, options);
// наблюдай за элементом
const sentinel = document.querySelector('#sentinel');
observer.observe(sentinel);
```

---

Опции rootMargin - отступ от вьюпорта, на котором должна произходить регистрация
пересечения (по-умолчанию 0px или %), если 100px - не прокрутив до элемента
100px он уже  будет отмечен, что пересечён (размеры задаются с любой стороны).
threshold -пересечение,когда элемент уже пересёк границу (0.5 = 50% элемента,
пересекшего вьюпорт)

---

Если хотим отписаться от пересечения, то:

- вторым параметром ф-ции пишем SELF - ссылка на себя же ( const callback =
  (entries, SELF) => { })
- observer.disconnect(); - если полностью хотим снять слежение
- observer.unobserve(target); - если за конкретным элементом Блок sentinel нужно
  ставить после списка, чтобы после его увеличения он отталкивал sentinel за
  вьюпорт Все свойства entry. есть на MDN

---

Вешаем слушатель на наш вьюпорт (выключаем импорты if  и io)

- регим io по шаблону - записываем в index.js (вызываем )
- передаём callback  (const onEntry = entries => { })
- создаём опции (const options = {};)
- объявляем за кем наблюдаем (sentinel лежит в getRefs)
  - observer.observe(refs.sentinel);
- добавляем очередной http-запрос (придостижении границы)

```
newsApiService.fetchArticles().then(articles => {
    appendArticlesMarkup(articles);
    newsApiService.incrementPage();
});
```

- добавляем rootMargin
- добавляем условие, что если sentinel пересекает и в форме не пустая строка
  (как при стартовой странице), то тогда отправлять запрос

```
if (entry.isIntersecting && newsApiService.query !== '') {}
```

- query - это событие input

---

можно вообще всё это сделать при первом вызове - нарисовали, инкрементнули и
только после этого зарегили

- пихаем регистрацию в ф-цию, а её вызов в fetch().then()

---

опции fetchArticles() {}

- чтобы не писать длинную строку http-запроса, в которой много
  параметров-значений используют brouser-API - URLSearchParams();
  - const url =
    `${BASE_URL}/everything?q=${this.searchQuery}&language=en&pageSize=10&page=${this.page}`;
- создаёшь новый экземпляр и передаёшь в него объект с параметрами (свойствами)
- когда делаешь интерполяцию URLSearchParams() - у него под капотом срабатывает
  метод .toString и приводит объект к строке

```
fetchArticles() {
    const searchParams = new URLSearchParams({
      q: this.searchQuery,
      language: 'en',
      pageSize: 10,
      page: this.page,
    });
    const url = `${BASE_URL}/everything?${searchParams}`;
```
