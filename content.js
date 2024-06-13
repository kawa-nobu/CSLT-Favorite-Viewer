document.head.insertAdjacentHTML("beforeend", `<style>
    .fv_jump_wrap{
        display: flex;
        justify-content: center;
        align-items: center;
        width: 34px;
        height: 34px;
        margin: 0 12px 12px 8px;
        border-radius: 100px;
        border: rgb(207, 217, 222) 1px solid;
    }
    .fv_jump_wrap a{
        width: 75%;
        height: 75%;
    }
    .fv_jump_icon{
        background: url(${chrome.runtime.getURL("favorite.svg")});
        filter: brightness(0) saturate(100%) invert(6%) sepia(5%) saturate(3037%) hue-rotate(169deg) brightness(94%) contrast(96%);
        background-repeat: no-repeat;
        background-position: center;
        width: 100%;
        height: 100%;
    }
    .fv_jump_wrap:hover{
        background: #00000014;
        filter: brightness(0) saturate(100%) invert(85%) sepia(15%) saturate(2820%) hue-rotate(325deg) brightness(101%) contrast(107%);
    }
    .fv_jump_icon:hover{
        
    }
    </style>`
);
let old_user_id = null;
function main_func(){
    const jump_btn = document.getElementById("fv_jump_btn");
    if(is_userpage && document.querySelector('[data-testid="UserProfileSchema-test"]')?.textContent != null){
        const user_id = JSON.parse(document.querySelector('[data-testid="UserProfileSchema-test"]')?.textContent);
        if(document.querySelector('a[href="/settings/profile"][data-testid="editProfileButton"]')== null){
            if(user_id != null && user_id.author.identifier != old_user_id){
                //console.log(user_id.author.identifier)
                if(jump_btn == null && document.querySelector('button[data-testid="userActions"][aria-haspopup="menu"][role="button"]') != null){
                    document.querySelector('button[data-testid="userActions"][aria-haspopup="menu"][role="button"]').insertAdjacentHTML("beforebegin", `<div id="fv_jump_btn" class="fv_jump_wrap"></div>`);
                }
    
                if(document.querySelector('button[data-testid="userActions"][aria-haspopup="menu"][role="button"]') != null){
                    document.getElementById("fv_jump_btn").textContent = "";
                    document.getElementById("fv_jump_btn").insertAdjacentHTML("afterbegin", `<a  href="${chrome.runtime.getURL("get_favorite.html")}?user_id=${user_id.author.identifier}" target="_blank"><div class="fv_jump_icon"></div></a>`);
                    old_user_id = user_id.author.identifier;
                }
            }
        }else{
            if(document.getElementById("fv_jump_btn") != null){
                document.getElementById("fv_jump_btn").remove()
            }
        }
    }
}
function is_userpage(){
    if(document.querySelector('div[data-testid="UserName"]') != null){
        return true;
    }else{
        return false;
    }
}
const observer = new MutationObserver(main_func);
observer.observe(document.getElementById("react-root"),{
    childList: true,
    attributes: true,
    characterData: true,
    subtree: true,
    attributeOldValue: true,
    characterDataOldValue: true
});
/*function ct0_token_get(host_mode){
    return new Promise((resolve)=>{
        const is_private_mode = chrome.extension.inIncognitoContext;
        if(is_private_mode){
            const doc_cookie_ct0 = document.cookie.match(/(?<=ct0=)(.*?)(?=;)/g);
            resolve(doc_cookie_ct0);
        }else{
            chrome.runtime.sendMessage({message: {mode:"ct0_token_get", target:{target_host_mode:host_mode}}}, (response) => {
                resolve(response);
            });
        }
    })
}
function get_api(host_mode){
    return new Promise((resolve)=>{
        const is_private_mode = chrome.extension.inIncognitoContext;
        if(is_private_mode){
            const doc_cookie_ct0 = document.cookie.match(/(?<=ct0=)(.*?)(?=;)/g);
            resolve(doc_cookie_ct0);
        }else{
            chrome.runtime.sendMessage({message: {mode:"ct0_token_get", target:{target_host_mode:host_mode}}}, (response) => {
                resolve(response);
            });
        }
    })
}*/