import {http} from "@/api/http";



export const queryMaparbiterMapId = (data) => {
    return http.request({
        url: 'armory/queryMaparbiterMapId',
        method: 'POST',
        data: data
    });
}
export const deployScenarioChessPieces = (data) => {
    return http.request({
        url: 'armory/deployScenarioChessPieces',
        method: 'POST',
        data: data
    });
}

export const queryAllChessPiecesInfoC = (data) => {
    return http.request({
        url: 'armory/queryAllChessPiecesInfoC',
        method: 'POST',
        data: data
    });
}

export const delScenarioChessPiece = (data) => {
    return http.request({
        url: 'deployChess/delScenarioChessPiece',
        method: 'POST',
        data: data
    });
}

export const createScenario = (data) => {
    return http.request({
        url: 'armory/createScenario',
        method: 'POST',
        data: data
    });
}
export const getMapC = (data) => {
    return http.request({
        url: 'armory/getMapC',
        method: 'POST',
        data: data
    });
}
export const getMapCoordinateC = (data) => {
    return http.request({
        url: 'armory/getMapCoordinateC',
        method: 'POST',
        data: data
    });
}

export const getMapChessImageC = (data) => {
    return http.request({
        url: 'armory/getMapChessImageC',
        method: 'POST',
        data: data
    });
}
export const creatVerdictRoom = (data) => {
    return http.request({
        url: 'armory/creatVerdictRoom',
        method: 'POST',
        data: data
    });
}
export const queryMapByProductId = (data) => {
    return http.request({
        url: 'armory/queryMapByProductId',
        method: 'POST',
        data: data
    });
}
export const delScenario = (data) => {
    return http.request({
        url: 'armory/delScenario',
        method: 'POST',
        data: data
    })
}