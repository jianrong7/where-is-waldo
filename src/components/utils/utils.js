const checkValid = (storedCoord, tryCoord) => {
    return(
        storedCoord === tryCoord ||
        storedCoord + 1 === tryCoord ||
        storedCoord + 2 === tryCoord ||
        storedCoord - 1 === tryCoord ||
        storedCoord - 2 === tryCoord
    );
}

export { checkValid };