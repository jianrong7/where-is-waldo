const checkValid = (storedCoord, tryCoord) => {
    return(
        storedCoord === tryCoord ||
        storedCoord + 1 === tryCoord ||
        storedCoord + 2 === tryCoord ||
        storedCoord - 1 === tryCoord ||
        storedCoord - 2 === tryCoord
    );
}

const millisToMinutesAndSeconds = (millis) => {
    var seconds = ((millis % 60000) / 1000).toFixed(0);
    console.log(millis - (seconds * 1000))
    return `${seconds}.${millis.toString().slice(-3)}`;
}

const formatTime = (time) => {
    const getSeconds = `0${Math.round(time % 60)}`.slice(-2);
    const minutes = `${Math.floor(time / 60)}`;
    const getMinutes = `0${minutes % 60}`.slice(-2);
  
    return `${getMinutes}:${getSeconds}`;
};
export { checkValid, millisToMinutesAndSeconds, formatTime };