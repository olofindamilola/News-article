const apiKey = '2d13935da04f4e138ef26d130a050ecc';

const blogContainer = document.getElementById("blog-container");
const searchField = document.getElementById( "search-input");
const searchButton = document.getElementById("search-button");

async function fetchRandomNews(){
    try{
        const apiUrl = `https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=${apiKey}`; 
        const response = await fetch(apiUrl)
        const data = await response.json();
        return data.articles;
    } catch(error){
        console.error("Error fecthing random new", error)
        return[];
    }
}

searchButton.addEventListener("click", async() => {
    const query = searchField.value.trim();
    if(query !== ""){
        try{
            const articles = await fetchNewsQuery(query)
            displayBlogs(articles);
        }catch(error){
            console.log("Error fetching news by query" , error);
        }
    }
})


async function fetchNewsQuery(query){
    try{
        const apiUrl = `https://newsapi.org/v2/everything?q=${query}&apiKey=${apiKey}`;
        const response = await fetch(apiUrl);
        const data = await response.json();
        return data.articles;
    }catch(error){
        console.error("Error fecthing random news", error);
        return [];
    }
}

function displayBlogs(articles){
    blogContainer.innerHTML = ""
    articles.forEach((article) =>{
        if (article.urlToImage){
            const blogCard = document.createElement('div');
            blogCard.classList.add('blog-card')
            const img = document.createElement('img')
            img.src = article.urlToImage;
            img.alt = article.title
            const title = document.createElement('h2');
            const truncatedTitle = article.title.length > 30? article.title.slice(0, 30) + "...." : article.title;
            title.innerText = truncatedTitle
            const description = document.createElement('p');
            const truncatedDes = article.description.length > 120 ? article.description.slice(0, 120) + "...." : article.description;
            description.innerText =  truncatedDes;
            
            blogCard.appendChild(img);
            blogCard.appendChild(title);
            blogCard.appendChild(description);
            blogCard.addEventListener( "click", ()=> {
                window.open(article.url, '_blank');
            });
            blogContainer.appendChild(blogCard);
        }
    });
}

(async () => {
    try{
        const articles = await fetchRandomNews();
        displayBlogs(articles);
    } catch (error) {
        console.log('Error fecthing random news', error);
    }
})();