function getById(id){
    return document.getElementById(id);
}
function check(kata){
    let soal = getById("soal").value;
    return(soal.includes(kata) ? true : false);
}

function createSoal(){
    let str = "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eveniet, dicta. Voluptate reiciendis cum dicta quod, nam quam doloribus quaerat amet deserunt ullam molestias modi est neque atque quasi eligendi error";
    str = str.split(" ");
    return str;
}

function randomizeSoal(str){
    const panjang = str.length;
    return Math.floor(Math.random()*panjang)
}

let userInput = getById("userInput");
let soals = null;
let soalrandom = [];
let terjawab = 0;
let benar = 0;
let rasio = 0;
let wpm = 0;
let detik = 0;
let count = 0;
function validasi(input){
    if(input==" "){
        return
    } else {
        
        let sama = check(input.trim());
        if(sama){
            getById(terjawab).style.color="green";
            benar++;
        }
    }
    
}

function hapusInsertInputSoal(){
    userInput.value = "";
    getById("soal").value = soalrandom[terjawab];
    getById("soal").style.color="aqua";
    getById(terjawab).style.color="aqua";
}

function akurasi(answered, right){
    rasio = (right/answered)*100;
    return parseFloat(rasio.toFixed(2));
}
function cleanText(text){
    if(text.includes(",") || text.includes(".") || text.includes("?") || text.includes("!")){
        
    }
}
window.addEventListener("load",()=>{
    soals = createSoal();
    let textSoal = getById("soals");
    for(let i=0;i<100;i++){
        let temp = soals[randomizeSoal(soals)];
        soalrandom.push(temp);
        let soaltemp = document.createElement("span");
        if(i==0){
            getById("soal").value = temp;
            soaltemp.style.color="aqua";
        }
        soaltemp.setAttribute("id",i);
        soaltemp.innerText = temp+" ";
        textSoal.append(soaltemp);
    }
    // textSoal.value = textSoal.value.trim(textSoal.value);
});
function waktu(){
    detik++;
    let sisa = 60-detik;
    getById("waktu").innerText="00:"+sisa;
    if(sisa==0){
        wpm = terjawab;
        window.alert("Kecepatan ketik : "+wpm+" WPM. Akurasi akhir yaitu "+akurasi(terjawab,benar)+"%");
        window.location.reload();
    }
}
userInput.addEventListener("input", ()=>{
    count++;
    if(count==1){
        setInterval(waktu, 1000);
    }
    let sama = false;
    let soal = getById("soal");
    let input = userInput.value;
    sama = check(input);
    if(sama){
        soal.style.color="green";
        getById(terjawab).style.color="green";
    } else{
        soal.style.color="red";
        getById(terjawab).style.color="red";
    }
    if(input.length==0){
        soal.style.color="aqua";
        getById(terjawab).style.color="aqua"
    }
    //merefresh input dan soal
    if(input.includes(" ")){
        
        validasi(input);
        terjawab++;
        if(terjawab == soalrandom.length){
            wpm = terjawab;
            window.alert("Kecepatan ketik : "+wpm+" WPM. Akurasi akhir yaitu "+akurasi(terjawab,benar)+"%");
            window.location.reload();
        }
        //console.log("terjawab : "+terjawab+", benar : "+benar);
        getById("terjawab").value = terjawab;
        getById("benar").value = benar;
        let accuracy = akurasi(terjawab, benar);
        getById("akurasi").value = accuracy+"%";
        hapusInsertInputSoal();
    }
    
})

    
    
