class Scheduler {
    constructor(bookScores, totalDays) {
        this.bookScores = bookScores;
        this.totalDays = totalDays;
    }

    getTotalBookScore(books) {
        let totalScore = 0;
        books.forEach(bookIndex => {
            totalScore += this.bookScores[bookIndex];
        });

        return totalScore;
    }

    rankLibrary(library) {
        const totalScore = this.getTotalBookScore(library['bookItems']);


        const libScore = (totalScore / library.booksQty) * (library.booksQty * library.shipQty / library.days);

        //const libScore = ((totalScore / library.booksQty) * (library.booksQty * library.shipQty + library.days ));
        return libScore;
        
    }
}

module.exports = Scheduler;