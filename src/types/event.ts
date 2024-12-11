export interface Coordinator {
  name: string;
  email: string;
  phone: string;
  department: string;
  role: string;
}

export interface Event {
  id: string;
  name: string;
  description: string;
  eventDate: string;
  registrationDeadline: string;
  location: string;
  department: string;
  teamSize: number;
  eventBanner: string;
  coordinator: Coordinator;
  studentCoordinator: Coordinator;
  prizeDetails: {
    first: string;
    second: string;
    third: string;
  };
  registrationCount: number;
  status: 'upcoming' | 'ongoing' | 'completed';
  judgingCriteria?: JudgingCriterion[];
}

export interface JudgingCriterion {
  id: string;
  name: string;
  description: string;
  maxScore: number;
  weight: number;
}