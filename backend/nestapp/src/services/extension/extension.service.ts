import { Injectable } from '@nestjs/common';

@Injectable()
export class ExtensionService {
  private activityLog: { user: string | null; domain: string | null; time: number }[] = [];;

  record(data: { user: string | null; domain: string | null; time: number }) {
    this.activityLog.push(data);
    console.log('Received activity:', data);
    return { message: 'Activity recorded', data: data };
  }
}

//http://localhost:3000/extension/tabChange