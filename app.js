let chooseImagBtn = document.querySelector(".choose-image-container .choose-image-btn");
let chooseImgInput = document.querySelector(".choose-image-container input");
let imageSrc = document.querySelector(".image-editor");
let filterBtns = document.querySelectorAll(".filter-btns-container button");
let sliderInput = document.querySelector(".slider input");
let filterName = document.querySelector(".slider .filter-details .name");
let sliderValue = document.querySelector(".slider .filter-details .value");
let flipBtns = document.querySelectorAll(".flip-btns-container button");
let resetBtn = document.querySelector(".save-and-reset-btns .reset");
let saveBtn = document.querySelector(".save-and-reset-btns .save");


let brightness = 100,
    contrast = 100,
    saturate = 100,
    invert = 0,
    blur = 0,
    rotate = 0,
    flipX = 1,
    flipY = 1;

function initialApp() {
    addEvents();
}

initialApp();

function addEvents() {
    chooseImagBtn.addEventListener("click", () => chooseImgInput.click());
    chooseImgInput.addEventListener("change", getTheImage);
    filterBtns.forEach((btn) => {
        btn.addEventListener("click", function () {
            removeActiveClass(filterBtns);
            this.classList.add("active");
            checkTab(this);
        })
    })
    sliderInput.addEventListener("input", () => {
        updateValuesAndFilterImage();
    })
    flipBtns.forEach((btn) => {
        btn.addEventListener("click", function () {
            removeActiveClass(flipBtns);
            this.classList.add("active");
            updateValuesAndRotateImage()
        })
    })
    resetBtn.addEventListener("click", resetFilters);
    saveBtn.addEventListener("click", saveImage)
}

function getTheImage() {
    let file = chooseImgInput.files[0];
    if (!file) return;
    imageSrc.src = URL.createObjectURL(file);
    imageLoad();
}

function imageLoad() {
    imageSrc.addEventListener("load", () => {
        removeDisapledClass()
    })
}

function removeDisapledClass() {
    document.querySelectorAll("#imageEditor .disabled").forEach((col) => {
        col.classList.remove("disabled");
    })
}

function removeActiveClass(classes) {
    classes.forEach((el) => {
        el.classList.remove("active")
    })
}

function checkTab(tab) {
    filterName.innerHTML = tab.id;
    if (tab.id === "brightness") {
        sliderInput.max = "200";
        sliderInput.value = brightness;
        sliderValue.innerHTML = `${brightness}%`;
    } else if (tab.id === "contrast") {
        sliderInput.max = "200";
        sliderInput.value = contrast;
        sliderValue.innerHTML = `${contrast}%`;
    } else if (tab.id === "saturate") {
        sliderInput.max = "200";
        sliderInput.value = saturate;
        sliderValue.innerHTML = `${saturate}%`;
    } else if (tab.id === "invert") {
        sliderInput.max = "100";
        sliderInput.value = invert;
        sliderValue.innerHTML = `${invert}%`;
    } else if (tab.id === "blur") {
        sliderInput.max = "100";
        sliderInput.value = blur;
        sliderValue.innerHTML = `${blur}%`;
    }
}

function updateValuesAndFilterImage() {
    sliderValue.innerHTML = `${sliderInput.value}%`;
    let sliderActive = document.querySelector(".filter-btns-container .active");
    if (sliderActive.id == "brightness") {
        brightness = sliderInput.value;
    } else if (sliderActive.id == "contrast") {
        contrast = sliderInput.value;
    } else if (sliderActive.id == "saturate") {
        saturate = sliderInput.value;
    } else if (sliderActive.id == "invert") {
        invert = sliderInput.value;
    } else if (sliderActive.id == "blur") {
        blur = sliderInput.value;
    }
    imageSrc.style.filter = `brightness(${brightness}%) contrast(${contrast}%) saturate(${saturate}%) invert(${invert}%) blur(${blur}px)`;
}

function updateValuesAndRotateImage() {
    let rotateActive = document.querySelector(".flip-btns-container .active");
    if (rotateActive.id == "rotateLeft") {
        rotate -= 90;
    } else if (rotateActive.id == "rotateRight") {
        rotate += 90;
    } else if (rotateActive.id == "flipX") {
        flipX = flipX === 1 ? -1 : 1;
    } else if (rotateActive.id == "flipY") {
        flipY = flipY === 1 ? -1 : 1;
    }
    imageSrc.style.transform = `rotate(${rotate}deg) scale(${flipX},${flipY})`;
}

function resetFilters() {
    brightness = 100;
    contrast = 100;
    saturate = 100;
    invert = 0;
    blur = 0;
    rotate = 0;
    flipX = 1;
    flipY = 1;
    imageSrc.style.filter = `brightness(${brightness}%) contrast(${contrast}%) saturate(${saturate}%) invert(${invert}%) blur(${blur}px)`;
    imageSrc.style.transform = `rotate(${rotate}deg) scale(${flipX},${flipY})`;
    resetInputValues();
}

function resetInputValues() {
    let sliderActive = document.querySelector(".filter-btns-container .active");
    if (sliderActive.id === "brightness") {
        sliderInput.max = "200";
        sliderInput.value = brightness;
        sliderValue.innerHTML = `${brightness}%`;
    } else if (sliderActive.id === "contrast") {
        sliderInput.max = "200";
        sliderInput.value = contrast;
        sliderValue.innerHTML = `${contrast}%`;
    } else if (sliderActive.id === "saturate") {
        sliderInput.max = "200";
        sliderInput.value = saturate;
        sliderValue.innerHTML = `${saturate}%`;
    } else if (sliderActive.id === "invert") {
        sliderInput.max = "100";
        sliderInput.value = invert;
        sliderValue.innerHTML = `${invert}%`;
    } else if (sliderActive.id === "blur") {
        sliderInput.max = "100";
        sliderInput.value = blur;
        sliderValue.innerHTML = `${blur}%`;
    }
}

function saveImage() {
    let canvas = document.createElement("canvas");
    let ctx = canvas.getContext("2d");

    canvas.width = imageSrc.naturalWidth;
    canvas.height = imageSrc.naturalHeight;

    ctx.filter = `brightness(${brightness}%) contrast(${contrast}%) saturate(${saturate}%) invert(${invert}%) blur(${blur}px)`;
    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.scale(flipX, flipY);
    ctx.drawImage(
        imageSrc,
        -canvas.width / 2,
        -canvas.height / 2,
        canvas.width,
        canvas.height
    );

    const link = document.createElement("a");
    link.download = "image.jpg";
    link.href = canvas.toDataURL();
    link.click();
}
