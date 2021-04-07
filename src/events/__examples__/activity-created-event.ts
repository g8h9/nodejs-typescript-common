import { ActivitySubjects } from './subjects';

export interface ActivityCreatedEvent {
  subject: ActivitySubjects.ActivityCreated;
  data: {
    id: string;
    version: number;
    title: string;
    summary: string;
    description: string;
    status: number;
    createdBy: string;
  };
}
