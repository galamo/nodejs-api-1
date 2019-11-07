const moment = require("moment")

function isValidDates(dates) {
    return !dates.some((date) => {
        const mDate = moment(date)
        if (!mDate.isValid()) return true
    })
}

module.exports = {
    isValidDates
}
