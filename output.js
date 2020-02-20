class Output {
    /*
    libraries signed up for scanning
    first library to do signup, after signup it will send 3 books


    */

    constructor(filename) {
        this.write(
            filename,
            2, 
            [
                {
                    index: 1,
                    booksQty: 3,
                    books: [5, 2, 3]
                },               
                {
                    index: 0,
                    booksQty: 5,
                    books: [0, 1, 2, 3, 4]
                }
            ]
        )
    }

    write(filename, numLibrariesForScanning, librariesArray){
        const fs = require('fs');
        var file = fs.createWriteStream(`${filename}_output.txt`);
        file.on('error', function(err) { /* error handling */ });

        // LINE 1
        file.write(numLibrariesForScanning + '\n'); 

        // LINE 2
        librariesArray.forEach(library => {
            file.write(library.index + ' ' + library.booksQty + '\n'); // Library Index Books scanning
            file.write(); // Amount of books for scanning

            // LINE 3
            file.write(library.books.join(' ') + '\n'); // Each book in library
        });
        file.end();
    }


}

module.exports = Output;