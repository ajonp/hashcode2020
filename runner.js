class Runner {
    constructor(totalDays, libraries, bookScores) {
        this.totalDays = totalDays;
        this.libraries = libraries;
        this.overallScore = 0;
        this.bookScores = bookScores;
        
        this.state = {
            signingUpStatus: { id: 0, daysRemaining: 0 },
            signedUpLibraries: [],
            totalScannedBookScore: 0,
            scannedBooksByLib: [],
            currentLibraryIndex: 0,
            remainingBooksToScan: bookScores
                .map((score, index) => ({score, index}))
                .sort((a, b) => a.score > b.score ? 1 : -1)
        };
    }

    run() {
        let currentDay = 0;
        this.signUpLibrary();

        while(currentDay++ <= this.totalDays) {
            if(this.state.signingUpStatus.daysRemaining === 0) {
                this.state.signedUpLibraries.push(this.libraries[this.state.currentLibraryIndex]);
                this.state.currentLibraryIndex++;

                if (this.state.currentLibraryIndex < this.libraries.length) {
                    this.signUpLibrary();
                }
            } else {
                this.state.signingUpStatus.daysRemaining--;
            }

            if (this.state.signedUpLibraries.length > 0) {
                this.scanBooks();
            }
        }

        console.log(this.state.scannedBooksByLib);
        return this.overallScore;
        //return this.state.scannedBooksByLib;
    }   

    signUpLibrary() {
        const library = this.libraries[this.state.currentLibraryIndex];

        this.state.signingUpStatus = {
            id: library.index,
            daysRemaining: library.library.days
        }
    }


    scanBooks() {
        //let currentBook = this.state.remainingBooksToScan[this.state.remainingBooksToScan.length - 1];
        let keepScanning = this.state.remainingBooksToScan.length !== 0;
        let shippedBooks = [];

        let libsAndBooksFromToday = this.state.signedUpLibraries.map(lib => ({
            shippedSoFar: 0,
            shippedBookIds: [],            
            lib: lib,
        }));

        while(keepScanning) {    
            let currentBook = this.state.remainingBooksToScan[this.state.remainingBooksToScan.length - 1];
            let foundBook = null;

            libsAndBooksFromToday.forEach(today => {                
                if(today.shippedSoFar === today.lib.library.shipQty) {                    
                    return;
                }

                try {
                    foundBook = today.lib.library.bookItems.find(bookIndex => bookIndex === currentBook.index);
                } catch(e) {
                    debugger;
                }

                if (foundBook) {
                    this.state.scannedBooksByLib.push({ bookId: foundBook, libraryId: today.lib.index });
                    this.overallScore += this.bookScores[foundBook];
                    today.shippedSoFar++;
                    return;
                }
            })

            this.state.remainingBooksToScan.pop();
            
            keepScanning = 
                libsAndBooksFromToday.find(today => today.shippedSoFar < today.lib.library.shipQty) &&
                this.state.remainingBooksToScan.length !== 0;
        }
    }
}

module.exports = Runner;