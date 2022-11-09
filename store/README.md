# 2. Nuxt의 데이터 호출 방식과 API 연동

**👉 Backend 다운받기**

[https://github.com/joshua1988/learn-nuxt](https://github.com/joshua1988/learn-nuxt)

**👉 server port 변경**

[Configuration](https://nuxtjs.org/docs/features/configuration#edit-host-and-port)

**👉 Nuxt 비동기 데이터 호출**

아래와 같이 소스 코드를 실행하면

```jsx
<template>
  <div>
    <h1>메인 페이지</h1>
    <div>메인페이지 입니다.</div>
    {{ products }}
  </div>
</template>

<script>
import axios from 'axios';
export default {
  data() {
    return {
      products: '',
    };
  },
  async created() {
    const { data } = await axios.get('http://localhost:3000/products');
    this.products = data;
  },
};
</script>
```

vue의 Lifecycle에 의해서

created()에가 실행 하기 전에 화면이 아래와 같이 표시되고

![11](https://user-images.githubusercontent.com/58017318/200169037-0c3e2c85-9738-4be1-95e2-80eb216d57d1.png)

`**created()`라이프 사이클 훅**을 이용해서 **컴포넌트가 생성**되자마자 **서버에 products**를 요청해 받아온 값을 **화면에 표시\*\*합니다

**클라이언트 사이드 렌더링**은 빈 화면을 브라우저가 받아 화면에 뿌릴 요소와 데이터를 **모두 브라우저에서 구성**하기 때문에 위와 같은 코드가 가능

![12](https://user-images.githubusercontent.com/58017318/200169040-f83df6c2-c8ca-42e9-adce-8cc657eefb3a.png)

[Data Fetching | Cracking Vue.js](https://joshua1988.github.io/vue-camp/nuxt/data-fetching.html)

**Nuxt는 서버 사이드 렌더링 권장** 프레임워크이기 때문에

서버에서 **페이지의 내용을 모두 그려서 브라우저**로 가져가야 합니다.

**👉 Nuxt의 REST API 호출 방식**

- asyncData
- fetch

👉 \***\*asyncData\*\***

`asyncData` 는 **페이지 컴포넌트**(pages 폴더 아래에 위치하는 컴포넌트)에만 제공됩니다.

```jsx
<!-- pages/user.vue -->
<template>
  <div>
    <p>{{ user }}</p>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  // params의 id가 1이라고 가정
  async asyncData({ params, $http }) {
    const response = await axios.get(`/users/${params.id}`);
    const user = response.data;
    return { user }
  }
}
</script>
```

위 코드는 URL `/user`로 접근할 때

`user.vue`**컴포넌트를 화면에 그리기 전에 데이터를 요청**하는 코드입니다.

데이터를 다 받아와야지만 데이터를 들고 `<template></template>`영역의 코드를 화면에 표시합니다.

마치 싱글 페이지 애플리케이션의 뷰 라우터에서 네비게이션 가드에서 데이터를 호출하고

받아왔을 때 페이지를 진입하는 것과 같습니다.

![13](https://user-images.githubusercontent.com/58017318/200169042-918538fe-7500-40dd-8452-e4af2d69546e.png)
![14](https://user-images.githubusercontent.com/58017318/200169046-3180f978-1513-4419-8547-4c366f99fb77.png)
