public class AccountController {
     
    @AuraEnabled
    public static list<Account> fetchAccounts(){
        return [SELECT Id, Name, Type, Phone FROM Account LIMIT 10];
    }
}