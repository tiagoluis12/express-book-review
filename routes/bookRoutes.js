const express = require("express");
const mysql = require("mysql2");
const router = express.Router();

//DB config for connection
const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "tiago716485",
  database: "booksreviewdb",
});

router.route("/").get((req, res) => {
  db.query(`SELECT * FROM booksreviewdb.books`, (error, result) => {
    console.log("THe inserted books is ", result);
    return res.render("index", {
      message: "Updated to the database",
      ReviewList: result,
    });
  });
});
router.route("/submitBookReview").post((req, res) => {
  const { BookTitle, BookAuthor, BookImage, Description } = req.body;
  console.log(req.body);
  if (
    BookTitle.length > 4 &&
    BookAuthor.length > 3 &&
    BookImage.length > 8 &&
    Description.length > 1
  ) {
    db.query(
      `INSERT INTO booksreviewdb.books (BookName, Description, BookAuthor, BookImage) VALUES ("${BookTitle}", "${Description}",  "${BookAuthor}",  "${BookImage}")`,
      (error, result) => {
        console.log("The insert result is ", result);
        console.log("The insert error is ", error);
        if (error === null) {
          db.query(`SELECT * FROM booksreviewdb.books`, (error, result) => {
            console.log("THe inserted books is ", result);
            return res.render("index", {
              message: "Updated to the database",
              ReviewList: result,
            });
          });
        } else {
          res.render("index", {
            message: "Did not update the database",
          });
        }
      }
    );
  }
});

router.route("/asc").post((req, res) => {
  db.query(
    `SELECT * FROM booksreviewdb.books ORDER BY BookName ASC`,
    (error, result) => {
      return res.render("index", { ReviewList: result });
    }
  );
});

router.route("/desc").post((req, res) => {
  db.query(
    `SELECT * FROM booksreviewdb.books ORDER BY BookName DESC`,
    (error, result) => {
      return res.render("index", { ReviewList: result });
    }
  );
});

router.route("/description/:id").get((req, res) => {
  let averageRating = 0;
  let reviews = [];
  db.query(
    `SELECT * FROM booksreviewdb.books where id=${parseInt(req.params.id)}`,
    (error, result) => {
      db.query(
        `SELECT * FROM booksreviewdb.rating where bookId=${parseInt(
          req.params.id
        )}`,
        (error, result_rating) => {
          if (result_rating.length > 0) {
            averageRating =
              result_rating.reduce((acc, currval) => {
                return acc + currval.rating;
              }, 0) / result_rating.length;
          }
          db.query(
            `SELECT * FROM booksreviewdb.review where bookId=${parseInt(
              req.params.id
            )}`,
            (error, result_review) => {
              reviews = result_review.map((item) => item.review);
              return res.render("description", {
                Data: {
                  ...result[0],
                  RatingNumber: Number.parseFloat(averageRating).toFixed(1),
                  Comments: reviews,
                },
              });
            }
          );
        }
      );
    }
  );
});

router.route("/delete").post((req, res) => {
  console.log(req.body.id);
  db.query(
    `DELETE FROM booksreviewdb.books where id=${parseInt(req.body.id)}`,
    (error, result) => {
      console.log(result);
      console.log(error);
      db.query(`SELECT * FROM booksreviewdb.books`, (error, result) => {
        return res.render("index", { ReviewList: result });
      });
    }
  );
});

router.route("/addRating").post((req, res) => {
  const { bookId, rating } = req.body;
  console.log(req.body);
  db.query(
    `INSERT INTO booksreviewdb.rating (bookId, rating) VALUES ("${bookId}", "${rating}")`,
    (error, result) => {
      if (error === null) {
        return res.json({ message: "Rating updated to the database" });
      } else {
        return res.json({ message: "Rating did not updated to the database" });
      }
    }
  );
});

router.route("/addReview").post((req, res) => {
  const { bookId, review } = req.body;
  db.query(
    `INSERT INTO booksreviewdb.review (bookId, review) VALUES ("${bookId}", "${review}")`,
    (error, result) => {
      if (error === null) {
        return res.json({ message: "Review updated to the database" });
      } else {
        return res.json({ message: "Review did not updated to the database" });
      }
    }
  );
});

module.exports = router;
