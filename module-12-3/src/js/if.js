// импортируем из установленной библиотеки
import InfiniteScroll from 'infinite-scroll';

// const unsplashID = '9ad80b14098bcead9c7de952435e937cc3723ae61084ba8e729adb642daf0251';

// создаём новый экземпляр с путём url &id &page, и с другими опциями
const infScroll = new InfiniteScroll('.container', {
  responseType: 'text',
  history: false,
  path() {
    //   return `https://newsapi.org/v2/everything?q=bitcoin&apiKey=35f5fd3e43784003a8ff143b237aed4c`;
    },
});

fetch('https://newsapi.org/v2/everything?q=bitcoin&apiKey=35f5fd3e43784003a8ff143b237aed4c');


// console.log(infScroll);

// infScroll.loadNextPage();

// infScroll.on('load', (response, path) => {
//     console.log(JSON.parse(response));
//     console.log(path);

// по шаблону сделали строку
// потом кинули в фрагмент
// фрагмент передали в infScroll.appendItems(фрагмент);
// });

const markup = '<p>qweqweqwe</p>';

// const d = document.createElement('div');

const fragment = new DocumentFragment();

fragment.innerHTML = markup;

console.log(fragment);