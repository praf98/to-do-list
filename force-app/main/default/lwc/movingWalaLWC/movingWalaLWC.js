import { LightningElement } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';


export default class MovingWalaLWC extends NavigationMixin (LightningElement) 
{   
    value='no nono jo';
   
    handleNavigateToCustomPage1(event) {
        event.preventDefault();
        //your custom navigation here
    }
    handleNavigateToCustomPage2(event) {
        event.preventDefault();
        //your custom navigation here
    }
}
