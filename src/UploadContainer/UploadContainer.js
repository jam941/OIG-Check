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
        this.state = {uploadedData: null}
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

        axios.post('http://localhost:5000/analysis',form).then(res=>{
            console.log(res)
        })
        
    }
    render(){
        return(
        <div id = 'upload'>
            <form id = 'dataUpload' onSubmit={this.handleSubmit}>
                <label>Employee File
                    <input value = {this.state.value} onChange={this.handleChange} type="file" id="myFile"/>
                </label>
                <input type = "submit" value="Submit"/>
            </form>
        </div>)
    }
}
