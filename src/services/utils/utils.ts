var moment = require('moment');

export const generateDate = (suplyday = 0)  => {

    const date = moment(new Date());

    if(suplyday){
        date.add(suplyday,'days')
    }

    return date.format('YYYY-MM-DD[T00:00:00.000Z]')
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