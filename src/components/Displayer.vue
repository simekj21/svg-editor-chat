<template>
    <div 
        id="displayer" 
        class="displayer"
    >
        <div 
            class="displayer-message"
            v-for="(message,index) in messages" 
            :key="index"
        >
            <div class="displayer-message-info">
                {{ message.date }}
                {{ message.fromUser }}
                <hr>
            </div>

            <div class="displayer-message-image">
                <svg 
                    width="200" 
                    height="100"
                    v-html="message.svgImg"
                    id = "svgimg"
                >
                </svg>
            </div>
        </div>
    </div>
</template>

<script>
import logMixin from "../mixins/logMixin"

export default {
    mixins: [logMixin],
    props: {
        receivedImg: String
    },
    data () {
        return {
            date: '',
            fromUser: '',
            svgImg: '',
            messages: [],
        }
    },
    watch: {
        receivedImg: function () {
            const parametres = this.receivedImg.split(";")
            
            this.date = parametres[0]
            this.fromUser = ` from:${parametres[1]}`
            this.svgImg = parametres[2]

            this.messages.push( {
                date: this.date,
                fromUser: this.fromUser,
                svgImg: this.svgImg
            })

            this.logMessage('Received message from ', this.fromUser)
        },
    },
    updated () {
        this.$nextTick(function () {
            var displayerScroller = document.getElementById("displayer")
            displayerScroller.scrollTop = displayerScroller.scrollHeight
        })
    },
    mounted () {
        this.logMessage('Displayer started')
    }
}
</script>

<style lang="scss">
    .displayer {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        margin: 10px;
        height: 400px;
        overflow-y: scroll;
        border: 2px solid #FF5555;
        border-radius: 10px;

        &-message {
            display: flex;
            flex-direction: column;
            justify-content: flex-start;

            &-info {
                padding: 10px;
                font-size: 12px;
                text-align: left;
            }

            &-image {
                padding: 10px;
            }
        }
    }

    // styling scrollbar
    ::-webkit-scrollbar {
        width: 5px;
    }

    ::-webkit-scrollbar-track {
        background: #FFF;
        margin: 4px;
    }
    
    ::-webkit-scrollbar-thumb {
        background: #FF5555; 
    }

    ::-webkit-scrollbar-thumb:hover {
        background: #f13f3f; 
    }
</style>
