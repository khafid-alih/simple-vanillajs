/**
 * 
 * pecahan section
 * 
 */
function getPecahan(parameter){
  let tempParameter = parameter
  let digit = 0
  const arrayPecahan = []

  // howmany digit on @parameter set on digit
  while(tempParameter >= 1){
    tempParameter /= 10
    digit +=1
  }

  // set back tempParameter for next step 
  tempParameter = parameter
  let result

  // 10^ menggunakan rekursif
  const pangkat = (a)=>{
    if(a <= 1) return 1

    return 10 * pangkat(a-1)
  }

  // mengambil value untuk dijadikan array
  for(let i = digit;i > 0;i--){
    /**
     * 1. mengambil sisa bagi dari parameter dibagi 10^i lalu memasukkan ke tempParameter
     * 2. mengurangi parameter dengan tempParameter sehingga ditemukan digit pertama pada result
     * 3. mengubah nilai parameter ke tempParameter sehingga nilai parameter berganti
     * 4. melakukan push ke arrayPecahan apabila nilainya tidak 0
     */
    tempParameter =  parameter % pangkat(i)
    result = parameter - tempParameter
    parameter = tempParameter
    if(result > 0) arrayPecahan.push(result)
  }

  return arrayPecahan

}

function pecahan(event){

  event.preventDefault()

  // value input
  let value = document.getElementById("input-pecahan").value
  // bagian yg dianipulasi
  let container = document.getElementById("content-pecahan")

  const result = getPecahan(parseInt(value))
  container.innerHTML = resetIsi()

  // manipulation DOM HTML
  if(result.length <= 0){
    container.innerHTML += `
      <div>Pastikan inputan berupa angka</div>
    `
  }else{
    result.map(data=>{
      container.innerHTML += `
      <div style="height: 25px; margin-bottom: 5px; border: 1px solid black; padding: 5px; display: flex; align-items: center;">
        <h4>
          ${data}
        </h4>
      </div>
      `
    })
  }
}

// untuk mengkosongkan kembali div 
// -> sehingga nilai sebelumnya tidak ditampilkan lagi
function resetIsi(){
  return ` `
}

/**
 * 
 * chart section
 * 
 */

// variabel yg dibutuhkan, 
// -> condition untuk kondisi interval, 
// -> input berisi value dari form, 
// -> interval untuk mengeksekusi fungsi secara bercala
let condition = false, input, interval

// main fungsi yang dipanggil berdasarkan subimt form
function bar(event){

  event.preventDefault()

  // mengisi niali input dari form 
  input = document.getElementById("input-bar").value
  // button yang akan dimanipulasi stop or submit
  let button = document.getElementById("button-bar")

  // condition dari button
  if(button.innerText == "submit") {
    condition = true
    button.innerText = "stop"

    // call function
    updateBar(input)

    // set interval if submit
    interval = setInterval(() => {
      if(condition) updateBar(input)
    }, 3000);
  }else{
    condition = false
    button.innerText = "submit"

    // clear interval if stop
    clearInterval(interval) 
  }
}

function chart(parameter){
  const chartBar = []
  let color = ''

  for(let i = 0;i <parameter;i++){
    // memasukkan angka random dari 1 - 100 ke data
    data =  Math.floor(Math.random() * 101)

    // memasukkan color berdasarkan data
    if(data < 26) color = "green" ;
    else if(data < 51) color = "yellow" ;
    else if(data < 76) color = "red"; 
    else color = "blue";

    // memasukkan ke array menjadi array of object
    chartBar.push({
      data,
      color
    })
  }

  return chartBar
}

function updateBar(params) {
  // div yang akan dimanipulasi
  let container = document.getElementById("content-bar")
  
  const result = chart(parseInt(params))
  container.innerHTML = resetIsi()

  // kondisi dari hasil inputan
  if(result.length <= 0){
    container.innerHTML += `
      <div>Pastikan inputan berupa angka</div>
    `
  }else{
    result.map(data=>{
      container.innerHTML += `
      <div style="height: ${data.data}px; width: 40px; margin: 0 1px 30px 1px; background-color: ${data.color}; text-align: center;">${data.data}</div>
      `
    })
  }
}