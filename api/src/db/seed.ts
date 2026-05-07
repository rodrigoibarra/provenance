import "../env.js";
import { db } from "./index.js";
import { coffeeBags } from "./schema.js";

const seeds = [
  { roaster: "Ratiorama", origin: "Puebla, México", variety: "Caturra", process: "Honey", farm: "Topelli", producer: "Fermín C.", status: "finished" as const },
  { roaster: "Ratiorama", origin: "Atitlan M, Guatemala", variety: "Cri-Gei", process: "Natural", farm: "R. el Potrero", producer: "Florinda F.", status: "finished" as const },
  { roaster: "Tostadora de Cafés Extraordinarios", origin: "Xalisco, Nayarit, México", variety: "Typica, Mundo Novo, Oro Azteca", process: "Natural Cider", farm: "Finca Kalid", producer: "Gerardo Vázquez Rangel", status: "finished" as const },
  { roaster: "Ratiorama / Cafebre", origin: "Santa Maria Alotepec, Sierra Mixe, Oaxaca", variety: "Typica, Bourbon", process: "Natural", farm: "Pequeña productora", producer: "Lulú Jimenez", status: "finished" as const },
  { roaster: "Camino a Comala", origin: "Zentla, Veracruz, México", variety: "Sarchimor", process: "Natural/Honey", farm: "Corahe", producer: "Hermanos Córdova", status: "finished" as const },
  { roaster: "iLUSTRe Specialty Coffees", origin: "Finca Chachaxtla, Veracruz, México", variety: "Garnica, Costa Rica, Caturra", process: "Lavado y Natural con Fermentación Extendida", farm: "Chachaxtla", producer: "Javier Debernardi", status: "finished" as const },
  { roaster: "iLUSTRe Specialty Coffees", origin: "Finca Leona, Quindío, Colombia", variety: "Castillo", process: "Natural Anaerobic", farm: "Finca Leona", producer: "Luz Helena Salazar", status: "finished" as const },
  { roaster: "iLUSTRe Specialty Coffees", origin: "Finca Chachaxtla, Veracruz, México", variety: "Garnica, Costa Rica, Caturra", process: "Lavado y Natural con Fermentación Extendida", farm: "Chachaxtla", producer: "Javier Debernardi", status: "finished" as const },
  { roaster: "Tostadora de Cafés Extraordinarios", origin: "Tequepexpan, Santa Maria del Oro, Nayarit", variety: "Typica, Caturra, Bourbon, Sarchimor", process: "Lavado Guanábana", farm: "Origen Tequepexpan", producer: "Emilio Inda", status: "finished" as const },
  { roaster: "iLUSTRe Specialty Coffees", origin: "Finca La Divisa, Quindío, Colombia", variety: "Pink Bourbon", process: "Natural Anaerobic", farm: "La Divisa", producer: "Sebastián Gómez", status: "finished" as const },
  { roaster: "Ratiorama / Jiribilla", origin: "Miramar, México", variety: "Tu B", process: "Lavado (Washed)", farm: "La Mojonera", producer: "Angélica P.", status: "finished" as const },
  { roaster: "iLUSTRe Specialty Coffees", origin: "Finca El Paraíso, Puebla, México", variety: "Gesha", process: "Natural / Carbonic Maceration", farm: "El Paraíso", producer: "Rubén Aparicio", status: "finished" as const },
  { roaster: "Tostadora de Cafés Extraordinarios", origin: "Ixhuatlán, Veracruz, México", variety: "Gesha", process: "Lavado (Washed)", farm: "El Guayabal", producer: "Jesús Sabag", status: "finished" as const },
  { roaster: "Cardinal / Café con Jiribilla", origin: "Huatusco, Veracruz, México", variety: "Bourbon Rojo", process: "Natural", farm: "El Enano", producer: "Rafael Beristain", status: "finished" as const },
  { roaster: "Camino a Comala", origin: "Tapachula, Chiapas, México", variety: "Catuaí", process: "Lavado (Washed)", farm: "Hamburgo", producer: "Tomás Edelmann", status: "finished" as const },
  { roaster: "Constela Café", origin: "Finca Corahe, Huatusco, Veracruz, México", variety: "Geisha, Catulla, Marsellesa", process: "Natural Honey", farm: "Corahe", producer: "Rigoberto Córdova Arroyo", status: "finished" as const },
  { roaster: "Pólvora FCE", origin: "La Concordia, Chiapas, México", variety: "Caturra, Bourbon", process: "Lavado Tradicional", farm: "Santa Rosa", producer: "Arturo Liévano", status: "finished" as const },
  { roaster: "Ratiorama / Kraken Café", origin: "Motozintla, Chiapas, México", variety: "Bourbon, Catuaí, Marsellesa", process: "Anaeróbico Natural", farm: "Cascadas", producer: "e-café", status: "finished" as const },
  { roaster: "Ratiorama / Jiribilla", origin: "Miramar Yucuhiti, Oaxaca, México", variety: "Bourbon Rojo", process: "Lavado (picoteado por pajaritos)", farm: "Punta del Cerro", producer: "Luis Rafael Perez", status: "finished" as const },
  { roaster: "Tostadora de Cafés Extraordinarios", origin: "Tenango de Doria, Hidalgo, México", variety: "Bourbon, Typica", process: "Honey", farm: "Las Adelitas", producer: "Montze y Juan", status: "finished" as const },
  { roaster: "Curva", origin: "Zentla, Veracruz, México", variety: "Garnica, Caturra", process: "Natural Honey", farm: "El Corahe", producer: "Familia Cordova", status: "finished" as const },
  { roaster: "Sonata Tostadores", origin: "Naolinco, Veracruz, México", variety: "Garnica", process: "Lavado (Washed)", farm: "El Rincón", producer: "Rodolfo Jiménez", status: "finished" as const },
  { roaster: "Sonata Tostadores", origin: "Tlaola, Puebla, México", variety: "Marsellesa", process: "Lavado (Washed)", farm: "Magno", producer: "Hugo Alvarado", status: "finished" as const },
  { roaster: "Exploradores de Café", origin: "Huatusco, Veracruz, México", variety: "Caturra, Garnica", process: "Honey", farm: "Finca Coraje", producer: "Hermanos Córdoba Arrollo", status: "finished" as const },
  { roaster: "Ratiorama / Jiribilla", origin: "Miramar Yucuhiti, Oaxaca, México", variety: "Bourbon Rojo", process: "Natural", farm: "Frente del Cerro", producer: "Luis Rafael Perez", status: "finished" as const },
  { roaster: "Ratiorama / Jiribilla", origin: "Miramar Yucuhiti, Oaxaca, México", variety: "Typica, Bourbon", process: "Natural", farm: "Nuhite", producer: "Jaime García", status: "finished" as const },
  { roaster: "Tostadora de Cafés Extraordinarios", origin: "Tenango de Doria, Hidalgo, México", variety: "Bourbon, Typica", process: "Honey", farm: "Las Adelitas", producer: "Montze y Juan", status: "finished" as const },
  { roaster: "Ratiorama / Buna Café Rico", origin: "Yucuhiti / San Pedro, Oaxaca, México", variety: "Typica", process: "Lavado (Washed)", farm: "Ojo de Agua / La Brecha", producer: "Enrique Victorico España / Isaías Castro", status: "finished" as const },
  { roaster: "Ratiorama / Degrante", origin: "Coatepec, Veracruz, México", variety: "Bourbon", process: "Honey", farm: "Axol", producer: "Gabriel Carmona", status: "finished" as const },
  { roaster: "Ratiorama / Jiribilla", origin: "Miramar Yucuhiti, Oaxaca, México", variety: "Bourbon Rojo", process: "Lavado (Washed)", farm: "Frente del Cerro", producer: "Luis Rafael Perez", status: "finished" as const },
  { roaster: "Ratiorama / Jiribilla", origin: "Yucuhiti, Oaxaca, México", variety: "Typica", process: "Lavado (Washed)", farm: "La Mojonera", producer: "Angélica Pérez", status: "finished" as const },
  { roaster: "Ratiorama / Exploradores de Café", origin: "Cosautlán y Totutla, Veracruz, México", variety: "Mundo Maya, Limaní", process: "Natural / Lavado con Levaduras", farm: "Pocitos y Ermita", producer: "Carlos Cadena / Rafael Beristain", status: "finished" as const },
  { roaster: "Outsiders Café Espacial", origin: "Soconusco, Chiapas, México", variety: "Sarchimor", process: "Lavado", farm: "Fulda", producer: "Rainer Böhme", status: "finished" as const },
  { roaster: "Odisea", origin: "Guamila, Puebla, México", variety: "Bourbon Amarillo", process: "Honey", farm: "La Capilla", producer: "Belén Arias", status: "finished" as const },
  { roaster: "Ratiorama (Jiribilla)", origin: "Santa Cruz Acatepec, Oaxaca, México", variety: "Typica y Bourbon", process: "Lavado", farm: "El Encino", producer: "Ezequiel Carrera", status: "finished" as const },
  { roaster: "Ratiorama (Cumbé)", origin: "Totutla, Veracruz, México", variety: "Sarchimor y Garnica", process: "Honey doble fermentación", farm: "Los Contreras", producer: "Rafael Beristain", status: "finished" as const },
  { roaster: "Garage Café Tostado", origin: "Zapotitlán de Méndez, Puebla, México", variety: "Marsellesa y Costa Rica", process: "Lavado", farm: "Cagsting", producer: "Fermín Luis Vázquez", status: "finished" as const },
  { roaster: "Ratiorama (Bello Café)", origin: "Santo Domingo, México", variety: "Geisha", process: "Natural BPP", farm: "El Limón", producer: "Wilfrido Reyes Calderón", status: "finished" as const },
  { roaster: "Ratiorama (Ademán)", origin: "Totutla, Puebla, México", variety: "Sarchimor", process: "Honey", farm: "Topelli", producer: "Varios", status: "finished" as const },
  { roaster: "Ratiorama", origin: "Totutla, Puebla, México", variety: "Typica y Marsellesa", process: "Fermentación anaeróbica controlada 160 hrs", farm: "Las Ranas", producer: "Magali Posadas", status: "finished" as const },
  { roaster: "Ratiorama (El Apapacho)", origin: "Tlaxiaco, Oaxaca, México", variety: "Typica y Bourbon", process: "Honey Machacado", farm: "Inquebrantable", producer: "Daniel García Santiago", status: "finished" as const },
  { roaster: "Tostadora de Cafés Extraordinarios", origin: "Teocelo, Veracruz, México", variety: "Marsellesa, Bourbon, Typica", process: "Lavado", farm: "Otipan", producer: "Raúl de Arcángelis Martínez", status: "finished" as const },
  { roaster: "Ratiorama (Jiribilla)", origin: "Miramar Yucuhiti, Oaxaca, México", variety: "Bourbon, Typica y Mundo Novo", process: "Enmielado", farm: "Guayabal", producer: "Primitivo Pacheco", status: "finished" as const },
  { roaster: "Ratiorama (Jiribilla)", origin: "Miramar Yucuhiti, Oaxaca, México", variety: "Geisha", process: "Enmielado", farm: "El Paraíso", producer: "Amador Vazquez", status: "finished" as const },
  { roaster: "Ratiorama (ESE Café)", origin: "Tecuaxco Aquila, Veracruz, México", variety: "Arabica", process: "Lavado", farm: "Yopihua", producer: "Anselmo Xocua", status: "finished" as const },
  { roaster: "Almanegra Culto al Café", origin: "San Miguel Ayotitlan, Jalisco, México", variety: "Marsellesa, Sarchimor, Caturra Rojo", process: "Natural", farm: "Finca Peña Blanca", producer: "Jose Renteria", status: "finished" as const },
  { roaster: "Tostadora de Cafés Extraordinarios", origin: "Tequepexpan, Nayarit, México", variety: "Typica, Caturra", process: "Fermentación Controlada Guanábana", farm: "Origen Tequepexpan", producer: "Familia Inda", status: "finished" as const },
  { roaster: "Ratiorama (Jiribilla)", origin: "Santiago Atitlan, Oaxaca, México", variety: "Costa Rica 96", process: "Enmielado", farm: "El Rodeo", producer: "Leoncio Martínez", status: "finished" as const },
  { roaster: "Ratiorama (Café Estelar)", origin: "Ixhuacán de los Reyes, Veracruz, México", variety: "Typica, Marsellesa y Garnica", process: "Lavado", farm: "Fátima", producer: "Givette y Ernesto Pérez Orea", status: "finished" as const },
  { roaster: "Ratiorama (Tostador 1.)", origin: "Santiago Atitlán, Oaxaca, México", variety: "Pacamara", process: "Natural", farm: "El Chango", producer: "Wilfrido Martínez González", status: "finished" as const },
  { roaster: "Ratiorama (Jiribilla)", origin: "Miramar Yucuhiti, Oaxaca, México", variety: "Bourbon y Typica", process: "Natural", farm: "Punta del Cerro", producer: "Luis Rafael Perez", status: "finished" as const },
  { roaster: "Almanegra Culto al Café", origin: "La Concordia, Chiapas, México", variety: "Typica, Bourbon y Marsellesa", process: "Lavado", farm: "Finca Santa Cruz", producer: "Jose Arguello", status: "finished" as const },
  { roaster: "Almanegra Culto al Café", origin: "Santas Marías, Tacambaro, Michoacán, México", variety: "Typica", process: "Lavado", farm: "Finca el Pantano", producer: "Javier Jiménez Segundo", status: "finished" as const },
  { roaster: "Almanegra Culto al Café", origin: "Cosautlán de Carvajal, Veracruz, México", variety: "Oro Azteca y Costa Rica", process: "Lavado", farm: "Finca El Pino", producer: "Flavio Colorado", status: "finished" as const },
  { roaster: "Almanegra Culto al Café", origin: "Corral del Diablo, Zihuatanejo, Guerrero, México", variety: "Mundo Novo, Bourbon", process: "Natural", farm: "Finca Corral del Diablo", producer: "Hnos. Ivan y Dario Galeana Sánchez", status: "finished" as const },
  { roaster: "Almanegra Culto al Café", origin: "Candelaria-Loxicha, Oaxaca, México", variety: "Gesha", process: "Despulpado Fermentado (Honey)", farm: "Finca Chelin", producer: "Enrique Lopez", status: "finished" as const },
  { roaster: "Almanegra Culto al Café", origin: "Candelaria-Loxicha, Oaxaca, México", variety: "Pluma Hidalgo", process: "Hidronatural Natural", farm: "Finca Chelin", producer: "Enrique Lopez", status: "finished" as const },
  { roaster: "Almanegra Culto al Café", origin: "Xicotepec de Juárez, Sierra Norte, Puebla, México", variety: "Caturra Rojo", process: "Lavado", farm: "Finca La Gruta", producer: "Jonatan Olarte", status: "finished" as const },
  { roaster: "Almanegra Culto al Café", origin: "La Concordia, Chiapas, México", variety: "Typica y Bourbon", process: "Lavado", farm: "Finca Arroyo Negro", producer: "Victor Hugo Melchor Córdova", status: "finished" as const },
  { roaster: "Almanegra Culto al Café", origin: "Santas Marías, Tacambaro, Michoacán, México", variety: "Typica", process: "Lavado", farm: "Finca el Pantano", producer: "Javier Jiménez Segundo", status: "finished" as const },
  { roaster: "Almanegra Culto al Café", origin: "Candelaria-Loxicha, Oaxaca, México", variety: "Gesha", process: "Despulpado Fermentado (Honey)", farm: "Finca Chelin", producer: "Enrique Lopez", status: "finished" as const },
  { roaster: "Tostadora de Cafés Extraordinarios", origin: "Teocelo, Veracruz, México", variety: "Marsellesa, Bourbon, Typica", process: "Lavado", farm: "Otipan", producer: "Raúl de Arcángelis Martínez", status: "finished" as const },
  { roaster: "Ratiorama (Terceto)", origin: "Zapotitlán de Méndez, Puebla, México", variety: "Marsellesa y Sarchimor", process: "Lavado doble fermentación", farm: "Bolero", producer: "Fermín Luis Vázquez", status: "finished" as const },
];

async function seed() {
  console.log("Seeding coffee bags...");
  await db.insert(coffeeBags).values(seeds);
  console.log(`Seeded ${seeds.length} coffee bags.`);
  process.exit(0);
}

seed().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
