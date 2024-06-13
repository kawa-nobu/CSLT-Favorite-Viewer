chrome.runtime.onMessage.addListener((request, sender, sendResponse)=>{
    get_data(request).then((res)=>{
        sendResponse(res);
    });
    return true;
});
async function get_data(request){
    let access_host = "x.com";
    if(request.message.target.target_host_mode == "twitter.com"){
        access_host = "twitter.com";
    }
    switch (request.message.mode){
        case "get_api":
            return new Promise((resolve)=>{
                get_token(access_host).then((token)=>{
                    //console.log(token)
                    fetch(`https://api.${access_host}/1.1/favorites/list.json?count=1000&user_id=${request.message.target.user_id}`, {
                        "headers": {
                            "authorization": "Bearer AAAAAAAAAAAAAAAAAAAAAMupswEAAAAANC5Yk%2FHGiZmGDRV3EhXMBO3uX08%3DEwAT9YySxXZXGrYScXeoKUaeyqXQFeNVWUW4SaZUvtegCUVjIi",
                            "x-csrf-token": token.ct0,
                            "cookie":`auth_token=${token.auth_token}; ct0=${token.ct0};`
                            },
                            "referrer": `https://${access_host}/home`,
                            "method": "GET",
                            "credentials": "include"
                        }).then(response => {
                            if (!response.ok) {
                                resolve({type:"err", url:null});
                            }else{
                                return response.json();
                            }
                    }).then(json => {
                        //console.log(json)
                        resolve(json);
                    });
                });
            });
        default:
            break;
    }
}
async function get_token(host_mode){
    return new Promise((resolve)=>{
        let token = new Object();
        chrome.cookies.get({url:`https://${host_mode}/`, name:'ct0'}, function(ct0_cookies){
            token.ct0 = ct0_cookies.value;
            chrome.cookies.get({url:`https://${host_mode}/`, name:'auth_token'}, function(auth_token_cookies){
                token.auth_token = auth_token_cookies.value;
                resolve(token);
            });
        });
        
    });
}