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
        let currentBook = this.state.remainingBooksToScan[this.state.remainingBooksToScan.length - 1];
        let keepScanning = true;
        let libsAndBooksFromToday = this.signedUpLibraries.map(lib => ({
            shippedSoFar: 0,
            shippedBookIds: [],            
            lib: lib,
        }));

        while(keepScanning) {            
            this.libsAndBooksFromToday.forEach(lib => {
                if(lib.shippedSoFar === lib.shipQty) {                    
                    continue;
                }

                const foundBook = lib.lib.shippedBookIds.find(i => i === currentBook.index);
                if (foundBook) {
                    lib.push.shippedBookIds(i);
                    lib.shippedSoFar++;
                    this.state.remainingBooksToScan.pop();
                    currentBook = this.state.remainingBooksToScan[this.state.remainingBooksToScan.length - 1];
                }
            })

            keepScanning = this.libsAndBooksFromToday.find(lib => lib.shippedSoFar < lib.shipQty) || this.state.remainingBooksToScan.length !== 0;
        }

        return this.libsAndBooksFromToday();
    }
}

module.exports = Runner;