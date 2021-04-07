import { ActivitySubjects } from './subjects';

export interface ActivityUpdatedEvent {
  subject: ActivitySubjects.ActivityUpdated;
  data: {
    id: string;
    version: number;
    title: string;
    summary: string;
    description: string;
    status: number;
    createdBy: string;
    updatedBy: string;
  };
}
