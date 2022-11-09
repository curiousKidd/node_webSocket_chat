<template>
  <v-card>
    <v-container fluid>
      <v-row no-gutters>
        <v-col cols="12">
          <div class="mb-4">나는 고양이에요</div>

          <div
            style="
              height: 600px;
              overflow-y: auto;
              display: flex;
              flex-direction: column-reverse;
            "
          >
            <div class="test" style="width: 600px">
              <div v-for="(item, i) in items" :key="i">
                <div
                  v-if="item.send === 'YOU'"
                  class="px-5 text-right"
                  style="width: 100%"
                >
                  <!-- <p>나</p> -->
                  <p
                    class="px-4 py-2 text-right"
                    style="
                      font-size: 18px;
                      font-weight: bold;
                      background: rgba(255, 255, 255, 0.7);
                      color: #333;
                      border-radius: 10px;
                      display: inline-block;
                    "
                  >
                    {{ item.data }}
                  </p>
                </div>
                <div
                  v-else-if="item.send === 'ME'"
                  class="px-5"
                  style="width: 100%"
                >
                  <p v-if="item.count === 1">강아지</p>
                  <p
                    class="px-4 py-2"
                    style="
                      font-size: 18px;
                      font-weight: bold;
                      background: #eee;
                      color: #333;
                      border-radius: 10px;
                      display: inline-block;
                    "
                  >
                    {{ item.data }}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div class="d-flex align-center" style="width: 100%">
            <v-text-field
              v-model="message"
              class="mr-2"
              @keypress.enter="send"
            ></v-text-field>
            <v-btn @click="send">send</v-btn>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
import io from 'socket.io-client'
// import sha512 from 'sha512'
// import sha512 from 'js-sha512'

export default {
  components: {},
  data() {
    return {
      socket: null,
      message: '',
      items: [],
      sendCount: 0,
    }
  },
  created() {
    // console.log(sha512('itembay!234'))
  },
  mounted() {
    this.makeIO()
  },
  methods: {
    makeIO() {
      this.socket = this.$nuxtSocket({
        name: 'test',
        channel: '/',
        // allowEIO3: true, // 버전의 호환성을 사용하는지 묻는 설정값
      })

      // socket.io.js를 선언해서 사용할 경우 사용법
      this.socket = io('http://localhost:8080')

      this.socket.on('connect', (msg) => {
        console.log('socket connect!')
      })

      this.socket.on('news', (msg) => {
        console.log('socket.io로부터 받은 메시지 : ', msg)
      })

      this.socket.on('send', (msg) => {
        this.items.push(msg)
        this.sendCount = 0
      })
    },
    send() {
      this.sendCount += 1
      this.items.push({ data: this.message, send: 'YOU' })
      this.socket.emit('send', {
        data: this.message,
        send: 'YOU',
        count: this.sendCount,
      })
      this.message = ''
    },
  },
}
</script>
