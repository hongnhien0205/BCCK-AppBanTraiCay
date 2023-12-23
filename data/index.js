//1
const Bo ={
    id:1,
    productName:'Bơ đà lạt',
    price:2490000,
    imageUrl150:'Bo150.jpg',
    imageUrl400:'Bo400.jpg',
    rating:4.0, // <=5
    nameShop:'HoaQuaShop',
    description:'',
    sold:15,
    quantity:21,
    category:'MuaXuan'
}

// 2
const Cam ={
    id:2,
    productName:'Cam',
    price:1890000,
    imageUrl150:'Cam150.jpg',
    imageUrl400:'Cam400.jpg',
    rating:3.8, // <=5
    nameShop:'HoaQuaShop',
    description:'',
    sold:10,
    quantity:28,
    category:'MuaHe'

}

// 3
const ChomChom ={
    id:3,
    productName:'Chôm Chôm',
    price:300000,
    imageUrl150:'Chom150.jpg',
    imageUrl400:'Chom400.jpg',
    rating:3.0, // <=5
    nameShop:'HoaQuaShop',
    description:'',
    sold:3,
    quantity:15,
    category:'MuaXuan'

}

// 4
const Chuoi ={
    id:4,
    productName:'Chuối',
    price:1490000,
    imageUrl150:'Chuoi150.jpg',
    imageUrl400:'Chuoi400.jpg',
    rating:4.5, // <=5
    nameShop:'HoaQuaShop',
    description:'',
    sold:33,
    quantity:20,
    category:'MuaDong'

}

// 5
const DauTay ={
    id:5,
    productName:'Dâu Tây',
    price:2300000,
    imageUrl150:'DauTay150.jpg',
    imageUrl400:'DauTay400.jpg',
    rating:3.9, // <=5
    nameShop:'HoaQuaShop',
    description:'',
    sold:16,
    quantity:14,
    category:'MuaThu'

}

// 6
const DauHau ={
    id:6,
    productName:'Dưa Hấu',
    price:900000,
    imageUrl150:'DuaHau150.jpg',
    imageUrl400:'DuaHau400.jpg',
    rating:4.5, // <=5
    nameShop:'HoaQuaShop',
    description:'',
    sold:35,
    quantity:14,
    category:'MuaXuan'

}

// 7
const Le ={
    id:7,
    productName:'Lê',
    price:250000,
    imageUrl150:'Le150.jpg',
    imageUrl400:'Le400.jpg',
    rating:3.6, // <=5
    nameShop:'HoaQuaShop',
    description:'',
    sold:10,
    quantity:5,
    category:'MuaHe'

}

// 8
const MangCuc ={
    id:8,
    productName:'Măng cục',
    price:1100000,
    imageUrl150:'MangCuc150.jpg',
    imageUrl400:'MangCuc400.jpg',
    rating:4.1, // <=5
    nameShop:'HoaQuaShop',
    description:'',
    sold:15,
    quantity:30,
    category:'MuaHe'

}

// 9
const Mit ={
    id:9,
    productName:'Mít',
    price:799000,
    imageUrl150:'Mit150.jpg',
    imageUrl400:'Mit400.jpg',
    rating:3.1, // <=5
    nameShop:'HoaQuaShop',
    description:'',
    sold:13,
    quantity:21,
    category:'MuaXuan'

}

// 10
const Nho ={
    id:10,
    productName:'Nho',
    price:990000,
    imageUrl150:'Nho150.jpg',
    imageUrl400:'Nho400.jpg',
    rating:3.7, // <=5
    nameShop:'HoaQuaShop',
    description:'',
    sold:23,
    quantity:33,
    category:'MuaDong'

}

// 11
const Oi ={
    id:11,
    productName:'Ổi',
    price:26500000,
    imageUrl150:'Oi150.jpg',
    imageUrl400:'Oi400.jpg',
    rating:4.3, // <=5
    nameShop:'HoaQuaShop',
    description:'',
    sold:8,
    quantity:12,
    category:'MuaXuan'

}

// 12
const SauRieng ={
    id:12,
    productName:'Sầu Riêng',
    price:21900000,
    imageUrl150:'SauRieng150.jpg',
    imageUrl400:'SauRieng400.jpg',
    rating:3.5, // <=5
    nameShop:'HoaQuaShop',
    description:'',
    sold:5,
    quantity:15,
    category:'MuaThu'

}

// 13
const Tao ={
    id:13,
    productName:'Táo',
    price:17900000,
    imageUrl150:'Tao150.jpg',
    imageUrl400:'Tao400.jpg',
    rating:3.8, // <=5
    nameShop:'HoaQuaShop',
    description:'',
    sold:6,
    quantity:11,
    category:'MuaHe'

}

// 14
const ThanhLong ={
    id:14,
    productName:'Thanh Long',
    price:19900000,
    imageUrl150:'ThanhLong150.jpg',
    imageUrl400:'ThanhLong400.jpg',
    rating:4.2, // <=5
    nameShop:'HoaQuaShop',
    description:'',
    quantity:11,
    category:'MuaDong'

}

// 15
const Xoai ={
    id:15,
    productName:'Xoài',
    price:21900000,
    imageUrl150:'Xoai150.jpg',
    imageUrl400:'Xoai400.jpg',
    rating:3.8, // <=5
    nameShop:'HoaQuaShop',
    description:'',
    sold:8,
    quantity:5,
    category:'MuaDong'

}




const User1 ={
    name:'Trần Thành Nam',
    genrder:true,
    dateOfBirth:'25/10/2002',
    phoneNumber:'0399194932',
    email:'namsenpai2510@gmail.com',
    address:'',
    role:'user', //user
}

const User2 ={
    name:'Nguyễn Hoàng Hiếu',
    genrder:true,
    dateOfBirth:'15/1/1992',
    phoneNumber:'034514932',
    email:'hieunho52@gmail.com',
    address:'92/2 khu phố b, chiêu liêu, Dĩ An, Bình Dương',
    role:'user', //user
}

const producData=[
    {
        ...Bo,
    },
    {
        ...Cam,
    },
    {
        ...ChomChom,
    },
    {
        ...Chuoi,
    },
    {
        ...DauHau,
    },
    {
        ...DauTay,
    },
    {
        ...Le,
    },
    {
        ...MangCuc,
    },
    {
        ...Mit,
    },
    {
        ...Nho,
    },
    {
        ...SauRieng,
    },
    {
        ...Tao,
    },
    {
        ...ThanhLong,
    },
    {
        ...Xoai,
    },

    

]
const categoriesData = [
    {
        id:1,
        categoryName:'Best Seller',
        products:[
            1,2,3,4 //id
        ]
    },
    {
        id:2,
        categoryName:'The Lastest',
        products:[
            9,14,22,21
        ]
    },
    {
        id:2,
        categoryName:'Coming Soon',
        products:[
            5,20,15,25
        ]
    },
]

export {producData,categoriesData}