<template>
    <div class="editor">
        <div class="editor-image">
            <svg width="100" height="100">
                <polygon 
                    :points="points"
                    :fill="color" 
                />
            </svg>
        </div>

        <div class="editor-sliders">
            <input 
                v-for="(slider, index) in sliders"
                :key="index"
                v-model="slider.valueY"
                type="range" 
                min="10" 
                max="99"
            >
        </div>
        
        <div class="editor-control">
            <input
                class="editor-control-color"
                v-model="colorChanger"
                type="color"
                value="colorChanger"
            >
            <label class="editor-control-auto">
                autocolor
                <input
                    class="editor-control-auto-checkbox"
                    type="checkbox" 
                    v-model="isAutoColor"
                >
            </label>
            <button 
                class="button button-random"
                @click="generateRandomImage"
            >
                RANDOM
            </button>   
            <button 
                class="button button-send"
                @click="sendMessage"
            >
                SEND
            </button>   
        </div>
    </div>
</template>

<script>
    import logMixin from "../mixins/logMixin"

    const TIME_MAX = 150

    export default {
        mixins: [logMixin],
        props: {
            user: String
        },
        data() {
            return {
                widthRect: 200,
                heightRect: 100,
                svgImg: '',
                isAutoColor: false,
                colorChanger: '#FF5555',
                timerInterval: null,
                timeLimit: TIME_MAX,
                sliders: [
                    { valueX: 50, valueY: 0 + TIME_MAX},
                    { valueX: 99, valueY: 50 + TIME_MAX},
                    { valueX: 50, valueY: 99 + TIME_MAX},
                    { valueX: 0, valueY: 50 + TIME_MAX}
                ]
            }
        },
        computed: {
            points: function () {
                let preparePoints = ''
                
                for (const slider of this.sliders) {
                    preparePoints += `${slider.valueX},${slider.valueY} `
                }

                return preparePoints
            },
            color: function () {
                let newColor = '#'
                
                newColor += this.sliders[1].valueY
                newColor += this.sliders[2].valueY
                newColor += this.sliders[3].valueY

                if (!this.isAutoColor) {
                    newColor = this.colorChanger
                }

                return newColor
            }
        },
        methods: {
            randomNumber () {
                return (Math.floor(Math.random() * 89) + 10)
            },
            generateRandomImage () {
                for (const slider of this.sliders) {
                    slider.valueY = this.randomNumber()
                }
                this.colorChanger = '#'
                this.colorChanger += this.randomNumber()
                this.colorChanger += this.randomNumber()
                this.colorChanger += this.randomNumber()

                this.logMessage('Random image generated')
            },
            sendMessage () {
                this.svgImg = `${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()};
                    ${this.user};<polygon points="${this.points}" fill="${this.color}"/>`

                this.$emit('send-message', this.svgImg)
                
                this.logMessage('Image sended:', this.svgImg)
            },
        },
        mounted () {
            this.timerInterval = setInterval(() => {
                this.sliders.forEach(slider => (slider.valueY--))
                this.timeLimit--
                if (this.timeLimit <= 0) {
                    clearInterval(this.timerInterval)
                }
            }, 10)

            this.logMessage('Editor started')
        }
    }
</script>

<style lang="scss">
    .editor {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        height: 140px;
        padding: 20px;
        margin: 10px;
        border: 2px solid #3a9beb;
        border-radius: 10px;

        &-image {
            display: flex;
            flex-direction: column;
            justify-content: center;
        }
   
        &-sliders {
            width: 50%;
            display: flex;
            flex-direction: column;
            justify-content: center;
        }
    
        &-control {
            display: flex;
            flex-direction: column;
            justify-content: space-between;

            &-color {
                align-self: flex-end;
            }
            
            &-auto {
                padding: 0px 5px 5px 5px;
                font-size: 12px;
                color: white;
                border-radius: 5px;
                background-color: #8dcbff;
                
                &-checkbox {
                    position: relative;
                    top: 3px;
                    align-self: flex-end;
                }
            }
        }
    }

    .button {
        align-self: center;
        width: 85px;
        font-size: 11px;
        color: white; 
        padding: 5px;
        border: 0; 
        border-radius: 5px; 

        &-send {
            background-color: #585858; 
        }

        &-random {
            background-color: #3a9beb;
        }
    }
</style>
