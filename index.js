const lineReader = require("line-reader");
//  Tabs or spaces???
const Scheduler = require("./scheduler");
const Output = require("./output");

let l = 0;
// Header
const bld = {};
const bookScores = [];

// Libraries with Books
const libraries = [];

let library;

const files = [
//   "./data/a_example.txt",
//   "./data/b_read_on.txt",
  "./data/c_incunabula.txt",
//   "./data/d_tough_choices.txt",
//   "./data/e_so_many_books.txt",
//   "./data/f_libraries_of_the_world.txt"
];

files.forEach(filename => {
  lineReader.eachLine(filename, function(line, last) {
    var res = line.split(" ");
    /**
     * HEADER:
     * B L D
     * B = Total Number of Books
     * L = Total Number of Libraries
     * D = Total Number of Days
     */

    if (l == 0) {
      bld["book"] = parseInt(res[0]);
      bld["library"] = parseInt(res[1]);
      bld["days"] = parseInt(res[2]);
    } else if (l == 1) {
      res.forEach(score => {
        bookScores.push(parseInt(score));
      });
    } else if (l > 1 && l % 2 == 0) {
      library = {
        booksQty: 0,
        days: 0,
        shipQty: 0,
        bookItems: []
      };
      library["booksQty"] = parseInt(res[0]);
      library["days"] = parseInt(res[1]);
      library["shipQty"] = parseInt(res[2]);
    } else {
      res.forEach(score => {
        library["bookItems"].push(parseInt(score));
      });
      if (l > 1) {
        libraries.push(library);
      }
    }

    l++;

    if (last) {
      // console.log('Header-BLD', bld);
      // console.log('Header-Book Scores', bookScores);
      // console.log('Libraries', libraries);

      const scheduler = new Scheduler(bookScores);
      const scoredLibraries = libraries
        .map((lib, i) => ({
          index: i,
          score: scheduler.rankLibrary(lib),
          library: lib
        }))
        .sort((a, b) => (a.score >= b.score ? 1 : 0));

      console.log(scoredLibraries);

      const output = new Output(filename);
      console.log("wrote file");
    }
  });
});
