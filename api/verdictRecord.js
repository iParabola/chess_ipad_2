import {
    http
} from '@/api/http.js'


export const queryGameStatus = (data) => {
    return http.request({
        url: 'armory/queryGameStatus',
        method: 'POST',
        data: data
    });
}
export const queryChessRound = (data) => {
    return http.request({
        url: 'armory/queryChessRound',
        method: 'POST',
        data: data
    });
}
export const queryPrompt = (data) => {
    return http.request({
        url: 'armory/queryPrompt',
        method: 'POST',
        data: data
    });
}
export const queryVerdictResult = (data) => {
    return http.request({
        url: 'armory/queryVerdictResult',
        method: 'POST',
        data: data
    });
}
export const queryActionEffect = (data) => {
    return http.request({
        url: 'armory/queryActionEffect',
        method: 'POST',
        data: data
    });
}
export const isOwnRound = (data) => {
    return http.request({
        url: 'armory/isOwnRound',
        method: 'POST',
        data: data
    });
}

export const queryAllChessPiecesInfo = (data) => {
    return http.request({
        url: 'armory/queryAllChessPiecesInfo',
        method: 'POST',
        data: data
    });
}

export const endDeploy = (data) => {
    return http.request({
        url: 'armory/endDeploy',
        method: 'POST',
        data: data
    });
}
export const chessPiecesAction = (data) => {
    return http.request({
        url: 'armory/chessPiecesAction',
        method: 'POST',
        data: data
    });
}

export const chessPiecesActionNew = (data) => {
    return http.request({
        url: 'armory/chessPiecesActionNew',
        method: 'POST',
        data: data
    });
}

export const changePiecesActionPoint = (data) => {
    return http.request({
        url: 'armory/changePiecesActionPoint',
        method: 'POST',
        data: data
    });
}
export const resetPiecesActionPoint = (data) => {
    return http.request({
        url: 'armory/resetPiecesActionPoint',
        method: 'POST',
        data: data
    });
}

export const chessPiecesActionContinue = (data) => {
    return http.request({
        url: 'armory/chessPiecesActionContinue',
        method: 'POST',
        data: data
    });
}


export const deployChessPieces = (data) => {
    return http.request({
        url: 'armory/deployChessPieces',
        method: 'POST',
        data: data
    });
}

export const undeployChessPieces = (data) => {
    return http.request({
        url: 'deployChess/delChessPiece',
        method: 'POST',
        data: data
    });
}
export const endRound = (data) => {
    return http.request({
        url: 'armory/endRound',
        method: 'POST',
        data: data
    });
}


export const moveChess = (data) => {
    return http.request({
        url: 'armory/moveChess',
        method: 'POST',
        data: data
    });
}

export const saveVerdictScenario = (data) => {
    return http.request({
        url: 'armory/saveVerdictScenario',
        method: 'POST',
        data: data
    });
}

export const saveVerdictChessPieces = (data) => {
    return http.request({
        url: 'armory/saveVerdictChessPieces',
        method: 'POST',
        data: data
    });
}

export const queryVerdictRecordList = (data) => {
    return http.request({
        url: 'armory/queryVerdictRecordList',
        method: 'GET',
        data: data
    });
}

export const queryUnfinishedList = (data) => {
    return http.request({
        url: 'armory/queryUnfinishedList',
        method: 'GET',
        data: data
    });
}

export const queryEachAction = (data) => {
    return http.request({
        url: 'armory/queryEachAction',
        method: 'POST',
        data: data
    });
}

export const queryChessRecordByRound = (data) => {
    return http.request({
        url: 'armory/queryChessRecordByRound',
        method: 'POST',
        data: data
    });
}

export const getRuleList = (data) => {
    return http.request({
        url: 'armory/getRuleList',
        method: 'POST',
        data: data
    });
}

export const getBlowEffectList = (data) => {
    return http.request({
        url: 'armory/getBlowEffectList',
        method: 'POST',
        data: data
    });
}

/**
 * 获取筛子值
 */
export const getDice = (diceCount) => {
    return http.request({
        url: 'armory/getDice/' + diceCount,
        method: 'GET'
    });
}
export const submitScore = (data) => {
    return http.request({
        url: 'armory/submitScore',
        method: 'POST',
        data: data
    });
}
export const queryScoreList = (data) => {
    return http.request({
        url: 'armory/queryScoreList',
        method: 'POST',
        data: data
    });
}
export const getRealTimeScore = (data) => {
    return http.request({
        url: 'armory/getRealTimeScore',
        method: 'POST',
        data: data
    });
}
export const getSummaryScore = (data) => {
    return http.request({
        url: 'armory/getSummaryScore',
        method: 'POST',
        data: data
    });
}
export const getSummaryScoreNew = (data) => {
    return http.request({
        url: 'armory/getSummaryScoreNew',
        method: 'POST',
        data: data
    });
}

export const getSummaryTotal = (data) => {
    return http.request({
        url: 'armory/getSummaryTotal',
        method: 'POST',
        data: data
    });
}


export const getRoundStatus = (data) => {
    return http.request({
        url: 'armory/getRoundStatus',
        method: 'POST',
        data: data
    });
}
export const judge = (data) => {
    return http.request({
        url: 'armory/judge',
        method: 'POST',
        data: data
    });
}
export const saveRoundCover = (data) => {
    return http.request({
        url: 'armory/saveRoundCover',
        method: 'POST',
        data: data
    });
}
export const saveTextInstruction = (data) => {
    return http.request({
        url: 'armory/saveTextInstruction',
        method: 'POST',
        data: data
    });
}
export const getHistoryTreeByRound = (data) => {
    return http.request({
        url: 'armory/getHistoryTreeByRound',
        method: 'POST',
        data: data
    });
}
export const getMapCoordinate = (data) => {
    return http.request({
        url: 'armory/getMapCoordinate',
        method: 'POST',
        data: data
    });
}

export const getMap = (data) => {
    return http.request({
        url: 'armory/getMap',
        method: 'POST',
        data: data
    });
}


export const getMapChessImage = (data) => {
    return http.request({
        url: 'armory/getMapChessImage',
        method: 'POST',
        data: data
    });
}
export const confirmJudge = (data) => {
    return http.request({
        url: 'armory/confirmJudge',
        method: 'POST',
        data: data
    });
}

export const nextStage = (id) => {
    return http.request({
        url: 'armory/nextStage/' + id,
        method: 'GET'
    });
}


export const changeChessStatus = (data) => {
    return http.request({
        url: 'armory/changeChessStatus',
        method: 'POST',
        data: data
    });
}


export const stepJudge = (data) => {
    return http.request({
        url: 'armory/stepJudge',
        method: 'POST',
        data: data
    });
}

export const setScore = (data) => {
    return http.request({
        url: 'armory/setScore',
        method: 'POST',
        params: data
    });
}

export const getScoreByCampId = (data) => {
    return http.request({
        url: 'armory/getScoreByCampId',
        method: 'POST',
        params: data
    });
}
