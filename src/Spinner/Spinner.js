import React,{Component} from 'react';
import axios from 'axios'
import csv from 'csvtojson'
import FormData from 'form-data'
import './spinner.css'
//import fs from'fs'

export default class Spinner extends Component{
    constructor(props){
        super(props)
        
    }

    render(props){
        return(
        <div class="load-wrapp">
            <div class="load-3">
                <p>Processing</p>
                <div class="line"></div>
                <div class="line"></div>
                <div class="line"></div>
            </div>
        </div>)
    }
}
