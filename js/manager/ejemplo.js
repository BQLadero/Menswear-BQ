let categories = [
    {
        "title": "Pull & Bear",
        "description": "Categoria de Pull & Bear"
    },
    {
        "title": "Zara",
        "description": "Categoria de Zara"
    },
    {
        "title": "H&M",
        "description": "Categoria de H&M"
    },
    {
        "title": "C&A",
        "description": "Categoria de C&A"
    },
    {
        "title": "Zalando",
        "description": "Categoria de Zalando"
    }
];
let shops = [
    {
        "cif": "185788484A",
        "name": "Menswear-BQ CR",
        "address": "C/Toledo, 28, Ciudad Real",
        "phone": 926714487,
        "coords": {
            "latitude": 38.989201349615364,
            "longitude": -3.9282941974235253
        }
    },
    {
        "cif": "185788228A",
        "name": "Menswear-BQ TO",
        "address": "Pº de la Rosa, 3V, Toledo",
        "phone": 926145723,
        "coords": {
            "latitude": 39.862215,
            "longitude": -4.008410
        }
    },
    {
        "cif": "185781244A",
        "name": "Menswear-BQ ASJ",
        "address": "C/Tribaldos, 20, Alcázar de San Juan",
        "phone": 925748871,
        "coords": {
            "latitude": 39.392154,
            "longitude": -3.207000
        }
    }
];

let products = [
    {
        "serialNumber": 1,
        "name": "JPRFanco Suit",
        "price": 74.99,
        "altura": 188,
        "cierre": "Botón",
        "cuidados": "Lavar en seco",
        "detalles": "Hombrera",
        "description": "Traje de gala",
        "tax": 5,
        "images": ["./img/traje-zalando-1.png", "./img/traje-zalando-1-2.png", "./img/traje-zalando-1-3.png"]
    },
    {
        "serialNumber": 2,
        "name": "Tropical Active",
        "price": 159.99,
        "altura": 189,
        "cierre": "Botón",
        "cuidados": "Lavar en seco",
        "detalles": "no",
        "description": "Traje de gala",
        "tax": 5,
        "images": ["./img/traje-zalando-2.png", "./img/traje-zalando-2-1.png", "./img/traje-zalando-2-2.png"]
    },
    {
        "serialNumber": 3,
        "name": "Plain mens sui",
        "price": 149.95,
        "altura": 192,
        "cierre": "Botón",
        "cuidados": "Lavar en seco",
        "detalles": "Tira de botones, hombrera",
        "description": "Traje de gala",
        "tax": 5,
        "images": ["./img/traje-zalando-3.png", "./img/traje-zalando-3-1.png", "./img/traje-zalando-3-2.png"]
    },
    {
        "serialNumber": 4,
        "name": "Blazer Conjunto Relaxed",
        "price": 79.95,
        "altura": 188,
        "cierre": "Botón",
        "cuidados": "No usar secadora",
        "detalles": "Bolsillo interior",
        "description": "Traje de gala",
        "tax": 5,
        "images": ["./img/traje-zara-1.png", "./img/traje-zalando-1-1.png", "./img/traje-zalando-1-2.png"]
    },
    {
        "serialNumber": 5,
        "name": "Regular Fit",
        "price": 117.99,
        "altura": 175,
        "cierre": "Botón y Cremallera",
        "cuidados": "Lavar en ciclo de lavado suave a 40°",
        "detalles": "no",
        "description": "Traje de gala",
        "tax": 5,
        "images": ["./img/traje-c&a-2.png", "./img/traje-traje-c&a.png"]
    },
    {
        "serialNumber": 6,
        "name": "Bota acordonada piso Track",
        "price": 39.99,
        "talla": 39,
        "cierre": "Cordones y Cremallera",
        "suela": "Track",
        "plantilla": "Termica",
        "description": "Zapato tipo bota acordonada disponible en varios colores",
        "tax": 0,
        "images": ["./img/botas-p&b-1.png", "./img/botas-p&b-1-1.png"]
    },
    {
        "serialNumber": 7,
        "name": "Bota acordonada suela track",
        "price": 25.99,
        "talla": 192,
        "cierre": "Cordones",
        "suela": "Track",
        "plantilla": "Bioeco",
        "description": "Zapato tipo bota acordonada disponible en varios colores",
        "tax": 0,
        "images": ["./img/botas-p&b-2.png", "./img/botas-p&b-2-1.png"]
    },
    {
        "serialNumber": 8,
        "name": "Bota cordones",
        "price": 39.95,
        "talla": 41,
        "cierre": "Cordones",
        "suela": "Volumen",
        "plantilla": "Poliuretano",
        "description": "Bota de cordones. Disponible en color burdeos y en marrón.",
        "tax": 0,
        "images": ["./img/botas-zara-1.png", "./img/botas-zara-1-1.png"]
    },
    {
        "serialNumber": 9,
        "name": "Bota cordones engomada",
        "price": 49.95,
        "talla": 40,
        "cierre": "Cordones",
        "suela": "Track",
        "plantilla": "Poliéster",
        "description": "Bota con cordones. Corte liso con acabado engomado.",
        "tax": 0,
        "images": ["./img/botas-zara-2.png", "./img/botas-zara-2-1.png", "./img/botas-zara-2-2.png"]
    },
    {
        "serialNumber": 10,
        "name": "Botas Chelsea",
        "price": 39.99,
        "talla": 43,
        "cierre": "No contiene cierre",
        "suela": "Goma termoplástica",
        "plantilla": "Algodón",
        "description": "Botas Chelsea en ante sintético con elásticos laterales y trabilla detrás. Tacón 3 cm.",
        "tax": 0,
        "images": ["./img/botas-h&m.png", "./img/botas-h&m-2.png"]
    },
    {
        "serialNumber": 11,
        "name": "Joggers cargo Skinny Fit",
        "price": 23.99,
        "cintura": "Elástica",
        "cierre": "Cordones",
        "bolsillos": "Al bies y bolsillos traseros",
        "material": "Algodón",
        "description": "Joggers en sarga de algodón con cintura elástica y cordón de ajuste",
        "tax": 0,
        "images": ["./img/pantalones-h&m-1.png", "./img/pantalones-h&m-1-1.png"]
    },
    {
        "serialNumber": 12,
        "name": "Joggers cargo",
        "price": 27.99,
        "cintura": "Elástica",
        "cierre": "Cordones",
        "bolsillos": "Al bies y bolsillos traseros",
        "material": "Algodón",
        "description": "Joggers de algodón con elástico revestido y cordón de ajuste en la cintura",
        "tax": 0,
        "images": ["./img/pantalones-h&m-2.png", "./img/pantalones-h&m-2-1.png", "./img/pantalones-h&m-2-2.png"]
    },
    {
        "serialNumber": 13,
        "name": "Chinos slim fit",
        "price": 49.99,
        "cintura": "Elástica",
        "cierre": "Botón",
        "bolsillos": "Al bies por delante y un bolsillo pequeño, dos bolsillos ribeteados por detrás.",
        "material": "Algodón y Elastano",
        "description": "Chinos ceñidos de tejido elástico. Con dos bolsillos al bies por delante y un bolsillo pequeño, dos bolsillos ribeteados por detrás.",
        "tax": 0,
        "images": ["./img/pantalones-c&a-1.png", "./img/pantalones-c&a-1-1.png"]
    },
    {
        "serialNumber": 14,
        "name": "Pantalón de deporte - fitness",
        "price": 24.99,
        "cintura": "Elástica",
        "cierre": "Cordones",
        "bolsillos": "Dos bolsillos con cremalleras a los lados",
        "material": "Poliéster y Algodón",
        "description": "Pantalón de deporte de felpa lisa. Dos bolsillos con cremalleras a los lados y pespuntes estilo biker de adorno delante. Puños de canalé en los bajos.",
        "tax": 0,
        "images": ["./img/pantalones-c&a-2.png", "./img/pantalones-c&a-2-1.png"]
    },
    {
        "serialNumber": 15,
        "name": "Pantalón Confort Pliegue",
        "price": 29.95,
        "cintura": "Elástica y confortable",
        "cierre": "Botón y Cremallera",
        "bolsillos": "'En delantero y detalle de bolsillos de vivo en espalda",
        "material": "Poliéster, viscosa y elastano",
        "description": "Pantalón confeccionado en tejido de estructura elástica y confortable. Detalle de pliegues frontales en cintura.",
        "tax": 0,
        "images": ["./img/pantalones-zara.png", "./img/pantalones-zara-1.png", "./img/pantalones-zara-2.png"]
    },
    {
        "serialNumber": 16,
        "name": "Heatgear Locut",
        "price": 7.95,
        "diseño": "Deporte",
        "tipo": "Tobileros",
        "material": "Punto",
        "pack": 3,
        "description": "Calcetines de deporte",
        "tax": 0,
        "images": ["./img/calcetines-zalando.png", "./img/calcetines-zalando-2.png"]
    },
    {
        "serialNumber": 17,
        "name": "Calcetines",
        "price": 3.99,
        "diseño": "Jacquard",
        "tipo": "Largos",
        "material": "Algodón, Poliamida y Elastano",
        "pack": 1,
        "description": "Calcetines de bob Esponja",
        "tax": 0,
        "images": ["./img/calcetines-c&a.png", "./img/calcetines-c&a-1.png"]
    },
    {
        "serialNumber": 18,
        "name": "Pack de 10 calcetines",
        "price": 14.39,
        "diseño": "Tela",
        "tipo": "Medianos",
        "material": "Algodón, Poliamida y Elastano",
        "pack": 10,
        "description": "Calcetines de Tela",
        "tax": 0,
        "images": ["./img/calcetines-h&m.png", "./img/calcetines-h&m-1.png"]
    },
    {
        "serialNumber": 19,
        "name": "Calcetines Jacquard The Beathles",
        "price": 12.95,
        "diseño": "THE BEATLES",
        "tipo": "Largos",
        "material": "Algodón, Poliamida y Elastano",
        "pack": 2,
        "description": "Pack de calcetines con jacquard The Beatles. Acabados en rib.",
        "tax": 0,
        "images": ["./img/calcetines-zara-1.png", "./img/calcetines-zara.png", "./img/calcetines-zara-2.png"]
    },
    {
        "serialNumber": 20,
        "name": "Calcetines Altos",
        "price": 7.99,
        "diseño": "Tela",
        "tipo": "Largos",
        "material": "Algodón, Poliamida y Elastano",
        "pack": 3,
        "description": "JOIN LIFE Care for fiber & Care for water: At least 75% of Ecologically Grown Cotton.",
        "tax": 0,
        "images": ["./img/calcetines-p&b.png", "./img/calcetines-p&b-1.png"]
    }
];

let trajes = [
    {
        "serialNumber": 1,
        "name": "JPRFanco Suit",
        "price": 74.99,
        "altura": 188,
        "cierre": "Botón",
        "cuidados": "Lavar en seco",
        "detalles": "Hombrera",
        "description": "Traje de gala",
        "tax": 5,
        "images": ["./img/traje-zalando-1.png", "./img/traje-zalando-1-2.png", "./img/traje-zalando-1-3.png"]
    },
    {
        "serialNumber": 2,
        "name": "Tropical Active",
        "price": 159.99,
        "altura": 189,
        "cierre": "Botón",
        "cuidados": "Lavar en seco",
        "detalles": "no",
        "description": "Traje de gala",
        "tax": 5,
        "images": ["./img/traje-zalando-2.png", "./img/traje-zalando-2-1.png", "./img/traje-zalando-2-2.png"]
    },
    {
        "serialNumber": 3,
        "name": "Plain mens sui",
        "price": 149.95,
        "altura": 192,
        "cierre": "Botón",
        "cuidados": "Lavar en seco",
        "detalles": "Tira de botones, hombrera",
        "description": "Traje de gala",
        "tax": 5,
        "images": ["./img/traje-zalando-3.png", "./img/traje-zalando-3-1.png", "./img/traje-zalando-3-2.png"]
    },
    {
        "serialNumber": 4,
        "name": "Blazer Conjunto Relaxed",
        "price": 79.95,
        "altura": 188,
        "cierre": "Botón",
        "cuidados": "No usar secadora",
        "detalles": "Bolsillo interior",
        "description": "Traje de gala",
        "tax": 5,
        "images": ["./img/traje-zara-1.png", "./img/traje-zalando-1-1.png", "./img/traje-zalando-1-2.png"]
    },
    {
        "serialNumber": 5,
        "name": "Regular Fit",
        "price": 117.99,
        "altura": 175,
        "cierre": "Botón y Cremallera",
        "cuidados": "Lavar en ciclo de lavado suave a 40°",
        "detalles": "no",
        "description": "Traje de gala",
        "tax": 5,
        "images": ["./img/traje-c&a-2.png", "./img/traje-traje-c&a.png"]
    }
]

let botas = [
    {
        "serialNumber": 6,
        "name": "Bota acordonada piso Track",
        "price": 39.99,
        "talla": 39,
        "cierre": "Cordones y Cremallera",
        "suela": "Track",
        "plantilla": "Termica",
        "description": "Zapato tipo bota acordonada disponible en varios colores",
        "tax": 0,
        "images": ["./img/botas-p&b-1.png", "./img/botas-p&b-1-1.png"]
    },
    {
        "serialNumber": 7,
        "name": "Bota acordonada suela track",
        "price": 25.99,
        "talla": 192,
        "cierre": "Cordones",
        "suela": "Track",
        "plantilla": "Bioeco",
        "description": "Zapato tipo bota acordonada disponible en varios colores",
        "tax": 0,
        "images": ["./img/botas-p&b-2.png", "./img/botas-p&b-2-1.png"]
    },
    {
        "serialNumber": 8,
        "name": "Bota cordones",
        "price": 39.95,
        "talla": 41,
        "cierre": "Cordones",
        "suela": "Volumen",
        "plantilla": "Poliuretano",
        "description": "Bota de cordones. Disponible en color burdeos y en marrón.",
        "tax": 0,
        "images": ["./img/botas-zara-1.png", "./img/botas-zara-1-1.png"]
    },
    {
        "serialNumber": 9,
        "name": "Bota cordones engomada",
        "price": 49.95,
        "talla": 40,
        "cierre": "Cordones",
        "suela": "Track",
        "plantilla": "Poliéster",
        "description": "Bota con cordones. Corte liso con acabado engomado.",
        "tax": 0,
        "images": ["./img/botas-zara-2.png", "./img/botas-zara-2-1.png", "./img/botas-zara-2-2.png"]
    },
    {
        "serialNumber": 10,
        "name": "Botas Chelsea",
        "price": 39.99,
        "talla": 43,
        "cierre": "No contiene cierre",
        "suela": "Goma termoplástica",
        "plantilla": "Algodón",
        "description": "Botas Chelsea en ante sintético con elásticos laterales y trabilla detrás. Tacón 3 cm.",
        "tax": 0,
        "images": ["./img/botas-h&m.png", "./img/botas-h&m-2.png"]
    }
]

let pantalones = [
    {
        "serialNumber": 11,
        "name": "Joggers cargo Skinny Fit",
        "price": 23.99,
        "cintura": "Elástica",
        "cierre": "Cordones",
        "bolsillos": "Al bies y bolsillos traseros",
        "material": "Algodón",
        "description": "Joggers en sarga de algodón con cintura elástica y cordón de ajuste",
        "tax": 0,
        "images": ["./img/pantalones-h&m-1.png", "./img/pantalones-h&m-1-1.png"]
    },
    {
        "serialNumber": 12,
        "name": "Joggers cargo",
        "price": 27.99,
        "cintura": "Elástica",
        "cierre": "Cordones",
        "bolsillos": "Al bies y bolsillos traseros",
        "material": "Algodón",
        "description": "Joggers de algodón con elástico revestido y cordón de ajuste en la cintura",
        "tax": 0,
        "images": ["./img/pantalones-h&m-2.png", "./img/pantalones-h&m-2-1.png", "./img/pantalones-h&m-2-2.png"]
    },
    {
        "serialNumber": 13,
        "name": "Chinos slim fit",
        "price": 49.99,
        "cintura": "Elástica",
        "cierre": "Botón",
        "bolsillos": "Al bies por delante y un bolsillo pequeño, dos bolsillos ribeteados por detrás.",
        "material": "Algodón y Elastano",
        "description": "Chinos ceñidos de tejido elástico. Con dos bolsillos al bies por delante y un bolsillo pequeño, dos bolsillos ribeteados por detrás.",
        "tax": 0,
        "images": ["./img/pantalones-c&a-1.png", "./img/pantalones-c&a-1-1.png"]
    },
    {
        "serialNumber": 14,
        "name": "Pantalón de deporte - fitness",
        "price": 24.99,
        "cintura": "Elástica",
        "cierre": "Cordones",
        "bolsillos": "Dos bolsillos con cremalleras a los lados",
        "material": "Poliéster y Algodón",
        "description": "Pantalón de deporte de felpa lisa. Dos bolsillos con cremalleras a los lados y pespuntes estilo biker de adorno delante. Puños de canalé en los bajos.",
        "tax": 0,
        "images": ["./img/pantalones-c&a-2.png", "./img/pantalones-c&a-2-1.png"]
    },
    {
        "serialNumber": 15,
        "name": "Pantalón Confort Pliegue",
        "price": 29.95,
        "cintura": "Elástica y confortable",
        "cierre": "Botón y Cremallera",
        "bolsillos": "'En delantero y detalle de bolsillos de vivo en espalda",
        "material": "Poliéster, viscosa y elastano",
        "description": "Pantalón confeccionado en tejido de estructura elástica y confortable. Detalle de pliegues frontales en cintura.",
        "tax": 0,
        "images": ["./img/pantalones-zara.png", "./img/pantalones-zara-1.png", "./img/pantalones-zara-2.png"]
    }
]

let calcetines = [
    {
        "serialNumber": 16,
        "name": "Heatgear Locut",
        "price": 7.95,
        "diseño": "Deporte",
        "tipo": "Tobileros",
        "material": "Punto",
        "pack": 3,
        "description": "Calcetines de deporte",
        "tax": 0,
        "images": ["./img/calcetines-zalando.png", "./img/calcetines-zalando-2.png"]
    },
    {
        "serialNumber": 17,
        "name": "Calcetines",
        "price": 3.99,
        "diseño": "Jacquard",
        "tipo": "Largos",
        "material": "Algodón, Poliamida y Elastano",
        "pack": 1,
        "description": "Calcetines de bob Esponja",
        "tax": 0,
        "images": ["./img/calcetines-c&a.png", "./img/calcetines-c&a-1.png"]
    },
    {
        "serialNumber": 18,
        "name": "Pack de 10 calcetines",
        "price": 14.39,
        "diseño": "Tela",
        "tipo": "Medianos",
        "material": "Algodón, Poliamida y Elastano",
        "pack": 10,
        "description": "Calcetines de Tela",
        "tax": 0,
        "images": ["./img/calcetines-h&m.png", "./img/calcetines-h&m-1.png"]
    },
    {
        "serialNumber": 19,
        "name": "Calcetines Jacquard The Beathles",
        "price": 12.95,
        "diseño": "THE BEATLES",
        "tipo": "Largos",
        "material": "Algodón, Poliamida y Elastano",
        "pack": 2,
        "description": "Pack de calcetines con jacquard The Beatles. Acabados en rib.",
        "tax": 0,
        "images": ["./img/calcetines-zara-1.png", "./img/calcetines-zara.png", "./img/calcetines-zara-2.png"]
    },
    {
        "serialNumber": 20,
        "name": "Calcetines Altos",
        "price": 7.99,
        "diseño": "Tela",
        "tipo": "Largos",
        "material": "Algodón, Poliamida y Elastano",
        "pack": 3,
        "description": "JOIN LIFE Care for fiber & Care for water: At least 75% of Ecologically Grown Cotton.",
        "tax": 0,
        "images": ["./img/calcetines-p&b.png", "./img/calcetines-p&b-1.png"]
    }
]


let category = JSON.stringify(categories);
const categoryParsed = JSON.parse(category);

const trajesCategorias = [[categories[4], categories[2]], [categories[3], categories[2]], categories[4],
[categories[1], categories[3]], categoryParsed[3]];

const botasCategorias = [categoryParsed[0], categoryParsed[0], categoryParsed[1], categoryParsed[1], categoryParsed[2]];

const pantalonesCategorias = [[categoryParsed[1], categoryParsed[1]], categoryParsed[2], categoryParsed[3], [categoryParsed[3], 
categoryParsed[4]], categoryParsed[1]];

const calcetinesCategorias = [categoryParsed[4], [categoryParsed[3], categoryParsed[4]], categoryParsed[2], [categoryParsed[0], 
categoryParsed[1]], categoryParsed[0]];


let productsShops = [
    {
        "producto": trajes[0],
        "tienda": shops[0],
        "stock": 7
    },
    {
        "producto": trajes[0],
        "tienda":  shops[1],
        "stock": 7
    },
    {
        "producto": trajes[1],
        "tienda": shops[0],
        "stock": 2
    },
    {
        "producto": trajes[2],
        "tienda": shops[1],
        "stock": 3
    }, 
    {
        "producto": trajes[2],
        "tienda": shops[2],
        "stock": 3
    },
    {
        "producto": trajes[3],
        "tienda": shops[2],
        "stock": 1
    },
    {
        "producto": trajes[4],
        "tienda": shops[1],
        "stock": 4
    },
    {
        "producto": botas[0],
        "tienda": shops[0],
        "stock": 7
    },
    {
        "producto": botas[1],
        "tienda": shops[1],
        "stock": 4
    },
    {
        "producto": botas[1],
        "tienda": shops[2],
        "stock": 3
    },
    {
        "producto": botas[2],
        "tienda": shops[1],
        "stock": 2
    },
    {
        "producto": botas[3],
        "tienda": shops[0],
        "stock": 8
    },
    {
        "producto": botas[4],
        "tienda": shops[0],
        "stock": 17
    },
    {
        "producto": botas[4],
        "tienda": shops[1],
        "stock": 5
    }, 
    {
        "producto": pantalones[0],
        "tienda": shops[0],
        "stock": 7
    },
    {
        "producto": pantalones[0],
        "tienda": shops[2],
        "stock": 4
    },
    {
        "producto": pantalones[1],
        "tienda": shops[1],
        "stock": 7
    },
    {
        "producto": pantalones[1],
        "tienda": shops[1],
        "stock": 7
    },
    {
        "producto": pantalones[2],
        "tienda": shops[0],
        "stock": 4
    },
    {
        "producto": pantalones[2],
        "tienda": shops[1],
        "stock": 5
    },
    {
        "producto": pantalones[3],
        "tienda": shops[0],
        "stock": 2
    },
    {
        "producto": pantalones[3],
        "tienda": shops[1],
        "stock": 11
    },
    {
        "producto": pantalones[3],
        "tienda": shops[2],
        "stock": 14
    },
    {
        "producto": pantalones[4],
        "tienda": shops[1],
        "stock": 1
    },
    {
        "producto": calcetines[0],
        "tienda": shops[0],
        "stock": 3
    }, 
    {
        "producto": calcetines[0],
        "tienda": shops[2],
        "stock": 2
    },
    {
        "producto": calcetines[1],
        "tienda": shops[1],
        "stock": 4
    },
    {
        "producto": calcetines[1],
        "tienda": shops[2],
        "stock": 50
    },
    {
        "producto": calcetines[2],
        "tienda": shops[0],
        "stock": 12
    },
    {
        "producto": calcetines[3],
        "tienda": shops[1],
        "stock": 10
    },
    {
        "producto": calcetines[4],
        "tienda": shops[0],
        "stock": 70
    }
]

let traje = JSON.stringify(trajes);
const trajeParsed = JSON.parse(traje);
let bota = JSON.stringify(botas);
const botaParsed = JSON.parse(bota);
let pantalon = JSON.stringify(pantalones);
const pantalonParsed = JSON.parse(pantalon);
let calcetin = JSON.stringify(calcetines);
const calcetinParsed = JSON.parse(calcetin);
let shop = JSON.stringify(shops);
const shopParsed = JSON.parse(shop);
let productInShop = JSON.stringify(productsShops);
const productShop = JSON.parse(productInShop);

//export {categoryParsed, shopParsed, productParsed}
//export {categories}