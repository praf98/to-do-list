public with sharing class SearchContact {
   @AuraEnabled(cacheable=true)
   public static list<contact> methodName(integer limi)
   {
      return [Select ID,FirstName,LastNAme,Phone,Email From Contact limit:limi];
   }
}