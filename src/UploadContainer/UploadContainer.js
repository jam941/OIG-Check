import React,{Component} from 'react';
import axios from 'axios'
import csv from 'csvtojson'
import FormData from 'form-data'
//import fs from'fs'
async function parseData(dir){
    let results = []
    await csv()
    .fromFile(dir)
    .then((person)=>{
        results.push(person)
    })
    return results
}

export default class Upload extends Component{
    constructor(props){
        super(props)
        this.state = {uploadedData: null, response: null,isWaiting:false,}
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    handleChange(event){
        this.setState({uploadedData:event.target.files[0]})
    }
    handleSubmit(event){
        event.preventDefault()
        let data = this.state.uploadedData
        console.log('Data is: ', data)
        if(!data){
            return
        }
        var form = new FormData()
        form.append('file',data)
        this.setState({isWaiting:false})
        axios.post('http://localhost:5000/analysis',form).then(res=>{
            let params = {key:res.data.key}
            axios.get('http://localhost:5000/getfile/'+res.data.key).then(res=>{
                console.log('Res: ', res.data)
                this.setState({response:res.data})
                
            })
        })
    }

    render(props){
        const isWaiting = this.state.isWaiting
        console.log(this.state.response)
        const hasData = !!this.state.response
        const data = this.state.response
        return(
        <>
        <div>{isWaiting && <div>LOADING</div>}</div>
        <div id = 'upload' >
            {!isWaiting && !hasData &&
            <form id = 'dataUpload' onSubmit={this.handleSubmit}>
                <label>Employee File
                    <input value = {this.state.value} onChange={this.handleChange} type="file" id="myFile"/>
                </label>
                <input type = "submit" value="Submit"/>
            </form>
            }
            {hasData && !isWaiting &&
            <div>
                Result data goes here
            </div>
            
            }
        </div>

        </>
        
    )
    }
}
