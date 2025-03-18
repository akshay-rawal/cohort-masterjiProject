const input = document.getElementById("searchInput");
const container = document.getElementById("container");

// fetch data from api
async function getData() {
  const url = "https://api.freeapi.app/api/v1/public/youtube/videos";
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`error:${response.status}`);
    }
    // selected data take from api
    const result = await response.json();
    // take selected data and run map for make Array type object whereby we can add data in HTML dynamically
    const neededData = result.data.data.map((data) => ({
      title: data.items.snippet.title,
      thumbnail: data.items.snippet.thumbnails.standard.url,
      channel: data.items.snippet.channelTitle,
      youtubeUrl: `https://www.youtube.com/watch?v=${data.items.id}`,
    }));
    // in HTML add selected data
    addDatatoHtml(neededData);
  } catch (error) {
    console.error("Fetch error:", error);
  }

  // needed data add in html dynamically
  function addDatatoHtml(video) {
    const html = video
      .map(
        (addedData) => `  
                    <div class="video-card" data-title=${addedData.title}>
                    <a href=${addedData.youtubeUrl} >
                        <img src="${addedData.thumbnail}" alt="${addedData.title}"></a>
                          <h2>${addedData.channel}</h2>
                        <p>${addedData.title}</p>
                  </div>
                `
      )
      .join("");
    container.innerHTML += html;

    input.addEventListener("input", () => {
      // store input value in variable
      const query = input.value.toLowerCase().trim();
      // initially set this variable to false to maintain the state of the display style.
      let found = false;
      const videoData = document.querySelectorAll(".video-card");
      //
      videoData.forEach((video) => {
        const title = video.getAttribute("data-title").toLowerCase().trim();

        // check if title match to input value or not.
        if (title.includes(query)) {
          video.style.display = "block";
          // an input matches, set the value to true
          found = true;
          // invisible the other video cards.
        } else {
          video.style.display = "none";
        }
      });
      // Show a No content message based on the state of the found variable.
      const noContent = document.getElementById("no-content");
      if (found) {
        noContent.style.display = "none";
      } else {
        noContent.style.display = "block";
      }
    });
  }
}

// This function will run automatically whenever the HTML page loads.
getData();
