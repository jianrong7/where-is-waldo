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
    return `${seconds}.${millis - (seconds * 1000)}`;
  }
export { checkValid, millisToMinutesAndSeconds };