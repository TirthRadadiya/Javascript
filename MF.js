const search = document.getElementById("search"),
  submit = document.getElementById("submit"),
  random = document.getElementById("random"),
  mealsEl = document.getElementById("meals"),
  resultHeading = document.getElementById("result-heading"),
  single_mealEl = document.getElementById("single-meal");

function searchMeal(e) {
  e.preventDefault();

  single_mealEl.innerHTML = "";

  const term = search.value;

  if (term.trim()) {
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
      .then((res) => res.json)
      .then((data) => {
        resultHeading.innerHTML = `<h2>Search Result for '${term}'</h2>`;

        console.log(data);
        if (data.meals === null) {
          resultHeading.innerHTML =
            "<p>There are no Search Result.Please Try Again!</p>";
        } else {
          mealsEl.innerHTML = data.meals
            .map(
              (meal) =>
                `<div class='meal'>
                    <img src='${meal.strMealThumb}' alt='${meal.strMeal}'/>
                    <div class='meal-info' data-mealID = "${meal.idMeal}">
                    <h3>${meal.strMeal}</h3>
                    </div>
                </div>`
            )
            .join("");
        }
      });

    search.value = "";
  } else {
    alert("Please enter Something...");
  }
}

submit.addEventListener("submit", searchMeal);
