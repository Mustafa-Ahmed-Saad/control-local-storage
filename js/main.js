
let allSpan = document.querySelectorAll('.buttons span');
let directSpanResult = document.querySelector('.results > span'); // دي هتجبلك سبان واحدة فقط و هي اول سبان مباشر فقط جوا العنصر اللي واخدة كلاس ريسلت
// let directSpanResult = document.querySelector('.results span'); // دي هتجبلك  سبانواحدة فقط و هي اول سبان جوا العنصر اللي واخدة كلاس ريسلت و السبان دي بقي مباشرة او غيرمباشرة
// let directSpanResult = document.querySelectorAll('.results > span'); // دي هتجبلك كل السبان الابناء المباشرة اللي جوا كلاس ريسلت
// let directSpanResult = document.querySelectorAll('.results span'); // هتجبلك كل السبان اللي جوا الكلاس دا مباشرة او غير مباشرة
let theInput = document.getElementById('the-input');
let theInputKeyValue = document.getElementById('the-input-value');



allSpan.forEach((span) => {

    span.addEventListener('click', (e) => {
        if (e.target.classList.contains('check-item')) {
            checkItem();

        } else if (e.target.classList.contains('add-item')) {
            addItem();

        } else if (e.target.classList.contains('delete-item')) {
            deleteItem();

        } else if (e.target.classList.contains('show-items')) {
            showItem();
        
        } else if (e.target.classList.contains('delete-all')) {
            checkDelete();
        }
    })

})

function showMessage() {
    directSpanResult.textContent = 'input cant be empty';
}

function checkItem() {
    if (theInput.value !== '') {
        
        if (localStorage.getItem(theInput.value.toLocaleLowerCase())) {
            directSpanResult.innerHTML = `found local storage item called <span>${theInput.value.toLocaleLowerCase()}</span> and its value is <span>${localStorage.getItem(theInput.value.toLocaleLowerCase())}</span>`;
        } else {
            directSpanResult.innerHTML = `no local storage item with the name <span>${theInput.value}</span>`;
        }

    } else { // لو الانبوت فاضي دي هتتمفز
        showMessage();
    }
}
    
function addItem() {
    if (theInput.value !== '') {
        if (localStorage.getItem(theInput.value.toLocaleLowerCase())) {
            directSpanResult.innerHTML = `local storage item called <span>${theInput.value.toLocaleLowerCase()}</span> already exist`;
            
        } else {
            localStorage.setItem(theInput.value.toLocaleLowerCase(), theInputKeyValue.value || 'no value');
            directSpanResult.innerHTML = `local storage item <span>${theInput.value.toLocaleLowerCase()}</span> added`
            theInput.value = '';
            theInputKeyValue.value = '';
        }

    } else { // لو الانبوت فاضي دي هتتمفز
        showMessage();
    }
}

function deleteItem() {
    if (theInput.value !== '') {
        if (localStorage.getItem(theInput.value.toLocaleLowerCase())) {  // لازم تكون عارف ان اي سترنج يعني ترو ما عادا النال و الانديفيند ولازم ميكونوش مكتوبين بين علامات السترنج علشان ميعترروش سترنج عادي او اي رقم يعني ترو ماعدا رقم صفر
            localStorage.removeItem(theInput.value.toLocaleLowerCase());
            directSpanResult.innerHTML = `local storage item <span>${theInput.value.toLocaleLowerCase()}</span> deleted`
            theInput.value = '';
        } else {
            directSpanResult.innerHTML = `local storage item <span>${theInput.value.toLocaleLowerCase()}</span> is not found`
        }
    } else {
        showMessage();
    }
}

function showItem() {

    // if (localStorage.length > 0) {
    if (localStorage.length) {  // لازم تكون عارف ان اي سترنج يعني ترو ما عادا النال و الانديفيند ولازم ميكونوش مكتوبين بين علامات السترنج علشان ميعترروش سترنج عادي او اي رقم يعني ترو ماعدا رقم صفر
        directSpanResult.innerHTML = '';
        for (let [key, value] of Object.entries(localStorage)) { // لو عاوز تلوب علي الاوبجيكت تعمل كدا
            directSpanResult.innerHTML += `<span class='keyspan'>${key}: ${value}<span>`;
        }
    } else {
        directSpanResult.innerHTML = 'local storage is empty';
    }
}

function deleteAll() {
    for(let [key, value] of Object.entries(localStorage)) {
        localStorage.removeItem(key);
        directSpanResult.innerHTML = 'local storage is empty'
    }
}

function checkDelete() {
    if (localStorage.length) {
        Swal.fire({
            title: 'Are you sure you want to delet all thing in local storage?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete all things!'
          }).then((result) => {
            if (result.isConfirmed) {
              deleteAll();
              Swal.fire(
                'Deleted!',
                'local storage is empty.',
                'success',        
              )
            }
          })
    } else {
        directSpanResult.innerHTML = 'no item to delete';       
    }

}
