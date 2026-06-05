
let itemCount=0;
function openSidebar(){document.getElementById("mobileSidebar").classList.add("active");document.getElementById("sidebarOverlay").classList.add("active");document.body.style.overflow="hidden"}
function closeSidebar(){document.getElementById("mobileSidebar").classList.remove("active");document.getElementById("sidebarOverlay").classList.remove("active");document.body.style.overflow=""}
function tambahItem(){
itemCount++;
const wrapper=document.getElementById("items");
const item=document.createElement("div");
item.className="mix-item";
item.innerHTML=`<div class="mix-item-header"><h3>Bidang / Produk ${itemCount}</h3><button type="button" onclick="hapusItem(this)">Hapus</button></div><div class="mix-grid"><div><label>Pilih Produk</label><select class="produk"><option value="wpc">WPC</option><option value="wpc30">WPC 30cm</option><option value="wallboard40">WALLBOARD 40cm</option><option value="wallboard60">WALLBOARD 60cm</option><option value="uvmarble">UV MARBLE</option><option value="vinyl">VINYL LANTAI</option><option value="spc">SPC LANTAI</option><option value="wallpaper">WALLPAPER</option></select></div><div><label>Panjang bidang (meter)</label><input class="panjang" type="number" step="0.01" placeholder="Contoh: 3"></div><div><label>Tinggi / Lebar bidang (meter)</label><input class="tinggi" type="number" step="0.01" placeholder="Contoh: 2.8"></div></div>`;
wrapper.appendChild(item);
}
function hapusItem(button){button.closest(".mix-item").remove()}
function dataProduk(value){return {
wpc:{nama:"WPC",satuan:"lembar",luasPerItem:0.16*2.9,ket:"16cm × 290cm per lembar"},
wpc30:{nama:"WPC 30cm",satuan:"lembar",luasPerItem:0.30*2.9,ket:"30cm × 290cm per lembar"},
wallboard40:{nama:"WALLBOARD 40cm",satuan:"lembar",luasPerItem:0.40*2.9,ket:"40cm × 290cm per lembar"},
wallboard60:{nama:"WALLBOARD 60cm",satuan:"lembar",luasPerItem:0.60*2.9,ket:"60cm × 290cm per lembar"},
uvmarble:{nama:"UV MARBLE",satuan:"lembar",luasPerItem:1.20*2.9,ket:"120cm × 290cm per lembar"},
vinyl:{nama:"VINYL LANTAI",satuan:"box",luasPerItem:3.3,ket:"3,3m² per box"},
spc:{nama:"SPC LANTAI",satuan:"box",luasPerItem:2.2,ket:"2,2m² per box"},
wallpaper:{nama:"WALLPAPER",satuan:"roll",luasPerItem:5,ket:"5m² per roll"}
}[value]}
function hitungSemua(){
const items=document.querySelectorAll(".mix-item");const hasil=document.getElementById("hasil");
if(items.length===0){hasil.innerHTML="<h2>Hasil Perhitungan</h2><p>Tambahkan minimal 1 produk / bidang terlebih dahulu.</p>";return}
let totalLuas=0;let ringkasan={};let detailHTML="";
items.forEach((item,index)=>{const produkValue=item.querySelector(".produk").value;const panjang=parseFloat(item.querySelector(".panjang").value);const tinggi=parseFloat(item.querySelector(".tinggi").value);const data=dataProduk(produkValue);if(!panjang||!tinggi||panjang<=0||tinggi<=0)return;const luas=panjang*tinggi;const kebutuhan=Math.ceil(luas/data.luasPerItem);totalLuas+=luas;const key=data.nama+" "+data.satuan;if(!ringkasan[key])ringkasan[key]={nama:data.nama,satuan:data.satuan,total:0,ket:data.ket};ringkasan[key].total+=kebutuhan;detailHTML+=`<div class="detail-row"><strong>Bidang ${index+1}: ${data.nama}</strong><br>Ukuran bidang: ${panjang}m × ${tinggi}m = ${luas.toFixed(2)} m²<br>Kebutuhan: ${kebutuhan} ${data.satuan}<br><small>${data.ket}</small></div>`});
if(totalLuas===0){hasil.innerHTML="<h2>Hasil Perhitungan</h2><p>Isi ukuran bidang dengan benar.</p>";return}
let ringkasanHTML="";Object.values(ringkasan).forEach(item=>{ringkasanHTML+=`<div class="summary-card"><div class="summary-number">${item.total} ${item.satuan}</div><div>${item.nama}</div><small>${item.ket}</small></div>`});
const pesanWA=encodeURIComponent("Halo Iman Interior, saya ingin konsultasi kebutuhan material mix produk. Total luas: "+totalLuas.toFixed(2)+" m2.");
hasil.innerHTML=`<h2>Hasil Perhitungan</h2><p><strong>Total luas semua bidang:</strong> ${totalLuas.toFixed(2)} m²</p><h3>Ringkasan Kebutuhan</h3><div class="summary-grid">${ringkasanHTML}</div><h3>Detail Per Bidang</h3>${detailHTML}<a class="wa-result" href="https://wa.me/6287710108818?text=${pesanWA}" target="_blank">Konsultasi via WhatsApp</a>`;
}

let catalogImages=[];let currentImageIndex=0;
function setupCatalogSlider(){catalogImages=Array.from(document.querySelectorAll(".catalog-image-card img"));catalogImages.forEach((img,index)=>{img.addEventListener("click",function(){openLightbox(index)})})}
function openLightbox(index){currentImageIndex=index;updateLightboxImage();document.getElementById("lightbox").classList.add("active");document.body.style.overflow="hidden"}
function updateLightboxImage(){const img=document.getElementById("lightboxImage");const counter=document.getElementById("lightboxCounter");if(!catalogImages.length)return;img.src=catalogImages[currentImageIndex].src;counter.textContent=(currentImageIndex+1)+" / "+catalogImages.length}
function closeLightbox(){document.getElementById("lightbox").classList.remove("active");document.getElementById("lightboxImage").src="";document.body.style.overflow=""}
function nextImage(){if(!catalogImages.length)return;currentImageIndex=(currentImageIndex+1)%catalogImages.length;updateLightboxImage()}
function prevImage(){if(!catalogImages.length)return;currentImageIndex=(currentImageIndex-1+catalogImages.length)%catalogImages.length;updateLightboxImage()}
document.addEventListener("keydown",function(e){const lightbox=document.getElementById("lightbox");if(!lightbox||!lightbox.classList.contains("active"))return;if(e.key==="ArrowRight")nextImage();if(e.key==="ArrowLeft")prevImage();if(e.key==="Escape")closeLightbox()});
document.addEventListener("DOMContentLoaded",function(){tambahItem();setupCatalogSlider()});
