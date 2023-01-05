import { LightningElement, track,wire } from 'lwc';
import { getDataConnectorSourceFields } from 'lightning/analyticsWaveApi';
import { refreshApex } from '@salesforce/apex';
 import getTask from '@salesforce/apex/ToDoListController.getTask';
 import addtask from '@salesforce/apex/ToDoListController.addtask';
 import deleteTask from '@salesforce/apex/ToDoListController.deleteTask';
export default class TODO_List extends LightningElement 
{
    NewTask='';

   @track
    todoTasks=[]; 
    processing=true;
    refreshapexxx;

    updateNewTask(event)
    {
        this.NewTask=event.target.value;
    }

    // Add  the task into the list
    addTasktodoList(event)
    { 
          if(this.NewTask==='')
          {
            return;
          }
        this.processing=true;         // reintialize the spinner variable
        addtask({Subject:this.NewTask})
        .then(result=>{
             this.processing=false;
                                       // unshift  is used yhe push the data in array at the begn ing 
        this.todoTasks.push({       // to push the data in the array at the end of aaray
            id: this.todoTasks[this.todoTasks.length - 1].id+1,
            name: this.NewTask,
            recordId: result.Id
        })
        this.NewTask='';
        })
        .catch(error=>{
            this.processing=false;
            console.log(error)});
         
       
    }



    deleteList(event)
    { 
       let deleteId = event.target.name;
       let todoTasks = this.todoTasks;
       let todotaskid;
       let recoridToDelte;

      for(let i=0; i<todoTasks.length; i++)
      {
        if(deleteId === todoTasks[i].id)
        {
            todotaskid=i;
        }
       }
            recoridToDelte=todoTasks[todotaskid].recordId;
            console.log(recoridToDelte);
           
            //Impresion method............
            //delete task using impression method
            deleteTask({recordId:recoridToDelte})
            .then(response=>
                {
                    this.todoTasks.splice(todotaskid,1);
                }
                 )
            .catch(error=>console.log(error));
           

       
      
      


      /* todoTasks.splice(
        todoTasks.findIndex(function(todoTask)
        {return todoTask.id===deleteId;
        })
        ,1
        );*/
    }


    //go get the data form the apex class 
    
    @wire(getTask)
    gettodoTasks(response)
    {    this.refreshapexxx=response;
        let data=response.data;
        let error=response.error;
        if(data||error)               //used for spinner in hltml page making the processing value false;
        {
            this.processing=false;
        }
           this.todoTasks=[];
        if(data)
        {   // console.log('data');            
            // console.log(data);
            data.forEach(task => 
            {
                  this.todoTasks.push
                  ({
                       id:this.todoTasks.length + 1,
                       name:task.Subject,
                       recordId:task.Id
                  });
            });
        }
        else if(error)
        {
            console.log('error');
            console.log(error);
        }
    }
  /*  @wire(getTask)
    gettodoTasks({error,data})
    {   this.refreshapexxx=data;
        if(data)
        {
            console.log('data');
             console.log(data);
           data.forEach(element => 
            {
                this.todoTasks.push
                ({ 
                    id:this.todoTasks.length + 1,
                    name:element.Subject,
                    recordID:element.id
                });
           });
        }
        else if(error)
        {

        }
    }*/

    //refresh apex 
    refreschange()
    {    
        this.processing=true;
       
        refreshApex(this.refreshapexxx)
        
        .finally(() => this.processing = false);
    }
} 