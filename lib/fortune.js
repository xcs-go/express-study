/**
 * Created by 1t8l7j2 on 2017/7/4.
 */
const fortuneCookies = [
    "Conquer your fears or they will conquer you.",
    "Rivers need springs.",
    "Do not frear what you don't know.",
    "You will have a pleasant surprise."
];
exports.getFortune = function () {
    const idx = Math.floor(Math.random() * fortuneCookies.length);
    return fortuneCookies[idx];
};