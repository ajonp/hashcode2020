class Runner {
    constructor(totalDays, libraries, bookScores) {
        this.totalDays = totalDays;
        this.libraries = libraries;
        
        this.state = {
            signingUpStatus: { id: -1, daysRemaining: 0 },
            signedUpLibrariesById: [],
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
        if(this.state.currentLibraryIndex > 0) {
            this.state.signedUpLibrariesById.push(this.state.signingUpStatus.id);
        }

        const library = this.libraries[this.state.currentLibraryIndex];

        this.state.signingUpStatus = {
            id: library.index,
            daysRemaining: library.days
        }
    }


    scanBooks() {
        // look at next highest-score book
        // browse all available libraries
        // if found 
    }
}

module.exports = Runner;