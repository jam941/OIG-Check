import getData from '../OigData/formatData.js'

const OIG_DIR = '../OigData/UPDATED.csv'
async function check(data){
    
    const oig = await getData(data)
    console.log(oig[0])
}
check()