import getData from '../OigData/formatData.js'

async function check(){
    const oig = await getData()
    console.log(oig[0])
}
check()