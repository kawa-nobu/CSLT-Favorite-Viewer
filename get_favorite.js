window.addEventListener("load", function(){
    const user_id = new URL(window.location.href).searchParams.get("user_id");
    if(user_id != null){
        chrome.runtime.sendMessage({message: {mode:"get_api", target:{target_host_mode:"x.com", user_id: user_id}}}, (response) => {
            console.log(response)
            document.getElementById("dsp_user_id").textContent = user_id;
            document.getElementById("dsp_tweet_length").textContent = response.length;
            for (let api_index = 0; api_index < response.length; api_index++) {
                let media_element = "";
                const tweet_date = new Date(response[api_index].created_at);
                //Media
                if(response[api_index].extended_entities?.media != undefined){
                    const media_array = response[api_index].extended_entities.media;
                    for (let index = 0; index < media_array.length; index++) {
                        if(media_array[index].type == "photo"){
                            media_element += `<img class="tweet_media_content" src="${media_array[index].media_url_https}"></img>`;
                        }
                        if(media_array[index].type == "video"){
                            media_element += `<video class="tweet_profile_video tweet_media_content" src="${media_array[index].video_info.variants[0].url
                            }" poster="${media_array[index].media_url_https}" controls></video>`;
                        }
                    }
                }
                document.getElementById("output_area").insertAdjacentHTML("beforeend", `
                    <div class="tweet_wrap">
                    <div class="tweet_user">
                        <img class="tweet_profile_image" src="${response[api_index].user.profile_image_url_https}"></img>
                        <span><a href="https://x.com/${response[api_index].user.screen_name}" target="_blank" rel="noopener noreferrer" title="ユーザーを開く">${response[api_index].user.name}</a></span>
                    </div>
                    <div class="tweet_text">${response[api_index].text.replaceAll("\n", "<br>")}</div>
                    <div class="tweet_source"><span>${tweet_date.toLocaleDateString('sv-SE').replaceAll("-", "/")} ${tweet_date.toLocaleTimeString('ja-JP', {hour12:false})}</span><br>${response[api_index].source}</div>
                    <div class="tweet_media">${media_element}</div>
                    <div class="tweet_infomation"><span>&#x1f501;${response[api_index].retweet_count}</span><span>&#x2b50;${response[api_index].favorite_count}</span></div>
                    <div class="tweet_open"><a href="https://x.com/${response[api_index].user.screen_name}/status/${response[api_index].id_str}" target="_blank" rel="noopener noreferrer">ツイートを開く</a></div>
                    </div>`)
            }
        });
    }else{
        this.alert("ユーザーIDのパラメータがありません");
    }
})