import { LightningElement ,api, track } from 'lwc';

export default class ChildJ extends LightningElement {
    @api apiProg="Api hurray value";
    @track trackPtog="track hurray value";
    nonreactive ="Hellow non reactive properties";
    Simple_button_prog(){
        this.apiProg="this value for API property";
        this.trackPtog="this value for Tack Value";

    }
}