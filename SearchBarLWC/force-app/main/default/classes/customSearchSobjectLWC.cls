public with sharing class customSearchSobjectLWC {
    @AuraEnabled(cacheable=true)
    public static list<contact> getContactList(string searchKey) {
        string searchKeyword = '%' + searchKey + '%';
		
        list<contact> contactListRecord = new list<contact>();
     
        for(contact conObj : [Select id,Name,Email,FirstName,LastName,Phone
                            From Contact
                            WHERE name LIKE : searchKeyword]){
           contactListRecord.add(conObj);
        }
        
         if(contactListRecord.size() == 0){
            throw new AuraHandledException('No Record Found..'); 
         }
         
        return contactListRecord;
    }
}