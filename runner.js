class Runner {
    constructor(totalDays, libraries, bookScores) {
        this.totalDays = totalDays;
        this.libraries = libraries;        
        this.currentLibraryIndex = -1;

        this.state = {
            signingUpStatus: { id: -1, daysRemaining: 0 },
            signedUpLibrariesById: [],
            booksScannedById: [],
            totalScannedBookScore: 0,
            remainingBooksToScan: bookScores
                .map((score, index) => ({score, index}))
                .sort((a, b) => a.score > b.score ? 1 : 0)
        };
    }

    run() {
        let currentDay = 0;
        while(currentDate <= this.totalDays) {
            
            if(this.state.signingUpStatus.daysRemaining === 0) {
                this.currentLibraryIndex++;
                this.signUpLibrary();
            } else {
                this.state.signingUpStatus.daysRemaining--;
            }

            // TODO: Scan books by unsscanned books and highest score
            this.scanBooks();
        }
    }   

    signUpLibrary() {
        if(this.currentLibraryIndex > 0) {
            this.state.signedUpLibrariesById.push(this.state.signingUpStatus.id);
        }

        const library = this.libraries[this.currentLibraryIndex];

        this.state.signingUpStatus = {
            id: library.index,
            daysRemaining: library.days
        }
    }


    scanBooks() {

    }
}

module.exports = Runner;