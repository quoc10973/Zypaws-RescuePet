export const assets = {
    logo: "/assets/logo.png",
    pawlogo: "/assets/pawlogo.png",
    decorate1: "/assets/decorate1.svg",
    decorate2: "/assets/decorate2.svg",
    decorate3: "/assets/decorate3.png",
    decorate4: "/assets/decorate4.gif",
    decorate5: "/assets/decorate5.png",
    decorate6: "/assets/decorate6.png",
    decorate7: "/assets/decorate7.svg",
    banner1: "/assets/banner1.jpg",
    banner2: "/assets/banner2.jpg",
    banner3: "/assets/banner3.jpg",
    banner4: "/assets/banner4.jpg",
    banner5: "/assets/banner5.jpg",
    catbanner: "/assets/catbanner.png",
    confetti1: "/assets/confetti1.svg",
    confetti2: "/assets/confetti2.svg",
    confetti3: "/assets/confetti3.svg",
    bestie: "/assets/bestie.png",
    partner1: "/assets/partner1.png",
    partner2: "/assets/partner2.png",
    partner3: "/assets/partner3.svg",
    catdonatebanner: "/assets/catdonatebanner.jpg",
    successdonatecat: "/assets/successdonatecat.jpg"
};

// Hàm lấy ảnh pet từ thư mục public
export const getPetImage = (petName) => `/assets/Pets/${petName.includes('.') ? petName : petName + '.jpg'}`;

// Danh sách thú cưng
export const pets = [
    "Bella",
    "Buddy",
    "Charlie",
    "Luna",
    "Lucy",
    "Max",
    "Milo",
    "Shadow",
    "Toka",
    "Nemo",
    "Chloe",
    "Lily",
    "Echo",
    "Evie",
    "Louie",
    "Purry",
    "Mickey",
    "Keen",
    "Alfie",
    "Annie",
    "Gulik",
    "Rex",
    "Snow",
    "Rocky"
];
