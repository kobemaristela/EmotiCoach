import { TestBed } from '@angular/core/testing';

import { RequestChatService } from './request-chat.service';

describe('RequestChatService', () => {
  let service: RequestChatService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RequestChatService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
