function weeksInSemester(start, end) {
    const startEpoch = new Date(start).getTime()
    const endEpoch = new Date(end).getTime()

    let currentEpoch = startEpoch
    let count = 1
    let weeks_in_semester = []
    while (currentEpoch < endEpoch) {
        weeks_in_semester.push({
            startEpoch: currentEpoch,
            endEpoch: currentEpoch + 604799000,
            count: count
        })
        currentEpoch = currentEpoch + 604800000
        count++
    }
    return weeks_in_semester
}

function weeksBetweenSemesters(firstDay, lastDay) {
    const firstDayEpoch = new Date(firstDay).getTime()
    const lastDayEpoch = new Date(lastDay).getTime()

    let currentEpoch = firstDayEpoch
    let count = -1
    let weeks_between_semesters = []
    while (currentEpoch > lastDayEpoch) {
        weeks_between_semesters.push({
            startEpoch: currentEpoch - 604800000,
            endEpoch: currentEpoch - 1000,
            count: count
        })
        currentEpoch = currentEpoch - 604800000
        count--
    }
    return weeks_between_semesters
}
/**
 * 
 * semesters is an array of objects, looking like this:
 * {
 *      type: "start", // or "end" 
 *      level: "UG", // or "FND" or whatever other types of academic calendars are supported
 *      term: "FA", // or "SU" or "SP",
 *      date: new Date("2020-02-19") // formarted date
 * }
 */

const semesters = [
    {
        type: "start",
        term: "FA",
        level: "UG",
        date: new Date("2020-09-06"),
        academic_year: "2020-2021"
    },
    {
        type: "end",
        term: "FA",
        level: "UG",
        date: new Date("2021-02-06"),
        academic_year: "2020-2021"
    },
    {
        type: "start",
        term: "SP",
        level: "UG",
        date: new Date("2021-02-21"),
        academic_year: "2020-2021"
    },
    {
        type: "end",
        term: "SP",
        level: "UG",
        date: new Date("2021-05-29"),
        academic_year: "2020-2021"
    }
]

const dateString = "2020-11-04"

function getWeekObject(dateString, semesters) { // YYYY-MM-DD
    let prevItem = null
    let myWeekDetails = {}
    // console.log("dealing with: ", dateString, semesters)
    semesters.forEach(item => {
        if (myWeekDetails.week !== undefined) return
        let weeks = []
        // console.log(`${item.term} - ${item.level} - ${item.type} - ${item.date}`)
        const currentEpoch = new Date(dateString).getTime()

        if (prevItem === null) {
            // console.log("prevItem, item, ", prevItem, item)
            prevItem = item
            return
        }

        // console.log("comparing terms for: ", prevItem, item)
        if (prevItem.term === item.term) {
            weeks = weeksInSemester(prevItem.date, item.date)
        } else {
            weeks = weeksBetweenSemesters(item.date, prevItem.date)
        }

        if (weeks.length > 0) {
            weeks.forEach(week => {
                // console.log("Comparing epochs: ", week.count, week.startEpoch, currentEpoch, week.endEpoch)
                if (week.startEpoch <= currentEpoch && currentEpoch <= week.endEpoch) {
                    myWeekDetails = {
                        week: week.count,
                        level: item.level,
                        term: item.term,
                        academic_year: item.academic_year
                    }
                }
            })
        }
        prevItem = item
    })
    return myWeekDetails
}

const weekObj = getWeekObject(dateString, semesters)
console.log(weekObj)