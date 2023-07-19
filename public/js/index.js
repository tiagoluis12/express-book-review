const formContainer = document.getElementById("add-form-container");
const listContainer = document.getElementById("large-th");
const selector = document.getElementById("add-form-container");
const ascBtn = document.getElementById("ascending-btn");
const descBtn = document.getElementById("descending-btn");

const addBook = () => {
  if (formContainer.style.display === "none") {
    formContainer.style.display = "flex";
    listContainer.style.display = "none";
  } else {
    formContainer.style.display = "none";
    listContainer.style.display = "block";
  }
};

const selectPress = (e) => {
  const value = selector.value;

  if (value === "Ascending Order") {
    ascBtn.click();
  } else {
    descBtn.click();
  }
};
