let btn=document.querySelector("button");
let url2 = "https://dog.ceo/api/breeds/imge/random";

btn.addEventListener("click" , async ()=>{
    let link =await getfact();
   
    
    let img=document.querySelector("#result");
    img.setAttribute("src", link);  
});


async function getfact(){
    try{
        let response = await axios.get(url2);
        return response.data.message;
    }catch(e){
        console.log(e);
        return "no result is found";
    
}
}