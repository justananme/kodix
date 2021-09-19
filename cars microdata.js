/**
 * Скрипт добавляет microdata на страницы карточек с автомобилями. Применим как к АВН, так и к АСП
 * В зависимости от клиента, которому будет устанавливаться скрипт, необходимо переопределять значения следующих констант:
 * - MICRODATA_ORGANIZATION_NAME – название организации клиента
 * - supportedCarPaths – относительные ссылки на витрины и их тип (витрина АВН, или АСП)
 * Для поиска информации по автомобилю, скрипт извлекает данные по всем автомобилям по API, а далее ищет информацию по конкретному автомобилю
 * Запрос по API для каждого типа витрины происходит только один раз, после чего скрипт записывает данные по автомобилям в sessionStorage и далее работает уже с ним
 */


/**
 * Название ДЦ, которое будет использоваться в микроразметке для всех автомобилей
 * Константа используется потому, что название ДЦ, получаемое по API, содержит название конкретного ДЦ, за которым закреплен конкретный автомобиль. На пример:
 * - БорисХоф Юг
 * - БорисХоф Север
 */
const MICRODATA_ORGANIZATION_NAME = 'Борисхоф';

// Тип автомобиля
const MICRODATA_CAR_STATE = {
    new: 'new',
    used: 'used',
}

// Ключи, по которым будут записаны списки автомобилей в sessionStorage
const MICRODATA_GLOBAL_VAR_NAMES = {
    new: '__CUSTOM_CARS_NEW__',
    used: '__CUSTOM_CARS_USED__',
}

/**
 * Если текущая ссылка – ссылка с кароточкой автомобиля, то возвращается объект, описывающий:
 * - тип автомобиля (new, или used)
 * - id автомобиля
 * В противном случае возвращается null
 */
async function carPropsGet() {
    let carProps = null;
    const currentPath = window.location.pathname;

    // Массив относительных ссылок на витрины. Можно задавать ссылки, содержащие несколько директорий, на пример 'cars/new/new_cars'
    // Предполагается использование одной АВН и одной АСП витрины на сайте. Таким образом, на тестовом сайте корректно работать не будет
    // Значения элементов: [ссылка, тип авто (new, или used)]
    const supportedCarPaths = [
        ['cars', MICRODATA_CAR_STATE.new],
        ['available', MICRODATA_CAR_STATE.new],
        ['used', MICRODATA_CAR_STATE.used],
    ];

    /**
    * Определяет, является ли часть ссылки идентификатором автомобиля
    * Возвращает true, если строка имеет вид /{id}/
    * @param {String} iPathPiece  часть текущей ссылки
    */
    function isCarId(iPathPiece) {
        carIdPattern = /^\/[a-zA-Z0-9_.-]*\/$/;
        const result = carIdPattern.exec(iPathPiece);

        if (result)
            return true;
        else
            return false;
    }

    for (carPath of supportedCarPaths) {
        const splitedPath = currentPath.split(carPath[0]);

        if (splitedPath.length === 2 && splitedPath[0] === '/' && isCarId(splitedPath[1])) {
            const carId = splitedPath[1].replaceAll('/', '');
            carProps = {
                type: carPath[1],
                id: carId,
            }

            break;
        }
    }

    return carProps;
}

/**
* Получение списка автомобилей по API
* @param {String} iCarState тип списка автомобилей – новые, или БУ
*/
async function carsRemoteGet(iCarState) {
    const carState = iCarState === MICRODATA_CAR_STATE.new ? 'y' : 'n';
    const link = `${window.location.protocol}//${window.location.hostname}/api/api/cars/list/?is_new=${carState}`;

    return fetch(link, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Accept-Encoding': 'gzip, deflate, br',
        }
    })
        .then(res => res.json())
        .then(json => {
            return json.data;
        })
        .catch(error => {
            throw new Error('custom microdata -> carsRemoteGet -> fetch');
        })
}

/**
* Проверка, записан ли список автомобилей в sessionStorage
* @param {String} iCarState тип списка автомобилей – новые, или БУ
*/
function isCarsSetLocally(iCarState) {
    const itemKey = iCarState === MICRODATA_CAR_STATE.new ? MICRODATA_GLOBAL_VAR_NAMES.new : MICRODATA_GLOBAL_VAR_NAMES.used

    const item = sessionStorage.getItem(itemKey);

    if (item)
        return true;
    else
        return false;
}

/**
* Получение списка автомобилей из sessionStorage. Выполняется в том случае, если список автомобилей был ранее записан в sessionStorage
* @param {String} iCarState тип списка автомобилей – новые, или БУ
*/
function carsLocalGet(iCarState) {
    const stringCars = iCarState === MICRODATA_CAR_STATE.new ? sessionStorage.getItem(MICRODATA_GLOBAL_VAR_NAMES.new) : sessionStorage.getItem(MICRODATA_GLOBAL_VAR_NAMES.used);
    const cars = JSON.parse(stringCars);

    return cars;
}

/**
* Запись списка автомобилей в sessionStorage
* @param {String} iCarState тип списка автомобилей – новые, или БУ
* @param {Array} iCars список автомобилей (новых, или БУ)
*/
function carsLocalSet(iCarState, iCars) {
    const itemKey = iCarState === MICRODATA_CAR_STATE.new ? MICRODATA_GLOBAL_VAR_NAMES.new : MICRODATA_GLOBAL_VAR_NAMES.used;
    const stringCars = JSON.stringify(iCars);

    sessionStorage.setItem(itemKey, stringCars);
}

/**
* Формирование микроразметки 
* @param {String} iId id автомобиля
* @param {Array} iCars список автомобилей (новых, или БУ). На основании id выше, будут получены данные для конкретного автомобиля
*/
function microdataForm(iId, iCars) {
    let car = null;
    let carMicrodata = null;

    for (var carr of iCars) {
        if (carr.id === iId) {
            car = carr;
            break;
        }

    }

    function formCarDescription(iComplectation, iFinalPrice, iEngineVolume, iWheelDrive, iTransmission, iDealerName, iVin) {
        const description = `Купить ${iComplectation} от ${iFinalPrice} (возможна покупка в кредит) с техническими характеристиками: ${iEngineVolume} ${iWheelDrive} ${iTransmission} в автосалоне официального дилера ${iDealerName}. Официальный дилер BMW. VIN: ${iVin}`;

        return description;
    }

    if (car) {
        carMicrodata = {
            "@context": "http://schema.org/",
            "@type": "Vehicle",
            "name": car.attributes.placeholders['${car.brand_name}'] + ' ' + car.attributes.placeholders['${car.marketing_complectation_name}'],
            "brand": car.attributes.placeholders['${car.brand_name}'],
            "vehicleIdentificationNumber": car.attributes.placeholders['${car.vin_hidden}'],
            "vehicleConfiguration": car.attributes.placeholders['${car.engine.volume}'] + 'л. ' + car.attributes.placeholders['${car.transmission_type}'] + ' ' + car.attributes.placeholders['${car.horsepower}'],
            "productionDate": car.attributes.placeholders['${car.year}'],
            "width": car.attributes.placeholders['${car.specifications.dimensions_width.value}'],
            "height": car.attributes.placeholders['${car.specifications.dimensions_height.value}'],
            "weightTotal": car.attributes.placeholders['${car.specifications.weight_unladen.value}'],
            "speed": {
                "@type": "QuantitativeValue",
                "maxValue": car.attributes.placeholders['${car.specifications.road_performance_top_speed.value}'],
            },
            "accelerationTime": {
                "@type": "QuantitativeValue",
                "value": car.attributes.placeholders['${car.specifications.road_performance_acceleration_100.value}'],
            },
            "fuelConsumption": car.attributes.placeholders['${car.specifications.fuel_city.value}'],
            "vehicleTransmission": car.attributes.placeholders['${car.transmission_type}'],
            "Offers": {
                "@type": "AggregateOffer",
                "priceCurrency": "RUB",
                "highprice": car.attributes.placeholders['${car.price}'],
                "lowprice": car.attributes.placeholders['${car.final_price}'],
                "availability": "http://schema.org/InStock",
                "seller": {
                    "@type": "Organization",
                    "name": MICRODATA_ORGANIZATION_NAME,
                    "telephone": car.attributes.dealers[0].phone
                },
                "itemOffered": {
                    "@type": "Car",
                    "name": car.attributes.placeholders['${car.brand_name}'] + ' ' + car.attributes.placeholders['${car.marketing_complectation_name}'],
                    "brand": car.attributes.placeholders['${car.brand_name}'],
                    "vehicleIdentificationNumber": car.attributes.placeholders['${car.vin_hidden}'],
                    "description": formCarDescription(car.attributes.placeholders['${car.marketing_complectation_name}'], car.attributes.placeholders['${car.final_price}'],
                        car.attributes.placeholders['${car.engine.volume}'], car.attributes.placeholders['${car.wheel_drive}'], car.attributes.placeholders['${car.transmission_type}'],
                        MICRODATA_ORGANIZATION_NAME, car.attributes.placeholders['${car.vin_hidden}']),
                    "image": "https://cdn.kodixauto.ru/media/image/" + car.attributes.stock_images_id[0],
                    "color": car.attributes.placeholders['${car.marketing_color'],
                    "bodyType": car.attributes.placeholders['${car.body_type}'],
                    "driveWheelConfiguration": car.attributes.placeholders['${car.wheel_drive}'],
                    "vehicleEngine": {
                        "@type": "EngineSpecification",
                        "engineType": car.attributes.placeholders['${car.fuel_type}']
                    },
                    "offers": {
                        "@type": "Offer",
                        "url": window.location.protocol + '//' + window.location.hostname + car.attributes.url,
                        "priceCurrency": "RUB",
                        "price": "3252700",
                        "itemCondition": "https://schema.org/UsedCondition",
                        "availability": "https://schema.org/InStock"
                    }
                }
            }
        }

    }

    return carMicrodata;
}

/**
* Добавление разметки на страницу 
* @param {String} iMicrodata микроразметка
*/
function addMicrodataToDocument(iMicrodata) {
    let createCastomDlSchema = document.createElement('script');
    createCastomDlSchema.type = "application/ld+json";
    createCastomDlSchema.innerHTML = JSON.stringify(iMicrodata);
    document.getElementsByTagName('head')[0].append(createCastomDlSchema);
}

(async function main() {
    const carProps = await carPropsGet();
    let cars = null;

    if (!carProps)
        return;

    const issCarsSetLocally = isCarsSetLocally(carProps.type);

    if (issCarsSetLocally) {
        cars = carsLocalGet(carProps.type);
    }
    else {
        cars = await carsRemoteGet(carProps.type);
        carsLocalSet(carProps.type, cars);

    }

    const microdata = microdataForm(carProps.id, cars);

    if (microdata)
        addMicrodataToDocument(microdata);
})()


/**
* Получение vin на основании id автомобиля
* @param {String} iId id автомобиля
*/
/*
async function vinGet(iId) {
    const link = window.location.protocol + '//' + window.location.hostname + '/api/cars/collapsed/?car_id=' + iId;

    return fetch(link, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Accept-Encoding': 'gzip, deflate, br',
        }
    })
        .then(res => res.json())
        .then(json => {
            return json.data.cars[0].identity;
        })
        .catch(error => {
            console.log('microdata vinGet fetch exception');
            console.log(error);
        })
}
*/