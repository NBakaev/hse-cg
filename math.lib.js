// Returns a random integer between min (included) and max (excluded)
// Using Math.round() will give you a non-uniform distribution!

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}/**
 * Created Nikita Bakaev, ya@nbakaev.ru on 12/6/2016.
 * All Rights Reserved
 */

function rnd(max) {
    return getRandomInt(1, max);
}
