var moment = require('moment');

export const generateDate = ()  => {
    const today = moment(new Date()).format('YYYY-MM-DD[T00:00:00.000Z]');
    return today
}

export const shuffle = (array : Array<any>) => {
    let currentIndex = array.length,
        randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex !== 0) {
        // Pick a remaining element.
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }

    return array;
}