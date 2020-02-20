class Runner {
    constructor(totalDays, libraries, bookScores) {
        this.totalDays = totalDays;
        this.libraries = libraries;
        
        this.state = {
            signingUpStatus: { id: -1, daysRemaining: 0 },
            signedUpLibraries: [],
            totalScannedBookScore: 0,
            scannedBooksByLib: [],
            currentLibraryIndex: -1,
            remainingBooksToScan: bookScores
                .map((score, index) => ({score, index}))
                .sort((a, b) => a.score > b.score ? 1 : 0)
        };
    }

    run() {
        let currentDay = 0;
        while(currentDate <= this.totalDays) {
            if(this.state.signingUpStatus.daysRemaining === 0) {
                this.state.signedUpLibraries.push(this.libraries[this.state.currentLibraryIndex]);
                this.state.currentLibraryIndex++;
                this.signUpLibrary();
            } else {
                this.state.signingUpStatus.daysRemaining--;
            }

            // TODO: Scan books by unsscanned books and highest score
            this.scanBooks();
        }
    }   

    signUpLibrary() {
        const library = this.libraries[this.state.currentLibraryIndex];

        this.state.signingUpStatus = {
            id: library.index,
            daysRemaining: library.days
        }
    }


    scanBooks() {
        this.

        // look at next highest-score book
        // browse all available libraries
        // if found, add mapping, adjust remaining books for lib, and move on to next book
        // otherwise look through next library
    }
}

module.exports = Runner;