import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { RequestSessionService } from './request-session.service';
import { Session } from './Session';
import { session } from './Isession';

declare const expect: Chai.ExpectStatic

describe('HttpClient testing', () => {
      let httpClient: HttpClient;
      let httpTestingController: HttpTestingController;
      let requestSessionService: RequestSessionService;

      beforeEach(() => {
        TestBed.configureTestingModule({
          imports: [ HttpClientTestingModule ]
        });
        httpClient = TestBed.inject(HttpClient);
        httpTestingController = TestBed.inject(HttpTestingController);
        // requestSessionService = new RequestSessionService(httpClient);
      });


      it('can getAllSessionsObservable', () => {
        const testData: session = new Session("", "", 0, "0000/00/00T00:00:00-8");
        // Make an HTTP GET request
        requestSessionService.getAllSessions('2023-02-02', 100)
          .subscribe(data =>
            expect(data).equal(testData)
          );
            
        //expect only one request to be made
        const req = httpTestingController.expectOne('https://emotidev.maristela.net/workout/getallsessions');
      
        // Assert that the request is a GET.
        expect(req.request.method).equal('GET');
      
        // Subscribe callback asserts that correct data was returned.
        req.flush(testData);
      
        // Assert that there are no outstanding requests.
        httpTestingController.verify();
      });

      it('can postCreateNewSessionObservable', () => {
        const testData: session = new Session("00", "unittest", 0, "00/00/00T00:00:00",[]);
        // Make an HTTP GET request
        requestSessionService.postCreateNewSessionObservable(testData)
          .subscribe(data =>
            expect(data).equal(testData)
          );
            
        //expect only one request to be made
        const req = httpTestingController.expectOne('https://emotidev.maristela.net/workout/setsessiondata');
      
        // Assert that the request is a GET.
        expect(req.request.method).equal('GET');
      
        // Subscribe callback asserts that correct data was returned.
        req.flush(testData);
      
        // Assert that there are no outstanding requests.
        httpTestingController.verify();
      });
  

    });

   