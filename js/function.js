"use strict";

// functions
/*------------ save and get localStorage--------------*/
const saveStorage = function (data, type) {
  type == "story"
    ? localStorage.setItem("story", JSON.stringify(data))
    : localStorage.setItem("posts", JSON.stringify(data));
};
const getStorage = function (type) {
  // check if type=post return post info else story info
  return type == "story"
    ? localStorage.getItem("story") !== null
      ? JSON.parse(localStorage.getItem("story"))
      : []
    : localStorage.getItem("posts") !== null
      ? JSON.parse(localStorage.getItem("posts"))
      : [];
};
// save and get background mode (light mode or dark mode)
const saveStorageBackMode = function (data) {
  localStorage.setItem("mode", JSON.stringify(data));
};
const getStorageBackMode = function () {
  return localStorage.getItem("mode") !== null
    ? JSON.parse(localStorage.getItem("mode"))
    : false;
};
// save and get profile
const saveStorageProfile = function (data) {
  localStorage.setItem("profile", JSON.stringify(data));
};
const getStorageProfile = function () {
  return localStorage.getItem("profile") !== null
    ? JSON.parse(localStorage.getItem("profile"))
    : [];
};
/*--------------- find item -----------------------*/
const findItem = function (arr, id) {
  return arr.find((item) => item.id == id);
};
const filterItem = function (arr, id) {
  return arr.filter((item) => item.id == id);
};
/*------------- show and close modal------------------*/
const displayModal = function (modalName) {
  backDrop.classList.add("show");
  modalName.classList.add("active");
};
const closeModal = function () {
  modalAddStory.classList.remove("active");
  modalStory.classList.remove("active");
  modalAddPost.classList.remove("active");
  modalPostInfo.classList.remove("active");
  modalCapture.classList.remove("active");
  modalSetting.classList.remove("active");

  if (profile.length > 0) {
    backDrop.classList.remove("show");
    modalLogin.classList.remove("active");
  }
  // empty input
  backDrop.classList.remove("show");
  inputMentionStory.value = inputTagStory.value = inputCaptionStory.value = "";
  inputCaptionPost.value = inputTagPost.value = inputMentionPost.value = "";
  inputAddComment.value = "";
  uploadImageOutput.style.display = "none";
  btnUploadFile.style.display = "flex";
  uploadImagePostOutput.style.display = "none";
  btnUploadPostFile.style.display = "flex";

  // when close modal load again posts array show number of comment
  displayPost(account1.posts);
  // when load post check them dark post color==black else post color==white
  backMode(isCheck);
  slide = 0;
};
/*------- check info data---------*/
const checkInfoStory = function (
  uploadImageOutput,
  captionStory,
  mentionStory,
  tagStory
) {
  // check input whent not empty =>data push in accont obect
  if (
    uploadImageOutput == null ||
    captionStory == "" ||
    mentionStory == "" ||
    tagStory == ""
  ) {
    alert("fill the field");
  } else {
    account1.story.push({
      imgStory: uploadImageOutput.getAttribute("src"),
      caption: captionStory,
      mention: mentionStory,
      tag: tagStory,
    });
    saveStorage(account1.story, "story");

    // after 500 mili second close modal
    setTimeout(() => {
      closeModal();
    }, 500);
  }
};
const checkInfoPost = function (
  uploadImagePostOutput,
  captionPost,
  mentionPost,
  tagPost
) {
  // check input whent not empty =>data push in accont obect
  if (uploadImagePostOutput == null) {
    alert("fill the field");
  } else {
    account1.posts.push({
      id: uuidv4(),
      postItem: uploadImagePostOutput.getAttribute("src"),
      captionPost: captionPost,
      mention: mentionPost,
      tag: tagPost,
      like: false,
      comment: [],
      likeNumber: 0,
      dateCreate: moment().format(),
    });
    saveStorage(account1.posts, "posts");

    // after 500 mili second close modal
    setTimeout(() => {
      closeModal();
    }, 500);
  }
};
/*-------------------- show story -------------------*/
const displayStory = function (stories, slide = 0) {
  if (stories.length > 0) {
    if (stories.length > 1) {
      btnForwardStory.classList.add("active");
      btnBackwardStory.classList.add("active");
    }
    btnShowModalAddStory.removeEventListener("click", displayModal);

    // show modal story
    // itemStory.addEventListener("click", (e) => {
    //   modalAddStory.classList.remove("active");
    //   displayModal(modalStory);
    // });
    itemStory.classList.remove("empty");
    let slideStory = stories.filter((value, index, array) => index == slide);

    contantStory.innerHTML = ``;

    slideStory.forEach((story, i, arr) => {
      const htmlEl = document.createElement("div");
      htmlEl.innerHTML = `
     
        <!-- img story -->
        <div class="main">

        </div>

        <!-- info -->
        <div class="info-story">
          <div class="caption-story">
            <p class="t-caption">
              ${story.caption !== null ? story.caption : ""}
            </p>
          </div>
          <div class="tag-story">${story.tag !== null ? `# ${story.tag}` : ""
        }</div>
          <div class="mention-story">
          <a href="https://www.instagram.com/${story.mention}" target="_blank">
          ${story.mention !== null ? `@ ${story.mention}` : ""}
          </a></div>
        </div>
        `;

      const img = document.createElement("img");
      img.src = story.imgStory;
      htmlEl.querySelector(".main").appendChild(img);

      contantStory.appendChild(htmlEl);
    });

    progContainer.innerHTML = "";
    const allProgrss = [];

    stories.map((item, i) => {
      const progress = document.createElement("progress");
      progress.setAttribute("max", "100");
      progress.setAttribute("min", "0");
      progress.setAttribute("value", "0");
      progress.setAttribute("data-id", i);

      progContainer.appendChild(progress);
      allProgrss.push(progress);
    });



    progressTime(allProgrss, slide);
  } else {
  }
};

const progressTime = function (arr, slide = 0) {
  let pro = arr.filter((item) => item.getAttribute("data-id") < slide);
  pro.forEach((item) => {
    item.value = 100;
  });
};

/*------------------------post -----------------------*/
const displayPost = function (arr) {
  postContainer.innerHTML = "";
  arr.forEach((item, i, array) => {
    // item
    const divEl = document.createElement("div");
    divEl.className = "post-item";

    divEl.innerHTML = posts(item);
    // like button
    const likeBtn = document.createElement("span");
    likeBtn.innerHTML = `
    <svg
    width="22"
    height="22"
    viewBox="0 0 24 24"
    class="like-ico"
    data-id=${item.id}
    fill=""
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
       data-id= ${item.id}
      class="like-icon"
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M2.92178 12.4462C1.84878 9.09619 3.10378 4.93119 6.62078 3.79919C8.47078 3.20219 10.7538 3.70019 12.0508 5.48919C13.2738 3.63419 15.6228 3.20619 17.4708 3.79919C20.9868 4.93119 22.2488 9.09619 21.1768 12.4462C19.5068 17.7562 13.6798 20.5222 12.0508 20.5222C10.4228 20.5222 4.64778 17.8182 2.92178 12.4462Z"
      stroke="#a4b6e2"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
    data-id=${item.id}
      d="M15.7885 7.56396C16.9955 7.68796 17.7505 8.64496 17.7055 9.98596"
      stroke="#fff"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
    `;
    likeBtn.setAttribute("data-id", item.id);
    item.like == true
      ? likeBtn.querySelector(".like-ico").classList.add("active")
      : likeBtn.querySelector(".like-ico").classList.remove("active");
    divEl.querySelector(".like").insertAdjacentElement("afterbegin", likeBtn);
    const pEl = document.createElement("p");
    pEl.className = "like-number";

    divEl.querySelector(".like").appendChild(pEl);
    pEl.textContent = `${item.like == true ? "1" : "0"}`;
    // when click like btn

    likeClickListner(likeBtn, pEl, arr, item);
    // doubleclick
    listnerDoubleClickLike(divEl, likeBtn, pEl, arr);

    // show mentin
    divEl.querySelector(".mention-item-post").addEventListener("click", (e) => {
      divEl.querySelector(".mention-box").classList.toggle("active");
    });
    // show comment
    const commentBtn = document.createElement("div");
    commentBtn.setAttribute("data-id", item.id);
    commentBtn.className = "bt";
    commentBtn.innerHTML = `
         <svg
            width="21"
            height="21"
            data-id='${item.id}'
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M15.9393 12.4131H15.9483"
              stroke="#a4b6e2"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M11.9303 12.4131H11.9393"
              stroke="#a4b6e2"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M7.92128 12.4131H7.93028"
              stroke="#a4b6e2"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M19.071 19.0698C16.0159 22.1264 11.4896 22.7867 7.78631 21.074C7.23961 20.8539 3.70113 21.8339 2.93334 21.067C2.16555 20.2991 3.14639 16.7601 2.92631 16.2134C1.21285 12.5106 1.87411 7.9826 4.9302 4.9271C8.83147 1.0243 15.1698 1.0243 19.071 4.9271C22.9803 8.83593 22.9723 15.1681 19.071 19.0698Z"
              stroke="#a4b6e2"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>

         
    `;
    const txtComment = document.createElement("p");
    txtComment.textContent = `${item.comment.length}`;
    // when click comment btn

    commentBtn.addEventListener("click", (e) => {
      let idEl = e.target.dataset.id;
      let findedArr = findItem(arr, idEl);
      postInfo(findedArr);
      btnAddComment.setAttribute("data-id", findedArr.id);
      displayModal(modalPostInfo);

      addComment(findedArr.comment, txtComment);
    });
    divEl.querySelector(".comment").appendChild(commentBtn);
    divEl.querySelector(".comment").appendChild(txtComment);

    postContainer.insertAdjacentElement("afterbegin", divEl);
  });
};

/*------------------- show post modal ----------------------*/
const pushPostInfo = function (arr, commentInfo, user, prof) {
  arr.comment.push({
    text: commentInfo,
    author: user,
    date: moment().format(),
    profileImg:account1.profile?.profImg,
  });
  saveStorage(account1.posts, "posts");
  addComment(arr.comment);
};
const postInfo = function (arr) {
  if (arr !== undefined) {
    imgPostInfo.src = `${arr.postItem}`;
    disPost.textContent = `${arr.captionPost}`;
    tagPost.textContent = `${arr.tag}`;
  }
};
const addComment = function (arr, txt = null) {
  if (arr !== undefined) {
    let html = ``;
    commentContainer.innerHTML = "";
    arr.forEach((item) => {
      html = `
      <div class="comment">
      <div class="img-comment">
        <img src="${item.profileImg}" alt="profile" />
      </div>
      <div class="box-comment">
        <p class="profile-comment">${item.author}</p>
          <div class="i--info">
          <p class="comment-dis">
          ${item.text}
        </p>
  
        <p class="date">${moment(item.date).locale("en").fromNow()}</p>
          </div>
      </div>
    </div>
      
      `;
      commentContainer.insertAdjacentHTML("afterbegin", html);
    });
  }
};
/*-------------------- share webcam or screen ----------------*/
// share screen
const shareScreen = async function () {
  var displayMediaOptions = {
    video: {
      cursor: "always",
    },
    audio: {
      echoCancellation: true,
      noiseSuppression: true,
      sampleRate: 44100,
    },
  };
  try {
    cpture = await navigator.mediaDevices.getDisplayMedia(displayMediaOptions);
    liveVideo.srcObject = cpture;
  } catch (err) {
    alert("for use screen you shold allowed permision");
  }
};

// share webcam
const shareWebcam = function () {
  let option = {
    video: true,
    audio: true,
  };
  navigator.mediaDevices
    .getUserMedia(option)
    .then((stream) => {
      liveVideo.srcObject = stream;
    })
    .catch((e) => {
      alert("for use screen you shold allowed permision");
    });
};

/*----------------------------- dark or light mode----------------*/
const backMode = function (check) {
  modeTitle.innerHTML = `${check == true ? "night" : "light"}`;
  if (check) {
    document.body.classList.add("dark");

    leftSide.classList.add("dark");
    h2El.classList.add("night");
    header.classList.add("night");
    headerDirect.classList.add("night");
    pinnedMessage.classList.add("night");
    mainPost.classList.add("night");
    arrElement.forEach((item) => {
      item.forEach((el) => {
        el.classList.add("night");
      });
    });

    directContainer.classList.add("night");
    liveContainer.classList.add("night");
    document.querySelector(".btn-upload-post span").classList.add("night");
    inputCaptionPost.classList.add("night");

    document.querySelectorAll(".post-item").forEach((item) => {
      item.classList.add("night");
    });
  } else {
    document.body.classList.remove("dark");
    leftSide.classList.remove("dark");
    h2El.classList.remove("night");
    header.classList.remove("night");
    headerDirect.classList.remove("night");
    pinnedMessage.classList.remove("night");
    mainPost.classList.remove("night");
    arrElement.forEach((item) => {
      item.forEach((el) => {
        el.classList.remove("night");
      });
    });

    directContainer.classList.remove("night");
    liveContainer.classList.remove("night");
    document.querySelector(".btn-upload-post span").classList.remove("night");
    inputCaptionPost.classList.remove("night");
    document.querySelectorAll(".post-item").forEach((item) => {
      item.classList.remove("night");
    });
  }
};
/*-----------------post item------------------------*/
const posts = function (item) {
  return `
 
  <div class="p-sub-item">
    <img
      class="img-post"
      src="${item.postItem}"
      alt="post"
    />
     
    <div class="like-container" data-id=${item.id}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="heart"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fill-rule="evenodd"
          d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
          clip-rule="evenodd"
        />
      </svg>
    </div>

    <div class="mention-item-post" data-id='${item.id}' style=${item.mention == "" ? "display:none" : "display:grid"
    }>
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M11.8445 21.6618C8.15273 21.6618 5 21.0873 5 18.7865C5 16.4858 8.13273 14.3618 11.8445 14.3618C15.5364 14.3618 18.6891 16.4652 18.6891 18.766C18.6891 21.0658 15.5564 21.6618 11.8445 21.6618Z" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        <path fill-rule="evenodd" clip-rule="evenodd" d="M11.8373 11.1735C14.26 11.1735 16.2237 9.2099 16.2237 6.78718C16.2237 4.36445 14.26 2.3999 11.8373 2.3999C9.41457 2.3999 7.45002 4.36445 7.45002 6.78718C7.44184 9.20172 9.39184 11.1654 11.8064 11.1735C11.8173 11.1735 11.8273 11.1735 11.8373 11.1735Z" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <div class="mention-box">
          <a href=${item.mention} target="_blank">${item.mention}</a>
        </div>
    </div>
  </div>
  <div class="info-post">
    <div class="right-post">
      <img src="${account1.profile[0]?.profImg}" alt="prof" />
      <p class="profile-post">${account1.profile[0]?.username}</p>
    </div>
    <div class="left-post">
      <div class="like">
         
        
      </div>
      <div class="comment" data-id='${item.id}'>
        
      </div>
    </div>
  </div>

  
  `;
};
// when double click on the post
const listnerDoubleClickLike = function (el, likeBtn, txt, arr) {
  el.querySelector(".like-container").addEventListener("dblclick", (e) => {
    // get id
    let id = e.target.dataset.id;

    // find item by id
    const findedArray = findItem(arr, id);
    // like if is false=>true else true
    findedArray.like = true;

    // show big like
    e.target.classList.add("active");
    // hidden big like after 1second
    setTimeout(() => {
      e.target.classList.remove("active");
    }, 1000);

    // check like is true or not
    if (findedArray.like == true) {
      likeBtn.querySelector(".like-ico").classList.add("active");
      findedArray.likeNumber = findedArray.likeNumber + 0;
      txt.textContent = "1";
    } else {
      likeBtn.querySelector(".like-ico").classList.remove("active");

      txt.textContent = "0";
    }
    findedArray.likeNumber = findedArray.likeNumber + 1;
    // save storage
    saveStorage(account1.posts, "posts");
  });
};

// when click like
const likeClickListner = function (likeBtn, txt, arr, item) {
  // when click like btn
  likeBtn.addEventListener("click", (e) => {
    const idEl = e.target.dataset.id;
    let findedArr = findItem(arr, idEl);

    findedArr.like = findedArr.like == true ? false : true;
    if (findedArr.like == true) {
      likeBtn.querySelector(".like-ico").classList.add("active");
      findedArr.likeNumber = findedArr.likeNumber + 1;
    } else {
      likeBtn.querySelector(".like-ico").classList.remove("active");
      findedArr.likeNumber = findedArr.likeNumber - 1;
    }
    saveStorage(account1.posts, "posts");
    txt.textContent = `${item.like == true ? "1" : "0"}`;
  });
};

/*---------------------- comment live ---------------------*/

const displayCommentLive = function (arr, isCheck = false) {
  commentContainerLive.innerHTML = "";
  arr.forEach((item) => {
    const html = document.createElement("div");
    // set to dark mode container
    html.classList.add(
      "c-box-live",
      `${isCheck == true ? "night" : html.classList.remove("night")}`
    );
    html.innerHTML = `  

    <div class="img-border">
      <img src="${account1.profile[0]?.profImg}" />
    </div>
    <div class="info-comment">
      <div class="row">
        <p class="user-name ${isCheck == true ? "night" : ""}">${account1.profile[0]?.username
      }</p>
        <p class="pin-btn " data-id=${item.id
      }><i class="fas fa-thumbtack"></i></p>
        
      </div>
      <p class="comment ${isCheck == true ? "night" : ""}">
       ${item.comment}
      </p>
    </div>
  `;

    commentContainerLive.insertAdjacentElement("afterbegin", html);
  });
};
