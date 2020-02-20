class Scheduler {
    constructor(bookScores) {
        this.bookScores = bookScores;
    }

    getTotalBookScore(books) {
        let totalScore = 0;
        books.forEach(bookIndex => {
            totalScore += this.bookScores[bookIndex];
        });

        return totalScore;
    }

    /**
     * library['books']
     * library['days']
     * library['shipQty']
     */
    rankLibrary(library) {
        const totalScore = this.getTotalBookScore(library['bookItems']);
        return ((totalScore / library['bookItems'].length) * library['shipQty']) - library['days'];
    } 
}

module.exports = Scheduler;