export class TaskDto {
    id: number = 0;
    title: string = '';
    description: string = '';
    remainingWork: number = 0;
    effort: number = 0;
    state: string = '';
    completionDate: string | null = null;
    isEditing: boolean = false;

 
  }