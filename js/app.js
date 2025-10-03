// =============================================
// JAVASCRIPT
// =============================================



// 1. LISTA E PLOTË E USHQIMEVE
const ushqimet = [
  {
    id: 1,
    emri: "Sallat Greke",
    cmimi: "450 Lek",
    kategoria: "fillestar",
    pershkrimi: "Domate, tranguj, speca, qepë, ullinj, djathë feta dhe vaj uthull",
    foto: "🍅"
  },
  {
    id: 2,
    emri: "Brusketa me Domate",
    cmimi: "350 Lek",
    kategoria: "fillestar",
    pershkrimi: "Buka e freskët e pjekur me hudhër, domate të freskëta dhe basilik",
    foto: "🍞"
  },
  {
    id: 3,
    emri: "Biftek me Salc",
    cmimi: "1800 Lek",
    kategoria: "kryesor",
    pershkrimi: "Biftek i përsosur dhe perime të pjekura",
    foto: "🥩"
  },
  {
    id: 4,
    emri: "Pasta Carbonara",
    cmimi: "850 Lek",
    kategoria: "kryesor",
    pershkrimi: "Pasta tradicionale italiane me salcë kremoze, pancetta dhe djathë parmesan",
    foto: "🍝"
  },
  {
    id: 5,
    emri: "Pule me Limon dhe Hudher",
    cmimi: "950 Lek",
    kategoria: "kryesor",
    pershkrimi: "Fileto pule me salcë limoni dhe hudhër, të servuara me oriz të egër",
    foto: "🍗"
  },
  {
    id: 6,
    emri: "Tiramisu",
    cmimi: "450 Lekë",
    kategoria: "embelsire",
    pershkrimi: "Ëmbëlsirë klasike italiane me kafe, mascarpone dhe kakao",
    foto: "🍰"
  },
  {
    id: 7,
    emri: "Cokollat e Shkrir",
    cmimi: "550 Lek",
    kategoria: "embelsire",
    pershkrimi: "Çokoçola e shkrirë me akullore vanilje dhe fruta të freskëta",
    foto: "🍫"
  }
];



// 2. FUNKSIONI KRYESOR PËR TË SHFAQUR MENUN
function tregoMenu(kategoria = 'teGjitha') {


  const vendiPerMenu = document.getElementById('menuItems');

  if (!vendiPerMenu) {
    console.error(" Elementi 'menuItems' nuk u gjet!");
    alert("Gabim: Elementi i menusë nuk u gjet!");
    return;
  }

  // Pastro menunë ekzistuese
  vendiPerMenu.innerHTML = '';

  // Filtro ushqimet sipas kategorisë
  let ushqimetPerTuShfaqur;

  switch(kategoria) {
    case 'fillestar':
      ushqimetPerTuShfaqur = ushqimet.filter(ushqimi => ushqimi.kategoria === 'fillestar');
      break;
    case 'kryesor':
      ushqimetPerTuShfaqur = ushqimet.filter(ushqimi => ushqimi.kategoria === 'kryesor');
      break;
    case 'embelsire':
      ushqimetPerTuShfaqur = ushqimet.filter(ushqimi => ushqimi.kategoria === 'embelsire');
      break;
    default:
      ushqimetPerTuShfaqur = ushqimet;
  }



  // Nëse nuk ka ushqime për këtë kategori
  if (ushqimetPerTuShfaqur.length === 0) {
    vendiPerMenu.innerHTML = '<p style="text-align: center; grid-column: 1/-1;">Nuk ka ushqime në këtë kategori momentalisht.</p>';
    return;
  }

  // Krijo elementet për çdo ushqim
  ushqimetPerTuShfaqur.forEach(ushqimi => {
    const kutiaEUshqimit = document.createElement('div');
    kutiaEUshqimit.className = 'menu-item';
    kutiaEUshqimit.innerHTML = `
            <div style="font-size: 40px; text-align: center; margin-bottom: 10px;">${ushqimi.foto}</div>
            <h3>${ushqimi.emri} <span class="price">${ushqimi.cmimi}</span></h3>
            <p>${ushqimi.pershkrimi}</p>
        `;

    vendiPerMenu.appendChild(kutiaEUshqimit);
  });


}

// 3. FUNKSIONI PËR TË NDRYSHUAR BUTONIN AKTIV
function ndryshoButoninAktiv(idButoni) {
  console.log(`🔘 Duke ndryshuar butonin aktiv në: ${idButoni}`);

  const butonat = document.querySelectorAll('.category-btn');
  butonat.forEach(butoni => {
    butoni.classList.remove('active');
  });

  const butoniAktiv = document.getElementById(idButoni);
  if (butoniAktiv) {
    butoniAktiv.classList.add('active');
  } else {
    console.error(` Butoni ${idButoni} nuk u gjet`);
  }
}

// 4. FUNKSIONI PËR TË DËRGUAR REZERVIMIN ME EMAIL
function dergoRezerviminNeEmail(teDhenat) {


  // Kjo është një simulim i dërgimit të email-it
  // Në praktikë, do të përdorni një shërbim si EmailJS, Formspree, ose backend

  const subjekti = `Rezervim i ri - ${teDhenat.emri}`;
  const permbajtja = `
        REZERVIM I RI\n
        Emri: ${teDhenat.emri}
        Email: ${teDhenat.email}
        Telefoni: ${teDhenat.phone}
        Data: ${teDhenat.data}
        Koha: ${teDhenat.time}
        Persona: ${teDhenat.persona}
        Mesazh: ${teDhenat.mesazhi || 'Asnjë mesazh'}
        \n
        Data e rezervimit: ${new Date().toLocaleString()}
    `;

  console.log(" Email-i i rezervimit:", {
    subjekti: subjekti,
    permbajtja: permbajtja
  });

  // Simulim i dërgimit të email-it
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const sukses = Math.random() > 0.1; // 90% shans suksesi
      if (sukses) {

        resolve(true);
      } else {
        console.error(" Dërgimi i email-it dështoi (simulim)");
        reject(new Error("Dërgimi i email-it dështoi"));
      }
    }, 1000);
  });
}

// 5. TRAJTIMI I FORMËS SË REZERVIMEVE
document.getElementById('formaRezervimit').addEventListener('submit', async function(ndodhia) {
  ndodhia.preventDefault();



  // Merr të dhënat nga forma
  const teDhenat = {
    emri: document.getElementById('emri').value,
    email: document.getElementById('email').value,
    phone: document.getElementById('phone').value,
    data: document.getElementById('data').value,
    time: document.getElementById('time').value,
    persona: document.getElementById('persona').value,
    mesazhi: document.getElementById('mesazhiRezervimi').value
  };



  // Validimi i të dhënave
  if (!teDhenat.emri || !teDhenat.email || !teDhenat.phone) {
    alert(" Ju lutem plotësoni të gjitha fushat e detyrueshme!");
    console.error(" Validimi dështoi: Fushat e detyrueshme janë bosh");
    return;
  }

  // Shfaq alert për konfirmim
  alert(`Rezervimi po processohet...\nJu lutem prisni!`);

  try {
    // Dërgo rezervimin me email
    await dergoRezerviminNeEmail(teDhenat);

    // Shfaq alert për sukses
    alert(` Faleminderit ${teDhenat.emri}!\nRezervimi juaj për ${teDhenat.data} në orën ${teDhenat.time} u krye me sukses.\nDo të ju kontaktojmë për konfirmim!`);



    // Reset formën
    this.reset();
    vendosDatatDefault();

  } catch (error) {
    console.error(" Gabim në dërgimin e rezervimit:", error);
    alert(` Kërkojmë falje! Ka ndodhur një gabim.\nJu lutem provoni përsëri ose na telefononi direkt.`);
  }
});

// 6. TRAJTIMI I FORMËS SË KONTAKTIT
document.getElementById('formaKontaktit').addEventListener('submit', function(ndodhia) {
  ndodhia.preventDefault();



  const emri = document.getElementById('emriKontaktit').value;
  const email = document.getElementById('emailKontaktit').value;
  const mesazhi = document.getElementById('mesazhi').value;

  console.log("💬 Të dhënat e kontaktit:", { emri, email, mesazhi });

  // Validimi
  if (!emri || !email || !mesazhi) {
    alert(" Ju lutem plotësoni të gjitha fushat!");
    console.error(" Validimi i kontaktit dështoi");
    return;
  }

  // Shfaq alert për sukses
  alert(` Faleminderit ${emri}!\nMesazhi juaj u dërgua me sukses.\nDo t'ju përgjigjemi brenda 24 orësh.`);



  // Reset formën
  this.reset();
});

// 7. FUNKSIONI PËR TË VENDOSUR DATAT DEFAULT
function vendosDatatDefault() {


  // Vendos datën e sotme
  const sot = new Date();
  const dataSot = sot.toISOString().split('T')[0];
  document.getElementById('data').value = dataSot;

  // Vendos orën aktuale + 1 orë
  const neser = new Date(sot);
  neser.setHours(sot.getHours() + 1);
  const koha = neser.toTimeString().substring(0, 5);
  document.getElementById('time').value = koha;

  console.log(`⏰ Datat default u vendosën: ${dataSot} në ${koha}`);
}

// 8. INICIALIZIMI I FAQES
window.addEventListener('DOMContentLoaded', function() {


  // Shfaq menunë fillestare
  tregoMenu('teGjitha');
  ndryshoButoninAktiv('butoniTeGjitha');

  // Vendos datat default në formën e rezervimeve
  vendosDatatDefault();

  // Shto event listeners për butonat e menusë
  document.getElementById('butoniTeGjitha').addEventListener('click', function() {
    tregoMenu('teGjitha');
    ndryshoButoninAktiv('butoniTeGjitha');
  });

  document.getElementById('butoniFillestar').addEventListener('click', function() {
    tregoMenu('fillestar');
    ndryshoButoninAktiv('butoniFillestar');
  });

  document.getElementById('butoniKryesor').addEventListener('click', function() {
    tregoMenu('kryesor');
    ndryshoButoninAktiv('butoniKryesor');
  });

  document.getElementById('butoniEmbelsira').addEventListener('click', function() {
    tregoMenu('embelsire');
    ndryshoButoninAktiv('butoniEmbelsira');
  });

  // Navigimi
  document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 70,
          behavior: 'smooth'
        });

      }
    });
  });


});