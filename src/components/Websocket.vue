<template>
 <div>
 </div>
</template>

<script>
var socket = new WebSocket("ws://localhost:5000")  


export default {
    props: {
        sendedImg: String
    },
    data() {
        return {
            receivedImg: ''
        }
    },
    watch: {
        sendedImg: function () {
            socket.send(this.sendedImg)
        },
    },
    mounted () {
        console.log('mounted')
        
        socket.onmessage = (event) => {
            this.receivedImg = event.data
            this.$emit('received-img', this.receivedImg)
        }

        socket.onclose = function(event) {
            if (event.wasClean) {
                console.log(`[close] Connection closed cleanly, code=${event.code} reason=${event.reason}`);
            } else {
                console.log('[close] Connection died');
            }
        }

        socket.onerror = function(error) {
            console.log(`[error] ${error.message}`);
        }
  }
}
</script>

<style>

</style>