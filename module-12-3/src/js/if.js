// импортируем из установленной библиотеки
import InfiniteScroll from 'infinite-scroll';

const unsplashID = '9ad80b14098bcead9c7de952435e937cc3723ae61084ba8e729adb642daf0251';

// создаём новый экземпляр с путём url &id &page, и с другими опциями
const infScroll = new InfiniteScroll('.container', {
  responseType: 'text',
  history: false,
  path() {
      return `https://api.unsplash.com/photos?client_id=${unsplashID}&page=${this.pageindex}`;
    },
});

console.log(infScroll);

infScroll.loadNextPage();

infScroll.on('load', (response, path) => {
    console.log(JSON.parse(response));
    console.log(path);
});