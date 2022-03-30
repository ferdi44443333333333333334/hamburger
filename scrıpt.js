let cocukburger=["kola","7","patates","10","tavukburger","20"];
let kralmenu=["büyükboykola","13","uzunpatates","15","köfteburger","29"];
let bigking=["büyükboykola","13","ekstrauzunpatates","20","çiftburger","40","ketçap ekstra","3"];


let i;

let urunAciklama,urunSecenek;


let eklenecekler=[];
let fiyatlar=[];


let listeSepet=document.getElementById("sepetMarket");


let toplamTutar=0;


const kod="PROMO10";

for(i=0;i<document.getElementsByName("kategori").length;i++)
{
    document.getElementsByName("kategori")[i].addEventListener("change",urunleriGetir);
}   


function olustur(){
    urunAciklama=document.createElement("label");
    urunSecenek=document.createElement("input");
    document.getElementById("urunPanel").appendChild(urunAciklama);
    document.getElementById("urunPanel").appendChild(urunSecenek);
    urunSecenek.type="checkbox";
    urunSecenek.setAttribute("name","urunler");
    urunAciklama.setAttribute("for","urunler");
    urunAciklama.setAttribute("class","urunler");
}


function urunleriGetir(){
   
    const silinecekler = document.getElementById("urunPanel");
    while (silinecekler.hasChildNodes()) {
      silinecekler.removeChild(silinecekler.firstChild);
    }

    if(document.getElementById("kategoricocukmenu").checked)
    {
        for(i=0;i<cocukburger.length;i=i+2)
        {
            olustur();
            urunSecenek.value=cocukburger[i+1];
            urunAciklama.innerHTML=cocukburger[i]; 
        }
    }
    else if(document.getElementById("kategorikralmenu").checked)
    {
        for(i=0;i<kralmenu.length;i=i+2)
        {
        olustur();
        urunSecenek.value=kralmenu[i+1];
        urunAciklama.innerHTML=kralmenu[i];
        }
    }
    else if(document.getElementById("kategoribigkingmenu").checked)
    {
        for(i=0;i<bigking.length;i=i+2)
        {
        olustur();
        urunSecenek.value=bigking[i+1];
        urunAciklama.innerHTML=bigking[i];
        }
    }
}

function sepeteEkle(){
  
    const listeUrunlerFiyat=document.getElementsByName("urunler");
    const listeUrunlerAd=document.getElementsByClassName("urunler");


    let adet=document.getElementById("urunAdet").value;

 
        eklenecekler=[];
        fiyatlar=[];

       
        for(i=0;i<listeUrunlerFiyat.length;i++){
            if(listeUrunlerFiyat[i].checked){
            
                toplamTutar+=(Number(listeUrunlerFiyat[i].value)*adet);
                eklenecekler.push(listeUrunlerAd[i].innerHTML);
                fiyatlar.push(listeUrunlerFiyat[i].value);
            }
        }

   
        console.log(eklenecekler);
        console.log(fiyatlar);


  
    for(i=0;i<adet;i++)
    {
        let sepeteEklenecekUrun;
      
        for(let j=0;j<eklenecekler.length;j++){
            sepeteEklenecekUrun=document.createElement("option");
            listeSepet.options.add(sepeteEklenecekUrun);
            
            sepeteEklenecekUrun.text=eklenecekler[j];
            sepeteEklenecekUrun.value=fiyatlar[j];
        }
        
    }

   
    document.getElementById("sepetTutar").innerHTML=toplamTutar+" TL";
}


function sepettenCikar(){
  
    let seciliIndeks=listeSepet.selectedIndex;
    let silinecekUrununFiyati=listeSepet.options[seciliIndeks].value;
    listeSepet.options.remove(seciliIndeks);

    toplamTutar=toplamTutar-silinecekUrununFiyati;
    document.getElementById("sepetTutar").innerHTML=toplamTutar+" TL";
}


function sepetiBosalt(){
    document.querySelectorAll('#sepetMarket option').forEach(eleman => eleman.remove());
    toplamTutar=0;
    document.getElementById("sepetTutar").innerHTML=toplamTutar+" TL";

}


function koduEkle(){
    let girilenKod=document.getElementById("txtIndirim").value;
    if(girilenKod == kod)
    {
        if(toplamTutar>=50)
        {
            toplamTutar=toplamTutar-10;
            
            document.getElementById("sepetTutar").innerHTML=toplamTutar+" TL";
            document.getElementById("sonuc").innerHTML="İndirim uygulandı.";
            document.getElementById("txtIndirim").disabled=true;
            document.getElementById("txtIndirim").value="";
        }
        else{
            document.getElementById("sonuc").innerHTML="Girdiğiniz kod için minimum sepet tutarı 50 TL olmalıdır!";
        }
    }
    else{
        document.getElementById("sonuc").innerHTML="Geçerli bir kod girmediniz!";
    }
}