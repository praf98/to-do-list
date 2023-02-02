public class knowledgeBase {

    @AuraEnabled(cacheable = true)
    public static List<Knowledge__c> getMethod(string text)
    {        
        
        string s='%'+text+'%';
        return[Select id, Name, Answer__c, Title__c, Procedure_Audience__c,Procedure_Steps__c from Knowledge__c Where Title__c like:s ];
    }


}