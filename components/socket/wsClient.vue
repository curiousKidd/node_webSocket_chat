<template>
  <div>
    testttttttttt
    <v-btn @click="connection">connect</v-btn>
    <v-btn @click="close">close</v-btn>
  </div>
</template>
<script>
import ws from 'ws'
export default {
  data() {
    return {
      webSocket: '',
      count: 0,
    }
  },
  created() {
    // 1. 웹소켓 클라이언트 객체 생성
    this.webSocket = ws('ws://localhost:9999')

    // 2. 웹소켓 이벤트 처리
    // 2-1) 연결 이벤트 처리
    this.webSocket.onopen = () => {
      console.log('웹소켓서버와 연결 성공')
    }

    // 2-2) 메세지 수신 이벤트 처리
    this.webSocket.onmessage = function (event) {
      console.log(`서버 웹소켓에게 받은 데이터: ${event.data}`)
    }

    // 2-3) 연결 종료 이벤트 처리
    this.webSocket.onclose = function () {
      console.log('서버 웹소켓 연결 종료')
    }

    // 2-4) 에러 발생 이벤트 처리
    this.webSocket.onerror = function (event) {
      console.log(event)
    }
  },
  methods: {
    connection() {
      if (this.webSocket.readyState === this.webSocket.OPEN) {
        // 연결 상태 확인
        this.webSocket.send(`증가하는 숫자를 보냅니다 => ${this.count}`) // 웹소켓 서버에게 메시지 전송
        this.count++ // 보낼때마다 숫자를 1씩 증가
      } else {
        alert('연결된 웹소켓 서버가 없습니다.')
      }
    },
    close() {
      if (this.webSocket.readyState === this.webSocket.OPEN) {
        // 연결 상태 확인
        this.webSocket.close() // 연결 종료
      } else {
        alert('연결된 웹소켓 서버가 없습니다.')
      }
    },
  },
}
</script>
