public with sharing class ToDoListController {
   @AuraEnabled(cacheable=true )
    
    public static list<task> getTask()
   {
      return [select subject from task where ownerId=:UserInfo.getUserId()];
   }
   @AuraEnabled
   public static task addtask(string Subject)
   {
      try
      {
         Task task =new task( 
         subject=Subject,
         ownerId=UserInfo.getUserId(),
         status='Not Started',
         Priority='Normal'
         );
        
         insert task;
         return task;
      }
      catch(Exception e) 
      {
          system.debug(' the error you get '+e.getmessage());
      } 
      return null;
   }
   @AuraEnabled
   public static boolean deleteTask(Id recordId)
   {
      try
      {
         Database.delete(recordId);
         return true;
      }
      catch(Exception e)
      {
         system.debug(e.getmessage());
      }
      return false;
   }
}
 