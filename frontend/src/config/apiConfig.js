const apiConfig = {
    local:{
        apiURL:process.env.REACT_APP_API_URL_LOCAL
    },
    dev:{
        apiURL:process.env.REACT_APP_API_URL_DEV
    },
    qa:{
        apiURL:process.env.REACT_APP_API_URL_QA
    },
    prod:{
        apiURL:process.env.REACT_APP_API_URL_PROD
    }
}

const local = "localhost"
const dev = "dev"
const qa = "test"
const currentENV = window.origin

export default currentENV.includes(local)?apiConfig.local:currentENV.includes(dev)?apiConfig.dev:currentENV.includes(qa)?apiConfig.qa:apiConfig.prod