const menu=document.getElementById("menu")
const arrowIcon = document.querySelector('.arrow');
const menuElement=document.getElementById("menu-element")
const categoryContent=document.getElementById("category-content")
const containerName=document.getElementById("container")
const multiCarousel = document.querySelector('.MultiCarousel-inner');
const categoryElement=document.querySelectorAll(".category h4")
const con=document.getElementById("all-content")
const link=document.getElementById("link")
const searchField=document.getElementById("seacrh")
const searchButton=document.getElementById("seacrh-button")
let bookdata = null;


link.onclick=function(){
  document.location.reload()
}


window.onload = async function() {
  await getData();
  if (!bookdata || bookdata.length === 0) {
    console.error('No book data available');
    return;
  }
  let books = bookdata.slice(0, 50);
  displayData(books, "Books");
};


  const getData = async () => {
    try {
      const response = await fetch('./books.json');
      const data = await response.json(); 
      bookdata = data; 
    } catch (error) {
      console.error('Error fetching the JSON data:', error);
    }
  };
  
 
  getData().then(() => {   
    let div1, div2, img, title, auth, rate, description, publishYear, language, pages;
    
    for (let i = 0; i <= 15; i++) {
      div1 = document.createElement("div");
      div2 = document.createElement("div");
      img = document.createElement("img");
      title = document.createElement("h4");
      auth = document.createElement("h5");
      rate = document.createElement("div");
      description = document.createElement("p");
      publishYear = document.createElement("span");
      language = document.createElement("span");
      pages = document.createElement("span");
  
      img.src = bookdata[i].cover_image;
      title.textContent = bookdata[i].title;
      auth.textContent = bookdata[i].author;
      description.textContent = bookdata[i].description;
      publishYear.textContent = `Publication Year: ${bookdata[i].publication_year}`;
      language.textContent = `Language: ${bookdata[i].language}`;
      pages.textContent = `No. Pages: ${bookdata[i].page}`;
  
      div1.classList = ["item card"];
      div2.className = "pad15";
      img.className = "card-img-top";
      rate.className = "rate";
      description.className = "des";
      publishYear.className = "publish";
      language.className = "language";
      pages.className = "pages";
  
      // Add stars based on rating
    createStarts(bookdata[i],rate)
  
      div2.appendChild(img);
      div2.appendChild(title);
      div2.appendChild(auth);
      div2.appendChild(rate);
      div1.appendChild(div2);
  
      multiCarousel.appendChild(div1);
    }
    const items = document.querySelectorAll('.item');
    let itemWidth = items[0].offsetWidth;
    let currentTranslate = 0;
    // Carousel navigation
    document.querySelector('.rightLst').addEventListener('click', function() {
      if (currentTranslate > -(items.length * itemWidth - multiCarousel.offsetWidth)) {
        currentTranslate -= itemWidth;
        multiCarousel.style.transform = `translateX(${currentTranslate}px)`;
      }
    });
    document.querySelector('.leftLst').addEventListener('click', function() {
      if (currentTranslate < 0) {
        currentTranslate += itemWidth;
        multiCarousel.style.transform = `translateX(${currentTranslate}px)`;
      }
    });   
  });


  // Modal function
  const displayModal = (cardBody, col, element, description, language, publishYear, pages, rate) => {
    const modalElement = new bootstrap.Modal(document.getElementById('staticBackdrop'));
    const modelTitle = document.getElementById("staticBackdropLabel");
    const modelBody = document.getElementById("model-body");
    
    modelBody.textContent = ""; 
    modelTitle.innerText = element.title; 
    cardBody.insertBefore(description, rate);
    cardBody.insertBefore(language, rate);
    cardBody.insertBefore(publishYear, rate);
    cardBody.insertBefore(pages, rate);
    const clonedCard = col.cloneNode(true);
    modelBody.appendChild(clonedCard);
    modalElement.show();
    cardBody.removeChild(pages);
    cardBody.removeChild(language);
    cardBody.removeChild(publishYear);
    cardBody.removeChild(description);
  };
  

categoryElement.forEach((header) => {
  header.addEventListener('click',  async() => {
    const categoryText = header.textContent.trim();
    getData();
    const filteredBooks = bookdata.filter(book => book["genre"].includes(categoryText));
    displayData(filteredBooks,categoryText)
    
  });
});




const displayData = (data, categoryText) => {
  categoryContent.textContent = "";
  const categoryTitle = document.getElementsByClassName("category-name")[0];
  categoryTitle.textContent = categoryText;
  containerName.insertBefore(categoryTitle, categoryContent);

  data.forEach((ele) => {
    const div1 = document.createElement("div");
    const div2 = document.createElement("div");
    const div3 = document.createElement("div");
    const img = document.createElement("img");
    const title = document.createElement("h4");
    const auth = document.createElement("h5");
    const rate = document.createElement("div");
    const desciption=document.createElement("p")
    const publishYear=document.createElement("span")
    const language=document.createElement("span")
    const pages=document.createElement("span")
    
    div1.className = "col";
    div2.className = "card";
    div3.className = "card-body";
    title.className = "card-title";
    auth.className = "card-text";
    rate.className = "rate";
    desciption.className="des"
    publishYear.className="publish"
    language.className="language"
    pages.className="pages"

   createStarts(ele,rate)

    img.src = ele.cover_image;
    title.textContent = ele.title;
    auth.textContent =`Author : ${ele.author}`;
    desciption.textContent=ele.description
    publishYear.textContent=`publication_year :${ele.publication_year}`,
    language.textContent=`language : ${ele.language}`,
    pages.textContent=`No.Pages : ${ele.page}`

    div3.appendChild(title);
    div3.appendChild(auth);
    div3.appendChild(rate);
    div2.appendChild(img);
    div2.appendChild(div3);
    div1.appendChild(div2);
    
    categoryContent.appendChild(div1);
    
    div2.addEventListener('click', () => {
     
      displayModal(div3,div1,ele,desciption,language,publishYear,pages,rate)
    });
  });
};


const createStarts=(elemant,rateDiv)=>{
  for (let star = 1; star <= 5; star++) {
    const starElement = document.createElement("i");
    if (star <= elemant.rate) {
      starElement.classList = ["fa-solid fa-star fa-xl"];
      starElement.style.color = "#FFD43B";
    } else {
      starElement.classList = ["fa-regular fa-star fa-xl"];
      starElement.style.color = "#FFD43B";
    }
    rateDiv.appendChild(starElement);
  }
}





searchButton.addEventListener("click", function(e) {
  e.preventDefault();
  const searchValue = searchField.value.toLowerCase();
  const hiddenElements = document.querySelectorAll('.hide');
  const filterElement = Array.from(document.getElementsByClassName('filter-ele'));
  if (!searchValue) {
      hiddenElements.forEach(element => {
          element.style.display = 'block'; 
      });
      filterElement.forEach(element => {
        con.removeChild(element)
      })
  } else {
      hiddenElements.forEach(element => {
          element.style.display = 'none';
      });
      getData().then(() => {
          const filteredBooks = bookdata.filter(book => book.title.toLowerCase().includes(searchValue));
          hiddenElements.forEach(element => {
            element.style.display = 'none'; 
        });        
          if (filteredBooks.length) {            
            seacrhDisplay(filteredBooks,filterElement)
          } else {            
            if(filterElement.length){
              filterElement.remove()
            notFoundTemplate(con)
            }
            else{
              notFoundTemplate(con)
            }
          }
      });
  }
});


const seacrhDisplay=(data,filterElement)=>{
  if(data.length){
    if(filterElement.length){
      filterElement.forEach((re=>{
       re.remove()
      }))
    }
    data.forEach((ele=>{
        const div1 = document.createElement("div");
        const div2 = document.createElement("div");
        const div3 = document.createElement("div");
        const img = document.createElement("img");
        const title = document.createElement("h4");
        const auth = document.createElement("h5");
        const rate = document.createElement("div");
        const description = document.createElement("p");
        const publishYear = document.createElement("span");
        const language = document.createElement("span");
        const pages = document.createElement("span");

        div1.classList = ["col filter-ele"];
        div2.classList = ["card colpadding"];
        div3.className = "card-body";
        title.className = "card-title";
        auth.className = "card-text";
        rate.className = "rate";
        img.className = "card-img-top";
        description.className = "des";
        publishYear.className = "publish";
        language.className = "language";
        pages.className = "pages";

        for (let star = 1; star <= 5; star++) {
            const starElement = document.createElement("i");
            if (star <= ele.rate) {
                starElement.classList = ["fa-solid fa-star fa-xl"];
                starElement.style.color = "#FFD43B";
            } else {
                starElement.classList = ["fa-regular fa-star fa-xl"];
                starElement.style.color = "#FFD43B";
            }
            rate.appendChild(starElement);
        }

        img.src = ele.cover_image;
        title.textContent = ele.title;
        auth.textContent = `author : ${ele.author}`;
        description.textContent = ele.description;
        publishYear.textContent = `Publication Year: ${ele.publication_year}`;
        language.textContent = `Language: ${ele.language}`;
        pages.textContent = `No. Pages: ${ele.page}`;

        div3.appendChild(title);
        div3.appendChild(auth);
        div3.appendChild(rate);
        div2.appendChild(img);
        div2.appendChild(div3);
        div1.appendChild(div2);
        con.appendChild(div1);

        div2.addEventListener('click', () => {
            displayModal(div3, div1, filteredBooks[0], description, language, publishYear, pages, rate);
        });
    
    }))
  }
}


const notFoundTemplate=(container)=>{
  const notFound = document.createElement("div");
  notFound.textContent = "No books found in this category";
  notFound.className = "not-found";
  container.appendChild(notFound);
}