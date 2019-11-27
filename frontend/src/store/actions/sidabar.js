import * as actionTypes from './actionTypes';




export function setMode(new_mode) {
    return {
        type : actionTypes.SET_MODE,
        mode : new_mode
    }
}

export function setYear(new_year) {
    return {
        type : actionTypes.SET_YEAR,
        year : new_year
    }
}

export function setMonth(new_month) {
    return {
        type : actionTypes.SET_MONTH,
        month : new_month
    }
}

export function setDay(new_day) {
    return {
        type : actionTypes.SET_DAY,
        day : new_day
    }
}

export function setCategory(new_category){
    return {
        type : actionTypes.SET_CATEGORY,
        category_name : new_category
    }
}

export function setPersonId(new_personId){
    return {
        type : actionTypes.SET_PERSONID,
        person_id : new_personId
    }
}

export function setGardenMode(new_garden_mode){
    return {
        type : actionTypes.SET_GARDEN_MODE,
        gardenmode : new_garden_mode
    }
}

export function setGardenCategory(new_garden_category){
    return {
        type : actionTypes.SET_GARDEN_CATEGORY,
        category_name : new_garden_category
    }
}

