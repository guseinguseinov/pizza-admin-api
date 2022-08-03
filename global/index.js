function generateResponseMessage(status, msg, data) {
    return {
        status,
        msg, 
        data
    }
}

export default generateResponseMessage;