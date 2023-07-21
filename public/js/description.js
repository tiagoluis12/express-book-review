const review = document.getElementById("review");
const commentInput = document.getElementById("review-input");
const radioBtn = document.getElementById("input[name-start]");
const bookId = document.getElementById("book-id").value;

const submitRating = async () => {
  alert("submit rating");
  const data = {
    bookId,
    rating: event.target.value,
  };

  console.log("the rating body is ", data);

  const res = await fetch("http://localhost:8081/addRating", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const resData = await res.json();
  console.log(resData.message);
  alert(resData.message);
};

const addComment = async (e) => {
  if (event.key === "Enter") {
    const data = {
      bookId,
      review: event.target.value,
    };
    event.target.value = "";

    const res = await fetch("http://localhost:8081/addComment", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    console.log(res.status);
    if (res.ok) {
      location.reload();
    }
  }
};
