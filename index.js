const express = require('express')
const morgan = require('morgan')
const jwt = require('jsonwebtoken')
var cors = require('cors');
const app = express();
const auth = require("./middlewares/auth");
var faker = require('faker');
var multer = require('multer');
var bodyParser = require('body-parser');
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
        callback(null, file.fieldname + '-' + Date.now() + '.png');
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

app.post('/login', (req, res) => {
    let data = req.body
    if (data.user == '1' && data.password == '1') {
        const token = jwt.sign(
            {
                user_id: 1,
                email: 'marvin1ronal@gmail.com'
            },
            process.env.TOKEN_KEY,
            {
                expiresIn: "2h",
            }
        )
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
                'target': 'Candidate'
            },
            {
                "id": 1,
                "text": "Usuario",
                "icon": "user",
                "icon_class": "FontAwesome5",
                'target': 'NormalUser'
            }
        ],
        carrear_type: [
            {
                "id": 0,
                "text": "Doctorado 1",
                "icon_class": "Entypo",
                "icon": "book"
            },
            {
                "id": 1,
                "text": "Maestria 1",
                "icon_class": "Entypo",
                "icon": "book"
            },
            {
                "id": 2,
                "text": "Maestria 2",
                "icon_class": "Entypo",
                "icon": "book"
            },
            {
                "id": 3,
                "text": "Maestria 3",
                "icon_class": "Entypo",
                "icon": "book"
            },
            {
                "id": 4,
                "text": "Maestria 4",
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
    ]
    res.status(200).json({
        success: false,
        data: data
    })
})
app.get('/months/:id', (req, res) => {
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
    const month = parseInt(req.params.month)
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
    if (document == '123456789') {
        let data = {
            DPI: '1234456789',
            first_name: 'Yaiza',
            second_name: 'Estefania',
            first_last_name: 'Pineda',
            second_last_name: 'Gonzalez',
            phone: '12345678',
            cell_phone: '1111111',
            email: 'yaiza1@gmail.com'
        }
        return res.status(200).json({
            success: true,
            data
        })
    } else {
        return res.status(200).json({
            success: false,
            data: null
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
            "card_color": "#99FEFF",
            "text_color": "black",
            "icon_class": "EvilIcons"
        },
        {
            "id": 1,
            "image": "https://upload.wikimedia.org/wikipedia/commons/d/df/Logo_UNIR.png",
            "text": "Sede UNIR"
        }
    ]
    return res.status(200).json({
        success: true,
        data
    })
})
app.get('/typeprogram/:id', (req, res) => {
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
    return res.status(200).json({
        success: true,
        data
    })
})

app.get('/program/:id', (req, res) => {
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
    return res.status(200).json({
        success: true,
        data
    })
})

app.get('/plan/:id', (req, res) => {
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
    return res.status(200).json({
        success: true,
        data
    })
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
    return res.status(200).json({
        success: true,
        data
    })
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

app.get('/logininfo/:id1/:id2', auth, (req, res) => {
    let data = {
        email: 'yaiza1@gmail.com',
        account_id: 125,
        name: 'Yaiza Pineda',
        phone: '12345678',
        cellphone: '123456789',
        account_type_name: 'user',
        account_type_id: 1,
        carrear_name: 'Maestría en Estadística Aplicada',
        credits: 87,
        average: 89.9,
        document_id: '123456789',
        img: 'https://media.istockphoto.com/photos/millennial-male-team-leader-organize-virtual-workshop-with-employees-picture-id1300972574?b=1&k=20&m=1300972574&s=170667a&w=0&h=2nBGC7tr0kWIU8zRQ3dMg-C5JLo9H2sNUuDjQ5mlYfo='
    }
    return res.status(200).json({
        success: true,
        data
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
    let data = {
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
                        true,
                        false,
                        true,
                        false,
                        false,
                        true,
                        false
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
                        false,
                        false,
                        false,
                        false,
                        false,
                        true,
                        false
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
                        false,
                        false,
                        false,
                        false,
                        false,
                        true,
                        false
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
                        false,
                        false,
                        false,
                        false,
                        false,
                        true,
                        false
                    ],
                    "building": "T4",
                    "room": "305"
                }
            }
        ]
    }
    return res.status(200).json({
        success: true,
        data
    })
})
app.post('/assigmentcourses', auth, (req, res) => {
    console.log(req.body)
    toogleData(1)
    return res.status(200).json({
        success: true,

    })
})
app.get('/assigmentcourses', auth, (req, res) => {
    const data = [
        {
            "id": 0,
            "code": "COF01",
            "name": "Finanzas Industriales Corporativas",
            "section": [
                {
                    "id": 0,
                    "section": "A",
                    "teaching": "Manuel del toro",
                    "start_time": "Hora Inicio 07:00",
                    "finish_time": "Hora Fin 10:00",
                    "days": [
                        true,
                        false,
                        true,
                        false,
                        false,
                        true,
                        false
                    ],
                    "building": "Edificio T3",
                    "room": "Salon 303"
                },
                {
                    "id": 1,
                    "section": "A+",
                    "teaching": "Manuel del toro",
                    "start_time": "07:00",
                    "finish_time": "10:00",
                    "days": [
                        true,
                        true,
                        true,
                        false,
                        false,
                        true,
                        false
                    ],
                    "building": "Edificio II",
                    "room": "Salon 500"
                },
                {
                    "id": 2,
                    "section": "B",
                    "teaching": "Manuel del toro",
                    "start_time": "07:00",
                    "finish_time": "10:00",
                    "days": [
                        false,
                        false,
                        false,
                        false,
                        false,
                        true,
                        false
                    ],
                    "building": "T3",
                    "room": "303"
                },
                {
                    "id": 3,
                    "section": "C",
                    "teaching": "Manuel del toro",
                    "start_time": "07:00",
                    "finish_time": "10:00",
                    "days": [
                        false,
                        false,
                        false,
                        false,
                        false,
                        true,
                        false
                    ],
                    "building": "T3",
                    "room": "303"
                },
                {
                    "id": 4,
                    "section": "C",
                    "teaching": "Manuel Ronaldo Marcos Primero",
                    "start_time": "07:00",
                    "finish_time": "10:00",
                    "days": [
                        false,
                        false,
                        false,
                        false,
                        false,
                        true,
                        false
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
                    "start_time": "07:00",
                    "finish_time": "10:00",
                    "days": [
                        false,
                        false,
                        false,
                        false,
                        false,
                        true,
                        false
                    ],
                    "building": "T4",
                    "room": "305"
                }
            ]
        }
    ]
    return res.status(200).json({
        success: true,
        data
    })
})
app.get('/userinfo', auth, (req, res) => {
    let data = {
        email: 'yaiza2@gmail.com',
        account_id: 125,
        name: 'Yaiza Pineda',
        phone: '12345678',
        cellphone: '123456789',
        account_type_name: 'user',
        account_type_id: 1,
        carrear_name: 'Maestría en Estadística Aplicada',
        credits: 87,
        average: 89.9,
        document_id: '123456789',
        student_card: '987654321',
        img: 'https://media.istockphoto.com/photos/millennial-male-team-leader-organize-virtual-workshop-with-employees-picture-id1300972574?b=1&k=20&m=1300972574&s=170667a&w=0&h=2nBGC7tr0kWIU8zRQ3dMg-C5JLo9H2sNUuDjQ5mlYfo='
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
                    true,
                    false,
                    true,
                    false,
                    false,
                    true,
                    false
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
                    false,
                    false,
                    false,
                    false,
                    false,
                    true,
                    false
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
                    false,
                    false,
                    false,
                    false,
                    false,
                    true,
                    false
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
                    false,
                    false,
                    false,
                    false,
                    false,
                    true,
                    false
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


app.listen(process.env.API_PORT, () => {
    console.log('App running on port: 3000')
})


