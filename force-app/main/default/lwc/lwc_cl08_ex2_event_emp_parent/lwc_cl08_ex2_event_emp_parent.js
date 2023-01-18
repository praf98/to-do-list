import { LightningElement } from 'lwc';

export default class Lwc_cl08_ex2_event_emp_parent extends LightningElement 
{
    enpnnm;
    enph;
    enpssl;
    showdata(event)
    {
        this.enpnnm=event.detail.nm;
        this.enph=event.detail.ph;
        this.enpssl=event.detail.sl;


    }
}