const express = require('express')
const morgan = require('morgan')
const jwt = require('jsonwebtoken')
var cors = require('cors');
const app = express();
const auth = require("./middlewares/auth");
var faker = require('faker');
var multer = require('multer');
var bodyParser = require('body-parser');
const images=require('./images')
require("dotenv").config();
app.use(cors())
app.use(morgan('dev'))

app.use(express.json({ limit: '200mb' }));
app.use(express.urlencoded({ limit: '200mb', extended: true }));
app.use(express.text({ limit: '200mb' }));
app.use(express.json())
app.use(express.urlencoded({ extended: false }));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse application/json
app.use(bodyParser.json())
var storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, './uploads');
    },
    filename: function (req, file, callback) {
        let extArray = file.mimetype.split("/");
        let extension = extArray[extArray.length - 1];
        callback(null, file.originalname + '-' + Date.now() + '.' + extension)
    }
});
var upload = multer({ storage: storage }).any();

app.get('/', (req, res) => {
    res.json({ msg: 'func' })
})
const datamonths = [
    { id: '1', title: 'Enero' },
    { id: '2', title: 'Febrero' },
    { id: '3', title: 'Marzo' },
    { id: '4', title: 'Abril' },
    { id: '5', title: 'Mayo' },
    { id: '6', title: 'Junio' },
    { id: '7', title: 'Julio' },
    { id: '8', title: 'Agosto' },
    { id: '9', title: 'Septiembre' },
    { id: '10', title: 'Octubre' },
    { id: '11', title: 'Noviembre' },
    { id: '12', title: 'Diciembre' },
]
let cursos = {
    "period": "Primer Trimestre",
    "year": "2021",
    "start_date": "2021-01-01",
    "finish_date": "2021-01-31",
    "remaining_days": 10,
    "courses": [
        {
            "id": 0,
            "code": "COF01",
            "name": "Finanzas Industriales Corporativas",
            "section": {
                "id": 0,
                "section": "A",
                "teaching": "Manuel del toro",
                "teaching_profile_image": "https://e00-elmundo.uecdn.es/assets/multimedia/imagenes/2019/10/14/15710517464954.jpg",
                "days": [
                    {
                        name: "Lunes",
                        start: "10:00 am",
                        finish: "11:00 am"
                    },
                    {
                        name: "Martes",
                        start: "2:00 am",
                        finish: "3:00 pm",
                    }
                ],
                "building": "T3",
                "room": "303",
                "state": "Aprobado"
            }
        },
        {
            "id": 1,
            "code": "GIM01",
            "name": "Logistica",
            "section": {
                "id": 0,
                "section": "A",
                "teaching": "Ramon del toro",
                "teaching_profile_image": "https://www.magisnet.com/wp-content/uploads/2020/11/Nivel-de-Ingles.jpg",
                "start_time": "07:00",
                "finish_time": "10:00",
                "days": [
                    {
                        name: "Lunes",
                        start: "10:00 am",
                        finish: "11:00 am"
                    },
                    {
                        name: "Martes",
                        start: "2:00 am",
                        finish: "3:00 pm",
                    }
                ],
                "building": "T4",
                "room": "305"
            }
        },
        {
            "id": 2,
            "code": "GIM01",
            "name": "Logistica",
            "section": {
                "id": 0,
                "section": "A",
                "teaching": "Ramon del toro",
                "teaching_profile_image": "https://phantom-marca.unidadeditorial.es/7294c3285fbf5a5b15ae95bba788fad2/resize/1320/f/jpg/assets/multimedia/imagenes/2021/09/13/16315257504382.jpg",
                "start_time": "07:00",
                "finish_time": "10:00",
                "days": [
                    {
                        name: "Lunes",
                        start: "10:00 am",
                        finish: "11:00 am"
                    },
                    {
                        name: "Martes",
                        start: "2:00 am",
                        finish: "3:00 pm",
                    }
                ],
                "building": "T4",
                "room": "305"
            }
        },
        {
            "id": 3,
            "code": "GIM01",
            "name": "Logistica",
            "section": {
                "id": 0,
                "section": "A",
                "teaching": "Ramon del toro",
                "teaching_profile_image": "https://www.elegircarrera.net/blog/wp-content/uploads/2019/01/profesor-emerito-2000x1200.jpg",
                "start_time": "07:00",
                "days": [
                    {
                        name: "Lunes",
                        start: "10:00 am",
                        finish: "11:00 am"
                    },
                    {
                        name: "Martes",
                        start: "2:00 am",
                        finish: "3:00 pm",
                    }
                ],
                "building": "T4",
                "room": "305"
            }
        }
    ]
}
//1234567891244 18

app.post('/login', (req, res) => {
    let data = req.body
    if ((data.user == '1850306960101' || data.user == '3417752902106' || data.user == '3003686820101' || '1234567891235' || '2991120550103' || '1234567891244') && data.password == '1') {
        const token = jwt.sign(
            {
                user_id: 1,
                email: 'marvin1ronal@gmail.com'
            },
            process.env.TOKEN_KEY,
            {
                expiresIn: '2m',
            }
        )
        // let data = {
        //     user_id: 1,
        //     email: 'marvin1ronal@gmail.com'
        // }
        console.log(token)
        return res.status(200).json({
            success: true,
            data: token
        })
    }
    console.log(data)
    res.json({
        success: false,
        data: null
    })
})

app.get('/optionslogin', auth, (req, res) => {
    let data = {
        account_type: [
            {
                "id": 0,
                "text": "Aspirante",
                "icon": "user-check",
                "icon_class": "FontAwesome5",

            },
            {
                "id": 1,
                "text": "Usuario",
                "icon": "user",
                "icon_class": "FontAwesome5",
            }
        ],
        career_type: [
            {
                "id": 100,
                "text": "Doctorado 100",
                "icon_class": "Entypo",
                "icon": "book"
            },
            {
                "id": 45,
                "text": "Maestria 1",
                "icon_class": "Entypo",
                "icon": "book"
            },
            {
                "id": 60,
                "text": "Maestria 60",
                "icon_class": "Entypo",
                "icon": "book"
            },
            {
                "id": 98,
                "text": "Maestria 98",
                "icon_class": "Entypo",
                "icon": "book"
            },
            {
                "id": 68,
                "text": "Maestria 68",
                "icon_class": "Entypo",
                "icon": "book"
            },
            {
                "id": 102,
                "text": "Maestria 102",
                "icon_class": "Entypo",
                "icon": "book"
            }
        ]
    }

    res.json({
        success: true,
        data: data
    })
})

app.get('/workschedule', (req, res) => {
    const data = [
        { id: '0', title: 'Doctorado', description: 'Sábados' },
        { id: '1', title: 'Maestrías', description: 'Sábados' },
        { id: '2', title: 'Gestión Industrial', description: 'Sábados' },
        { id: '3', title: 'Especializaciones', description: 'Sábados' },
        { id: '4', title: 'Gestión del Talento Humano', description: 'Sábados' },
        { id: '5', title: 'Educación Virtual para en Nivel Superior', description: 'Sábados' },
        { id: '6', title: 'Educación Virtual para en Nivel Superior', description: 'Sábados' },
    ]
    res.status(200).json({
        success: false,
        data: data
    })
})
app.get('/months/:id/:year', (req, res) => {
    res.status(200).json({
        success: false,
        data: datamonths
    })
})

function diasEnUnMes(mes, año) {
    return new Date(año, mes, 0).getDate();
}
function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
}
app.get('/monthyear/:id', (req, res) => {
    let data = [
        {
            id: '0',
            year: '2020',

        },
        {
            id: '1',
            year: '2021',
        },
        {
            id: '2',
            year: '2022',

        }
    ]
    res.status(200).json({
        success: true,
        data: data
    })
})
app.get('/calendar/:id/:year/:month', (req, res) => {
    const months = []
    const month = parseInt(req.params.month) + 1
    const year = parseInt(req.params.year)
    const maximum = diasEnUnMes(month, year)
    const count = randomIntFromInterval(1, 6)
    const is_range = randomIntFromInterval(0, 1)
    for (let i = 0; i < count; i++) {
        if (is_range == 0) {
            const day = randomIntFromInterval(1, maximum)
            //crear objeto
            months.push({
                start: `${year}-${month < 10 ? `0${month}` : month}-${day < 10 ? `0${day}` : day}`,
                finish: `${year}-${month < 10 ? `0${month}` : month}-${day < 10 ? `0${day}` : day}`,
                title: faker.music.genre(),
                description: faker.lorem.words(),
                type: faker.vehicle.model(),
                help: {
                    title: 'Asignación de curso',
                    description: 'Una validación se refiera a que el estudiante no pagó en tiempo la boleta de pago del curso, por lo cual, el pago fuera de fecha se genera un pago de validación de Q200'
                }
            })
        } else {
            const day = randomIntFromInterval(1, maximum)
            const nextday = randomIntFromInterval(day, maximum)
            months.push({
                start: `${year}-${month < 10 ? `0${month}` : month}-${day < 10 ? `0${day}` : day}`,
                finish: `${year}-${month < 10 ? `0${month}` : month}-${day < 10 ? `0${day}` : day}`,
                title: faker.music.genre(),
                description: faker.lorem.words(),
                type: faker.vehicle.model(),
                help: {
                    title: 'Asignación de curso',
                    description: 'Una validación se refiera a que el estudiante no pagó en tiempo la boleta de pago del curso, por lo cual, el pago fuera de fecha se genera un pago de validación de Q200'
                }
            })
        }
    }
    console.log(months)
    res.status(200).json({
        success: true,
        data: months
    })

})
app.get('/Document/:doc', (req, res) => {
    let document = req.params.doc
    if (document == '2991120550101') {
        let data = {
            document: '1234456789',
            first_name: 'Yaiza',
            second_name: 'Estefania',
            first_last_name: 'Pineda',
            second_last_name: 'Gonzalez',
            phone: '12345678',
            cell_phone: '12345678',
            email: 'yaiza1@gmail.com'
        }
        return res.status(200).json({
            success: true,
            data: [data]
        })
    } else {
        return res.status(200).json({
            success: false,
            data: []
        })
    }
})
app.get('/campus', (req, res) => {
    let data = [
        {
            "id": 0,
            "text": "Sede Central",
            "icon": "camera",
            "icon_color": "#091353",
            "text_color": "black",
            "icon_class": "EvilIcons"
        },
        {
            "id": 1,
            "image": "https://upload.wikimedia.org/wikipedia/commons/d/df/Logo_UNIR.png",
            "text": "Sede UNIR"
        }
    ]
    return res.status(200).json(data)
})
app.get('/typeprogram', (req, res) => {
    let data = [
        {
            "id": 0,
            "text": "Doctorado",
            "icon_class": "Feather",
            "icon": "award"
        },
        {
            "id": 1,
            "text": "Maestria",
            "icon_class": "Feather",
            "icon": "award"
        },
        {
            "text": "Especializacion",
            "id": 2,
            "icon_class": "Feather",
            "icon": "award"
        }
    ]
    return res.status(200).json(data)
})

app.get('/program', (req, res) => {

    let data = [
        {
            "id": 0,
            "text": "Doctorado en investigación en desarrollo social",
            "icon_class": "AntDesign",
            "icon": "laptop"
        },
        {
            "id": 1,
            "text": "Doctorado en investigación con énfasis en ciencias sociales y humanísticas",
            "icon_class": "AntDesign",
            "icon": "laptop"

        },
        {
            "id": 2,
            "text": "Doctorado en investigación con énfasis ciencias de la salud",
            "icon_class": "AntDesign",
            "icon": "laptop"
        },
        {
            "id": 3,
            "text": "Doctorado en investigación con énfasis en ciencias naturales",
            "icon_class": "AntDesign",
            "icon": "laptop"
        },
        {
            "id": 4,
            "text": "Doctorado en investigación con énfasis en tecnología",
            "icon_class": "AntDesign",
            "icon": "laptop"
        },
        {
            "id": 5,
            "text": "Doctorado en investigación con énfasis en ingeniería y ciencias aplicadas",
            "icon_class": "AntDesign",
            "icon": "laptop"
        }
    ]
    return res.status(200).json(
        data
    )
})

app.get('/plan', (req, res) => {
    let data = [
        {
            "id": 0,
            "text": "Entre semana",
            "icon_class": "EvilIcons",
            "icon": "calendar"
        },
        {
            "id": 1,
            "text": "Planes fin de semana",
            "icon_class": "EvilIcons",
            "icon": "calendar"
        },
        {
            "id": 2,
            "text": "Planes por la noche",
            "icon_class": "EvilIcons",
            "icon": "calendar"
        }
    ]
    return res.status(200).json(
        data
    )
})
app.get('/schedule/:id', (req, res) => {
    let data = [
        {
            "id": 0,
            "text": "Diario 18:00-21:00",
            "icon_class": "SimpleLineIcons",
            "icon": "clock"
        },
        {
            "id": 1,
            "text": "Diario 7:00-10:00",
            "icon_class": "SimpleLineIcons",
            "icon": "clock"
        },
        {
            "id": 2,
            "text": "Diario 9:00-12:00",
            "icon_class": "SimpleLineIcons",
            "icon": "clock"
        },
        {
            "id": 3,
            "text": "Diario 9:00-12:00",
            "icon_class": "SimpleLineIcons",
            "icon": "clock"
        },
        {
            "id": 4,
            "text": "Diario 9:00-12:00",
            "icon_class": "SimpleLineIcons",
            "icon": "clock"
        },
        {
            "id": 5,
            "text": "Diario 9:00-12:00",
            "icon_class": "SimpleLineIcons",
            "icon": "clock"
        },
        {
            "id": 6,
            "text": "Diario 9:00-12:00",
            "icon_class": "SimpleLineIcons",
            "icon": "clock"
        }
    ]
    return res.status(200).json(
        data
    )
})
app.get('/workplan/:id', (req, res) => {
    let data = [
        {
            "id": 0,
            "text": "Lunes a Viernes",
            "icon": "calendar-clock",
            "icon_class": "MaterialCommunityIcons"
        },
        {
            "id": 1,
            "text": "Martes, Miercoles y Viernes",
            "icon": "calendar-clock",
            "icon_class": "MaterialCommunityIcons"
        },
        {
            "id": 2,
            "text": "Sabados y Domingos",
            "icon": "calendar-clock",
            "icon_class": "MaterialCommunityIcons"
        },
        {
            "id": 3,
            "text": "Todos los dias",
            "icon": "calendar-clock",
            "icon_class": "MaterialCommunityIcons"
        }
    ]
    return res.status(200).json(data)
})

app.post('/register', (req, res) => {
    upload(req, res, function (err) {
        if (err) {
            console.log(err)
            return res.status(200).json({
                success: false,
                data: []
            })
        }
        // res.end("File is uploaded");
        console.log(req.body)
        return res.status(200).json({
            success: true,
            data: []
        })
    });

})
app.post('/logininfo', auth, (req, res) => {
    let data = {}
    console.log(req.body)
    if (req.body.account_id == 0) {
        data = {
            email: 'yaiza1@gmail.com',
            account_id: 125,
            name: 'Yaiza Pineda',
            account_type_name: 'candidate',
            account_type_id: 1,
            career_name: 'Maestría en Estadística Aplicada',
            document_id: '123456789'
        }
    } else {
        data = {
            email: 'yaiza1@gmail.com',
            account_id: 125,
            name: 'Yaiza Pineda',
            account_type_name: 'user',
            account_type_id: 1,
            career_name: 'Maestría en Estadística Aplicada',
            document_id: '123456789'
        }
    }

    const token = jwt.sign(
        {
            user_id: 1,
            email: 'marvin1ronal@gmail.com',
            account_id: 125,
            account_type_name: 'candidate'
        },
        process.env.TOKEN_KEY,
        {
            expiresIn: "2h",
        }
    )
    return res.status(200).json({
        success: true,
        data: {
            information: data,
            token: token
        }
    })
})
app.get('/tickets', auth, (req, res) => {
    let data = [
        {
            "no": "12181714",
            "creation_date": "26/06/2021",
            "last_date": "02/09/2021",
            "year": "2020",
            "service": "Asignación de cursos",
            "period": "Tercer Trimestre",
            "bank": "Banrural",
            "document": "1234455667",
            "payment_date": "26-08-2020",
            "amount": 1100,
            "state": 0,
            "remaining_days": 0
        },
        {
            "no": "12181714",
            "creation_date": "26/06/2021",
            "last_date": "02/09/2021",
            "year": "2020",
            "service": "Asignación de cursos",
            "period": "Tercer Trimestre",
            "bank": "Banrural",
            "document": "1234455667",
            "payment_date": "26-08-2020",
            "amount": 100,
            "state": 0,
            "remaining_days": 2
        },
        {
            "no": "12181713",
            "creation_date": "26/06/2020",
            "last_date": "02/09/2020",
            "year": "2020",
            "service": "Asignación de cursos",
            "period": "Tercer Trimestre",
            "bank": "G&T",
            "document": "1234455667",
            "payment_date": "26-08-2020",
            "amount": "300",
            "state": 1,
            "remaining_days": 7
        },
        {
            "no": "12181712",
            "creation_date": "26/06/2020",
            "last_date": "02/09/2020",
            "year": "2020",
            "service": "Asignación de cursos",
            "period": "Tercer Trimestre",
            "bank": "Credomatic",
            "document": "1234455667",
            "payment_date": "26-08-2020",
            "amount": "500",
            "state": 2,
            "remaining_days": 0
        }
    ]
    return res.status(200).json({
        success: true,
        data: data
    })
})
let status = 'assigment'
const toogleData = (nu) => {
    if (nu == 1) {
        status = 'maintenance'
    } else if (nu == 2) {
        status = 'assigment'
    }
}
app.get('/assigmentstatus', auth, (req, res) => {
    return res.status(200).json({
        success: true,
        data: status
    })
})
app.get('/assigmentinfo', auth, (req, res) => {

    return res.status(200).json({
        success: true,
        data: cursos
    })
})
app.post('/assigmentcourses', auth, (req, res) => {
    console.log(req.body)
    toogleData(2)
    cursos = {
        "period": "Primer Trimestre",
        "year": "2021",
        "start_date": "2021-01-01",
        "finish_date": "2021-01-31",
        "remaining_days": 10,
        "courses": [
            {
                "id": 0,
                "code": "COF01",
                "name": "Finanzas Industriales Corporativas",
                "section": {
                    "id": 0,
                    "section": "A",
                    "teaching": "Manuel del toro",
                    "teaching_profile_image": "https://e00-elmundo.uecdn.es/assets/multimedia/imagenes/2019/10/14/15710517464954.jpg",
                    "start_time": "07:00",
                    "finish_time": "10:00",
                    "days": [
                        {
                            name: "Lunes",
                            start: "10:00 am",
                            finish: '11:00 pm'
                        }
                    ],
                    "building": "T3",
                    "room": "303",
                    "state": "Aprobado"
                }
            },
            {
                "id": 1,
                "code": "GIM01",
                "name": "Logistica",
                "section": {
                    "id": 0,
                    "section": "A",
                    "teaching": "Ramon del toro",
                    "teaching_profile_image": "https://www.magisnet.com/wp-content/uploads/2020/11/Nivel-de-Ingles.jpg",
                    "start_time": "07:00",
                    "finish_time": "10:00",
                    "days": [
                        {
                            name: "Lunes",
                            start: "10:00 am",
                            finish: '12:00 pm'
                        }
                    ],
                    "building": "T4",
                    "room": "305"
                }
            },
            {
                "id": 2,
                "code": "GIM01",
                "name": "Logistica",
                "section": {
                    "id": 0,
                    "section": "A",
                    "teaching": "Ramon del toro",
                    "teaching_profile_image": "https://phantom-marca.unidadeditorial.es/7294c3285fbf5a5b15ae95bba788fad2/resize/1320/f/jpg/assets/multimedia/imagenes/2021/09/13/16315257504382.jpg",
                    "start_time": "07:00",
                    "finish_time": "10:00",
                    "days": [
                        {
                            name: "Lunes",
                            start: "04:00 am",
                            finish: '05:00 pm'
                        }
                    ],
                    "building": "T4",
                    "room": "305"
                }
            },
            {
                "id": 3,
                "code": "GIM01",
                "name": "Logistica",
                "section": {
                    "id": 0,
                    "section": "A",
                    "teaching": "Ramon del toro",
                    "teaching_profile_image": "https://www.elegircarrera.net/blog/wp-content/uploads/2019/01/profesor-emerito-2000x1200.jpg",
                    "start_time": "07:00",
                    "finish_time": "10:00",
                    "days": [
                        {
                            name: "Lunes",
                            start: "06:00 am",
                            finish: '07:00 pm'
                        }
                    ],
                    "building": "T4",
                    "room": "305"
                }
            }
        ]
    }
    return res.status(200).json({
        success: true,

    })
})
app.get('/assigmentcourses', auth, (req, res) => {
    let data = [
        {
            "id": 0,
            "code": "COF01",
            "name": "Finanzas Industriales Corporativas",
            "section": [
                {
                    "id": 0,
                    "section": "A",
                    "teaching": "Manuel del toro",

                    "days": [
                        {
                            name: "Lunes",
                            start: "10:00 am",
                            finish: '11:00 pm'
                        },
                        {
                            name: "Martes",
                            start: "12:00 am",
                            finish: "12:00 pm"
                        }
                    ],
                    "building": "Edificio T3",
                    "room": "Salon 303"
                },
                {
                    "id": 1,
                    "section": "A+",
                    "teaching": "Manuel del toro",

                    "days": [
                        {
                            name: "Lunes",
                            start: "13:00 am",
                            finish: '14:00 pm'
                        },
                        {
                            name: "Martes",
                            start: "04:00 am",
                            finish: '04:00 pm'
                        }
                    ],
                    "building": "Edificio II",
                    "room": "Salon 500"
                },
                {
                    "id": 2,
                    "section": "B",
                    "teaching": "Manuel del toro",

                    "days": [
                        {
                            name: "Lunes",
                            start: "05:00 am",
                            finish: '06:00 pm'
                        },
                        {
                            name: "Jueves",
                            start: "01:00 am",
                            finish: '02:00 pm'
                        }
                    ],
                    "building": "T3",
                    "room": "303"
                },
                {
                    "id": 3,
                    "section": "C",
                    "teaching": "Manuel del toro",

                    "days": [
                        {
                            name: "Lunes",
                            start: "01:00 am",
                            finish: '02:00 pm'
                        },
                        {
                            name: "Sabado",
                            start: "01:00 am",
                            finish: '02:00 pm'
                        }
                    ],
                    "building": "T3",
                    "room": "303"
                },
                {
                    "id": 4,
                    "section": "C",
                    "teaching": "Manuel Ronaldo Marcos Primero",

                    "days": [
                        {
                            name: "Lunes",
                            start: "01:00 am",
                            finish: '02:00 pm'
                        }
                    ],
                    "building": "T3",
                    "room": "303"
                }
            ]
        },
        {
            "id": 1,
            "code": "GIM01",
            "name": "Logistica",
            "section": [
                {
                    "id": 0,
                    "section": "A",
                    "teaching": "Ramon del toro",

                    "days": [
                        {
                            name: "Lunes",
                            start: "01:00 am",
                            finish: '02:00 pm'
                        }
                    ],
                    "building": "T4",
                    "room": "305"
                }
            ]
        }
    ]

    return res.status(200).json({
        success: true,
        data: data
    })
})
app.get('/userinfo', auth, (req, res) => {
    let data = {
        email: 'yaiza2@gmail.com',
        account_id: 125,
        name: 'Yaiza Pineda',
        phone: '12345678',
        cellphone: '87654321',
        account_type_name: 'user',
        account_type_id: 1,
        career_name: 'Maestría en Estadística Aplicada',
        credits: 87,
        average: 89.9,
        document_id: '123456789',
        student_card: '987654321',
        img: images.profile
    }
    return res.status(200).json({
        success: true,
        data
    })
})

app.get('/historyassigmentcourses', auth, (req, res) => {
    let data = [
        {
            "id": 0,
            "code": "COF01",
            "name": "Finanzas Industriales Corporativas",
            "section": {
                "id": 0,
                "section": "A",
                "teaching": "Manuel del toro",
                "teaching_profile_image": "https://e00-elmundo.uecdn.es/assets/multimedia/imagenes/2019/10/14/15710517464954.jpg",
                "start_time": "07:00",
                "finish_time": "10:00",
                "days": [
                    {
                        name: "Lunes",
                        start: "00:00 am",
                        finish: '00:00 pm'
                    }
                ],
                "building": "T3",
                "room": "303",
                "state": "Aprobado"
            }
        },
        {
            "id": 1,
            "code": "GIM01",
            "name": "Logistica",
            "section": {
                "id": 0,
                "section": "A",
                "teaching": "Ramon del toro",
                "teaching_profile_image": "https://www.magisnet.com/wp-content/uploads/2020/11/Nivel-de-Ingles.jpg",
                "start_time": "07:00",
                "finish_time": "10:00",
                "days": [
                    {
                        name: "Lunes",
                        start: "00:00 am",
                        finish: '00:00 pm'
                    }
                ],
                "building": "T4",
                "room": "305"
            }
        },
        {
            "id": 2,
            "code": "GIM01",
            "name": "Logistica",
            "section": {
                "id": 0,
                "section": "A",
                "teaching": "Ramon del toro",
                "teaching_profile_image": "https://phantom-marca.unidadeditorial.es/7294c3285fbf5a5b15ae95bba788fad2/resize/1320/f/jpg/assets/multimedia/imagenes/2021/09/13/16315257504382.jpg",
                "start_time": "07:00",
                "finish_time": "10:00",
                "days": [
                    {
                        name: "Lunes",
                        start: "00:00 am",
                        finish: '00:00 pm'
                    }
                ],
                "building": "T4",
                "room": "305"
            }
        },
        {
            "id": 3,
            "code": "GIM01",
            "name": "Logistica",
            "section": {
                "id": 0,
                "section": "A",
                "teaching": "Ramon del toro",
                "teaching_profile_image": "https://www.elegircarrera.net/blog/wp-content/uploads/2019/01/profesor-emerito-2000x1200.jpg",
                "start_time": "07:00",
                "finish_time": "10:00",
                "days": [
                    {
                        name: "Lunes",
                        start: "00:00 am",
                        finish: '00:00 pm'
                    }
                ],
                "building": "T4",
                "room": "305"
            }
        }
    ]
    return res.status(200).json({
        success: true,
        data
    })
})

app.get('/datahistorycourse', auth, (req, res) => {
    let data = []
    for (let i = 0; i < 12; i++) {
        let note = faker.datatype.number(100)
        let d = {
            "id": i,
            "code": `000${i}`,
            "credits": faker.datatype.number(5),
            "name": faker.vehicle.vehicle(),
            "approval_date": faker.date.past().toISOString().split('T')[0],
            "note": note,
            "teaching": faker.name.findName(),
            "teaching_profile_image": faker.random.image(),
            "state": note < 50 ? 'Rechazado' : (i % 3 == 0 ? 'Aprobado' : 'Pendiente')
        }
        data.push(d)
    }
    console.log(data)
    return res.status(200).json({
        success: true,
        data
    })
})



app.get('/questions', (req, res) => {
    let data = [
        {
            "type": "Inscripciones",
            "questions": [
                {
                    "title": "¿Quiénes son considerados estudiantes de primer ingreso?",
                    "answer": "Son aquellas personas que por primera vez ingresan a la Universidad. Artículo 10º. Del Reglamento de Administración Estudiantil.",
                    link: 'https://www.npmjs.com/package/react-native-crypto-aes-cbc'
                },
                {
                    "title": "¿Qué es la inscripción?",
                    "answer": "De acuerdo al artículo 14 del Reglamento de Administración Estudiantil, consiste en la admisión legal del solicitante al haber cumplido con los requisitos de ley. Este proceso se realiza en el Departamento de Registro y Estadística con todos los requisitos establecidos. En el caso de los Centros Universitarios, Escuelas de Enfermería e Institutos Tecnológicos el Departamento de Registro y Estadística recibe y revisa los expedientes junto con boleta bancaria y tarjeta CIDPI, verificando que cuenten con los documentos necesarios para ser inscritos. Sí procede, realiza inscripción y devuelve las boletas bancarias selladas y firmadas. Sí no procede informa a la unidad académica sobre la situación particular de cada expediente.",
                    link: 'https://www.npmjs.com/package/react-native-crypto-aes-cbc'
                }
            ]
        },
        {
            "type": "Requisitos",
            "questions": [
                {
                    "title": "¿Cuáles son los requisitos de inscripción?",
                    "answer": "Una fotografía tamaño cédula Tarjeta de Orientación Vocacional Constancia original de pruebas de conocimientos básicos y específicos. Solicitud de ingreso impresa (debe llenarla el interesado vía internet) Fotostática del título en 5”x 7 “ de estudio fotográfico. Cierre de pensum con firmas y sellos en original (sólo para estudiantes de reciente graduación). Certificación general de estudios con firmas y sellos en original Certificación de la partida de nacimiento extendida por RENAP.",
                    link: 'https://www.npmjs.com/package/react-native-crypto-aes-cbc'
                },
                {
                    "title": "¿Quiénes están exonerados de las pruebas de conocimientos básicos y específicos?",
                    "answer": "-Los profesionales graduados en cualquier universidad de Guatemala, que cuenten como mínimo con el grado académico de licenciatura.",
                    link: 'https://www.npmjs.com/package/react-native-crypto-aes-cbc',
                }
            ]
        },
        {
            "type": "Solicitudes",
            "questions": [
                {
                    "title": "¿Qué es la solicitud de ingreso?",
                    "answer": "Es el procedimiento mediante el cual el aspirante selecciona la carrera que desea estudiar, llenando los datos solicitados en la página www.registro.usac.edu.gt opción primer ingreso, Solicitud de Ingreso, la cual le asigna la fecha y lugar de preinscripción.",
                    link: 'https://www.npmjs.com/package/react-native-crypto-aes-cbc'
                },
                {
                    "title": "¿Qué sucede si un aspirante escoge una carrera diferente a la que desea?",
                    "answer": "Tacha con una línea lo impreso, escribe lo correcto a lapicero y lo firma, siempre y cuando la carrera sea impartida para primer ingreso.",
                    link: 'https://www.npmjs.com/package/react-native-crypto-aes-cbc',
                }
            ]
        },
        {
            "type": "Inscripciones",
            "questions": [
                {
                    "title": "¿Quiénes son considerados estudiantes de primer ingreso?",
                    "answer": "Son aquellas personas que por primera vez ingresan a la Universidad. Artículo 10º. Del Reglamento de Administración Estudiantil."
                },
                {
                    "title": "¿Qué es la inscripción?",
                    "answer": "De acuerdo al artículo 14 del Reglamento de Administración Estudiantil, consiste en la admisión legal del solicitante al haber cumplido con los requisitos de ley. Este proceso se realiza en el Departamento de Registro y Estadística con todos los requisitos establecidos. En el caso de los Centros Universitarios, Escuelas de Enfermería e Institutos Tecnológicos el Departamento de Registro y Estadística recibe y revisa los expedientes junto con boleta bancaria y tarjeta CIDPI, verificando que cuenten con los documentos necesarios para ser inscritos. Sí procede, realiza inscripción y devuelve las boletas bancarias selladas y firmadas. Sí no procede informa a la unidad académica sobre la situación particular de cada expediente."
                }
            ]
        },
        {
            "type": "Requisitos",
            "questions": [
                {
                    "title": "¿Cuáles son los requisitos de inscripción?",
                    "answer": "Una fotografía tamaño cédula Tarjeta de Orientación Vocacional Constancia original de pruebas de conocimientos básicos y específicos. Solicitud de ingreso impresa (debe llenarla el interesado vía internet) Fotostática del título en 5”x 7 “ de estudio fotográfico. Cierre de pensum con firmas y sellos en original (sólo para estudiantes de reciente graduación). Certificación general de estudios con firmas y sellos en original Certificación de la partida de nacimiento extendida por RENAP."
                },
                {
                    "title": "¿Quiénes están exonerados de las pruebas de conocimientos básicos y específicos?",
                    "answer": "-Los profesionales graduados en cualquier universidad de Guatemala, que cuenten como mínimo con el grado académico de licenciatura."
                }
            ]
        },
        {
            "type": "Solicitudes",
            "questions": [
                {
                    "title": "¿Qué es la solicitud de ingreso?",
                    "answer": "Es el procedimiento mediante el cual el aspirante selecciona la carrera que desea estudiar, llenando los datos solicitados en la página www.registro.usac.edu.gt opción primer ingreso, Solicitud de Ingreso, la cual le asigna la fecha y lugar de preinscripción."
                },
                {
                    "title": "¿Qué sucede si un aspirante escoge una carrera diferente a la que desea?",
                    "answer": "Tacha con una línea lo impreso, escribe lo correcto a lapicero y lo firma, siempre y cuando la carrera sea impartida para primer ingreso."
                }
            ]
        },
        {
            "type": "Inscripciones",
            "questions": [
                {
                    "title": "¿Quiénes son considerados estudiantes de primer ingreso?",
                    "answer": "Son aquellas personas que por primera vez ingresan a la Universidad. Artículo 10º. Del Reglamento de Administración Estudiantil."
                },
                {
                    "title": "¿Qué es la inscripción?",
                    "answer": "De acuerdo al artículo 14 del Reglamento de Administración Estudiantil, consiste en la admisión legal del solicitante al haber cumplido con los requisitos de ley. Este proceso se realiza en el Departamento de Registro y Estadística con todos los requisitos establecidos. En el caso de los Centros Universitarios, Escuelas de Enfermería e Institutos Tecnológicos el Departamento de Registro y Estadística recibe y revisa los expedientes junto con boleta bancaria y tarjeta CIDPI, verificando que cuenten con los documentos necesarios para ser inscritos. Sí procede, realiza inscripción y devuelve las boletas bancarias selladas y firmadas. Sí no procede informa a la unidad académica sobre la situación particular de cada expediente."
                }
            ]
        },
        {
            "type": "Requisitos",
            "questions": [
                {
                    "title": "¿Cuáles son los requisitos de inscripción?",
                    "answer": "Una fotografía tamaño cédula Tarjeta de Orientación Vocacional Constancia original de pruebas de conocimientos básicos y específicos. Solicitud de ingreso impresa (debe llenarla el interesado vía internet) Fotostática del título en 5”x 7 “ de estudio fotográfico. Cierre de pensum con firmas y sellos en original (sólo para estudiantes de reciente graduación). Certificación general de estudios con firmas y sellos en original Certificación de la partida de nacimiento extendida por RENAP."
                },
                {
                    "title": "¿Quiénes están exonerados de las pruebas de conocimientos básicos y específicos?",
                    "answer": "-Los profesionales graduados en cualquier universidad de Guatemala, que cuenten como mínimo con el grado académico de licenciatura."
                }
            ]
        },
        {
            "type": "Solicitudes",
            "questions": [
                {
                    "title": "¿Qué es la solicitud de ingreso?",
                    "answer": "Es el procedimiento mediante el cual el aspirante selecciona la carrera que desea estudiar, llenando los datos solicitados en la página www.registro.usac.edu.gt opción primer ingreso, Solicitud de Ingreso, la cual le asigna la fecha y lugar de preinscripción."
                },
                {
                    "title": "¿Qué sucede si un aspirante escoge una carrera diferente a la que desea?",
                    "answer": "Tacha con una línea lo impreso, escribe lo correcto a lapicero y lo firma, siempre y cuando la carrera sea impartida para primer ingreso."
                }
            ]
        },
        {
            "type": "Inscripciones",
            "questions": [
                {
                    "title": "¿Quiénes son considerados estudiantes de primer ingreso?",
                    "answer": "Son aquellas personas que por primera vez ingresan a la Universidad. Artículo 10º. Del Reglamento de Administración Estudiantil."
                },
                {
                    "title": "¿Qué es la inscripción?",
                    "answer": "De acuerdo al artículo 14 del Reglamento de Administración Estudiantil, consiste en la admisión legal del solicitante al haber cumplido con los requisitos de ley. Este proceso se realiza en el Departamento de Registro y Estadística con todos los requisitos establecidos. En el caso de los Centros Universitarios, Escuelas de Enfermería e Institutos Tecnológicos el Departamento de Registro y Estadística recibe y revisa los expedientes junto con boleta bancaria y tarjeta CIDPI, verificando que cuenten con los documentos necesarios para ser inscritos. Sí procede, realiza inscripción y devuelve las boletas bancarias selladas y firmadas. Sí no procede informa a la unidad académica sobre la situación particular de cada expediente."
                }
            ]
        },
        {
            "type": "Requisitos",
            "questions": [
                {
                    "title": "¿Cuáles son los requisitos de inscripción?",
                    "answer": "Una fotografía tamaño cédula Tarjeta de Orientación Vocacional Constancia original de pruebas de conocimientos básicos y específicos. Solicitud de ingreso impresa (debe llenarla el interesado vía internet) Fotostática del título en 5”x 7 “ de estudio fotográfico. Cierre de pensum con firmas y sellos en original (sólo para estudiantes de reciente graduación). Certificación general de estudios con firmas y sellos en original Certificación de la partida de nacimiento extendida por RENAP."
                },
                {
                    "title": "¿Quiénes están exonerados de las pruebas de conocimientos básicos y específicos?",
                    "answer": "-Los profesionales graduados en cualquier universidad de Guatemala, que cuenten como mínimo con el grado académico de licenciatura."
                }
            ]
        },
        {
            "type": "Solicitudes",
            "questions": [
                {
                    "title": "¿Qué es la solicitud de ingreso?",
                    "answer": "Es el procedimiento mediante el cual el aspirante selecciona la carrera que desea estudiar, llenando los datos solicitados en la página www.registro.usac.edu.gt opción primer ingreso, Solicitud de Ingreso, la cual le asigna la fecha y lugar de preinscripción."
                },
                {
                    "title": "¿Qué sucede si un aspirante escoge una carrera diferente a la que desea?",
                    "answer": "Tacha con una línea lo impreso, escribe lo correcto a lapicero y lo firma, siempre y cuando la carrera sea impartida para primer ingreso."
                }
            ]
        }
    ]
    return res.status(200).json({
        success: true,
        data
    })
})

app.get('/normatives', (req, res) => {
    let data = [
        {
            name: 'Normativo de la Escuela de Estudios de Postgrado',
            description: 'Acta No. 4 - 2014',
            uri: 'https://postgrado.ingenieria.usac.edu.gt/wp-content/uploads/2021/06/normativo-de-Escuela-de-Postgrado-aprobado-por-Junta.pdf'
        },
        {
            name: 'Normativo de la Escuela de Estudios de Postgrado',
            description: 'Acta No. 4 - 2014',
            uri: 'https://postgrado.ingenieria.usac.edu.gt/wp-content/uploads/2021/06/normativo-aprobado-por-Junta-trabajos-de-tesis.pdf'
        },
        {
            name: 'Normativo de la Escuela de Estudios de Postgrado',
            description: 'Acta No. 4 - 2014',
            uri: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'
        }

    ]
    return res.status(200).json({
        success: true,
        data
    })
})

app.get('/categorydocuments', (req, res) => {
    let data = [
        {
            "id": 0,
            "text": "Programas de Maestría 2021",
            "icon": "inbox",
            "icon_color": "black",
            "text_color": "black",
            "icon_class": "AntDesign"
        },
        {
            "id": 1,
            "text": "Programas de Maestría 2022",
            "icon": "inbox",
            "icon_color": "black",
            "text_color": "black",
            "icon_class": "AntDesign"
        },
        {
            id: 2,
            text: 'Programas de Especialización',
            "icon": "windows",
            "icon_color": "black",
            "text_color": "black",
            "icon_class": "AntDesign"
        }
    ]
    return res.status(200).json({
        success: true,
        data
    })
})
app.get('/documents/:category_id', (req, res) => {
    let data = [
        {
            "id": 0,
            "text": "Maestría en Gestión Industrial",
            "icon": "paperclip",
            "icon_color": "#091353",
            "text_color": "black",
            "icon_class": "AntDesign",
            'type': 'tab'
        },
        {
            "id": 1,
            "text": "Ingeniería para el Desarrollo Municipal",
            "icon": "paperclip",
            "icon_color": "#091353",
            "text_color": "black",
            "icon_class": "AntDesign",
            'type': 'tab'
        },
        {
            id: 2,
            text: 'Energía y Ambiente',
            "icon": "paperclip",
            "icon_color": "#091353",
            "text_color": "black",
            "icon_class": "AntDesign",
            type: 'tab'
        }
    ]
    return res.status(200).json({
        success: true,
        data
    })
})

app.post('/recoverpassword', (req, res) => {
    if (req.body.user_id == '1') {
        return res.status(200).json({
            success: true
        })
    }
    return res.status(200).json({
        success: false
    })
})
app.get('/documents/tab/:id', (req, res) => {
    let data = [
        {
            name: 'Primer trimestre',
            documents: [
                {
                    "id": 0,
                    "text": "Finanzas industriales corporativa",
                    "icon": "inbox",
                    "icon_color": "#091353",
                    "text_color": "black",
                    "icon_class": "AntDesign",
                    uri: 'https://postgrado.ingenieria.usac.edu.gt/wp-content/uploads/2019/06/COF01.pdf'
                },
                {
                    "id": 1,
                    "text": "Logística",
                    "icon": "inbox",
                    "icon_color": "#091353",
                    "text_color": "black",
                    "icon_class": "AntDesign",
                    uri: 'https://postgrado.ingenieria.usac.edu.gt/wp-content/uploads/2019/06/GIM01.pdf'
                }
            ]
        },
        {
            name: 'Segundo trimestre',
            documents: [
                {
                    "id": 0,
                    "text": "Seminario I: Metodología de la investigacióna",
                    "icon": "inbox",
                    "icon_color": "#091353",
                    "text_color": "black",
                    "icon_class": "AntDesign",
                    uri: 'https://postgrado.ingenieria.usac.edu.gt/wp-content/uploads/2019/06/COF01.pdf'
                },
                {
                    "id": 1,
                    "text": "Desarrollo Humano en la Industria",
                    "icon": "inbox",
                    "icon_color": "#091353",
                    "text_color": "black",
                    "icon_class": "AntDesign",
                    uri: 'https://postgrado.ingenieria.usac.edu.gt/wp-content/uploads/2019/06/GIM01.pdf'
                }
            ]
        },
        {
            name: 'Tercer trimestre',
            documents: [
                {
                    "id": 0,
                    "text": "Seminario I: Metodología de la investigacióna",
                    "icon": "inbox",
                    "icon_color": "#091353",
                    "text_color": "black",
                    "icon_class": "AntDesign",
                    uri: 'https://postgrado.ingenieria.usac.edu.gt/wp-content/uploads/2019/06/COF01.pdf'
                },
                {
                    "id": 1,
                    "text": "Desarrollo Humano en la Industria",
                    "icon": "inbox",
                    "icon_color": "#091353",
                    "text_color": "black",
                    "icon_class": "AntDesign",
                    uri: 'https://postgrado.ingenieria.usac.edu.gt/wp-content/uploads/2019/06/GIM01.pdf'
                }
            ]
        },
        {
            name: 'Cuarto trimestre',
            documents: [
                {
                    "id": 0,
                    "text": "Seminario I: Metodología de la investigacióna",
                    "icon": "inbox",
                    "icon_color": "#091353",
                    "text_color": "black",
                    "icon_class": "AntDesign",
                    uri: 'https://postgrado.ingenieria.usac.edu.gt/wp-content/uploads/2019/06/COF01.pdf'
                },
                {
                    "id": 1,
                    "text": "Desarrollo Humano en la Industria",
                    "icon": "inbox",
                    "icon_color": "#091353",
                    "text_color": "black",
                    "icon_class": "AntDesign",
                    uri: 'https://postgrado.ingenieria.usac.edu.gt/wp-content/uploads/2019/06/GIM01.pdf'
                }
            ]
        }

    ]
    return res.status(200).json({
        success: true,
        data
    })
})
app.post('/changemaintenance', (req, res) => {
    status = 'maintenance'
    return res.status(200).json({
        success: true,
    })
})

app.post('/changeassigment', (req, res) => {
    status = 'assigment'
    cursos = null
    return res.status(200).json({
        success: true,
    })
})

app.get('/candidateinfo', auth, (req, res) => {
    let data = {
        email: 'yaiza2@gmail.com',
        account_id: 125,
        name: 'Yaiza Pineda',
        first_name: 'Yaiza',
        second_name: 'Estefania',
        first_lastname: 'Pineda',
        second_lastname: 'Gonzalez',
        phone: '12345678',
        cellphone: '12345678',
        account_type_name: 'candidate',
        academic_id: '123456667',
        account_type_id: 2,
        career_name: 'Maestría en Estadística Aplicada',
        document_id: '123456789',
        address: 'Calle 3-36 11 Zona 10, Ciudad de Guatemala 01010 Guatemala',
        birthday: new Date(),
        nationality_id: 1,
        nationality_name: 'Guatemala',
        gender: 1,
        img: images.profile
    }
    return res.status(200).json({
        success: true,
        data: [data]
    })
})
const fs = require('fs')
var assetlinks = fs.readFileSync(__dirname + '/static/assetlinks.json');
app.get('/.well-known/assetlinks.json', function (req, res, next) {
    res.set('Content-Type', 'application/json');
    res.status(200).send(assetlinks);
});

app.get('/registerstatus', (req, res) => {
    return res.status(200).json({
        success: true,
        data: true
    })
})

// app.get('/getrequeststeps', auth, (req, res) => {
//     let data = [
//         {
//             id: 0,
//             stage: 'Solicitud de Admisión',
//             status: 'progress'
//         },
//         {
//             id: 1,
//             stage: 'Evaluación Diagnóstica',
//             status: 'on_hold',
//         }
//     ]
//     return res.status(200).json({
//         success: true,
//         data
//     })
// })
app.get('/getnationalities', auth, (req, res) => {
    let data = [
        {
            "id": 0,
            "text": "Australia",
            "image": "data:image/png;base64,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"
        },
        {
            "id": 1,
            "text": "Belgica",
            "image": "data:image/jpeg;base64,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"
        },
        {
            id: 2,
            text: 'Belice',
            image: "data:image/png;base64,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"
        },
        {
            id: 3,
            text: 'Bolivia',
            image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/Bandera_de_Bolivia_%28Estado%29.svg/2560px-Bandera_de_Bolivia_%28Estado%29.svg.png'
        },
        {
            id: 4,
            text: 'Brasil',
            image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Flag_of_Brazil.svg/1200px-Flag_of_Brazil.svg.png'
        },
        {
            id: 5,
            text: 'Canada',
            image: 'data:image/png;base64,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'
        },
        {
            id: 6,
            text: 'Checoslovaquia',
            image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAARMAAAC3CAMAAAAGjUrGAAAAnFBMVEX////XFBoRRX7VAADsp6gARoDZExgAM3UAR4MAP3vcERMAPXreEBAAQHvgDgkAL3MANXaYK0rEzdppgaT2+Pq7xdRhe6AAOHjr7vPEGyrHGifMGCKgKUXQFh6nJkD5+vy0v9BVcppLapWotcierMJAYpA7P3OPLU9DPnBLPW6aKklVO2pcOmd1i6tkfaE+YY/Pl5+IMFOSLE1mOGQRt88zAAAEMUlEQVR4nO3WiXoSMRiF4TnR2EFaqWvdrVttte73f2+GghSYAWZJ8m85VzC8z/fkp/pelW1v6h9RfwK7OTd7/I76I5jNOTedlFQ25uYrqWzsxqSksjG3XEnldv9NSiq3c7crqSy3ZlJSWc5trKQy36aJm05LKtsmJZWqxaSk0mJSUmkzCQfoKfV3Ua7VJKTyw3AqO0xMp7LLxHIqu03CATKayh6TeSpPqL+PYntNjKay38RmKodMLKZy0CSk8sxYKh1M3PTMVipdTKyl0s3EViodTUyl0tnEUCrdTeyk0sfESiq9TIyk0tPETc7OqT85+fqaOHekPpX+Jm5yek791Wk3wCS8Ku9VpzLIRPmrMsxEdypDTTSnMtgkHCCtqYwwUZvKGBOtqYwz0flfZaSJylRGmyh8Vcab6Eslhom2VKKYKEslkomqAxTLRFMq8Uzc5Oic+tfEWUSTeSrPqX9PjEU1UfKqxDXRkUpsEw2pRDcJqXwQnkoCk3CAPlL/rFFLYTJPRfJ/lTQmslNJZCL6VUlmEg6Q1FTSmchNJaWJ1FSSmghNJbGJyAOU2kRiKulN5KWSwURcKllMhKWSx0RWKrlMJKWSzcS5UympZDRxJzMZqeQ0kfKq5DWRkUpmExGpZDdxJ+wPUH6TcIA+806FwoR7KiQmzFMhMgkH6BP1T985KhPOqdCZ8E2F0IRtKqQm4QBxTIXWJKTyk18q1CYcU6EmcQxfFWqQ+bgdIGqPxXilQq2x3Mns110uY2JSX7y4w2YsTHz9+/ge2IyDSYjkmNphffQmIZIHjCIBAxNukYDcxHtukYDahGEkoDXh95IsRmhSX7xkGAkITZj9J1kflQnbSEBl4v0Xli/JYiQmnCMBiQnvSEBhUl+yjgT5TXzNPBJkN+EfCTKbhEi4/idZX04TEZEgpwn7c7NaNhMpkSCbiZxIkMtEUCTIYyIqEmQxkRUJMph4/0dUJEhvIi4SpDYRGAkSm0iMBElNZEaClCZCI0E6E7GRIJlJffVKaCRIZCI5EqQxqS8FR4IUJsIjQQIT0S/JYpFNvH8oPBLENlEQCeKaqIgEUU1CJPepf06URTPREgnimaiJBLFMFEWCSCaaIkEUE12RIIaJskgw3sT7r7oiwWiT+uqNskgw0kRjJBhnojISjDFRGglGmGiNBINN9EaCoSb1N7WRYJiJ6kgwyER3JBhgoj0S9DdRHwn6mnj/Wnsk6GliIRL0MrERCfqYGIkE3U3MRILOJnYiQUcTS5Ggm4mpSNDFxFgk6GBiLRIcNLEXCQ6Z1NfmIsF+E5ORYK9JfQ2DkWCPidVIsNvE4LlZrd3EcCTYYWLz3KzWYuL9W8ORoM3E7LlZbdvEfCRomJRIsGVSIrlZVSJprCqRNFaVSBqrSiSNVSWSxqoSSWNViaSxyrsSydaqvyWS7f0DFS/bLFlOg54AAAAASUVORK5CYII="
        },
        {
            id: 7,
            text: 'Chile',
            image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Flag_of_Chile.svg/1200px-Flag_of_Chile.svg.png',
        },
        {
            id: 8,
            text: 'China',
            image: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAARMAAAC3CAMAAAAGjUrGAAAAjVBMVEXuHCX//wDtACb70QzuACXuFSXuDSb//QD+7wX2nRf96wb/+wD83Avzbh3wRyHvMyP5uxL4rxT3pBbyYR795gj5wRHxTCDwPyLvKCT1ixn2lBj6yg/3qRX84QryZh7+8wP71Q30fRvxWh/0gxrzdhz5vhHwQSH4sxL1kxj1iRf0ehvxVB/yah74sRT6zA8qZd79AAAEoklEQVR4nO3c61biMBQFYLJpQqGFAuVSRCwigg4zvv/jTW9UFISmo0Mb9vfPJbjaQ05OehJpNIiIiIjoxqlrX0D1YO3La19DVWTDQ03ElDFJBTMLUSyU57SufSmVgYEYeFCqI0Lr2tdSGVYoxJu/FKKDa19KZaiuSC0ZkxyaaUwWU5hejgsXERlkA0U0uzB6rMhe0VfCFzm77f3kRV0Z+qtiI0VtDkIyvpsYvEhBOCiUBzIIs4A8rz0ABodE7orVVhktTERr7kYx2ZkcjxjuhSiSBrI/f90AXhSTnuEhacAW4r7IQEnTBUPhBIbHRMYT50ijsFq2Y3hI4s9dLxtU1zF6aRLBKI7JUOM2ofPiOpLTpLrqJM/Hda+BeYR2uuQoW0qCjXlPPlikMWmXzAe12AdFmTJipJctTRclYwLX8eKgKDyY0qTF3f4BpmSLFVsRBkrBXxpToeHuY3JXbqDE81Eo/ejPPBlSjfLUEcItd0tJ762lW7mqDC/vT//lkgf7NlPXlPrznjpCvJT4oIH1qNYtWhwL3kMSJc+x85+9wmMnf7dVyyl26zY/OxgmQhz9duk+nQuKWoeHIa1lUORWaLpQSrzNejjvtLIXL2sZFHQdnYi43qU5Qqoov+KHA9uOg1LLWRbBsnhIhsUajEkx9uCtZs/DWgZF7h/5Lgr9goUkfrDuIx0yP3vxPwYru0hI3oqfu5FC1L0XqdT4ckheNBrzsItthVQani5EpNPTuUksf+pC/yd4o3Mh6Vtac6Xc1DxzUjLe0/lKVzcTjAhJBA9fLFXcoP6TQ1loNE+FpG36rudZ6J4ISet2B0kMJ0uyMV2QUqzWqZiMb3mgqFOpI4Rzy6c88Xy67jzccPLgi1rcL5E8hpQq9XA6JCLUHyfq1YxJCP2DOLTfDn7wtYOCkf57quggdcIJMPuX5JGlEq5y1Oq9+sZPfOjlDXhbt/KoRyFMqFbI29VZG1pZeTKtNBMhXvz9St5T77kW2S7EYpqPeqyzRdyfwokg002g6G81ActqeHU+Wa126e0PDjsl8Fy95JH+n+22P54nbwodRyzrHBMMksn198cRIdPjfmJXNHlkflAjG2B1Th7EM2rzuFMCP86p4u1VeAd7I4+1Lj5yIuLzJic+VSXnWv/FJTHLZiG9Hm714F7Yk9O3IOOlyk4jB/YN77qfD0U4/roNjZ7W3sS+DaO9rKkW2Zudu2lltTVWKCqagRy31DNBpcgLl68xTGRU1UfJScGb7kZ9EJXvbTRZw1vUfoP022CRPhxEa5uz53duSZDXLwRXvZAqYcJkGIgj2LLGfIK2zZhkvCA5L4vfZc+hGyiwxytAeY5oMiYZ5UePv+1gJMScMdnLN0CM6NN/Eytr47o7o7+tQIvKv+uj0/YYlYT88H8cOq0nc1n5zlj49jK99tVUAub7vcOd5ISSSM7qd+Ke2pp1J6XWojnrQTq3furtgFw14oTBuva912+UTSDRrFLwO6luR1SQWYU/w6PJ30JWkjHfYEFERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERETf5C/QrSo8U1FI+AAAAABJRU5ErkJggg=='
        },
        {
            id: 9,
            text: "Guatemala",
            image: 'data:image/png;base64,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'
        }
    ]
    return res.status(200).json({
        success: true,
        data
    })
})

app.get('/getuniversity', auth, (req, res) => {
    let data = [
        {
            "id": 0,
            "text": "Otro..",
            "icon": "dots-three-horizontal",
            "icon_class": "Entypo"
        },
        {
            "id": 1,
            "text": "Universidad de San Carlos de Guatemala",
            "image": "https://upload.wikimedia.org/wikipedia/commons/4/4a/Usac_logo.png"
        },
        {
            id: 2,
            text: 'Universidad Rafael Landivar',
            image: "https://images.credly.com/images/9bb87d88-3c51-485c-86d9-5a3493d8514e/blob.png"
        },
        {
            id: 3,
            text: 'Universidad del Valle de Guatemala',
            image: 'https://upload.wikimedia.org/wikipedia/commons/9/93/Uvg_logo.jpg',
        },
        {
            id: 4,
            text: 'Universidad Mariano Galvez de Guatemala',
            image: 'https://fjvillatoro.files.wordpress.com/2011/03/logo_umg_juvenil_peque.jpg?w=636'
        },
        {
            id: 5,
            text: 'Universidad Rural de Guatemala',
            image: 'data:image/jpeg;base64,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'
        },
        {
            id: 6,
            text: 'Universidad del Istmo',
            image: "data:image/png;base64,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"
        },
        {
            id: 7,
            text: 'Universidad Panamericana',
            image: 'https://www.upana.edu.gt/wp-content/uploads/2020/01/Logo-UPANA-Corregido-01.png',
        },
        {
            id: 8,
            text: 'Unidad Mesoamericana',
            image: 'data:image/jpeg;base64,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'
        },
        {
            id: 9,
            text: "Universidad Galileo",
            image: 'data:image/jpeg;base64,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'
        }
    ]
    return res.status(200).json({
        success: true,
        data
    })
})
app.get('/carrerasfiusac', auth, (req, res) => {
    let data = [{
        "id": 0,
        "text": 'Ingeniería Amiental',
        "icon": "graduation-cap",
        "icon_color": "black",
        "text_color": "black",
        "icon_class": "Entypo"
    },
    {
        "id": 1,
        "text": 'Ingeniería Civil',
        "icon": "graduation-cap",
        "icon_color": "black",
        "text_color": "black",
        "icon_class": "Entypo"
    },
    {
        "id": 2,
        "text": 'Ingeniería Eléctrica',
        "icon": "graduation-cap",
        "icon_color": "black",
        "text_color": "black",
        "icon_class": "Entypo"
    },
    {
        "id": 3,
        "text": 'Ingeniería en Ciencias y Sistemas',
        "icon": "graduation-cap",
        "icon_color": "black",
        "text_color": "black",
        "icon_class": "Entypo"
    },
    {
        "id": 4,
        "text": 'Industrial',
        "icon": "graduation-cap",
        "icon_color": "black",
        "text_color": "black",
        "icon_class": "Entypo"
    },
    {
        "id": 5,
        "text": 'Ingeniería Mecánica',
        "icon": "graduation-cap",
        "icon_color": "black",
        "text_color": "black",
        "icon_class": "Entypo"
    }
    ]
    return res.status(200).json({
        success: true,
        data
    })
})

app.get('/schools', auth, (req, res) => {
    let data = [{
        "id": 0,
        "text": 'Escuela ingenieria mecanica industrial',
        "icon": "graduation-cap",
        "icon_color": "black",
        "text_color": "black",
        "icon_class": "Entypo"
    },
    {
        "id": 1,
        "text": 'Escuela de ingenieria quimica',
        "icon": "graduation-cap",
        "icon_color": "black",
        "text_color": "black",
        "icon_class": "Entypo"
    },
    {
        "id": 2,
        "text": 'Escuela de ingenieria en sistemas',
        "icon": "graduation-cap",
        "icon_color": "black",
        "text_color": "black",
        "icon_class": "Entypo"
    },
    {
        "id": 3,
        "text": 'Escuela de ingenieria mecanica electrica',
        "icon": "graduation-cap",
        "icon_color": "black",
        "text_color": "black",
        "icon_class": "Entypo"
    },
    {
        "id": 4,
        "text": 'Escuela de ingenieria civil',
        "icon": "graduation-cap",
        "icon_color": "black",
        "text_color": "black",
        "icon_class": "Entypo"
    },
    {
        "id": 5,
        "text": 'Escuela de ingenieria mecanica',
        "icon": "graduation-cap",
        "icon_color": "black",
        "text_color": "black",
        "icon_class": "Entypo"
    }
    ]
    return res.status(200).json({
        success: true,
        data
    })
})
app.get('/degrees', auth, (req, res) => {
    let data = []
    for (let i = 0; i < 30; i++) {
        data.push({
            "id": i,
            "text": faker.vehicle.model(),
            "icon": "bookmark",
            "icon_color": "black",
            "text_color": "black",
            "icon_class": "Feather"
        })
    }
    return res.status(200).json({
        success: true,
        data
    })
})
app.get('/candidate/closureuniversitycareers/:id', auth, (req, res) => {
    let data = []
    for (let i = 0; i < 30; i++) {
        data.push({
            "id": i,
            "text": faker.company.companyName(),
            "icon": "bookmark",
            "icon_color": "black",
            "text_color": "black",
            "icon_class": "Feather"
        })
    }
    return res.status(200).json({
        success: true,
        data
    })
})
app.get('/candidate/workprogram', auth, (req, res) => {
    let data = [
        {
            "id": 0,
            "text": 'Administrativo',
            "icon": "bookmark",
            "icon_color": "black",
            "text_color": "black",
            "icon_class": "Feather"
        },
        {
            "id": 1,
            "text": 'Profesor Interino',
            "icon": "bookmark",
            "icon_color": "black",
            "text_color": "black",
            "icon_class": "Feather"
        },
        {
            "id": 2,
            "text": 'Profesor Titular',
            "icon": "bookmark",
            "icon_color": "black",
            "text_color": "black",
            "icon_class": "Feather"
        },

    ]
    return res.status(200).json({
        success: true,
        data
    })
})
app.get('/candidate/workfaculty', auth, (req, res) => {
    let data = [
        {
            "id": 0,
            "text": 'Coordinadora general del sistema de estudios de postgrado',
            "icon": "bookmark",
            "icon_color": "black",
            "text_color": "black",
            "icon_class": "Feather"
        },
        {
            "id": 1,
            "text": 'Escuela de Ciencia Politica',
            "icon": "bookmark",
            "icon_color": "black",
            "text_color": "black",
            "icon_class": "Feather"
        },
        {
            "id": 2,
            "text": 'Esuela de Ciencia Politica',
            "icon": "bookmark",
            "icon_color": "black",
            "text_color": "black",
            "icon_class": "Feather"
        },
        {
            "id": 3,
            "text": 'Escuela de Ciencias de la Comunicacion',
            "icon": "bookmark",
            "icon_color": "black",
            "text_color": "black",
            "icon_class": "Feather"
        },
        {
            "id": 4,
            "text": 'Escuela de Ciencias Fisicas y Matematicas',
            "icon": "bookmark",
            "icon_color": "black",
            "text_color": "black",
            "icon_class": "Feather"
        },
        {
            "id": 5,
            "text": 'Escuela de Ciencias linguisticas',
            "icon": "bookmark",
            "icon_color": "black",
            "text_color": "black",
            "icon_class": "Feather"
        },
        {
            "id": 6,
            "text": 'Escuela de ciencias psicologicas',
            "icon": "bookmark",
            "icon_color": "black",
            "text_color": "black",
            "icon_class": "Feather"
        },
        {
            "id": 7,
            "text": 'Escuela de Formacion de profesores de enseñanza media',
            "icon": "bookmark",
            "icon_color": "black",
            "text_color": "black",
            "icon_class": "Feather"
        },
        {
            "id": 8,
            "text": 'Esuela de Historia',
            "icon": "bookmark",
            "icon_color": "black",
            "text_color": "black",
            "icon_class": "Feather"
        },
    ]
    return res.status(200).json({
        success: true,
        data
    })
})

app.get('/candidate/workcampus', auth, (req, res) => {
    let data = [
        {
            "id": 0,
            "text": "Sede Central",
            "icon": "camera",
            "icon_color": "#091353",
            "text_color": "black",
            "icon_class": "EvilIcons"
        },
        {
            "id": 1,
            "image": "https://upload.wikimedia.org/wikipedia/commons/d/df/Logo_UNIR.png",
            "text": "Sede UNIR"
        },
        {
            "id": 2,
            "text": 'Agexport',
            "icon": "bookmark",
            "icon_class": "Feather"
        },
        {
            "id": 3,
            "text": 'Centro universitario de Peten',
            "icon": "bookmark",
            "icon_class": "Feather"
        },
    ]
    return res.status(200).json({
        success: true,
        data
    })
})

app.get('/candidate/userinfosummary', auth, (req, res) => {
    let data = {

    }
})


app.get('/candidate/planlist', (req, res) => {
    let data = [
        {
            "id": 0,
            "text": "Entre semana",
            "icon_class": "EvilIcons",
            "icon": "calendar"
        },
        {
            "id": 1,
            "text": "Planes fin de semana",
            "icon_class": "EvilIcons",
            "icon": "calendar"
        },
        {
            "id": 2,
            "text": "Planes por la noche",
            "icon_class": "EvilIcons",
            "icon": "calendar"
        }
    ]
    return res.status(200).json({
        success: true,
        data
    })
})
app.get('/candidate/workplan', (req, res) => {
    let data = [
        {
            "id": 0,
            "text": "Lunes a Viernes",
            "icon": "calendar-clock",
            "icon_class": "MaterialCommunityIcons"
        },
        {
            "id": 1,
            "text": "Martes, Miercoles y Viernes",
            "icon": "calendar-clock",
            "icon_class": "MaterialCommunityIcons"
        },
        {
            "id": 2,
            "text": "Sabados y Domingos",
            "icon": "calendar-clock",
            "icon_class": "MaterialCommunityIcons"
        },
        {
            "id": 3,
            "text": "Todos los dias",
            "icon": "calendar-clock",
            "icon_class": "MaterialCommunityIcons"
        }
    ]
    return res.status(200).json({
        success: true,
        data
    })
})

app.get('/candidate/workschedule', (req, res) => {
    let data = [
        {
            "id": 0,
            "text": "Diario 18:00-21:00",
            "icon_class": "SimpleLineIcons",
            "icon": "clock"
        },
        {
            "id": 1,
            "text": "Diario 7:00-10:00",
            "icon_class": "SimpleLineIcons",
            "icon": "clock"
        },
        {
            "id": 2,
            "text": "Diario 9:00-12:00",
            "icon_class": "SimpleLineIcons",
            "icon": "clock"
        },
        {
            "id": 3,
            "text": "Diario 9:00-12:00",
            "icon_class": "SimpleLineIcons",
            "icon": "clock"
        },
        {
            "id": 4,
            "text": "Diario 9:00-12:00",
            "icon_class": "SimpleLineIcons",
            "icon": "clock"
        },
        {
            "id": 5,
            "text": "Diario 9:00-12:00",
            "icon_class": "SimpleLineIcons",
            "icon": "clock"
        },
        {
            "id": 6,
            "text": "Diario 9:00-12:00",
            "icon_class": "SimpleLineIcons",
            "icon": "clock"
        }
    ]
    res.status(200).json({
        success: false,
        data: data
    })
})
app.get('/honey', auth, (req, res) => {
    let data = [

    ]
    for (let i = 0; i < 20; i++) {
        data.push({
            id: i+1,
            question: faker.lorem.sentence()
        })
    }
    res.status(200).json({
        success: false,
        data: data
    })
})

app.get('/candidate/areas', auth, (req, res) => {
    let data = [
        {
            "id": 0,
            "text": "Todas las áreas",
            "icon_class": "SimpleLineIcons",
            "icon": "clock"
        }
    ]
    res.status(200).json({
        success: true,
        data: data
    })
})
app.get('/candidate/investigationline/:id', auth, (req, res) => {
    let data = [
        {
            "id": 0,
            "text": "Probabilidad aplicada",
            "icon_class": "SimpleLineIcons",
            "icon": "clock"
        },
        {
            "id": 1,
            "text": "Análisis de datos categóricos",
            "icon_class": "SimpleLineIcons",
            "icon": "clock"
        },
        {
            "id": 2,
            "text": "Métodos no paramétricos",
            "icon_class": "SimpleLineIcons",
            "icon": "clock"
        },
        {
            "id": 3,
            "text": "Encuestas y censos",
            "icon_class": "SimpleLineIcons",
            "icon": "clock"
        },
        {
            "id": 4,
            "text": "Múestreo",
            "icon_class": "SimpleLineIcons",
            "icon": "clock"
        },
        {
            "id": 5,
            "text": "Pronósticos",
            "icon_class": "SimpleLineIcons",
            "icon": "clock"
        },
    ]
    res.status(200).json({
        success: true,
        data: data
    })
})
app.get('/entrega_expediente', auth, (req, res) => {
    let data = [
        {
            id: 0,
            title: 'Solicitud de admisión',
            description: 'Documento que puede generar en el sistema. Debe de estar firmado por el aspirante.',
            status: {
                text: 'Sin entrega',
                color: '#D1D1D1'
            },
            file: {
                uri: 'http://www.africau.edu/images/default/sample.pdf'
            },
            uploadType: "pdf"
        },
        {
            id: 1,
            title: 'Hoja de vida con fotografía impresa',
            description: 'Hola como estan porfa suban los docs que se necesitan para descargar toda la documentacion',
            status: {
                text: 'Pendiente de entrega',
                color: '#DD4A48',
            },
            file: {
                uri: 'http://www.africau.edu/images/default/sample.pdf'
            },
            filename: 'Hoja de vida.pdf',
            uploadType: "image"
        },
        {
            id: 2,
            title: 'Fotocopia de Título y/o acta de graduación',
            description: 'Este es otro ejemplo de pdf',
            status: {
                text: 'Entregado',
                color: '#95CD41'
            },
            uploadType: "pdf"
        }
    ]
    res.status(200).json({
        success: true,
        data: data
    })
})

app.get('/stepsconfiguration', auth, (req, res) => {

    let data = [
        {
            id: 0,
            name: 'Solicitud de admisión programa',
            status: 'inprogress',
            view: 'AplicatioAdmissionProgram'
        },
        {
            id: 1,
            name: 'Evaluación Diagnóstica',
            status: 'finished',
            view: 'DiagnosticEvaluation'
        },
        {
            id: 2,
            name: 'Ensayo Diagnóstico',
            status: 'finished',
            view: 'DiagnosticTest'
        },
        {
            id: 3,
            name: 'Agenda Expediente',
            status: 'finished',
            view: 'AgendaExpedient'
        }
    ]
    res.status(200).json({
        success: true,
        data: data
    })
})
app.post('/updateuserinformation', (req, res) => {
    upload(req, res, function (err) {
        if (err) {
            console.log(err)
            return res.status(200).json({
                success: false,
                data: []
            })
        }
        // res.end("File is uploaded");
        console.log(JSON.stringify(req.body))
        return res.status(200).json({
            success: true,
            data: []
        })
    });

})
app.post('/createrequest/inprogress', (req, res) => {
    createrequeststatus = 'inprogress'
    summarystate = 'inprogress'
    res.status(200).json({
        success: true,
    })
})
app.post('/createrequest/finished', (req, res) => {
    createrequeststatus = 'finished'
    res.status(200).json({
        success: true,
    })
})
let createrequeststatus = 'inprogress'
app.get('/createrequestconfiguration', auth, (req, res) => {
    //TODO: Pasar el endpoint
    let data = [

        {
            id: "PersonalInformationData",
            status: 'inprogress',
        },
        {
            id: "WorkInformationData",
            status: 'inprogress'
        },
        {
            id: "AcademicInformationData",
            status: 'inprogress'
        }
    ]
    //TODO: RETORNAR INFORMACION
    res.status(200).json({
        success: true,
        data: data
    })
})


app.post('/postwork', [auth], (req, res) => {
    console.log(req.body)
    return res.status(200).json({
        success: true,
        data: []
    })
})
app.get('/workinformation', auth, (req, res) => {
    let date = new Date(6 * 3600 * 1000);
    let finish = new Date(12 * 3200 * 1000);
    let data = {
        // comment: 'es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500, cuando un impresor (N. del T. persona que se dedica a la imprenta) desconocido usó una galería de textos y los mezcló de tal manera que logró hacer un libro de textos especimen. No sólo sobrevivió 500 años, sino que tambien ingresó como texto de relleno en documentos electrónicos, quedando esencialmente igual al original. Fue popularizado en los 60s con la creación de las hojas "Letraset", las cuales contenian pasajes de Lorem Ipsum,',
        // isworking: 1,
        // isusacworker: 1,
        // companyname: 'Papelitos',
        // job: 'Papelero',
        // chief: 'Luis perez',
        // functions: 'Trabajador',
        // workprogram: 1,
        // workfaculty: 3,
        // workcampus: 1,
        // workerid: '1234',
        // workdays: [
        //     {
        //         day: 'Lunes',
        //         start: date,
        //         finish
        //     },
        //     {
        //         day: 'Martes',
        //         start: date,
        //         finish
        //     },
        //     {
        //         day: 'Miércoles',
        //         start: date,
        //         finish
        //     },
        //     {
        //         day: 'Jueves',
        //         start: date,
        //         finish
        //     },
        //     {
        //         day: 'Viernes',
        //         start: date,
        //         finish
        //     },
        // ]
    }
    return res.status(200).json({
        success: true,
        data
    })
})
app.get('/academicinformation', auth, (req, res) => {
    let datagraduate = {
        mode: 'graduate',
        university_id: 0,
        college_degree_id: 3,
        graduation_date: new Date(),
        college_degree_name: 'Nombre de titulo ejemplo',
        university_name: 'RFA',
        shedule: 'Sabados de 7:00 a 17:00'
    }
    let dataclosure = {
        mode: 'closure',
        university_id: 0,
        college_degree_id: 3,
        closure_date: new Date(6 * 3600 * 1000),
        closure_career_id: 2,
        private_exam: 0,
        university_name: 'FRA',
        shedule: 'Sabados de 7:00 a 17:00',
        college_degree_name: 'Nombre de titulo ejemplo',
        university_name: 'RFA',

    }
    let dataundergraduate = {
        mode: 'undergraduate',
        closure_career_id: 3,
        closure_date: new Date(6 * 3600 * 1000),
        private_exam: 1,
        under_graduate_school_id: 2,
        shedule: 'Sabados de 7:00 a 17:00',
        college_degree_name: 'Nombre de titulo ejemplo',
        university_name: 'RFA',
    }
    console.log(dataclosure)
    return res.status(200).json({
        success: true,
        data: datagraduate
    })
})

app.post('/academicinformation/graduatedmode', auth, (req, res) => {
    console.log('MAndado')
    console.log(req.body)
    return res.status(200).json({
        success: true,
        data: []
    })
})
app.post('/academicinformation/closuremode', auth, (req, res) => {
    console.log('MAndado')
    console.log(req.body)
    return res.status(200).json({
        success: true,
        data: []
    })
})
app.post('/academicinformation/undergraduatemode', auth, (req, res) => {
    console.log('MAndado')
    console.log(req.body)
    return res.status(200).json({
        success: true,
        data: []
    })
})
let summarystate = 'inprogress'
app.get('/summary', auth, (req, res) => {
    return res.status(200).json({
        success: true,
        data: {
            state: 'finished',
            ticket_url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
            request_url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'
        }
    })
})

app.put('/academicinfo', auth, (req, res) => {
    console.log(req.body)
    return res.status(200).json({
        success: true,
        data: []
    })
})
app.post('/sendrequest', auth, (req, res) => {
    summarystate = 'finished'
    return res.status(200).json({
        success: true
    })
})

app.post('/createrequestticket', auth, (req, res) => {
    summarystate = 'printed'
    return res.status(200).json({
        success: true,
        data: {
            ticket_url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
        }
    })
})
let honeyalonsostatus = 'inprogress'
app.get('/honeyalonsostatus', auth, (req, res) => {
    return res.status(200).json({
        success: true,
        data: {
            status: honeyalonsostatus  ///block inprogress finished
        }
    })
})
app.get('/changehoneyalonsostatus1', auth, (req, res) => {
    honeyalonsostatus = 'block'
    return res.status(200)
})
app.get('/changehoneyalonsostatus2', auth, (req, res) => {
    honeyalonsostatus = 'inprogress'
    return res.status(200)
})
app.get('/changehoneyalonsostatus3', auth, (req, res) => {
    honeyalonsostatus = 'finished'
    return res.status(200)
})
app.post('/honeyalonso', auth, (req, res) => {

    return res.status(200).json({
        success: true,
    })
})
app.get('/honeyalonsoreport', auth, (req, res) => {
    return res.status(200).json({
        success: true,
        data: {
            url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'
        }
    })
})

app.get('/diagnosticteststatus', auth, (req, res) => {
    return res.status(200).json({
        success: true,
        data: {
            status: 'inprogress'
        }
    })
})
app.post('/diagnostictest', auth, (req, res) => {
    console.log(req.body)

    return res.status(200).json({
        success: true,
    })
})
app.get('/diagnostictestreport', auth, (req, res) => {
    return res.status(200).json({
        success: true,
        data: {
            url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'
        }
    })
})
app.get('/recordinformation', auth, (req, res) => {
    var date = new Date();

    date; //# => Fri Apr 01 2011 11:14:50 GMT+0200 (CEST)

    date.setDate(date.getDate() + 10);
    return res.status(200).json({
        success: true,
        data: {
            url: 'https://stackoverflow.com/questions/5511323/calculate-the-date-yesterday-in-javascript',
            expiration_date: date
        }
    })
})
app.get('/programtype', (req, res) => {
    return res.status(200).json({
        success: true,
        data: {
            modality: 'doctorado'
        }
    })
})
app.post('/archivos', (req, res) => {
    upload(req, res, function (err) {
        if (err) {
            console.log(err)
            return res.status(200).json({
                success: false,
                data: []
            })
        }
        // res.end("File is uploaded");
        console.log(req.body)
        Object.keys(req.body).forEach((key) => {
            var value = JSON.parse(req.body[key])
            console.log(value)
        })
        return res.status(200).json({
            success: true,
            data: []
        })
    });

})
app.get('/token/:token', (req, res) => {
    return res.status(200).json({
        success: true,
        data: {
            document: "2991120550101",
            first_name: "Marvin",
            second_name: "Ronaldo",
            first_last_name: "Martinez",
            second_last_name: "Marroquin",
            name: "Marvin Ronaldo Martinez Marroquin"
        }
    })
})

app.post('/token/:token', (req, res) => {
    return res.status(200).json({
        success: true,
        data: {
            document: "2991120550101",
            first_name: "Marvin",
            second_name: "Ronaldo",
            first_last_name: "Martinez",
            second_last_name: "Marroquin",
            name: "Marvin Ronaldo Martinez Marroquin"
        }
    })
})
const CONDITIONS_AND_TERMS = 'Las actualizaciones clave incluyen más información sobre lo siguiente: Legal terms are required under some countries’ consumer protection regulations. Even if you are not legally required to have terms and conditions, they are critical to maintaining your rights and protecting your business.'
app.get('/termsandconditions', (req, res) => {
    let data = {
        description: CONDITIONS_AND_TERMS,
        conditions: [
            "Condiciones generales",
            "Condiciones especiales",
            "Condiciones especiales",
            "Condiciones especiales",
            "Condiciones especiales",
        ]
    }
    return res.status(200).json({
        success: true,
        data: data
    })
})


const PORT = process.env.PORT | 3000;
app.listen(PORT, () => {
    console.log('App running on port: ', PORT)
    var aes256 = require('aes256');
    var key = 'lacarne3est4r1ca3nl05domin9osd3f';
    var plaintext = 'eyJpdiI6IjI0Q3d2TW9UaFIvY1drTHlmNGdqc1E9PSIsInZhbHVlIjoiMWdJRUc3REoxSWFsSk42Snk0WnFjNy9ueGUzcnBHd3BiRWVrMFVGbm51Zz0iLCJtYWMiOiIwNTc3NDQ2YjYxMWU4YjQ4ZTBiNDMwYTkzNjUzNzFiNzM5M2Y5Y2EzZmMzNzc1NTEwMDA5MmZjM2UzNGZlZGFiIiwidGFnIjoiIn0=/eyJpdiI6IlVmVDhZNWc1clJZNFBIU0tPR3k4alE9PSIsInZhbHVlIjoiTllSYjFralV1bmw3Y2MwVm5xaksrZz09IiwibWFjIjoiZmE4MWIyNWI5OTI3ODljN2E4ZjU3NWM0ZWIyMzc4NjMxMDFlN2Q5YjQ3ZDUxYWQwYWExYTMxYzdmYjYxMjczMCIsInRhZyI6IiJ9';
    var encrypted = aes256.encrypt(key, 'ya no sale');
    console.log(encrypted)
    var decrypted = aes256.decrypt(key, plaintext);
    console.log(decrypted)
})


//minuto 35fe