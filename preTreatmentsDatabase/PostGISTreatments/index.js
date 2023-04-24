let poolBuilder = require('./poolPg')
let utils = require('./utils')
let merge = require('./merge')
const path = require('node:path');
let importData = require('./importData')
let join = require('./join')


async function main() {

    // defining DBs names
    // they must be created before executing the script with postgis extension
    let BDTopoBatiDB = "BDTopoBatiPau2012"
    let BDTopoPAIDB = "BDTopoPAIPau2012"
    let TRIDB = "TRIPau"

    let bdTopoRootPath = './input/BDTOPO2012'
    let bdTopoTRIPath = './input/FRF_TRI_PAU'

    let TRIenjeuxTable = "n_tri_pau_enjeu_064"
    let TRIenjeuxPointEnrichiTable = "n_tri_pau_enjeu_p_enrichi"
    let TRIenjeuxPointTable = "n_tri_pau_enjeu_p_064"
    let finessTable = "finess"
    let menjvaTable = "menjva"
    let bdTopoTable = "BDTopo"
    let BDTopoBatiTable = "BDTopoBati"
    let BDTopoPAITable = "BDTopoPAI"

    let TRIenjeux = ["n_tri_pau_enjeu_crise_p_064", "n_tri_pau_enjeu_eco_s_064", "n_tri_pau_enjeu_patrim_p_064"]
    let TRIenjeuxPoint = [
        "n_tri_pau_enjeu_crise_p_064",
        "n_tri_pau_enjeu_patrim_p_064",
        "n_tri_pau_enjeu_ippc_p_064",
        "n_tri_pau_enjeu_steu_p_064"
    ]
    let TRIenjeuxSurf = ["n_tri_pau_enjeu_eco_s_064"]
    let directoriesToImport = ['A_RESEAU_ROUTIER', 'B_VOIES_FERREES_ET_AUTRES', 'C_TRANSPORT_ENERGIE', 'E_BATI', 'I_ZONE_ACTIVITE', 'T_TOPONYMES']

    let finessColumns = require('./parameters/finessColumns.json')
    let BDTopoBatiColumnsToKeep = require('./parameters/bdtopoBatiColumns.json')
    let bdTopoPAIColumnsToKeep = require('./parameters/bdtopoPAIColumns.json')
    let triColumnsToKeep = require('./parameters/TRIColumns.json')
    let enjeux = require('./parameters/enjeux.json')

    /* BATI BD TOPO */


    // // importing bdTopo bati
    //await importData.importSHPDirectory(BDTopoBatiDB, path.join(bdTopoRootPath, 'E_BATI'))

    // merging BDTopo bati tables
    //await merge.mergeTables(BDTopoBatiDB, bdTopoBatiTable, BDTopoBatiColumnsToKeep)

    // copying BDTopo final table into a new db
    //await utils.copyTable(BDTopoBatiTable, BDTopoBatiDB, TRIDB)


    /* PAI BD TOPO */


    // // importing bdTopo PAI toponymes
    //await importData.importSHPDirectory(BDTopoPAIDB, path.join(bdTopoRootPath, 'T_TOPONYMES'))

    // // importing bdTopo activité
    //await importData.importSHPDirectory(BDTopoPAIDB, path.join(bdTopoRootPath, 'I_ZONE_ACTIVITE'))

    // merging BDTopo bati tables
    //await merge.mergeTables(BDTopoPAIDB, BDTopoPAITable, bdTopoPAIColumnsToKeep)

    // copying BDTopo final table into a new db
    //await utils.copyTable(BDTopoPAITable, BDTopoPAIDB, TRIDB)


    /* IMPORTING EXT DATA */


    // // importing finess
    //importData.importFiness(TRIDB, finessTable, './input/etalab.csv', finessColumns, true)

    // // importing Menjva
    //await importData.importMenjva(TRIDB, menjvaTable, './input/menjva.csv')


    /* MANAGING TRI */


    // // importing TRI 
    //await importData.importSHPDirectory(TRIDB, bdTopoTRIPath)

    // joining BDTopo and tri for point geom
    // TRIenjeuxPoint.forEach(TRIenjeu => {
    //     join.addColumnsOnJoin(TRIDB, TRIenjeu, BDTopoPAITable, bdTopoPAIColumnsToKeep)
    // })

    // merging TRI point geom tables
    //await merge.mergeTables(TRIDB, TRIenjeuxPointTable, triColumnsToKeep, TRIenjeuxPoint)

    // join TRI point on BDtopo surf with geom
    //await join.intersectGeom(TRIDB, TRIenjeuxPointEnrichiTable, TRIenjeuxPointTable, BDTopoBatiTable, BDTopoBatiColumnsToKeep)

    // // renaming columns
    // await utils.renameColumn(TRIDB, TRIenjeuxPointEnrichiTable, "geom", "source_geom")
    // await utils.renameColumn(TRIDB, TRIenjeuxPointEnrichiTable, "bdtopobati_geom", "geom")

    // joining TRI p and TRI s
    // TRIenjeuxSurf.push(TRIenjeuxPointEnrichiTable)
    // await merge.mergeTables(TRIDB, TRIenjeuxTable, undefined, TRIenjeuxSurf)

}

main()