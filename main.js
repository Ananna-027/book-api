// for search
const searchField = document.getElementById('search-field');

// search button
const searchBook = document.getElementById('search-btn').addEventListener('click', function () {
    const getFieldText = searchField.value;
    searchField.value = '';
    getApiData(getFieldText);
});

const showItems = document.getElementById("show-items");
const countSearchResult = document.getElementById("count-result");

// innerhtml
const getApiData = (searchText) => {

    if (searchText === '') {
        countSearchResult.innerHTML = '';
        showItems.innerHTML = `
        <h3 class="text-center p-3 bg-danger text-light">Enter some text</h3>
        `;

    } else {

        const url = `https://openlibrary.org/search.json?q=${searchText}`;
        fetch(url)
            .then((res) => res.json())
            .then((data) => showSearchData(data.docs, searchText));

    }

}


// search data

const showSearchData = (books, searchText) => {
    console.log(books);
    let count = 0;
    showItems.innerHTML = "";

    books.forEach((element) => {
        // 'count' variable is used for count every forEach for that we can get how many times for loops run
        count++;
        const newDiv = document.createElement("div");
        newDiv.classList.add("col");
        const imgId = element.cover_i;

        ;
        newDiv.innerHTML = `
            <div class="card h-100 mx-auto">
                <img  src="https://covers.openlibrary.org/b/id/${imgId}-M.jpg" class="img-fluid" alt="books-image">  
                <div class="card-body">
                    <h5 class="card-title">${element.title}</h5>
                    <p class="card-text"> <span class="fw-bold">Author:</span> ${element.author_name}</p>
                    <p class="card-text"> <span class="fw-bold">Publisher:</span> ${element.publisher}</p>
                    <a href="#" class="btn btn-primary">Go somewhere</a> 
                </div>
                <div class="card-footer">
                     <small class="text-muted">First Published: ${element.first_publish_year}</small>
                </div>
            </div>
        
        `;
        showItems.appendChild(newDiv);
    });


    if (count === 0) {
        countSearchResult.innerHTML = `<h5 class=" text-center bg-warning p-3">No result found</h5>`;
    }

    else {
        countSearchResult.innerHTML = `<h5 class="text-success">
        ${searchText}'s ${count} result found</h5>`;
    }
}