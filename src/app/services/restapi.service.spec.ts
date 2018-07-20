import { TestBed } from "@angular/core/testing";
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { RestApi } from "./restapi.service";
import { Config } from '../config.provider';
describe('Testing the rest Api Service ',() => {
    let httpTestingController;
    let stateService;
    let restApi;

    beforeEach(()=>{
        TestBed.configureTestingModule({ 
                imports : [HttpClientTestingModule],
                providers : [ RestApi , Config],
                declarations: []
            
        });
        httpTestingController = TestBed.get(HttpTestingController);
        restApi = TestBed.get(RestApi);
    })


    it('should verify the get request api call' , () => {
        
        let url = '/api/stateList.json';
        restApi.get(url).subscribe();

         const  req = httpTestingController.expectOne(url);
          req.flush({ "stateList": [
            {
               "stateCode":"AND",
               "stateCodeNumber":0,
               "stateName":"Andhra Pradesh"
            }]});
 
         httpTestingController.verify(); 
         
    })


    it('should verify the post request api call' , () => {
        let url = '/api/stateList.json';
        restApi.post(url, {}).subscribe();
        

        const  req = httpTestingController.expectOne(url);
         req.flush({ "stateList": [
           {
              "stateCode":"AND",
              "stateCodeNumber":0,
              "stateName":"Andhra Pradesh"
           }]});

        httpTestingController.verify(); 
        
   })

   it('should verify the put request api call' , () => {
    let url = '/api/stateList.json';
    restApi.put(url, {}).subscribe();
    

    const  req = httpTestingController.expectOne(url);
     req.flush({ "stateList": [
       {
          "stateCode":"AND",
          "stateCodeNumber":0,
          "stateName":"Andhra Pradesh"
       }]});

    httpTestingController.verify(); 
    
    })

    it('should verify the  delete request api call' , () => {
        let url = '/api/stateList.json';
        restApi.delete(url, {}).subscribe();
        
    
        const  req = httpTestingController.expectOne(url);
         req.flush({ "stateList": [
           {
              "stateCode":"AND",
              "stateCodeNumber":0,
              "stateName":"Andhra Pradesh"
           }]});
    
        httpTestingController.verify(); 
        
        })
});