    
    
document.getElementById('create-btn').addEventListener('click', async () => {

      const post_info = {
          link_id:document.getElementById('post-link').value,
          description : document.getElementById('post-desc').value
      }


       if (!post_info.link_id || !post_info.description) {
        alert("Please enter both image link and description before creating a post.");
        return;
      }

      try{
        const post_result = await axios.post("http://localhost:3000/Posts/addpost",post_info)
        console.log(post_result)

        const result = await axios.get("http://localhost:3000/Posts/getposts")

         console.log(`get request response ${JSON.stringify(result)}`)

         renderPosts(result.data.data)
      }
      catch(error){
        console.log(error)
      }
      
      
    });

    async function sendComment(index, input) {
      const comment = input.value.trim();
      if (!comment) return; // ignore empty comments

      console.log("comment:", comment);
      console.log("post index:", index);

      // clear input
      input.value = '';

     
      const commentP = document.createElement('p');
      commentP.textContent = `anonymous: ${comment}`;
      index.appendChild(commentP);

      
    }

    function renderPosts(posts) {
      const postsDiv = document.getElementById('posts');
      postsDiv.innerHTML = '';

      posts.forEach((post, i) => {
        const div = document.createElement('div');
        div.className = 'post';

        div.innerHTML = `
          <div id="posttemp-${i}">

          <img src="${post.link_id}" alt="Post image" />
          <p>${post.description}</p>
          
          <input type="text" placeholder="Write a comment..." id="comment-${i}" />
          <button onclick="sendComment(document.getElementById('posttemp-${i}'), document.getElementById('comment-${i}'))">Send</button>
          </div>
        `;

        postsDiv.appendChild(div);
      });
    }
     //https://picsum.photos/images