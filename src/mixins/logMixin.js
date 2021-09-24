export default {
    methods: {
      logMessage(msg, value = '', isWarn = false) {
        const localTime = `${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`
        const message = `${localTime} ${msg} ${value}` 
        
        if (!isWarn) {
            console.log(message)
        } else {
            console.warn(message)
        }
      },
    }
  }