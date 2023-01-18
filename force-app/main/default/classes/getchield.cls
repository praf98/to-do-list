public with sharing class getchield {
   @AuraEnabled
   public static list<Account> getContactDetails ()
   {
      List<Account> acclist=[select Id,Name,(select id,FirstName,LastName from contacts)from account limit 3 ];
      if(!acclist.isempty())
      {
        return acclist;  
      }
      else 
      {
        return null;
      }
      
    }
}
