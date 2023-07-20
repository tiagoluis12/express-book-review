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
    console.log("The inserted books is , ", result);
    return res.render("index", {
      message: "Updated to the database",
      ReviewList: result,
    });
  });
});

router.route("/submitBookReview").post((req, res) => {
  const { BookTitle, BookAuthor, BookImage, Description } = req.body;
  if (
    BookTitle.length > 4 &&
    BookAuthor.length > 3 &&
    BookImage.length > 8 &&
    Description.length > 1
  ) {
    db.query(
      `INSERT INTO books (BookName, Description, BookAuthor, BookImage) VALUES ('${BookTitle}', '${Description}', '${BookAuthor}', '${BookImage}')`,
      (error, result) => {
        console.log("The insert result is ", result);
        console.log("The insert error is ", error);
        if (error === null) {
          db.query(`SELECT * FROM booksreviewdb.books`, (error, result) => {
            console.log("The inserted books is , ", result);
            return res.render("index", {
              message: "Updated to the database",
              ReviewList: result,
            });
          });
        } else {
          res.render("index", {
            message: "Did not update to the database",
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
  db.query(
    `SELECT * FROM booksreviewdb.books where id = ${req.params.id}`,
    (error, result) => {
      res.render("description", {
        Data: {
          ...result[0],
        },
      });
    }
  );
});

module.exports = router;
